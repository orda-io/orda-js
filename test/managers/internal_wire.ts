import { WireManager } from '@ooo/managers/wire';
import { WiredDatatype } from '@ooo/datatypes/wired';
import { ClientContext } from '@ooo/context';
import { DataManager } from '@ooo/managers/data';
import { CUID, DUID } from '@ooo/types/uid';
import {
  PPOptions,
  PushPullOptions,
  PushPullPack,
} from '@ooo/types/pushpullpack';
import { uint64 } from '@ooo/types/integer';
import { Operation } from '@ooo/operations/operation';
import { OrtooLogger } from '@ooo/utils/ortoo_logger';
import { OooMap } from '@ooo/utils/map';
import { CheckPoint } from '@ooo/types/checkpoint';

export { InternalWireManager };

class InternalWireManager implements WireManager {
  private dataManagers: OooMap<CUID, DataManager>; // client -> dataManager
  private loggerMap: OooMap<CUID, OrtooLogger>; // client -> logger
  private checkPointMap: OooMap<CUID, OooMap<string, CheckPoint>>; // client -> data -> checkpoint
  private historyMap: OooMap<string, Array<Operation>>; // data -> history
  private duidMap: OooMap<string, DUID>; // data -> duid

  constructor() {
    this.dataManagers = new OooMap<CUID, DataManager>();
    this.loggerMap = new OooMap<CUID, OrtooLogger>();
    this.checkPointMap = new OooMap<CUID, OooMap<string, CheckPoint>>();
    this.historyMap = new OooMap<string, Array<Operation>>();
    this.duidMap = new OooMap<string, DUID>();
  }

  exchangePushPull(...pushPullList: PushPullPack[]): Promise<void> {
    pushPullList.forEach((ppp) => {
      const firstOp = ppp.opList[0];
      const ownerCuid = firstOp.id.cuid;
      this.exchangePushPullForSender(ownerCuid, ppp);
      if (ppp.opList.length <= 0) {
        return Promise.resolve();
      }
      this.dataManagers.forEach((dm, cuid) => {
        if (ownerCuid !== cuid) {
          const reply = this.makePushPullPack(cuid, ppp);
          dm.applyPushPullPack(reply);
        }
      });
    });
    return Promise.resolve();
  }

  private getCheckPoint(cuid: CUID, key: string): CheckPoint {
    const map = this.checkPointMap.getOrElseSet(
      cuid,
      new OooMap<string, CheckPoint>()
    );
    return map.getOrElseSet(key, new CheckPoint());
  }

  private makePushPullPack(cuid: CUID, ppp: PushPullPack): PushPullPack {
    const history = this.historyMap.getOrElseSet(
      ppp.key,
      new Array<Operation>()
    );

    const checkPoint = this.getCheckPoint(cuid, ppp.key);

    const opList = new Array<Operation>();
    const startSseq = checkPoint.sseq.asNumber();
    checkPoint.setSseq(history.length);
    if (startSseq < history.length) {
      opList.push(...history.slice(startSseq));
    }

    return new PushPullPack(
      ppp.duid,
      ppp.key,
      ppp.type,
      checkPoint,
      ppp.era,
      ppp.option,
      opList
    );
  }

  private exchangePushPullForSender(ownerCuid: CUID, ppp: PushPullPack): void {
    const ownerLogger = this.loggerMap.get(ownerCuid);
    ownerLogger?.debug(`[🦅] SEND ${ppp.toString()}`);
    const dataManager = this.dataManagers.get(ownerCuid);
    const history = this.historyMap.getOrElseSet(
      ppp.key,
      new Array<Operation>()
    );

    const firstCreated = history.length === 0;
    const opArray = new Array<Operation>();

    let option = PushPullOptions.normal;
    if (PPOptions.hasSubscribe(ppp.option) || PPOptions.hasCreate(ppp.option)) {
      option = PushPullOptions.subscribe;
      if (firstCreated && PPOptions.hasCreate(ppp.option)) {
        option = PushPullOptions.create;
        this.duidMap.set(ppp.key, ppp.duid);
      } else if (!firstCreated && PPOptions.hasCreate(ppp.option)) {
        ppp.opList = new Array<Operation>();
        ppp.checkPoint.cseq = uint64(0);
        const duid = this.duidMap.get(ppp.key);
        if (duid) {
          ppp.duid = duid;
        }
      }
    }

    opArray.push(...history.slice(ppp.checkPoint.sseq.asNumber()));
    history.push(...ppp.opList);
    const checkPoint = this.getCheckPoint(ownerCuid, ppp.key);
    checkPoint.setSseq(history.length);
    checkPoint.setCseq(ppp.checkPoint.cseq);

    const response = new PushPullPack(
      ppp.duid,
      ppp.key,
      ppp.type,
      checkPoint,
      ppp.era,
      option,
      opArray
    );
    dataManager?.applyPushPullPack(response);
  }

  OnChangeDatatypeState(): void {
    //
  }

  async exchangeClient(): Promise<void> {
    return Promise.resolve();
  }

  deliverTransaction(datatype: WiredDatatype): void {
    // datatype.ctx.L.info('deliverTransaction');
    const pushPullPack = datatype.createPushPullPack();
    if (pushPullPack === null) {
      return;
    }
    this.exchangePushPull(pushPullPack);
  }

  sync(): void {
    //
  }

  addDataManager(ctx: ClientContext, dataManager: DataManager): void {
    this.loggerMap.set(ctx.cuid, ctx.L);
    this.dataManagers.set(ctx.cuid, dataManager);
  }

  close(): void {
    //
  }
}
