import { assert } from 'chai';
import { UID } from '../../src/protocols/uid';
import { Logger } from '../helper';

describe('Test UID', () => {
  it('Can generate and compare UIDs', () => {
    const uid1 = new UID();
    const uid2 = new UID();
    const uid3 = new UID(true);

    Logger.log('UID1:', uid1.String());
    Logger.log('UID2:', uid2.String());
    Logger.log('UID3:', uid3.String());
    Logger.log(uid1.Compare(uid1));
    Logger.log(uid1.Compare(uid1), 0);
    Logger.log(uid1.Compare(uid2));
    assert.notEqual(uid1.Compare(uid2), 0);
  });
});
