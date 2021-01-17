import { WiredDatatype } from '@ooo/datatypes/wired';
import { Operation } from '@ooo/operations/operation';
import { ClientContext } from '@ooo/context';
import { TypeOfDatatype } from '@ooo/types/datatype';

const NotUserTransactionTag = 'NotUserTransactionTag!@#$%ORTOO';

export abstract class TransactionalDatatype extends WiredDatatype {
  private success: boolean;
  private isLocked: boolean;
  protected trxCtx?: TransactionContext;

  protected constructor(ctx: ClientContext, key: string, type: TypeOfDatatype) {
    super(ctx, key, type);
    this.success = false;
    this.isLocked = false;
    // this.currentTrxCtx = null;
  }

  protected sentenceInTransaction(
    ctx: TransactionContext | undefined,
    op: Operation,
    isLocal: boolean
  ): unknown {
    try {
      // const trxCtx = this.beginTransaction(NotUserTransactionTag, ctx, false);
      this.ctx.L.debug('TODO: should begin transaction');
      if (isLocal) {
        return this.sentenceInBase(op);
      }
    } finally {
      this.ctx.L.debug('TODO: should end transaction');
    }
  }
}

class TransactionContext {
  tag: string;
  opBuffer: Operation[];

  constructor(tag: string) {
    this.tag = tag;
    this.opBuffer = new Array<Operation>();
  }
}
