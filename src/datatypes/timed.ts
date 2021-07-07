import { Timestamp } from '@ooo/types/timestamp';

export interface TimedType {
  value: unknown;
  time: Timestamp;

  isTomb(): boolean;

  makeTomb(ts?: Timestamp): void;

  equals(o: TimedType): boolean;
}

export class TimedNode implements TimedType {
  value: unknown;
  time: Timestamp;

  constructor(v: unknown, ts: Timestamp) {
    this.value = v;
    this.time = ts;
  }

  isTomb(): boolean {
    return !this.value;
  }

  makeTomb(ts: Timestamp): void {
    this.value = undefined;
    this.time = ts.clone();
  }

  toJSON(): unknown {
    return {
      v: this.value ? this.value : null,
      t: this.time,
    };
  }

  static fromJSON(json: any): TimedNode {
    return new TimedNode(json.v, json.t);
  }

  equals(o: TimedType): boolean {
    if (!Timestamp.equals(this.time, o.time)) {
      return false;
    }
    if (this.value !== o.value) {
      return false;
    }
    return true;
  }
}
