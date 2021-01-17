import { Operation } from '@ooo/operations/operation';
import { Int32 } from '@ooo/types/integer';
import { TypeOfOperation } from '@ooo/types/operation';

class increaseContent {
  delta: Int32;

  constructor(delta: number) {
    this.delta = new Int32(delta);
  }
}

class IncreaseOperation extends Operation {
  c: increaseContent;

  constructor(delta: number) {
    super(TypeOfOperation.COUNTER_INCREASE);
    this.c = new increaseContent(delta);
  }

  getContent(): string {
    return JSON.stringify(this.c);
  }
}

export { IncreaseOperation };
