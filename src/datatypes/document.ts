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

  patch(...ops: JSONPatch[]): void;

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
      case TypeOfOperation.DOC_SNAPSHOT:
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

  toDocument(child?: JSONType): OrdaDoc {
    return new _OrdaDoc(this, child ? child : this.root);
  }

  toDocuments(children: JSONType[]): OrdaDoc[] {
    const docs = new Array<OrdaDoc>();
    children.forEach((c) => {
      docs.push(this.toDocument(c));
    });
    return docs;
  }

  getThis(): unknown {
    return this.toDocument();
  }

  putToObject(current: JSONType, key: string, value: unknown): OrdaDoc | undefined {
    this.assertLocalOp(current, 'putToObject', TypeOfJSON.object, false);
    const ret = this.sentenceLocalInTx(new DocPutInObjOperation(current.cTime, key, value));
    return ret ? this.toDocument(ret as JSONType) : undefined;
  }

  removeInObject(current: JSONType, key: string): OrdaDoc | undefined {
    this.assertLocalOp(current, 'DeleteInObject', TypeOfJSON.object, false);
    const ret = this.sentenceLocalInTx(new DocRemoveInObjOperation(current.cTime, key));
    return ret ? this.toDocument(ret as JSONType) : undefined;
  }

  insertToArray(current: JSONType, pos: number, ...values: unknown[]): void {
    this.assertLocalOp(current, 'InsertToArray', TypeOfJSON.array, false);
    const arr = current as JSONArray;
    arr.validateInsertPosition(pos, ...values);
    this.sentenceLocalInTx(new DocInsertToArrayOperation(arr.cTime, pos, values));
  }

  updateInArray(current: JSONType, pos: number, ...values: unknown[]): OrdaDoc[] {
    this.assertLocalOp(current, 'UpdateInArray', TypeOfJSON.array, false);
    const arr = current as JSONArray;
    arr.validateGetRange(pos, values.length);
    const ret = this.sentenceLocalInTx(new DocUpdateInArrayOperation(arr.cTime, pos, values));
    return this.toDocuments(<JSONType[]>ret);
  }

  deleteInArray(current: JSONType, pos: number, numOfNodes = 1): OrdaDoc[] {
    this.assertLocalOp(current, 'DeleteInArray', TypeOfJSON.array, false);
    const arr = current as JSONArray;
    arr.validateGetRange(pos, numOfNodes);
    const ret = this.sentenceLocalInTx(new DocDeleteInArrayOperation(arr.cTime, pos, numOfNodes));
    return this.toDocuments(<JSONType[]>ret);
  }

  getManyFromArray(current: JSONType, pos: number, numOfNodes: number): OrdaDoc[] {
    this.assertLocalOp(current, 'GetManyFromArray', TypeOfJSON.array, true);
    const arr = current as JSONArray;
    arr.validateGetRange(pos, numOfNodes);
    const children = arr.getManyJSONTypes(pos, numOfNodes);
    return this.toDocuments(children);
  }

  getFromObject(current: JSONType, key: string): OrdaDoc | undefined {
    this.assertLocalOp(current, 'GetFromObject', TypeOfJSON.object, true);
    const child = (current as JSONObject).getJSONTypeByKey(key);
    if (child && !child.isGarbage()) {
      return this.toDocument(child);
    }
    return undefined;
  }

  private assertLocalOp(current: JSONType, opName: string, ofJSON: TypeOfJSON, workOnGarbage: boolean) {
    current = current || this.root;
    if (current.type !== ofJSON) {
      throw new ErrDatatype.InvalidParent(this.ctx.L, `${opName} is not allowed`);
    }

    if (!workOnGarbage && current.isGarbage()) {
      throw new ErrDatatype.NoOp(this.ctx.L, 'already deleted from the root document');
    }
  }

  patchEach(current: JSONType, patch: JSONPatch): boolean {
    const [target, key] = this.getTargetFromPatch(current, patch.path);
    // this.ctx.L.info(`target:${target}, key:${key}`);
    if (!target || target.type === TypeOfJSON.element) {
      this.ctx.L.error(`invalid path: ${JSON.stringify(patch)}`);
      return false;
    }

    switch (patch.op) {
      case 'add':
        if (patch.value === undefined) {
          return false;
        }
        if (target.type === TypeOfJSON.object) {
          this.putToObject(target, key, patch.value);
        } else if (target.type === TypeOfJSON.array) {
          this.insertToArray(target, Number(key), patch.value);
        }
        return true;
      case 'remove':
        if (target.type === TypeOfJSON.object) {
          this.removeInObject(target, key);
        } else if (target.type === TypeOfJSON.array) {
          this.deleteInArray(target, Number(key));
        }
        return true;
      case 'replace':
        if (patch.value === undefined) {
          return false;
        }
        if (target.type === TypeOfJSON.object) {
          this.putToObject(target, key, patch.value);
        } else if (target.type === TypeOfJSON.array) {
          this.updateInArray(target, Number(key), patch.value);
        }
        return true;
      default:
        this.ctx.L.error(`unsupported JSONPatch operation: ${patch}`);
        return false;
    }
  }

  private getTargetFromPatch(current: JSONType, path: string): [JSONType | undefined, string] {
    let node: JSONType | undefined = current;
    let paths = path.split('/');
    if (paths.length < 2) {
      return [undefined, ''];
    }
    const key = paths[paths.length - 1];
    paths = paths.slice(1, -1);

    this.ctx.L.debug(`${path} => ${JSON.stringify(paths)}`);
    paths.forEach((k) => {
      if (node) {
        switch (node.type) {
          case TypeOfJSON.element:
            break;
          case TypeOfJSON.object:
            node = (node as JSONObject).getJSONTypeByKey(k);
            break;
          case TypeOfJSON.array:
            node = (node as JSONArray).getJSONType(Number(k));
            break;
        }
      }
    });
    return [node, key];
    //
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
    return this._doc.toDocument();
  }

  getParent(): OrdaDoc | undefined {
    if (this.current.parent) {
      return this._doc.toDocument(this.current.parent);
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
    return this._doc.putToObject(this.current, key, value);
  }

  removeInObject(key: string): OrdaDoc | undefined {
    return this._doc.removeInObject(this.current, key);
  }

  insertToArray(pos: number, ...values: unknown[]): OrdaDoc {
    this._doc.insertToArray(this.current, pos, ...values);
    return this;
  }

  updateInArray(pos: number, ...values: unknown[]): OrdaDoc[] {
    return this._doc.updateInArray(this.current, pos, ...values);
  }

  deleteInArray(pos: number, numOfNodes = 1): OrdaDoc[] {
    return this._doc.deleteInArray(this.current, pos, numOfNodes);
  }

  transaction(tag: string, txFunc: (document: OrdaDocTx) => boolean): boolean {
    return this._doc.doTransaction(tag, (txCtx: TransactionContext): boolean => {
      return txFunc(this);
    });
  }

  toJSON(): unknown {
    return this.current.toNoMetaJSON();
  }

  getFromArray(pos: number): OrdaDoc {
    const ret = this.getManyFromArray(pos, 1);
    return ret[0];
  }

  getManyFromArray(pos: number, numOfNodes: number): OrdaDoc[] {
    return this._doc.getManyFromArray(this.current, pos, numOfNodes);
  }

  getFromObject(key: string): OrdaDoc | undefined {
    return this._doc.getFromObject(this.current, key);
  }

  patch(...patches: JSONPatch[]): void {
    if (patches.length === 1) {
      this._doc.patchEach(this.current, patches[0]);
    } else {
      this.transaction(`patch: ${JSON.stringify(patches)}`, (ordaDocTx): boolean => {
        for (const p of patches) {
          if (!this._doc.patchEach(this.current, p)) {
            return false;
          }
        }
        return true;
      });
    }
  }

  equals(other: OrdaDoc): boolean {
    const otherDoc = other as _OrdaDoc;
    return this._doc.equals(otherDoc._doc);
  }
}

export interface JSONPatch {
  path: string;
  op: string;
  value?: unknown;
  from?: unknown;
}
