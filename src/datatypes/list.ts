import { Datatype, IDatatype } from '@orda/datatypes/datatype';
import { Snapshot } from '@orda/datatypes/snapshot';
import { ClientContext, DatatypeContext } from '@orda/context';
import { StateOfDatatype } from '@orda/generated/proto.enum';
import { Wire } from '@orda/datatypes/wired';
import { DatatypeHandlers } from '@orda/handlers/datatype';
import { TypeOfDatatype } from '@orda/types/datatype';
import { Op } from '@orda/operations/operation';
import { TypeOfOperation } from '@orda/types/operation';
import { createNullOrderedNode, OrderedNode, OrderedType } from '@orda/datatypes/ordered';
import { Timestamp } from '@orda/types/timestamp';
import { DeleteOperation, InsertOperation, UpdateOperation } from '@orda/operations/list';
import { TimedNode, TimedType } from '@orda/datatypes/timed';
import { ErrDatatype } from '@orda/errors/datatype';
import { SnapshotOperation } from '@orda/operations/meta';
import { OrdaError } from '@orda/errors/error';
import { TransactionContext } from '@orda/datatypes/tansaction';

export interface OrdaListTx extends IDatatype {
  insert(pos: number, ...values: unknown[]): void;

  get(pos: number): unknown;

  getMany(pos: number, numOfNodes: number): unknown[];

  delete(pos: number): unknown;

  deleteMany(pos: number, numOfNodes: number): unknown[];

  update(pos: number, ...values: unknown[]): unknown[];

  size(): number;
}

export interface OrdaList extends OrdaListTx {
  transaction(tag: string, fn: (list: OrdaListTx) => boolean): boolean;
}

export class _OrdaList extends Datatype implements OrdaList {
  private readonly snap: OrdaListSnapshot;

  constructor(ctx: ClientContext, key: string, state: StateOfDatatype, wire?: Wire, handlers?: DatatypeHandlers) {
    super(ctx, key, TypeOfDatatype.LIST, state, wire, handlers);
    this.snap = new OrdaListSnapshot(this.ctx);
    this.resetRollbackContext();
  }

  delete(pos: number): unknown {
    return this.deleteMany(pos, 1)[0];
  }

  deleteMany(pos: number, numOfNodes: number): unknown[] {
    this.snap.validateGetRange(pos, numOfNodes);
    return this.sentenceLocalInTx(new DeleteOperation(pos, numOfNodes)) as unknown[];
  }

  executeLocalOp(op: Op): unknown {
    switch (op.type) {
      case TypeOfOperation.LIST_INSERT:
        return this.snap.insertLocal(<InsertOperation>op);
      case TypeOfOperation.LIST_UPDATE:
        return this.snap.updateLocalForList(<UpdateOperation>op);
      case TypeOfOperation.LIST_DELETE:
        return this.snap.deleteLocalForList(<DeleteOperation>op);
    }
    return undefined;
  }

  executeRemoteOp(op: Op): unknown {
    switch (op.type) {
      case TypeOfOperation.SNAPSHOT: {
        const sop = op as SnapshotOperation;
        this.snap.fromJSON(sop.getStringBody());
        return;
      }
      case TypeOfOperation.LIST_INSERT:
        this.snap.insertRemote(<InsertOperation>op);
        return;
      case TypeOfOperation.LIST_UPDATE:
        this.snap.updateRemote(<UpdateOperation>op);
        return;
      case TypeOfOperation.LIST_DELETE:
        this.snap.deleteRemoteForList(<DeleteOperation>op);
        return;
    }
    return undefined;
  }

  get(pos: number): unknown {
    this.snap.validateGetPosition(pos);
    return this.snap.findValue(pos);
  }

  getMany(pos: number, numOfNodes: number): unknown[] {
    this.snap.validateGetRange(pos, numOfNodes);
    return this.snap.findManyValues(pos, numOfNodes);
  }

  getSnapshot(): Snapshot {
    return this.snap;
  }

  setSnapshot(snap: string): void {
    this.snap.fromJSON(snap);
  }

  insert(pos: number, ...values: unknown[]): void {
    this.snap.validateInsertPosition(pos);
    this.sentenceLocalInTx(new InsertOperation(pos, values));
  }

  size(): number {
    return this.snap.size;
  }

  transaction(tag: string, txFunc: (list: OrdaListTx) => boolean): boolean {
    return this.doTransaction(tag, (txCtx: TransactionContext): boolean => {
      return txFunc(this);
    });
  }

  update(pos: number, ...values: unknown[]): unknown[] {
    this.snap.validateGetRange(pos, values.length);
    return this.sentenceLocalInTx(new UpdateOperation(pos, values)) as unknown[];
  }

  toJSON(): unknown {
    return this.snap.toNoMetaJSON();
  }
}

