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
import { ErrClient } from '@ooo/errors/client';
import { OooMap } from '@ooo/datatypes/map';

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
    this.dataManager = new DataManager(this.ctx);

    if (wireManager) {
      this.wireManager = wireManager;
    } else {
      if (conf.syncType !== SyncType.LOCAL_ONLY) {
        this.wireManager = new GrpcGatewayWireManager(conf, this.ctx);
      }
    }
    this.dataManager.addWireManager(this.wireManager);
    this.wireManager?.addDataManager(this.dataManager);
    this.ctx.L.debug(`[🧞👇] create Client '${alias}'`);
  }

  public async connect(): Promise<void> {
    if (this.state === clientState.CONNECTED) {
      this.ctx.L.debug('already connected');
      return Promise.resolve();
    }
    if (this.wireManager) {
      try {
        await this.wireManager.exchangeClient();
        this.state = clientState.CONNECTED;
      } catch (e) {
        this.state = clientState.NOT_CONNECTED;
        return Promise.reject(e);
      }
    }
    return Promise.resolve();
  }

  public async close(): Promise<void> {
    if (await this.ctx.doLock('close')) {
      try {
        this.wireManager?.close();
        this.dataManager.close();
        this.ctx.L.debug(`[🧞👆] close client '${this.ctx.client.alias}'`);
      } finally {
        this.ctx.doUnlock('close');
      }
    }
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

  public createMap(key: string, handlers?: DatatypeHandlers): OooMap {
    return this.subscribeOrCreateDatatype(
      key,
      TypeOfDatatype.MAP,
      StateOfDatatype.DUE_TO_CREATE,
      handlers
    ) as OooMap;
  }

  public subscribeMap(key: string, handlers?: DatatypeHandlers): OooMap {
    return this.subscribeOrCreateDatatype(
      key,
      TypeOfDatatype.MAP,
      StateOfDatatype.DUE_TO_SUBSCRIBE,
      handlers
    ) as OooMap;
  }

  /**
   * subscribe Map with the given key if it exists in the ortoo server;
   * otherwise, the Ortoo server is going to create and subscribe a new Map of the given key.
   * @param {string} key
   * @param {DatatypeHandlers} handlers
   * @returns {Counter}
   */
  public subscribeOrCreateMap(
    key: string,
    handlers?: DatatypeHandlers
  ): OooMap {
    return this.subscribeOrCreateDatatype(
      key,
      TypeOfDatatype.MAP,
      StateOfDatatype.DUE_TO_SUBSCRIBE_CREATE,
      handlers
    ) as OooMap;
  }

  public async sync(): Promise<void> {
    if (this.state === clientState.CONNECTED) {
      return this.dataManager.syncAllWithLock();
    }
    return Promise.reject(new ErrClient.Sync(this.ctx.L, 'not connected'));
  }
}
