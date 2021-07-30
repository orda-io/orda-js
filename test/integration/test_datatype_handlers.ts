import { DatatypeHandlers } from '../../src/handlers/datatype';
import { Datatype } from '@orda/datatypes/datatype';
import { DatatypeErrCodes, DatatypeError } from '@orda/errors/for_handlers';
import { StateOfDatatype } from '@orda/generated/proto.enum';
import { Operation } from '@orda/operations/operation';
import { CountDownLatch } from '@test/helper/countdown_latch';
import { ExtMap } from '@orda/utils/map';
import { helper } from '@test/helper/helper';

export class TestDatatypeHandlers implements DatatypeHandlers {
  errLatchMap: ExtMap<DatatypeErrCodes, CountDownLatch>;
  stateLatchMap: ExtMap<StateOfDatatype, CountDownLatch>;
  remoteLatch?: CountDownLatch;
  success: boolean;

  constructor() {
    this.errLatchMap = new ExtMap<DatatypeErrCodes, CountDownLatch>();
    this.stateLatchMap = new ExtMap<StateOfDatatype, CountDownLatch>();
    this.success = true;
  }

  onDatatypeErrors(dt: Datatype, ...errs: DatatypeError[]): void {
    if (errs.length > 0) {
      for (const err of errs) {
        const latch = this.errLatchMap.get(err.code);
        if (!latch) {
          this.setFalse(err.toString());
          return;
        }
        helper.L.info(`receive error: ${err.toString()}`);
        latch.countDown();
        this.errLatchMap.delete(err.code);
      }
    }
  }

  private setFalse(msg?: string) {
    this.success = false;
    helper.L.debug(`setFalse: ${msg}`);
    this.errLatchMap.forEach((v, k) => {
      helper.L.info(`err countdown ${k}`);
      v.countDown();
    });
    this.stateLatchMap.forEach((v, k) => {
      helper.L.info(`state countdown ${k}`);
      v.countDown();
    });
  }

  getNewStateLatch(state: StateOfDatatype, latch?: CountDownLatch): CountDownLatch {
    return this.stateLatchMap.getOrElseSet(state, latch ? latch : new CountDownLatch());
  }

  getDatatypeErrLatch(code: DatatypeErrCodes, latch?: CountDownLatch): CountDownLatch {
    return this.errLatchMap.getOrElseSet(code, latch ? latch : new CountDownLatch());
  }

  getRemoteLatch(num: number): CountDownLatch {
    this.remoteLatch = new CountDownLatch(num);
    return this.remoteLatch;
  }

  onDatatypeStateChange(datatype: Datatype, oldState: StateOfDatatype, newState: StateOfDatatype): void {
    const latch = this.stateLatchMap.get(newState);
    if (!latch) {
      this.setFalse(newState);
      return;
    }
    latch.countDown();
    this.stateLatchMap.delete(newState);
  }

  onDatatypeRemoteChange(datatype: Datatype, opList: Operation[]): void {
    for (let i = 0; i < opList.length; i++) {
      helper.L.info(`${opList[i]}`);
      if (this.remoteLatch) {
        if (this.remoteLatch.count > 0) {
          this.remoteLatch.countDown();
        } else {
          this.setFalse('remote');
          return;
        }
      }
    }
  }
}
