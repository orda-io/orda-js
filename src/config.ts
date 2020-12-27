import { SyncType } from './protocols/protobuf/ortoo_pb';

export class ClientConfig {
  ServerAddr: string;
  NotificationUri: string;
  CollectionName: string;
  SyncType: SyncType;

  constructor(
    serverAddr: string,
    notificationUri: string,
    collectionName: string,
    syncType?: SyncType | undefined
  ) {
    this.ServerAddr = serverAddr;
    this.NotificationUri = notificationUri;
    this.CollectionName = collectionName;
    if (syncType !== undefined) {
      this.SyncType = syncType;
    } else {
      this.SyncType = SyncType.LOCAL_ONLY;
    }
  }
}

export function CreateLocalClientConfig(collectionName: string): ClientConfig {
  return new ClientConfig(
    'http://127.0.0.1:29065',
    'ws://127.0.0.1:18881/mqtt',
    collectionName,
    SyncType.LOCAL_ONLY
  );
}
