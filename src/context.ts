import { OrtooLogger, OrtooLoggerFactory } from '@ooo/utils/ortoo_logger';
import { ClientModel } from '@ooo/types/client';
import { BaseDatatype } from '@ooo/datatypes/base';
import { CUID } from '@ooo/types/uid';

export class ClientContext {
  public loggerFactory: OrtooLoggerFactory;
  public client: ClientModel;
  private _L?: OrtooLogger;

  constructor(cm: ClientModel, logFactory: OrtooLoggerFactory) {
    this.loggerFactory = logFactory;
    this.client = cm;
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
    return `${this.client.getLogName()}:${
      this.datatype.key
    }:${this.datatype.id.toShortString()}`;
  }
}
