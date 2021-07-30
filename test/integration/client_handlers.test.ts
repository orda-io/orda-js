import { Suite } from 'mocha';
import { helper } from '../helper/helper';
import { Client, ClientConfig, ClientHandlers, SyncType } from '../../src';
import { CountDownLatch } from '../helper/countdown_latch';
import * as Assert from 'assert';
import { expect } from 'chai';

describe('Test Client Handlers', function (this: Suite): void {
  it('Can handle client connection', async () => {
    const conf = await helper.createTestClientConfig(SyncType.REALTIME);
    const connectLatch = new CountDownLatch(1);
    const handlers: ClientHandlers = new ClientHandlers(function (): void {
      // expect(this).to.eq(handlers);
      connectLatch.countDown();
    });
    const client1: Client = new Client(conf, 'client1', handlers);
    try {
      client1.connect();
      await connectLatch.wait();
    } finally {
      await client1.close();
    }
  });

  it('Can handle client connection error', async () => {
    const conf = helper.createClientConfig('NOT_EXIST', SyncType.REALTIME);
    const errorLatch = new CountDownLatch(1);
    const handlers = new ClientHandlers(
      () => {
        expect(this).to.eq(handlers);
        helper.L.info('connected');
        Assert.fail();
      },
      (client: Client, e: Error) => {
        helper.L.info(`${e}`);
        errorLatch.countDown();
      }
    );
    const client1: Client = new Client(conf, 'client2', handlers);
    try {
      client1.connect();
      await errorLatch.wait();
    } finally {
      await client1.close();
    }
  });
});
