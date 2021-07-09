import { ordaLogger } from "@ooo/utils/orda_logger";
import { Int64, int64 } from "@ooo/types/integer";
import { ExtMap } from "@ooo/utils/map";
import { expect } from "chai";

describe('Test OooMap', () => {
  it('Can use OooMap.getOrElseSet', () => {
    const oooMap = new ExtMap<string, Int64>();
    oooMap.set('x', int64(1));
    const x = oooMap.getOrElseSet('x', int64(5));
    const y = oooMap.getOrElseSet('y', int64(5));
    ordaLogger.info(x);
    ordaLogger.info(y);
    expect(x.asNumber()).to.equal(1);
    expect(y.asNumber()).to.equal(5);
    oooMap.delete('NOT_EXIST');
  });
});
