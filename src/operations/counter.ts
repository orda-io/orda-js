import { Operation } from '@ooo/operations/operation';
import { Int32 } from '@ooo/types/integer';
import { TypeOfOperation } from '@ooo/types/operation';

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
}

export { IncreaseOperation };
