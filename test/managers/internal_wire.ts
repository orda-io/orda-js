import { WireManager } from '@orda/managers/wire';
import { WiredDatatype } from '@orda/datatypes/wired';
import { DataManager } from '@orda/managers/data';
import { CUID, DUID } from '@orda/types/uid';
import { PPOptions, PushPullOptions, PushPullPack } from '@orda/types/pushpullpack';
import { uint64 } from '@orda-io/orda-integer';
import { Op } from '@orda/operations/operation';
import { OrdaLogger } from '@orda-io/orda-logger';
import { ExtMap } from '@orda/utils/map';
import { CheckPoint } from '@orda/types/checkpoint';

export { InternalWireManager };

class InternalWireManager implements WireManager {
  private dataManagers: ExtMap<CUID, DataManager>; // client -> dataManager
  private loggerMap: ExtMap<CUID, OrdaLogger>; // client -> logger
  private checkPointMap: ExtMap<CUID, ExtMap<string, CheckPoint>>; // client -> data -> checkpoint
  private historyMap: ExtMap<string, Array<Op>>; // data -> history
  private duidMap: ExtMap<string, DUID>; // data -> duid

  constructor() {
    this.dataManagers = new ExtMap<CUID, DataManager>();
    this.loggerMap = new ExtMap<CUID, OrdaLogger>();
    this.checkPointMap = new ExtMap<CUID, ExtMap<string, CheckPoint>>();
    this.historyMap = new ExtMap<string, Array<Op>>();
    this.duidMap = new ExtMap<string, DUID>();
  }

  exchangePushPull(cuid: CUID, ...pushPullList: PushPullPack[]): Promise<void> {
    pushPullList.forEach((ppp) => {
      const ownerCuid = cuid;
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
    const map = this.checkPointMap.getOrElseSet(cuid, new ExtMap<string, CheckPoint>());
    return map.getOrElseSet(key, new CheckPoint());
  }

  private makePushPullPack(cuid: CUID, ppp: PushPullPack): PushPullPack {
    const history = this.historyMap.getOrElseSet(ppp.key, new Array<Op>());

    const checkPoint = this.getCheckPoint(cuid, ppp.key);

    const opList = new Array<Op>();
    const startSseq = checkPoint.sseq.asNumber();
    checkPoint.setSseq(history.length);
    if (startSseq < history.length) {
      opList.push(...history.slice(startSseq));
    }

    return new PushPullPack(ppp.duid, ppp.key, ppp.type, checkPoint, ppp.era, ppp.option, opList);
  }

  private exchangePushPullForSender(ownerCuid: CUID, ppp: PushPullPack): void {
    const ownerLogger = this.loggerMap.get(ownerCuid);
    ownerLogger?.debug(`[🦅] SEND ${ppp.toString()}`);
    const dataManager = this.dataManagers.get(ownerCuid);
    const history = this.historyMap.getOrElseSet(ppp.key, new Array<Op>());

    const firstCreated = history.length === 0;
    const opArray = new Array<Op>();

    let option = PushPullOptions.normal;
    if (PPOptions.hasSubscribe(ppp.option) || PPOptions.hasCreate(ppp.option)) {
      option = PushPullOptions.subscribe;
      if (firstCreated && PPOptions.hasCreate(ppp.option)) {
        option = PushPullOptions.create;
        this.duidMap.set(ppp.key, ppp.duid);
      } else if (!firstCreated && PPOptions.hasCreate(ppp.option)) {
        ppp.opList = new Array<Op>();
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

    const response = new PushPullPack(ppp.duid, ppp.key, ppp.type, checkPoint, ppp.era, option, opArray);
    dataManager?.applyPushPullPack(response);
  }

  onChangeDatatypeState(wired: WiredDatatype): void {
    //
  }

  async exchangeClient(): Promise<void> {
    return Promise.resolve();
  }

  deliverTransaction(datatype: WiredDatatype): void {
    const pushPullPack = datatype.createPushPullPack();
    if (!pushPullPack) {
      return;
    }
    this.exchangePushPull(datatype.ctx.cuid, pushPullPack);
  }

  addDataManager(dataManager: DataManager): void {
    this.loggerMap.set(dataManager.ctx.cuid, dataManager.ctx.L);
    this.dataManagers.set(dataManager.ctx.cuid, dataManager);
  }

  close(): void {
    //
  }
}
