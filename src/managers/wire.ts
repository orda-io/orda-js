import { Wire } from '@ooo/datatypes/wired';
import { DataManager } from '@ooo/managers/data';
import { PushPullPack } from '@ooo/types/pushpullpack';
import { CUID } from '@ooo/types/uid';

export type { WireManager };

/**
 * deal with request
 */
interface WireManager extends Wire {
  addDataManager(dataManager: DataManager): void;

  exchangeClient(): void;

  exchangePushPull(cuid: CUID, ...pushPullList: PushPullPack[]): void;

  close(): void;
}
