import { CUID } from '@ooo/types/uid';
import { ClientConfig } from '@ooo/config';
import { DataManager } from '@ooo/managers/data';
import { ClientContext } from '@ooo/context';
import { Counter } from '@ooo/datatypes/counter';
import { IDatatype } from '@ooo/datatypes/datatype';
import { WireManager } from '@ooo/managers/wire';
import { GrpcWireManager } from '@ooo/managers/grpc_wire';
import { ClientModel, SyncType } from '@ooo/types/client';
import { StateOfDatatype, TypeOfDatatype } from '@ooo/types/datatype';

export { Client };

enum clientState {
  NOT_CONNECTED,
  CONNECTED,
}

class Client {
  private state: clientState;
  private readonly model: ClientModel;
  private readonly ctx: ClientContext;
  private wireManager!: WireManager;
  private dataManager: DataManager;

  constructor(conf: ClientConfig, alias: string, wireManager?: WireManager) {
    this.model = new ClientModel(
      new CUID(),
      alias,
      conf.CollectionName,
      conf.SyncType
    );

    this.ctx = new ClientContext(this.model, conf.loggerFactory);
    this.state = clientState.NOT_CONNECTED;

    if (wireManager) {
      this.wireManager = wireManager;
    } else {
      if (conf.SyncType !== SyncType.LOCAL_ONLY) {
        this.wireManager = new GrpcWireManager(conf, this.ctx);
      }
    }

    this.dataManager = new DataManager(this.ctx, this.wireManager);
    this.wireManager?.addDataManager(this.ctx, this.dataManager);
    this.ctx.L.debug(`created Client ${alias}`);
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
    return this.subscribeOrCreateDatatype(
      key,
      TypeOfDatatype.COUNTER,
      StateOfDatatype.DUE_TO_CREATE
    ) as Counter;
  }

  public subscribeCounter(key: string): Counter {
    return this.subscribeOrCreateDatatype(
      key,
      TypeOfDatatype.COUNTER,
      StateOfDatatype.DUE_TO_SUBSCRIBE
    ) as Counter;
  }

  /**
   * subscribe Counter with the given key if it exists in the ortoo server;
   * otherwise, the Ortoo server is going to create and subcribe a new Counter of the given key.
   * @param {string} key
   * @returns {Counter}
   */
  public subscribeOrCreateCounter(key: string): Counter {
    return this.subscribeOrCreateDatatype(
      key,
      TypeOfDatatype.COUNTER,
      StateOfDatatype.DUE_TO_SUBSCRIBE_CREATE
    ) as Counter;
  }

  private subscribeOrCreateDatatype(
    key: string,
    type: TypeOfDatatype,
    state: StateOfDatatype
  ): IDatatype {
    return this.dataManager.subscribeOrCreateDatatype(key, type, state);

    // let datatype: Datatype;
  }

  public sync(): Promise<void> {
    return this.dataManager.syncAll();
  }
}
