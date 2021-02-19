import { OperationId } from '@ooo/types/operation';
import { CUID } from '@ooo/types/uid';
import { expect } from 'chai';
import { helper } from '@test/helper';

describe('Test operation ID', () => {
  it('Can generate and compare IDs', () => {
    const cuid1 = new CUID();
    const cuid2 = new CUID();
    const opId1 = new OperationId(cuid1);
    const opId2 = new OperationId(cuid2);

    helper.L.info(`${opId1} vs ${opId2}`);
    expect(cuid1.compare(cuid2)).to.equal(opId1.compare(opId2));
    opId1.next();
    expect(opId1.compare(opId2) > 0).to.true;
    expect(opId1.compare(opId1)).to.equal(0);
  });
});
