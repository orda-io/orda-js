import { DUID } from '@ooo/types/uid';
import { OperationId } from '@ooo/types/operation';
import {
  DatatypeName,
  StateOfDatatype,
  TypeOfDatatype,
} from '@ooo/types/datatype';
import { ClientContext, DatatypeContext } from '@ooo/context';
import { Operation } from '@ooo/operations/operation';

export interface IBaseDatatype {
  getKey(): string;

  getType(): TypeOfDatatype;

  getState(): StateOfDatatype;
}

export abstract class BaseDatatype implements IBaseDatatype {
  private readonly key: string;
  private _id: DUID;
  private _opId: OperationId;
  protected readonly type: TypeOfDatatype;
  protected ctx: DatatypeContext;
  protected state: StateOfDatatype;

  protected constructor(
    clientCtx: ClientContext,
    key: string,
    type: TypeOfDatatype
  ) {
    this.key = key;
    this._id = new DUID();
    this.type = type;
    this._opId = new OperationId(clientCtx.client.cuid);
    this.state = StateOfDatatype.DUE_TO_CREATE;
    this.ctx = new DatatypeContext(clientCtx, this);

    this.ctx.L.debug(`created ${DatatypeName[this.type]} `);
  }

  get opId(): OperationId {
    return this._opId;
  }

  set opId(value: OperationId) {
    this._opId = value;
  }

  get id(): DUID {
    return this._id;
  }

  set id(value: DUID) {
    this._id = value;
  }

  getKey(): string {
    return this.key;
  }

  getState(): StateOfDatatype {
    return this.state;
  }

  getType(): TypeOfDatatype {
    return this.type;
  }

  protected sentenceInBase(op: Operation): unknown {
    op.setId(this.opId.next());
    try {
      return this.executeLocalOp(op);
    } catch (e) {
      this.opId.rollback();
      throw e;
    }
  }

  abstract executeLocalOp(op: Operation): unknown;

  abstract executeRemoteOp(op: Operation): unknown;
}
