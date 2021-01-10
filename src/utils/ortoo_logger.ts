export interface OrtooLogger {
  trace: logFunction;
  debug: logFunction;
  info: logFunction;
  warn: logFunction;
  error: logFunction;
}

type logFunction = (message?: unknown, ...optionalParams: unknown[]) => void;

interface IConsole {
  trace: logFunction;
  debug: logFunction;
  info: logFunction;
  warn: logFunction;
  error: logFunction;
}

export type OrtooLogLevel =
  | 'trace'
  | 'debug'
  | 'info'
  | 'warn'
  | 'error'
  | 'silent';

const logColors: Record<OrtooLogLevel, string> = {
  trace: '\x1B[36m',
  debug: '\x1B[33m',
  info: '\x1b[42m',
  warn: '\x1B[45m',
  error: '\x1B[41m',
  silent: '\x1B[107m',
};

export const LogLevels: Record<OrtooLogLevel, number> = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  silent: 5,
};

export class OrtooLoggerFactory {
  private readonly iConsole: IConsole;
  private _logLevel: OrtooLogLevel;

  constructor(
    logLevel: OrtooLogLevel = 'trace',
    iConsole: IConsole | null = null
  ) {
    if (iConsole) {
      this.iConsole = iConsole;
    } else {
      this.iConsole = console;
    }
    this._logLevel = logLevel;
  }

  private dumb(): void {
    // do nothing
  }

  set logLevel(value: OrtooLogLevel) {
    this._logLevel = value;
  }

  private getLogFunc(
    name: string,
    ll: OrtooLogLevel,
    fn: logFunction
  ): logFunction {
    if (LogLevels[this._logLevel] > LogLevels[ll]) {
      return this.dumb;
    }
    return fn.bind(
      null,
      `${logColors[ll]}[${ll.toUpperCase()}] ${name}\x1B[0m`
    );
  }

  getLogger(name: string): OrtooLogger {
    return {
      trace: this.getLogFunc(name, 'trace', this.iConsole.trace),
      debug: this.getLogFunc(name, 'debug', this.iConsole.debug),
      info: this.getLogFunc(name, 'info', this.iConsole.info),
      warn: this.getLogFunc(name, 'warn', this.iConsole.warn),
      error: this.getLogFunc(name, 'error', this.iConsole.error),
    };
  }
}

export const logger = new OrtooLoggerFactory('trace').getLogger('Ortoo');
