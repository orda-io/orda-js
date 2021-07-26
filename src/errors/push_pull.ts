import { BaseErrorCode, OrdaError } from '@ooo/errors/error';
import { OrdaLogger } from '@orda-io/orda-logger';

export { PushPullError };

export const PushPullErrorCode = {
  AbortionOfServer: BaseErrorCode.PushPull,
  AbortionOfClient: BaseErrorCode.PushPull + 1,
  DuplicateKey: BaseErrorCode.PushPull + 2,
  MissingOps: BaseErrorCode.PushPull + 3,
  NoDatatypeToSubscribe: BaseErrorCode.PushPull + 4,
} as const;

type PushPullErrorCode = typeof PushPullErrorCode[keyof typeof PushPullErrorCode];

class PushPullError extends OrdaError {
  private readonly pushPullCode: PushPullErrorCode;

  constructor(pushPullCode: number, msg: string, logger?: OrdaLogger) {
    super(BaseErrorCode.PushPull, msg, logger);
    this.pushPullCode = pushPullCode;
  }

  getCode(): PushPullErrorCode {
    return this.pushPullCode;
  }
}
