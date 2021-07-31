import { OrdaDatatype } from '@orda/datatypes/datatype';
import { StateOfDatatype } from '@orda/types/datatype';
import { DatatypeError } from '@orda/errors/for_handlers';
import { Operation } from '@orda/operations/operation';

export interface DatatypeHandlers {
  onDatatypeStateChange?(dt: OrdaDatatype, oldState: StateOfDatatype, newState: StateOfDatatype): void;

  onDatatypeRemoteChange?(dt: OrdaDatatype, opList: Operation[]): void;

  onDatatypeErrors?(dt: OrdaDatatype, ...errs: DatatypeError[]): void;
}
