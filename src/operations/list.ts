import { Op } from '@orda/operations/operation';
import { Timestamp } from '@orda/types/timestamp';
import { ErrDatatype } from '@orda/errors/datatype';
import { TypeOfOperation } from '@orda/types/operation';
import { OrdaLogger } from '@orda-io/orda-logger';

class insertBody {
  T: Timestamp;
  V: unknown[];

  constructor(T: Timestamp, V: unknown[]) {
    this.T = T;
    this.V = V;
  }
}

export class InsertOperation extends Op {
  pos: number;
  body: insertBody;

  constructor(pos: number, values: unknown[]) {
    super(TypeOfOperation.LIST_INSERT);
    this.pos = pos;
    this.body = new insertBody(Timestamp.getOldest(), values);
  }

  static fromOpenApi(body: string, logger?: OrdaLogger): InsertOperation {
    try {
      const snap = JSON.parse(body);
      const insert = new InsertOperation(0, snap.V);
      insert.body.T = Timestamp.fromJSON(snap.T);
      return insert;
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
  }
}

class deleteBody {
  T: Timestamp[];

  constructor(T: Timestamp[]) {
    this.T = T;
  }
}

export class DeleteOperation extends Op {
  pos: number;
  numOfNodes: number;
  body: deleteBody;

  constructor(pos: number, numOfNodes: number) {
    super(TypeOfOperation.LIST_DELETE);
    this.pos = pos;
    this.numOfNodes = numOfNodes;
    this.body = new deleteBody([]);
  }

  static fromOpenApi(body: string, logger?: OrdaLogger): DeleteOperation {
    try {
      const snap = JSON.parse(body);
      const del = new DeleteOperation(0, snap.T.length);
      snap.T.forEach((ts: any) => {
        del.body.T.push(Timestamp.fromJSON(ts));
      });
      return del;
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
  }
}

class updateBody {
  T: Timestamp[];
  V: unknown[];

  constructor(T: Timestamp[], V: unknown[]) {
    this.T = T;
    this.V = V;
  }
}

export class UpdateOperation extends Op {
  pos: number;
  body: updateBody;

  constructor(pos: number, values: unknown[]) {
    super(TypeOfOperation.LIST_UPDATE);
    this.pos = pos;
    this.body = new updateBody([], values);
  }

  static fromOpenApi(body: string, logger?: OrdaLogger): UpdateOperation {
    try {
      const snap = JSON.parse(body);
      const update = new UpdateOperation(0, snap.V);
      snap.T.forEach((ts: any) => {
        update.body.T.push(Timestamp.fromJSON(ts));
      });
      return update;
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
  }
}
