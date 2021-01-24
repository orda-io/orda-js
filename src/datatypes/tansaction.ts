import { WiredDatatype } from '@ooo/datatypes/wired';
import { Operation } from '@ooo/operations/operation';
import { TransactionOperation } from '@ooo/operations/meta';
import { ClientContext } from '@ooo/context';
import { DatatypeMeta, TypeOfDatatype } from '@ooo/types/datatype';
import { Datatype } from '@ooo/datatypes/datatype';

const NotUserTxTag = 'NotUserTransactionTag!@#$%ORTOO';

export { TransactionContext, TransactionDatatype };

class TransactionDatatype extends WiredDatatype {
  private inProgress: boolean;
  private txCtxInProgress: TransactionContext | null; // if null, no transaction in progress.
  private rollbackCtx!: RollbackContext;

  constructor(
    ctx: ClientContext,
    key: string,
    type: TypeOfDatatype,
    impl: Datatype
  ) {
    super(ctx, key, type, impl);
    this.inProgress = false;
    this.txCtxInProgress = null;
    // this.rollbackCtx = new RollbackContext(this.getMeta(), '');
  }

  sentenceInTx(op: Operation, isLocal: boolean): unknown {
    let ret;
    this.doTransaction(NotUserTxTag, (txCtx) => {
      if (isLocal) {
        ret = this.sentenceInBase(op); // might throw error
        txCtx.push(op);
        return true;
      } else {
      }
      return true;
    });
    return ret;
  }

  /*
  doTransaction() is called 
  in either transaction() of datatype implementations 
  or sentenceInTx()
   */
  doTransaction(
    tag: string,
    txFunc: (txCtx: TransactionContext) => boolean
    // txCtxInImpl: TransactionContext | null // null if called in transaction(), but not in in sentenceInTx()
  ): boolean {
    const began = this.#beginTransaction(tag);
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
  #beginTransaction = (tag: string): boolean => {
    if (this.inProgress) {
      return false; // already began
    }
    this.inProgress = true;
    this.txCtxInProgress = new TransactionContext(tag);
    this.ctx.L.debug(`begin transaction: ${tag}`);
    if (!Object.is(tag, NotUserTxTag)) {
      const op = new TransactionOperation(tag);
      op.id = this.opId.next();
      this.txCtxInProgress.push(op);
    }
    return true;
  };

  endTransaction(): void {
    try {
      if (this.txCtxInProgress?.success) {
        if (this.txCtxInProgress.opBuffer.length > 0) {
          const op = this.txCtxInProgress.opBuffer[0];
          if (op instanceof TransactionOperation) {
            op.c.numOfOps = this.txCtxInProgress.opBuffer.length;
          }
          this.ctx.L.debug(
            `transaction has ${this.txCtxInProgress.opBuffer.length} operations`
          );
        }
        this.rollbackCtx.push(this.txCtxInProgress.opBuffer);
        // if (isLocal) {
        //   // this.deliverTransaction(txCtx.opBuffer);
        // }
        // if (!Object.is(this.txCtxInProgress.tag, NotUserTxTag)) {

        // }
      } else {
        this.rollback();
      }
    } finally {
      this.ctx.L.debug(`end transaction: ${this.txCtxInProgress?.tag}`);
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
    this.ctx.L.debug(`begin rollback:${this.txCtxInProgress?.tag}`);
    this.setMetaAndSnapshot(this.rollbackCtx.meta, this.rollbackCtx.snap);
    this.rollbackCtx.opBuffer.forEach((op) => {
      this.replay(op);
    });
    this.resetRollbackContext();
    this.ctx.L.debug(`end rollback:${this.txCtxInProgress?.tag}`);
  }

  resetRollbackContext(): RollbackContext {
    this.rollbackCtx = new RollbackContext(
      this.getMeta(),
      JSON.stringify(this.impl.getSnapshot())
    );
    this.ctx.L.info(this.rollbackCtx.snap);
    return this.rollbackCtx;
  }

  setTransactionContextAndLock(tag: string): TransactionContext {
    if (!Object.is(tag, NotUserTxTag)) {
      this.ctx.L.debug(`begin transaction: ${tag}`, tag);
    }
    this.inProgress = true;
    return new TransactionContext(tag);
  }
}

class TransactionContext {
  tag: string;
  opBuffer: Operation[];
  success: boolean;

  constructor(tag: string) {
    this.tag = tag;
    this.success = false;
    this.opBuffer = new Array<Operation>();
  }

  push(op: Operation) {
    this.opBuffer.push(op);
  }
}

class RollbackContext {
  meta: DatatypeMeta;
  snap: string;
  opBuffer: Operation[];

  constructor(meta: DatatypeMeta, snapshot: string) {
    this.meta = meta;
    this.snap = snapshot;
    this.opBuffer = new Array<Operation>();
  }

  push(ops: Operation[]): void {
    this.opBuffer.push(...ops);
  }
}
