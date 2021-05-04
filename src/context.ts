import { OrtooLogger, OrtooLoggerFactory } from '@ooo/utils/ortoo_logger';
import { ClientModel } from '@ooo/types/client';
import { BaseDatatype } from '@ooo/datatypes/base';
import { CUID } from '@ooo/types/uid';
import { Mutex } from 'async-mutex';
import MutexInterface from 'async-mutex/lib/MutexInterface';

export class ClientContext {
  public loggerFactory: OrtooLoggerFactory;
  public client: ClientModel;
  private _L?: OrtooLogger;
  private lock: Mutex;
  private unlock?: MutexInterface.Releaser;

  constructor(cm: ClientModel, logFactory: OrtooLoggerFactory) {
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
    this.L.info(`lock: ${name}`);
    return Promise.resolve(true);
  }

  doUnlock(name?: string): void {
    if (this.unlock) {
      this.unlock();
      this.L.info(`unlock: ${name}`);
    }
  }

  get cuid(): CUID {
    return this.client.cuid;
  }

  get L(): OrtooLogger {
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
  public datatype: BaseDatatype;

  constructor(clientContext: ClientContext, datatype: BaseDatatype) {
    super(clientContext.client, clientContext.loggerFactory);
    this.datatype = datatype;
  }

  public getLogName(): string {
    return `${this.client.getLogName()}:${this.datatype.key}:${
      this.datatype.id
    }`;
  }
}
