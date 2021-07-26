import { CheckPoint } from '@ooo/types/checkpoint';
import { Op, Operation } from '@ooo/operations/operation';
import { ClientContext } from '@ooo/context';
import { StateOfDatatype, TypeOfDatatype } from '@ooo/types/datatype';
import { Int64, Uint64 } from '@ooo/types/integer';
import { PPOptions, PushPullOptions, PushPullPack } from '@ooo/types/pushpullpack';
import { OperationID } from '@ooo/types/operation';
import { TransactionDatatype } from '@ooo/datatypes/tansaction';
import { DUID } from '@ooo/types/uid';
import { ErrDatatype } from '@ooo/errors/datatype';
import { SyncType } from '@ooo/types/client';
import { ErrorOperation } from '@ooo/operations/meta';
import { DatatypeErrCodes, DatatypeError } from '@ooo/errors/for_handlers';

export { WiredDatatype };
export type { Wire };

interface Wire {
  deliverTransaction(wired: WiredDatatype): void;

  onChangeDatatypeState(wired: WiredDatatype): void;
}

abstract class WiredDatatype extends TransactionDatatype {
  private checkPoint: CheckPoint;
  private opBuffer: Op[];
  wire?: Wire;

  protected constructor(ctx: ClientContext, key: string, type: TypeOfDatatype, state: StateOfDatatype, wire?: Wire) {
    super(ctx, key, type, state);
    this.checkPoint = new CheckPoint();
    this.opBuffer = Array<Op>();
    this.wire = wire;
  }

  public applyPushPullPack(ppp: PushPullPack): void {
    this.ctx.L.debug(`[🚆🔻] BEGIN applyPushPull:${ppp.toString()}`);
    const errs: DatatypeError[] = new Array<DatatypeError>();
    const opList: Operation[] = new Array<Operation>();
    let newState: StateOfDatatype = this.state;
    const err = this.checkOptionAndError(ppp);
    if (!err) {
      this.excludeDuplicateOperations(ppp);
      this.syncCheckPoint(ppp.checkPoint);
      newState = this.evaluateStateForPushPullOption(ppp);
      this.state = newState;
      if (ppp.opList.length > 0) {
        opList.push(...this.sentenceRemoteInTx(...ppp.opList));
      }
    } else {
      errs.push(err);
    }

    // } finally {
    this.ctx.L.debug('[🚆🔺] END applyPushPull');
    this.callHandlers(errs, opList).then();
    // }
  }

  private async callHandlers(errs: DatatypeError[], opList: Operation[]): Promise<void> {
    if (errs.length > 0) {
      this.callOnErrors(...errs);
    }

    if (opList.length > 0) {
      this.callOnRemoteOperations(opList);
    }
  }

  public needPush(): boolean {
    if (!this.isSyncState()) {
      return false;
    }
    const needPush = this.checkPoint.cseq.compare(this.opId.seq) < 0;
    this.ctx.L.debug(
      `[🚆] need push? ${needPush}: (checkpoint.cseq:${this.checkPoint.cseq} vs opId.cseq:${this.opId.seq})`
    );
    return needPush;
  }

  public unsubscribe(): void {
    this.wire = undefined;
    this.state = StateOfDatatype.CLOSED;
  }

  public needPull(sseq: Uint64): boolean {
    if (!this.isSyncState()) {
      return false;
    }
    const needPull = this.checkPoint.sseq.compare(sseq) < 0;
    this.ctx.L.debug(
      `[🚆] need pull? ${needPull}: (checkpoint.sseq:${this.checkPoint.sseq} vs sseq:${sseq} at server)`
    );
    return needPull;
  }

  public notifyWireOnChangeState(): void {
    this.wire?.onChangeDatatypeState(this);
  }

  abstract callOnRemoteOperations(opList: unknown[]): void;

