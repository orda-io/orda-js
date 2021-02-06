import {
  OperationPb,
  OperationId,
  TypeOfOperation,
} from '@ooo/types/operation';

export { Operation, OperationPb };

abstract class Operation {
  id: OperationId;
  type: TypeOfOperation;

  protected constructor(type: TypeOfOperation) {
    this.type = type;
    this.id = new OperationId();
  }

  abstract getBody(): string;

  getType(): TypeOfOperation {
    return this.type;
  }

  toPb(): OperationPb {
    const pb = new OperationPb();
    const pbOp = new OperationPb();
    pbOp.setId(this.id.toPb());
    pbOp.setOptype(this.type);
    pbOp.setBody(this.getBody());
    return pb;
  }

  toString(): string {
    return `${
      this.constructor.name
    }(id:"${this.id.toString()}", body:${this.getBody()})`;
  }
}
