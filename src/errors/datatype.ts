import { ErrorCode, OrtooError } from './error';
import { OrtooLogger } from '../utils/ortoo_logger';

export const ErrDatatype = {
  Create: class Create extends OrtooError {
    constructor(logger?: OrtooLogger) {
      super(ErrorCode.baseDatatypeCode, 'fail to create datatype:', logger);
    }
  },
  Subscribe: class Subscribe extends OrtooError {
    constructor(logger?: OrtooLogger) {
      super(
        ErrorCode.baseDatatypeCode + 1,
        'fail to subscribe datatype:',
        logger
      );
    }
  },
  Transaction: class Transaction extends OrtooError {
    constructor(logger?: OrtooLogger) {
      super(
        ErrorCode.baseDatatypeCode + 2,
        'fail to proceed transaction:',
        logger
      );
    }
  },
  Snapshot: class Snapshot extends OrtooError {
    constructor(logger?: OrtooLogger) {
      super(ErrorCode.baseDatatypeCode + 3, 'fail to make a snapshot:', logger);
    }
  },
  IllegalParameters: class Snapshot extends OrtooError {
    constructor(logger?: OrtooLogger) {
      super(
        ErrorCode.baseDatatypeCode + 4,
        'fail to execute the operation due to illegal operation:',
        logger
      );
    }
  },
  InvalidParent: class InvalidParent extends OrtooError {
    constructor(logger?: OrtooLogger) {
      super(
        ErrorCode.baseDatatypeCode + 5,
        'fail to modify due to the invalid parent:',
        logger
      );
    }
  },
  NoOp: class NoOp extends OrtooError {
    constructor(logger?: OrtooLogger) {
      super(ErrorCode.baseDatatypeCode + 6, 'fail to issue operation:', logger);
    }
  },
  Marshal: class Marshal extends OrtooError {
    constructor(logger?: OrtooLogger) {
      super(ErrorCode.baseDatatypeCode + 7, 'fail to (un)marshal:', logger);
    }
  },
  NoTarget: class NoTarget extends OrtooError {
    constructor(logger?: OrtooLogger) {
      super(ErrorCode.baseDatatypeCode + 7, 'fail to find target:', logger);
    }
  },
};
