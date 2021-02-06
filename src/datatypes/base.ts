import { DUID } from '@ooo/types/uid';
import { OperationId } from '@ooo/types/operation';
import {
  DatatypeMeta,
  DatatypeNames,
  StateOfDatatype,
  StateOfDatatypeNames,
  TypeOfDatatype,
} from '@ooo/types/datatype';
import { ClientContext, DatatypeContext } from '@ooo/context';
import { Operation } from '@ooo/operations/operation';
import { OperationID } from '@ooo/protobuf/ortoo_pb';
import { Snapshot } from '@ooo/datatypes/snapshot';
import { logOp } from '@ooo/decorators/decorators';

export abstract class BaseDatatype {
  private _id: DUID;
  key: string;
  type: TypeOfDatatype;
  opId: OperationId;
  ctx: DatatypeContext;
  private _state: StateOfDatatype;

  protected constructor(
    clientCtx: ClientContext,
    key: string,
    type: TypeOfDatatype,
    state: StateOfDatatype
  ) {
    this.key = key;
    this._id = new DUID();
    this.type = type;
    this.opId = new OperationId(clientCtx.client.cuid);
    this._state = state;
    this.ctx = new DatatypeContext(clientCtx, this);

    this.ctx.L.debug(
      `[BASE] created ${DatatypeNames[this.type]} as ${
        StateOfDatatypeNames[this._state]
      }`
    );
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
    this.ctx.L.debug(
      `[BASE] change state: ${StateOfDatatypeNames[this._state]} -> ${
        StateOfDatatypeNames[state]
      }`
    );
    this._state = state;
  }

  abstract executeLocalOp(op: Operation): unknown;

  abstract executeRemoteOp(op: Operation): unknown;

  abstract getSnapshot(): Snapshot;

  abstract setSnapshot(snap: string): void;

  @logOp()
  protected sentenceLocal(op: Operation): unknown {
    op.id = this.opId.next();
    try {
      return this.executeLocalOp(op);
    } catch (e) {
      this.opId.rollback();
      throw e;
    }
  }

  @logOp()
  protected sentenceRemote(op: Operation): unknown {
    this.opId.sync(op.id);
    return this.executeRemoteOp(op);
  }

  protected replay(op: Operation): void {
    if (this.opId.cuid.compare(op.id.cuid) === 0) {
      this.sentenceLocal(op);
    } else {
    }
  }

  protected getMeta(): DatatypeMeta {
    const meta = new DatatypeMeta();
    meta.setKey(this.key);
    meta.setDuid(this._id.AsUint8Array);
    meta.setOpid(this.opId.toPb());
    meta.setState(this.state);
    meta.setTypeof(this.type);
    return meta;
  }

  protected setMeta(meta: DatatypeMeta): void {
    this.key = meta.getKey();
    this._id = new DUID(false, meta.getDuid());
    this.opId = OperationId.fromPb(meta.getOpid() as OperationID);
    this.state = meta.getState();
    this.type = meta.getTypeof();
  }

  protected setMetaAndSnapshot(meta: DatatypeMeta, snap: string): void {
    this.setMeta(meta);
    this.setSnapshot(snap);
  }
}
