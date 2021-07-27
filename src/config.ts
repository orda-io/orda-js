import { OrdaLoggerFactory, OrdaLogLevel } from '@orda-io/orda-logger';
import { SyncType } from '@orda/types/client';

export class ClientConfig {
  collectionName: string;
  syncType: SyncType;
  serverAddr: string;
  notificationUri: string;
  loggerFactory: OrdaLoggerFactory;

  constructor(
    collectionName: string,
    syncType?: SyncType,
    serverAddr?: string,
    notificationUri?: string,
    logLevel?: OrdaLogLevel
  ) {
    this.collectionName = collectionName;
    this.syncType = syncType ? syncType : SyncType.LOCAL_ONLY;
    this.serverAddr = serverAddr ? serverAddr : '';
    this.notificationUri = notificationUri ? notificationUri : '';
    if (logLevel === undefined) {
      this.loggerFactory = new OrdaLoggerFactory(OrdaLogLevel.TRACE);
    } else {
      this.loggerFactory = new OrdaLoggerFactory(logLevel);
    }
  }
}
