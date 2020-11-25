import * as model from './model/model';
import { CUID } from './types/cuid';
import { UID } from './types/uid';
import { ClientConfig } from './config';

enum clientState {
  NOT_CONNECTED,
  CONNECTED,
}

// export { model.Client as pbClient } from './model/model';
export class Client {
  private model: model.Client;
  private state: clientState;

  constructor(conf: ClientConfig, alias: string) {
    this.model = new model.Client({
      CUID: new CUID().AsUint8Array,
      alias: alias,
      collection: conf.CollectionName,
      syncType: conf.SyncType,
    });
    this.state = clientState.NOT_CONNECTED;
  }

  sendClientRequest(): void {
    // TODO: should implement
  }
}
