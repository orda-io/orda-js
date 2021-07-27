import { BaseErrorCode, OrdaError } from '@orda/errors/error';
import { OrdaLogger } from '@orda-io/orda-logger';
import { StateOfDatatype } from '@orda/types/datatype';

export { ErrDatatype };

const ErrDatatype = {
  Create: class Create extends OrdaError {
    constructor(logger?: OrdaLogger) {
      super(BaseErrorCode.Datatype, 'fail to create datatype:', logger);
    }
  },
  Subscribe: class Subscribe extends OrdaError {
    constructor(logger: OrdaLogger) {
      super(BaseErrorCode.Datatype + 1, 'fail to subscribe datatype:', logger);
    }
  },
  Transaction: class Transaction extends OrdaError {
    constructor(logger: OrdaLogger) {
      super(BaseErrorCode.Datatype + 2, 'fail to proceed transaction:', logger);
    }
  },
  Snapshot: class Snapshot extends OrdaError {
    constructor(logger: OrdaLogger) {
      super(BaseErrorCode.Datatype + 3, 'fail to make a snapshot:', logger);
    }
  },
  IllegalParameters: class IllegalParameters extends OrdaError {
    constructor(logger: OrdaLogger, msg: string, e?: Error) {
      super(BaseErrorCode.Datatype + 4, `fail to execute the operation due to illegal parameters: ${msg}`, logger, e);
    }
  },
  IllegalOperation: class IllegalOperation extends OrdaError {
    constructor(logger: OrdaLogger, datatype: string, op: string) {
      super(BaseErrorCode.Datatype + 5, `fail to execute the illegal operation for ${datatype}: ${op}`, logger);
    }
  },
  InvalidParent: class InvalidParent extends OrdaError {
    constructor(logger: OrdaLogger, msg?: string) {
      super(BaseErrorCode.Datatype + 6, 'fail to modify due to the invalid parent:', logger);
    }
  },
  NoOp: class NoOp extends OrdaError {
    constructor(logger?: OrdaLogger, msg?: string) {
      super(BaseErrorCode.Datatype + 7, `fail to issue operation: ${msg}`, logger);
    }
  },
  Marshal: class Marshal extends OrdaError {
    constructor(logger?: OrdaLogger, e?: Error, ...msg: string[]) {
      super(BaseErrorCode.Datatype + 8, 'fail to (un)marshal:', logger, e, ...msg);
    }
  },
  NoTarget: class NoTarget extends OrdaError {
    constructor(logger: OrdaLogger, msg?: string) {
      super(BaseErrorCode.Datatype + 9, `fail to find target: ${msg}`, logger);
    }
  },
  OutOfBound: class OutOfBound extends OrdaError {
    constructor(logger: OrdaLogger, e?: Error) {
      super(BaseErrorCode.Datatype + 10, 'fail due to out of bound error', logger, e);
    }
  },
  IllegalPushPullOption: class IllegalPushPullOption extends OrdaError {
    constructor(option: string, state: StateOfDatatype, logger?: OrdaLogger, e?: Error) {
      super(
        BaseErrorCode.Datatype + 11,
        `fail to apply PushPull due to illegal PushPullOption(${option}) on state ${state}`,
        logger,
        e
      );
    }
  },
};
