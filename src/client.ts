import { createUID } from '@orda/types/uid';
import { ClientConfig } from '@orda/config';
import { DataManager } from '@orda/managers/data';
import { ClientContext } from '@orda/context';
import { OrdaCounter } from '@orda/datatypes/counter';
import { OrdaDatatype } from '@orda/datatypes/datatype';
import { WireManager } from '@orda/managers/wire';
import { GrpcGatewayWireManager } from '@orda/managers/grpc_gateway_wire';
import { ClientModel, SyncType } from '@orda/types/client';
import { StateOfDatatype, TypeOfDatatype } from '@orda/types/datatype';
import { DatatypeHandlers } from '@orda/handlers/datatype';
import { ErrClient } from '@orda/errors/client';
import { OrdaMap } from '@orda/datatypes/map';
import { OrdaList } from '@orda/datatypes/list';
import { __OrdaDoc, OrdaDoc } from '@orda/datatypes/document';
import { ClientHandlers } from '@orda/handlers/client';

export { Client };

export const enum clientState {
  NOT_CONNECTED,
  CONNECTED,
  CLOSED,
}

class Client {
  private state: clientState;
  private readonly model: ClientModel;
  private readonly ctx: ClientContext;
  private readonly wireManager?: WireManager;
  private readonly dataManager: DataManager;
  private handlers?: ClientHandlers;

