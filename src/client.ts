import * as grpcWeb from 'grpc-web';
import {
  ClientModel,
  CreateClientModel,
  SyncType,
} from './protocols/client_model';
import { ClientResponse, CreateClientRequest } from './protocols/requests';
import { CUID } from './protocols/cuid';
import { OrtooServiceClient } from './protocols/protobuf/OrtooServiceClientPb';
import { ClientConfig } from './config';
import { ShortUID } from './constants/constants';
import DatatypeManager from './managers/datatype';
import { OrtooContext } from './context';
import SyncManager from './managers/sync';

enum clientState {
  NOT_CONNECTED,
  CONNECTED,
}

export class Client {
  private state: clientState;
  private readonly model: ClientModel;
  private readonly ctx: OrtooContext;
  private grpcClient: OrtooServiceClient;
  private syncManager: SyncManager | null;
  private datatypeManager: DatatypeManager | null;

  constructor(conf: ClientConfig, alias: string) {
    this.model = CreateClientModel(
      new CUID(),
      alias,
      conf.CollectionName,
      conf.SyncType
    );
    this.ctx = new OrtooContext(this.model, conf);

    this.state = clientState.NOT_CONNECTED;
    this.grpcClient = new OrtooServiceClient(conf.ServerAddr);

    this.syncManager = null;
    this.datatypeManager = null;
    if (conf.SyncType !== SyncType.LOCAL_ONLY) {
      this.syncManager = new SyncManager(conf, this.ctx);
      this.datatypeManager = new DatatypeManager();
    }
  }

  async sendClientRequest(): Promise<void> {
    const clientRequest = CreateClientRequest(1, this.model);

    this.ctx.L.info('sendClientRequest3', clientRequest);
    const call = this.grpcClient.processClient(
      clientRequest,
      null,
      (err: grpcWeb.Error, response: ClientResponse) => {
        if (err !== null) {
          this.ctx.L.error(err.message);
          return;
        }
        this.ctx.L.info(`Response:${response}`);
      }
    );
    this.ctx.L.info('end processClient');

    await call.on('status', (status: grpcWeb.Status) => {
      this.ctx.L.info(`Status:${status.code}`);
      this.ctx.L.info(`Status:${status.details}`);
      this.ctx.L.info(`Status:${status.metadata}`);
    });
  }

  getName(): string {
    const cuidString = Buffer.from(this.model.getCuid()).toString('hex');
    cuidString.substr(10);
    return `${this.model.getAlias()}:${cuidString.substr(ShortUID)}`;
  }
}
