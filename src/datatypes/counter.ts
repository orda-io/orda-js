import { Datatype, IDatatype } from '@ooo/datatypes/datatype';
import { int32, Int32 } from '@ooo/types/integer';
import { IncreaseOperation } from '@ooo/operations/counter';
import { ClientContext, DatatypeContext } from '@ooo/context';
import { Op } from '@ooo/operations/operation';
import { StateOfDatatype, TypeOfDatatype } from '@ooo/types/datatype';
import { TypeOfOperation } from '@ooo/types/operation';
import { TransactionContext } from '@ooo/datatypes/tansaction';
import { Snapshot } from '@ooo/datatypes/snapshot';
import { ErrDatatype } from '@ooo/errors/datatype';
import { OrtooError } from '@ooo/errors/error';
import { Wire } from '@ooo/datatypes/wired';
import { SnapshotOperation } from '@ooo/operations/meta';
import { DatatypeHandlers } from '@ooo/handlers/handlers';

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

  constructor(
    ctx: ClientContext,
    key: string,
    state: StateOfDatatype,
    wire?: Wire,
    handlers?: DatatypeHandlers
  ) {
    super(ctx, key, TypeOfDatatype.COUNTER, state, wire, handlers);
    this.snap = new CounterSnapshot(this.ctx);
    this.resetRollbackContext();
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
      const op = new IncreaseOperation(int32(delta));
      const ret: unknown[] = this.sentenceLocalInTx(op);
      return (ret[0] as Int32).asNumber();
    } catch (e) {
      if (e instanceof OrtooError) {
        throw e;
      }
      throw new ErrDatatype.IllegalParameters(this.ctx.L, e);
    }
  }

  executeLocalOp(op: Op): unknown {
    return this.executeCommon(op);
  }

  executeRemoteOp(op: Op): unknown {
    return this.executeCommon(op);
  }

  private executeCommon(op: Op): unknown {
    switch (op.type) {
      case TypeOfOperation.SNAPSHOT:
        const sop = op as SnapshotOperation;
        this.snap.fromJSON(sop.getBody());
        return;
      case TypeOfOperation.COUNTER_INCREASE:
        const iop = op as IncreaseOperation;
        return this.snap.increaseCommon(iop.body.delta);
    }
    throw new ErrDatatype.IllegalOperation(
      this.ctx.L,
      this.type,
      op.toString()
    );
  }

  transaction(tag: string, txFunc: (counter: CounterTx) => boolean): boolean {
    return this.doTransaction(tag, (txCtx: TransactionContext): boolean => {
      return txFunc(this);
    });
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
    this.ctx.L.debug(`[COUNTER] add ${delta} to ${this.value.get()}`);
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

  toJSONString(): string {
    return JSON.stringify(this.toJSON());
  }

  fromJSON(json: string): void {
    const parsed: ICounterSnapshot = JSON.parse(json);
    this.value = int32(parsed.value);
  }
}
