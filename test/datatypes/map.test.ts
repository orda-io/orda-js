import { Suite } from 'mocha';
import { helper } from '@test/helper/helper';
import { InternalWireManager } from '@test/managers/internal_wire';
import { expect } from 'chai';

describe('Test local Map operations', function (this: Suite): void {
  it('Can test basic Map operations', async () => {
    const wireManager = new InternalWireManager();

    const client1 = helper.getLocalClient(helper.ctName(this, 1), wireManager);
    const client2 = helper.getLocalClient(helper.ctName(this, 2), wireManager);
    const map1 = client1.subscribeOrCreateMap(helper.dtName(this));
    await map1.sync();
    const map2 = client2.subscribeOrCreateMap(helper.dtName(this));
    await map2.sync();

    const old1 = map1.put('k1', 'v1');
    expect(old1).to.undefined;
    const old2 = map1.put('k2', 1);
    expect(old2).to.undefined;
    const old3 = map1.put('k3', 3.141592);
    expect(old3).to.undefined;
    await map1.sync();
    const old4 = map2.put('k1', 'v2');
    expect(old4).to.eq('v1');
    const old5 = map2.put('k2', 2);
    expect(old5).to.eq(1);
    const old6 = map2.put('k3', 1.234567);
    expect(old6).to.eq(3.141592);
    const old7 = map2.remove('k3');
    expect(old7).to.eq(1.234567);
    await map2.sync();
    await map1.sync();
    helper.L.info(`${JSON.stringify(map1)}`);
    helper.L.info(`${JSON.stringify(map2)}`);
    expect(JSON.stringify(map1)).to.eq(JSON.stringify(map2));
  });
});
