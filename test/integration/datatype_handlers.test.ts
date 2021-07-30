import { Suite } from 'mocha';
import { helper } from '@test/helper/helper';
import { SyncType } from '@orda/types/client';
import { Client } from '@orda/client';
import { DatatypeErrCodes } from '@orda/errors/for_handlers';
import { TestDatatypeHandlers } from '@test/integration/test_datatype_handlers';
import { expect } from 'chai';
import { StateOfDatatype } from '@orda/generated/proto.enum';
import { ordaLogger } from '../../src/constants/constants';

describe('Test Datatype Handlers', function (this: Suite): void {
  it('Can handle no datatype to subscribe', async () => {
    const conf = await helper.createTestClientConfig(SyncType.MANUALLY);
    const client1: Client = new Client(conf, 'client1');
    const testHandlers = new TestDatatypeHandlers();
    try {
      await client1.connect();
      const latch1 = testHandlers.getNewStateLatch(StateOfDatatype.CLOSED);
      const latch2 = testHandlers.getDatatypeErrLatch(DatatypeErrCodes.NO_DATATYPE_TO_SUBSCRIBE);
      const counter1 = client1.subscribeCounter(helper.dtName(this), testHandlers);

      counter1.sync().then();
      await latch1.wait();
      await latch2.wait();
      expect(testHandlers.success).to.true;
      expect(counter1.state).to.equal(StateOfDatatype.CLOSED);
    } finally {
      await client1.close();
    }
  });

  it('Can handle duplicated key', async () => {
    const conf = await helper.createTestClientConfig(SyncType.MANUALLY);
    const client1: Client = new Client(conf, 'client1');
    const client2: Client = new Client(conf, 'client2');
    const testHandlers = new TestDatatypeHandlers();
    try {
      await client1.connect();
      await client2.connect();
      const latch1 = testHandlers.getNewStateLatch(StateOfDatatype.CLOSED);
      const latch2 = testHandlers.getDatatypeErrLatch(DatatypeErrCodes.DUPLICATED_KEY);
      const counter1 = client1.createCounter(helper.dtName(this));
      await counter1.sync();
      const counter2 = client2.createCounter(helper.dtName(this), testHandlers);
      await counter2.sync();
      await latch1.wait();
      await latch2.wait();
      expect(testHandlers.success).to.true;
      expect(counter1.state).to.equal(StateOfDatatype.SUBSCRIBED);
      expect(counter2.state).to.equal(StateOfDatatype.CLOSED);
    } finally {
      await client1.close();
      await client2.close();
    }
  });

  it('Can handle remote operations', async () => {
    const conf = await helper.createTestClientConfig(SyncType.MANUALLY);
    const client1: Client = new Client(conf, 'client1');
    const client2: Client = new Client(conf, 'client2');
    const testHandlers = new TestDatatypeHandlers();

    try {
      await client1.connect();
      await client2.connect();
      const latch1 = testHandlers.getNewStateLatch(StateOfDatatype.SUBSCRIBED);
      const latch2 = testHandlers.getRemoteLatch(1);
      const counter1 = client1.subscribeOrCreateCounter(helper.dtName(this));
      await counter1.sync();
      const counter2 = client2.subscribeOrCreateCounter(helper.dtName(this), testHandlers);
      await counter2.sync();
      await latch1.wait();
      await latch2.wait();
      ordaLogger.info('end first sync');
      expect(testHandlers.success).to.true;
      expect(counter1.state).to.equal(StateOfDatatype.SUBSCRIBED);
      expect(counter2.state).to.equal(StateOfDatatype.SUBSCRIBED);
      counter1.increase(1);
      counter1.increase(2);
      counter1.increase(3);
      await counter1.sync();
      const latch3 = testHandlers.getRemoteLatch(3);
      await counter2.sync();
      await latch3.wait();
      testHandlers.getNewStateLatch(StateOfDatatype.CLOSED);
    } finally {
      await client1.close();
      await client2.close();
    }
  });
});
