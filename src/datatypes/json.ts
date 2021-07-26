import { OooMapSnapshot } from '@ooo/datatypes/map';
import { DatatypeContext } from '@ooo/context';
import { Timestamp } from '@ooo/types/timestamp';
import { Snapshot } from '@ooo/datatypes/snapshot';
import { ErrDatatype } from '@ooo/errors/datatype';
import { ListSnapshot } from '@ooo/datatypes/list';
import { TimedType } from '@ooo/datatypes/timed';
import { OrderedNode, OrderedType } from '@ooo/datatypes/ordered';
import { OrdaError } from '@ooo/errors/error';
import {
  DocDeleteInArrayOperation,
  DocInsertToArrayOperation,
  DocPutInObjOperation,
  DocRemoveInObjOperation,
  DocUpdateInArrayOperation,
} from '@ooo/operations/document';
import { TypeOfJSON } from '@ooo/types/datatype';

type TypeOfJSONForMarshal = 'E' | 'O' | 'A';

type MarshaledOrderedType = [Timestamp, Timestamp | undefined];

class MarshaledDocument {
  nm: MarshaledJSONType[];

  constructor() {
    this.nm = new Array<MarshaledJSONType>();
  }

  static fromJSON(unmarshaled: any, assistant: UnmarshalAssistant): MarshaledDocument {
    const doc = new MarshaledDocument();
    unmarshaled.nm.forEach((mjt: any) => {
      doc.nm.push(MarshaledJSONType.fromJSON(mjt, assistant));
    });
    return doc;
  }
}

class MarshaledJSONType {
  t: TypeOfJSONForMarshal;
  p?: Timestamp;
  c: Timestamp;
  d?: Timestamp;
  e?: unknown;
  a?: MarshaledJSONArray;
  o?: MarshaledJSONObject;

  constructor(cTs: Timestamp, type: TypeOfJSONForMarshal) {
    this.c = cTs;
    this.t = type;
  }

  static fromJSON(json: any, assistant: UnmarshalAssistant): MarshaledJSONType {
    const cTs = assistant.tsFromJSON(json.c);
    const type = json.t;
    const mjt = new MarshaledJSONType(cTs!, type);

    mjt.p = assistant.tsFromJSON(json.p);
    mjt.d = assistant.tsFromJSON(json.d);
    mjt.e = json.e;
    mjt.a = MarshaledJSONArray.fromJSON(json.a, assistant);
    mjt.o = MarshaledJSONObject.fromJSON(json.o, assistant);
    return mjt;
  }

  static unmarshal(mjt: MarshaledJSONType, assist: UnmarshalAssistant): JSONType {
    switch (mjt.t) {
      case 'E':
        const je = new JSONElement(assist.common, mjt.e, mjt.c);
        je.D = mjt.d;
        return je;
      case 'O':
        const jo = new JSONObject(assist.common, mjt.c);
        jo.D = mjt.d;
        return jo;
      case 'A':
        const ja = new JSONArray(assist.common, mjt.c);
        ja.D = mjt.d;
        return ja;
    }
  }
}

class MarshaledJSONArray {
  n: MarshaledOrderedType[];
  s: number;

  constructor(listSnapshot?: ListSnapshot) {
    this.n = new Array<MarshaledOrderedType>();
    this.s = 0;
    if (listSnapshot) {
      this.s = listSnapshot.size;
      let ot = listSnapshot.head.next;
      while (ot) {
        const jt: JSONType = <JSONType>ot.timedType;
        this.n.push([ot.orderedTime, ot.orderedTime === jt.cTime ? undefined : jt.cTime]);
        ot = ot.next;
      }
    }
  }

