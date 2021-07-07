import { NumericType, uint32, Uint32, uint64, Uint64 } from '@ooo/types/integer';
import { createNullUID, CUID, strcmp } from '@ooo/types/uid';
import { JSONType } from '@ooo/datatypes/json';

export class Timestamp {
  readonly era: Uint32;
  readonly lamport: Uint64;
  readonly cuid: CUID;
  readonly delimiter: Uint32;

  constructor(era: NumericType, lamport: NumericType, cuid: string, delimiter: NumericType) {
    this.era = uint32(era);
    this.lamport = uint64(lamport);
    this.cuid = cuid;
    this.delimiter = uint32(delimiter);
  }

  static getOldest(): Timestamp {
    return new Timestamp(0, 0, createNullUID(), 0);
  }

  compare(other: Timestamp): number {
    const diffEra = this.era.compare(other.era);
    if (diffEra !== 0) {
      return diffEra;
    }
    const diffLamport = this.lamport.compare(other.lamport);
    if (diffLamport !== 0) {
      return diffLamport;
    }
    const compDelimit = this.delimiter.compare(other.delimiter);
    if (compDelimit !== 0) {
      return compDelimit;
    }
    return strcmp(this.cuid, other.cuid);
  }

  hash(): string {
    return `${this.era.toString()}${this.lamport.toString()}${this.cuid}${this.delimiter.toString()}`;
  }

  toJSON(): unknown {
    return {
      e: this.era.isZero() ? undefined : this.era,
      l: this.lamport.isZero() ? undefined : this.lamport,
      c: this.cuid,
      d: this.delimiter.isZero() ? undefined : this.delimiter,
    };
  }

  static equals(ts1: Timestamp | undefined, ts2: Timestamp | undefined): boolean {
    if (!ts1 && !ts2) {
      // both undefined
      return true;
    }
    if ((ts1 && !ts2) || (!ts1 && ts2)) {
      return false;
    }
    return !!(ts1 && ts2 && ts1.compare(ts2) === 0);
  }

  static fromJSON(decoded: any): Timestamp {
    return new Timestamp(uint32(decoded.e), uint64(decoded.l), decoded.c, uint32(decoded.d));
  }

  next(): Timestamp {
    return new Timestamp(this.era, this.lamport.add(1), this.cuid, uint32(0));
  }

  getAndNextDelimiter(): Timestamp {
    const current = new Timestamp(this.era, this.lamport, this.cuid, this.delimiter);
    this.delimiter.add(1);
    return current;
  }

  clone(): Timestamp {
    return new Timestamp(this.era, this.lamport, this.cuid, this.delimiter);
  }

  toString(): string {
    return `[${this.era}:${this.lamport}:${this.cuid}:${this.delimiter}]`;
  }
}
