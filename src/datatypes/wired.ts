import { BaseDatatype } from '@ooo/datatypes/base';
import { CheckPoint } from '@ooo/types/checkpoint';
import { Operation } from '@ooo/operations/operation';
import { ClientContext } from '@ooo/context';
import { TypeOfDatatype } from '@ooo/types/datatype';

export interface Wire {
  deliverTransaction(wired: WiredDatatype): void;
  OnChangeDatatypeState(): void;
}

export abstract class WiredDatatype extends BaseDatatype {
  protected checkPoint: CheckPoint;
  protected localBuffer: Operation[];

  protected constructor(ctx: ClientContext, key: string, type: TypeOfDatatype) {
    super(ctx, key, type);
    this.checkPoint = new CheckPoint();
    this.localBuffer = [];
  }
}
