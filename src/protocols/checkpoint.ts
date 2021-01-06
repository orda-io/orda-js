import { CheckPoint as CP } from './protobuf/ortoo_pb';

export class CheckPoint {
  get sseq(): BigInt {
    return this._sseq;
  }

  set sseq(value: BigInt) {
    this._sseq = value;
  }

  get cseq(): BigInt {
    return this._cseq;
  }

  set cseq(value: BigInt) {
    this._cseq = value;
  }

  private _cseq: BigInt;
  private _sseq: BigInt;

  constructor(cseq: BigInt, sseq: BigInt) {
    this._cseq = cseq;
    this._sseq = sseq;
  }

  static fromProtobuf(cp: CP): CheckPoint {
    const sseq: BigInt = BigInt(cp.getSseq());
    const cseq: BigInt = BigInt(cp.getCseq());
    return new CheckPoint(cseq, sseq);
  }

  toProtobuf(): CP {
    const cp = new CP();
    cp.setSseq(this.sseq.toString());
    cp.setCseq(this.sseq.toString());
    return cp;
  }
}
