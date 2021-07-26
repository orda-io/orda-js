import { StateOfDatatype, TypeOfDatatype } from '@ooo/types/datatype';
import { ClientContext } from '@ooo/context';
import { Wire, WiredDatatype } from '@ooo/datatypes/wired';
import { SnapshotOperation } from '@ooo/operations/meta';
import { DatatypeHandlers } from '@ooo/handlers/handlers';
import { Operation } from '@ooo/operations/operation';
import { DatatypeError } from '@ooo/errors/for_handlers';

export { Datatype };
export type { IDatatype };

interface IDatatype {
  readonly key: string;

  readonly type: TypeOfDatatype;

  readonly state: StateOfDatatype;

  sync(): Promise<void>;
}

abstract class Datatype extends WiredDatatype {
  handlers?: DatatypeHandlers;

  protected constructor(
    ctx: ClientContext,
    key: string,
    type: TypeOfDatatype,
    state: StateOfDatatype,
    wire?: Wire,
    handlers?: DatatypeHandlers
  ) {
    super(ctx, key, type, state, wire);
    this.handlers = handlers;
  }

  callOnStateChange(oldState: StateOfDatatype, newState: StateOfDatatype): void {
    if (
      newState === StateOfDatatype.SUBSCRIBED ||
      newState === StateOfDatatype.CLOSED ||
      newState === StateOfDatatype.DELETED
    ) {
      this.notifyWireOnChangeState();
    }
    if (this.handlers && this.handlers.onStateChange) {
      this.handlers.onStateChange(this, oldState, newState);
    }
  }

  callOnRemoteOperations(opList: Operation[]): void {
    if (this.handlers && this.handlers.onRemoteOperations) {
      this.handlers.onRemoteOperations(this, opList);
    }
  }

  callOnErrors(...errs: DatatypeError[]): void {
    if (this.handlers && this.handlers.onErrors) {
      this.handlers.onErrors(this, ...errs);
    }
  }

  createSnapshotOperation(): SnapshotOperation {
    return new SnapshotOperation(JSON.stringify(this.getSnapshot()));
  }

  subscribeOrCreate(): void {
    if (this.state === StateOfDatatype.DUE_TO_SUBSCRIBE || this.state === StateOfDatatype.DUE_TO_SUBSCRIBE_CREATE) {
      return;
    }
    this.sentenceLocalInTx(this.createSnapshotOperation());
  }
}
