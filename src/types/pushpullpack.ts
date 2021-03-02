import { DUID } from '@ooo/types/uid';
import { CheckPoint } from '@ooo/types/checkpoint';
import { Uint32 } from '@ooo/types/integer';
import { Operation, OperationOa } from '@ooo/operations/operation';
import { StateOfDatatype, TypeOfDatatype } from '@ooo/types/datatype';
// import { OrtooStateOfDatatype as StateOfDatatype } from '@ooo/generated/openapi';

export { PushPullPack, PushPullOptions, PPOptions };

const optionStrings = {
  0x01: 'cr',
  0x02: 'sb',
  0x04: 'un',
  0x08: 'de',
  0x10: 'sn',
  0x20: 'er',
};

const PPOptions = {
  setOption: function (state: StateOfDatatype): number {
    let option = PushPullOptions.normal;
    switch (state) {
      case StateOfDatatype.DUE_TO_CREATE:
        option |= PushPullOptions.create;
        break;
      case StateOfDatatype.DUE_TO_SUBSCRIBE:
        option |= PushPullOptions.subscribe;
        break;
      case StateOfDatatype.DUE_TO_SUBSCRIBE_CREATE:
        option |= PushPullOptions.create | PushPullOptions.subscribe;
        break;
    }
    return option;
  },
  hasCreate: (option: number): boolean => {
    return (option & PushPullOptions.create) > 0;
  },
  hasSubscribe: (option: number): boolean => {
    return (option & PushPullOptions.subscribe) > 0;
  },
  hasUnsubscribe: (option: number): boolean => {
    return (option & PushPullOptions.unsubscribe) > 0;
  },
  hasSnapshot: (option: number): boolean => {
    return (option & PushPullOptions.snapshot) > 0;
  },
  hasError: (option: number): boolean => {
    return (option & PushPullOptions.error) > 0;
  },

  toString(option: number): string {
    let ret = '[ ';
    for (const [key, value] of Object.entries(optionStrings)) {
      const keyNum = parseInt(key);
      if (!(keyNum & option)) {
        ret = ret.concat(value, ' ');
      } else {
        ret = ret.concat(value.toUpperCase(), ' ');
      }
    }
    return ret.concat(']');
  },
};

const PushPullOptions = {
  normal: 0x00,
  create: 0x01,
  subscribe: 0x02,
  unsubscribe: 0x04,
  delete: 0x08,
  snapshot: 0x10,
  error: 0x20,
};

class PushPullPack {
  duid: DUID;
  key: string;
  type: TypeOfDatatype;
  checkPoint: CheckPoint;
  option: number;
  era: Uint32;
  opList: Operation[];

  constructor(
    duid: DUID,
    key: string,
    type: TypeOfDatatype,
    checkPoint: CheckPoint,
    era: Uint32,
    option: number,
    opList: Operation[]
  ) {
    this.duid = duid;
    this.key = key;
    this.type = type;
    this.option = option;
    this.checkPoint = checkPoint;
    this.era = era;
    this.opList = opList;
  }

  toString(): string {
    let ret = `{ ${this.type} ${
      this.key
    }(${this.duid.toShortString()}) ${this.checkPoint.toString()}, era:${
      this.era
    } ${PPOptions.toString(this.option)} (${this.opList.length})[ `;
    for (const op of this.opList) {
      const opStr = op.toString();
      ret = ret.concat(opStr);
    }
    return ret.concat('] }');
  }

  get operationOaList(): OperationOa[] {
    const pbOpList = new Array<OperationOa>();
    this.opList.forEach((op) => pbOpList.push(op.toOpenApi()));
    return pbOpList;
  }

  // toPb(): PushPullPackPb {
  //   const pb = new PushPullPackPb();
  //   pb.setEra(this.era.asNumber());
  //   pb.setKey(this.key);
  //   pb.setType(this.type);
  //   pb.setCheckpoint(this.checkPoint.toPb());
  //   pb.setDuid(this.duid.AsUint8Array);
  //   pb.setOperationsList(this.pbOpList);
  //   pb.setOption(this.option.valueOf());
  //
  //   return pb;
  // }
}
