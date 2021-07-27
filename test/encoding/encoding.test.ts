import { helper } from '@test/helper/helper';
import { testEncodingOperation } from '@test/encoding/sampler';
import { Suite } from 'mocha';
import { convertFromOpenApiOperation } from '@orda/operations/converter';
import { IncreaseOperation } from '@orda/operations/counter';
import { int32 } from '@orda-io/orda-integer';
import { OperationID } from '@orda/types/operation';
import { createUID } from '@orda/types/uid';
import { expect } from 'chai';
import { PutOperation, RemoveOperation } from '@orda/operations/map';
import { Op } from '@orda/operations/operation';
import { _Counter } from '@orda/datatypes/counter';
import { StateOfDatatype, TypeOfDatatype } from '@orda/types/datatype';
import { _OooMap } from '@orda/datatypes/map';
import { Datatype } from '@orda/datatypes/datatype';
import { DeleteOperation, InsertOperation, UpdateOperation } from '@orda/operations/list';
import { Timestamp } from '@orda/types/timestamp';
import { _List } from '@orda/datatypes/list';
import {
  DocDeleteInArrayOperation,
  DocInsertToArrayOperation,
  DocPutInObjOperation,
  DocRemoveInObjOperation,
  DocUpdateInArrayOperation,
} from '@orda/operations/document';
import { _Document } from '@orda/datatypes/document';
import { ErrorOperation, TransactionOperation } from '@orda/operations/meta';
import { ErrDatatype } from '@orda/errors/datatype';

