import { Suite } from 'mocha';
import { helper } from '@test/helper/helper';
import { expect } from 'chai';
import { ErrDatatype } from '@ooo/errors/datatype';
import { TypeOfJSON } from '@ooo/types/datatype';

const obj1 = {
  K1: 'hello',
  K2: 1234,
  K3: true,
};

const arr1 = ['world', 1234, 3.141592, false];

describe('Test local Document operations', function (this: Suite): void {
  it('Can test JSONObject operations', () => {
    const client1 = helper.getLocalClient(helper.ctName(this, 1));
    const root = client1.subscribeOrCreateDocument(helper.dtName(this));

    const old1 = root.putToObject('k1', 'v1');
    expect(old1).to.undefined;
    const old2 = root.putToObject('k1', 'v2');
    expect(old2?.isGarbage()).to.true;
    expect(old2?.getTypeOfJSON()).to.eq(TypeOfJSON.element);
    expect(old2?.getValue()).to.eq('v1');
    helper.L.info(`${JSON.stringify(root)}`);

    const old3 = root.getFromObject('k1');
    expect(old3).to.not.undefined;
    expect(old3?.getTypeOfJSON()).to.eq(TypeOfJSON.element);
    expect(old3?.getValue()).to.eq('v2');

    const old4 = root.getFromObject('NOT_EXIST');
    expect(old4).to.undefined;

    const old5 = root.removeInObject('k1');
    expect(old5).to.not.undefined;
    expect(old5?.isGarbage()).to.true;
    expect(old5?.getValue()).to.eq('v2');
    helper.L.info(`${JSON.stringify(root)}`);

    const old6 = root.getFromObject('k1');
    expect(old6).to.undefined;

    const old7 = root.putToObject('k2', obj1);
    expect(old7).to.undefined;

    helper.L.info(`${JSON.stringify(root)}`);
    const old8 = root.getFromObject('k2');
    if (!old8) {
      expect.fail();
      return;
    }
    expect(old8).to.not.undefined;
    expect(old8.getTypeOfJSON()).to.eq(TypeOfJSON.object);
    helper.L.info(`${JSON.stringify(old8.getValue())}`);

    const old9 = old8.putToObject('K1', 'v3');
    expect(old9?.isGarbage()).to.true;
    expect(old9?.getValue()).to.eq('hello');

    const old10 = root.putToObject('k2', 'v4');
    // put to deleted obj
    expect(() => {
      old10?.putToObject('a1', ['a', 'b', 'c']);
    }).to.throw(ErrDatatype.NoOp);

    expect(`${JSON.stringify(old10)}`).to.not.eq(`${JSON.stringify(root)}`);
    expect(`${JSON.stringify(old10?.getRoot())}`).to.eq(`${JSON.stringify(root)}`);

    expect(() => {
      root.removeInObject('NOT_EXIST');
    }).to.throw(ErrDatatype.NoOp);

    helper.L.info(`${JSON.stringify(root)}`);
  });

  it('Can test JSONArray operations', () => {
    const client1 = helper.getLocalClient(helper.ctName(this, 1));
    const root = client1.subscribeOrCreateDocument(helper.dtName(this));
    const old1 = root.putToObject('K1', arr1);
    expect(old1).to.undefined;

    const a1 = root.getFromObject('K1')!;
    const a2 = a1.insertToArray(0, 'x', 'y');
    expect(a1).to.eq(a2);

    expect(() => {
      a1.insertToArray(100, 'x', 'y');
    }).to.throw(ErrDatatype.IllegalParameters);

    helper.L.info(`${JSON.stringify(root)}`);

    const existing = a1.updateInArray(1, 'Y', 'WORLD');
    expect(existing.length).to.eq(2);
    expect(existing[0].getValue()).to.eq('y');
    expect(existing[1].getValue()).to.eq('world');
    expect(existing[0].isGarbage()).to.true;
    expect(existing[1].isGarbage()).to.true;

    const del1 = a1.deleteInArray(0, 2);
    expect(del1.length).to.eq(2);
    expect(del1[0].getValue()).to.eq('x');
    expect(del1[1].getValue()).to.eq('Y');
    expect(del1[0].isGarbage()).to.true;
    expect(del1[1].isGarbage()).to.true;

    const del2 = a1.deleteInArray(0);
    expect(del2.length).to.eq(1);
    expect(del2[0].getValue()).to.eq('WORLD');
    expect(del2[0].isGarbage()).to.true;

    helper.L.info(`${JSON.stringify(root)}`);

    a1.insertToArray(1, 'A', 'B').insertToArray(3, 'C');
    helper.L.info(`${JSON.stringify(root)}`);
  });
});
