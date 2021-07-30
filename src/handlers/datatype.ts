import { Datatype } from '@orda/datatypes/datatype';
import { StateOfDatatype } from '@orda/types/datatype';
import { DatatypeError } from '@orda/errors/for_handlers';
import { Operation } from '@orda/operations/operation';

export interface DatatypeHandlers {
  onDatatypeStateChange?(dt: Datatype, oldState: StateOfDatatype, newState: StateOfDatatype): void;

  onDatatypeRemoteChange?(dt: Datatype, opList: Operation[]): void;

  onDatatypeErrors?(dt: Datatype, ...errs: DatatypeError[]): void;
}
