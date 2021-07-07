import { Suite } from 'mocha';
import { JSONObject, newJSONObject, TypeOfJSON } from '@ooo/datatypes/json';
import { helper } from '@test/helper/helper';
import { Timestamp } from '@ooo/types/timestamp';
import { OperationID } from '@ooo/types/operation';
import { createUID } from '@ooo/types/uid';
import { expect } from 'chai';
import { ErrDatatype } from '@ooo/errors/datatype';
import { DocPutInObjOperation, DocRemoveInObjOperation } from '@ooo/operations/document';

const obj1 = {
  K1: 'hello',
  K2: 1234,
};

const arr1 = ['world', 1234, 3.141592];

const all = {
  K1: 'hello',
  K2: {
    K1: 'hello',
    K2: 1234,
  },
  K3: ['world', 1234, 3.141592],
};

describe('Test basic JSONObject', function (this: Suite): void {
  it('Can put JSONObject', () => {
    const opID = new OperationID(createUID());
    const root = newJSONObject(helper.createDatatypeContext(this), Timestamp.getOldest());

    const ts1 = opID.next().timestamp;
    root.putCommon('K1', 1234, ts1.clone());
    expect(root.getAsJSONElement('K1')!.cTime.hash()).to.eq(ts1.hash());
    helper.L.info(`${ts1.hash()}`);

    const ts2 = opID.next().timestamp;
    root.putCommon('K2', obj1, ts2.clone());
    const k2 = root.getAsJSONObject('K2')!;
    helper.L.info(`${ts2.hash()}`);
    expect(k2.cTime.hash()).to.eq(ts2.hash());
    ts2.getAndNextDelimiter();
    helper.L.info(`${ts2.hash()}`);
    expect(k2.getAsJSONElement('K1')!.cTime.hash()).to.eq(ts2.hash());
    ts2.getAndNextDelimiter();
    helper.L.info(`${ts2.hash()}`);
    expect(k2.getAsJSONElement('K2')!.cTime.hash()).to.eq(ts2.hash());

    const ts3 = opID.next().timestamp;
    root.putCommon('K3', arr1, ts3.clone());
    const k3 = root.getAsJSONArray('K3')!;
    helper.L.info(`${ts3.hash()}`);
    expect(k3.cTime.hash()).to.eq(ts3.hash());
    ts3.getAndNextDelimiter();
    helper.L.info(`${ts3.hash()}`);
    expect(k3.getJSONType(0).cTime.hash()).to.eq(ts3.hash());
    ts3.getAndNextDelimiter();
    helper.L.info(`${ts3.hash()}`);
    expect(k3.getJSONType(1).cTime.hash()).to.eq(ts3.hash());
    ts3.getAndNextDelimiter();
    helper.L.info(`${ts3.hash()}`);
    expect(k3.getJSONType(2).cTime.hash()).to.eq(ts3.hash());

    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    expect(() => {
      root.getAsJSONObject('K1');
    }).to.throw(ErrDatatype.IllegalParameters);

    const child1 = root.getAsJSONElement('K1');

    expect(1234).to.eq(child1?.value);
    expect(TypeOfJSON.object).to.eq(child1?.parent?.type);
    expect(root).to.eq(child1?.parent);

    const child2 = root.getAsJSONObject('K2');
    expect(TypeOfJSON.object).to.eq(child2?.parent?.type);
    expect(root).to.eq(child2?.parent);
    expect(child2).to.eq(child2?.getAsJSONElement('K1')?.parent);
    expect(1234).to.eq(child2?.getAsJSONElement('K2')?.value);

    const child3 = root.getAsJSONArray('K3');
    expect(TypeOfJSON.object).to.eq(child3?.parent?.type);
    expect(root).to.eq(child3?.parent);
    const gChild3 = child3?.getJSONType(2);
    expect(3.141592).to.eq(gChild3?.value);

    const oldChild1 = root.putCommon('K1', arr1, opID.next().timestamp);
    expect(oldChild1).to.eq(child1);
    expect(oldChild1?.isTomb()).to.true;

    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    const clone = jsonObjectEncodingTest(root);
    expect(root.equals(clone)).to.true;
  });

  it('Can update JSONObject', () => {
    const opID = new OperationID(createUID());
    const root = initJSONObjectForTest(this, opID);

    // Replace an existing JSONElement with a new JSONElement.
    // The existing JSONElement will be deleted

    const old1 = root.objPutCommon(new DocPutInObjOperation(root.cTime, 'K1', 'update1').setID(opID.next()));
    expect('update1').to.eq(root.getAsJSONElement('K1')?.value);
    expect(old1).to.not.undefined;
    expect(old1?.isTomb()).to.true;
    expect('hello').to.eq(old1?.value);
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    // Replace an existing JSONObject with a new JSONElement
    const old2 = root.objPutCommon(new DocPutInObjOperation(root.cTime, 'K2', 'update2').setID(opID.next()));
    expect('update2').to.eq(root.getAsJSONElement('K2')?.value);
    expect(old2).to.not.undefined;
    expect(old2?.type).to.eq(TypeOfJSON.object);
    expect(old2?.isTomb()).to.true;
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    // Update an already deleted JSONObject
    // In this case, the operation is applied effectively, but it is not shown in the root document.
    const old3 = root.objPutCommon(new DocPutInObjOperation(old2!.cTime, 'K1', 'update3').setID(opID.next()));
    expect(1234).to.eq((old2 as JSONObject).getAsJSONElement('K2')?.value);
    expect('hello').to.eq(old3?.value);
    expect(old3?.isTomb()).to.true;
    helper.L.info(`${JSON.stringify(old2?.toNoMetaJSON())}`);

    // Replace an existing JSONArray with a new JSONObject
    const old4 = root.objPutCommon(new DocPutInObjOperation(root.cTime, 'K3', obj1).setID(opID.next()));
    expect(old4).to.not.undefined;
    expect(old4?.type).to.eq(TypeOfJSON.array);
    expect(JSON.stringify(obj1)).to.eq(JSON.stringify(root.getAsJSONObject('K3')?.toNoMetaJSON()));
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    const clone = jsonObjectEncodingTest(root);
    expect(root.equals(clone)).to.true;
  });

  it('Can delete JSONObject', () => {
    const opID = new OperationID(createUID());
    const root = initJSONObjectForTest(this, opID);

    expect(() => {
      root.objRemoveLocal(new DocRemoveInObjOperation(root.cTime, 'NOT_EXIST').setID(opID.next()));
    }).to.throw(ErrDatatype.NoOp);

    const old1 = root.objRemoveLocal(new DocRemoveInObjOperation(root.cTime, 'K1').setID(opID.next()));
    expect('hello').to.eq(old1!.value);
    expect(old1!.isTomb()).to.true;
    expect(root.getJSONTypeByKey('K1')).to.undefined;
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    // delete again: it should be ignored.
    expect(() => {
      root.objRemoveLocal(new DocRemoveInObjOperation(root.cTime, 'K1').setID(opID.next()));
    }).to.throw(ErrDatatype.NoOp);

    // remoteDelete
    // const ts1 = opID.next().timestamp;
    const rm1 = new DocRemoveInObjOperation(root.cTime, 'K1').setID(opID.next());
    const old2 = root.objRemoveRemote(rm1);
    expect('hello').to.eq(old2!.value);
    expect(old2!.isTomb()).to.true;
    expect(old2?.dTime?.compare(rm1.timestamp)).to.eq(0);
    expect(root.getJSONTypeByKey('K1')).to.undefined;

    // remoteDelete not exist
    expect(() => {
      root.objRemoveRemote(new DocRemoveInObjOperation(root.cTime, 'NOT_EXIST').setID(opID.next()));
    }).to.throw(ErrDatatype.NoTarget);

    // delete JSONObject
    const rm2 = new DocRemoveInObjOperation(root.cTime, 'K2').setID(opID.next());
    const old3 = root.objRemoveRemote(rm2);
    expect(TypeOfJSON.object).to.eq(old3?.type);
    expect(old3?.isTomb()).to.true;
    expect(old3?.dTime?.compare(rm2.timestamp)).to.eq(0);
    expect(root.getJSONTypeByKey('K2')).to.undefined;
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    // delete a JSONArray
    // const ts3 = opID.next().timestamp;
    const rm3 = new DocRemoveInObjOperation(root.cTime, 'K3').setID(opID.next());
    const old4 = root.objRemoveRemote(rm3);
    expect(TypeOfJSON.array).to.eq(old4?.type);
    expect(old4?.isTomb()).to.true;
    expect(old4?.dTime?.compare(rm3.timestamp)).to.eq(0);
    expect(root.getJSONTypeByKey('K3')).to.undefined;
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    const clone = jsonObjectEncodingTest(root);
    expect(root.equals(clone)).to.true;
  });
});

export function jsonObjectEncodingTest(original: JSONObject): JSONObject {
  const clone = newJSONObject(original.ctx, Timestamp.getOldest());
  const encoded1 = JSON.stringify(original);
  helper.L.info(`JSONObject Encoding Test`);
  helper.L.info(`origin:${encoded1}`);
  clone.fromJSON(encoded1);
  const encoded2 = JSON.stringify(clone);
  helper.L.info(`cloned:${encoded2}`);
  expect(encoded1).to.eq(encoded2);
  expect(JSON.stringify(original.toNoMetaJSON())).to.eq(JSON.stringify(clone.toNoMetaJSON()));
  helper.L.info(`JSON:${JSON.stringify(clone.toNoMetaJSON())}`);
  return clone;
}

function initJSONObjectForTest(suite: Suite, opID: OperationID): JSONObject {
  const root = newJSONObject(helper.createDatatypeContext(suite), Timestamp.getOldest());

  root.putCommon('K1', 'hello', opID.next().timestamp);
  root.putCommon('K2', obj1, opID.next().timestamp);
  root.putCommon('K3', arr1, opID.next().timestamp);

  helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);
  return root;
}
