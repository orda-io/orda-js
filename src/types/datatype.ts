import { DUID } from '@ooo/types/uid';
import { OperationID } from '@ooo/types/operation';
import { OrtooTypeOfDatatype as TypeOfDatatype } from '@ooo/generated/openapi';
import { StateOfDatatype } from '@ooo/generated/proto.enum';

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
