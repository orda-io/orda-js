import {
  OrdaClientMessage,
  OrdaClientType,
  OrdaHeader,
  OrdaPushPullMessage,
  OrdaPushPullPack,
  OrdaRequestType,
  OrdaSyncType,
} from '@ooo/generated/openapi';
import { getAgent } from '@ooo/constants/constants';
import { ClientModel } from '@ooo/types/client';
import { PushPullPack } from '@ooo/types/pushpullpack';

const ProtocolVersion = 'v1';

function createHeader(type: OrdaRequestType): OrdaHeader {
  return {
    version: ProtocolVersion,
    agent: getAgent(),
    type: type,
  };
}

export class ClientMessage implements OrdaClientMessage {
  header: OrdaHeader;
  collection: string;
  cuid: string;
  clientAlias: string;
  clientType: OrdaClientType;
  syncType: OrdaSyncType;

  constructor(client: ClientModel) {
    this.header = createHeader(OrdaRequestType.CLIENTS);
    this.collection = client.collection;
    this.cuid = client.cuid;
    this.clientAlias = client.alias;
    this.clientType = OrdaClientType.EPHEMERAL;
    this.syncType = client.syncType;
  }
}

export class PushPullMessage implements OrdaPushPullMessage {
  header: OrdaHeader;
  collection: string;
  cuid: string;
  PushPullPacks: OrdaPushPullPack[];

  constructor(client: ClientModel, ...pushPullList: PushPullPack[]) {
    const pppList: OrdaPushPullPack[] = new Array<OrdaPushPullPack>();
    for (const pushPullPack of pushPullList) {
      pppList.push(pushPullPack.toOpenApi());
    }
    this.header = createHeader(OrdaRequestType.PUSHPULLS);
    this.cuid = client.cuid;
    this.collection = client.collection;
    this.PushPullPacks = pppList;
  }
}
