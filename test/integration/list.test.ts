import { Suite } from 'mocha';
import { helper } from '@test/helper/helper';
import { SyncType } from '@orda/types/client';
import { Client } from '@orda/client';
import { _List } from '@orda/datatypes/list';
import { expect } from 'chai';

describe('Integration test list', function (this: Suite): void {
  it('Can synchronize List with server', async () => {
    const conf = await helper.createTestClientConfig(SyncType.MANUALLY);
    const client1: Client = new Client(conf, 'client1');
    const client2: Client = new Client(conf, 'client2');
    const client3: Client = new Client(conf, 'client3');
    try {
      await client1.connect();
      await client2.connect();

      const list1 = client1.createList(helper.dtName(this));
      await list1.sync();
      const list2 = client2.subscribeList(helper.dtName(this));
      await list2.sync();
      expect(list1.size()).to.eq(0);
      expect(list2.size()).to.eq(0);
      list1.insert(0, 'a');
      list1.insert(1, 'b');
      await client1.sync();
      await client2.sync();
      expect(list1.size()).to.eq(2);
      expect(list2.size()).to.eq(2);

      list1.insert(0, 1, 3.141592, 'X');
      list1.delete(0);
      await client1.sync();
      list2.update(0, 'A', 'B');
      await client2.sync();
      await client1.sync();

      helper.L.info(`${JSON.stringify(list1)}`);
      helper.L.info(`${JSON.stringify(list2)}`);
      const snap1 = (list1 as _List).createSnapshotOperation();
      const snap2 = (list2 as _List).createSnapshotOperation();

      const list3 = client3.createList(helper.dtName(this)) as _List;
      list3.setSnapshot(snap1.getStringBody());
      const snap3 = list3.createSnapshotOperation();
      expect(`${snap1}`).to.equal(`${snap2}`).to.equal(`${snap3}`);
    } finally {
      await client1.close();
      await client2.close();
    }
  });
});
