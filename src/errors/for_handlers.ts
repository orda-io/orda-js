export enum DatatypeErrCodes {
  UNKNOWN = 0,
  DUPLICATED_KEY = 1,
  NO_DATATYPE_TO_SUBSCRIBE = 2,
}

export class DatatypeError {
  readonly code: DatatypeErrCodes;
  readonly msg: string;

  constructor(code: DatatypeErrCodes, msg: string) {
    this.code = code;
    this.msg = msg;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
