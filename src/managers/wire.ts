import { Wire } from '@orda/datatypes/wired';
import { DataManager } from '@orda/managers/data';
import { PushPullPack } from '@orda/types/pushpullpack';
import { CUID } from '@orda/types/uid';

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
