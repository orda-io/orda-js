import { ErrDatatype } from '@orda/errors/datatype';
import { helper } from '@test/helper/helper';
import { should } from 'chai';

describe('Test OrdaError', () => {
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
