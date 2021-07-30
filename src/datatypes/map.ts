import { Datatype, IDatatype } from '@orda/datatypes/datatype';
import { Op } from '@orda/operations/operation';
import { Snapshot } from '@orda/datatypes/snapshot';
import { ClientContext, DatatypeContext } from '@orda/context';
import { ExtMap } from '@orda/utils/map';
import { TimedNode, TimedType } from '@orda/datatypes/timed';
import { Timestamp } from '@orda/types/timestamp';
import { ErrDatatype } from '@orda/errors/datatype';
import { StateOfDatatype } from '@orda/generated/proto.enum';
import { Wire } from '@orda/datatypes/wired';
import { DatatypeHandlers } from '@orda/handlers/datatype_handlers';
import { TypeOfDatatype } from '@orda/types/datatype';
import { TypeOfOperation } from '@orda/types/operation';
import { PutOperation, RemoveOperation } from '@orda/operations/map';
import { TransactionContext } from '@orda/datatypes/tansaction';
import { SnapshotOperation } from '@orda/operations/meta';

export { _OooMap };
export type { OooMapTx, OooMap };

interface OooMapTx extends IDatatype {
  get(key: string): unknown;

  put(key: string, value: unknown): unknown;

  remove(key: string): unknown;

  size(): number;
}

interface OooMap extends OooMapTx {
  transaction(tag: string, fn: (map: OooMapTx) => boolean): boolean;
}

class _OooMap extends Datatype implements OooMap {
  private snap: OooMapSnapshot;

  constructor(ctx: ClientContext, key: string, state: StateOfDatatype, wire?: Wire, handlers?: DatatypeHandlers) {
    super(ctx, key, TypeOfDatatype.MAP, state, wire, handlers);
    this.snap = new OooMapSnapshot(this.ctx);
    this.resetRollbackContext();
  }

  executeLocalOp(op: Op): unknown {
    switch (op.type) {
      case TypeOfOperation.MAP_PUT:
        return this.snap.putCommon(<PutOperation>op);
      case TypeOfOperation.MAP_REMOVE:
        return this.snap.removeLocal(<RemoveOperation>op);
    }
    throw new ErrDatatype.IllegalOperation(this.ctx.L, this.type, op.toString());
  }

  executeRemoteOp(op: Op): unknown {
    switch (op.type) {
      case TypeOfOperation.SNAPSHOT:
        const sop = op as SnapshotOperation;
        this.snap.fromJSON(sop.getStringBody());
        return;
      case TypeOfOperation.MAP_PUT:
        return this.snap.putCommon(<PutOperation>op);
      case TypeOfOperation.MAP_REMOVE:
        return this.snap.removeRemote(<RemoveOperation>op);
    }
    throw new ErrDatatype.IllegalOperation(this.ctx.L, this.type, op.toString());
  }

  get(key: string): unknown {
    return this.snap.get(key);
  }

  getSnapshot(): Snapshot {
    return this.snap;
  }

  put(key: string, value: unknown): unknown {
    if (key === '' || value === null) {
      throw new ErrDatatype.IllegalParameters(this.ctx.L, 'neither empty key nor null value is not allowed');
    }
    return this.sentenceLocalInTx(new PutOperation(key, value));
  }

  remove(key: string): unknown {
    if (key === '') {
      throw new ErrDatatype.IllegalParameters(this.ctx.L, 'empty key is not allowed');
    }
    return this.sentenceLocalInTx(new RemoveOperation(key));
  }

  setSnapshot(snap: string): void {
    this.snap.fromJSON(snap);
  }

  size(): number {
    return this.snap.size;
  }

  transaction(tag: string, txFunc: (map: OooMapTx) => boolean): boolean {
    return this.doTransaction(tag, (txCtx: TransactionContext): boolean => {
      return txFunc(this);
    });
  }

  toJSON(): Map<string, unknown> {
    return this.snap.toNoMetaJSON();
  }
}

export class OooMapSnapshot implements Snapshot {
  ctx: DatatypeContext;
  map: Map<string, TimedType>;
  size: number;

  constructor(ctx: DatatypeContext) {
    this.ctx = ctx;
    this.map = new ExtMap<string, TimedType>();
    this.size = 0;
  }

  get(key: string): unknown {
    const tt = this.map.get(key);
    if (tt) {
      if (!tt.isTomb()) {
        return tt.value;
      }
    }
  }

  putCommon(op: PutOperation): unknown {
    const removedTt = this.putCommonWithTimedType(op.body.Key, new TimedNode(op.body.Value, op.timestamp));
    if (removedTt) {
      return removedTt.value;
    }
    return;
  }

  putCommonWithTimedType(key: string, newTt: TimedType): TimedType | undefined {
    const oldTt: TimedType | undefined = this.map.get(key);
    if (!oldTt) {
      this.map.set(key, newTt);
      this.size++;
      return;
    }
    if (oldTt.time && newTt.time && oldTt.time.compare(newTt.time) < 0) {
      this.map.set(key, newTt);
      return oldTt;
    }
    return newTt;
  }

  removeLocal(op: RemoveOperation): unknown {
    const ret = this.removeLocalWithTimedType(op.body.Key, op.timestamp);
    if (ret) {
      return ret[1];
    }
  }

  removeRemote(op: RemoveOperation): unknown {
    return this.removeRemoteWithTimedType(op.body.Key, op.timestamp)?.value;
  }

  removeLocalWithTimedType(key: string, ts: Timestamp): [TimedType, unknown] | undefined {
    const tt = this.map.get(key);
    if (tt && !tt.isTomb()) {
      if (tt.time && tt.time.compare(ts) < 0) {
        const oldV = tt.value;
        tt.makeTomb(ts);
        this.size--;
        return [tt, oldV];
      }
      // local remove cannot reach here; ts is newest;
    }
    this.ctx.L.warn(`no target ${key} exists in JSONObject`);
    throw new ErrDatatype.NoOp(undefined, `remove the value for not existing key ${key}`);
  }

  removeRemoteWithTimedType(key: string, ts: Timestamp): TimedType | undefined {
    const tt = this.map.get(key);
    if (tt) {
      if (tt.time && tt.time.compare(ts) < 0) {
        if (!tt.isTomb()) {
          this.size--;
        }
        const oldV = tt.value;
        tt.makeTomb(ts);
        return tt;
      }
      // remote remove is not effective
      return;
    }
    throw new ErrDatatype.NoTarget(this.ctx.L, key);
  }

  fromJSON(json: string): void {
    const decoded = JSON.parse(json);
    this.map.clear();
    this.size = 0;
    for (const key in decoded.Map) {
      const val = decoded.Map[key];
      const ts = Timestamp.fromJSON(val.t);
      this.map.set(key, new TimedNode(val.v ? val.v : undefined, ts));
    }
    this.size = decoded.Size;
  }

  toJSON(): unknown {
    const encoded: any = {};
    this.map.forEach((v, k) => {
      encoded[k] = v;
    });
    return {
      Map: encoded,
      Size: this.size,
    };
  }

  toJSONString(): string {
    return JSON.stringify(this);
  }

  toNoMetaJSON(): Map<string, unknown> {
    const encoded: any = {};
    this.map.forEach((v, k) => {
      if (!v.isTomb()) {
        encoded[k] = v.value;
      }
    });
    return encoded;
  }
}
