import { Op } from "@ooo/operations/operation";
import { Int32 } from "@ooo/types/integer";
import { TypeOfOperation } from "@ooo/types/operation";
import { OrdaLogger } from "@ooo/utils/orda_logger";
import { ErrDatatype } from "@ooo/errors/datatype";

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
