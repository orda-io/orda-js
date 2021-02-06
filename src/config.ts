import { SyncType } from '@ooo/types/client';
import { OrtooLoggerFactory, OrtooLogLevel } from '@ooo/utils/ortoo_logger';

export class ClientConfig {
  CollectionName: string;
  SyncType: SyncType;
  ServerAddr: string;
  NotificationUri: string;
  loggerFactory: OrtooLoggerFactory;

  constructor(
    collectionName: string,
    syncType?: SyncType,
    serverAddr?: string,
    notificationUri?: string,
    logLevel?: OrtooLogLevel
  ) {
    this.CollectionName = collectionName;
    this.SyncType = SyncType.LOCAL_ONLY;
    this.ServerAddr = serverAddr ? serverAddr : '';
    this.NotificationUri = notificationUri ? notificationUri : '';
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
    'http://127.0.0.1:29065',
    'ws://127.0.0.1:18881/mqtt',
    'trace'
  );
}

export { createLocalClientConfig };
