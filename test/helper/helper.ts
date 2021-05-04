import { OrtooLoggerFactory } from '@ooo/utils/ortoo_logger';
import { ClientContext } from '@ooo/context';
import { ClientModel, SyncType } from '@ooo/types/client';
import { createUID } from '@ooo/types/uid';
import { Suite } from 'mocha';
import { Client } from '@ooo/client';
import { ClientConfig } from '@ooo/config';
import { WireManager } from '@ooo/managers/wire';
import { MD5 } from 'crypto-js';
import { Api, ApiConfig } from '@ooo/generated/openapi';
import * as Assert from 'assert';

export { helper };

const testLoggerFactory = new OrtooLoggerFactory('trace');
const TestDB = 'ortoo-js-test';
const helper = {
  loggerFactory: testLoggerFactory,
  resetTestCollection: false,
  L: testLoggerFactory.getLogger('test'),

  getLocalClient(alias: string, wireManager?: WireManager): Client {
    const conf = new ClientConfig('ortoo-js-test', SyncType.LOCAL_ONLY);
    return new Client(conf, alias, wireManager);
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
    const ortoo = new Api(apiConfig);
    await ortoo.api
      .ortooServiceResetCollection(conf.collectionName)
      .then((response) => {
        this.L.debug(
          `reset collection '${response.data.collection}' successfully`
        );
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

  createClientContext(s: Suite): ClientContext {
    const cm = new ClientModel(
      createUID(),
      s.title.replace(/\s/g, ''),
      'test_collection',
      SyncType.LOCAL_ONLY
    );
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

  createClientConfig(
    collectionName: string,
    syncType?: SyncType
  ): ClientConfig {
    return new ClientConfig(
      collectionName,
      syncType ? syncType : SyncType.MANUALLY,
      'http://127.0.0.1:29862',
      'ws://127.0.0.1:18881/mqtt',
      'trace'
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
