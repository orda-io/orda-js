import { BaseErrorCode, OrtooError } from '@ooo/errors/error';
import { OrtooLogger } from '@ooo/utils/ortoo_logger';

export { PushPullError };

export const PushPullErrorCode = {
  AbortionOfServer: BaseErrorCode.PushPull,
  AbortionOfClient: BaseErrorCode.PushPull + 1,
  DuplicateKey: BaseErrorCode.PushPull + 2,
  MissingOps: BaseErrorCode.PushPull + 3,
  NoDatatypeToSubscribe: BaseErrorCode.PushPull + 4,
} as const;

type PushPullErrorCode = typeof PushPullErrorCode[keyof typeof PushPullErrorCode];

class PushPullError extends OrtooError {
  private readonly pushPullCode: PushPullErrorCode;

  constructor(pushPullCode: number, msg: string, logger?: OrtooLogger) {
    super(BaseErrorCode.PushPull, msg, logger);
    this.pushPullCode = pushPullCode;
  }

  getCode(): PushPullErrorCode {
    return this.pushPullCode;
  }
}
