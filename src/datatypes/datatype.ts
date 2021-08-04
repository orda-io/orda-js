import { StateOfDatatype, TypeOfDatatype } from '@orda/types/datatype';
import { ClientContext } from '@orda/context';
import { Wire, WiredDatatype } from '@orda/datatypes/wired';
import { SnapshotOperation } from '@orda/operations/meta';
import { DatatypeHandlers } from '@orda/handlers/datatype';
import { Operation } from '@orda/operations/operation';
import { DatatypeError } from '@orda/errors/for_handlers';
import { TypeOfSnapshotOperation } from '@orda/types/operation';

export { Datatype };
export type { OrdaDatatype };

interface OrdaDatatype {
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
    if (this.handlers && oldState !== newState && this.handlers.onDatatypeStateChange) {
      this.handlers.onDatatypeStateChange(this.getThis() as OrdaDatatype, oldState, newState);
    }
  }

  callOnRemoteChange(opList: Operation[]): void {
    if (opList.length > 0 && this.handlers?.onDatatypeRemoteChange) {
      this.handlers.onDatatypeRemoteChange(this.getThis() as OrdaDatatype, opList);
    }
  }

  callOnErrors(...errs: DatatypeError[]): void {
    if (errs.length > 0 && this.handlers?.onDatatypeErrors) {
      this.handlers.onDatatypeErrors(this.getThis() as OrdaDatatype, ...errs);
    }
  }

  createSnapshotOperation(): SnapshotOperation {
    return new SnapshotOperation(TypeOfSnapshotOperation[this.type], JSON.stringify(this.getSnapshot()));
  }

  subscribeOrCreate(): void {
    if (this.state === StateOfDatatype.DUE_TO_SUBSCRIBE) {
      this.deliverTransaction([]);
      return;
    }
    this.sentenceLocalInTx(this.createSnapshotOperation());
  }
}
