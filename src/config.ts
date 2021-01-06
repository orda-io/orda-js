import { SyncType } from './protocols/protobuf/ortoo_pb';
import { OrtooLogLevel } from './utils/ortoo_logger';

export class ClientConfig {
  ServerAddr: string;
  NotificationUri: string;
  CollectionName: string;
  SyncType: SyncType;
  LogLevel?: OrtooLogLevel;

  constructor(
    serverAddr: string,
    notificationUri: string,
    collectionName: string,
    syncType?: SyncType | undefined,
    logLevel?: OrtooLogLevel
  ) {
    this.ServerAddr = serverAddr;
    this.NotificationUri = notificationUri;
    this.CollectionName = collectionName;
    if (syncType !== undefined) {
      this.SyncType = syncType;
    } else {
      this.SyncType = SyncType.LOCAL_ONLY;
    }
    if (logLevel === undefined) {
      this.LogLevel = 'trace';
    } else {
      this.LogLevel = logLevel;
    }
  }
}

export function CreateLocalClientConfig(collectionName: string): ClientConfig {
  return new ClientConfig(
    'http://127.0.0.1:29065',
    'ws://127.0.0.1:18881/mqtt',
    collectionName,
    SyncType.LOCAL_ONLY,
    'trace'
  );
}
