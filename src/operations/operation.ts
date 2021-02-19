import { OperationId, TypeOfOperation } from '@ooo/types/operation';
import { definitions } from '@ooo/generated/openapi';

export { Operation };

export type OperationOa = definitions['ortooOperation'];

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

  toOpenApi(): OperationOa {
    return {
      ID: this.id.toOpenApi(),
      opType: this.type,
      body: this.getBody(),
    };
  }

  toString(): string {
    return `${
      this.constructor.name
    }(id:"${this.id.toString()}", body:${this.getBody()})`;
  }
}
