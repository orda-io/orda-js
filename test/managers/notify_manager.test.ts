import { ClientModel, SyncType } from '@ooo/types/client';
import { createUID } from '@ooo/types/uid';
import { ClientContext } from '@ooo/context';
import { helper } from '@test/helper';
import { NotifyManager } from '@ooo/managers/notify';
import waitForExpect from 'wait-for-expect';
import { expect } from 'chai';
import sinon from 'sinon';
import { Client } from '@ooo/client';
import { Suite } from 'mocha';

describe('Test Notify Manager', function (this: Suite): void {
  it('Can connect EMQX server', async () => {
    const conf = await helper.createTestClientConfig();
    const clientModel = new ClientModel(
      createUID(),
      it.name,
      'hello_world',
      SyncType.NOTIFIABLE
    );
    const ctx = new ClientContext(clientModel, helper.loggerFactory);
    const notifyManager = new NotifyManager(conf, ctx);
    notifyManager.connect();
    await waitForExpect(() => {
      expect(notifyManager.isConnected()).to.equal(true);
    }, 2000);
    const disconnect = sinon.spy(notifyManager, 'onMessageArrived');
    notifyManager.subscribe('ortoo-js/test');
    notifyManager.disconnect();
  });

  it('Can receive notifications for subscribed data types', async () => {
    const conf = await helper.createTestClientConfig(SyncType.NOTIFIABLE);
    const client1: Client = new Client(conf, 'client1');
    await client1.connect();

    const client2: Client = new Client(conf, 'client2');
    await client2.connect();
    try {
      const counter1 = client1.subscribeOrCreateCounter(helper.dtName(this));
      await client1.sync();

      const counter2 = client2.subscribeOrCreateCounter(helper.dtName(this));
      await client2.sync();

      // counter2.increase(3);
      // await client2.sync();

      await helper.sleep(1.2);
    } finally {
      client1.close();
      client2.close();
    }
  });
});
