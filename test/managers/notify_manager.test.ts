import { SyncType } from '@ooo/types/client';
import { helper } from '@test/helper';
import { Client } from '@ooo/client';
import { Suite } from 'mocha';
import { expect } from 'chai';

describe('Test Notify Manager', function (this: Suite): void {
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

      counter2.increase(3);
      await client2.sync();

      await helper.sleep(1);
      expect(counter1.get()).to.eq(counter2.get()).to.eq(3);
    } finally {
      client1.close();
      client2.close();
    }
  });
});
