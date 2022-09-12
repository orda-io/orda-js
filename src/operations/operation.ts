import { OperationID, TypeOfOperation } from '@orda/types/operation';
import { OrdaOperation as OperationOa } from '@orda/generated/openapi';
import { Timestamp } from '@orda/types/timestamp';
import { commonAtoB } from '@orda/utils/converter';

export type { OperationOa };
export { Op };

abstract class Op {
  id: OperationID;
  readonly type: TypeOfOperation;

  protected constructor(type: TypeOfOperation) {
    this.type = type;
    this.id = new OperationID();
  }

  abstract get body(): unknown;

  getStringBody(): string {
    if (typeof this.body === 'string') {
      return this.body;
    }
    return JSON.stringify(this.body);
  }

  get timestamp(): Timestamp {
    return this.id.timestamp;
  }

  setID<T extends Op>(this: T, id: OperationID): T {
    this.id = id.clone();
    return <T>this;
  }

  toOpenApi(): OperationOa {
    return {
      ID: this.id.toOpenApi(),
      opType: this.type,
      body: commonAtoB(this.getStringBody()),
    };
  }

  toString(): string {
    return `${this.constructor.name}(id:"${this.id.toString()}", body:${this.getStringBody()})`;
  }

  toOperation(): Operation {
    return new Operation(this.id, this.type, this.getStringBody());
  }
}

export class Operation {
  readonly id: OperationID;
  readonly type: TypeOfOperation;
  readonly body: unknown;

  constructor(id: OperationID, type: TypeOfOperation, body: unknown) {
    this.id = id.clone();
    this.type = type;
    this.body = body;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
