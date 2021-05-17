import { OperationId, TypeOfOperation } from '@ooo/types/operation';
import { OrtooOperation as OperationOa } from '@ooo/generated/openapi';
import { Uint32 } from '@ooo/types/integer';
import { Timestamp } from '@ooo/types/timestamp';

export type { OperationOa };
export { Op };

abstract class Op {
  id: OperationId;
  readonly type: TypeOfOperation;

  protected constructor(type: TypeOfOperation) {
    this.type = type;
    this.id = new OperationId();
  }

  abstract get body(): unknown;

  getBody(): string {
    return JSON.stringify(this.body);
  }

  get timestamp(): Timestamp {
    return this.id.timestamp;
  }

  toOpenApi(): OperationOa {
    return {
      ID: this.id.toOpenApi(),
      opType: this.type,
      body: Buffer.from(this.getBody()).toString('base64'),
    };
  }

  toString(): string {
    return `${
      this.constructor.name
    }(id:"${this.id.toString()}", body:${this.getBody()})`;
  }

  toOperation(): Operation {
    return new Operation(this.id, this.type, this.getBody());
  }
}

export class Operation {
  readonly id: OperationId;
  readonly type: TypeOfOperation;
  readonly body: unknown;

  constructor(id: OperationId, type: TypeOfOperation, body: unknown) {
    this.id = id.clone();
    this.type = type;
    this.body = body;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
