import { OrtooServiceClient } from '../protocols/protobuf/OrtooServiceClientPb';
import { SyncType } from '../protocols/client_model';
import { NotificationManager } from './notification';
import { ClientConfig } from '../config';
import { OrtooContext } from '../context';

export default class SyncManager {
  private cseq: number;
  private readonly serverAddr: string;
  private grpc?: OrtooServiceClient;
  private notification: NotificationManager | null;
  private ctx: OrtooContext;

  constructor(conf: ClientConfig, ctx: OrtooContext) {
    this.ctx = ctx;
    this.cseq = 0;
    let notification: NotificationManager | null = null;
    if (this.ctx.client.getSynctype() === SyncType.NOTIFIABLE) {
      notification = new NotificationManager(conf, ctx);
    }
    this.serverAddr = conf.ServerAddr;
    this.notification = notification;
  }

  public connect(): void {
    this.grpc = new OrtooServiceClient(this.serverAddr);
  }
}
