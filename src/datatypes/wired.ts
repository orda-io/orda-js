import { CheckPoint } from '@ooo/types/checkpoint';
import { Operation } from '@ooo/operations/operation';
import { ClientContext } from '@ooo/context';
import { StateOfDatatype, TypeOfDatatype } from '@ooo/types/datatype';
import { Uint64 } from '@ooo/types/integer';
import {
  PPOptions,
  PushPullOptions,
  PushPullPack,
} from '@ooo/types/pushpullpack';
import { OperationId } from '@ooo/types/operation';
import { TransactionDatatype } from '@ooo/datatypes/tansaction';
import { Mutex } from 'async-mutex';
import { DUID } from '@ooo/types/uid';
import { ErrDatatype } from '@ooo/errors/datatype';
import { SyncType } from '@ooo/protobuf/ortoo_pb';

export { WiredDatatype };
export type { Wire };

interface Wire {
  deliverTransaction(wired: WiredDatatype): void;

  OnChangeDatatypeState(): void;
}

abstract class WiredDatatype extends TransactionDatatype {
  private checkPoint: CheckPoint;
  private opBuffer: Operation[];
  private wire?: Wire;
  private promiseSync: boolean;
  private mutexWire: Mutex;

  protected constructor(
    ctx: ClientContext,
    key: string,
    type: TypeOfDatatype,
    state: StateOfDatatype,
    wire?: Wire
  ) {
    super(ctx, key, type, state);
    this.checkPoint = new CheckPoint();
    this.opBuffer = Array<Operation>();
    this.wire = wire;
    this.promiseSync = false;
    this.mutexWire = new Mutex();
  }

  public applyPushPullPack(ppp: PushPullPack): void {
    this.ctx.L.debug(`[🚆🔻] BEGIN applyPushPull:${ppp.toString()}`);
    try {
      this.checkPushPullPackOption(ppp);
      this.excludeDuplicateOperations(ppp);
      this.syncCheckPoint(ppp.checkPoint);
      if (ppp.opList.length > 0) {
        this.sentenceRemoteInTx(...ppp.opList);
      }
    } catch (e) {
      // TODO:
      throw e;
    } finally {
      this.ctx.L.debug('[🚆🔺] END applyPushPull');
    }
  }

  private syncCheckPoint(newCheckPoint: CheckPoint): void {
    const oldCheckPoint = this.checkPoint.clone();
    if (this.checkPoint.cseq.compare(newCheckPoint.cseq) < 0) {
      this.checkPoint.cseq = newCheckPoint.cseq;
    }
    if (this.checkPoint.sseq.compare(newCheckPoint.sseq) < 0) {
      this.checkPoint.sseq = newCheckPoint.sseq;
    }
    this.ctx.L.debug(
      `[🚆] SYNC checkpoint: ${oldCheckPoint.toString()}->${this.checkPoint.toString()}`
    );
  }

  private excludeDuplicateOperations(pushPullPack: PushPullPack) {
    const pulled = this.calculatePullingOperations(pushPullPack.checkPoint);
    if (pushPullPack.opList.length > pulled) {
      const skip = pushPullPack.opList.length - pulled;
      pushPullPack.opList = pushPullPack.opList.slice(skip);
      this.ctx.L.debug(`[🚆] skip ${skip} operations`);
    }
  }

  private calculatePullingOperations(newCp: CheckPoint): number {
    return (
      newCp.sseq.asNumber() -
      this.checkPoint.sseq.asNumber() -
      (newCp.cseq.asNumber() - this.checkPoint.cseq.asNumber())
    );
  }

  private checkPushPullPackOption(ppp: PushPullPack) {
    const option = ppp.option;
    if (PPOptions.hasError(option)) {
      this.ctx.L.error('[🚆] receive error');
      if (ppp.opList.length > 0) {
        // const errOp = pushPullPack.opList[0];
      }
    }
    if (PPOptions.hasSubscribe(option)) {
      if (this.state === StateOfDatatype.DUE_TO_SUBSCRIBE_CREATE) {
        this.resetDatatypeForSubscribe(ppp.duid);
      }
    }
    this.state = this.evaluateStateForPushPullOption(ppp.option);
  }

