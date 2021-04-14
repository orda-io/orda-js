import { OperationId } from '@ooo/types/operation';
import { createNullUID, createUID, CUID, strcmp } from '@ooo/types/uid';
import { expect } from 'chai';
import { helper } from '@test/helper';

describe('Test operation ID', () => {
  it('Can generate and compare IDs', () => {
    const cuid1 = createUID();
    const cuid2 = createUID();
    const opId1 = new OperationId(cuid1);
    const opId2 = new OperationId(cuid2);

    helper.L.info(`${opId1} vs ${opId2}`);
    expect(strcmp(cuid1, cuid2)).to.equal(opId1.compare(opId2));
    opId1.next();
    expect(opId1.compare(opId2) > 0).to.true;
    expect(opId1.compare(opId1)).to.equal(0);
  });
});
