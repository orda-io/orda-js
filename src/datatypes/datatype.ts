import { StateOfDatatype, TypeOfDatatype } from '@ooo/types/datatype';
import { ClientContext } from '@ooo/context';
import { Wire, WiredDatatype } from '@ooo/datatypes/wired';
import { SnapshotOperation } from '@ooo/operations/meta';

export { Datatype };
export type { IDatatype };

interface IDatatype {
  readonly key: string;

  readonly type: TypeOfDatatype;

  readonly state: StateOfDatatype;

  sync(): Promise<void>;
}

abstract class Datatype extends WiredDatatype {
  protected constructor(
    ctx: ClientContext,
    key: string,
    type: TypeOfDatatype,
    state: StateOfDatatype,
    wire?: Wire
  ) {
    super(ctx, key, type, state, wire);
  }

  subscribeOrCreate() {
    if (this.state === StateOfDatatype.DUE_TO_SUBSCRIBE) {
      return;
    }
    this.sentenceLocalInTx(
      new SnapshotOperation(this.state, this.getSnapshot().toJSONString())
    );
  }
}
