import { Op } from '@ooo/operations/operation';
import { TypeOfOperation } from '@ooo/types/operation';
import { OrtooLogger } from '@ooo/utils/ortoo_logger';
import { ErrDatatype } from '@ooo/errors/datatype';

export { PutOperation, RemoveOperation };

class putBody {
  Key: string;
  Value: unknown;

  constructor(key: string, value: unknown) {
    this.Key = key;
    this.Value = value;
  }
}

class PutOperation extends Op {
  body: putBody;

  constructor(key: string, value: unknown) {
    super(TypeOfOperation.MAP_PUT);
    this.body = new putBody(key, value);
  }

  static fromOpenApi(body: string, logger?: OrtooLogger): PutOperation {
    try {
      const snap = JSON.parse(body);
      return new PutOperation(snap.Key, snap.Value);
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
  }
}

class removeBody {
  Key: string;

  constructor(key: string) {
    this.Key = key;
  }
}

class RemoveOperation extends Op {
  body: removeBody;

  constructor(key: string) {
    super(TypeOfOperation.MAP_REMOVE);
    this.body = new removeBody(key);
  }

  static fromOpenApi(body: string, logger?: OrtooLogger): RemoveOperation {
    try {
      const snap = JSON.parse(body);
      return new RemoveOperation(snap.Key);
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
  }
}
