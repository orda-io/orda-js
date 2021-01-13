import { ErrDatatype } from '../../src/errors/datatype';
import { TestLogger } from '../helper';
import * as Assert from 'assert';

describe('Test OrtooError', () => {
  it('Can generate and catch a datatype error with log', async () => {
    try {
      generateError();
    } catch (e) {
      return;
    }
    Assert.fail();
  });
});

function generateError() {
  throw new ErrDatatype.Create(TestLogger);
}
