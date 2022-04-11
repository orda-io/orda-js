import { Op } from '@orda/operations/operation';
import { TypeOfOperation } from '@orda/types/operation';
import { ErrDatatype } from '@orda/errors/datatype';
import { OrdaLogger } from '@orda-io/orda-logger';
import { PushPullErrorCode } from '@orda/errors/push_pull';
import { DatatypeErrCodes, DatatypeError } from '@orda/errors/for_handlers';
import { TypeOfDatatype, TypeOfDatatypeMap } from '@orda/types/datatype';

export { TransactionOperation, SnapshotOperation, ErrorOperation };

class snapshotBody {
  Type: number;
  Snapshot: unknown;

  constructor(Type: TypeOfDatatype, snapshot: unknown) {
    this.Type = TypeOfDatatypeMap[Type];
    this.Snapshot = snapshot;
  }
}

class SnapshotOperation extends Op {
  body: string;

  constructor(type: TypeOfOperation, snapshot: string) {
    super(type);
    this.body = snapshot;
  }

  static fromOpenApi(snapshotType: TypeOfOperation, body: string, logger?: OrdaLogger): SnapshotOperation {
    try {
      // const bodySnapshot = JSON.parse(body);
      return new SnapshotOperation(snapshotType, body);
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e as Error);
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
      throw new ErrDatatype.Marshal(logger, e as Error);
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
      throw new ErrDatatype.Marshal(logger, e as Error);
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
