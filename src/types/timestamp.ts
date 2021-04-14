import { Uint32, Uint64 } from '@ooo/types/integer';
import { CUID } from '@ooo/types/uid';

export class Timestamp {
  private era: Uint32;
  private lamport: Uint64;
  private cuid: CUID;
  private delimiter: Uint32;

  constructor(era: Uint32, lamport: Uint64, cuid: string, delimiter: Uint32) {
    this.era = era;
    this.lamport = lamport;
    this.cuid = cuid;
    this.delimiter = delimiter;
  }
}
