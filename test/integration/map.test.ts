import { Suite } from 'mocha';
import { helper } from '@test/helper/helper';
import { SyncType } from '@ooo/types/client';
import { Client } from '@ooo/client';
import { expect } from 'chai';
import { _OooMap } from '@ooo/datatypes/map';

describe('Integration test map', function (this: Suite): void {
  it('Can synchronize Map with server', async () => {
    const conf = await helper.createTestClientConfig(SyncType.MANUALLY);
    const client1: Client = new Client(conf, 'client1');
    const client2: Client = new Client(conf, 'client2');
    const client3: Client = new Client(conf, 'client3');
    try {
      await client1.connect();
      const map1 = client1.createMap(helper.dtName(this));
      map1.put('hello', 'world');
      map1.put('num', 1234);
      map1.put('float', 3.141592);
      map1.put('struct', {
        ID: 'hello',
        Age: 10,
      });
      map1.put('list', ['x', 'y', 'z']);
      map1.put('Removed', 'deleted');
      map1.remove('Removed');
      expect(map1.get('Removed')).to.undefined;
      await map1.sync();

      await client2.connect();
      const map2 = client2.subscribeMap(helper.dtName(this));
      await map2.sync();

      const snap1 = (map1 as _OooMap).createSnapshotOperation();
      const snap2 = (map2 as _OooMap).createSnapshotOperation();
      helper.L.info(`${snap1}`);
      helper.L.info(`${snap2}`);
      expect(map1.get('hello')).to.equal(map2.get('hello'));

      const map3 = client3.createMap(helper.dtName(this)) as _OooMap;

      map3.setSnapshot(snap1.getStringBody());
      const snap3 = map3.createSnapshotOperation();
      expect(`${snap1}`).to.equal(`${snap2}`).to.equal(`${snap3}`);
      helper.L.info(`${snap3}`);
    } finally {
      await client1.close();
      await client2.close();
    }
  });
});
