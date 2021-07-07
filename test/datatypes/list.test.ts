import { Suite } from 'mocha';
import { InternalWireManager } from '@test/managers/internal_wire';
import { helper } from '@test/helper/helper';
import { expect } from 'chai';

describe('Test local List operations', function (this: Suite): void {
  it('Can test basic List operations', async () => {
    const wireManager = new InternalWireManager();

    const client1 = helper.getLocalClient(helper.ctName(this, 1), wireManager);
    const client2 = helper.getLocalClient(helper.ctName(this, 2), wireManager);

    const list1 = client1.subscribeOrCreateList(helper.dtName(this));
    await list1.sync();
    const list2 = client2.subscribeOrCreateList(helper.dtName(this));
    await list2.sync();

    list1.insert(0, 'hello', 1234, 3.141592, true);
    await list1.sync();
    await list2.sync();

    helper.L.info(`${JSON.stringify(list1)}`);
    expect(JSON.stringify(list1)).to.eq(JSON.stringify(list2));

    const updated1 = list1.update(1, 5678, 6.2831, false);
    expect(updated1.length).to.eq(3);
    expect(updated1[0]).to.eq(1234);
    expect(updated1[1]).to.eq(3.141592);
    expect(updated1[2]).to.eq(true);
    const updated2 = list2.update(2, 3.333);
    expect(updated2[0]).to.eq(3.141592);
    await list1.sync();
    await list2.sync();

    helper.L.info(`${JSON.stringify(list1)}`);
    helper.L.info(`${JSON.stringify(list2)}`);
    expect(JSON.stringify(list1)).to.eq(JSON.stringify(list2));

    const del1 = list1.deleteMany(0, 2);
    expect(del1.length).to.eq(2);
    expect(del1[0]).to.eq('hello');
    expect(del1[1]).to.eq(5678);
    await list1.sync();

    const del2 = list2.delete(0);
    expect(del2).to.eq(6.2831);
    await list2.sync();

    helper.L.info(`${JSON.stringify(list1)}`);
    helper.L.info(`${JSON.stringify(list2)}`);
    expect(JSON.stringify(list1)).to.eq(JSON.stringify(list2));
  });
});
