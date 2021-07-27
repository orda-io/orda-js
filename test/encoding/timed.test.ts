import { Timestamp } from '@orda/types/timestamp';
import { createUID } from '@orda/types/uid';
import { expect } from 'chai';
import { TimedNode } from '@orda/datatypes/timed';

describe('Test encoding TimedNode', () => {
  it('Can encode and decode TimedNode', () => {
    const tn1 = new TimedNode('abc', new Timestamp(1, 2, createUID(), 3));
    const encoded = tn1.toJSON();
    const tn2 = TimedNode.fromJSON(encoded);
    expect(tn1.value).to.equal(tn2.value);
    expect(JSON.stringify(tn1.time)).to.equal(JSON.stringify(tn2.time));
  });
});
