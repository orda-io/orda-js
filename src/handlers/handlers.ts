import { Datatype } from '@ooo/datatypes/datatype';
import { StateOfDatatype } from '@ooo/types/datatype';
import { OrtooError } from '@ooo/errors/error';

export class DatatypeHandlers {
  onStateChange?: (
    dt: Datatype,
    oldState: StateOfDatatype,
    newState: StateOfDatatype
  ) => void;

  onRemoteOperations?: (dt: Datatype, opList: unknown[]) => void;

  onErrors?: (dt: Datatype, ...errs: OrtooError[]) => void;

  constructor(
    onStateChange: (
      dt: Datatype,
      oldState: StateOfDatatype,
      newState: StateOfDatatype
    ) => void,
    onRemoteOperations: (dt: Datatype, opList: unknown[]) => void,
    onErrors: (dt: Datatype, ...errs: OrtooError[]) => void
  ) {
    this.onStateChange = onStateChange;
    this.onRemoteOperations = onRemoteOperations;
    this.onErrors = onErrors;
  }
}
