import { Op } from '@orda/operations/operation';
import { BaseDatatype } from '@orda/datatypes/base';
import { ordaLogger } from '@orda/constants/constants';

export { logNew, logOp };

function logNew() {
  // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/explicit-module-boundary-types
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        ordaLogger.debug(this.toString());
      }
    };
  };
}

function logOp() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const datatype = this as BaseDatatype;
      let msg = `${propertyKey} (${datatype.opId.toString()})->(`;

      const method = originalMethod.apply(this, args);

      msg = msg.concat(datatype.opId.toString());

      for (const arg of args) {
        if (arg instanceof Op) {
          msg = msg.concat(`) ${arg.toString()} `);
        }
      }
      datatype.ctx.L.debug(`[🍡] ${msg}`);
      return method;
    };
  };
}
