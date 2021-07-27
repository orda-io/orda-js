import { OrdaLogger, OrdaLoggerFactory } from '@orda-io/orda-logger';
import { ClientModel } from '@orda/types/client';
import { BaseDatatype } from '@orda/datatypes/base';
import { CUID } from '@orda/types/uid';
import { Mutex } from 'async-mutex';
import MutexInterface from 'async-mutex/lib/MutexInterface';

export class ClientContext {
  public loggerFactory: OrdaLoggerFactory;
  public client: ClientModel;
  private _L?: OrdaLogger;
  private lock: Mutex;
  private unlock?: MutexInterface.Releaser;

  constructor(cm: ClientModel, logFactory: OrdaLoggerFactory) {
    this.loggerFactory = logFactory;
    this.client = cm;
    this.lock = new Mutex();
  }

  async tryLock(name?: string): Promise<boolean> {
    if (this.lock.isLocked()) {
      this.L.info(`already locked: ${name}`);
      return Promise.resolve(false);
    }
    return await this.doLock(name);
  }

  async doLock(name?: string): Promise<boolean> {
    this.unlock = await this.lock.acquire();
    this.L.info(`[🔒] lock: ${name}`);
    return Promise.resolve(true);
  }

  doUnlock(name?: string): void {
    if (this.unlock) {
      this.unlock();
      this.L.info(`[🔓] unlock: ${name}`);
    }
  }

  get cuid(): CUID {
    return this.client.cuid;
  }

  get L(): OrdaLogger {
    if (!this._L) {
      this._L = this.loggerFactory.getLogger(this.getLogName());
    }
    return this._L;
  }

  getLogName(): string {
    return this.client.getLogName();
  }

  updateLogger(): void {
    this._L = this.loggerFactory.getLogger(this.getLogName());
  }
}

export class DatatypeContext extends ClientContext {
  public datatype?: BaseDatatype;

  constructor(clientContext: ClientContext, datatype?: BaseDatatype) {
    super(clientContext.client, clientContext.loggerFactory);
    this.datatype = datatype;
  }

  public getLogName(): string {
    return `${this.client.getLogName()}:${this.datatype?.key}:${this.datatype?.id}`;
  }
}
