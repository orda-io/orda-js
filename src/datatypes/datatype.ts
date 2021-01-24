import { TransactionDatatype } from '@ooo/datatypes/tansaction';
import { StateOfDatatype, TypeOfDatatype } from '@ooo/types/datatype';
import { ClientContext, DatatypeContext } from '@ooo/context';
import { Operation } from '@ooo/operations/operation';
import { Snapshot } from '@ooo/datatypes/snapshot';

export interface IDatatype {
  key: string;

  type: TypeOfDatatype;

  state: StateOfDatatype;
}

export type DatatypeSeed = ClientContext | TransactionDatatype;

export abstract class Datatype implements IDatatype {
  protected txDatatype: TransactionDatatype;

  protected constructor(seed: DatatypeSeed, key: string, type: TypeOfDatatype) {
    if (seed instanceof ClientContext) {
      this.txDatatype = new TransactionDatatype(seed, key, type, this);
    } else {
      this.txDatatype = seed;
    }
  }

  get key(): string {
    return this.txDatatype.key;
  }

  get state(): StateOfDatatype {
    return this.txDatatype.state;
  }

  get type(): TypeOfDatatype {
    return this.txDatatype.type;
  }

  get ctx(): DatatypeContext {
    return this.txDatatype.ctx;
  }

  sentence(op: Operation, isLocal = true): unknown {
    return this.txDatatype.sentenceInTx(op, isLocal);
  }

  abstract executeLocalOp(op: Operation): unknown;

  abstract executeRemoteOp(op: Operation): unknown;

  abstract getSnapshot(): Snapshot;

  abstract setSnapshot(snap: string): void;


}
