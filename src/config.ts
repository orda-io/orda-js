import { OrdaLoggerFactory, OrdaLogLevel } from '@orda-io/orda-logger';
import { SyncType } from '@orda/types/client';
import { isBrowser } from '@orda/utils/browser_or_node';

export class ClientConfig {
  collectionName: string;
  syncType: SyncType;
  serverAddr: string;
  notificationUri: string;
  _customHeaders?: string[][];
  loggerFactory: OrdaLoggerFactory;

  constructor(
    collectionName: string,
    syncType?: SyncType,
    serverAddr?: string,
    notificationUri?: string,
    customHeaders?: string[][],
    logLevel?: OrdaLogLevel
  ) {
    this.collectionName = collectionName;
    this.syncType = syncType ? syncType : SyncType.LOCAL_ONLY;
    this.serverAddr = serverAddr ? serverAddr : '';
    this.notificationUri = notificationUri ? notificationUri : '';
    this._customHeaders = customHeaders;
    if (logLevel === undefined) {
      this.loggerFactory = new OrdaLoggerFactory(OrdaLogLevel.TRACE);
    } else {
      this.loggerFactory = new OrdaLoggerFactory(logLevel);
    }
  }

  public get customHeaders(): HeadersInit | undefined {
    if (!this._customHeaders) {
      return undefined;
    }
    const headers: HeadersInit = {};
    this._customHeaders.forEach((h) => (headers[h[0]] = h[1]));
    return headers;
  }

  public get customWsHeaders(): { [key: string]: string } | any | undefined {
    if (!this._customHeaders) {
      return undefined;
    }

    if (isBrowser) {
      const headers = new Map<string, string>();
      this._customHeaders.forEach((h: string[]) => {
        const key = h[0];
        headers.set(key, h[1]);
      });
      return headers;
    } else {
      const headers: { [key: string]: string } = {};
      this._customHeaders.forEach((h) => (headers[h[0]] = h[1]));
      return headers;
    }
  }
}
