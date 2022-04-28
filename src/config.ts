import { OrdaLoggerFactory, OrdaLogLevel } from '@orda-io/orda-logger';
import { SyncType } from '@orda/types/client';

export class ClientConfig {
  collectionName: string;
  syncType: SyncType;
  serverAddr: string;
  notificationUri: string;
  customHeaders?: HeadersInit;
  loggerFactory: OrdaLoggerFactory;

  constructor(
    collectionName: string,
    syncType?: SyncType,
    serverAddr?: string,
    notificationUri?: string,
    customHeaders?: Map<string, string> | HeadersInit,
    logLevel?: OrdaLogLevel
  ) {
    this.collectionName = collectionName;
    this.syncType = syncType ? syncType : SyncType.LOCAL_ONLY;
    this.serverAddr = serverAddr ? serverAddr : '';
    this.notificationUri = notificationUri ? notificationUri : '';
    this.customHeaders = customHeaders instanceof Map ? this.transformHeadersInit(customHeaders) : customHeaders;
    if (logLevel === undefined) {
      this.loggerFactory = new OrdaLoggerFactory(OrdaLogLevel.TRACE);
    } else {
      this.loggerFactory = new OrdaLoggerFactory(logLevel);
    }
  }

  transformHeadersInit(customHeaders?: Map<string, string>): HeadersInit | undefined {
    if (!customHeaders) {
      return undefined;
    }
    const headers: HeadersInit = {};
    customHeaders.forEach((v, k) => (headers[k] = v));
    return headers;
  }
}
