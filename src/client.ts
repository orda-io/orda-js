import { createUID } from '@ooo/types/uid';
import { ClientConfig } from '@ooo/config';
import { DataManager } from '@ooo/managers/data';
import { ClientContext } from '@ooo/context';
import { Counter } from '@ooo/datatypes/counter';
import { IDatatype } from '@ooo/datatypes/datatype';
import { WireManager } from '@ooo/managers/wire';
import { GrpcGatewayWireManager } from '@ooo/managers/grpc_gateway_wire';
import { ClientModel, SyncType } from '@ooo/types/client';
import { StateOfDatatype, TypeOfDatatype } from '@ooo/types/datatype';
import { DatatypeHandlers } from '@ooo/handlers/handlers';

export { Client };

enum clientState {
  NOT_CONNECTED,
  CONNECTED,
}

class Client {
  private state: clientState;
  private readonly model: ClientModel;
  private readonly ctx: ClientContext;
  private readonly wireManager?: WireManager;
  private readonly dataManager: DataManager;

  constructor(conf: ClientConfig, alias: string, wireManager?: WireManager) {
    this.model = new ClientModel(
      createUID(),
      alias,
      conf.collectionName,
      conf.syncType
    );

    this.ctx = new ClientContext(this.model, conf.loggerFactory);
    this.state = clientState.NOT_CONNECTED;

    if (wireManager) {
      this.wireManager = wireManager;
    } else {
      if (conf.syncType !== SyncType.LOCAL_ONLY) {
        this.wireManager = new GrpcGatewayWireManager(conf, this.ctx);
      }
    }

    this.dataManager = new DataManager(this.ctx, this.wireManager);
    this.wireManager?.addDataManager(this.ctx, this.dataManager);
    this.ctx.L.debug(`created Client '${alias}'`);
  }

  public async connect(): Promise<void> {
    if (this.state === clientState.NOT_CONNECTED && this.wireManager) {
      return this.wireManager
        .exchangeClient()
        .then(() => {
          this.state = clientState.CONNECTED;
        })
        .catch(() => {
          this.state = clientState.NOT_CONNECTED;
        });
    }
    return Promise.resolve();
  }

  public close(): void {
    this.wireManager?.close();
    this.ctx.L.debug(`closed client '${this.ctx.client.alias}'`);
  }

  private getName(): string {
    return this.model.getLogName(); //`${this.model.alias}:${this.model.cuid.toShortString()}`;
  }

  public isConnected(): boolean {
    return this.state === clientState.CONNECTED;
  }

  public createCounter(key: string, handlers?: DatatypeHandlers): Counter {
    return this.subscribeOrCreateDatatype(
      key,
      TypeOfDatatype.COUNTER,
      StateOfDatatype.DUE_TO_CREATE,
      handlers
    ) as Counter;
  }

  public subscribeCounter(key: string, handlers?: DatatypeHandlers): Counter {
    return this.subscribeOrCreateDatatype(
      key,
      TypeOfDatatype.COUNTER,
      StateOfDatatype.DUE_TO_SUBSCRIBE,
      handlers
    ) as Counter;
  }

  /**
   * subscribe Counter with the given key if it exists in the ortoo server;
   * otherwise, the Ortoo server is going to create and subscribe a new Counter of the given key.
   * @param {string} key
   * @param {DatatypeHandlers} handlers
   * @returns {Counter}
   */
  public subscribeOrCreateCounter(
    key: string,
    handlers?: DatatypeHandlers
  ): Counter {
    return this.subscribeOrCreateDatatype(
      key,
      TypeOfDatatype.COUNTER,
      StateOfDatatype.DUE_TO_SUBSCRIBE_CREATE,
      handlers
    ) as Counter;
  }

  private subscribeOrCreateDatatype(
    key: string,
    type: TypeOfDatatype,
    state: StateOfDatatype,
    handlers?: DatatypeHandlers
  ): IDatatype {
    return this.dataManager.subscribeOrCreateDatatype(
      key,
      type,
      state,
      handlers
    );
  }

  public sync(): Promise<void> {
    return this.dataManager.syncAll();
  }
}
