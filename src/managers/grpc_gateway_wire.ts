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

export { GrpcGatewayWireManager };

const ProtocolVersion = 'v1';

class GrpcGatewayWireManager implements WireManager {
  private seq: Uint32;
  private dataManager?: DataManager;
  private openApi: Api<any>;
  private ctx: ClientContext;

  constructor(conf: ClientConfig, ctx: ClientContext) {
    this.ctx = ctx;
    this.seq = uint32();
    const apiConfig: ApiConfig = {
      baseUrl: conf.serverAddr,
    };
    this.openApi = new Api(apiConfig);
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

  public async connect(): Promise<boolean> {
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
        `connected by client '${clientMsg.clientAlias}'(${clientMsg.cuid}) in collection '${clientMsg.collection}'.`
      );
    } catch (e) {
      this.ctx.L.error(e.error.message);
      return Promise.resolve(false);
    } finally {
      this.ctx.L.debug('finished connection');
    }
    return Promise.resolve(true);
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
}
