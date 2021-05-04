import { Suite } from 'mocha';
import { CountDownLatch } from '@test/helper/countdown_latch';
import { expect } from 'chai';

describe('Test CountDownLatch', function (this: Suite): void {
  it('Can wait with CountDownLatch', async () => {
    const latch = new CountDownLatch(2);
    let a = 10;
    setTimeout(() => {
      a = 20;
      latch.countDown();
      a = 30;
      latch.countDown();
    }, 1000);
    expect(a).to.eq(10);
    await latch.wait();
    expect(a).to.eq(30);
  });
});
