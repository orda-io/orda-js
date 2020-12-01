import { SyncType } from './protocols/protobuf/ortoo_pb';

export class ClientConfig {
  ServerAddr: string;
  NotificationAddr: string;
  CollectionName: string;
  SyncType: SyncType;

  constructor(
    serverAddr: string,
    notificationAddr: string,
    collectionName: string,
    syncType?: SyncType
  ) {
    this.ServerAddr = serverAddr;
    this.NotificationAddr = notificationAddr;
    this.CollectionName = collectionName;
    this.SyncType = syncType;
  }
}

export function CreateLocalClientConfig(collectionName: string): ClientConfig {
  console.log('alias:', collectionName);
  return new ClientConfig(
    'http://127.0.0.1:16091',
    '127.0.0.1:11883',
    collectionName,
    SyncType.LOCAL_ONLY
  );
}
