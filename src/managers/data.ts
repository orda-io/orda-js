import { ClientContext } from '@ooo/context';
import { WireManager } from '@ooo/managers/wire';
import { Datatype } from '@ooo/datatypes/datatype';
import { _Counter } from '@ooo/datatypes/counter';
import { PushPullPack } from '@ooo/types/pushpullpack';
import { Mutex } from 'async-mutex';
import { StateOfDatatype, TypeOfDatatype } from '@ooo/types/datatype';
import { DatatypeHandlers } from '@ooo/handlers/handlers';
import { Uint64 } from '@ooo/types/integer';
import { NotifyReceiver } from '@ooo/managers/notify';

export class DataManager implements NotifyReceiver {
  ctx: ClientContext;
  private wireManager?: WireManager;
  private dataMap: Map<string, Datatype>;
  private mutex: Mutex;

  constructor(ctx: ClientContext, wireManager?: WireManager) {
    this.ctx = ctx;
    this.wireManager = wireManager;
    this.dataMap = new Map<string, Datatype>();
    this.mutex = new Mutex();
  }

  addWireManager(wireManager?: WireManager): void {
    this.wireManager = wireManager;
  }

  syncAll(): Promise<void> {
    const pushPullPackList = new Array<PushPullPack>();
    this.dataMap.forEach((datatype) => {
      const ppp = datatype.createPushPullPack();
      if (ppp !== null) {
        pushPullPackList.push(ppp);
      }
    });
    if (this.wireManager) {
      return this.wireManager?.exchangePushPull(...pushPullPackList);
    }
    return Promise.resolve();
  }

  sync(key: string): void {
    const datatype = this.dataMap.get(key);
    if (datatype) {
      this.syncDatatype(datatype);
    }
  }

  private syncDatatype(datatype: Datatype): void {
    const ppp = datatype.createPushPullPack();
    if (ppp !== null) {
      this.wireManager?.exchangePushPull(ppp);
    }
  }

  subscribeOrCreateDatatype(
    key: string,
    type: TypeOfDatatype,
    state: StateOfDatatype,
    handlers?: DatatypeHandlers
  ): Datatype {
    let data: Datatype | undefined = this.dataMap.get(key);
    if (data) {
      this.ctx.L.warn(`${type} ${key} already exists`);
      return data;
    }

    switch (type) {
      case TypeOfDatatype.COUNTER:
        data = new _Counter(this.ctx, key, state, this.wireManager, handlers);
        this.dataMap.set(key, data);
        break;
      case TypeOfDatatype.MAP:
      case TypeOfDatatype.LIST:
      case TypeOfDatatype.DOCUMENT:
      default:
    }
    if (data) {
      data.subscribeOrCreate();
      return data;
    }
    throw new Error('not implemented yet');
  }

  applyPushPullPack(...pushPullPacks: PushPullPack[]) {
    for (const ppp of pushPullPacks) {
      const datatype = this.dataMap.get(ppp.key);
      if (datatype) {
        datatype.applyPushPullPack(ppp);
      }
    }
  }

  onReceiveNotification(
    cuid: string,
    duid: string,
    key: string,
    sseq: Uint64
  ): void {
    const datatype = this.dataMap.get(key);
    if (datatype && datatype.id === duid && datatype.syncIfNeeded(sseq)) {
      this.syncDatatype(datatype);
    }
  }
}
