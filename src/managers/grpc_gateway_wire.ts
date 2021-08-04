import { WireManager } from '@orda/managers/wire';
import { uint32, Uint32 } from '@orda-io/orda-integer';
import { ClientContext } from '@orda/context';
import { ClientConfig } from '@orda/config';
import { DataManager } from '@orda/managers/data';
import { WiredDatatype } from '@orda/datatypes/wired';
import { PushPullPack } from '@orda/types/pushpullpack';
import { Api, ApiConfig, OrdaSyncType } from '@orda/generated/openapi';
import { ErrClient } from '@orda/errors/client';
import { NotifyManager } from '@orda/managers/notify';
import { StateOfDatatype } from '@orda/generated/proto.enum';
import { ClientMessage, PushPullMessage } from '@orda/types/messages';
import { CUID } from '@orda/types/uid';

export { GrpcGatewayWireManager };

class GrpcGatewayWireManager implements WireManager {
  private seq: Uint32;
  private dataManager?: DataManager;
  openApi: Api<any>;
  private ctx: ClientContext;
  private notifyManager?: NotifyManager;

  constructor(conf: ClientConfig, ctx: ClientContext) {
    this.ctx = ctx;
    this.seq = uint32();
    const apiConfig: ApiConfig = {
      baseUrl: conf.serverAddr,
    };
    this.openApi = new Api(apiConfig);
    if (this.ctx.client.syncType === OrdaSyncType.REALTIME) {
      this.notifyManager = new NotifyManager(conf, ctx);
    }
  }

  addDataManager(dataManager: DataManager): void {
    this.dataManager = dataManager;
    this.notifyManager?.addNotifyReceiver(dataManager);
  }

  public async exchangeClient(): Promise<void> {
    const req = new ClientMessage(this.ctx.client);
    this.ctx.L.debug(`[🚀🔻] send ClientMessage ${JSON.stringify(req)}`);
    try {
      const response = await this.openApi.api.ordaServiceProcessClient(req.collection, req.cuid, req);

      if (response && response.status === 200) {
        const clientMsg = await response.data;
        this.ctx.L.debug(
          `[🚀] received ClientMessage '${clientMsg.clientAlias}'(${clientMsg.cuid}) in collection '${clientMsg.collection}'.`
        );
        this.notifyManager?.connect();
      } else {
        this.ctx.L.warn(`[🚀] fail to receive ClientMessage: status(${response?.status}`);
      }
    } catch (e) {
      const err = new ErrClient.Connect(this.ctx.L, e.error.message);
      return Promise.reject(err);
    } finally {
      this.ctx.L.debug('[🚀🔺] end exchangeClient()');
    }
    return Promise.resolve();
  }

  public async exchangePushPull(cuid: CUID, ...pushPullList: PushPullPack[]): Promise<void> {
    try {
      this.ctx.L.info('[🚀🔻] BEGIN exchangePushPull()');
      const req = new PushPullMessage(this.ctx.client, ...pushPullList);
      this.ctx.L.info(`[🚀] SEND PUSH: ${JSON.stringify(pushPullList)}`);
      const response = await this.openApi.api.ordaServiceProcessPushPull(req.collection, req.cuid, req);
      if (response && response.status === 200) {
        const pulled = await response.data;
        if (pulled.PushPullPacks) {
          const pushPullPacks: PushPullPack[] = new Array<PushPullPack>();
          for (const ppp of pulled.PushPullPacks) {
            pushPullPacks.push(PushPullPack.fromOpenApi(ppp));
          }
          this.ctx.L.info(`[🚀] RECV PULL: ${JSON.stringify(pushPullPacks)}`);
          this.dataManager?.applyPushPullPack(...pushPullPacks);
        }
      } else {
        this.ctx.L.warn(`[🚀] fail to receive PushPullMessage: status(${response?.status}`);
      }
    } catch (e) {
      const err = new ErrClient.PushPull(this.ctx.L, e);
      return Promise.reject(err);
    } finally {
      this.ctx.L.info('[🚀🔺] END exchangePushPull()');
    }
    return Promise.resolve();
  }

  async deliverTransaction(wired: WiredDatatype): Promise<void> {
    this.ctx.L.info('[🚀] deliverTransaction');
    await this.dataManager?.trySyncDatatype(wired);
    return;
  }

  onDatatypeStateChange(wired: WiredDatatype): void {
    switch (wired.state) {
      case StateOfDatatype.DUE_TO_CREATE:
        break;
      case StateOfDatatype.DUE_TO_SUBSCRIBE:
        break;
      case StateOfDatatype.DUE_TO_SUBSCRIBE_CREATE:
        break;
      case StateOfDatatype.SUBSCRIBED:
        this.notifyManager?.subscribeDatatype(wired.key);
        break;
      case StateOfDatatype.DUE_TO_UNSUBSCRIBE:
      case StateOfDatatype.CLOSED:
      case StateOfDatatype.DELETED:
        this.dataManager?.closeDatatype(wired.key);
        this.notifyManager?.unsubscribeDatatype(wired.key);
        break;
    }
  }

  close(): void {
    this.notifyManager?.disconnect();
    this.ctx.L.debug(`[🚀👆] closed grpc_gateway_wire`);
  }
}
