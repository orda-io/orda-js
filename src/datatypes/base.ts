import { DUID } from '@ooo/types/uid';
import { OperationId } from '@ooo/types/operation';
import {
  DatatypeMeta,
  DatatypeName,
  StateOfDatatype,
  TypeOfDatatype,
} from '@ooo/types/datatype';
import { ClientContext, DatatypeContext } from '@ooo/context';
import { Operation } from '@ooo/operations/operation';
import { Datatype } from '@ooo/datatypes/datatype';
import { OperationID } from '@ooo/protobuf/ortoo_pb';

export abstract class BaseDatatype {
  id: DUID;
  key: string;
  type: TypeOfDatatype;
  opId: OperationId;
  ctx: DatatypeContext;
  state: StateOfDatatype;
  impl: Datatype;

  protected constructor(
    clientCtx: ClientContext,
    key: string,
    type: TypeOfDatatype,
    impl: Datatype
  ) {
    this.key = key;
    this.id = new DUID();
    this.type = type;
    this.opId = new OperationId(clientCtx.client.cuid);
    this.state = StateOfDatatype.DUE_TO_CREATE;
    this.ctx = new DatatypeContext(clientCtx, this);
    this.impl = impl;

    this.ctx.L.debug(`created ${DatatypeName[this.type]} `);
  }

  // getKey(): string {
  //   return this.key;
  // }
  //
  // getState(): StateOfDatatype {
  //   return this.state;
  // }
  //
  // getType(): TypeOfDatatype {
  //   return this.type;
  // }

  protected sentenceInBase(op: Operation): unknown {
    op.id = this.opId.next();
    try {
      return this.impl.executeLocalOp(op);
    } catch (e) {
      this.opId.rollback();
      throw e;
    }
  }

  protected replay(op: Operation): void {
    if (this.opId.cuid.compare(op.id.cuid) === 0) {
      this.sentenceInBase(op);
    } else {
      // remote
    }
  }

  protected getMeta(): DatatypeMeta {
    const meta = new DatatypeMeta();
    meta.setKey(this.key);
    meta.setDuid(this.id.AsUint8Array);
    meta.setOpid(this.opId.toPb());
    meta.setState(this.state);
    meta.setTypeof(this.type);
    return meta;
  }

  protected setMeta(meta: DatatypeMeta): void {
    this.key = meta.getKey();
    this.id = new DUID(false, meta.getDuid());
    this.opId = OperationId.fromPb(meta.getOpid() as OperationID);
    this.state = meta.getState();
    this.type = meta.getTypeof();
  }

  protected setMetaAndSnapshot(meta: DatatypeMeta, snap: string): void {
    this.setMeta(meta);
    this.impl.setSnapshot(snap);
  }
}
