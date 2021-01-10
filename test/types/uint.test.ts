import { uint32, Uint32, uint64, Uint64 } from '../../src/types/uint';

import { expect } from 'chai';

// import UInt64 = arith.UInt64;
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
    expect(() => {
      uint32(Uint32.MAX_VALUE).add(1).get();
    }).to.throw(RangeError);
    expect(() => {
      uint64(Uint64.MAX_VALUE).add(1).get();
    }).to.throw(RangeError);
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
    expect(() => {
      uint32(Uint32.MAX_VALUE).sub(-1).get();
    }).to.throw(RangeError);
    expect(() => {
      uint64(Uint64.MAX_VALUE).sub(-1).get();
    }).to.throw(RangeError);
  });
  it('Can multiply/divide two uints', () => {
    // 4294967295n / 2  * 2 = 4294967294n
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
    expect(() => {
      uint32(Uint32.MAX_VALUE).mul(2).get();
    }).to.throw(RangeError);
    expect(() => {
      uint64(Uint64.MAX_VALUE).div(2).add(1).mul(2).get();
    }).to.throw(RangeError);
  });
});
