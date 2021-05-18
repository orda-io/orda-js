import { Timestamp } from '@ooo/types/timestamp';

export interface TimedType {
  value: unknown;
  time: Timestamp;

  isTomb(): boolean;

  makeTomb(ts: Timestamp): void;
}

export class TimedNode implements TimedType {
  private V: unknown;
  private T: Timestamp;

  isTomb(): boolean {
    return !this.V;
  }

  makeTomb(ts: Timestamp): void {
    this.T = ts;
    this.V = undefined;
  }

  constructor(v: unknown, ts: Timestamp) {
    this.V = v;
    this.T = ts;
  }

  get value(): unknown {
    return this.V;
  }

  set value(v: unknown) {
    this.V = v;
  }

  get time(): Timestamp {
    return this.T;
  }

  set time(ts: Timestamp) {
    this.T = ts;
  }

  toJSON(): unknown {
    return {
      v: this.V,
      t: this.T,
    };
  }
}
