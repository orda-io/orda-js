import { Client } from './client';
import { ClientConfig } from './config';

// export { Client };

export default {
  createClient(): Client {
    const conf = new ClientConfig('', '', '');
    const c = new Client(conf, 'hello');
    return c;
  },
};
