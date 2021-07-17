import { Datatype } from '@ooo/datatypes/datatype';
import { StateOfDatatype } from '@ooo/types/datatype';
import { DatatypeError } from '@ooo/errors/for_handlers';
import { Operation } from '@ooo/operations/operation';

export type { OnStateChange, OnRemoteOperations, OnErrors };

type OnStateChange = (dt: Datatype, oldState: StateOfDatatype, newState: StateOfDatatype) => void;

type OnRemoteOperations = (dt: Datatype, opList: Operation[]) => void;

type OnErrors = (dt: Datatype, ...errs: DatatypeError[]) => void;

export class DatatypeHandlers {
  onStateChange?: OnStateChange;

  onRemoteOperations?: OnRemoteOperations;

  onErrors?: OnErrors;

  constructor(onStateChange?: OnStateChange, onRemoteOperations?: OnRemoteOperations, onErrors?: OnErrors) {
    this.onStateChange = onStateChange;
    this.onRemoteOperations = onRemoteOperations;
    this.onErrors = onErrors;
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
