import log from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
import colors from 'colors';

colors.enable();

colors.setTheme({
  TRACE: colors.bgMagenta,
  DEBUG: colors.bgCyan,
  INFO: colors.bgBlue,
  WARN: colors.bgYellow,
  error: colors.bgRed,
});

const colorMap: { [key: string]: string } = {
  TRACE: 'magenta',
  DEBUG: 'bgBlue',
  INFO: 'bgBlack',
  WARN: 'yellow',
  ERROR: 'red',
};

const ortooLogPrefix: prefix.LoglevelPluginPrefixOptions = {
  format(
    level: string,
    name: string | undefined,
    timestamp: Date
  ): string | undefined {
    const tsFormat: string = `[${timestamp}]`['green'];
    const levelColor: string | number = colorMap[level.toUpperCase()];
    const levelFormat: string = `[${level}]`[levelColor as never];
    const nameFormat: string = `[${name}]`['cyan'];
    return `${tsFormat} ${levelFormat} ${nameFormat}`;
  },
};

export class OrtooLogger {
  private readonly logLevel: log.Logger;

  constructor(tag?: string) {
    if (tag === undefined) {
      this.logLevel = log;
    } else {
      this.logLevel = log.getLogger(tag);
    }

    prefix.reg(log);
    prefix.apply(this.logLevel, ortooLogPrefix);
    this.logLevel.enableAll();
  }

  public trace(...msg: unknown[]): void {
    this.logLevel.trace(...msg);
  }

  public debug(...msg: unknown[]): void {
    this.logLevel.debug(...msg);
  }

  public log(...msg: unknown[]): void {
    this.logLevel.log(...msg);
  }

  public info(...msg: unknown[]): void {
    this.logLevel.info(...msg);
  }

  public warn(...msg: unknown[]): void {
    this.logLevel.warn(...msg);
  }

  public error(...msg: unknown[]): void {
    this.logLevel.error(...msg);
  }
}

export const OrtooLog = new OrtooLogger('OrtooRoot');
