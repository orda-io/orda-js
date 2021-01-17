import { createLocalClientConfig } from '@ooo/config';
import { Client } from '@ooo/client';

describe('Test Clients', () => {
  it('Can create a client', async () => {
    const conf = createLocalClientConfig('hello_world');
    const client: Client = new Client(conf, 'hello');
    // await client.sendClientRequest();
    // Logger.log(client);
  });
});
