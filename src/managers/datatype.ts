import { Wire, WiredDatatype } from '@ooo/datatypes/wired';
import { ClientContext } from '@ooo/context';
import { GrpcSyncManager } from '@ooo/managers/grpc_sync';

export class DatatypeManager implements Wire {
  private ctx: ClientContext;
  private syncManager: GrpcSyncManager | null;

  constructor(ctx: ClientContext, syncManager: GrpcSyncManager | null) {
    this.ctx = ctx;
    this.syncManager = syncManager;
  }

  OnChangeDatatypeState(): void {
    // do nothing
  }

  deliverTransaction(wired: WiredDatatype): void {
    // do nothing
  }
}
