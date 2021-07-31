import { Datatype, OrdaDatatype } from '@orda/datatypes/datatype';
import { int32, Int32 } from '@orda-io/orda-integer';
import { IncreaseOperation } from '@orda/operations/counter';
import { ClientContext, DatatypeContext } from '@orda/context';
import { Op } from '@orda/operations/operation';
import { StateOfDatatype, TypeOfDatatype } from '@orda/types/datatype';
import { TypeOfOperation } from '@orda/types/operation';
import { TransactionContext } from '@orda/datatypes/tansaction';
import { Snapshot } from '@orda/datatypes/snapshot';
import { ErrDatatype } from '@orda/errors/datatype';
import { OrdaError } from '@orda/errors/error';
import { Wire } from '@orda/datatypes/wired';
import { SnapshotOperation } from '@orda/operations/meta';
import { DatatypeHandlers } from '@orda/handlers/datatype';

export { _OrdaCounter };
export type { OrdaCounterTx, OrdaCounter };

interface OrdaCounterTx extends OrdaDatatype {
  get(): number;

  increase(delta?: number): number;
}

interface OrdaCounter extends OrdaCounterTx {
  transaction(tag: string, fn: (counter: OrdaCounterTx) => boolean): boolean;
}

class _OrdaCounter extends Datatype implements OrdaCounter {
  private readonly snap: CounterSnapshot;

  constructor(ctx: ClientContext, key: string, state: StateOfDatatype, wire?: Wire, handlers?: DatatypeHandlers) {
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
      const ret = this.sentenceLocalInTx(new IncreaseOperation(int32(delta))) as Int32;
      return ret.asNumber();
    } catch (e) {
      if (e instanceof OrdaError) {
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
        this.snap.fromJSON(sop.getStringBody());
        return;
      case TypeOfOperation.COUNTER_INCREASE:
        return this.snap.increaseCommon(<IncreaseOperation>op);
    }
    throw new ErrDatatype.IllegalOperation(this.ctx.L, this.type, op.toString());
  }

  transaction(tag: string, txFunc: (counter: OrdaCounterTx) => boolean): boolean {
    return this.doTransaction(tag, (txCtx: TransactionContext): boolean => {
      return txFunc(this);
    });
  }

  toJSON(): unknown {
    return this.snap.toNoMetaJSON();
  }
}

class CounterSnapshot implements Snapshot {
  ctx: DatatypeContext;
  value: Int32;

  constructor(ctx: DatatypeContext) {
    this.ctx = ctx;
    this.value = int32();
  }

  increaseCommon(op: IncreaseOperation): Int32 {
    this.ctx.L.debug(`[COUNTER] add ${op.body.Delta} to ${this.value.get()}`);
    try {
      return this.value.add(op.body.Delta) as Int32;
    } catch (e) {
      throw new ErrDatatype.OutOfBound(this.ctx.L, e);
    }
  }

  toJSON(): unknown {
    return {
      Counter: this.value.asNumber(),
    };
  }

  fromJSON(json: string): void {
    const parsed = JSON.parse(json);
    this.value = int32(parsed.Counter);
  }

  toNoMetaJSON(): unknown {
    return this.value.asNumber();
  }
}
