import { Suite } from 'mocha';
import { OperationID } from '@orda/types/operation';
import { createUID } from '@orda/types/uid';
import { JSONArray, JSONObject, newJSONObject } from '@orda/datatypes/json';
import { helper } from '@test/helper/helper';
import { Timestamp } from '@orda/types/timestamp';
import { expect } from 'chai';
import { jsonObjectEncodingTest } from '@test/datatypes/json_object.test';
import {
  DocDeleteInArrayOperation,
  DocInsertToArrayOperation,
  DocPutInObjOperation,
  DocUpdateInArrayOperation,
} from '@orda/operations/document';
import { TypeOfJSON } from '@orda/types/datatype';

const obj1 = {
  K1: 'hello',
  K2: 1234,
  K3: true,
};

const arr1 = ['world', 1234, 3.141592, false];

function initJSONArrayForTest(suite: Suite, opID: OperationID): [JSONObject, JSONArray] {
  const root = newJSONObject(helper.createDatatypeContext(suite), Timestamp.getOldest());
  root.objPutCommon(new DocPutInObjOperation(root.cTime, 'K1', arr1).setID(opID.next()));

  const array = root.getAsJSONArray('K1')!;
  root.arrayInsertLocal(new DocInsertToArrayOperation(array.cTime, 1, [obj1]).setID(opID.next()));
  root.arrayInsertLocal(new DocInsertToArrayOperation(array.cTime, 2, [arr1]).setID(opID.next()));
  helper.L.info(`${JSON.stringify(array.toNoMetaJSON())}`);
  return [root, array];
}