  evaluateStateForPushPullOption(option: number): StateOfDatatype {
    switch (this.state) {
      case StateOfDatatype.DUE_TO_CREATE:
        if (option & PushPullOptions.create) {
          return StateOfDatatype.SUBSCRIBED;
        }
        break;
      case StateOfDatatype.DUE_TO_SUBSCRIBE:
        if (option & PushPullOptions.subscribe) {
          return StateOfDatatype.SUBSCRIBED;
        }
        break;
      case StateOfDatatype.DUE_TO_SUBSCRIBE_CREATE:
        if (option & (PushPullOptions.create | PushPullOptions.subscribe)) {
          return StateOfDatatype.SUBSCRIBED;
        }
        break;
      case StateOfDatatype.SUBSCRIBED:
        if (option & PushPullOptions.delete) {
          return StateOfDatatype.DELETED;
        }
        if (option === PushPullOptions.normal) {
          return StateOfDatatype.SUBSCRIBED;
        }
        break;
      case StateOfDatatype.DUE_TO_UNSUBSCRIBE:
        if (option & PushPullOptions.unsubscribe) {
          return StateOfDatatype.UNSUBSCRIBED;
        }
        break;
      case StateOfDatatype.UNSUBSCRIBED:
      case StateOfDatatype.DELETED:
      default:
        break;
    }
    throw new ErrDatatype.IllegalPushPullOption(
      PPOptions.toString(option),
      this.state,
      this.ctx.L
    );
  }

  private resetDatatypeForSubscribe(duid: DUID) {
    this.checkPoint = new CheckPoint(0, 0);
    this.opBuffer = new Array<Operation>();
    this.id = duid;
    this.opId = new OperationId(this.ctx.cuid);
    this.ctx.L.debug(`[🚆] ready to subscribe:${this.checkPoint}`);
  }

  private updateState(ppp: PushPullPack): StateOfDatatype {
    const oldState = this.state;
    switch (this.state) {
      case StateOfDatatype.DUE_TO_SUBSCRIBE_CREATE:
      // if (PushPullOptions.hasSubscribe(ppp.option)) {
      // this.opBuffer = new Array<Operation>();
      // this.opId = new OperationId(this.opId.cuid, 0);
      // }
      case StateOfDatatype.DUE_TO_CREATE | StateOfDatatype.DUE_TO_SUBSCRIBE:
        this.state = StateOfDatatype.SUBSCRIBED;
        this.id = ppp.duid;
        break;
      case StateOfDatatype.SUBSCRIBED:
        break;
      case StateOfDatatype.DUE_TO_UNSUBSCRIBE:
        break;
      case StateOfDatatype.UNSUBSCRIBED:
        break;
      case StateOfDatatype.DELETED:
        break;
    }
    return oldState;
  }

  public createPushPullPack(): PushPullPack | null {
    const operations = this.peekOperations(this.checkPoint.cseq);
    if (operations.length === 0) {
      return null;
    }
    const cp = new CheckPoint(
      this.checkPoint.sseq,
      Uint64.add(this.checkPoint.cseq, operations.length)
    );

    return new PushPullPack(
      this.id,
      this.key,
      this.type,
      cp,
      this.opId.era,
      PPOptions.setOption(this.state),
      operations
    );
  }

  private peekOperations(recvCseq: Uint64): Operation[] {
    if (this.opBuffer.length === 0) {
      return new Array<Operation>();
    }
    const firstOp = this.opBuffer[0];
    const startCseq = firstOp.id.seq.asNumber();
    const start: number = recvCseq.asNumber() + 1 - startCseq;
    if (0 <= start && start < this.opBuffer.length) {
      return this.opBuffer.slice(start);
    }
    return new Array<Operation>();
  }

  deliverTransaction(transaction: Operation[]): void {
    if (transaction.length > 0) {
      this.opBuffer.push(...transaction);
      if (this.ctx.client.syncType === SyncType.NOTIFIABLE) {
        this.promiseSync = true;
      }
    }
  }

  trySync(): void {
    if (this.promiseSync) {
      this.sync();
      this.promiseSync = false;
    }
  }

  private async asyncSync() {
    const release = await this.mutexWire.acquire();
    try {
      this.ctx.L.debug(`[🦅🔻] BEGIN sync: (${this.opId.toString()})`);
      this.wire?.deliverTransaction(this);
    } finally {
      release();
      this.ctx.L.debug(`[🦅🔺] END sync: (${this.opId.toString()})`);
    }
  }

  sync(): Promise<void> {
    return this.asyncSync();
  }
}
