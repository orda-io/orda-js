import { OrtooServiceClient } from '@ooo/protobuf/OrtooServiceClientPb';
import { SyncType } from '@ooo/types/client';
import { NotificationManager } from '@ooo/managers/notification';
import { ClientConfig } from '@ooo/config';
import { ClientContext } from '@ooo/context';
import { uint32, Uint32 } from '@ooo/types/integer';

export class GrpcSyncManager {
  private seq: Uint32;
  private readonly serverAddr: string;
  private grpc?: OrtooServiceClient;
  private notification?: NotificationManager | null;
  private ctx: ClientContext;

  constructor(conf: ClientConfig, ctx: ClientContext) {
    this.ctx = ctx;
    this.seq = uint32();
    let notification: NotificationManager | null = null;
    if (this.ctx.client.syncType === SyncType.NOTIFIABLE) {
      notification = new NotificationManager(conf, ctx);
    }
    this.serverAddr = conf.ServerAddr;
    this.notification = notification;
  }

  public connect(): void {
    this.grpc = new OrtooServiceClient(this.serverAddr);
  }

  private nextSeq(): Uint32 {
    const currentSeq = this.seq.clone(Uint32);
    this.seq.add(1);
    return currentSeq;
  }
}
