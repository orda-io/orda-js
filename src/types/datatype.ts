import { DUID } from '@orda/types/uid';
import { OperationID } from '@orda/types/operation';
import { OrdaTypeOfDatatype as TypeOfDatatype } from '@orda/generated/openapi';
import { StateOfDatatype } from '@orda/generated/proto.enum';

export { StateOfDatatype, TypeOfDatatype };

export class DatatypeMeta {
  key: string;
  id: DUID;
  opId: OperationID;
  type: TypeOfDatatype;

  constructor(key: string, id: DUID, opID: OperationID, type: TypeOfDatatype) {
    this.key = key;
    this.id = id;
    this.opId = opID;
    this.type = type;
  }
}

export const TypeOfDatatypeMap = {
  COUNTER: 0,
  MAP: 1,
  LIST: 2,
  DOCUMENT: 3,
};

export const enum TypeOfJSON {
  element = 'E',
  object = 'O',
  array = 'A',
}
