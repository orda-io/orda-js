import { CheckPoint as CP } from '@ooo/protobuf/ortoo_pb';
import {
  NumericType,
  uint32,
  Uint32,
  uint64,
  Uint64,
} from '@ooo/types/integer';

export { CheckPoint };

class CheckPoint {
  cseq: Uint64;
  sseq: Uint64;

  constructor(sseq?: NumericType, cseq?: NumericType) {
    this.sseq = uint64(sseq);
    this.cseq = uint64(cseq);
  }

  public setCseq(cseq: NumericType): CheckPoint {
    this.cseq = uint64(cseq);
    return this;
  }

  public setSseq(sseq: NumericType): CheckPoint {
    this.sseq = uint64(sseq);
    return this;
  }

  public clone(): CheckPoint {
    return new CheckPoint(this.cseq, this.sseq);
  }

  public toString(): string {
    return `(${this.sseq}, ${this.cseq})`;
  }

  static fromProtobuf(cp: CP): CheckPoint {
    return new CheckPoint(cp.getSseq(), cp.getCseq());
  }

  toPb(): CP {
    const cp = new CP();
    cp.setSseq(this.sseq.toString());
    cp.setCseq(this.cseq.toString());
    return cp;
  }
}
