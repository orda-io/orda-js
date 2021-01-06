import { OrtooLogger, OrtooLoggerFactory } from './utils/ortoo_logger';
import { ClientModel } from './protocols/client_model';
import { ClientConfig } from './config';

export class OrtooContext {
  private loggerFactory: OrtooLoggerFactory;
  public client: ClientModel;
  public L: OrtooLogger;

  constructor(cm: ClientModel, conf: ClientConfig) {
    this.loggerFactory = new OrtooLoggerFactory(conf.LogLevel);
    this.client = cm;
    this.L = this.loggerFactory.getLogger(cm.getLogName());
  }
}
