import { NotificationManager } from '../../src/managers/notification';
import { CreateLocalClientConfig } from '../../src/config';
import { CreateClientModel, SyncType } from '../../src/protocols/client_model';
import { CUID } from '../../src/protocols/cuid';
import { OrtooContext } from '../../src/context';

describe('Test notification manager', () => {
  it('Can connect MQTT server', async () => {
    const conf = CreateLocalClientConfig('hello_world');
    const clientModel = CreateClientModel(
      new CUID(),
      it.name,
      'hello_world',
      SyncType.NOTIFIABLE
    );
    const ctx = new OrtooContext(clientModel, conf);
    const mqttClient = new NotificationManager(conf, ctx);
    // mqttClient.connect();
    // Logger.log('wait begin')();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // Logger.log('wait end')();
    mqttClient.disconnect();
  });
});
