import { Client } from './client';
import { ClientConfig } from './config';
import { SyncType } from './protocols/protobuf/ortoo_pb';

export { Client };
global.Buffer = global.Buffer || require('buffer').Buffer;
const ortoo = {
  createClient: (): Client => {

    const conf = new ClientConfig('http://127.0.0.1:16091',
      'ws://127.0.0.1:9001',
      'hello_world',
      SyncType.LOCAL_ONLY);
    const c = new Client(conf, 'hello');
    return c;
  },
};
export default ortoo;