  static fromJSON(marshaled: any, assistant: UnmarshalAssistant): MarshaledJSONArray | undefined {
    if (!marshaled) {
      return undefined;
    }
    const mja = new MarshaledJSONArray();
    mja.s = marshaled.s;
    marshaled.n.forEach((mot: any[]) => {
      const tuple: MarshaledOrderedType = [assistant.tsFromJSON(mot[0])!, assistant.tsFromJSON(mot[1])];
      mja.n.push(tuple);
    });
    return mja;
  }
}

class MarshaledJSONObject {
  m: any;
  s: number;

  constructor(mapSnap?: OooMapSnapshot) {
    this.m = {};
    this.s = 0;
    if (mapSnap) {
      mapSnap.map.forEach((v, k) => {
        const jt = v as JSONType;
        this.m[k] = jt.cTime;
      });
      this.s = mapSnap.size;
    }
  }

  static fromJSON(marshaled: any, assistant: UnmarshalAssistant): MarshaledJSONObject | undefined {
    if (!marshaled) {
      return undefined;
    }
    const jo = new MarshaledJSONObject();
    jo.s = marshaled.s;

    for (const key in marshaled.m) {
      const ts = assistant.tsFromJSON(marshaled.m[key]);
      if (ts) {
        jo.m[key] = ts;
      }
    }
    return jo;
  }
}

class UnmarshalAssistant {
  tsMap: Map<string, Timestamp>;
  common: JSONCommon;

  constructor(root: JSONObject) {
    this.tsMap = new Map<string, Timestamp>();
    this.common = new JSONCommon(root.ctx, root);
  }

  unifyingTS(ts: Timestamp): Timestamp {
    const existing = this.tsMap.get(ts.hash());
    if (existing) {
      return existing;
    }
    this.tsMap.set(ts.hash(), ts);
    return ts;
  }

  tsFromJSON(json?: any): Timestamp | undefined {
    if (!json) {
      return undefined;
    }
    const ts = Timestamp.fromJSON(json);
    return this.unifyingTS(ts);
  }
}

export class JSONCommon {
  ctx: DatatypeContext;
  root?: JSONObject;
  nodeMap: Map<string, JSONType>;
  cemetery: Map<string, JSONType>;

  constructor(ctx: DatatypeContext, root?: JSONObject) {
    this.ctx = ctx;
    this.root = root;
    this.nodeMap = new Map<string, JSONType>();
    this.cemetery = new Map<string, JSONType>();
  }
}

export interface JSONType extends TimedType, Snapshot {
  type: TypeOfJSON;
  common: JSONCommon;

  root?: JSONObject;
  parent?: JSONType;

  cTime: Timestamp;

  dTime?: Timestamp;

  isTomb(): boolean;

  isGarbage(): boolean;

  marshal(): MarshaledJSONType;

  unmarshal(marshaled: MarshaledJSONType, assistant: UnmarshalAssistant): void;

  toNoMetaJSON(): unknown;

  addToNodeMap(primitive: JSONType): void;

  objPutCommon(op: DocPutInObjOperation): JSONType | undefined;

  objRemoveLocal(op: DocRemoveInObjOperation): JSONType | undefined;

  objRemoveRemote(op: DocRemoveInObjOperation): JSONType | undefined;

  arrayInsertLocal(op: DocInsertToArrayOperation): JSONType;

  arrayInsertRemote(op: DocInsertToArrayOperation): JSONType;

  arrayDeleteLocal(op: DocDeleteInArrayOperation): JSONType[];

  arrayDeleteRemote(op: DocDeleteInArrayOperation): [JSONType[], OrdaError[]];

  arrayUpdateLocal(op: DocUpdateInArrayOperation): JSONType[];

  arrayUpdateRemote(op: DocUpdateInArrayOperation): [JSONType[], OrdaError[]];
}

export function newJSONObject(ctx: DatatypeContext, ts: Timestamp, parent?: JSONType): JSONObject {
  const common = parent !== undefined ? parent.common : new JSONCommon(ctx);
  const jsonObj = new JSONObject(common, ts);
  if (!parent) {
    jsonObj.root = jsonObj;
  }
  return jsonObj;
}

