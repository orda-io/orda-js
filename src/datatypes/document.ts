import { Datatype, IDatatype } from '@orda/datatypes/datatype';
import { ClientContext, DatatypeContext } from '@orda/context';
import { StateOfDatatype } from '@orda/generated/proto.enum';
import { Wire } from '@orda/datatypes/wired';
import { DatatypeHandlers } from '@orda/handlers/handlers';
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

export interface DocumentTx extends IDatatype {
  putToObject(key: string, value: unknown): Document | undefined;

  removeInObject(key: string): Document | undefined;

  insertToArray(pos: number, ...values: unknown[]): Document;

  updateInArray(pos: number, ...values: unknown[]): Document[];

  deleteInArray(pos: number, numOfNodes?: number): Document[];

  isGarbage(): boolean;

  getTypeOfJSON(): TypeOfJSON;

  getRoot(): Document;

  getParent(): Document | undefined;

  getFromObject(key: string): Document | undefined;

  getFromArray(pos: number): Document;

  getManyFromArray(pos: number, numOfNodes: number): Document[];

  getValue(): unknown;

  equals(other: Document): boolean;
}

export interface Document extends DocumentTx {
  transaction(tag: string, fn: (document: DocumentTx) => boolean): boolean;
}

export class _Document extends Datatype {
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

  equals(other: _Document): boolean {
    return this.root.equals(other.root);
  }

  setSnapshot(snap: string): void {
    this.root.fromJSON(snap);
  }

  toDocument(): Document {
    return new __Document(this, this.root);
  }
}

export class __Document implements Document {
  private readonly current: JSONType;
  private readonly _doc: _Document;

  constructor(base: _Document, current: JSONType) {
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

  getRoot(): Document {
    return this.toDocument(this.current.root!);
  }

  getParent(): Document | undefined {
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

  putToObject(key: string, value: unknown): Document | undefined {
    this.assertLocalOp('putToObject', TypeOfJSON.object, false);
    const ret = this._doc.sentenceLocalInTx(new DocPutInObjOperation(this.current.cTime, key, value));
    return ret ? this.toDocument(ret as JSONType) : undefined;
  }

  removeInObject(key: string): Document | undefined {
    this.assertLocalOp('DeleteInObject', TypeOfJSON.object, false);
    const ret = this._doc.sentenceLocalInTx(new DocRemoveInObjOperation(this.current.cTime, key));
    return ret ? this.toDocument(ret as JSONType) : undefined;
  }

  insertToArray(pos: number, ...values: unknown[]): Document {
    this.assertLocalOp('InsertToArray', TypeOfJSON.array, false);
    const arr = this.current as JSONArray;
    arr.validateInsertPosition(pos, ...values);
    this._doc.sentenceLocalInTx(new DocInsertToArrayOperation(arr.cTime, pos, values));
    return this;
  }

  updateInArray(pos: number, ...values: unknown[]): Document[] {
    this.assertLocalOp('UpdateInArray', TypeOfJSON.array, false);
    const arr = this.current as JSONArray;
    arr.validateGetRange(pos, values.length);
    const ret = this._doc.sentenceLocalInTx(new DocUpdateInArrayOperation(arr.cTime, pos, values));
    return this.toDocuments(<JSONType[]>ret);
  }

  deleteInArray(pos: number, numOfNodes = 1): Document[] {
    this.assertLocalOp('DeleteInArray', TypeOfJSON.array, false);
    const arr = this.current as JSONArray;
    arr.validateGetRange(pos, numOfNodes);
    const ret = this._doc.sentenceLocalInTx(new DocDeleteInArrayOperation(arr.cTime, pos, numOfNodes));
    return this.toDocuments(<JSONType[]>ret);
  }

  transaction(tag: string, txFunc: (document: DocumentTx) => boolean): boolean {
    return this._doc.doTransaction(tag, (txCtx: TransactionContext): boolean => {
      return txFunc(this);
    });
  }

  assertLocalOp(opName: string, ofJSON: TypeOfJSON, workOnGarbage: boolean) {
    if (this.current.type !== ofJSON) {
      throw new ErrDatatype.InvalidParent(this.ctx.L, `${opName} is not allowed`);
    }

    if (!workOnGarbage && this.current.isGarbage()) {
      throw new ErrDatatype.NoOp(this.ctx.L, 'already deleted from the root document');
    }
  }

  private toDocument(child: JSONType): Document {
    return new __Document(this._doc, child);
  }

  private toDocuments(children: JSONType[]): Document[] {
    const docs = new Array<Document>();
    children.forEach((c) => {
      docs.push(this.toDocument(c));
    });
    return docs;
  }

  toJSON(): unknown {
    return this.current.toNoMetaJSON();
  }

  getFromArray(pos: number): Document {
    const ret = this.getManyFromArray(pos, 1);
    return ret[0];
  }

  getManyFromArray(pos: number, numOfNodes: number): Document[] {
    this.assertLocalOp('GetManyFromArray', TypeOfJSON.array, true);
    const arr = this.current as JSONArray;
    arr.validateGetRange(pos, numOfNodes);
    const children = arr.getManyJSONTypes(pos, numOfNodes);
    return this.toDocuments(children);
  }

  getFromObject(key: string): Document | undefined {
    this.assertLocalOp('GetFromObject', TypeOfJSON.object, true);
    const child = (this.current as JSONObject).getJSONTypeByKey(key);
    if (child && !child.isGarbage()) {
      return this.toDocument(child);
    }
    return undefined;
  }

  equals(other: Document): boolean {
    const otherDoc = other as __Document;
    return this._doc.equals(otherDoc._doc);
  }
}
