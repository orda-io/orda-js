import {
  OrtooClientMessage,
  OrtooClientType,
  OrtooHeader,
  OrtooPushPullMessage,
  OrtooPushPullPack,
  OrtooRequestType,
  OrtooSyncType,
} from '@ooo/generated/openapi';
import { getAgent } from '@ooo/constants/constants';
import { ClientModel } from '@ooo/types/client';
import { PushPullPack } from '@ooo/types/pushpullpack';

const ProtocolVersion = 'v1';

function createHeader(type: OrtooRequestType): OrtooHeader {
  return {
    version: ProtocolVersion,
    agent: getAgent(),
    type: type,
  };
}

export class ClientMessage implements OrtooClientMessage {
  header: OrtooHeader;
  collection: string;
  cuid: string;
  clientAlias: string;
  clientType: OrtooClientType;
  syncType: OrtooSyncType;

  constructor(client: ClientModel) {
    this.header = createHeader(OrtooRequestType.CLIENTS);
    this.collection = client.collection;
    this.cuid = client.cuid;
    this.clientAlias = client.alias;
    this.clientType = OrtooClientType.EPHEMERAL;
    this.syncType = client.syncType;
  }
}

export class PushPullMessage implements OrtooPushPullMessage {
  header: OrtooHeader;
  collection: string;
  cuid: string;
  PushPullPacks: OrtooPushPullPack[];

  constructor(client: ClientModel, ...pushPullList: PushPullPack[]) {
    const pppList: OrtooPushPullPack[] = new Array<OrtooPushPullPack>();
    for (const pushPullPack of pushPullList) {
      pppList.push(pushPullPack.toOpenApi());
    }
    this.header = createHeader(OrtooRequestType.PUSHPULLS);
    this.cuid = client.cuid;
    this.collection = client.collection;
    this.PushPullPacks = pppList;
  }
}