abstract class JSONPrimitive implements JSONType {
  common: JSONCommon;
  parent?: JSONType;
  C: Timestamp;
  D?: Timestamp;

  protected constructor(common: JSONCommon, ts: Timestamp, parent?: JSONType) {
    this.common = common;
    this.parent = parent;
    this.C = ts;
  }

  equals(o: JSONType): boolean {
    if (this.type !== o.type) {
      return false;
    }
    if (!Timestamp.equals(this.cTime, o.cTime)) {
      return false;
    }
    if (!Timestamp.equals(this.dTime, o.dTime)) {
      return false;
    }
    if (!this.parent && !o.parent) {
      return true;
    }
    return !!(this.parent && o.parent && Timestamp.equals(this.parent!.cTime, o.parent!.cTime));
  }

  get time(): Timestamp {
    if (this.D) {
      return this.D;
    }
    return this.C;
  }

  set time(ts: Timestamp) {
    this.D = ts;
  }

  get value(): unknown {
    return undefined;
  }

  get ctx(): DatatypeContext {
    return this.common.ctx;
  }

  isTomb(): boolean {
    return this.D !== undefined;
  }

  makeTomb(ts: Timestamp): void {
    if (this.D) {
      const tomb = this.common.cemetery.get(this.D.hash());
      if (tomb) {
        this.common.cemetery.delete(this.D.hash());
        this.common.cemetery.set(ts.hash(), tomb);
      }
    }
    this.D = ts.clone();
  }

  funeral(j: JSONType, ts: Timestamp) {
    j.makeTomb(ts);
    if (j.type === TypeOfJSON.element) {
      this.removeFromNodeMap(j);
    } else {
      this.addToCemetery(j);
    }
  }

  abstract get type(): TypeOfJSON;

  get cTime(): Timestamp {
    return this.C;
  }

  get dTime(): Timestamp | undefined {
    return this.D;
  }

  get root(): JSONObject | undefined {
    return this.common.root;
  }

  set root(r: JSONObject | undefined) {
    this.common.root = r;
    if (r) {
      this.common.nodeMap.set(r.cTime.hash(), r);
    }
  }

  abstract marshal(): MarshaledJSONType;

  marshalPrimitive(type: TypeOfJSONForMarshal): MarshaledJSONType {
    const mjt = new MarshaledJSONType(this.C, type);
    mjt.d = this.D;
    mjt.p = this.parent ? this.parent.cTime : undefined;
    return mjt;
  }

  abstract unmarshal(marshaled: MarshaledJSONType, assistant: UnmarshalAssistant): void;

  abstract toNoMetaJSON(): unknown;

  toJSON(): unknown {
    return this.root?.toJSON();
  }

  fromJSON(json: string): void {
    this.root?.fromJSON(json);
  }

  addToNodeMap(primitive: JSONType): void {
    this.common.nodeMap.set(primitive.cTime.hash(), primitive);
  }

  removeFromNodeMap(primitive: JSONType) {
    this.common.nodeMap.delete(primitive.cTime.hash());
  }

  addToCemetery(primitive: JSONType) {
    this.common.cemetery.set(primitive.dTime!.hash(), primitive);
  }

  isGarbage(): boolean {
    let p: JSONType | undefined = this;
    while (p) {
      if (p.isTomb()) {
        return true;
      }
      p = p.parent;
    }
    return false;
  }

  protected createJSONType(parent: JSONType, value: unknown, ts: Timestamp): JSONType {
    switch (typeof value) {
      case 'object':
        if (Array.isArray(value)) {
          return this.createJSONArray(parent, value, ts);
        } else {
          return this.createJSONObject(parent, value, ts);
        }
      default:
        return new JSONElement(parent.common, value, ts.getAndNextDelimiter(), parent);
    }
  }

