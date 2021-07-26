import { OrdaLoggerFactory, OrdaLogLevel } from '@orda-io/orda-logger';

const Version = '0.1';
const ShortUID = 10;
const AgentName = 'orda-js';

export { Version, ShortUID };

export function getAgent(): string {
  return `${AgentName}-${Version}`;
}

export const ordaLogger = new OrdaLoggerFactory(OrdaLogLevel.DEBUG).getLogger('orda');