  private syncCheckPoint(newCheckPoint: CheckPoint): void {
    const oldCheckPoint = this.checkPoint.clone();
    if (this.checkPoint.cseq.compare(newCheckPoint.cseq) < 0) {
      this.checkPoint.cseq = newCheckPoint.cseq;
    }
    if (this.checkPoint.sseq.compare(newCheckPoint.sseq) < 0) {
      this.checkPoint.sseq = newCheckPoint.sseq;
    }
    this.ctx.L.debug(`[🚆] SYNC checkpoint: ${oldCheckPoint.toString()}->${this.checkPoint.toString()}`);
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
    return Int64.sub(newCp.sseq, this.checkPoint.sseq).sub(Int64.sub(newCp.cseq, this.checkPoint.cseq)).asNumber();
    // (
    //    -
    //   (newCp.cseq.asNumber() - this.checkPoint.cseq.asNumber())
    // );
  }

  private checkOptionAndError(ppp: PushPullPack): DatatypeError | undefined {
    const option = ppp.option ? ppp.option : PushPullOptions.normal;
    if (PPOptions.hasError(option)) {
      if (ppp.opList.length > 0) {
        const errOp = ppp.opList[0] as ErrorOperation;
        this.ctx.L.error(`[🚆] receive error: ${errOp.toString()}`);
        const datatypeError = errOp.getDatatypeError();
        switch (datatypeError.code) {
          case DatatypeErrCodes.UNKNOWN:
            break;
          case DatatypeErrCodes.DUPLICATED_KEY:
            this.state = StateOfDatatype.CLOSED;
            break;
          case DatatypeErrCodes.NO_DATATYPE_TO_SUBSCRIBE:
            this.state = StateOfDatatype.CLOSED;
            break;
        }
        return errOp.getDatatypeError();
      }
    }
    if (PPOptions.hasSubscribe(option)) {
      this.resetDatatypeForSubscribe(ppp.duid);
    }

    return undefined;
  }

  evaluateStateForPushPullOption(ppp: PushPullPack): StateOfDatatype {
    const option = ppp.option ? ppp.option : PushPullOptions.normal;
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
          return StateOfDatatype.CLOSED;
        }
        break;
      case StateOfDatatype.CLOSED:
        return StateOfDatatype.CLOSED;
      case StateOfDatatype.DELETED:
        return StateOfDatatype.DELETED;
      default:
        break;
    }
    throw new ErrDatatype.IllegalPushPullOption(PPOptions.toString(option), this.state, this.ctx.L);
  }

  private resetDatatypeForSubscribe(duid: DUID) {
    this.checkPoint = new CheckPoint(0, 0);
    this.opBuffer = new Array<Op>();
    this.id = duid;
    this.opId = new OperationID(this.ctx.cuid);
    this.ctx.L.debug(`[🚆] ready to subscribe:${this.checkPoint}`);
  }

  isSyncState(): boolean {
    if (this.state === StateOfDatatype.CLOSED || this.state === StateOfDatatype.DELETED) {
      return false;
    }
    return true;
  }

  public createPushPullPack(): PushPullPack | undefined {
    if (!this.isSyncState()) {
      return;
    }
    const operations = this.peekOperations(this.checkPoint.cseq);
    const cp = new CheckPoint(this.checkPoint.sseq, Uint64.add(this.checkPoint.cseq, operations.length));

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

  private peekOperations(recvCseq: Uint64): Op[] {
    if (this.opBuffer.length === 0) {
      return new Array<Op>();
    }
    const firstOp = this.opBuffer[0];
    const startCseq = firstOp.id.seq.asNumber();
    const start: number = recvCseq.asNumber() + 1 - startCseq;
    if (0 <= start && start < this.opBuffer.length) {
      return this.opBuffer.slice(start);
    }
    return new Array<Op>();
  }

  async deliverTransaction(transaction: Op[], manually?: boolean): Promise<void> {
    if (this.state === StateOfDatatype.CLOSED || this.state === StateOfDatatype.DELETED) {
      return Promise.resolve();
    }
    if (transaction.length > 0) {
      this.opBuffer.push(...transaction);
    }
    if (manually || this.ctx.client.syncType === SyncType.REALTIME) {
      await this.wire?.deliverTransaction(this);
      return;
    }
    return Promise.resolve();
  }

  async sync(): Promise<void> {
    await this.deliverTransaction([], true);
    this.ctx.L.info(`[🚆] end sync in WiredDatatype`);
    return;
  }
}