  protected createJSONObject(parent: JSONType, value: any, ts: Timestamp): JSONObject {
    const jo = new JSONObject(parent.common, ts.getAndNextDelimiter(), parent);
    for (const key in value) {
      this.addToJSONObject(jo, key, value[key], ts);
    }
    return jo;
  }

  protected createJSONArray(parent: JSONType, value: unknown, ts: Timestamp): JSONArray {
    const arr = new JSONArray(parent.common, ts.getAndNextDelimiter(), parent);
    const valArray = value as unknown[];
    const timedTypes: TimedType[] = new Array<TimedType>();
    for (const val of valArray) {
      timedTypes.push(this.createJSONType(arr, val, ts));
    }
    if (timedTypes.length > 0) {
      arr.listSnapshot.insertLocalWithTimedTypes(0, timedTypes);
      for (const tt of timedTypes) {
        this.addToNodeMap(<JSONType>tt);
      }
    }
    return arr;
  }

  private addToJSONObject(jo: JSONObject, key: string, value: unknown, ts: Timestamp) {
    const jt = this.createJSONType(jo, value, ts);
    jo.mapSnapshot.putCommonWithTimedType(key, jt);
    this.addToNodeMap(jt);
  }

  protected findJSONType(ts: Timestamp): JSONType | undefined {
    return this.common.nodeMap.get(ts.hash());
  }

  insertRemoteInArray(parent: Timestamp, target: Timestamp, ts: Timestamp, values: unknown[]): JSONArray {
    const parentArray = this.findJSONType(parent);
    if (parentArray && parentArray.type === TypeOfJSON.array) {
      const jaArr = parentArray as JSONArray;
      jaArr.insertCommon(-1, ts, values, target);
      return jaArr;
    }
    throw new ErrDatatype.InvalidParent(this.ctx.L, parent.toString());
  }

  objPutCommon(op: DocPutInObjOperation): JSONType | undefined {
    const parent = this.findJSONType(op.body.P) as JSONObject;
    if (!parent || parent.type !== TypeOfJSON.object) {
      throw new ErrDatatype.InvalidParent(this.common.ctx.L, op.body.P.toString());
    }

    return parent.putCommon(op.body.K, op.body.V, op.timestamp);
  }

  objRemoveLocal(op: DocRemoveInObjOperation): JSONType | undefined {
    const parent = this.findJSONType(op.body.P) as JSONObject;
    if (!parent || parent.type !== TypeOfJSON.object) {
      throw new ErrDatatype.InvalidParent(this.common.ctx.L, op.body.P.toString());
    }
    return parent.deleteCommon(op.body.K, op.timestamp, true);
  }

  objRemoveRemote(op: DocRemoveInObjOperation): JSONType | undefined {
    const parent = this.findJSONType(op.body.P) as JSONObject;
    if (!parent || parent.type !== TypeOfJSON.object) {
      throw new ErrDatatype.InvalidParent(this.ctx.L, op.body.P.toString());
    }
    return parent.deleteCommon(op.body.K, op.timestamp, false);
  }

  arrayInsertLocal(op: DocInsertToArrayOperation): JSONArray {
    const parent = this.findJSONType(op.body.P) as JSONArray;
    if (!parent || parent.type !== TypeOfJSON.array) {
      throw new ErrDatatype.InvalidParent(this.ctx.L, op.body.P.toString());
    }
    op.body.T = parent.insertCommon(op.pos, op.timestamp, op.body.V);
    return parent;
  }

  arrayInsertRemote(op: DocInsertToArrayOperation): JSONArray {
    const parent = this.findJSONType(op.body.P) as JSONArray;
    if (!parent || parent.type !== TypeOfJSON.array) {
      throw new ErrDatatype.InvalidParent(this.ctx.L, op.body.P.toString());
    }
    parent.insertCommon(-1, op.timestamp, op.body.V, op.body.T);
    return parent;
  }

