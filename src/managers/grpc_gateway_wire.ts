import { WireManager } from '@ooo/managers/wire';
import { uint32, Uint32 } from '@ooo/types/integer';
import { ClientContext } from '@ooo/context';
import { ClientConfig } from '@ooo/config';
import { DataManager } from '@ooo/managers/data';
import { WiredDatatype } from '@ooo/datatypes/wired';
import { PushPullPack } from '@ooo/types/pushpullpack';
import { Api, ApiConfig } from '@ooo/generated/openapi';
import { ErrClient } from '@ooo/errors/client';
import { NotifyManager } from '@ooo/managers/notify';
import { StateOfDatatype } from '@ooo/generated/proto.enum';
import { ClientMessage, PushPullMessage } from '@ooo/types/messages';

export { GrpcGatewayWireManager };

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

  public async exchangeClient(): Promise<void> {
    const arr: Uint8Array = new Uint8Array();
    arr.buffer;
    const req = new ClientMessage(this.ctx.client);
    this.ctx.L.debug(`[🚀🔻] send ClientMessage ${JSON.stringify(req)}`);
    try {
      const result = await this.openApi.api.ortooServiceProcessClient(
        req.collection,
        req.cuid,
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
      this.ctx.L.debug('[🚀🔺] end exchangeClient()');
    }
    return Promise.resolve();
  }

  public async exchangePushPull(
    ...pushPullList: PushPullPack[]
  ): Promise<void> {
    try {
      this.ctx.L.info('[🚀🔻] BEGIN exchangePushPull()');
      const req = new PushPullMessage(this.ctx.client, ...pushPullList);
      this.ctx.L.info(`[🚀] SEND PUSH: ${JSON.stringify(pushPullList)}`);
      const result = await this.openApi.api.ortooServiceProcessPushPull(
        req.collection,
        req.cuid,
        req
      );
      const pulled = result.data;

      if (pulled.PushPullPacks) {
        const pushPullPacks: PushPullPack[] = new Array<PushPullPack>();
        for (const ppp of pulled.PushPullPacks) {
          pushPullPacks.push(PushPullPack.fromOpenApi(ppp));
        }
        this.ctx.L.info(`[🚀] RECV PULL: ${JSON.stringify(pushPullPacks)}`);
        this.dataManager?.applyPushPullPack(...pushPullPacks);
      }
    } catch (e) {
      const err = new ErrClient.PushPull(this.ctx.L, e.error.message);
      return Promise.reject(err);
    } finally {
      this.ctx.L.info('[🚀🔺] END exchangePushPull()');
    }
    return Promise.resolve();
  }

  deliverTransaction(wired: WiredDatatype): void {
    this.ctx.L.info('[🚀] deliverTransaction');
    this.dataManager?.trySyncDatatype(wired);
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
