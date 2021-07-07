import { createUID, DUID } from '@ooo/types/uid';
import { OperationID, TypeOfOperation } from '@ooo/types/operation';
import { ClientContext, DatatypeContext } from '@ooo/context';
import { Op, Operation } from '@ooo/operations/operation';
import { Snapshot } from '@ooo/datatypes/snapshot';
import { logOp } from '@ooo/decorators/decorators';
import { DatatypeMeta, StateOfDatatype, TypeOfDatatype } from '@ooo/types/datatype';
import { DatatypeError } from '@ooo/errors/for_handlers';

export { BaseDatatype };

abstract class BaseDatatype {
  private _id: string;
  key: string;
  type: TypeOfDatatype;
  opId: OperationID;
  ctx: DatatypeContext;
  private _state: StateOfDatatype;

  protected constructor(clientCtx: ClientContext, key: string, type: TypeOfDatatype, state: StateOfDatatype) {
    this.key = key;
    this._id = createUID();
    this.type = type;
    this.opId = new OperationID(clientCtx.client.cuid);
    this._state = state;
    this.ctx = new DatatypeContext(clientCtx, this);
    this.ctx.L.debug(`[BASE] created ${this.type} as ${this._state}`);
  }

  set id(value: DUID) {
    this._id = value;
    this.ctx.updateLogger();
  }

  get id(): DUID {
    return this._id;
  }

  get state(): StateOfDatatype {
    return this._state;
  }

  set state(state: StateOfDatatype) {
    if (this._state === state) {
      return;
    }
    this.ctx.L.debug(`[BASE] change state: ${this._state} -> ${state}`);
    const oldState = this._state;
    this._state = state;
    this.callOnStateChange(oldState, this._state);
  }

  abstract callOnStateChange(oldState: StateOfDatatype, newState: StateOfDatatype): void;

  abstract callOnErrors(...errs: DatatypeError[]): void;

  abstract executeLocalOp(op: Op): unknown;

  abstract executeRemoteOp(op: Op): unknown;

  abstract getSnapshot(): Snapshot;

  abstract setSnapshot(snap: string): void;

  @logOp()
  protected sentenceLocal(op: Op): unknown {
    op.id = this.opId.next();
    try {
      if (op.type !== TypeOfOperation.TRANSACTION && op.type !== TypeOfOperation.SNAPSHOT) {
        return this.executeLocalOp(op);
      }
    } catch (e) {
      this.opId.rollback();
      throw e;
    }
  }

  @logOp()
  protected sentenceRemote(op: Op): Operation {
    this.opId.sync(op.id);
    if (op.type !== TypeOfOperation.TRANSACTION) {
      this.executeRemoteOp(op);
    }
    return op.toOperation();
  }

  protected getMeta(): DatatypeMeta {
    return new DatatypeMeta(this.key, this._id, this.opId.clone(), this.type);
  }

  protected setMeta(meta: DatatypeMeta): void {
    this.key = meta.key;
    this._id = meta.id;
    this.opId = meta.opId;
    this.type = meta.type;
  }

  protected setMetaAndSnapshot(meta: DatatypeMeta, snap: string): void {
    this.setMeta(meta);
    this.setSnapshot(snap);
  }
}
