import { OrtooLoggerFactory } from '@ooo/utils/ortoo_logger';
import { ClientContext } from '@ooo/context';
import { ClientModel, SyncType } from '@ooo/types/client';
import { CUID } from '@ooo/types/uid';
import { Suite } from 'mocha';
import { Client } from '@ooo/client';
import { ClientConfig } from '@ooo/config';

export { helper };

const testLoggerFactory = new OrtooLoggerFactory('trace');

const testLogger = testLoggerFactory.getLogger('test');

const helper = {
  loggerFactory: testLoggerFactory,

  L: testLogger,

  getLocalClient(alias: string): Client {
    const conf = new ClientConfig('ortoo-js-test', SyncType.LOCAL_ONLY);
    return new Client(conf, 'ortoo-js-test-client');
  },

  getDatatypeName(s: Suite): string {
    return s.ctx.test ? s.ctx.test.title.replace(/\s/g, '') : 'none';
  },

  getClientName(s: Suite): string {
    return s.title.replace(/\s/g, '');
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
