export type NumericType = number | BigInt | string | Uint;

const errs = {
  TypeErr: (e: NumericType | undefined): TypeError => {
    return new TypeError('unsupported type:' + typeof e + '(' + e + ')');
  },
  RangeErr: (n: NumericType | undefined): RangeError => {
    return new RangeError('unsupported range:' + n);
  },
};

abstract class Uint {
  private num: BigInt;

  constructor(numeric?: NumericType) {
    this.num = this.validate(numeric);
  }

  protected abstract getMax(): BigInt;

  protected abstract getMin(): BigInt;

  protected transform(numeric?: NumericType): BigInt {
    switch (typeof numeric) {
      case 'undefined':
        return 0n;
      case 'number':
      case 'bigint':
        return BigInt(numeric);
      case 'string':
        try {
          return BigInt(numeric);
        } catch (e) {
          throw errs.TypeErr(numeric);
        }
      case 'object':
        return (numeric as Uint).num;
      default:
        throw errs.TypeErr(numeric);
    }
  }

  protected validate(numeric?: NumericType): BigInt {
    const num: BigInt = this.transform(numeric);
    if (num >= this.getMin() && num <= this.getMax()) {
      return num;
    }
    throw errs.RangeErr(numeric);
  }

  public add(numeric?: NumericType): Uint {
    const result: BigInt = BigInt(this.num) + BigInt(this.transform(numeric));
    this.num = this.validate(result);
    return this;
  }

  public sub(numeric?: NumericType): Uint {
    const result: BigInt = BigInt(this.num) - BigInt(this.transform(numeric));
    this.num = this.validate(result);
    return this;
  }

  public mul(numeric?: NumericType): Uint {
    const result: BigInt = BigInt(this.num) * BigInt(this.transform(numeric));
    this.num = this.validate(result);
    return this;
  }

  public div(numeric?: NumericType): Uint {
    const result: BigInt = BigInt(this.num) / BigInt(this.transform(numeric));
    this.num = this.validate(result);
    return this;
  }

  public get(): BigInt {
    return this.num;
  }

  public toString(radix?: number): string {
    return this.num.toString(radix);
  }
}

class Uint32 extends Uint {
  public static MAX_VALUE: BigInt = 4294967295n;

  protected getMax(): BigInt {
    return Uint32.MAX_VALUE;
  }

  protected getMin(): BigInt {
    return 0n;
  }
}

class Uint64 extends Uint {
  public static MAX_VALUE: BigInt = 18446744073709551615n;

  protected getMax(): BigInt {
    return Uint64.MAX_VALUE;
  }

  protected getMin(): BigInt {
    return 0n;
  }
}

function uint32(num?: NumericType): Uint32 {
  return new Uint32(num);
}

function uint64(num?: NumericType): Uint64 {
  return new Uint64(num);
}

export { Uint32, Uint64, uint32, uint64 };
