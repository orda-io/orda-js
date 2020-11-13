import { assert } from 'chai';
import { UID } from './uid';

describe('UID test', () => {
  it('Can generate and compare UIDs', () => {
    const uid1 = new UID();
    const uid2 = new UID();
    const uid3 = new UID(true);
    console.warn('UID2:', uid2.String());
    console.warn('UID1:', uid1.String());
    console.warn('UID3:', uid3.String());

    console.warn(uid1.Compare(uid1));
    assert.equal(uid1.Compare(uid1), 0);
    console.warn(uid1.Compare(uid2));
    assert.notEqual(uid1.Compare(uid2), 0);
  });
});
