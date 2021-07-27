import { helper } from '@test/helper/helper';
import { createNullUID, createUID, strcmp } from '@orda/types/uid';
import { assert } from 'chai';

describe('Test UID', () => {
  it('Can generate and compare UIDs', () => {
    const uid1 = createUID();
    const uid2 = createUID();
    const uid3 = createNullUID();

    helper.L.info('UID1:', uid1.toString());
    helper.L.info('UID2:', uid2.toString());
    helper.L.info('UID3:', uid3.toString());
    helper.L.info(uid1.localeCompare(uid1));
    helper.L.info(uid1.localeCompare(uid1), 0);
    helper.L.info(uid1.localeCompare(uid2));
    assert.notEqual(uid1.localeCompare(uid2), 0);
  });

  it('Can compare string uid in the same ways', () => {
    const uid1 = '123abc';
    const uid2 = 'abc123';
    const uid3 = 'ABC123';
    const uid4 = 'abc1234';
    helper.L.info(strcmp(uid1, uid1));
    helper.L.info(strcmp(uid1, uid2));
    helper.L.info(strcmp(uid2, uid3));
    helper.L.info(strcmp(uid2, uid4));
    helper.L.info(uid1 > uid2);
    helper.L.info(uid2 > uid3);
    helper.L.info(uid2 > uid4);
    assert.isTrue(strcmp(uid1, uid1) === 0);
    assert.isTrue(strcmp(uid1, uid2) === -1);
    assert.isTrue(strcmp(uid2, uid3) === 1);
    assert.isTrue(strcmp(uid2, uid4) === -1);
  });
});
