import { Suite } from 'mocha';
import { helper } from '@test/helper/helper';
import { InternalWireManager } from '@test/managers/internal_wire';
import { StateOfDatatype } from '@orda/types/datatype';
import { expect } from 'chai';
import { ordaLogger } from '../../src/constants/constants';

describe('Test InternalWireManager', function (this: Suite): void {
  it('Can create InternalWireManager', async () => {
    const wireManager: InternalWireManager = new InternalWireManager();

    const client1 = helper.getLocalClient(helper.ctName(this, 1), wireManager);
    const client2 = helper.getLocalClient(helper.ctName(this, 2), wireManager);

    const counter1 = client1.subscribeOrCreateCounter(helper.dtName(this));

    ordaLogger.info('call counter1.sync()');
    await counter1.sync();
    expect(counter1.state).to.equal(StateOfDatatype.SUBSCRIBED);

    ordaLogger.info('subscribe counter2');
    const counter2 = client2.subscribeOrCreateCounter(helper.dtName(this));
    counter2.increase(10);
    await counter2.sync();
    expect(counter2.get()).to.equal(0);

    ordaLogger.info('increase counter2');
    counter2.increase(20);
    await counter2.sync();
  });
});
