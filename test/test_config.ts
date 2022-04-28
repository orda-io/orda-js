import { ClientConfig } from '../src';
import { OrdaSyncType } from '../src/generated/openapi';
import { OrdaLogLevel } from '@orda-io/orda-logger';
const headers = new Map<string, string>();
headers.set('orda-custom-header', 'orda-custom-header-value');

export const testConf: ClientConfig = new ClientConfig(
  'NOT_USED',
  OrdaSyncType.MANUALLY,
  'http://127.0.0.1:19861',
  'ws://127.0.0.1:18881/mqtt',
  headers,
  OrdaLogLevel.TRACE
);
