import { Operation } from '@ooo/operations/operation';
import { TypeOfOperation } from '@ooo/types/operation';

export { TransactionOperation };

// export class SnapshotOperation extends Operation {
//   executeLocal(): void {}
//
//   executeRemote(): void {}
//
//   setOperationId(opID: OperationId): void {}
//
//   toOperationPb(): Operation {
//     return null;
//   }
// }

class transactionContent {
  tag: string;
  numOfOps: number;

  constructor(tag: string, numOfOps: number) {
    this.tag = tag;
    this.numOfOps = numOfOps;
  }
}

class TransactionOperation extends Operation {
  c: transactionContent;

  constructor(tag: string, numOfOps?: number) {
    super(TypeOfOperation.TRANSACTION);
    this.c = new transactionContent(tag, numOfOps ? numOfOps : 0);
  }

  getContent(): string {
    return '';
  }
}
