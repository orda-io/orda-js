import { OrtooLogger } from '@ooo/utils/ortoo_logger';

export const ErrorCode = {
  baseBasicCode: 0,
  baseDatatypeCode: 100,
};

export class OrtooError extends Error {
  private code: number;

  constructor(code: number, msg: string, log?: OrtooLogger) {
    super(`[${code}] ${msg}`);
    this.code = code;
    if (log) {
      log.error(this);
    }
  }
}
