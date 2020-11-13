import { parse, stringify, v4 as uuid } from 'uuid';

export class UID {
  uid: Uint8Array;

  constructor(nil?: boolean) {
    if (nil) {
      this.uid = new Uint8Array(16);
      return;
    }
    this.uid = parse(uuid()) as Uint8Array;
  }

  get AsUint8Array(): Uint8Array {
    return this.uid;
  }

  public String(): string {
    return stringify(this.uid).replace(/-/g, '');
  }

  public Compare(o: UID): number {
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
