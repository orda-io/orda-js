import { Suite } from 'mocha';
import { helper } from '@test/helper/helper';
import { int32, Int32 } from '@ooo/types/integer';

describe('Test Counter', function (this: Suite): void {
  it('Can create Counter', () => {
    const client = helper.getLocalClient(helper.ctName(this));
    const counter = client.createCounter(helper.dtName(this));
    counter.increase(int32(Int32.MAX_VALUE).asNumber());
    counter.state;
    helper.L.info(counter.get());
    counter.increase();
    helper.L.info(counter.get());
  });
});
