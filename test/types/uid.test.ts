import { assert } from 'chai';
import { UID } from '@ooo/types/uid';
import { helper } from '@test/helper';

describe('Test UID', () => {
  it('Can generate and compare UIDs', () => {
    const uid1 = new UID();
    const uid2 = new UID();
    const uid3 = new UID(true);

    helper.L.info('UID1:{}', uid1.toString());
    helper.L.info('UID2:{}', uid2.toString());
    helper.L.info('UID3:{}', uid3.toString());
    helper.L.info('{}', uid1.compare(uid1));
    helper.L.info('{} {}', uid1.compare(uid1), 0);
    helper.L.info('{}', uid1.compare(uid2));
    assert.notEqual(uid1.compare(uid2), 0);
  });
});
