import { Op } from '@ooo/operations/operation';
import { TypeOfOperation } from '@ooo/types/operation';
import { ErrDatatype } from '@ooo/errors/datatype';
import { OrdaLogger } from '@orda-io/orda-logger';
import { PushPullErrorCode } from '@ooo/errors/push_pull';
import { DatatypeErrCodes, DatatypeError } from '@ooo/errors/for_handlers';

export { TransactionOperation, SnapshotOperation, ErrorOperation };

class snapshotBody {
  Type: number;
  Snapshot: unknown;

  constructor(Type: number, snapshot: unknown) {
    this.Type = Type;
    this.Snapshot = snapshot;
  }
}

class SnapshotOperation extends Op {
  body: string;

  constructor(snapshot: string) {
    super(TypeOfOperation.SNAPSHOT);
    this.body = snapshot;
  }

  static fromOpenApi(body: string, logger?: OrdaLogger): SnapshotOperation {
    try {
      // const bodySnapshot = JSON.parse(body);

      return new SnapshotOperation(body);
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
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

class TransactionOperation extends Op {
  body: transactionBody;

  constructor(tag: string, numOfOps?: number) {
    super(TypeOfOperation.TRANSACTION);
    this.body = new transactionBody(tag, numOfOps ? numOfOps : 0);
  }

  static fromOpenApi(body: string, logger?: OrdaLogger): TransactionOperation {
    try {
      const bodyTransaction = JSON.parse(body);
      return new TransactionOperation(bodyTransaction.Tag, bodyTransaction.NumOfOps);
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
  }
}

class errorBody {
  Code: number;
  Msg: string;

  constructor(code: number, msg: string) {
    this.Code = code;
    this.Msg = msg;
  }
}

class ErrorOperation extends Op {
  body: errorBody;

  constructor(code: number, msg: string) {
    super(TypeOfOperation.ERROR);
    this.body = new errorBody(code, msg);
  }

  static fromOpenApi(body: string, logger?: OrdaLogger): ErrorOperation {
    try {
      const bodyError = JSON.parse(body);
      return new ErrorOperation(bodyError.Code, bodyError.Msg);
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
  }

  getDatatypeError(): DatatypeError {
    switch (this.body.Code) {
      case PushPullErrorCode.AbortionOfServer:
      case PushPullErrorCode.AbortionOfClient:
      case PushPullErrorCode.DuplicateKey:
        return new DatatypeError(DatatypeErrCodes.DUPLICATED_KEY, this.body.Msg);
      case PushPullErrorCode.MissingOps:
      case PushPullErrorCode.NoDatatypeToSubscribe:
        return new DatatypeError(DatatypeErrCodes.NO_DATATYPE_TO_SUBSCRIBE, this.body.Msg);
    }
    return new DatatypeError(DatatypeErrCodes.UNKNOWN, this.body.Msg);
  }
}
