import { TimedNode, TimedType } from '@orda/datatypes/timed';
import { Timestamp } from '@orda/types/timestamp';

export interface OrderedType extends TimedType {
  orderedTime: Timestamp;
  prev?: OrderedType;
  next?: OrderedType;

  getNextLive(): OrderedType | undefined;

  insertNext(n: OrderedType): void;

  hash(): string;

  timedType: TimedType;
}

export function createNullOrderedNode() {
  const ts = Timestamp.getOldest();
  return new OrderedNode(ts, new TimedNode(undefined, ts));
}

export class OrderedNode implements OrderedType {
  orderedTime: Timestamp;
  timedType: TimedType;
  next?: OrderedType;
  prev?: OrderedType;

  constructor(orderedTime: Timestamp, tt: TimedType) {
    this.timedType = tt;
    if (orderedTime) {
      this.orderedTime = orderedTime;
    } else {
      this.orderedTime = Timestamp.getOldest();
    }
  }

  equals(o: OrderedType): boolean {
    if (!Timestamp.equals(this.orderedTime, o.orderedTime)) {
      return false;
    }
    if ((this.next && !o.next) || (!this.next && o.next)) {
      return false;
    }

    if (this.next && o.next && !Timestamp.equals(this.next.orderedTime, o.next.orderedTime)) {
      return false;
    }
    if ((this.prev && !o.prev) || (!this.prev && o.prev)) {
      return false;
    }

    return !(this.prev && o.prev && !Timestamp.equals(this.prev.orderedTime, o.prev.orderedTime));
  }

  static equal(on1: OrderedType | undefined, on2: OrderedType | undefined): boolean {
    if (!on1 && !on2) {
      return true;
    }
    if (on1 && on2) {
      return on1.equals(on2);
    }
    return false;
  }

  getNextLive(): OrderedType | undefined {
    let ret: OrderedType | undefined = this.next;
    while (ret !== undefined) {
      if (!ret.isTomb()) {
        return ret;
      }
      ret = ret.next;
    }
    return ret;
  }

  hash(): string {
    return this.orderedTime.hash();
  }

  insertNext(n: OrderedType): void {
    const oldNext: OrderedType | undefined = this.next;
    this.next = n;
    n.prev = this;
    n.next = oldNext;
    if (oldNext !== undefined) {
      oldNext.prev = n;
    }
  }

  toJSON(): unknown {
    return {
      V: this.timedType.value,
      T: this.timedType.time,
      O: this.orderedTime,
    };
  }

  static fromJSON(encoded: any): OrderedNode {
    const timedNode = new TimedNode(encoded.V, encoded.T);
    return new OrderedNode(encoded.O, timedNode);
  }

  get time(): Timestamp {
    return this.timedType.time;
  }

  set time(ts: Timestamp) {
    this.timedType.time = ts;
  }

  get value(): unknown {
    return this.timedType.value;
  }

  set value(v: unknown) {
    this.timedType.value = v;
  }

  isTomb(): boolean {
    return this.timedType.isTomb();
  }

  makeTomb(ts?: Timestamp): void {
    this.timedType.makeTomb(ts);
  }
}
