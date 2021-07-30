import { OrdaLoggerFactory } from '@orda-io/orda-logger';
import { ClientContext, DatatypeContext } from '@orda/context';
import { ClientModel, SyncType } from '@orda/types/client';
import { createUID } from '@orda/types/uid';
import { Suite } from 'mocha';
import { Client } from '@orda/client';
import { ClientConfig } from '@orda/config';
import { WireManager } from '@orda/managers/wire';
import { MD5 } from 'crypto-js';
import { Api, ApiConfig } from '@orda/generated/openapi';
import * as Assert from 'assert';
import { OrdaLogLevel } from '@orda-io/orda-logger';

export { helper };

const testLoggerFactory = new OrdaLoggerFactory(OrdaLogLevel.TRACE);
export const TestDB = 'orda-js-test';
const helper = {
  loggerFactory: testLoggerFactory,
  resetTestCollection: false,
  L: testLoggerFactory.getLogger('test'),

  getLocalClient(alias: string, wireManager?: WireManager): Client {
    const conf = new ClientConfig('orda-js-test', SyncType.LOCAL_ONLY);
    return new Client(conf, alias, undefined, wireManager);
  },

  dtName(s: Suite): string {
    const postfix = MD5(s.ctx.test?.title!).toString();
    return `crdt-${postfix.slice(28)}`;
  },

  ctName(s: Suite, additional?: unknown): string {
    let name = MD5(s.title!).toString().slice(28);
    if (additional) {
      name = name.concat(`-${additional}`);
    }
    return `client-${name}`;
  },

  async resetCollection(conf: ClientConfig): Promise<void> {
    const apiConfig: ApiConfig = {
      baseUrl: conf.serverAddr,
    };
    const orda = new Api(apiConfig);
    await orda.api
      .ordaServiceResetCollection(conf.collectionName)
      .then((response) => {
        this.L.debug(`reset collection '${response.data.collection}' successfully`);
      })
      .catch((err) => {
        this.L.error(err);
        Assert.fail(err);
      });
  },

  sleep(sec: number): Promise<void> {
    this.L.info(`sleep ${sec}s`);
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
  },

  createDatatypeContext(s: Suite): DatatypeContext {
    return new DatatypeContext(this.createClientContext(s));
  },

  createClientContext(s: Suite): ClientContext {
    const cm = new ClientModel(createUID(), s.title.replace(/\s/g, ''), 'test_collection', SyncType.LOCAL_ONLY);
    return new ClientContext(cm, testLoggerFactory);
  },

  async createTestClientConfig(syncType?: SyncType): Promise<ClientConfig> {
    const conf = this.createClientConfig(TestDB, syncType);
    if (!this.resetTestCollection) {
      this.resetTestCollection = true;
      this.L.debug(`RESET Test Collection: ${conf.collectionName}`);
      await this.resetCollection(conf);
    }
    return conf;
  },

  createClientConfig(collectionName: string, syncType?: SyncType): ClientConfig {
    return new ClientConfig(
      collectionName,
      syncType ? syncType : SyncType.MANUALLY,
      'http://127.0.0.1:29862',
      'ws://127.0.0.1:18881/mqtt',
      OrdaLogLevel.TRACE
    );
  },
};

export const waiter = function (timeout: number): Promise<void> {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject();
    }, timeout);
  });
};