describe('Test encoding operations with server', function (this: Suite): void {
  it('Can encode and decode meta operations', async () => {
    const err = new ErrDatatype.Create();
    const jsOp1 = new ErrorOperation(err.code, err.message);
    await exchangeAndValidateOperation(TypeOfDatatype.COUNTER, jsOp1);

    const jsOp2 = new TransactionOperation('hello world');
    await exchangeAndValidateOperation(TypeOfDatatype.COUNTER, jsOp2);

    const jsOp3 = new TransactionOperation('hi there', 1234);
    await exchangeAndValidateOperation(TypeOfDatatype.COUNTER, jsOp3);
  });

  it('Can encode and decode counter operations', async () => {
    const jsOp1 = new IncreaseOperation(int32(123));
    await exchangeAndValidateOperation(TypeOfDatatype.COUNTER, jsOp1);

    const counter1 = new _Counter(helper.createClientContext(this), helper.dtName(this), StateOfDatatype.DUE_TO_CREATE);
    counter1.increase(1234);
    const snapshot1 = counter1.createSnapshotOperation();
    const snapshot2 = await exchangeAndValidateOperation(TypeOfDatatype.COUNTER, snapshot1);
    const counter2 = new _Counter(helper.createClientContext(this), helper.dtName(this), StateOfDatatype.DUE_TO_CREATE);
    counter2.executeRemoteOp(snapshot2);
    const snapshot3 = counter2.createSnapshotOperation();

    expect(snapshot1.getStringBody()).to.eq(snapshot3.getStringBody());
  });

  it('Can encode and decode map operations', async () => {
    const jsOp1 = new PutOperation('hello', 'world');
    await exchangeAndValidateOperation(TypeOfDatatype.MAP, jsOp1);
    const jsOp2 = new PutOperation('world', 3);
    await exchangeAndValidateOperation(TypeOfDatatype.MAP, jsOp2);
    const jsOp3 = new RemoveOperation('hello');
    await exchangeAndValidateOperation(TypeOfDatatype.MAP, jsOp3);

    const map1 = new _OooMap(helper.createClientContext(this), helper.dtName(this), StateOfDatatype.DUE_TO_CREATE);
    map1.put('k1', 'world');
    map1.put('k2', 123);
    map1.put('k3', 3.1415);
    map1.put('k4', 'remove');
    map1.remove('k4');
    const snapshot1 = map1.createSnapshotOperation();
    const snapshot2 = await exchangeAndValidateOperation(TypeOfDatatype.MAP, snapshot1);

    const map2 = new _OooMap(
      helper.createClientContext(this),
      helper.dtName(this),
      StateOfDatatype.DUE_TO_CREATE
    ) as Datatype;
    map2.executeRemoteOp(snapshot2);
    const snapshot3 = map2.createSnapshotOperation();
    expect(snapshot1.getStringBody()).to.eq(snapshot3.getStringBody());
  });

  it('Can encode and decode list operations', async () => {
    const jsOp1 = new InsertOperation(123, ['hello', 123, 3.1415]);
    jsOp1.body.T = randomTimestamp();
    await exchangeAndValidateOperation(TypeOfDatatype.LIST, jsOp1);

    const jsOp2 = new DeleteOperation(123, 2);
    jsOp2.body.T = [randomTimestamp(), randomTimestamp()];
    await exchangeAndValidateOperation(TypeOfDatatype.LIST, jsOp2);

    const jsOp3 = new UpdateOperation(1234, ['world', true, 123, 3.141592]);
    jsOp3.body.T = [randomTimestamp(), randomTimestamp(), randomTimestamp(), randomTimestamp()];
    await exchangeAndValidateOperation(TypeOfDatatype.LIST, jsOp3);

    const list1 = new _List(helper.createClientContext(this), helper.dtName(this), StateOfDatatype.DUE_TO_CREATE);
    list1.insert(0, 'hello', true, 1024, 3.141592);

    const snapshot1 = list1.createSnapshotOperation();
    const snapshot2 = await exchangeAndValidateOperation(TypeOfDatatype.LIST, snapshot1);

    const list2 = new _List(
      helper.createClientContext(this),
      helper.dtName(this),
      StateOfDatatype.DUE_TO_CREATE
    ) as Datatype;
    list2.executeRemoteOp(snapshot2);
    const snapshot3 = list2.createSnapshotOperation();
    expect(snapshot1.getStringBody()).to.eq(snapshot3.getStringBody());
  });

  it('Can encode and decode document operations', async () => {
    const jsOp1 = new DocPutInObjOperation(randomTimestamp(), 'Orda', 1234);
    await exchangeAndValidateOperation(TypeOfDatatype.DOCUMENT, jsOp1);

    const jsOp2 = new DocRemoveInObjOperation(randomTimestamp(), 'Orda');
    await exchangeAndValidateOperation(TypeOfDatatype.DOCUMENT, jsOp2);

    const jsOp3 = new DocInsertToArrayOperation(randomTimestamp(), 0, [1234, 3.141592, true, 'hello']);
    jsOp3.body.T = randomTimestamp();
    await exchangeAndValidateOperation(TypeOfDatatype.DOCUMENT, jsOp3);

    const jsOp4 = new DocDeleteInArrayOperation(randomTimestamp(), 0, 0);
    jsOp4.body.T = [randomTimestamp(), randomTimestamp(), randomTimestamp()];
    await exchangeAndValidateOperation(TypeOfDatatype.DOCUMENT, jsOp4);

    const jsOp5 = new DocUpdateInArrayOperation(randomTimestamp(), 0, [1234, 3.141592, true, 'hello']);
    jsOp5.body.T = [randomTimestamp(), randomTimestamp(), randomTimestamp(), randomTimestamp()];
    await exchangeAndValidateOperation(TypeOfDatatype.DOCUMENT, jsOp5);

    const doc1 = new _Document(helper.createClientContext(this), helper.dtName(this), StateOfDatatype.DUE_TO_CREATE);
    const _doc1 = doc1.toDocument();
    _doc1.putToObject('K1', 'hello');
    _doc1.putToObject('K2', arr);
    _doc1.putToObject('K3', obj);
    _doc1.getFromObject('K2')?.insertToArray(0, obj);
    _doc1.getFromObject('K3')?.putToObject('K0', arr);
    _doc1.getFromObject('K3')?.removeInObject('K3');
    helper.L.info(`${JSON.stringify(_doc1)}`);
    const snapshot1 = doc1.createSnapshotOperation();
    const snapshot2 = await exchangeAndValidateOperation(TypeOfDatatype.DOCUMENT, snapshot1, false);
    const doc2 = new _Document(helper.createClientContext(this), helper.dtName(this), StateOfDatatype.DUE_TO_CREATE);
    doc2.executeRemoteOp(snapshot2);
    expect(doc1.equals(doc2)).to.true;
  });
});

const arr = ['hello', 1234, 3.141592, true];
const obj = {
  K1: 'hello',
  K2: 1234,
  K3: 3.141592,
  K4: true,
};

function randomTimestamp(): Timestamp {
  return new Timestamp(
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 1000000000),
    createUID(),
    Math.floor(Math.random() * 100)
  );
}

function randomOperationId(): OperationID {
  return new OperationID(
    createUID(),
    123456789101112n + BigInt(Math.floor(Math.random() * 100)),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 1000000)
  );
}

async function exchangeAndValidateOperation(type: TypeOfDatatype, jsOp: Op, comp = true): Promise<Op> {
  jsOp.id = randomOperationId();
  helper.L.info(`[1] send jsOp:${JSON.stringify(jsOp)}`);
  helper.L.info(`[2] send oaOp:${JSON.stringify(jsOp.toOpenApi())}`);
  const oaOp = await testEncodingOperation(type, jsOp.toOpenApi());
  const oaToJsOp = convertFromOpenApiOperation(oaOp);
  helper.L.info(`[3] recv oaOp:${JSON.stringify(oaOp)}`);
  helper.L.info(`[4] recv jsOp:${JSON.stringify(oaToJsOp)}`);
  oaToJsOp.toOpenApi();
  if (comp) {
    expect(jsOp.getStringBody()).to.eq(oaToJsOp.getStringBody());
  }
  return oaToJsOp;
}
