import { OrtooLoggerFactory } from '@ooo/utils/ortoo_logger';
import { ClientContext } from '@ooo/context';
import { ClientModel } from '@ooo/types/client';
import { CUID } from '@ooo/types/uid';
import { Suite } from 'mocha';
import { Client } from '@ooo/client';
import { ClientConfig } from '@ooo/config';
import { WireManager } from '@ooo/managers/wire';
import { MD5 } from 'crypto-js';
import { SyncType } from '@ooo/generated/proto';
export { helper };

const testLoggerFactory = new OrtooLoggerFactory('trace');

const helper = {
  loggerFactory: testLoggerFactory,

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

  createClientContext(s: Suite): ClientContext {
    const cm = new ClientModel(
      new CUID(),
      s.title.replace(/\s/g, ''),
      'test_collection',
      SyncType.LOCAL_ONLY
    );
    return new ClientContext(cm, testLoggerFactory);
  },
};
