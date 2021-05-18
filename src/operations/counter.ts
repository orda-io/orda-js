import { Op } from '@ooo/operations/operation';
import { Int32 } from '@ooo/types/integer';
import { TypeOfOperation } from '@ooo/types/operation';
import { OrtooLogger } from '@ooo/utils/ortoo_logger';
import { ErrDatatype } from '@ooo/errors/datatype';

export { IncreaseOperation };

class increaseBody {
  delta: Int32;

  constructor(delta: Int32) {
    this.delta = delta;
  }
}

class IncreaseOperation extends Op {
  body: increaseBody;

  constructor(delta: Int32) {
    super(TypeOfOperation.COUNTER_INCREASE);
    this.body = new increaseBody(delta);
  }

  static fromOpenApi(body: string, logger?: OrtooLogger): IncreaseOperation {
    try {
      const snap: increaseBody = JSON.parse(body);
      return new IncreaseOperation(snap.delta);
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
  }
}
