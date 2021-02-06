import { ClientContext } from '@ooo/context';
import { WireManager } from '@ooo/managers/wire';
import { Datatype } from '@ooo/datatypes/datatype';
import { StateOfDatatype, TypeOfDatatype } from '@ooo/protobuf/ortoo_pb';
import { _Counter } from '@ooo/datatypes/counter';
import { DatatypeNames } from '@ooo/types/datatype';
import { PushPullPack } from '@ooo/types/pushpullpack';
import { Mutex } from 'async-mutex';

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
    return new Promise<void>((resolve, reject) => {
      this.wireManager?.exchangePushPull(...pushPullPackList);
      resolve();
    });
  }

  subscribeOrCreateDatatype(
    key: string,
    type: TypeOfDatatype,
    state: StateOfDatatype
  ): Datatype {
    let data: Datatype | undefined = this.dataMap.get(key);
    if (data) {
      this.ctx.L.warn(`${DatatypeNames[type]} ${key} already exists`);
      return data;
    }

    switch (type) {
      case TypeOfDatatype.COUNTER:
        data = new _Counter(this.ctx, key, state, this.wireManager);
        this.dataMap.set(key, data);
        break;
      case TypeOfDatatype.HASH_MAP:
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

  applyPushPullPack(ppp: PushPullPack) {
    const datatype = this.dataMap.get(ppp.key);
    if (datatype) {
      datatype.applyPushPullPack(ppp);
    }
  }
}
