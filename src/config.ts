import { SyncType } from './protocols/protobuf/ortoo_pb';

export class ClientConfig {
  ServerAddr: string;
  NotificationHost: string;
  NotificationPort: number;
  CollectionName: string;
  SyncType: SyncType;

  constructor(
    serverAddr: string,
    notificationAddr: string,
    collectionName: string,
    syncType?: SyncType,
  ) {
    this.ServerAddr = serverAddr;
    const url = new URL(notificationAddr);
    this.NotificationHost = url.host;
    this.NotificationPort = +url.port;
    this.CollectionName = collectionName;
    this.SyncType = syncType;
  }
}

export function CreateLocalClientConfig(collectionName: string): ClientConfig {
  return new ClientConfig(
    'http://127.0.0.1:16091',
    'ws://127.0.0.1:9001',
    collectionName,
    SyncType.LOCAL_ONLY,
  );
}