export class OrdaListSnapshot implements Snapshot {
  ctx: DatatypeContext;
  head: OrderedType;
  size: number;
  map: Map<string, OrderedType>;

  constructor(ctx: DatatypeContext) {
    this.ctx = ctx;
    this.head = createNullOrderedNode();
    this.map = new Map<string, OrderedType>();
    this.map.set(this.head.hash(), this.head);
    this.size = 0;
  }

  insertLocal(op: InsertOperation): unknown[] {
    const ts = op.timestamp;
    const tts = new Array<TimedNode>();
    for (const v of op.body.V) {
      tts.push(new TimedNode(v, ts.getAndNextDelimiter()));
    }
    op.body.T = this.insertLocalWithTimedTypes(op.pos, tts);
    return op.body.V;
  }

  insertLocalWithTimedTypes(pos: number, tts: TimedType[]): Timestamp {
    let target = this.findOrderedTypeForInsert(pos);
    const targetTs: Timestamp = target.orderedTime;
    tts.forEach((tt) => {
      const newNode = new OrderedNode(tt.time, tt);
      target.insertNext(newNode);
      this.map.set(newNode.hash(), newNode);
      this.size++;
      target = newNode;
    });
    return targetTs;
  }

  insertRemote(op: InsertOperation): void {
    const target = op.body.T;
    const values = op.body.V;
    const ts = op.id.timestamp;
    const tts: TimedType[] = new Array<TimedType>();
    for (const v of values) {
      tts.push(new TimedNode(v, ts.getAndNextDelimiter()));
    }
    this.insertRemoteWithTimedTypes(target, tts);
  }

  insertRemoteWithTimedTypes(targetTs: Timestamp, tts: TimedType[]): Timestamp {
    let target = this.map.get(targetTs.hash());
    if (target) {
      for (const tt of tts) {
        let nextTarget = target.next;
        while (nextTarget && target && nextTarget.orderedTime.compare(tt.time) > 0) {
          target = target.next;
          nextTarget = nextTarget.next;
        }

        if (!target) {
          break;
        }
        const newNode = new OrderedNode(tt.time, tt);
        target.insertNext(newNode);
        this.map.set(newNode.hash(), newNode);
        this.size++;
        target = newNode;
      }
      return targetTs;
    }
    throw new ErrDatatype.NoTarget(this.ctx.L, targetTs.hash());
  }

  deleteLocalForList(op: DeleteOperation): unknown[] {
    const [targetOts, oldValues] = this.deleteLocal(op.pos, op.numOfNodes, op.timestamp);
    targetOts.forEach((ot) => {
      op.body.T.push(ot.orderedTime);
    });
    return oldValues;
  }

  deleteLocal(pos: number, numOfNodes: number, ts: Timestamp): [OrderedType[], unknown[]] {
    let target: OrderedType | undefined = this.findOrderedType(pos);
    const deletedOts: OrderedType[] = new Array<OrderedType>();
    const oldValues = new Array<unknown>();

    for (let i = 0; i < numOfNodes; i++) {
      if (!target) {
        throw new ErrDatatype.NoTarget(this.ctx.L, `no ${i} target`);
      }
      deletedOts.push(target);
      oldValues.push(target.value);
      target.makeTomb(ts);
      this.size--;
      target = target.getNextLive();
    }
    return [deletedOts, oldValues];
  }

  deleteRemoteForList(op: DeleteOperation): [TimedType[], OrdaError[]] {
    return this.deleteRemote(op.body.T, op.timestamp);
  }

  deleteRemote(targets: Timestamp[], ts: Timestamp): [TimedType[], OrdaError[]] {
    const errors = new Array<OrdaError>();
    const deleted = new Array<TimedType>();
    for (const target of targets) {
      const thisTs = ts.getAndNextDelimiter();
      const node = this.map.get(target.hash());
      if (!node) {
        errors.push(new ErrDatatype.NoTarget(this.ctx.L, target.toString()));
        continue;
      }
      if (!node.isTomb()) {
        node.makeTomb(thisTs);
        this.size--;
      } else {
        if (node.time.compare(thisTs) < 0) {
          node.makeTomb(thisTs);
        }
      }
      deleted.push(node.timedType);
    }
    return [deleted, errors];
  }

  updateLocalForList(op: UpdateOperation): unknown[] {
    const [targets, oldValues] = this.updateLocal(op.pos, op.timestamp, op.body.V);
    op.body.T = targets;
    return oldValues;
  }

  updateLocal(pos: number, ts: Timestamp, values: unknown[]): [Timestamp[], unknown[]] {
    let target: OrderedType | undefined = this.findOrderedType(pos);
    const oldValues = new Array<unknown>();
    const targets = new Array<Timestamp>();
    for (const v of values) {
      if (!target) {
        throw new ErrDatatype.IllegalParameters(this.ctx.L, `no target`);
      }
      targets.push(target.orderedTime);
      oldValues.push(target.value);
      target.value = v;
      target.time = ts.getAndNextDelimiter();
      target = target.getNextLive();
    }
    return [targets, oldValues];
  }

