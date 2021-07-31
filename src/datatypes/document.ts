import { Datatype, OrdaDatatype } from '@orda/datatypes/datatype';
import { ClientContext, DatatypeContext } from '@orda/context';
import { StateOfDatatype } from '@orda/generated/proto.enum';
import { Wire } from '@orda/datatypes/wired';
import { DatatypeHandlers } from '@orda/handlers/datatype';
import { Timestamp } from '@orda/types/timestamp';
import { TypeOfOperation } from '@orda/types/operation';
import { Op } from '@orda/operations/operation';
import { TypeOfDatatype, TypeOfJSON } from '@orda/types/datatype';
import { Snapshot } from '@orda/datatypes/snapshot';
import { ErrDatatype } from '@orda/errors/datatype';
import {
  DocDeleteInArrayOperation,
  DocInsertToArrayOperation,
  DocPutInObjOperation,
  DocRemoveInObjOperation,
  DocUpdateInArrayOperation,
} from '@orda/operations/document';
import { TransactionContext } from '@orda/datatypes/tansaction';
import { JSONArray, JSONObject, JSONType, newJSONObject } from '@orda/datatypes/json';

export interface OrdaDocTx extends OrdaDatatype {
  putToObject(key: string, value: unknown): OrdaDoc | undefined;

  removeInObject(key: string): OrdaDoc | undefined;

  insertToArray(pos: number, ...values: unknown[]): OrdaDoc;

  updateInArray(pos: number, ...values: unknown[]): OrdaDoc[];

  deleteInArray(pos: number, numOfNodes?: number): OrdaDoc[];

  isGarbage(): boolean;

  getTypeOfJSON(): TypeOfJSON;

  getRoot(): OrdaDoc;

  getParent(): OrdaDoc | undefined;

  getFromObject(key: string): OrdaDoc | undefined;

  getFromArray(pos: number): OrdaDoc;

  getManyFromArray(pos: number, numOfNodes: number): OrdaDoc[];

  getValue(): unknown;

  equals(other: OrdaDoc): boolean;
}

export interface OrdaDoc extends OrdaDocTx {
  transaction(tag: string, fn: (document: OrdaDocTx) => boolean): boolean;
}

export class __OrdaDoc extends Datatype {
  private readonly root: JSONObject;

  constructor(ctx: ClientContext, key: string, state: StateOfDatatype, wire?: Wire, handlers?: DatatypeHandlers) {
    super(ctx, key, TypeOfDatatype.DOCUMENT, state, wire, handlers);
    this.root = newJSONObject(this.ctx, Timestamp.getOldest());
    this.resetRollbackContext();
  }

  executeLocalOp(op: Op): unknown {
    switch (op.type) {
      case TypeOfOperation.DOC_OBJ_PUT:
        return this.root.objPutCommon(<DocPutInObjOperation>op);
      case TypeOfOperation.DOC_OBJ_RMV:
        return this.root.objRemoveLocal(<DocRemoveInObjOperation>op);
      case TypeOfOperation.DOC_ARR_INS:
        return this.root.arrayInsertLocal(<DocInsertToArrayOperation>op);
      case TypeOfOperation.DOC_ARR_DEL:
        return this.root.arrayDeleteLocal(<DocDeleteInArrayOperation>op);
      case TypeOfOperation.DOC_ARR_UPD:
        return this.root.arrayUpdateLocal(<DocUpdateInArrayOperation>op);
    }
    return undefined;
  }

  executeRemoteOp(op: Op): unknown {
    switch (op.type) {
      case TypeOfOperation.SNAPSHOT:
        this.root.fromJSON(op.getStringBody());
        return;
      case TypeOfOperation.DOC_OBJ_PUT:
        return this.root.objPutCommon(<DocPutInObjOperation>op);
      case TypeOfOperation.DOC_OBJ_RMV:
        return this.root.objRemoveRemote(<DocRemoveInObjOperation>op);
      case TypeOfOperation.DOC_ARR_INS:
        return this.root.arrayInsertRemote(<DocInsertToArrayOperation>op);
      case TypeOfOperation.DOC_ARR_DEL:
        return this.root.arrayDeleteRemote(<DocDeleteInArrayOperation>op);
      case TypeOfOperation.DOC_ARR_UPD:
        return this.root.arrayUpdateRemote(<DocUpdateInArrayOperation>op);
    }
    return undefined;
  }

  getSnapshot(): Snapshot {
    return this.root;
  }

  equals(other: __OrdaDoc): boolean {
    return this.root.equals(other.root);
  }

  setSnapshot(snap: string): void {
    this.root.fromJSON(snap);
  }

  toDocument(): OrdaDoc {
    return new _OrdaDoc(this, this.root);
  }

  getThis(): unknown {
    return this.toDocument();
  }
}

export class _OrdaDoc implements OrdaDoc {
  private readonly current: JSONType;
  private readonly _doc: __OrdaDoc;

