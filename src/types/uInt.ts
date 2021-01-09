type NumericType = number | BigInt | string;

abstract class UInt {
  constructor(numeric?: NumericType) {}

  protected abstract getMax(): BigInt;

  protected getMin(): BigInt {
    return 0n;
  }
}

export class UInt32 extends UInt {
  public static MAX_VALUE: BigInt = 4294967295n;

  protected getMax(): BigInt {
    return UInt32.MAX_VALUE;
  }
}

export class UInt64 extends UInt {
  public static MAX_VALUE: BigInt = 18446744073709551615n;

  protected getMax(): BigInt {
    return UInt64.MAX_VALUE;
  }
}
