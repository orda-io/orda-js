import { Datatype } from '@ooo/datatypes/datatype';
import { StateOfDatatype } from '@ooo/types/datatype';
import { OrtooError } from '@ooo/errors/error';

export type { OnStateChange, OnRemoteOperations, OnErrors };

type OnStateChange = (
  dt: Datatype,
  oldState: StateOfDatatype,
  newState: StateOfDatatype
) => void;

type OnRemoteOperations = (dt: Datatype, opList: unknown[]) => void;

type OnErrors = (dt: Datatype, ...errs: OrtooError[]) => void;

export class DatatypeHandlers {
  onStateChange?: OnStateChange;

  onRemoteOperations?: OnRemoteOperations;

  onErrors?: OnErrors;

  constructor(
    onStateChange?: OnStateChange,
    onRemoteOperations?: OnRemoteOperations,
    onErrors?: OnErrors
  ) {
    this.onStateChange = onStateChange;
    this.onRemoteOperations = onRemoteOperations;
    this.onErrors = onErrors;
  }

  addOnStateChangeHandler(onStateChange: OnStateChange): DatatypeHandlers {
    this.onStateChange = onStateChange;
    return this;
  }

  addOnRemoteOperationsHandler(
    onRemoteOperations: OnRemoteOperations
  ): DatatypeHandlers {
    this.onRemoteOperations = onRemoteOperations;
    return this;
  }

  addOnErrorsHandler(onErrors: OnErrors): DatatypeHandlers {
    this.onErrors = onErrors;
    return this;
  }
}
