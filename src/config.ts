import { SyncType } from './constants/constants';
import { model } from './model/model';

export class ClientConfig {
  ServerAddr: string;
  NotificationAddr: string;
  CollectionName: string;
  SyncType: model.SyncType;

  constructor(
    serverAddr: string,
    notificationAddr: string,
    collectionName: string,
    syncType: SyncType
  ) {
    this.ServerAddr = serverAddr;
    this.NotificationAddr = notificationAddr;
    this.CollectionName = collectionName;

    switch (syncType) {
      case SyncType.LOCAL_ONLY:
        this.SyncType = model.SyncType.LOCAL_ONLY;
        break;
      case SyncType.MANUALLY:
        this.SyncType = model.SyncType.MANUALLY;
        break;
      case SyncType.NOTIFIABLE:
        this.SyncType = model.SyncType.NOTIFIABLE;
        break;
    }
  }
}
