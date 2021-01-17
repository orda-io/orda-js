import { OperationId, TypeOfOperation } from '@ooo/types/operation';
import { Operation as OperationPb } from '@ooo/protobuf/ortoo_pb';

export { Operation };

abstract class Operation {
  protected id?: OperationId;
  protected type: TypeOfOperation;

  protected constructor(type: TypeOfOperation) {
    this.type = type;
  }

  setId(opID: OperationId): void {
    this.id = opID;
  }

  abstract getContent(): string;

  getType(): TypeOfOperation {
    return this.type;
  }

  toOperationPb(): OperationPb {
    const pb = new OperationPb();
    const pbOp = new OperationPb();
    pbOp.setId(this.id?.toProtobuf());
    pbOp.setOptype(this.type);
    pbOp.setBody(this.getContent());
    return pb;
  }
}
