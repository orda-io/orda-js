import { ClientModel, SyncType } from '@ooo/types/client';
import { CUID } from '@ooo/types/uid';
import { ClientConfig } from '@ooo/config';
import { DatatypeManager } from '@ooo/managers/datatype';
import { ClientContext } from '@ooo/context';
import { GrpcSyncManager } from '@ooo/managers/grpc_sync';
import { _Counter, Counter } from '@ooo/datatypes/counter';
import { TypeOfDatatype } from '@ooo/protobuf/ortoo_pb';
import { IDatatype } from '@ooo/datatypes/datatype';

export { Client };

enum clientState {
  NOT_CONNECTED,
  CONNECTED,
}

class Client {
  private state: clientState;
  private readonly model: ClientModel;
  private readonly ctx: ClientContext;
  private syncManager: GrpcSyncManager | null;
  private datatypeManager: DatatypeManager;

  constructor(conf: ClientConfig, alias: string) {
    this.model = new ClientModel(
      new CUID(),
      alias,
      conf.CollectionName,
      conf.SyncType
    );

    this.ctx = new ClientContext(this.model, conf.loggerFactory);
    this.state = clientState.NOT_CONNECTED;

    this.syncManager = null;
    if (conf.SyncType !== SyncType.LOCAL_ONLY) {
      this.syncManager = new GrpcSyncManager(conf, this.ctx);
    }
    this.datatypeManager = new DatatypeManager(this.ctx, this.syncManager);
  }

  // private async sendClientRequest(): Promise<void> {
  //   const clientRequest = CreateClientRequest(1, this.model);
  //
  //   this.ctx.L.info('sendClientRequest3', clientRequest);
  //   const call = this.grpcClient.processClient(
  //     clientRequest,
  //     null,
  //     (err: grpcWeb.Error, response: ClientResponse) => {
  //       if (err !== null) {
  //         this.ctx.L.error(err.message);
  //         return;
  //       }
  //       this.ctx.L.info(`Response:${response}`);
  //     }
  //   );
  //   this.ctx.L.info('end processClient');
  //
  //   await call.on('status', (status: grpcWeb.Status) => {
  //     this.ctx.L.info(`Status:${status.code}`);
  //     this.ctx.L.info(`Status:${status.details}`);
  //     this.ctx.L.info(`Status:${status.metadata}`);
  //   });
  // }

  private getName(): string {
    return this.model.getLogName(); //`${this.model.alias}:${this.model.cuid.toShortString()}`;
  }

  public isConnected(): boolean {
    return this.state === clientState.CONNECTED;
  }

  public createCounter(key: string): Counter {
    return this.subscribeOrCreateCounter(key);
  }

  public subscribeOrCreateCounter(key: string): Counter {
    return this.subscribeOrCreateDatatype(
      key,
      TypeOfDatatype.COUNTER
    ) as Counter;
  }

  private subscribeOrCreateDatatype(
    key: string,
    type: TypeOfDatatype
  ): IDatatype {
    if (!this.datatypeManager) {
    }

    switch (type) {
      case TypeOfDatatype.COUNTER:
        return new _Counter(this.ctx, key);
      case TypeOfDatatype.HASH_MAP:
        break;
      case TypeOfDatatype.LIST:
        break;
      case TypeOfDatatype.DOCUMENT:
        break;
    }
    throw new Error('not implemented yet');
  }
}
