import { NumericType, uint64, Uint64 } from '@ooo/types/integer';
import { OrtooCheckPoint as CheckPointOa } from '@ooo/generated/openapi';

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

  toOpenApi(): CheckPointOa {
    return {
      sseq: this.sseq.toString(),
      cseq: this.cseq.toString(),
    };
  }
}
