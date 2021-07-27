import { Op, Operation } from '@orda/operations/operation';
import { TransactionOperation } from '@orda/operations/meta';
import { ClientContext } from '@orda/context';
import { DatatypeMeta, StateOfDatatype, TypeOfDatatype } from '@orda/types/datatype';
import { BaseDatatype } from '@orda/datatypes/base';

const LOCAL_TX_TAG = 'LocalTransactionTag!@#$%OrToO';
const REMOTE_TX_TAG = 'RemoteTransactionTag!@#$%OrToO';

export { TransactionContext, TransactionDatatype };

abstract class TransactionDatatype extends BaseDatatype {
  private inProgress: boolean;
  private txCtxInProgress: TransactionContext | null; // if null, no transaction in progress.
  private rollbackCtx!: RollbackContext;

  protected constructor(ctx: ClientContext, key: string, type: TypeOfDatatype, state: StateOfDatatype) {
    super(ctx, key, type, state);
    this.inProgress = false;
    this.txCtxInProgress = null;
  }

  sentenceLocalInTx(op: Op): unknown {
    return this.sentenceInTx(true, op)[0];
  }

  sentenceRemoteInTx(...opArray: Op[]): Operation[] {
    return this.sentenceInTx(false, ...opArray) as Operation[];
  }

  private sentenceInTx(isLocal: boolean, ...opArray: Op[]): unknown[] {
    const ret = new Array<unknown>();
    this.doTransaction(isLocal ? LOCAL_TX_TAG : REMOTE_TX_TAG, (txCtx) => {
      opArray.forEach((op) => {
        if (isLocal) {
          ret.push(this.sentenceLocal(op)); // might throw error
        } else {
          ret.push(this.sentenceRemote(op));
        }
        txCtx.push(op);
      });
      return true;
    });
    return ret;
  }

  /*
  doTransaction() is called 
  in either transaction() of datatype implementations 
  or sentenceInTx()
   */
  doTransaction(tag: string, txFunc: (txCtx: TransactionContext) => boolean): boolean {
    const began = this.beginTransaction(tag);
    try {
      const result = txFunc(this.txCtxInProgress!); // might throw error, then go to finally in cascade
      if (began) {
        this.txCtxInProgress!.success = result;
      }
    } finally {
      if (began) {
        this.endTransaction();
      }
    }
    return true;
  }

  /* return true if a transaction really begins; otherwise false */
  private beginTransaction(tag: string): boolean {
    if (this.inProgress) {
      return false; // already began
    }
    this.inProgress = true;
    this.txCtxInProgress = new TransactionContext(tag);
    this.ctx.L.debug(`[🔒🔻] BEGIN: ${tag}`);
    if (tag !== LOCAL_TX_TAG && tag !== REMOTE_TX_TAG) {
      const op = new TransactionOperation(tag);
      op.id = this.opId.next();
      this.txCtxInProgress.push(op);
    }
    return true;
  }

  abstract deliverTransaction(opList: Op[], manually?: boolean): void;

  private endTransaction(): void {
    try {
      if (this.txCtxInProgress?.success) {
        if (this.txCtxInProgress.opBuffer.length > 0) {
          const op = this.txCtxInProgress.opBuffer[0];
          if (op instanceof TransactionOperation) {
            op.body.numOfOps = this.txCtxInProgress.opBuffer.length;
          }
          this.ctx.L.debug(`[🔒] contains ${this.txCtxInProgress.opBuffer.length} operation(s)`);
        }
        this.rollbackCtx.push(this.txCtxInProgress.opBuffer);
        if (REMOTE_TX_TAG !== this.txCtxInProgress.tag) {
          this.deliverTransaction(this.txCtxInProgress.opBuffer);
        }
      } else {
        this.rollback();
      }
    } finally {
      this.ctx.L.debug(`[🔒🔺] END: ${this.txCtxInProgress?.tag}`);
      this.releaseTx();
    }
  }

  releaseTx(): void {
    if (this.inProgress) {
      this.txCtxInProgress = null;
      this.inProgress = false;
    }
  }

  rollback(): void {
    this.ctx.L.debug(`[🔒🔃🔻] BEGIN rollback:${this.txCtxInProgress?.tag}`);
    this.setMetaAndSnapshot(this.rollbackCtx.meta, this.rollbackCtx.snap);
    this.rollbackCtx.opBuffer.forEach((op) => {
      this.sentenceRemote(op);
    });
    this.resetRollbackContext();
    this.ctx.L.debug(`[🔒🔃🔺] END rollback:${this.txCtxInProgress?.tag}`);
  }

  resetRollbackContext(): RollbackContext {
    this.rollbackCtx = new RollbackContext(this.getMeta(), JSON.stringify(this.getSnapshot()));
    return this.rollbackCtx;
  }

  setTransactionContextAndLock(tag: string): TransactionContext {
    if (!Object.is(tag, LOCAL_TX_TAG)) {
      this.ctx.L.debug(`[🔒] begin transaction: ${tag}`, tag);
    }
    this.inProgress = true;
    return new TransactionContext(tag);
  }
}

class TransactionContext {
  tag: string;
  opBuffer: Op[];
  success: boolean;

  constructor(tag: string) {
    this.tag = tag;
    this.success = false;
    this.opBuffer = new Array<Op>();
  }

  push(op: Op): void {
    this.opBuffer.push(op);
  }
}

class RollbackContext {
  meta: DatatypeMeta;
  snap: string;
  opBuffer: Op[];

  constructor(meta: DatatypeMeta, snapshot: string) {
    this.meta = meta;
    this.snap = snapshot;
    this.opBuffer = new Array<Op>();
  }

  push(ops: Op[]): void {
    this.opBuffer.push(...ops);
  }
}