  constructor(base: __OrdaDoc, current: JSONType) {
    this._doc = base;
    this.current = current;
  }

  get key(): string {
    return this._doc.key;
  }

  get type(): TypeOfDatatype {
    return this._doc.type;
  }

  get state(): StateOfDatatype {
    return this._doc.state;
  }

  get ctx(): DatatypeContext {
    return this._doc.ctx;
  }

  async sync(): Promise<void> {
    return this._doc.sync();
  }

  getValue(): unknown {
    return this.current.toNoMetaJSON();
  }

  getRoot(): OrdaDoc {
    return this.toDocument(this.current.root!);
  }

  getParent(): OrdaDoc | undefined {
    if (this.current.parent) {
      return this.toDocument(this.current.parent);
    }
    return undefined;
  }

  getTypeOfJSON(): TypeOfJSON {
    return this.current.type;
  }

  isGarbage(): boolean {
    return this.current.isGarbage();
  }

  putToObject(key: string, value: unknown): OrdaDoc | undefined {
    this.assertLocalOp('putToObject', TypeOfJSON.object, false);
    const ret = this._doc.sentenceLocalInTx(new DocPutInObjOperation(this.current.cTime, key, value));
    return ret ? this.toDocument(ret as JSONType) : undefined;
  }

  removeInObject(key: string): OrdaDoc | undefined {
    this.assertLocalOp('DeleteInObject', TypeOfJSON.object, false);
    const ret = this._doc.sentenceLocalInTx(new DocRemoveInObjOperation(this.current.cTime, key));
    return ret ? this.toDocument(ret as JSONType) : undefined;
  }

  insertToArray(pos: number, ...values: unknown[]): OrdaDoc {
    this.assertLocalOp('InsertToArray', TypeOfJSON.array, false);
    const arr = this.current as JSONArray;
    arr.validateInsertPosition(pos, ...values);
    this._doc.sentenceLocalInTx(new DocInsertToArrayOperation(arr.cTime, pos, values));
    return this;
  }

  updateInArray(pos: number, ...values: unknown[]): OrdaDoc[] {
    this.assertLocalOp('UpdateInArray', TypeOfJSON.array, false);
    const arr = this.current as JSONArray;
    arr.validateGetRange(pos, values.length);
    const ret = this._doc.sentenceLocalInTx(new DocUpdateInArrayOperation(arr.cTime, pos, values));
    return this.toDocuments(<JSONType[]>ret);
  }

  deleteInArray(pos: number, numOfNodes = 1): OrdaDoc[] {
    this.assertLocalOp('DeleteInArray', TypeOfJSON.array, false);
    const arr = this.current as JSONArray;
    arr.validateGetRange(pos, numOfNodes);
    const ret = this._doc.sentenceLocalInTx(new DocDeleteInArrayOperation(arr.cTime, pos, numOfNodes));
    return this.toDocuments(<JSONType[]>ret);
  }

  transaction(tag: string, txFunc: (document: OrdaDocTx) => boolean): boolean {
    return this._doc.doTransaction(tag, (txCtx: TransactionContext): boolean => {
      return txFunc(this);
    });
  }

  private assertLocalOp(opName: string, ofJSON: TypeOfJSON, workOnGarbage: boolean) {
    if (this.current.type !== ofJSON) {
      throw new ErrDatatype.InvalidParent(this.ctx.L, `${opName} is not allowed`);
    }

    if (!workOnGarbage && this.current.isGarbage()) {
      throw new ErrDatatype.NoOp(this.ctx.L, 'already deleted from the root document');
    }
  }

  private toDocument(child: JSONType): OrdaDoc {
    return new _OrdaDoc(this._doc, child);
  }

  private toDocuments(children: JSONType[]): OrdaDoc[] {
    const docs = new Array<OrdaDoc>();
    children.forEach((c) => {
      docs.push(this.toDocument(c));
    });
    return docs;
  }

  toJSON(): unknown {
    return this.current.toNoMetaJSON();
  }

  getFromArray(pos: number): OrdaDoc {
    const ret = this.getManyFromArray(pos, 1);
    return ret[0];
  }

  getManyFromArray(pos: number, numOfNodes: number): OrdaDoc[] {
    this.assertLocalOp('GetManyFromArray', TypeOfJSON.array, true);
    const arr = this.current as JSONArray;
    arr.validateGetRange(pos, numOfNodes);
    const children = arr.getManyJSONTypes(pos, numOfNodes);
    return this.toDocuments(children);
  }

  getFromObject(key: string): OrdaDoc | undefined {
    this.assertLocalOp('GetFromObject', TypeOfJSON.object, true);
    const child = (this.current as JSONObject).getJSONTypeByKey(key);
    if (child && !child.isGarbage()) {
      return this.toDocument(child);
    }
    return undefined;
  }

  equals(other: OrdaDoc): boolean {
    const otherDoc = other as _OrdaDoc;
    return this._doc.equals(otherDoc._doc);
  }
}
