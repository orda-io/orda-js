import { BaseErrorCode, OrtooError } from '@ooo/errors/error';
import { OrtooLogger } from '@ooo/utils/ortoo_logger';
import { StateOfDatatype } from '@ooo/types/datatype';

export { ErrDatatype };

const ErrDatatype = {
  Create: class Create extends OrtooError {
    constructor(logger: OrtooLogger) {
      super(BaseErrorCode.Datatype, 'fail to create datatype:', logger);
    }
  },
  Subscribe: class Subscribe extends OrtooError {
    constructor(logger: OrtooLogger) {
      super(BaseErrorCode.Datatype + 1, 'fail to subscribe datatype:', logger);
    }
  },
  Transaction: class Transaction extends OrtooError {
    constructor(logger: OrtooLogger) {
      super(BaseErrorCode.Datatype + 2, 'fail to proceed transaction:', logger);
    }
  },
  Snapshot: class Snapshot extends OrtooError {
    constructor(logger: OrtooLogger) {
      super(BaseErrorCode.Datatype + 3, 'fail to make a snapshot:', logger);
    }
  },
  IllegalParameters: class IllegalParameters extends OrtooError {
    constructor(logger: OrtooLogger, msg: string, e?: Error) {
      super(
        BaseErrorCode.Datatype + 4,
        `fail to execute the operation due to illegal parameters: ${msg}`,
        logger,
        e
      );
    }
  },
  IllegalOperation: class IllegalOperation extends OrtooError {
    constructor(logger: OrtooLogger, datatype: string, op: string) {
      super(
        BaseErrorCode.Datatype + 5,
        `fail to execute the illegal operation for ${datatype}: ${op}`,
        logger
      );
    }
  },
  InvalidParent: class InvalidParent extends OrtooError {
    constructor(logger: OrtooLogger) {
      super(
        BaseErrorCode.Datatype + 6,
        'fail to modify due to the invalid parent:',
        logger
      );
    }
  },
  NoOp: class NoOp extends OrtooError {
    constructor(logger: OrtooLogger, msg?: string) {
      super(
        BaseErrorCode.Datatype + 7,
        `fail to issue operation: ${msg}`,
        logger
      );
    }
  },
  Marshal: class Marshal extends OrtooError {
    constructor(logger?: OrtooLogger, e?: Error) {
      super(BaseErrorCode.Datatype + 8, 'fail to (un)marshal:', logger, e);
    }
  },
  NoTarget: class NoTarget extends OrtooError {
    constructor(logger: OrtooLogger, msg?: string) {
      super(BaseErrorCode.Datatype + 9, `fail to find target: ${msg}`, logger);
    }
  },
  OutOfBound: class OutOfBound extends OrtooError {
    constructor(logger: OrtooLogger, e?: Error) {
      super(
        BaseErrorCode.Datatype + 10,
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
        BaseErrorCode.Datatype + 11,
        `fail to apply PushPull due to illegal PushPullOption(${option}) on state ${state}`,
        logger,
        e
      );
    }
  },
};
