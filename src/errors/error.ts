import { OrdaLogger } from "@ooo/utils/orda_logger";

export const BaseErrorCode = {
  Common: 0,
  Datatype: 100,
  Client: 200,
  PushPull: 300,
};

export class OrdaError extends Error {
  code: number;

  constructor(code: number, msg: string, log?: OrdaLogger, e?: Error, ...args: string[]) {
    super(`[${code}] ${msg} ${e ? e.message : ''}`);
    this.code = code;
    if (e) {
      this.stack = e.stack;
    }
    if (log) {
      log.error(this.message, ...args, '\n', this.stack);
    }
  }
}
