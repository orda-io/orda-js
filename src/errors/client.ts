import { OrtooLogger } from '@ooo/utils/ortoo_logger';
import { BaseErrorCode, OrtooError } from '@ooo/errors/error';

export { ErrClient };

const ErrClient = {
  Connect: class Connect extends OrtooError {
    constructor(logger?: OrtooLogger, msg?: string) {
      super(BaseErrorCode.Client, `fail to connect client: ${msg}`, logger);
    }
  },
};
