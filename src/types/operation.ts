import { uint32, Uint32, uint64, Uint64 } from '@ooo/types/integer';
import { CUID } from '@ooo/types/uid';
import {
  OperationID as OperationIDPb,
  TypeOfOperation,
} from '@ooo/protobuf/ortoo_pb';

export { TypeOfOperation };

export class OperationId {
  era: Uint32;
  lamport: Uint64;
  cuid: CUID;
  seq: Uint64;

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

  toString(): string {
    return (
      `OpID[${this.era.toString(10)}` +
      `:${this.lamport.toString(10)}` +
      `:${this.cuid.toString()}` +
      `:${this.seq.toString(10)}`
    );
  }

  next(): OperationId {
    this.lamport.add();
    this.seq.add();
    return this.clone();
  }

  clone(): OperationId {
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

  compare(other: OperationId): number {
    const diffErr = this.era.asNumber() - other.era.asNumber();
    if (diffErr > 0) {
      return 1;
    } else if (diffErr < 0) {
      return -1;
    }
    const diffLamport = this.lamport.asNumber() - other.lamport.asNumber();
    if (diffLamport > 0) {
      return 1;
    } else if (diffLamport < 0) {
      return -1;
    }
    return this.cuid.compare(other.cuid);
  }

  toPb(): OperationIDPb {
    const pb = new OperationIDPb();
    pb.setCuid(this.cuid.AsUint8Array);
    pb.setEra(this.era.asNumber());
    pb.setLamport(this.lamport.toString(10));
    pb.setSeq(this.seq.toString(10));
    return pb;
  }

  static fromPb(pb: OperationIDPb): OperationId {
    return new OperationId(
      new CUID(false, pb.getCuid()),
      uint32(pb.getEra()),
      uint64(pb.getLamport()),
      uint64(pb.getSeq())
    );
  }
}
