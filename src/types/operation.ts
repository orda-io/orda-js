import {
  NumericType,
  uint32,
  Uint32,
  uint64,
  Uint64,
} from '@ooo/types/integer';
import { CUID } from '@ooo/types/uid';
import {
  OrtooOperationID as OperationIdOa,
  OrtooTypeOfOperation as TypeOfOperation,
} from '@ooo/generated/openapi';

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
      this.cuid = new CUID(true);
    }
    this.seq = uint64(seq);
  }

  toString(): string {
    return (
      `${this.era.toString(10)}` +
      `:${this.lamport.toString(10)}` +
      `:${this.cuid.toShortString()}` +
      `:${this.seq.toString(10)}`
    );
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
    const diffErr = this.era.asNumber() - other.era.asNumber();
    if (diffErr > 0) {
      return 1;
    } else if (diffErr < 0) {
      return -1;
    }
    const diffLamport = this.lamport.asNumber() - other.lamport.asNumber();
    if (diffLamport > 0) {
      return 1;
    } else if (diffLamport < 0) {
      return -1;
    }
    return this.cuid.compare(other.cuid);
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
      new CUID(false, oa.CUID),
      uint64(oa.lamport),
      uint32(oa.era),
      uint64(oa.seq)
    );
  }
}
