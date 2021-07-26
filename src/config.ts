import { OrdaLoggerFactory, OrdaLogLevel } from '@orda-io/orda-logger';
import { SyncType } from '@ooo/types/client';

export { createLocalClientConfig };

export class ClientConfig {
  collectionName: string;
  syncType: SyncType;
  serverAddr: string;
  notificationUri: string;
  loggerFactory: OrdaLoggerFactory;

  constructor(
    collectionName: string,
    syncType?: SyncType,
    serverAddr?: string,
    notificationUri?: string,
    logLevel?: OrdaLogLevel
  ) {
    this.collectionName = collectionName;
    this.syncType = syncType ? syncType : SyncType.LOCAL_ONLY;
    this.serverAddr = serverAddr ? serverAddr : '';
    this.notificationUri = notificationUri ? notificationUri : '';
    if (logLevel === undefined) {
      this.loggerFactory = new OrdaLoggerFactory(OrdaLogLevel.TRACE);
    } else {
      this.loggerFactory = new OrdaLoggerFactory(logLevel);
    }
  }
}

function createLocalClientConfig(collectionName: string): ClientConfig {
  return new ClientConfig(
    collectionName,
    SyncType.MANUALLY,
    'http://127.0.0.1:29862',
    'ws://127.0.0.1:18881/mqtt',
    OrdaLogLevel.TRACE
  );
}
