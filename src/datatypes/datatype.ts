import { StateOfDatatype, TypeOfDatatype } from '@orda/types/datatype';
import { ClientContext } from '@orda/context';
import { Wire, WiredDatatype } from '@orda/datatypes/wired';
import { SnapshotOperation } from '@orda/operations/meta';
import { DatatypeHandlers } from '@orda/handlers/datatype';
import { Operation } from '@orda/operations/operation';
import { DatatypeError } from '@orda/errors/for_handlers';

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
    if (this.handlers && this.handlers.onDatatypeStateChange) {
      this.handlers.onDatatypeStateChange(this, oldState, newState);
    }
  }

  callOnRemoteOperations(opList: Operation[]): void {
    if (this.handlers && this.handlers.onDatatypeRemoteChange) {
      this.handlers.onDatatypeRemoteChange(this, opList);
    }
  }

  callOnErrors(...errs: DatatypeError[]): void {
    if (this.handlers && this.handlers.onDatatypeErrors) {
      this.handlers.onDatatypeErrors(this, ...errs);
    }
  }

  createSnapshotOperation(): SnapshotOperation {
    return new SnapshotOperation(JSON.stringify(this.getSnapshot()));
  }

  subscribeOrCreate(): void {
    if (this.state === StateOfDatatype.DUE_TO_SUBSCRIBE) {
      this.deliverTransaction([]);
      return;
    }
    this.sentenceLocalInTx(this.createSnapshotOperation());
  }
}