  arrayDeleteLocal(op: DocDeleteInArrayOperation): JSONType[] {
    const parent = this.findJSONType(op.body.P) as JSONArray;
    if (!parent || parent.type !== TypeOfJSON.array) {
      throw new ErrDatatype.InvalidParent(this.ctx.L, op.body.P.toString());
    }
    const orderedTypes: OrderedType[] = parent.listSnapshot.deleteLocal(op.pos, op.numOfNodes, op.timestamp)[0];
    const ret = new Array<JSONType>();
    orderedTypes.forEach((ot) => {
      op.body.T.push(ot.orderedTime);
      ret.push(ot.timedType as JSONType);
    });
    return ret;
  }

  arrayDeleteRemote(op: DocDeleteInArrayOperation): [JSONType[], OrdaError[]] {
    const parent = this.findJSONType(op.body.P) as JSONArray;
    if (!parent || parent.type !== TypeOfJSON.array) {
      throw new ErrDatatype.InvalidParent(this.ctx.L, op.body.P.toString());
    }
    return parent.deleteRemote(op.body.T, op.timestamp);
  }

  arrayUpdateLocal(op: DocUpdateInArrayOperation): JSONType[] {
    const parent = this.findJSONType(op.body.P) as JSONArray;
    if (!parent || parent.type !== TypeOfJSON.array) {
      throw new ErrDatatype.InvalidParent(this.ctx.L, op.body.P.toString());
    }
    const ret = parent.updateLocal(op.pos, op.timestamp, op.body.V);
    op.body.T = ret[0];
    return ret[1];
  }

  arrayUpdateRemote(op: DocUpdateInArrayOperation): [JSONType[], OrdaError[]] {
    const parent = this.findJSONType(op.body.P) as JSONArray;
    if (!parent || parent.type !== TypeOfJSON.array) {
      throw new ErrDatatype.InvalidParent(this.ctx.L, op.body.P.toString());
    }
    return parent.updateRemote(op.timestamp, op.body.T, op.body.V);
  }
}

export class JSONObject extends JSONPrimitive implements Snapshot {
  mapSnapshot: OooMapSnapshot;

  constructor(common: JSONCommon, ts: Timestamp, parent?: JSONType) {
    super(common, ts, parent);
    this.mapSnapshot = new OooMapSnapshot(common.ctx);
  }

  get type(): TypeOfJSON {
    return TypeOfJSON.object;
  }

  get value(): unknown {
    return this.toJSON();
  }

  putCommon(key: string, value: unknown, ts: Timestamp): JSONType | undefined {
    const newChild = this.createJSONType(this, value, ts);
    this.addToNodeMap(newChild);
    const removed = this.mapSnapshot.putCommonWithTimedType(key, newChild);

    if (removed) {
      const removedJSON = <JSONType>removed;
      this.funeral(removedJSON, ts);
      return removedJSON;
    }
    return;
  }

  deleteCommon(key: string, ts: Timestamp, isLocal: boolean): JSONType | undefined {
    let deleted: JSONType;
    if (isLocal) {
      const tuple = this.mapSnapshot.removeLocalWithTimedType(key, ts);
      if (!tuple) {
        return undefined;
      }
      deleted = <JSONType>tuple[0];
    } else {
      deleted = <JSONType>this.mapSnapshot.removeRemoteWithTimedType(key, ts);
    }

    this.addToCemetery(deleted);
    return deleted;
  }

  fromJSON(json: string): void {
    const assistant = new UnmarshalAssistant(this);
    const parsed = JSON.parse(json);
    const forUnmarshal = MarshaledDocument.fromJSON(parsed, assistant);

    const oldestTs = Timestamp.getOldest();
    forUnmarshal.nm.forEach((v: MarshaledJSONType) => {
      const jt = MarshaledJSONType.unmarshal(v, assistant);
      if (jt.cTime.compare(oldestTs) === 0) {
        this.common = assistant.common;
        this.parent = undefined;
        this.C = jt.cTime;
        this.D = jt.dTime;
        this.addToNodeMap(this);
      } else {
        jt.addToNodeMap(jt);
      }
    });

    forUnmarshal.nm.forEach((marshaled: MarshaledJSONType) => {
      const jt = this.findJSONType(marshaled.c);
      if (jt) {
        if (marshaled.p) {
          jt.parent = this.findJSONType(marshaled.p);
        }
        jt.unmarshal(marshaled, assistant);
      }
    });
  }

