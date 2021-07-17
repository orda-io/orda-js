import { OrdaLogger } from '@ooo/utils/orda_logger';
import { BaseErrorCode, OrdaError } from '@ooo/errors/error';

export { ErrClient };

const ErrClient = {
  Connect: class Connect extends OrdaError {
    constructor(logger?: OrdaLogger, msg?: string) {
      super(BaseErrorCode.Client, `fail to connect client: ${msg}`, logger);
    }
  },
  PushPull: class PushPull extends OrdaError {
    constructor(logger?: OrdaLogger, msg?: string) {
      super(BaseErrorCode.Client + 1, `fail to push-pull: ${msg}`, logger);
    }
  },
  Subscribe: class Subscribe extends OrdaError {
    constructor(logger?: OrdaLogger, msg?: string) {
      super(BaseErrorCode.Client + 2, `fail to subscribe: ${msg}`, logger);
    }
  },
  Sync: class Sync extends OrdaError {
    constructor(logger?: OrdaLogger, msg?: string) {
      super(BaseErrorCode.Client + 3, `fail to sync: ${msg}`, logger);
    }
  },
};
