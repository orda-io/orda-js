import { OrtooLogger, OrtooLoggerFactory } from '@ooo/utils/ortoo_logger';
import { ClientModel } from '@ooo/types/client';
import { BaseDatatype } from '@ooo/datatypes/base';

export class ClientContext {
  public loggerFactory: OrtooLoggerFactory;
  public client: ClientModel;
  public L: OrtooLogger;

  constructor(cm: ClientModel, logFactory: OrtooLoggerFactory) {
    this.loggerFactory = logFactory;
    this.client = cm;
    this.L = this.loggerFactory.getLogger(this.client.getLogName());
  }
}

export class DatatypeContext extends ClientContext {
  public datatype: BaseDatatype;

  constructor(clientContext: ClientContext, datatype: BaseDatatype) {
    super(clientContext.client, clientContext.loggerFactory);
    this.datatype = datatype;
    this.L = this.loggerFactory.getLogger(this.getLogName());
  }

  public getLogName(): string {
    return `${this.client.getLogName()}:${
      this.datatype.key
    }:${this.datatype.id.toShortString()}`;
  }
}