  updateRemote(op: UpdateOperation): void {
    const errors = new Array<OrdaError>();
    const ts = op.timestamp;
    for (let i = 0; i < op.body.T.length; i++) {
      const target = op.body.T[i];
      const value = op.body.V[i];
      const thisTs = ts.getAndNextDelimiter();
      const node = this.map.get(target.hash());
      if (!node) {
        errors.push(new ErrDatatype.NoTarget(this.ctx.L, target.toString()));
        continue;
      }
      if (node.isTomb()) {
        continue;
      }
      if (node.time.compare(thisTs) < 0) {
        node.value = value;
        node.time = thisTs;
      }
    }
  }

  private retrieve(pos: number): OrderedType | undefined {
    let ret: OrderedType | undefined = this.head;
    for (let i = 1; i <= pos; i++) {
      ret = ret.getNextLive();
      if (!ret) {
        return ret;
      }
    }
    return ret;
  }

  validateGetRange(pos: number, numOfNodes: number): OrdaError | undefined {
    if (pos < 0) {
      return new ErrDatatype.IllegalParameters(this.ctx.L, 'negative position');
    }
    if (numOfNodes < 1) {
      return new ErrDatatype.IllegalParameters(this.ctx.L, 'numOfNodes should be more than 0');
    }
    if (this.size - 1 < pos || pos + numOfNodes > this.size) {
      return new ErrDatatype.IllegalParameters(this.ctx.L, 'out of bound index');
    }
  }

  validateInsertPosition(pos: number): OrdaError | undefined {
    if (pos < 0) {
      return new ErrDatatype.IllegalParameters(this.ctx.L, 'negative position');
    }
    if (pos > this.size) {
      return new ErrDatatype.IllegalParameters(this.ctx.L, 'out of bound index');
    }
  }

  validateGetPosition(pos: number): OrdaError | undefined {
    if (pos < 0) {
      return new ErrDatatype.IllegalParameters(this.ctx.L, 'negative position');
    }
    if (pos >= this.size) {
      // size: 1 => pos {0}, size: 2 => pos {0, 1}
      return new ErrDatatype.IllegalParameters(this.ctx.L, 'out of bound index');
    }
  }

  findOrderedType(pos: number): OrderedType {
    return this.findOrderedTypeForInsert(pos + 1);
  }

  findOrderedTypeForInsert(pos: number): OrderedType {
    const target: OrderedType | undefined = this.retrieve(pos);
    if (!target) {
      throw new ErrDatatype.OutOfBound(this.ctx.L);
    }
    return target;
  }

  findManyTimedTypes(pos: number, numOfNodes: number): TimedType[] {
    let target: OrderedType | undefined = this.findOrderedType(pos);
    const ret = new Array<TimedType>();
    for (let i = 0; i <= numOfNodes; i++) {
      if (!target) {
        throw new ErrDatatype.IllegalParameters(this.ctx.L, 'out of bounds');
      }
      ret.push(target);
      target = target.getNextLive();
    }
    return ret;
  }

  findValue(pos: number): unknown {
    return this.findOrderedType(pos).value;
  }

  findManyValues(pos: number, numOfNodes: number): unknown[] {
    const ret = new Array<unknown>();
    const timedTypes = this.findManyTimedTypes(pos, numOfNodes);
    timedTypes.forEach((tt) => {
      ret.push(tt.value);
    });
    return ret;
  }

  fromJSON(json: string): void {
    const decoded = JSON.parse(json);
    this.size = decoded.Size;
    this.head = createNullOrderedNode();
    this.map = new Map<string, OrderedType>();
    this.map.set(this.head.hash(), this.head);
    let prev: OrderedType = this.head;

    for (const n of decoded.Nodes) {
      const ts = Timestamp.fromJSON(n.T);
      const ots = Timestamp.fromJSON(n.O);
      const node: OrderedType = new OrderedNode(ots, new TimedNode(n.V, ts));
      prev.insertNext(node);
      prev = node;
    }
  }

  toJSON(): marshaledList {
    const encoded = Array<OrderedType>();
    let node = this.head.next;
    while (node) {
      encoded.push(node);
      node = node.next;
    }
    return {
      Nodes: encoded,
      Size: this.size,
    };
  }

  toJSONString(): string {
    return JSON.stringify(this);
  }

  toNoMetaJSON(): unknown {
    const encoded: unknown[] = new Array<unknown>();
    let node: OrderedType | undefined = this.head.next;
    while (node) {
      if (!node.isTomb()) {
        encoded.push(node.value);
      }
      node = node.next;
    }
    return encoded;
  }
}

interface marshaledList {
  Nodes: OrderedType[];
  Size: number;
}
