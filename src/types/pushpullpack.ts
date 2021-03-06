import { CheckPoint } from '@orda/types/checkpoint';
import { uint32, Uint32 } from '@orda-io/orda-integer';
import { Op, OperationOa } from '@orda/operations/operation';
import { StateOfDatatype, TypeOfDatatype } from '@orda/types/datatype';
import { OrdaPushPullPack } from '@orda/generated/openapi';
import { OrdaLogger } from '@orda-io/orda-logger';
import { convertFromOpenApiOperation } from '@orda/operations/converter';

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
  duid: string;
  key: string;
  type: TypeOfDatatype;
  checkPoint: CheckPoint;
  option: number;
  era: Uint32;
  opList: Op[];

  constructor(
    duid: string,
    key: string,
    type: TypeOfDatatype,
    checkPoint: CheckPoint,
    era: Uint32,
    option: number,
    opList: Op[]
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
    let ret = `{ ${this.type} ${this.key}(${this.duid}) ${this.checkPoint.toString()}, era:${
      this.era
    } ${PPOptions.toString(this.option)} (${this.opList.length})[ `;
    for (const op of this.opList) {
      const opStr = op.toString();
      ret = ret.concat(opStr).concat(' ');
    }
    return ret.concat('] }');
  }

  toJSON(): string {
    return this.toString();
  }

  get operationOaList(): OperationOa[] {
    const pbOpList = new Array<OperationOa>();
    this.opList.forEach((op) => pbOpList.push(op.toOpenApi()));
    return pbOpList;
  }

  toOpenApi(): OrdaPushPullPack {
    return {
      DUID: this.duid,
      key: this.key,
      option: this.option,
      checkPoint: this.checkPoint.toOpenApi(),
      era: this.era.asNumber(),
      type: this.type,
      operations: this.operationOaList,
    };
  }

  static fromOpenApi(ppp: OrdaPushPullPack, logger?: OrdaLogger): PushPullPack {
    const opList: Op[] = new Array<Op>();
    if (ppp.operations) {
      for (const oop of ppp.operations) {
        opList.push(convertFromOpenApiOperation(oop, logger));
      }
    }

    return new PushPullPack(
      ppp.DUID!,
      ppp.key!,
      ppp.type ? ppp.type : TypeOfDatatype.COUNTER,
      CheckPoint.fromOpenApi(ppp.checkPoint!),
      ppp.era ? uint32(ppp.era) : uint32(0),
      ppp.option ? ppp.option : PushPullOptions.normal,
      opList
    );
  }
}
