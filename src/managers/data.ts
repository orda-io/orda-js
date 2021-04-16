import { ClientContext } from '@ooo/context';
import { WireManager } from '@ooo/managers/wire';
import { Datatype } from '@ooo/datatypes/datatype';
import { _Counter } from '@ooo/datatypes/counter';
import { PushPullPack } from '@ooo/types/pushpullpack';
import { Mutex } from 'async-mutex';
import { StateOfDatatype, TypeOfDatatype } from '@ooo/types/datatype';
import { DatatypeHandlers } from '@ooo/handlers/handlers';

export class DataManager {
  private ctx: ClientContext;
  private wireManager?: WireManager;
  private dataMap: Map<string, Datatype>;
  private mutex: Mutex;

  constructor(ctx: ClientContext, wireManager?: WireManager) {
    this.ctx = ctx;
    this.wireManager = wireManager;
    this.dataMap = new Map<string, Datatype>();
    this.mutex = new Mutex();
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
      return this.wireManager.exchangePushPull(...pushPullPackList);
    }
    return Promise.resolve();
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
}
