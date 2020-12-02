import { CUID } from './cuid';
import { Client, SyncType } from './protobuf/ortoo_pb';

export function CreateClientModel(
  cuid: CUID,
  alias: string,
  collection: string,
  syncType: SyncType
): Client {
  console.log('CUID', cuid.String());
  const client = new Client();
  client.setCuid(cuid.AsUint8Array);
  client.setAlias(alias);
  client.setCollection(collection);
  client.setSynctype(syncType);
  return client;
}
