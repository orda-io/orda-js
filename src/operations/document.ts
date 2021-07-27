import { Op } from '@orda/operations/operation';
import { Timestamp } from '@orda/types/timestamp';
import { TypeOfOperation } from '@orda/types/operation';
import { OrdaLogger } from '@orda-io/orda-logger';
import { ErrDatatype } from '@orda/errors/datatype';

class docPutInObjBody {
  P: Timestamp;
  K: string;
  V: unknown;

  constructor(p: Timestamp, k: string, v: unknown) {
    this.P = p;
    this.K = k;
    this.V = v;
  }
}

export class DocPutInObjOperation extends Op {
  body: docPutInObjBody;

  constructor(parent: Timestamp, key: string, value: unknown) {
    super(TypeOfOperation.DOC_OBJ_PUT);
    this.body = new docPutInObjBody(parent, key, value);
  }

  static fromOpenApi(body: string, logger?: OrdaLogger): DocPutInObjOperation {
    try {
      const snap = JSON.parse(body);
      return new DocPutInObjOperation(Timestamp.fromJSON(snap.P), snap.K, snap.V);
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
  }
}

class docDeleteInObjBody {
  P: Timestamp;
  K: string;

  constructor(p: Timestamp, k: string) {
    this.P = p;
    this.K = k;
  }
}

export class DocRemoveInObjOperation extends Op {
  body: docDeleteInObjBody;

  constructor(parent: Timestamp, key: string) {
    super(TypeOfOperation.DOC_OBJ_RMV);
    this.body = new docDeleteInObjBody(parent, key);
  }

  static fromOpenApi(body: string, logger?: OrdaLogger): DocRemoveInObjOperation {
    try {
      const snap = JSON.parse(body);
      return new DocRemoveInObjOperation(Timestamp.fromJSON(snap.P), snap.K);
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
  }
}

class docInsertToArrayBody {
  P: Timestamp;
  T?: Timestamp;
  V: unknown[];

  constructor(parent: Timestamp, values: unknown[]) {
    this.P = parent;
    this.V = values;
  }
}

export class DocInsertToArrayOperation extends Op {
  body: docInsertToArrayBody;
  pos: number;

  constructor(parent: Timestamp, pos: number, values: unknown[]) {
    super(TypeOfOperation.DOC_ARR_INS);
    this.body = new docInsertToArrayBody(parent, values);
    this.pos = pos;
  }

  static fromOpenApi(body: string, logger?: OrdaLogger): DocInsertToArrayOperation {
    try {
      const snap = JSON.parse(body);
      const ins = new DocInsertToArrayOperation(Timestamp.fromJSON(snap.P), 0, snap.V);
      ins.body.T = Timestamp.fromJSON(snap.T);
      return ins;
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
  }
}

class docUpdateInArrayBody {
  P: Timestamp;
  T: Timestamp[];
  V: unknown[];

  constructor(parent: Timestamp, values: unknown[]) {
    this.P = parent;
    this.T = new Array<Timestamp>();
    this.V = values;
  }
}

export class DocUpdateInArrayOperation extends Op {
  body: docUpdateInArrayBody;
  pos: number;

  constructor(parent: Timestamp, pos: number, values: unknown[]) {
    super(TypeOfOperation.DOC_ARR_UPD);
    this.body = new docUpdateInArrayBody(parent, values);
    this.pos = pos;
  }

  static fromOpenApi(body: string, logger?: OrdaLogger): DocUpdateInArrayOperation {
    try {
      const snap = JSON.parse(body);
      const update = new DocUpdateInArrayOperation(Timestamp.fromJSON(snap.P), 0, snap.V);
      snap.T.forEach((ts: any) => {
        update.body.T.push(Timestamp.fromJSON(ts));
      });
      return update;
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
  }
}

class docDeleteInArrayBody {
  P: Timestamp;
  T: Timestamp[];

  constructor(parent: Timestamp) {
    this.P = parent;
    this.T = new Array<Timestamp>();
  }
}

export class DocDeleteInArrayOperation extends Op {
  body: docDeleteInArrayBody;
  pos: number;
  numOfNodes: number;

  constructor(parent: Timestamp, pos: number, numOfNodes: number) {
    super(TypeOfOperation.DOC_ARR_DEL);
    this.pos = pos;
    this.numOfNodes = numOfNodes;
    this.body = new docDeleteInArrayBody(parent);
  }

  static fromOpenApi(body: string, logger?: OrdaLogger): DocDeleteInArrayOperation {
    try {
      const snap = JSON.parse(body);
      const del = new DocDeleteInArrayOperation(Timestamp.fromJSON(snap.P), 0, 0);
      snap.T.forEach((ts: any) => {
        del.body.T.push(Timestamp.fromJSON(ts));
      });
      return del;
    } catch (e) {
      throw new ErrDatatype.Marshal(logger, e);
    }
  }
}
