import { Datatype, IDatatype } from '@ooo/datatypes/datatype';
import { int32, Int32 } from '@ooo/types/integer';
import { IncreaseOperation } from '@ooo/operations/counter';
import { ClientContext, DatatypeContext } from '@ooo/context';
import { Operation } from '@ooo/operations/operation';
import { TypeOfDatatype } from '@ooo/types/datatype';
import { TypeOfOperation } from '@ooo/types/operation';

export { CounterImpl };

export interface Counter extends IDatatype {
  get(): number;

  increase(delta?: number): number;
}

class CounterImpl extends Datatype implements Counter {
  private snap: counterSnapshot;

  constructor(ctx: ClientContext, key: string) {
    super(ctx, key, TypeOfDatatype.COUNTER);
    this.snap = new counterSnapshot(this.ctx);
  }

  get(): number {
    return this.snap.value.asNumber();
  }

  increase(delta = 1): number {
    this.ctx.L.info(delta);
    const op = new IncreaseOperation(delta);
    // this.executeLocalWithTra(op);
    this.sentenceInTransaction(this.trxCtx, op, true);
    return 0;
  }

  executeLocalOp(op: Operation): unknown {
    switch (op.getType()) {
      case TypeOfOperation.COUNTER_INCREASE:
        const iop = op as IncreaseOperation;
        return this.snap.increaseCommon(iop.c.delta);
    }
  }

  executeRemoteOp(op: Operation): unknown {
    return;
  }
}

class counterSnapshot {
  ctx: DatatypeContext;
  value: Int32;

  constructor(ctx: DatatypeContext) {
    this.ctx = ctx;
    this.value = int32();
  }

  increaseCommon(delta: Int32): Int32 {
    this.ctx.L.debug(`add ${delta} to ${this.value.get()}`);
    return this.value.add(delta) as Int32;
  }
}