  toJSON(): MarshaledDocument {
    const marshalDoc = new MarshaledDocument();
    this.common.nodeMap.forEach((v) => {
      marshalDoc.nm.push(v.marshal());
    });

    return marshalDoc;
  }

  marshal(): MarshaledJSONType {
    const forMarshal = this.marshalPrimitive('O');
    forMarshal.o = new MarshaledJSONObject(this.mapSnapshot);
    return forMarshal;
  }

  unmarshal(marshaled: MarshaledJSONType, assistant: UnmarshalAssistant): void {
    if (!marshaled.o) {
      throw new ErrDatatype.Marshal(this.ctx.L, undefined, 'not MarshaledJSONObject');
    }
    const marshaledJO = marshaled.o;
    this.mapSnapshot = new OooMapSnapshot(this.ctx);
    for (const k in marshaledJO.m) {
      const realJt = this.findJSONType(marshaledJO.m[k]);
      if (realJt) {
        this.mapSnapshot.map.set(k, realJt);
      }
    }
    this.mapSnapshot.size = marshaledJO.s;
  }

  toNoMetaJSON(): unknown {
    const encoded: any = {};
    this.mapSnapshot.map.forEach((v, k) => {
      if (v && !v.isTomb()) {
        encoded[k] = (v as JSONType).toNoMetaJSON();
      }
    });
    return encoded;
  }

  getJSONTypeByKey(key: string): JSONType | undefined {
    const timedType = this.mapSnapshot.map.get(key);
    if (timedType && !timedType.isTomb()) {
      return <JSONType>timedType;
    }
  }

  getAsJSONElement(key: string): JSONElement | undefined {
    const jsonType = this.getJSONTypeByKey(key);
    if (!jsonType) {
      return;
    }
    if (jsonType.type === TypeOfJSON.element) {
      return <JSONElement>jsonType;
    }
    throw new ErrDatatype.IllegalParameters(
      this.ctx.L,
      `invalid type: expect ${TypeOfJSON.element}, but ${jsonType.type}`
    );
  }

  getAsJSONObject(key: string): JSONObject | undefined {
    const jsonType = this.getJSONTypeByKey(key);
    if (!jsonType) {
      return;
    }
    if (jsonType.type === TypeOfJSON.object) {
      return <JSONObject>jsonType;
    }
    throw new ErrDatatype.IllegalParameters(
      this.ctx.L,
      `invalid type: expect ${TypeOfJSON.object}, but ${jsonType.type}`
    );
  }

  getAsJSONArray(key: string): JSONArray | undefined {
    const jsonType = this.getJSONTypeByKey(key);
    if (!jsonType) {
      return;
    }
    if (jsonType.type === TypeOfJSON.array) {
      return <JSONArray>jsonType;
    }
    throw new ErrDatatype.IllegalParameters(
      this.ctx.L,
      `invalid type: expect ${TypeOfJSON.array}, but ${jsonType.type}`
    );
  }

  equals(o: JSONType): boolean {
    if (!super.equals(o)) {
      return false;
    }
    const oJo = o as JSONObject;
    if (this.mapSnapshot.size !== oJo.mapSnapshot.size) {
      return false;
    }
    for (const [k, v1] of this.mapSnapshot.map) {
      const v2 = oJo.mapSnapshot.map.get(k);
      if (v1 && v2) {
        const jV1 = <JSONType>v1;
        const jV2 = <JSONType>v2;
        if (!jV1.equals(jV2)) {
          return false;
        }
      }
    }
    return true;
  }
}