  constructor(conf: ClientConfig, alias: string, clientHandlers?: ClientHandlers, wireManager?: WireManager) {
    this.model = new ClientModel(createUID(), alias, conf.collectionName, conf.syncType);

    this.ctx = new ClientContext(this.model, conf.loggerFactory);
    this.state = clientState.NOT_CONNECTED;
    this.dataManager = new DataManager(this.ctx);
    this.handlers = clientHandlers;
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

  public setHandlers(clientHandlers?: ClientHandlers): void {
    this.handlers = clientHandlers;
  }

  public getHandlers(): ClientHandlers | undefined {
    return this.handlers;
  }

  public async connect(): Promise<void> {
    if (this.state === clientState.CONNECTED) {
      this.ctx.L.debug('[🧞] already connected');
      return Promise.resolve();
    } else if (this.state === clientState.CLOSED) {
      this.ctx.L.error('[🧞] already connected');
      return Promise.reject();
    }
    if (this.wireManager) {
      try {
        this.ctx.L.info('[🧞] before exchangeClient');
        await this.wireManager.exchangeClient();
        this.state = clientState.CONNECTED;
        if (this.handlers?.onClientConnect) {
          this.handlers.onClientConnect(this);
        }
      } catch (e) {
        this.state = clientState.NOT_CONNECTED;
        if (this.handlers?.onClientError) {
          this.handlers.onClientError(this, e);
        }
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
        this.state = clientState.CLOSED;
        if (this.handlers?.onClientClose) {
          this.handlers.onClientClose(this);
        }
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

  public createCounter(key: string, handlers?: DatatypeHandlers): OrdaCounter {
    return this.subscribeOrCreate(key, TypeOfDatatype.COUNTER, StateOfDatatype.DUE_TO_CREATE, handlers) as OrdaCounter;
  }

  public subscribeCounter(key: string, handlers?: DatatypeHandlers): OrdaCounter {
    return this.subscribeOrCreate(
      key,
      TypeOfDatatype.COUNTER,
      StateOfDatatype.DUE_TO_SUBSCRIBE,
      handlers
    ) as OrdaCounter;
  }

  /**
   * subscribe Counter with the given key if it exists in the orda server;
   * otherwise, the Orda server is going to create and subscribe a new Counter of the given key.
   * @param {string} key
   * @param {DatatypeHandlers} handlers
   * @returns {OrdaCounter}
   */
  public subscribeOrCreateCounter(key: string, handlers?: DatatypeHandlers): OrdaCounter {
    return this.subscribeOrCreate(
      key,
      TypeOfDatatype.COUNTER,
      StateOfDatatype.DUE_TO_SUBSCRIBE_CREATE,
      handlers
    ) as OrdaCounter;
  }

  private subscribeOrCreate(
    key: string,
    type: TypeOfDatatype,
    state: StateOfDatatype,
    handlers?: DatatypeHandlers
  ): OrdaDatatype {
    return this.dataManager.subscribeOrCreateDatatype(key, type, state, handlers);
  }

  public createMap(key: string, handlers?: DatatypeHandlers): OrdaMap {
    return this.subscribeOrCreate(key, TypeOfDatatype.MAP, StateOfDatatype.DUE_TO_CREATE, handlers) as OrdaMap;
  }

  public subscribeMap(key: string, handlers?: DatatypeHandlers): OrdaMap {
    return this.subscribeOrCreate(key, TypeOfDatatype.MAP, StateOfDatatype.DUE_TO_SUBSCRIBE, handlers) as OrdaMap;
  }

  /**
   * subscribe Map with the given key if it exists in the orda server;
   * otherwise, the Orda server is going to create and subscribe a new Map of the given key.
   * @param {string} key
   * @param {DatatypeHandlers} handlers
   * @returns {Map}
   */
  public subscribeOrCreateMap(key: string, handlers?: DatatypeHandlers): OrdaMap {
    return this.subscribeOrCreate(
      key,
      TypeOfDatatype.MAP,
      StateOfDatatype.DUE_TO_SUBSCRIBE_CREATE,
      handlers
    ) as OrdaMap;
  }

  public createList(key: string, handlers?: DatatypeHandlers): OrdaList {
    return this.subscribeOrCreate(key, TypeOfDatatype.LIST, StateOfDatatype.DUE_TO_CREATE, handlers) as OrdaList;
  }

  public subscribeList(key: string, handlers?: DatatypeHandlers): OrdaList {
    return this.subscribeOrCreate(key, TypeOfDatatype.LIST, StateOfDatatype.DUE_TO_SUBSCRIBE, handlers) as OrdaList;
  }

  /**
   * subscribe List with the given key if it exists in the orda server;
   * otherwise, the Orda server is going to create and subscribe a new List of the given key.
   * @param {string} key
   * @param {DatatypeHandlers} handlers
   * @returns {OrdaList}
   */
  public subscribeOrCreateList(key: string, handlers?: DatatypeHandlers): OrdaList {
    return this.subscribeOrCreate(
      key,
      TypeOfDatatype.LIST,
      StateOfDatatype.DUE_TO_SUBSCRIBE_CREATE,
      handlers
    ) as OrdaList;
  }

  public createDocument(key: string, handlers?: DatatypeHandlers): OrdaDoc {
    return (
      this.subscribeOrCreate(key, TypeOfDatatype.DOCUMENT, StateOfDatatype.DUE_TO_CREATE, handlers) as __OrdaDoc
    ).toDocument();
  }

  public subscribeDocument(key: string, handlers?: DatatypeHandlers): OrdaDoc {
    return (
      this.subscribeOrCreate(key, TypeOfDatatype.DOCUMENT, StateOfDatatype.DUE_TO_SUBSCRIBE, handlers) as __OrdaDoc
    ).toDocument();
  }

  /**
   * subscribe Document with the given key if it exists in the orda server;
   * otherwise, the Orda server is going to create and subscribe a new List of the given key.
   * @param {string} key
   * @param {DatatypeHandlers} handlers
   * @returns {OrdaDoc}
   */
  public subscribeOrCreateDocument(key: string, handlers?: DatatypeHandlers): OrdaDoc {
    return (
      this.subscribeOrCreate(
        key,
        TypeOfDatatype.DOCUMENT,
        StateOfDatatype.DUE_TO_SUBSCRIBE_CREATE,
        handlers
      ) as __OrdaDoc
    ).toDocument();
  }

  public async sync(): Promise<void> {
    if (this.state === clientState.CONNECTED) {
      return this.dataManager.syncAllWithLock();
    }
    return Promise.reject(new ErrClient.Sync(this.ctx.L, 'not connected'));
  }
}
