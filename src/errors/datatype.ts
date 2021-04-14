import { BaseErrorCode, OrtooError } from '@ooo/errors/error';
import { OrtooLogger } from '@ooo/utils/ortoo_logger';
import { StateOfDatatype } from '@ooo/types/datatype';

export { ErrDatatype };

const ErrDatatype = {
  Create: class Create extends OrtooError {
    constructor(logger?: OrtooLogger) {
      super(BaseErrorCode.Datatype, 'fail to create datatype:', logger);
    }
  },
  Subscribe: class Subscribe extends OrtooError {
    constructor(logger?: OrtooLogger) {
      super(BaseErrorCode.Datatype + 1, 'fail to subscribe datatype:', logger);
    }
  },
  Transaction: class Transaction extends OrtooError {
    constructor(logger?: OrtooLogger) {
      super(BaseErrorCode.Datatype + 2, 'fail to proceed transaction:', logger);
    }
  },
  Snapshot: class Snapshot extends OrtooError {
    constructor(logger?: OrtooLogger) {
      super(BaseErrorCode.Datatype + 3, 'fail to make a snapshot:', logger);
    }
  },
  IllegalParameters: class Snapshot extends OrtooError {
    constructor(logger?: OrtooLogger, e?: Error) {
      super(
        BaseErrorCode.Datatype + 4,
        'fail to execute the operation due to illegal parameters:',
        logger,
        e
      );
    }
  },
  InvalidParent: class InvalidParent extends OrtooError {
    constructor(logger?: OrtooLogger) {
      super(
        BaseErrorCode.Datatype + 5,
        'fail to modify due to the invalid parent:',
        logger
      );
    }
  },
  NoOp: class NoOp extends OrtooError {
    constructor(logger?: OrtooLogger) {
      super(BaseErrorCode.Datatype + 6, 'fail to issue operation:', logger);
    }
  },
  Marshal: class Marshal extends OrtooError {
    constructor(logger?: OrtooLogger, e?: Error) {
      super(BaseErrorCode.Datatype + 7, 'fail to (un)marshal:', logger, e);
    }
  },
  NoTarget: class NoTarget extends OrtooError {
    constructor(logger?: OrtooLogger) {
      super(BaseErrorCode.Datatype + 7, 'fail to find target:', logger);
    }
  },
  OutOfBound: class OutOfBound extends OrtooError {
    constructor(logger?: OrtooLogger, e?: Error) {
      super(
        BaseErrorCode.Datatype + 8,
        'fail due to out of bound error',
        logger,
        e
      );
    }
  },
  IllegalPushPullOption: class IllegalPushPullOption extends OrtooError {
    constructor(
      option: string,
      state: StateOfDatatype,
      logger?: OrtooLogger,
      e?: Error
    ) {
      super(
        BaseErrorCode.Datatype + 9,
        `fail to apply PushPull due to illegal PushPullOption(${option}) on state ${state}`,
        logger,
        e
      );
    }
  },
};
