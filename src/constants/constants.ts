const Version = '0.1';
const ShortUID = 10;
const AgentName = 'orda-js';

export { Version, ShortUID };

export function getAgent(): string {
  return `${AgentName}-${Version}`;
}
