import * as grpcWeb from 'grpc-web';
import { ClientModel, CreateClientModel } from './protocols/client_model';
import { ClientResponse, CreateClientRequest } from './protocols/requests';
import { CUID } from './protocols/cuid';
import { OrtooServiceClient } from './protocols/protobuf/ortoo_grpc_web_pb';
import { ClientConfig } from './config';
import { OrtooLogger } from './utils/logging';
import { ShortUID } from './constants/constants';
import { NotificationManager } from './managers/notification';

enum clientState {
  NOT_CONNECTED,
  CONNECTED,
}

export class Client {
  private readonly Logger: OrtooLogger;
  private readonly model: ClientModel;
  private state: clientState;
  private grpcClient: OrtooServiceClient;
  private notificationManager: NotificationManager;

  constructor(conf: ClientConfig, alias: string) {
    this.model = CreateClientModel(
      new CUID(),
      alias,
      conf.CollectionName,
      conf.SyncType
    );
    this.Logger = new OrtooLogger(this.getName());
    this.Logger.info(conf.NotificationUri);

    this.state = clientState.NOT_CONNECTED;
    this.grpcClient = new OrtooServiceClient(conf.ServerAddr);
    this.notificationManager = new NotificationManager(
      conf,
      this.model,
      this.Logger
    );
  }

  async sendClientRequest(): Promise<void> {
    const clientRequest = CreateClientRequest(1, this.model);

    this.Logger.log('sendClientRequest3', clientRequest);
    const call = this.grpcClient.processClient(
      clientRequest,
      undefined,
      (err: grpcWeb.Error, response: ClientResponse) => {
        if (err !== null) {
          this.Logger.error(err);
          return;
        }
        this.Logger.info(`Response:${response}`);
      }
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
