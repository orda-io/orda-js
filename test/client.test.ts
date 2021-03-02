import { Client } from '@ooo/client';
import { helper } from '@test/helper';
import { expect } from 'chai';
import { SyncType } from '@ooo/types/client';

describe('Test Clients', () => {
  it('Can create a client', async () => {
    const conf1 = helper.createLocalClientConfig('NOT_EXIST');

    const client1: Client = new Client(conf1, 'client1');
    const connected1 = await client1.connect();
    expect(connected1).to.false;

    const conf = helper.createLocalClientConfig(
      'hello_world',
      SyncType.NOTIFIABLE
    );
    await helper.createCollection(conf);
    const client2: Client = new Client(conf, 'client2');
    const connected2 = await client2.connect();
    expect(connected2).to.true;

    // await client.connect();
    // client.isConnected();
    // await client.sendClientRequest();
    // Logger.log(client);
  });
});
