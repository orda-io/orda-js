import { Suite } from 'mocha';
import { helper } from '@test/helper/helper';
import { ClientModel } from '@orda/types/client';
import { createUID } from '@orda/types/uid';
import { ClientContext } from '@orda/context';
import { GrpcGatewayWireManager } from '@orda/managers/grpc_gateway_wire';
import { ClientMessage } from '@orda/types/messages';

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
    const cm = new ClientModel(createUID(), 'client1', conf.collectionName, conf.syncType);
    const ctx = new ClientContext(cm, conf.loggerFactory);
    const wireManager = new GrpcGatewayWireManager(conf, ctx);
    const req = new ClientMessage(ctx.client);
    const response = await wireManager.openApi.api.ordaServiceProcessClient(conf.collectionName, cm.cuid, req);
    console.log(`response:${response.status}`);
    const data = await response.data;
    console.log(`data:${JSON.stringify(data)}`);
    console.log('end');
  } catch (e) {
    console.error(e);
  }
}
