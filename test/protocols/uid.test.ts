import { assert } from 'chai';
import { UID } from '../../src/protocols/uid';
import { TestLogger } from '../helper';

describe('Test UID', () => {
  it('Can generate and compare UIDs', () => {
    const uid1 = new UID();
    const uid2 = new UID();
    const uid3 = new UID(true);

    TestLogger.info('UID1:{}', uid1.String());
    TestLogger.info('UID2:{}', uid2.String());
    TestLogger.info('UID3:{}', uid3.String());
    TestLogger.info('{}', uid1.Compare(uid1));
    TestLogger.info('{} {}', uid1.Compare(uid1), 0);
    TestLogger.info('{}', uid1.Compare(uid2));
    assert.notEqual(uid1.Compare(uid2), 0);
  });
});
