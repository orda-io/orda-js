import { UInt32 } from '../../src/types/uInt';
import { TestLogger } from '../helper';

describe('Test Uint types', () => {
  it('Can generate and compare UIDs', () => {
    const val1: UInt32 = new UInt32();
    TestLogger.info(val1);
  });
});
