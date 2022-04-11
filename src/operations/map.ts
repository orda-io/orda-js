import { Op } from '@orda/operations/operation';
import { TypeOfOperation } from '@orda/types/operation';
import { OrdaLogger } from '@orda-io/orda-logger';
import { ErrDatatype } from '@orda/errors/datatype';

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

  static fromOpenApi(body: string, logger?: OrdaLogger): PutOperation {
    try {
      const snap = JSON.parse(body);
      return new PutOperation(snap.Key, snap.Value);
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e as Error);
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

  static fromOpenApi(body: string, logger?: OrdaLogger): RemoveOperation {
    try {
      const snap = JSON.parse(body);
      return new RemoveOperation(snap.Key);
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e as Error);
    }
  }
}
