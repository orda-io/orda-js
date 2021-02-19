import { WireManager } from '@ooo/managers/wire';
import { uint32, Uint32 } from '@ooo/types/integer';
import { ClientContext } from '@ooo/context';
import { ClientConfig } from '@ooo/config';
import { DataManager } from '@ooo/managers/data';
import { WiredDatatype } from '@ooo/datatypes/wired';
import { PushPullPack } from '@ooo/types/pushpullpack';

export { GrpcWireManager };

class GrpcWireManager implements WireManager {
  private seq: Uint32;
  private readonly serverAddr: string;
  // private grpc?: OrtooServiceClient;
  // private notification?: NotificationManager | null;
  private ctx: ClientContext;

  constructor(conf: ClientConfig, ctx: ClientContext) {
    this.ctx = ctx;
    this.seq = uint32();
    // let notification: NotificationManager | null = null;
    // if (this.ctx.client.syncType === SyncType.NOTIFIABLE) {
    //   notification = new NotificationManager(conf, ctx);
    // }
    this.serverAddr = conf.ServerAddr;
    // this.notification = notification;
  }

  addDataManager(ctx: ClientContext, dataManager: DataManager): void {
    throw new Error('Method not implemented.');
  }

  public connect(): void {
    // this.grpc = new OrtooServiceClient(this.serverAddr);
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
