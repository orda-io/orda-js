import { CreateLocalClientConfig } from '../src/config';
import { Client } from '../src/client';

describe('Test clients', () => {
  it('Can create a client', async () => {
    const conf = CreateLocalClientConfig('hello_world');
    const client = new Client(conf, 'hello');
    await client.sendClientRequest();
    // Logger.log(client);
  });
});
