import { CUID } from './cuid';
import { Client, SyncType } from './protobuf/ortoo_pb';

export { SyncType };

export class ClientModel extends Client {
  get cuid(): string {
    return Buffer.from(this.getCuid_asU8()).toString('hex');
  }
}

export function CreateClientModel(
  cuid: CUID,
  alias: string,
  collection: string,
  syncType: SyncType
): ClientModel {
  const client = new ClientModel();
  client.setCuid(cuid.AsUint8Array);
  client.setAlias(alias);
  client.setCollection(collection);
  client.setSynctype(syncType);
  return client;
}
