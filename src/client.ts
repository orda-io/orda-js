import * as grpcWeb from 'grpc-web';
import { CreateClientModel } from './protocols/client';
import { CreateClientRequest } from './protocols/requests';
import { CUID } from './protocols/cuid';
import { OrtooServiceClient } from './protocols/protobuf/ortoo_grpc_web_pb';
import {
  ClientResponse,
  SyncType,
  Client as ClientModel,
} from './protocols/protobuf/ortoo_pb';
import { ClientConfig } from './config';

// const clientModel = CreateClientModel(new CUID(), "hello1", "hello_world", SyncType.MANUALLY);
// const clientRequest = CreateClientRequest(1, clientModel);

// const ortooService = new OrtooServiceClient('http://localhost:16091');

enum clientState {
  NOT_CONNECTED,
  CONNECTED,
}

export class Client {
  private model: ClientModel;
  private state: clientState;
  private serviceClient: OrtooServiceClient;

  constructor(conf: ClientConfig, alias: string) {
    this.model = CreateClientModel(
      new CUID(),
      alias,
      conf.CollectionName,
      conf.SyncType
    );
    this.state = clientState.NOT_CONNECTED;
    this.serviceClient = new OrtooServiceClient(conf.ServerAddr);
  }

  async sendClientRequest(): Promise<void> {
    const clientRequest = CreateClientRequest(1, this.model);
    // console.log('sendClientRequest3', clientRequest);
    console.log('sendClientRequest3', clientRequest);
    const call = this.serviceClient.processClient(
      clientRequest,
      null,
      (err: grpcWeb.Error, response: ClientResponse) => {
        console.error('error', err);
        console.info('response', response);
      }
    );
    console.log('end processClient');

    await call.on('status', (status: grpcWeb.Status) => {
      console.info('status', status);
    });
  }
}
