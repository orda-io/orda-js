import { Suite } from 'mocha';

import { helper } from '@test/helper/helper';
import { SyncType } from '@ooo/types/client';
import { Client } from '@ooo/client';
import { expect } from 'chai';
import { ErrDatatype } from '@ooo/errors/datatype';
import { DocumentTx } from '@ooo/datatypes/document';

describe('Integration test document', function (this: Suite): void {
  it('Can synchronize Document with server', async () => {
    const conf = await helper.createTestClientConfig(SyncType.MANUALLY);
    const client1: Client = new Client(conf, 'client1');
    const client2: Client = new Client(conf, 'client2');
    const client3: Client = new Client(conf, 'client3');
    try {
      await client1.connect();
      await client2.connect();

      const doc1 = client1.createDocument(helper.dtName(this));
      await doc1.sync();

      const doc2 = client2.subscribeDocument(helper.dtName(this));
      await doc2.sync();

      doc1.putToObject('K1', 'hello');
      doc1.putToObject('K2', ['world', 1234, 3.141592, true]);
      doc1.putToObject('K3', { X1: 'ortoo', X2: 1234 });
      await doc1.sync();
      await doc2.sync();
      helper.L.info(`${JSON.stringify(doc1.getValue())}`);
      expect(JSON.stringify(doc1)).to.eq(JSON.stringify(doc2));

      doc2.getFromObject('K3')?.putToObject('X1', 'ortoo-js');
      doc2.getFromObject('K3')?.removeInObject('X2');
      doc2.getFromObject('K2')?.insertToArray(0, 'ortoo');
      expect(() => {
        doc2.insertToArray(0, 1234);
      }).to.throw(ErrDatatype.InvalidParent);
      await doc2.sync();
      await doc1.sync();
      helper.L.info(`${JSON.stringify(doc1.getValue())}`);
      expect(JSON.stringify(doc1)).to.eq(JSON.stringify(doc2));

      doc1.transaction('tx1', (doc: DocumentTx) => {
        doc.putToObject('T1', 'a');
        doc.putToObject('T2', [1, 2, 3, 4]);
        return false;
      });

      doc2.transaction('tx2', (doc: DocumentTx) => {
        doc.putToObject('T1', 'b');
        doc.putToObject('T2', [4, 3, 2, 1]);
        return true;
      });
      await doc1.sync();
      await doc2.sync();
      await doc1.sync();
      helper.L.info(`${JSON.stringify(doc1.getValue())}`);
      expect(JSON.stringify(doc1)).to.eq(JSON.stringify(doc2));
    } finally {
      await client1.close();
      await client2.close();
    }
  });
});
