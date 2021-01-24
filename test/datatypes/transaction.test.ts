import { Suite } from 'mocha';
import { helper } from '@test/helper';
import { _Counter, Counter, CounterTx } from '@ooo/datatypes/counter';
import { expect } from 'chai';
import { Int32, Uint32 } from '@ooo/types/integer';
import { ErrDatatype } from '@ooo/errors/datatype';

describe('Test Transaction', function (this: Suite): void {
  it('Can transaction', async () => {
    const client = helper.getLocalClient(helper.getClientName(this));
    const counter = client.createCounter(helper.getDatatypeName(this));
    const _counter = counter as _Counter;
    expect(counter.increase(1)).to.equal(1);
    Int32.enableRangeError = true;
    const oldOpId = _counter.ctx.datatype.opId.clone();
    expect(() => counter.increase(Number(Int32.MAX_VALUE))).to.throw(
      ErrDatatype.OutOfBound
    );
    expect(counter.get()).to.equal(1);
    expect(_counter.ctx.datatype.opId.compare(oldOpId)).to.equal(0);

    counter.transaction('succeededTx', (counterTx: CounterTx) => {
      counterTx.increase(2);
      counterTx.increase(3);
      return true;
    });
    expect(counter.get()).to.equal(6);
    expect(() => {
      counter.transaction('failedTx', (counterTx: CounterTx) => {
        counterTx.increase(4);
        counterTx.increase(Number(Int32.MAX_VALUE));
        counterTx.increase(5);
        return false;
      });
    }).to.throw(ErrDatatype.OutOfBound);
    expect(counter.get()).to.equal(6);
    Int32.enableRangeError = false;
  });
});
