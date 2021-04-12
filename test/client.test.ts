import { helper } from '@test/helper';
import { expect } from 'chai';
import { SyncType } from '@ooo/types/client';
import { Client } from '@ooo/client';
import { Suite } from 'mocha';

describe('Test Clients', function (this: Suite): void {
  it('Can connect a client', async () => {
    const conf1 = helper.createClientConfig('NOT_EXIST');

    const client1: Client = new Client(conf1, 'client1');
    try {
      await client1.connect();
      expect.fail();
    } catch (e) {}
    expect(client1.isConnected()).to.false;

    const conf = helper.createTestClientConfig(SyncType.NOTIFIABLE);
    await helper.resetCollection(conf);
    const client2: Client = new Client(conf, 'client2');
    try {
      await client2.connect();
    } catch (e) {
      expect.fail();
    }
    expect(client2.isConnected()).to.true;

    client1.close();
    client2.close();
  });

  it('Can create a counter', async () => {
    const conf1 = helper.createTestClientConfig();
    await helper.resetCollection(conf1);

    const client1: Client = new Client(conf1, 'client1');
    try {
      await client1.connect();
    } catch (e) {
      expect.fail();
    }

    const counter1 = client1.subscribeOrCreateCounter(helper.dtName(this));
    counter1.increase();
    await client1.sync();
    client1.close();

    const client2: Client = new Client(conf1, 'client2');
    await client2.connect();

    const counter2 = client2.subscribeOrCreateCounter(helper.dtName(this));
    await client2.sync();
    helper.L.info(counter2.get());
    client2.close();
  });
});
