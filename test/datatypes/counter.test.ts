import { Suite } from 'mocha';
import { helper } from '@test/helper/helper';
import { int32, Int32 } from '@orda-io/orda-integer';
import { expect } from 'chai';

describe('Test local Counter operations', function (this: Suite): void {
  it('Can test basic Counter operations', () => {
    const client = helper.getLocalClient(helper.ctName(this));
    const counter = client.createCounter(helper.dtName(this));
    counter.increase(int32(Int32.MAX_VALUE).asNumber());
    helper.L.info(counter.get());
    expect(counter.get()).to.eq(int32(Int32.MAX_VALUE).asNumber());
    counter.increase();
    helper.L.info(counter.get());
    expect(counter.get()).to.eq(int32(Int32.MIN_VALUE).asNumber());
    helper.L.info(`${JSON.stringify(counter)}`);
  });
});
