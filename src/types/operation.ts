import {
  NumericType,
  uint32,
  Uint32,
  uint64,
  Uint64,
} from '@ooo/types/integer';
import { createNullUID, CUID, strcmp } from '@ooo/types/uid';
import {
  OrtooOperationID as OperationIdOa,
  OrtooTypeOfOperation as TypeOfOperation,
} from '@ooo/generated/openapi';
import { Timestamp } from '@ooo/types/timestamp';

export { TypeOfOperation };

export class OperationId {
  era: Uint32;
  lamport: Uint64;
  cuid: CUID;
  seq: Uint64;

  constructor(
    cuid?: CUID,
    lamport?: NumericType,
    era?: NumericType,
    seq?: NumericType
  ) {
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
    return (
      `${this.era.toString(10)}` +
      `:${this.lamport.toString(10)}` +
      `:${this.cuid}` +
      `:${this.seq.toString(10)}`
    );
  }

  get timestamp(): Timestamp {
    return new Timestamp(this.era, this.lamport, this.cuid, uint32(0));
  }

  next(): OperationId {
    this.lamport.add();
    this.seq.add();
    return this.clone();
  }

  clone(): OperationId {
    return new OperationId(
      this.cuid,
      this.lamport.clone(Uint64),
      this.era.clone(Uint32),
      this.seq.clone(Uint64)
    );
  }

  sync(other: OperationId): void {
    if (this.lamport < other.lamport) {
      this.lamport = other.lamport;
    } else {
      this.lamport.add();
    }
  }

  rollback(): void {
    this.lamport.sub();
    this.seq.sub();
  }

  compare(other: OperationId): number {
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

  toOpenApi(): OperationIdOa {
    return {
      era: this.era.asNumber(),
      lamport: this.lamport.toString(),
      CUID: this.cuid.toString(),
      seq: this.seq.toString(),
    };
  }

  static fromOpenApi(oa: OperationIdOa): OperationId {
    return new OperationId(
      oa.CUID,
      uint64(oa.lamport),
      uint32(oa.era),
      uint64(oa.seq)
    );
  }
}
