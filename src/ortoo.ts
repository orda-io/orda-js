import { Client } from './client';
import { ClientConfig } from './config';
import { SyncType } from './protocols/protobuf/ortoo_pb';
import './polyfill';

export { Client };

// eslint-disable-next-line @typescript-eslint/no-var-requires
global.Buffer = global.Buffer || require('buffer').Buffer;

const ortoo = {
  createClient: (): Client => {
    const conf = new ClientConfig(
      'http://127.0.0.1:16091',
      'ws://127.0.0.1:9001',
      'hello_world',
      SyncType.LOCAL_ONLY
    );
    return new Client(conf, 'hello');
  },
};

export default ortoo;
