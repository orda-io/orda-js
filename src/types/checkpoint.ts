import { CheckPoint as CP } from '@ooo/protobuf/ortoo_pb';
import {
  NumericType,
  uint32,
  Uint32,
  uint64,
  Uint64,
} from '@ooo/types/integer';

export class CheckPoint {
  private _cseq: Uint32;
  private _sseq: Uint64;

  constructor(cseq?: NumericType, sseq?: NumericType) {
    this._cseq = uint32(cseq);
    this._sseq = uint64(sseq);
  }

  get sseq(): Uint64 {
    return this._sseq;
  }

  set sseq(value: Uint64) {
    this._sseq = value;
  }

  get cseq(): Uint32 {
    return this._cseq;
  }

  set cseq(value: Uint32) {
    this._cseq = value;
  }

  public setCseq(cseq: NumericType): CheckPoint {
    this._cseq = uint32(cseq);
    return this;
  }

  public setSseq(sseq: NumericType): CheckPoint {
    this._sseq = uint64(sseq);
    return this;
  }

  static fromProtobuf(cp: CP): CheckPoint {
    return new CheckPoint(cp.getCseq(), cp.getSseq());
  }

  toProtobuf(): CP {
    const cp = new CP();
    cp.setSseq(this.sseq.toString());
    cp.setCseq(this.cseq.toString());
    return cp;
  }
}
