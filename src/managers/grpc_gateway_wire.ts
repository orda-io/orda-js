import { WireManager } from '@ooo/managers/wire';
import { uint32, Uint32 } from '@ooo/types/integer';
import { ClientContext } from '@ooo/context';
import { ClientConfig } from '@ooo/config';
import { DataManager } from '@ooo/managers/data';
import { WiredDatatype } from '@ooo/datatypes/wired';
import { PushPullPack } from '@ooo/types/pushpullpack';
import {
  Api,
  ApiConfig,
  OrtooClientMessage,
  OrtooClientType,
  OrtooHeader,
  OrtooPushPullMessage,
  OrtooPushPullPack,
  OrtooRequestType,
} from '@ooo/generated/openapi';
import { ErrClient } from '@ooo/errors/client';
import { NotifyManager } from '@ooo/managers/notify';
import { getAgent } from '@ooo/constants/constants';
import { StateOfDatatype } from '@ooo/generated/proto.enum';

export { GrpcGatewayWireManager };

const ProtocolVersion = 'v1';

class GrpcGatewayWireManager implements WireManager {
  private seq: Uint32;
  private dataManager?: DataManager;
  private openApi: Api<any>;
  private ctx: ClientContext;
  private notifyManager: NotifyManager;

  constructor(conf: ClientConfig, ctx: ClientContext) {
    this.ctx = ctx;
    this.seq = uint32();
    const apiConfig: ApiConfig = {
      baseUrl: conf.serverAddr,
    };
    this.openApi = new Api(apiConfig);
    this.notifyManager = new NotifyManager(conf, ctx);
  }

  addDataManager(dataManager: DataManager): void {
    this.dataManager = dataManager;
    this.notifyManager.addNotifyReceiver(dataManager);
  }

  private static createHeader(type: OrtooRequestType): OrtooHeader {
    return {
      version: ProtocolVersion,
      agent: getAgent(),
      type: type,
    };
  }

  public async exchangeClient(): Promise<void> {
    const arr: Uint8Array = new Uint8Array();
    arr.buffer;

    const req: OrtooClientMessage = {
      header: GrpcGatewayWireManager.createHeader(OrtooRequestType.CLIENTS),
      collection: this.ctx.client.collection,
      cuid: this.ctx.client.cuid,
      clientType: OrtooClientType.EPHEMERAL,
      clientAlias: this.ctx.client.alias,
      syncType: this.ctx.client.syncType,
    };
    this.ctx.L.debug(`[🚀🔻] send ClientMessage ${JSON.stringify(req)}`);
    try {
      const result = await this.openApi.api.ortooServiceProcessClient(
        this.ctx.client.collection,
        this.ctx.client.cuid,
        req
      );
      const clientMsg = result.data;
      this.ctx.L.debug(
        `[🚀] received ClientMessage '${clientMsg.clientAlias}'(${clientMsg.cuid}) in collection '${clientMsg.collection}'.`
      );
      this.notifyManager.connect();
    } catch (e) {
      const err = new ErrClient.Connect(this.ctx.L, e.error.message);
      return Promise.reject(err);
    } finally {
      this.ctx.L.debug('[🚀🔺] finished exchangeClient()');
    }
    return Promise.resolve();
  }

  public async exchangePushPull(
    ...pushPullList: PushPullPack[]
  ): Promise<void> {
    const pppList: OrtooPushPullPack[] = new Array<OrtooPushPullPack>();
    for (const pushPullPack of pushPullList) {
      pppList.push(pushPullPack.toOpenApi());
    }
    const req: OrtooPushPullMessage = {
      header: GrpcGatewayWireManager.createHeader(OrtooRequestType.PUSHPULLS),
      collection: this.ctx.client.collection,
      cuid: this.ctx.cuid,
      PushPullPacks: pppList,
    };
    this.ctx.L.debug(`[🚀🔻] send PUSH: ${JSON.stringify(req)}`);
    try {
      const result = await this.openApi.api.ortooServiceProcessPushPull(
        this.ctx.client.collection,
        this.ctx.client.cuid,
        req
      );
      const pulled = result.data;
      if (pulled.PushPullPacks) {
        this.ctx.L.debug(
          `[🚀] receive PULL: ${JSON.stringify(pulled.PushPullPacks)}`
        );
        const pushPullPacks: PushPullPack[] = new Array<PushPullPack>();
        for (const ppp of pulled.PushPullPacks) {
          pushPullPacks.push(PushPullPack.fromOpenApi(ppp));
        }
        this.dataManager?.applyPushPullPack(...pushPullPacks);
      }
    } catch (e) {
      const err = new ErrClient.PushPull(this.ctx.L, e.error.message);
      return Promise.reject(err);
    } finally {
      this.ctx.L.debug('[🚀🔺] finished exchangePushPull()');
    }
    return Promise.resolve();
  }

  async deliverTransaction(wired: WiredDatatype) {
    //
  }

  private nextSeq(): Uint32 {
    const currentSeq = this.seq.clone(Uint32);
    this.seq.add(1);
    return currentSeq;
  }

  onChangeDatatypeState(wired: WiredDatatype): void {
    if (wired.state === StateOfDatatype.SUBSCRIBED) {
      this.notifyManager.subscribeDatatype(wired.key);
    }
  }

  close(): void {
    this.notifyManager.disconnect();
    this.ctx.L.debug(`[🚀👆] closed grpc_gateway_wire`);
  }
}
