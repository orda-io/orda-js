import { Datatype, IDatatype } from '@ooo/datatypes/datatype';
import { Op } from '@ooo/operations/operation';
import { Snapshot } from '@ooo/datatypes/snapshot';
import { ClientContext, DatatypeContext } from '@ooo/context';
import { ExtMap } from '@ooo/utils/map';
import { TimedNode, TimedType } from '@ooo/datatypes/timed';
import { Timestamp } from '@ooo/types/timestamp';
import { ErrDatatype } from '@ooo/errors/datatype';
import { StateOfDatatype } from '@ooo/generated/proto.enum';
import { Wire } from '@ooo/datatypes/wired';
import { DatatypeHandlers } from '@ooo/handlers/handlers';
import { TypeOfDatatype } from '@ooo/types/datatype';
import { TypeOfOperation } from '@ooo/types/operation';
import { PutOperation, RemoveOperation } from '@ooo/operations/map';
import { TransactionContext } from '@ooo/datatypes/tansaction';
import { SnapshotOperation } from '@ooo/operations/meta';

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

  constructor(
    ctx: ClientContext,
    key: string,
    state: StateOfDatatype,
    wire?: Wire,
    handlers?: DatatypeHandlers
  ) {
    super(ctx, key, TypeOfDatatype.MAP, state, wire, handlers);
    this.snap = new OooMapSnapshot(this.ctx);
    this.resetRollbackContext();
  }

  executeLocalOp(op: Op): unknown {
    switch (op.type) {
      case TypeOfOperation.MAP_PUT:
        const put = op as PutOperation;
        return this.snap.putCommon(put.body.Key, put.body.Value, put.timestamp);
      case TypeOfOperation.MAP_REMOVE:
        const remove = op as RemoveOperation;
        return this.snap.removeLocal(remove.body.Key, remove.timestamp);
    }
    throw new ErrDatatype.IllegalOperation(
      this.ctx.L,
      this.type,
      op.toString()
    );
  }

  executeRemoteOp(op: Op): unknown {
    switch (op.type) {
      case TypeOfOperation.SNAPSHOT:
        const snap = op as SnapshotOperation;
        this.snap.fromJSON(snap.body.Snapshot);
        return;
      case TypeOfOperation.MAP_PUT:
        const put = op as PutOperation;
        return this.snap.putCommon(put.body.Key, put.body.Value, put.timestamp);
      case TypeOfOperation.MAP_REMOVE:
        const remove = op as RemoveOperation;
        return this.snap.removeRemote(remove.body.Key, remove.timestamp);
    }
    throw new ErrDatatype.IllegalOperation(
      this.ctx.L,
      this.type,
      op.toString()
    );
  }

  get(key: string): unknown {
    return this.snap.get(key);
  }

  getSnapshot(): Snapshot {
    return this.snap;
  }

  put(key: string, value: unknown): unknown {
    if (key === '' || value === null) {
      throw new ErrDatatype.IllegalParameters(
        this.ctx.L,
        'neither empty key nor null value is not allowed'
      );
    }
    const op = new PutOperation(key, value);
    const ret: unknown[] = this.sentenceLocalInTx(op);
    return ret[0];
  }

  remove(key: string): unknown {
    if (key === '') {
      throw new ErrDatatype.IllegalParameters(
        this.ctx.L,
        'empty key is not allowed'
      );
    }
    const ret: unknown[] = this.sentenceLocalInTx(new RemoveOperation(key));
    return ret[0];
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
}

class OooMapSnapshot implements Snapshot {
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

  putCommon(key: string, value: unknown, ts: Timestamp): unknown {
    const removedTt = this.putCommonWithTimedType(
      key,
      new TimedNode(value, ts)
    );
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
    if (oldTt.time.compare(newTt.time) < 0) {
      this.map.set(key, newTt);
      return oldTt;
    }
    return newTt;
  }

  removeLocal(key: string, ts: Timestamp): unknown {
    return this.removeLocalWithTimedType(key, ts);
  }

  removeRemote(key: string, ts: Timestamp): unknown {
    return this.removeRemoteWithTimedType(key, ts);
  }

  removeLocalWithTimedType(key: string, ts: Timestamp): unknown {
    const tt = this.map.get(key);
    if (tt && !tt.isTomb()) {
      if (tt.time.compare(ts) < 0) {
        const oldV = tt.value;
        tt.makeTomb(ts);
        this.size--;
        return oldV;
      }
      // local remove cannot reach here; ts is newest;
    }
    throw new ErrDatatype.NoOp(
      this.ctx.L,
      `remove the value for not existing key ${key}`
    );
  }

  removeRemoteWithTimedType(key: string, ts: Timestamp): unknown {
    const tt = this.map.get(key);
    if (tt) {
      if (tt.time.compare(ts) < 0) {
        if (!tt.isTomb()) {
          this.size--;
        }
        const oldV = tt.value;
        tt.makeTomb(ts);
        return oldV;
      }
      // remote remove is not effective
      return;
    }
    throw new ErrDatatype.NoTarget(this.ctx.L, key);
  }

  fromJSON(json: string): void {
    const decoded = JSON.parse(json);
    this.map.clear();
    for (const key in decoded.map) {
      const val = decoded.map[key];
      const ts = Timestamp.fromEncoded(val.t);
      this.map.set(key, new TimedNode(val.v, ts));
    }
    this.size = decoded.size;
  }

  toJSON(): unknown {
    const encoded: any = {};
    this.map.forEach((v, k) => {
      encoded[k] = v;
    });
    return {
      map: encoded,
      size: this.size,
    };
  }

  toJSONString(): string {
    return JSON.stringify(this);
  }
}
