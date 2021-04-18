import { OrtooLogger } from '@ooo/utils/ortoo_logger';
import { BaseErrorCode, OrtooError } from '@ooo/errors/error';

export { ErrClient };

const ErrClient = {
  Connect: class Connect extends OrtooError {
    constructor(logger?: OrtooLogger, msg?: string) {
      super(BaseErrorCode.Client, `fail to connect client: ${msg}`, logger);
    }
  },
  PushPull: class PushPull extends OrtooError {
    constructor(logger?: OrtooLogger, msg?: string) {
      super(BaseErrorCode.Client + 1, `fail to push-pull: ${msg}`, logger);
    }
  },
  Subscribe: class Subscribe extends OrtooError {
    constructor(logger?: OrtooLogger, msg?: string) {
      super(BaseErrorCode.Client + 2, `fail to subscribe: ${msg}`, logger);
    }
  },
};
