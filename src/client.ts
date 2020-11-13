import { model } from './model/model';
import { CUID } from './types/cuid';
import { UID } from './types/uid';
import { ClientConfig } from './config';
// interface Client {

// }

enum clientState {
  NOT_CONNECTED,
  CONNECTED,
}

class clientImpl {
  model: model.Client;
  state: clientState;

  constructor(conf: ClientConfig, alias: string) {
    this.model = model.Client.create({
      CUID: new CUID().AsUint8Array,
      alias: alias,
      collection: conf.CollectionName,
      syncType: conf.SyncType,
    });
    this.state = clientState.NOT_CONNECTED;
  }
}
