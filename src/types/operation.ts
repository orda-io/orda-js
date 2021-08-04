import { NumericType, uint32, Uint32, uint64, Uint64 } from '@orda-io/orda-integer';
import { createNullUID, CUID, strcmp } from '@orda/types/uid';
import { OrdaOperationID as OperationIDOa, OrdaTypeOfOperation as TypeOfOperation } from '@orda/generated/openapi';
import { Timestamp } from '@orda/types/timestamp';

export { TypeOfOperation };

export const TypeOfSnapshotOperation = {
  COUNTER: TypeOfOperation.COUNTER_SNAPSHOT,
  MAP: TypeOfOperation.MAP_SNAPSHOT,
  LIST: TypeOfOperation.LIST_SNAPSHOT,
  DOCUMENT: TypeOfOperation.DOC_SNAPSHOT,
};

export class OperationID {
  era: Uint32;
  lamport: Uint64;
  cuid: CUID;
  seq: Uint64;

  constructor(cuid?: CUID, lamport?: NumericType, era?: NumericType, seq?: NumericType) {
    this.era = uint32(era);
    this.lamport = uint64(lamport);
    if (cuid) {
      this.cuid = cuid;
    } else {
      this.cuid = createNullUID();
    }
    this.seq = uint64(seq);
  }

  toString(): string {
    return `${this.era.toString(10)}` + `:${this.lamport.toString(10)}` + `:${this.cuid}` + `:${this.seq.toString(10)}`;
  }

  get timestamp(): Timestamp {
    return new Timestamp(this.era, this.lamport, this.cuid, uint32(0));
  }

  next(): OperationID {
    this.lamport.add();
    this.seq.add();
    return this.clone();
  }

  clone(): OperationID {
    return new OperationID(this.cuid, this.lamport.clone(Uint64), this.era.clone(Uint32), this.seq.clone(Uint64));
  }

  sync(other: OperationID): void {
    if (this.lamport < other.lamport) {
      this.lamport.set(other.lamport);
    } else {
      this.lamport.add();
    }
  }

  rollback(): void {
    this.lamport.sub();
    this.seq.sub();
  }

  compare(other: OperationID): number {
    const diffEra = this.era.compare(other.era);
    if (diffEra !== 0) {
      return diffEra;
    }
    const diffLamport = this.lamport.compare(other.lamport);
    if (diffLamport !== 0) {
      return diffLamport;
    }
    return strcmp(this.cuid, other.cuid);
  }

  toOpenApi(): OperationIDOa {
    return {
      era: this.era.isZero() ? undefined : this.era.asNumber(),
      lamport: this.lamport.isZero() ? undefined : this.lamport.toString(),
      CUID: this.cuid.toString(),
      seq: this.seq.isZero() ? undefined : this.seq.toString(),
    };
  }

  static fromOpenApi(oa: OperationIDOa): OperationID {
    return new OperationID(oa?.CUID ? oa.CUID : createNullUID(), uint64(oa?.lamport), uint32(oa?.era), uint64(oa?.seq));
  }
}
