import * as grpcWeb from 'grpc-web';
import { CreateClientModel } from './protocols/client_model';
import { CreateClientRequest } from './protocols/requests';
import { CUID } from './protocols/cuid';
import { OrtooServiceClient } from './protocols/protobuf/ortoo_grpc_web_pb';
import { Client as ClientModel, ClientResponse } from './protocols/protobuf/ortoo_pb';
import { ClientConfig } from './config';
import { OrtooLogger } from './utils/logging';
import { ShortUID } from './constants/constants';

enum clientState {
  NOT_CONNECTED,
  CONNECTED,
}

export class Client {
  private Logger: OrtooLogger;
  private readonly model: ClientModel;
  private state: clientState;
  private serviceClient: OrtooServiceClient;

  constructor(conf: ClientConfig, alias: string) {
    this.model = CreateClientModel(
      new CUID(),
      alias,
      conf.CollectionName,
      conf.SyncType,
    );
    this.state = clientState.NOT_CONNECTED;
    this.serviceClient = new OrtooServiceClient(conf.ServerAddr);
    this.Logger = new OrtooLogger(
      this.getName(),
    );
  }

  async sendClientRequest(): Promise<void> {
    const clientRequest = CreateClientRequest(1, this.model);

    this.Logger.log('sendClientRequest3', clientRequest);
    const call = this.serviceClient.processClient(
      clientRequest,
      null,
      (err: grpcWeb.Error, response: ClientResponse) => {
        if (err !== null) {
          this.Logger.error(err);
          return;
        }
        this.Logger.info(`Response:${response}`);
      },
    );
    this.Logger.info('end processClient');

    await call.on('status', (status: grpcWeb.Status) => {
      this.Logger.info(`Status:${status.code}`);
      this.Logger.info(`Status:${status.details}`);
      this.Logger.info(`Status:${status.metadata}`);
    });
  }

  getName(): string {
    const cuidString = Buffer.from(this.model.getCuid()).toString('hex');
    cuidString.substr(10);
    return `${this.model.getAlias()}:${cuidString.substr(ShortUID)}`;
  }
}
