import { OrdaLoggerFactory, OrdaLogLevel } from '@orda-io/orda-logger';
import { SyncType } from '@orda/types/client';

export class ClientConfig {
  collectionName: string;
  syncType: SyncType;
  serverAddr: string;
  notificationUri: string;
  customHeaders?: Map<string, string>;
  loggerFactory: OrdaLoggerFactory;

  constructor(
    collectionName: string,
    syncType?: SyncType,
    serverAddr?: string,
    notificationUri?: string,
    customHeaders?: Map<string, string>,
    logLevel?: OrdaLogLevel
  ) {
    this.collectionName = collectionName;
    this.syncType = syncType ? syncType : SyncType.LOCAL_ONLY;
    this.serverAddr = serverAddr ? serverAddr : '';
    this.notificationUri = notificationUri ? notificationUri : '';
    this.customHeaders = customHeaders;
    if (logLevel === undefined) {
      this.loggerFactory = new OrdaLoggerFactory(OrdaLogLevel.TRACE);
    } else {
      this.loggerFactory = new OrdaLoggerFactory(logLevel);
    }
  }

  public get customHeadersInit(): HeadersInit | undefined {
    if (!this.customHeaders) {
      return undefined;
    }
    const headers: HeadersInit = {};
    this.customHeaders.forEach((h) => (headers[h[0]] = h[1]));
    return headers;
  }
}
