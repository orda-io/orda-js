import { helper } from '@test/helper/helper';
import { expect } from 'chai';
import { ClientModel, SyncType } from '@ooo/types/client';
import { Client } from '@ooo/client';
import { Suite } from 'mocha';
import { createUID } from '@ooo/types/uid';

describe('Test Clients', function (this: Suite): void {
  it('Can connect synchronously', async () => {
    const conf = await helper.createTestClientConfig();
    const client1: Client = new Client(conf, 'client2');
    // console.log('1');
    const cm = new ClientModel(createUID(), 'client1', conf.collectionName, conf.syncType);
    // const ctx = new ClientContext(cm, conf.loggerFactory);
    // const wireManager = new GrpcGatewayWireManager(conf, ctx);
    // const req = new ClientMessage(ctx.client);
    // const response = await wireManager.openApi.api.ordaServiceProcessClient(conf.collectionName, cm.cuid, req);
    // console.log(`response:${response.status}`);
    // await wireManager.exchangeClient();
    await client1.connect();
    // const api =
    console.log('2');
    // await helper.sleep(2);
  });

  it('Can connect a client', async () => {
    const conf1 = helper.createClientConfig('NOT_EXIST');

    const client1: Client = new Client(conf1, 'client1');
    try {
      await client1.connect();
      expect.fail();
    } catch (e) {}
    expect(client1.isConnected()).to.false;

    const conf = await helper.createTestClientConfig(SyncType.REALTIME);
    const client2: Client = new Client(conf, 'client2');
    try {
      await client2.connect();
    } catch (e) {
      expect.fail();
    }
    expect(client2.isConnected()).to.true;

    await client1.close();
    await client2.close();
  });

  it('Can subscribe and create a counter', async () => {
    const conf1 = await helper.createTestClientConfig();

    const client1: Client = new Client(conf1, 'client1');
    try {
      await client1.connect();
    } catch (e) {
      expect.fail();
    }

    const counter1 = client1.subscribeOrCreateCounter(helper.dtName(this));
    counter1.increase(2);
    await client1.sync();
    await client1.close();

    const client2: Client = new Client(conf1, 'client2');
    await client2.connect();

    const counter2 = client2.subscribeOrCreateCounter(helper.dtName(this));
    await client2.sync();
    expect(counter2.get()).to.equal(2);
    await client2.close();
  });
});
