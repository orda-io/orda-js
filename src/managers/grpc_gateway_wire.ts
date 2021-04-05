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
  OrtooHeader,
  OrtooRequestType,
} from '@ooo/generated/openapi';
import { ErrClient } from '@ooo/errors/client';
import { NotifyManager } from '@ooo/managers/notify';

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

  addDataManager(ctx: ClientContext, dataManager: DataManager): void {
    this.dataManager = dataManager;
  }

  private createHeader(type: OrtooRequestType): OrtooHeader {
    return {
      version: ProtocolVersion,
      type: type,
    };
  }

  public async exchangeClient(): Promise<void> {
    const req: OrtooClientMessage = {
      header: this.createHeader(OrtooRequestType.CLIENTS),
      collection: this.ctx.client.collection,
      cuid: this.ctx.client.cuid.toString(),
      clientAlias: this.ctx.client.alias,
      syncType: this.ctx.client.syncType,
    };
    try {
      const result = await this.openApi.api.ortooServiceProcessClient(
        this.ctx.client.collection,
        this.ctx.client.cuid.toString(),
        req
      );
      const clientMsg = result.data;
      this.ctx.L.debug(
        `received ClientMessage '${clientMsg.clientAlias}'(${clientMsg.cuid}) in collection '${clientMsg.collection}'.`
      );
      this.notifyManager.connect();
    } catch (e) {
      const err = new ErrClient.Connect(this.ctx.L, e.error.message);
      return Promise.reject(err);
    } finally {
      this.ctx.L.debug('finished exchangeClient()');
    }
    return Promise.resolve();
  }

  private connectCatch(error: any) {
    switch (error.response.status) {
    }
  }

  private nextSeq(): Uint32 {
    const currentSeq = this.seq.clone(Uint32);
    this.seq.add(1);
    return currentSeq;
  }

  OnChangeDatatypeState(): void {
    //
  }

  async deliverTransaction(wired: WiredDatatype) {
    //
  }

  sync(): void {
    //
  }

  exchangePushPull(...pushPullList: PushPullPack[]): void {
    //
  }

  close(): void {
    this.notifyManager.disconnect();
    this.ctx.L.debug(`closed grpc_gateway_wire`);
  }
}
