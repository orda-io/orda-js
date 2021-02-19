import { CUID } from '@ooo/types/uid';
import { SyncType } from '@ooo/generated/proto';

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

  // toPb(): ortoo.Client {
  //   const pb = ortoo.Client.fromObject(this);
  //   return pb;
  // }
  //
  // toClientPb(): ClientPb {
  //   const clientPb = new ClientPb();
  //   clientPb.setCuid(this.cuid.AsUint8Array);
  //   clientPb.setAlias(this.alias);
  //   clientPb.setCollection(this.collection);
  //   clientPb.setSynctype(this.syncType);
  //   return clientPb;
  // }

  getCuidAsArray(): Uint8Array {
    return this.cuid.AsUint8Array;
  }

  getLogName(): string {
    return `${this.alias}:${this.cuid.toShortString()}`;
  }
}
