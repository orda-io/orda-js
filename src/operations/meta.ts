import { Op } from '@ooo/operations/operation';
import { TypeOfOperation } from '@ooo/types/operation';
import { ErrDatatype } from '@ooo/errors/datatype';
import { OrtooLogger } from '@ooo/utils/ortoo_logger';
import { PushPullErrorCode } from '@ooo/errors/push_pull';
import { DatatypeErrCodes, DatatypeError } from '@ooo/errors/for_handlers';

export { TransactionOperation, SnapshotOperation, ErrorOperation };

class snapshotBody {
  Snapshot: string;

  constructor(snapshot: string) {
    this.Snapshot = snapshot;
  }
}

class SnapshotOperation extends Op {
  body: snapshotBody;

  constructor(snapshot: string) {
    super(TypeOfOperation.SNAPSHOT);
    this.body = new snapshotBody(snapshot);
  }

  static fromOpenApi(body: string, logger?: OrtooLogger): SnapshotOperation {
    try {
      const bodySnapshot: snapshotBody = JSON.parse(body);
      return new SnapshotOperation(bodySnapshot.Snapshot);
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

  static fromOpenApi(body: string, logger?: OrtooLogger): TransactionOperation {
    try {
      const bodyTransaction: transactionBody = JSON.parse(body);
      return new TransactionOperation(
        bodyTransaction.tag,
        bodyTransaction.numOfOps
      );
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

  constructor(body: errorBody) {
    super(TypeOfOperation.ERROR);
    this.body = body;
  }

  static fromOpenApi(body: string, logger?: OrtooLogger): ErrorOperation {
    try {
      const bodyError: errorBody = JSON.parse(body);
      return new ErrorOperation(bodyError);
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
  }

  getDatatypeError(): DatatypeError {
    switch (this.body.Code) {
      case PushPullErrorCode.AbortionOfServer:
      case PushPullErrorCode.AbortionOfClient:
      case PushPullErrorCode.DuplicateKey:
        return new DatatypeError(
          DatatypeErrCodes.DUPLICATED_KEY,
          this.body.Msg
        );
      case PushPullErrorCode.MissingOps:
      case PushPullErrorCode.NoDatatypeToSubscribe:
        return new DatatypeError(
          DatatypeErrCodes.NO_DATATYPE_TO_SUBSCRIBE,
          this.body.Msg
        );
    }
    return new DatatypeError(DatatypeErrCodes.UNKNOWN, this.body.Msg);
  }
}
