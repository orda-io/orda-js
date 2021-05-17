import { uint32, Uint32, uint64, Uint64 } from '@ooo/types/integer';
import { CUID, strcmp } from '@ooo/types/uid';

export class Timestamp {
  private readonly era: Uint32;
  private readonly lamport: Uint64;
  private readonly cuid: CUID;
  private readonly delimiter: Uint32;

  constructor(era: Uint32, lamport: Uint64, cuid: string, delimiter: Uint32) {
    this.era = uint32(era);
    this.lamport = uint64(lamport);
    this.cuid = cuid;
    this.delimiter = uint32(delimiter);
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
    return `${this.era.toString()}${this.lamport.toString()}${
      this.cuid
    }${this.delimiter.toString()}`;
  }

  next(): Timestamp {
    return new Timestamp(this.era, this.lamport.add(1), this.cuid, uint32(0));
  }

  getAndNextDelimiter(): Timestamp {
    const current = new Timestamp(
      this.era,
      this.lamport,
      this.cuid,
      this.delimiter
    );
    this.delimiter.add(1);
    return current;
  }

  clone(): Timestamp {
    return new Timestamp(this.era, this.lamport, this.cuid, this.delimiter);
  }

  static fromEncoded(encoded: any): Timestamp {
    return new Timestamp(
      uint32(encoded.era),
      uint64(encoded.lamport),
      encoded.cuid,
      uint32(encoded.delimiter)
    );
  }
}