describe('Test basic JSONArray', function (this: Suite): void {
  it('Can insert into JSONArray', () => {
    const opID = new OperationID(createUID());
    const jsonObj = newJSONObject(helper.createDatatypeContext(this), Timestamp.getOldest());
    const arr = new Array<unknown>();

    const oldK1 = jsonObj.objPutCommon(new DocPutInObjOperation(jsonObj.cTime, 'K1', arr).setID(opID.next()));
    expect(oldK1).to.undefined;

    const oldK2 = jsonObj.objPutCommon(new DocPutInObjOperation(jsonObj.cTime, 'K2', arr).setID(opID.next()));
    expect(oldK2).to.undefined;

    helper.L.info(`${JSON.stringify(jsonObj)}`);

    const k1 = jsonObj.getAsJSONArray('K1');
    expect(k1).to.not.undefined;
    const k2 = jsonObj.getAsJSONArray('K2');
    expect(k2).to.not.undefined;

    const ts1 = opID.next().timestamp;
    const ts2 = opID.next().timestamp;
    const values1 = ['x', 'y'];
    const values2 = ['a', 'b'];
    const a1 = jsonObj.insertRemoteInArray(k1!.cTime, Timestamp.getOldest(), ts2, values1);
    expect(a1).to.eq(k1);
    const a2 = jsonObj.insertRemoteInArray(k1!.cTime, Timestamp.getOldest(), ts1, values2);
    expect(a2).to.eq(k1);

    const x = k1?.getJSONType(0);
    const y = k1?.getJSONType(1);
    expect(x?.parent).to.eq(y?.parent).to.eq(k1);
    expect(x?.type).to.eq(y?.type).eq(TypeOfJSON.element);

    const a3 = jsonObj.insertRemoteInArray(k2!.cTime, Timestamp.getOldest(), ts1, values2);
    expect(a3).to.eq(k2);
    const a4 = jsonObj.insertRemoteInArray(k2!.cTime, Timestamp.getOldest(), ts2, values1);
    expect(a4).to.eq(k2);

    helper.L.info(`${JSON.stringify(jsonObj.toNoMetaJSON())}`);

    expect(JSON.stringify(k1?.toNoMetaJSON())).to.eq(JSON.stringify(k2?.toNoMetaJSON()));
    jsonObjectEncodingTest(jsonObj);
  });

  it('Can delete locally into JSONArray', () => {
    const opID = new OperationID(createUID());
    const [root, array] = initJSONArrayForTest(this, opID);

    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);
    expect('world').to.eq(array.getJSONType(0).value);

    const jt1 = root.arrayDeleteLocal(new DocDeleteInArrayOperation(array.cTime, 0, 1).setID(opID.next()));
    expect(1).to.eq(jt1.length);
    expect(true).to.eq(jt1[0].isTomb());
    expect('world').to.eq(jt1[0].value);
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    const jt2 = root.arrayDeleteLocal(new DocDeleteInArrayOperation(array.cTime, 1, 2).setID(opID.next()));
    expect(2).to.eq(jt2.length);
    expect(true).to.eq(jt2[0].isTomb());
    expect(true).to.eq(jt2[1].isTomb());
    expect(1234).to.eq(jt2[1].value);
    expect(TypeOfJSON.array).to.eq(jt2[0].type);
    expect(TypeOfJSON.element).to.eq(jt2[1].type);
    expect(1).to.eq(root.mapSnapshot.size);
    expect(3).to.eq(array.listSnapshot.size);

    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    jsonObjectEncodingTest(array.parent as JSONObject);
  });

  it('Can delete remotely into JSONArray', () => {
    const opID = new OperationID(createUID());
    const [root, array] = initJSONArrayForTest(this, opID);

    const e1 = array.getJSONType(0);
    const e2 = array.getJSONType(1);
    const e3 = array.getJSONType(2);
    expect(e1.value).to.eq('world');
    expect(JSON.stringify(e2.toNoMetaJSON())).to.eq(JSON.stringify(obj1));
    expect(JSON.stringify(e3.toNoMetaJSON())).to.eq(JSON.stringify(arr1));

    // delete not exist
    const tsNotExist = new Timestamp(0, 0, createUID(), 0);
    const op1 = new DocDeleteInArrayOperation(array.cTime, 0, 0).setID(opID.next());
    op1.body.T = [tsNotExist];
    const [dels1, errs1] = root.arrayDeleteRemote(op1);
    expect(dels1.length).to.eq(0);
    expect(errs1.length).to.eq(1);
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    // delete e1, e2, e3
    const op2 = new DocDeleteInArrayOperation(array.cTime, 1, 0).setID(opID.next());
    op2.body.T = [e1.cTime, e2.cTime, e3.cTime];
    const [dels2, errs2] = root.arrayDeleteRemote(op2);
    expect(dels2.length).to.eq(3);
    expect(errs2.length).to.eq(0);
    expect(dels2[0].isTomb()).to.eq(dels2[1].isTomb()).to.eq(dels2[2].isTomb()).to.true;
    expect(e1.dTime!.delimiter.asNumber()).to.eq(0);
    expect(e2.dTime!.delimiter.asNumber()).to.eq(1);
    expect(e3.dTime!.delimiter.asNumber()).to.eq(2);
    expect(e1.dTime!.lamport.asNumber())
      .to.eq(e2.dTime!.lamport.asNumber())
      .to.eq(e3.dTime!.lamport.asNumber())
      .to.eq(op2.timestamp.lamport.asNumber());
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    // delete e1, e2, e3 with newer opID
    const op3 = new DocDeleteInArrayOperation(array.cTime, 2, 0).setID(opID.next());
    op3.body.T = [e1.cTime, e2.cTime, e3.cTime];
    const [dels3, errs3] = root.arrayDeleteRemote(op3);
    expect(dels3.length).to.eq(3);
    expect(errs3.length).to.eq(0);
    expect(e1.dTime!.lamport.asNumber())
      .to.eq(e2.dTime!.lamport.asNumber())
      .to.eq(e3.dTime!.lamport.asNumber())
      .to.eq(op3.timestamp.lamport.asNumber());
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    // delete e1, e2, e3 with older opID
    const op4 = new DocDeleteInArrayOperation(array.cTime, 0, 0).setID(op1.id);
    op4.body.T = [e1.cTime, e2.cTime, e3.cTime];
    const [dels4, errs4] = root.arrayDeleteRemote(op4);
    expect(dels4.length).to.eq(3);
    expect(errs4.length).to.eq(0);
    expect(e1.dTime!.lamport.asNumber())
      .to.eq(e2.dTime!.lamport.asNumber())
      .to.eq(e3.dTime!.lamport.asNumber())
      .to.eq(op3.timestamp.lamport.asNumber()); // op3's
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    const op5 = new DocInsertToArrayOperation(array.cTime, 0, ['E1']).setID(opID.next());
    op5.body.T = e2.cTime;
    const ins = root.arrayInsertRemote(op5);
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);
    jsonObjectEncodingTest(root);
  });

  it('Can update locally into JSONArray', () => {
    const opID = new OperationID(createUID());
    const [root, array] = initJSONArrayForTest(this, opID);
    const e1 = array.getJSONType(0);
    const e2 = array.getJSONType(1);
    const e3 = array.getJSONType(2);

    const op1 = new DocUpdateInArrayOperation(array.cTime, 0, ['U1', 'U2', 'U3']).setID(opID.next());
    const oldJts = root.arrayUpdateLocal(op1);
    expect(op1.body.T.length).to.eq(3);
    expect(op1.body.T[0].hash()).to.eq(e1.cTime.hash());
    expect(op1.body.T[1].hash()).to.eq(e2.cTime.hash());
    expect(op1.body.T[2].hash()).to.eq(e3.cTime.hash());
    expect(oldJts[0]).to.eq(e1);
    expect(oldJts[1]).to.eq(e2);
    expect(oldJts[2]).to.eq(e3);
    expect(root.common.cemetery.size).to.eq(2); // JSONElement is not in cemetery
    expect(e1.isTomb()).to.eq(e2.isTomb()).to.eq(e3.isTomb()).to.true;
    jsonObjectEncodingTest(root);
  });

  it('Can update remotely into JSONArray', () => {
    const opID1 = new OperationID(createUID());
    const opID2 = new OperationID(createUID());
    opID1.next().next();
    const [root, array] = initJSONArrayForTest(this, opID1);

    const e1 = array.getJSONType(0);
    const e2 = array.getJSONType(1);
    const e3 = array.getJSONType(2);

    // update with older timestamp
    const op1 = new DocUpdateInArrayOperation(array.cTime, 0, [obj1]).setID(opID2.next());
    op1.body.T = [e1.cTime];
    const [oldJts1, errs1] = root.arrayUpdateRemote(op1); //array.cTime, ts1.clone(), [e1.cTime], [obj1]);
    expect(oldJts1.length).to.eq(1);
    expect(errs1.length).to.eq(0);
    expect(oldJts1[0]).to.not.eq(e1);
    expect(e1.isTomb()).to.false;
    expect(array.getJSONType(0).value).to.eq('world');
    expect(root.common.cemetery.size).to.eq(1);
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    // update with newer timestamp
    const op2 = new DocUpdateInArrayOperation(array.cTime, 1, ['u1']).setID(opID1.next());
    op2.body.T = [e1.cTime];
    const [oldJts2, errs2] = root.arrayUpdateRemote(op2);
    expect(oldJts2.length).to.eq(1);
    expect(errs2.length).to.eq(0);
    expect(oldJts2[0]).to.eq(e1);
    expect(e1.isTomb()).to.true;
    expect(e1.dTime?.compare(op2.timestamp)).to.eq(0);
    const u1 = array.getJSONType(0);
    expect(u1.value).to.eq('u1');
    expect(u1.isTomb()).to.false;
    expect(root.common.cemetery.size).to.eq(1); // not change
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    // should find the already updated one with e1.cTime
    const op3 = new DocUpdateInArrayOperation(array.cTime, 2, ['u2']).setID(opID1.next());
    op3.body.T = [e1.cTime];
    const [oldJts3, errs3] = root.arrayUpdateRemote(op3);
    expect(u1).to.eq(oldJts3[0]);
    expect(u1.isTomb()).to.true;
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    // delete the first one
    const op4 = new DocDeleteInArrayOperation(array.cTime, 3, 1).setID(opID1.next());
    op4.body.T = [e1.cTime];
    const [dels1, errs4] = root.arrayDeleteRemote(op4);
    expect(errs4.length).to.eq(0);
    expect(dels1[0].value).to.eq('u2');
    expect(dels1[0].isTomb()).to.true;
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    // update the deleted one
    const op5 = new DocUpdateInArrayOperation(array.cTime, 4, ['u3']).setID(opID1.next());
    op5.body.T = [e1.cTime];
    const [oldJts4, errs5] = root.arrayUpdateRemote(op5);
    expect(errs5.length).to.eq(0);
    expect(oldJts4.length).to.eq(1);
    expect(oldJts4[0].value).to.eq('u3');

    // update two
    const op6 = new DocUpdateInArrayOperation(array.cTime, 5, ['u4', 'u5']).setID(opID1.next());
    const ts4 = opID1.timestamp.clone();
    op6.body.T = [e2.cTime, e3.cTime];
    const [oldJts5, errs6] = root.arrayUpdateRemote(op6);
    expect(errs6.length).to.eq(0);
    expect(oldJts5.length).to.eq(2);
    expect(oldJts5[0]).to.eq(e2);
    expect(oldJts5[1]).to.eq(e3);
    expect(oldJts5[0].isTomb()).to.true;
    expect(oldJts5[1].isTomb()).to.true;
    expect(ts4.getAndNextDelimiter().compare(oldJts5[0].dTime!)).to.eq(0);
    expect(ts4.getAndNextDelimiter().compare(oldJts5[1].dTime!)).to.eq(0);
    helper.L.info(`${JSON.stringify(root.toNoMetaJSON())}`);

    // update not exists
    const op7 = new DocUpdateInArrayOperation(array.cTime, 6, ['x1', 'x2']).setID(opID1.next());
    op7.body.T = [opID2.next().timestamp, opID2.next().timestamp];
    const [oldJts6, errs7] = root.arrayUpdateRemote(op7);
    expect(errs7.length).to.eq(2);
    expect(oldJts6.length).to.eq(0);

    jsonObjectEncodingTest(root);
  });
});
