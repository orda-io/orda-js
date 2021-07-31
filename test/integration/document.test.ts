import { Suite } from 'mocha';

import { helper } from '@test/helper/helper';
import { SyncType } from '@orda/types/client';
import { Client } from '@orda/client';
import { expect } from 'chai';
import { ErrDatatype } from '@orda/errors/datatype';
import { OrdaDocTx } from '@orda/datatypes/document';
import { OrdaDatatype, OrdaDoc, StateOfDatatype } from '@orda/index';

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

      const doc2 = client2.subscribeDocument(helper.dtName(this), {
        onDatatypeStateChange: (dt: OrdaDatatype, oldState: StateOfDatatype, newState: StateOfDatatype) => {
          helper.L.info(`${JSON.stringify((dt as OrdaDoc).getValue())}`);
        },
      });
      await doc2.sync();

      doc1.putToObject('K1', 'hello');
      doc1.putToObject('K2', ['world', 1234, 3.141592, true]);
      doc1.putToObject('K3', { X1: 'orda', X2: 1234 });
      await doc1.sync();
      await doc2.sync();
      helper.L.info(`${JSON.stringify(doc1.getValue())}`);
      expect(JSON.stringify(doc1)).to.eq(JSON.stringify(doc2));

      doc2.getFromObject('K3')?.putToObject('X1', 'orda-js');
      doc2.getFromObject('K3')?.removeInObject('X2');
      doc2.getFromObject('K2')?.insertToArray(0, 'orda');
      expect(() => {
        doc2.insertToArray(0, 1234);
      }).to.throw(ErrDatatype.InvalidParent);
      await doc2.sync();
      await doc1.sync();
      helper.L.info(`${JSON.stringify(doc1.getValue())}`);
      expect(JSON.stringify(doc1)).to.eq(JSON.stringify(doc2));

      doc1.transaction('tx1', (doc: OrdaDocTx) => {
        doc.putToObject('T1', 'a');
        doc.putToObject('T2', [1, 2, 3, 4]);
        return false;
      });

      doc2.transaction('tx2', (doc: OrdaDocTx) => {
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
