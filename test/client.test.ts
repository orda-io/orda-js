import { Client } from '@ooo/client';
import { helper } from '@test/helper';
import { expect } from 'chai';
import { SyncType } from '@ooo/types/client';

describe('Test Clients', () => {
  it('Can connect a client', async () => {
    const conf1 = helper.createLocalClientConfig('NOT_EXIST');

    const client1: Client = new Client(conf1, 'client1');
    try {
      await client1.connect();
      expect.fail();
    } catch (e) {}
    expect(client1.isConnected()).to.false;

    const conf = helper.createLocalClientConfig(
      'hello_world',
      SyncType.NOTIFIABLE
    );
    await helper.createCollection(conf);
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
});
