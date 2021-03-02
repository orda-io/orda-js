import { OrtooLoggerFactory, OrtooLogLevel } from '@ooo/utils/ortoo_logger';
import { SyncType } from '@ooo/types/client';

export { createLocalClientConfig };

export class ClientConfig {
  collectionName: string;
  syncType: SyncType;
  serverAddr: string;
  notificationUri: string;
  loggerFactory: OrtooLoggerFactory;

  constructor(
    collectionName: string,
    syncType?: SyncType,
    serverAddr?: string,
    notificationUri?: string,
    logLevel?: OrtooLogLevel
  ) {
    this.collectionName = collectionName;
    this.syncType = syncType ? syncType : SyncType.LOCAL_ONLY;
    this.serverAddr = serverAddr ? serverAddr : '';
    this.notificationUri = notificationUri ? notificationUri : '';
    if (logLevel === undefined) {
      this.loggerFactory = new OrtooLoggerFactory('trace');
    } else {
      this.loggerFactory = new OrtooLoggerFactory(logLevel);
    }
  }
}

function createLocalClientConfig(collectionName: string): ClientConfig {
  return new ClientConfig(
    collectionName,
    SyncType.MANUALLY,
    'http://127.0.0.1:29862',
    'ws://127.0.0.1:18881/mqtt',
    'trace'
  );
}
