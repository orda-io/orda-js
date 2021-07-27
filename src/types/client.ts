import { OrdaSyncType as SyncType } from '@orda/generated/openapi';

export { ClientModel };
export { SyncType };

class ClientModel {
  cuid: string;
  alias: string;
  collection: string;
  syncType: SyncType;

  constructor(cuid: string, alias: string, collection: string, syncType: SyncType) {
    this.cuid = cuid;
    this.alias = alias;
    this.collection = collection;
    this.syncType = syncType;
  }

  getLogName(): string {
    return `${this.collection}:${this.alias}:${this.cuid}`;
  }
}
