import { parse, stringify, v4 as uuid } from 'uuid';
import { ShortUID } from '@ooo/constants/constants';

export { UID, CUID, DUID };

class UID {
  uid: Uint8Array;

  constructor(nil?: boolean, pb?: Uint8Array | string) {
    if (pb) {
      if (pb instanceof Uint8Array) {
        this.uid = pb;
      } else {
        throw new Error('not implemented yet');
      }
      return;
    }
    if (nil) {
      this.uid = new Uint8Array(16);
      return;
    }
    this.uid = parse(uuid()) as Uint8Array;
  }

  get AsUint8Array(): Uint8Array {
    return this.uid;
  }

  setUID(uid: this): this {
    this.uid = uid.uid;
    return this;
  }

  public toString(): string {
    return stringify(this.uid).replace(/-/g, '');
  }

  public toShortString(): string {
    const str = this.toString();
    return (
      str.substr(0, ShortUID / 2) + '~' + str.substr(str.length - ShortUID / 2)
    );
  }

  public compare(o: UID): number {
    let ret = 0;
    this.uid.some((value: number, index: number, _: Uint8Array): unknown => {
      if (value > o.uid[index]) {
        ret = 1;
        return true;
      } else if (value < o.uid[index]) {
        ret = -1;
        return true;
      }
      return false;
    });
    return ret;
  }
}

class CUID extends UID {}

class DUID extends UID {}
