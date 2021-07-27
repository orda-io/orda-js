import { Op } from '@orda/operations/operation';
import { Int32 } from '@orda-io/orda-integer';
import { TypeOfOperation } from '@orda/types/operation';
import { OrdaLogger } from '@orda-io/orda-logger';
import { ErrDatatype } from '@orda/errors/datatype';

export { IncreaseOperation };

class increaseBody {
  Delta: Int32;

  constructor(delta: Int32) {
    this.Delta = delta;
  }
}

class IncreaseOperation extends Op {
  body: increaseBody;

  constructor(delta: Int32) {
    super(TypeOfOperation.COUNTER_INCREASE);
    this.body = new increaseBody(delta);
  }

  static fromOpenApi(body: string, logger?: OrdaLogger): IncreaseOperation {
    try {
      const snap = JSON.parse(body);
      return new IncreaseOperation(snap.Delta);
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
  }
}
