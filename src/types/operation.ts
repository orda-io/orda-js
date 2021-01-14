import { uint32, Uint32, uint64, Uint64 } from './uint';
import { CUID } from './uid';
import { OperationID as OperationIDPb } from '../protobuf/ortoo_pb';

export { TypeOfOperation } from '../protobuf/ortoo_pb';

export class OperationId {
  private era: Uint32;
  private lamport: Uint64;
  private cuid: CUID;
  private seq: Uint64;

  constructor(cuid?: CUID, era?: Uint32, lamport?: Uint64, seq?: Uint64) {
    this.era = uint32(era);
    this.lamport = uint64(lamport);
    if (cuid) {
      this.cuid = cuid;
    } else {
      this.cuid = new CUID(true);
    }
    this.seq = uint64(seq);
  }

  next(): OperationId {
    this.lamport.add();
    this.seq.add();
    return new OperationId(
      this.cuid,
      this.era.clone(Uint32),
      this.lamport.clone(Uint64),
      this.seq.clone(Uint64)
    );
  }

  rollback(): void {
    this.lamport.sub();
    this.seq.sub();
  }

  toProtobuf(): OperationIDPb {
    const pb = new OperationIDPb();
    pb.setCuid(this.cuid.AsUint8Array);
    pb.setEra(this.era.asNumber());
    pb.setLamport(this.lamport.toString(10));
    pb.setSeq(this.seq.toString(10));
    return pb;
  }
}
