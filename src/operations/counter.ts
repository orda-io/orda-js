import { Operation } from '@ooo/operations/operation';
import { Int32 } from '@ooo/types/integer';
import { TypeOfOperation } from '@ooo/types/operation';
import { OrtooLogger } from '@ooo/utils/ortoo_logger';
import { ErrDatatype } from '@ooo/errors/datatype';

class increaseBody {
  delta: Int32;

  constructor(delta: number) {
    this.delta = new Int32(delta);
  }
}

class IncreaseOperation extends Operation {
  c: increaseBody;

  constructor(delta: number) {
    super(TypeOfOperation.COUNTER_INCREASE);
    this.c = new increaseBody(delta);
  }

  getBody(): string {
    return JSON.stringify(this.c);
  }

  static fromOpenApi(body: string, logger?: OrtooLogger): IncreaseOperation {
    try {
      const snap = JSON.parse(body);
      return new IncreaseOperation(snap.delta);
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
  }
}

export { IncreaseOperation };
