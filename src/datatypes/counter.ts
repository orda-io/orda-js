import { Datatype, DatatypeSeed, IDatatype } from '@ooo/datatypes/datatype';
import { int32, Int32 } from '@ooo/types/integer';
import { IncreaseOperation } from '@ooo/operations/counter';
import { DatatypeContext } from '@ooo/context';
import { Operation } from '@ooo/operations/operation';
import { TypeOfDatatype } from '@ooo/types/datatype';
import { TypeOfOperation } from '@ooo/types/operation';
import { TransactionContext } from '@ooo/datatypes/tansaction';
import { Snapshot } from '@ooo/datatypes/snapshot';
import { ErrDatatype } from '@ooo/errors/datatype';
import { OrtooError } from '@ooo/errors/error';

export { _Counter };
export type { CounterTx, Counter };

interface CounterTx extends IDatatype {
  get(): number;

  increase(delta?: number): number;
}

interface Counter extends CounterTx {
  transaction(tag: string, fn: (counter: CounterTx) => boolean): boolean;
}

class _Counter extends Datatype implements Counter {
  private snap: CounterSnapshot;

  constructor(seed: DatatypeSeed, key: string, snap?: CounterSnapshot) {
    super(seed, key, TypeOfDatatype.COUNTER);
    if (snap) {
      this.snap = snap;
    } else {
      this.snap = new CounterSnapshot(this.ctx);
      this.txDatatype.resetRollbackContext();
    }
  }

  getSnapshot(): Snapshot {
    return this.snap;
  }

  setSnapshot(snap: string): void {
    this.snap.fromJSON(snap);
  }

  get(): number {
    return this.snap.value.asNumber();
  }

  increase(delta = 1): number {
    try {
      const op = new IncreaseOperation(delta);
      const ret = this.sentence(op) as Int32;
      return ret.asNumber();
    } catch (e) {
      if (e instanceof OrtooError) {
        throw e;
      }
      throw new ErrDatatype.IllegalParameters(this.ctx.L, e);
    }
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

  transaction(tag: string, txFunc: (counter: CounterTx) => boolean): boolean {
    const clone = new _Counter(this.txDatatype, this.key, this.snap);
    return this.txDatatype.doTransaction(
      tag,
      (txCtx: TransactionContext): boolean => {
        // clone.txCtx = txCtx; // created in beginTransaction()
        return txFunc(clone);
      }
      // clone.txCtx // initially null
    );
  }
}

interface ICounterSnapshot {
  value: number;
}

class CounterSnapshot implements Snapshot {
  ctx: DatatypeContext;
  value: Int32;

  constructor(ctx: DatatypeContext) {
    this.ctx = ctx;
    this.value = int32();
  }

  increaseCommon(delta: Int32): Int32 {
    this.ctx.L.debug(`add ${delta} to ${this.value.get()}`);
    try {
      return this.value.add(delta) as Int32;
    } catch (e) {
      throw new ErrDatatype.OutOfBound(this.ctx.L, e);
    }
  }

  toJSON(): ICounterSnapshot {
    return {
      value: this.value.asNumber(),
    };
  }

  fromJSON(json: string): void {
    const counterSnapshot: ICounterSnapshot = JSON.parse(json);
    this.value = int32(counterSnapshot.value);
  }
}
