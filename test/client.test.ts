import { assert } from 'chai';
import { CreateLocalClientConfig } from '../src/config';
import { Client } from '../src/client';
// import Client from './client';

describe('Can create clients', () => {
  it('Should create a client', async () => {
    const conf = CreateLocalClientConfig('hello_world');
    const client = new Client(conf, 'hello');
    await client.sendClientRequest();
    console.log(client);
  });
});
