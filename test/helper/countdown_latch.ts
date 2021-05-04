type waitType =
  | ((value?: void | PromiseLike<void> | undefined) => void)
  | undefined;

export class CountDownLatch {
  private _count: number;
  private readonly _onZeroPromise: Promise<void>;
  private _reachedZero: waitType;

  constructor(count: number) {
    if (count < 0) {
      throw new Error('count cannot be negative');
    }
    this._count = count;
    this._onZeroPromise = new Promise((resolve) => {
      this._reachedZero = resolve;
    });
  }

  public countDown(): void {
    if (this._count > 0) {
      this._count -= 1;
      if (this._count === 0 && undefined !== this._reachedZero) {
        this._reachedZero();
      }
    }
  }

  public wait(): Promise<void> {
    return this._onZeroPromise;
  }

  public get count(): number {
    return this._count;
  }
}
