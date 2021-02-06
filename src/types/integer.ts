import { ortooLogger } from '@ooo/utils/ortoo_logger';

export { Uint32, Uint64, Int32, Int64 };
export { uint32, uint64, int32, int64 };
export type NumericType = number | BigInt | string | Int;

let enableRangeError = false;

const errs = {
  TypeErr: (e: NumericType | undefined): TypeError => {
    return new TypeError('unsupported type:' + typeof e + '(' + e + ')');
  },
  RangeErr: (n: NumericType | undefined): RangeError => {
    return new RangeError('unsupported range:' + n);
  },
};

abstract class Int {
  private num: BigInt;

  constructor(numeric?: NumericType) {
    this.num = this.validate(numeric, true);
  }

  static get enableRangeError(): boolean {
    return enableRangeError;
  }

  static set enableRangeError(value: boolean) {
    enableRangeError = value;
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
        return (numeric as Int).num;
      default:
        throw errs.TypeErr(numeric);
    }
  }

  protected validate(numeric?: NumericType, throwError = false): BigInt {
    const num: BigInt = this.transform(numeric);
    if (num >= this.getMin() && num <= this.getMax()) {
      return num;
    }
    if (Int.enableRangeError || throwError) {
      throw new RangeError(
        `value ${num} is out of range: ${this.getMin()} <= n <= ${this.getMax()} is allowed`
      );
    }
    if (num > this.getMax()) {
      return BigInt(this.getMin()) + (BigInt(num) & BigInt(this.getMax()));
    }
    // if(num < this.getMin()) {
    return ~(BigInt(-num) - 1n) & BigInt(this.getMax());
  }

  public add(numeric: NumericType = 1): this {
    const result: BigInt = BigInt(this.num) + BigInt(this.transform(numeric));
    this.num = this.validate(result);
    return this;
  }

  public sub(numeric: NumericType = 1): this {
    const result: BigInt = BigInt(this.num) - BigInt(this.transform(numeric));
    this.num = this.validate(result);
    return this;
  }

  public mul(numeric: NumericType): this {
    const result: BigInt = BigInt(this.num) * BigInt(this.transform(numeric));
    this.num = this.validate(result);
    return this;
  }

  public div(numeric: NumericType): this {
    const result: BigInt = BigInt(this.num) / BigInt(this.transform(numeric));
    this.num = this.validate(result);
    return this;
  }

  public clone<T extends Int>(c: new (n?: NumericType) => T): T {
    if (this instanceof Uint32) {
      return new c(this.num);
    }
    return new c(this.num);
  }

  public compare(other: this): number {
    const diff = BigInt(this.num) - BigInt(other.num);
    return Number(diff);
  }

  public get(): BigInt {
    return this.num;
  }

  public toString(radix?: number): string {
    return this.num.toString(radix);
  }

  public asNumber(): number {
    return Number(this.num);
  }

  toJSON(): number {
    return Number(this.num);
  }

  public static add<T extends Int>(
    this: new (num?: NumericType) => T,
    a: NumericType,
    b: NumericType
  ): T {
    return new this(a).add(b) as T;
  }

  public static sub<T extends Int>(
    this: new (num?: NumericType) => T,
    a: NumericType,
    b: NumericType
  ): T {
    return new this(a).sub(b) as T;
  }

  public static mul<T extends Int>(
    this: new (num?: NumericType) => T,
    a: NumericType,
    b: NumericType
  ): T {
    return new this(a).mul(b) as T;
  }

  public static div<T extends Int>(
    this: new (num?: NumericType) => T,
    a: NumericType,
    b: NumericType
  ): T {
    return new this(a).div(b) as T;
  }
}

class Uint32 extends Int {
  public static MIN_VALUE: BigInt = 0n;
  public static MAX_VALUE: BigInt = 4294967295n;

  protected getMax(): BigInt {
    return Uint32.MAX_VALUE;
  }

  protected getMin(): BigInt {
    return 0n;
  }
}

class Uint64 extends Int {
  public static MIN_VALUE: BigInt = 0n;
  public static MAX_VALUE: BigInt = 18446744073709551615n;

  protected getMax(): BigInt {
    return Uint64.MAX_VALUE;
  }

  protected getMin(): BigInt {
    return 0n;
  }
}

class Int32 extends Int {
  public static MIN_VALUE: BigInt = -2147483648n;
  public static MAX_VALUE: BigInt = 2147483647n;

  protected getMax(): BigInt {
    return Int32.MAX_VALUE;
  }

  protected getMin(): BigInt {
    return Int32.MIN_VALUE;
  }
}

class Int64 extends Int {
  public static MIN_VALUE: BigInt = -9223372036854775808n;
  public static MAX_VALUE: BigInt = 9223372036854775807n;

  protected getMax(): BigInt {
    return Int64.MAX_VALUE;
  }

  protected getMin(): BigInt {
    return Int64.MIN_VALUE;
  }
}

function uint32(num?: NumericType): Uint32 {
  return new Uint32(num);
}

function uint64(num?: NumericType): Uint64 {
  return new Uint64(num);
}

function int32(num?: NumericType): Int32 {
  return new Int32(num);
}

function int64(num?: NumericType): Int64 {
  return new Int64(num);
}
