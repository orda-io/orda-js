import { DUID } from '@ooo/types/uid';
import { OperationId } from '@ooo/types/operation';
import { StateOfDatatype, TypeOfDatatype } from '@ooo/generated/proto';
export { StateOfDatatype, TypeOfDatatype } from '@ooo/generated/proto';

export class DatatypeMeta {
  key: string;
  id: DUID;
  opId: OperationId;
  state: StateOfDatatype;
  type: TypeOfDatatype;

  constructor(
    key: string,
    id: DUID,
    opID: OperationId,
    state: StateOfDatatype,
    type: TypeOfDatatype
  ) {
    this.key = key;
    this.id = id;
    this.opId = opID;
    this.state = state;
    this.type = type;
  }
}
