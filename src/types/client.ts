import { CUID } from '@ooo/types/uid';
import { OrtooSyncType as SyncType } from '@ooo/generated/openapi';

export { ClientModel };
export { SyncType };

class ClientModel {
  cuid: CUID;
  alias: string;
  collection: string;
  syncType: SyncType;

  constructor(
    cuid: CUID,
    alias: string,
    collection: string,
    syncType: SyncType
  ) {
    this.cuid = cuid;
    this.alias = alias;
    this.collection = collection;
    this.syncType = syncType;
  }

  getLogName(): string {
    return `${this.collection}:${this.alias}:${this.cuid.toShortString()}`;
  }
}
