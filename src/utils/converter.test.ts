import {ordaLogger} from "@orda/constants/constants";
import {expect} from "chai";
import {commonAtoB, commonBtoA} from "@orda/utils/converter";

describe('Test Converter', () => {
  it('Can use commomBtoA, commonAtoB', () => {
    const data = "hello\n, world !@#$%^&*(){}:\"\'\\/.,<>:[]_+한글";
    ordaLogger.info(data);
    const bData = commonAtoB(data);
    ordaLogger.info(bData);
    const aData = commonBtoA(bData);
    ordaLogger.info(aData);
    expect(data).to.eq(aData);
  });
});
