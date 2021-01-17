import { TransactionalDatatype } from '@ooo/datatypes/tansactional';
import { TypeOfDatatype } from '@ooo/types/datatype'
import { ClientContext } from '@ooo/context';
import { IBaseDatatype } from '@ooo/datatypes/base';

export interface IDatatype extends IBaseDatatype {

}

export abstract class Datatype extends TransactionalDatatype {
  protected constructor(ctx: ClientContext, key: string, type: TypeOfDatatype) {
    super(ctx, key, type);
  }
}
