import { SyncType } from '@orda/types/client';
import { helper } from '@test/helper/helper';
import { Client } from '@orda/client';
import { Suite } from 'mocha';
import { CountDownLatch } from '@test/helper/countdown_latch';
import { expect } from 'chai';
import { OrdaCounterTx } from '@orda/datatypes/counter';
import { Datatype, OrdaDatatype } from '@orda/datatypes/datatype';
import { Operation, OrdaDocTx } from '../../src';

describe('Test Synchronization', function (this: Suite): void {
  it('Can sync manually', async () => {
    const conf = await helper.createTestClientConfig(SyncType.MANUALLY);
    const client1: Client = new Client(conf, 'client1');
    const client2: Client = new Client(conf, 'client2');
    try {
      await client1.connect();
      await client2.connect();

      const counter1 = client1.subscribeOrCreateCounter(helper.dtName(this));
      counter1.increase(1);
      client1.sync().then();
      await client1.sync();

      const counter2 = client2.subscribeOrCreateCounter(helper.dtName(this));
      await client2.sync();
      expect(counter1.get()).to.eq(counter2.get()).to.eq(1);
      counter2.increase(3);
      await helper.sleep(1);
      expect(counter1.get()).to.eq(1);
      expect(counter2.get()).to.eq(4);
    } finally {
      await client1.close();
      await client2.close();
    }
  });

  it('Can sync realtime', async () => {
    const conf = await helper.createTestClientConfig(SyncType.REALTIME);
    const client1: Client = new Client(conf, 'client1');
    const client2: Client = new Client(conf, 'client2');

    try {
      await client1.connect();
      await client2.connect();
      const latch1 = new CountDownLatch(1);
      const counter1 = client1.subscribeOrCreateCounter(helper.dtName(this), {
        onDatatypeStateChange: (dt, oldState, newState) => {
          helper.L.info(`counter1: ${oldState} => ${newState}`);
          latch1.countDown();
        },
      });

      await latch1.wait();

      const counter2 = client2.subscribeCounter(helper.dtName(this), {
        onDatatypeRemoteChange: (dt: Datatype, opList) => {
          const cnt2 = dt as unknown as OrdaCounterTx;
          helper.L.info(`cnt2: ${cnt2.get()}`);
        },
      });

      for (let j = 0; j < 5; j++) {
        for (let i = 1; i <= 3; i++) {
          counter1.increase(i);
        }
        await helper.sleep(0.1);
      }
      await helper.sleep(1);
      expect(counter1.get()).to.equal(counter2.get()).to.equal(30);
    } finally {
      await client1.close();
      await client2.close();
    }
  });

  it('Can sync realtime document', async () => {
    const conf = await helper.createTestClientConfig(SyncType.REALTIME);
    const client1: Client = new Client(conf, 'client1');

    try {
      await client1.connect();
      const latch1 = new CountDownLatch(1);
      const doc1 = client1.subscribeOrCreateDocument(helper.dtName(this), {
        onDatatypeStateChange: (dt, oldState, newState) => {
          helper.L.info(`doc1: ${oldState} => ${newState}`);
          latch1.countDown();
        },
        onDatatypeRemoteChange: (dt: Datatype, opList: Operation[]) => {
          const docIn = dt as unknown as OrdaDocTx;
          helper.L.info(`${JSON.stringify(docIn.getValue())}`);
        },
      });
      await latch1.wait();
    } finally {
      await client1.close();
    }
  });
});
