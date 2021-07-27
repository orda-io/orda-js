import { Suite } from 'mocha';
import { helper } from '@test/helper/helper';
import { _Counter, CounterTx } from '@orda/datatypes/counter';
import { expect } from 'chai';
import { Int32 } from '@orda-io/orda-integer';
import { ErrDatatype } from '@orda/errors/datatype';

describe('Test Transaction', function (this: Suite): void {
  it('Can transaction', () => {
    const client = helper.getLocalClient(helper.ctName(this));
    const counter = client.createCounter(helper.dtName(this));
    const _counter = counter as _Counter;
    expect(counter.increase(1)).to.equal(1);

    Int32.enableRangeError = true;
    const oldOpId = _counter.ctx.datatype!.opId.clone();

    helper.L.info('before error, opId:', oldOpId.toString());
    expect(() => counter.increase(Number(Int32.MAX_VALUE))).to.throw(ErrDatatype.OutOfBound);
    expect(counter.get()).to.equal(1);
    expect(_counter.ctx.datatype!.opId.compare(oldOpId)).to.equal(0);

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
