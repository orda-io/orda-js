import { Wire } from '@orda/datatypes/wired';
import { DataManager, DatatypeEventReceiver } from '@orda/managers/data';
import { PushPullPack } from '@orda/types/pushpullpack';
import { CUID } from '@orda/types/uid';
import { Client } from '@orda/client';
import { ClientHandlers } from '@orda/handlers/client';
import { Data } from 'ws';
import { NotifyEventReceiver } from '@orda/managers/notify';

export type { WireManager };

/**
 * deal with request
 */
interface WireManager extends Wire {
  setReceivers(dataManager: DatatypeEventReceiver, notifyEventReceiver?: NotifyEventReceiver): void;

  exchangeClient(): void;

  exchangePushPull(cuid: CUID, ...pushPullList: PushPullPack[]): void;

  close(): void;
}