export class JSONElement extends JSONPrimitive {
  V: unknown;

  constructor(common: JSONCommon, value: unknown, ts: Timestamp, parent?: JSONType) {
    super(common, ts, parent);
    this.V = value;
  }

  get type(): TypeOfJSON {
    return TypeOfJSON.element;
  }

  get value(): unknown {
    return this.V;
  }

  marshal(): MarshaledJSONType {
    const forMarshal = this.marshalPrimitive('E');
    forMarshal.e = this.V;
    return forMarshal;
  }

  unmarshal(marshaled: MarshaledJSONType, assistant: UnmarshalAssistant): void {
    this.V = marshaled.e;
  }

  toNoMetaJSON(): unknown {
    return this.V;
  }

  equals(o: JSONType): boolean {
    if (!super.equals(o)) {
      return false;
    }
    if (this.value !== o.value) {
      return false;
    }
    return true;
  }
}

export class JSONArray extends JSONPrimitive {
  listSnapshot: ListSnapshot;

  constructor(common: JSONCommon, ts: Timestamp, parent?: JSONType) {
    super(common, ts, parent);
    this.listSnapshot = new ListSnapshot(common.ctx);
  }

  getManyJSONTypes(pos: number, numOfNodes: number): JSONType[] {
    return this.listSnapshot.findManyTimedTypes(pos, numOfNodes) as JSONType[];
  }

  getJSONType(pos: number): JSONType {
    return <JSONType>this.listSnapshot.findOrderedType(pos).timedType;
  }

  validateInsertPosition(pos: number, ...values: unknown[]): void {
    if (pos < 0) {
      throw new ErrDatatype.IllegalParameters(this.ctx.L, 'negative position');
    }
    if (values.length === 0) {
      throw new ErrDatatype.IllegalParameters(this.ctx.L, 'no values');
    }
    if (pos >= this.listSnapshot.size) {
      throw new ErrDatatype.IllegalParameters(this.ctx.L, 'out of bound index');
    }
  }

  validateGetRange(pos: number, numOfNodes: number): void {
    if (pos < 0) {
      throw new ErrDatatype.IllegalParameters(this.ctx.L, 'negative position');
    }
    if (numOfNodes < 1) {
      throw new ErrDatatype.IllegalParameters(this.ctx.L, 'numOfNodes should be positive');
    }
    if (this.listSnapshot.size - 1 < pos || pos + numOfNodes > this.listSnapshot.size) {
      throw new ErrDatatype.IllegalParameters(this.ctx.L, 'out of bound index');
    }
  }

  get type(): TypeOfJSON {
    return TypeOfJSON.array;
  }

  marshal(): MarshaledJSONType {
    const forMarshal = this.marshalPrimitive('A');
    forMarshal.a = new MarshaledJSONArray(this.listSnapshot);
    return forMarshal;
  }

  unmarshal(marshaled: MarshaledJSONType, assistant: UnmarshalAssistant): void {
    if (!marshaled.a) {
      throw new ErrDatatype.Marshal(this.ctx.L, undefined, 'not MarshaledJSONArray');
    }
    const marshalJA = marshaled.a;
    this.listSnapshot = new ListSnapshot(this.ctx);
    let prev = this.listSnapshot.head;
    marshalJA.n.forEach((marshaledOt: MarshaledOrderedType) => {
      const oTs = marshaledOt[0];
      const cTs = marshaledOt[1] ? marshaledOt[1] : oTs;
      const jt = this.findJSONType(cTs);
      if (!jt) {
        throw new ErrDatatype.Marshal(this.ctx.L, undefined, 'invalid MarshaledJSONObject');
      }
      const node = new OrderedNode(oTs, jt);
      this.listSnapshot.map.set(node.orderedTime.hash(), node);
      prev.insertNext(node);
      prev = node;
    });
    this.listSnapshot.size = marshalJA.s;
  }

