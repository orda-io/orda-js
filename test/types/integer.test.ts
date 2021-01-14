import {
  Int32,
  int32,
  Uint32,
  uint32,
  Uint64,
  uint64,
} from 'src/types/integer';

import { expect } from 'chai';

describe('Test Uint types', () => {
  it('Can create valid uint32 types', () => {
    expect(uint32().get()).to.equal(0n);
    expect(uint32(1).get()).to.equal(1n);
    expect(uint32(2n).get()).to.equal(2n);
    expect(uint32('3').get()).to.equal(3n);
    expect(uint32(Uint32.MAX_VALUE).get()).to.equal(Uint32.MAX_VALUE);
    const u32 = uint32(Uint32.MAX_VALUE);
    expect(uint32(u32).get()).to.equal(Uint32.MAX_VALUE);
  });

  it('Can create valid uint64 types', () => {
    expect(uint64().get()).to.equal(0n);
    expect(uint64(1).get()).to.equal(1n);
    expect(uint64(2n).get()).to.equal(2n);
    expect(uint64('3').get()).to.equal(3n);
    expect(uint64(Uint64.MAX_VALUE).get()).to.equal(Uint64.MAX_VALUE);
    const u64 = uint64(Uint64.MAX_VALUE);
    expect(uint64(u64).get()).to.equal(Uint64.MAX_VALUE);
  });

  it('Can create invalid uint types', () => {
    Uint32.enableRangeError = true;

    expect(() => {
      uint32(-1);
    }).to.throw(RangeError);
    expect(() => {
      uint32(-1n);
    }).to.throw(RangeError);
    expect(() => {
      uint32('-1');
    }).to.throw(RangeError);
    expect(() => {
      uint32(BigInt(Uint32.MAX_VALUE) + BigInt(1));
    }).to.throw(RangeError);
    expect(() => {
      uint64(BigInt(Uint64.MAX_VALUE) + BigInt(1));
    }).to.throw(RangeError);
    expect(() => {
      uint32('hello_world');
    }).to.throw(TypeError);
    expect(() => {
      const u64 = uint64(Uint64.MAX_VALUE);
      uint32(u64);
    }).to.throw(RangeError);
  });

  it('Can add two uints', () => {
    expect(uint32(10).add(1).get()).to.equal(11n);
    expect(uint32(10).add(-1).get()).to.equal(9n);
    expect(uint32(10).add(1n).get()).to.equal(11n);
    expect(uint32(10).add(-1n).get()).to.equal(9n);
    expect(uint32(10).add('1').get()).to.equal(11n);
    expect(uint32(10).add('-1').get()).to.equal(9n);
    expect(uint32(10).add(uint32(1)).get()).to.equal(11n);
    expect(uint32(10).add(uint64(1)).get()).to.equal(11n);

    Uint32.enableRangeError = false;
    expect(uint32(Uint32.MAX_VALUE).add(1).get()).to.equal(Uint32.MIN_VALUE);
  });

  it('Can sub two uints', () => {
    expect(uint32(10).sub(1).get()).to.equal(9n);
    expect(uint32(10).sub(-1).get()).to.equal(11n);
    expect(uint32(10).sub(1n).get()).to.equal(9n);
    expect(uint32(10).sub(-1n).get()).to.equal(11n);
    expect(uint32(10).sub('1').get()).to.equal(9n);
    expect(uint32(10).sub('-1').get()).to.equal(11n);
    expect(uint32(10).sub(uint32(1)).get()).to.equal(9n);
    expect(uint32(10).sub(uint64(1)).get()).to.equal(9n);

    Uint32.enableRangeError = false;
    expect(uint32(Uint32.MAX_VALUE).sub(-1).get()).to.equal(Uint32.MIN_VALUE);
    expect(uint64(Uint64.MAX_VALUE).sub(-1).get()).to.equal(Uint32.MIN_VALUE);
  });

  it('Can multiply/divide two uints', () => {
    expect(uint32(Uint32.MAX_VALUE).div(2).mul(2).get()).to.equal(
      BigInt(Uint32.MAX_VALUE) - 1n
    );

    expect(uint32(Uint32.MAX_VALUE).div(2n).mul(2n).get()).to.equal(
      BigInt(Uint32.MAX_VALUE) - 1n
    );

    expect(uint32(Uint32.MAX_VALUE).div('2').mul('2').get()).to.equal(
      BigInt(Uint32.MAX_VALUE) - 1n
    );
    expect(
      uint32(Uint32.MAX_VALUE).div(uint32(2)).mul(uint32(2)).get()
    ).to.equal(BigInt(Uint32.MAX_VALUE) - 1n);
    expect(
      uint32(Uint32.MAX_VALUE).div(uint64(2)).mul(uint64(2)).get()
    ).to.equal(BigInt(Uint32.MAX_VALUE) - 1n);

    Uint32.enableRangeError = true;
    expect(() => {
      uint32(Uint32.MAX_VALUE).mul(2).get();
    }).to.throw(RangeError);
    expect(() => {
      uint64(Uint64.MAX_VALUE).div(2).add(1).mul(2).get();
    }).to.throw(RangeError);
  });

  it('Can deal with overflow and underflow', () => {
    Int32.enableRangeError = false;
    expect(uint32(Uint32.MAX_VALUE).add(2).get()).to.equal(1n);

    const u32 = uint32(Uint32.MIN_VALUE)
      .add(BigInt(Uint32.MIN_VALUE) - BigInt(1n))
      .get();
    expect(u32).to.equal(Uint32.MAX_VALUE);

    const i32Max = int32(Int32.MAX_VALUE);
    expect(i32Max.add(1).get()).to.equal(Int32.MIN_VALUE);

    const i32Min = int32(Int32.MIN_VALUE);
    expect(i32Min.sub(1).get()).to.equal(Int32.MAX_VALUE);
  });
});
