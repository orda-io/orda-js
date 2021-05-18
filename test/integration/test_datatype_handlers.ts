import { DatatypeHandlers } from '@ooo/handlers/handlers';
import { Datatype } from '@ooo/datatypes/datatype';
import { DatatypeErrCodes, DatatypeError } from '@ooo/errors/for_handlers';
import { StateOfDatatype } from '@ooo/generated/proto.enum';
import { Operation } from '@ooo/operations/operation';
import { CountDownLatch } from '@test/helper/countdown_latch';
import { ExtMap } from '@ooo/utils/map';
import { helper } from '@test/helper/helper';

export class TestDatatypeHandlers extends DatatypeHandlers {
  errLatchMap: ExtMap<DatatypeErrCodes, CountDownLatch>;
  stateLatchMap: ExtMap<StateOfDatatype, CountDownLatch>;
  remoteLatch?: CountDownLatch;
  success: boolean;

  constructor() {
    super();
    this.errLatchMap = new ExtMap<DatatypeErrCodes, CountDownLatch>();
    this.stateLatchMap = new ExtMap<StateOfDatatype, CountDownLatch>();

    this.onErrors = this.thisOnErrors;
    this.onStateChange = this.thisOnStateChange;
    this.onRemoteOperations = this.thisOnRemoteOperations;
    this.success = true;
  }

  thisOnErrors(dt: Datatype, ...errs: DatatypeError[]): void {
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
    helper.L.trace(`setFalse: ${msg}`);
    this.errLatchMap.forEach((v, k) => {
      helper.L.info(`err countdown ${k}`);
      v.countDown();
    });
    this.stateLatchMap.forEach((v, k) => {
      helper.L.info(`state countdown ${k}`);
      v.countDown();
    });
  }

  getNewStateLatch(
    state: StateOfDatatype,
    latch?: CountDownLatch
  ): CountDownLatch {
    return this.stateLatchMap.getOrElseSet(
      state,
      latch ? latch : new CountDownLatch()
    );
  }

  getDatatypeErrLatch(
    code: DatatypeErrCodes,
    latch?: CountDownLatch
  ): CountDownLatch {
    return this.errLatchMap.getOrElseSet(
      code,
      latch ? latch : new CountDownLatch()
    );
  }

  getRemoteLatch(num: number): CountDownLatch {
    this.remoteLatch = new CountDownLatch(num);
    return this.remoteLatch;
  }

  thisOnStateChange(
    datatype: Datatype,
    oldState: StateOfDatatype,
    newState: StateOfDatatype
  ): void {
    const latch = this.stateLatchMap.get(newState);
    if (!latch) {
      this.setFalse(newState);
      return;
    }
    latch.countDown();
    this.stateLatchMap.delete(newState);
  }

  thisOnRemoteOperations(datatype: Datatype, opList: Operation[]): void {
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
