import { Operation } from '@ooo/operations/operation';
import { TypeOfOperation } from '@ooo/types/operation';
import { StateOfDatatype } from '@ooo/types/datatype';
import { logNew } from '@ooo/decorators/decorators';

export { TransactionOperation, SnapshotOperation };

class snapshotBody {
  state: StateOfDatatype;
  snapshot: string;

  constructor(state: StateOfDatatype, snapshot: string) {
    this.state = state;
    this.snapshot = snapshot;
  }
}

class SnapshotOperation extends Operation {
  body: snapshotBody;

  constructor(state: StateOfDatatype, snapshot: string) {
    super(TypeOfOperation.SNAPSHOT);
    this.body = new snapshotBody(state, snapshot);
  }

  getBody(): string {
    return JSON.stringify(this.body);
  }
}

class transactionBody {
  tag: string;
  numOfOps: number;

  constructor(tag: string, numOfOps: number) {
    this.tag = tag;
    this.numOfOps = numOfOps;
  }
}

class TransactionOperation extends Operation {
  body: transactionBody;

  constructor(tag: string, numOfOps?: number) {
    super(TypeOfOperation.TRANSACTION);
    this.body = new transactionBody(tag, numOfOps ? numOfOps : 0);
  }

  getBody(): string {
    return JSON.stringify(this.body);
  }
}
