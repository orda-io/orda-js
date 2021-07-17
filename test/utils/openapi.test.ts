import { Suite } from 'mocha';
import { helper } from '@test/helper/helper';
import { ClientModel } from '@ooo/types/client';
import { createUID } from '@ooo/types/uid';
import { ClientContext } from '@ooo/context';
import { GrpcGatewayWireManager } from '@ooo/managers/grpc_gateway_wire';
import { ClientMessage } from '@ooo/types/messages';

describe('Test OpenApi', function (this: Suite): void {
  it('Can test async test', async () => {
    console.log(1);
    const ret = await asyncTest();
    console.log(`end+ ${ret}`);
  });
});

async function asyncTest(): Promise<void> {
  try {
    const conf = await helper.createTestClientConfig();
    // const client1: Client = new Client(conf, 'client2');
    // console.log('1');
    const cm = new ClientModel(createUID(), 'client1', conf.collectionName, conf.syncType);
    const ctx = new ClientContext(cm, conf.loggerFactory);
    const wireManager = new GrpcGatewayWireManager(conf, ctx);
    const req = new ClientMessage(ctx.client);
    const response = await wireManager.openApi.api.ordaServiceProcessClient(conf.collectionName, cm.cuid, req);
    console.log(`response:${response.status}`);
    const data = await response.data;
    console.log(`data:${JSON.stringify(data)}`);
    // await wireManager.exchangeClient();
    // await client1.connect();
    // const api =
    console.log('end');
  } catch (e) {
    console.error(e);
  }
}