  toNoMetaJSON(): unknown {
    const list = new Array<unknown>();
    let node = this.listSnapshot.head.getNextLive();
    while (node) {
      list.push((node.timedType as JSONType).toNoMetaJSON());
      node = node.getNextLive();
    }
    return list;
  }

  insertCommon(pos: number, ts: Timestamp, values: unknown[], target?: Timestamp): Timestamp {
    const inserted = new Array<TimedType>();
    for (const value of values) {
      const ins = this.createJSONType(this, value, ts);
      inserted.push(ins);
      this.addToNodeMap(ins);
    }

    if (target) {
      return this.listSnapshot.insertRemoteWithTimedTypes(target, inserted);
    }
    return this.listSnapshot.insertLocalWithTimedTypes(pos, inserted);
  }

  deleteRemote(targets: Timestamp[], ts: Timestamp): [JSONType[], OrdaError[]] {
    const [deleted, errors] = this.listSnapshot.deleteRemote(targets, ts) as [JSONType[], OrdaError[]];
    deleted.forEach((jt) => {
      this.addToCemetery(jt);
    });
    return [deleted, errors];
  }

  updateLocal(pos: number, ts: Timestamp, values: unknown[]): [Timestamp[], JSONType[]] {
    const updatedTargets = new Array<Timestamp>();
    const oldJSONTypes = new Array<JSONType>();
    let target = this.listSnapshot.findOrderedType(pos);
    values.forEach((v) => {
      const oldJt = target.timedType as JSONType;
      updatedTargets.push(target.orderedTime);
      const newJt = this.createJSONType(this, v, ts);
      target.timedType = newJt;
      this.addToNodeMap(newJt);
      this.funeral(oldJt, newJt.time);
      oldJSONTypes.push(oldJt);
      const next = target.getNextLive();
      if (!next) {
        throw new ErrDatatype.NoTarget(this.ctx.L);
      }
      target = next;
    });
    return [updatedTargets, oldJSONTypes];
  }

  updateRemote(ts: Timestamp, targets: Timestamp[], values: unknown[]): [JSONType[], OrdaError[]] {
    const errs = new Array<OrdaError>();
    const jsonTypes = new Array<JSONType>();
    for (let i = 0; i < targets.length; i++) {
      const target = this.listSnapshot.map.get(targets[i].hash());
      let deleted, updated: JSONType;
      if (!target) {
        errs.push(new ErrDatatype.NoTarget(this.ctx.L, targets[i].hash()));
        continue;
      }
      const newJt = this.createJSONType(this, values[i], ts);
      this.addToNodeMap(newJt);
      const oldJt = target.timedType as JSONType;
      if (!oldJt.isTomb()) {
        if (oldJt.time.compare(newJt.cTime) < 0) {
          target.timedType = newJt;
          deleted = oldJt;
          updated = newJt;
        } else {
          deleted = newJt;
          updated = oldJt;
        }
      } else {
        deleted = newJt;
        updated = oldJt;
      }
      this.funeral(deleted, updated.cTime);
      jsonTypes.push(deleted);
    }
    return [jsonTypes, errs];
  }

  equals(o: JSONType): boolean {
    if (!super.equals(o)) {
      return false;
    }
    const oJa = <JSONArray>o;
    if (this.listSnapshot.size !== oJa.listSnapshot.size) {
      return false;
    }
    for (const [k, ot1] of this.listSnapshot.map) {
      const ot2 = oJa.listSnapshot.map.get(k);
      if ((ot1 && !ot2) || (!ot1 && ot2)) {
        return false;
      }
      if (!OrderedNode.equal(ot1, ot2)) {
        return false;
      }
      if (ot1 && ot2) {
        const tt1 = ot1.timedType;
        const tt2 = ot2.timedType;
        if (!tt1.equals(tt2)) {
          return false;
        }
      }
    }
    return true;
  }
}
