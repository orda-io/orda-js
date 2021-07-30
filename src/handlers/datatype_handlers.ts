import { Datatype } from '@orda/datatypes/datatype';
import { StateOfDatatype } from '@orda/types/datatype';
import { DatatypeError } from '@orda/errors/for_handlers';
import { Operation } from '@orda/operations/operation';

export class DatatypeHandlers {
  onStateChange?: (dt: Datatype, oldState: StateOfDatatype, newState: StateOfDatatype) => void;

  onRemoteOperations?: (dt: Datatype, opList: Operation[]) => void;

  onErrors?: (dt: Datatype, ...errs: DatatypeError[]) => void;

  constructor(
    onStateChange?: (dt: Datatype, oldState: StateOfDatatype, newState: StateOfDatatype) => void,
    onRemoteOperations?: (dt: Datatype, opList: Operation[]) => void,
    onErrors?: (dt: Datatype, ...errs: DatatypeError[]) => void,
    scope?: never
  ) {
    this.onStateChange = onStateChange;
    this.onRemoteOperations = onRemoteOperations;
    this.onErrors = onErrors;

    if (scope) {
      this.onStateChange?.bind(scope);
      this.onRemoteOperations?.bind(scope);
      this.onErrors?.bind(scope);
    }
  }

  addOnStateChangeHandler(
    onStateChange: (dt: Datatype, oldState: StateOfDatatype, newState: StateOfDatatype) => void
  ): DatatypeHandlers {
    this.onStateChange = onStateChange;
    return this;
  }

  addOnRemoteOperationsHandler(onRemoteOperations: (dt: Datatype, opList: Operation[]) => void): DatatypeHandlers {
    this.onRemoteOperations = onRemoteOperations;
    return this;
  }

  addOnErrorsHandler(onErrors: (dt: Datatype, ...errs: DatatypeError[]) => void): DatatypeHandlers {
    this.onErrors = onErrors;
    return this;
  }
}
