import { Timestamp } from '@ooo/types/timestamp';
import { createUID } from '@ooo/types/uid';
import { expect } from 'chai';
import { OrderedNode } from '@ooo/datatypes/ordered';
import { helper } from '@test/helper/helper';
import { TimedNode } from '@ooo/datatypes/timed';

describe('Test encoding OrderedNode', () => {
  it('Can encode and decode OrderedNode', () => {
    const ts = new Timestamp(1, 2, createUID(), 4);
    const on1 = new OrderedNode(ts, new TimedNode('hello', ts));
    const decoded = on1.toJSON();
    const on2 = OrderedNode.fromJSON(decoded);
    helper.L.info(`${JSON.stringify(on1)}`);
    helper.L.info(`${JSON.stringify(on2)}`);
    expect(JSON.stringify(on1)).to.equal(JSON.stringify(on2));
  });
});
