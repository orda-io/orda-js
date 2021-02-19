import { ErrDatatype } from '@ooo/errors/datatype';
import { helper } from '@test/helper';
import { should } from 'chai';

describe('Test OrtooError', () => {
  it('Can generate and catch a datatype error with log', async () => {
    try {
      generateError();
    } catch (e) {
      return;
    }
    should().fail();
  });
});

function generateError() {
  throw new ErrDatatype.Create(helper.L);
}
