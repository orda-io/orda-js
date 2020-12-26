import { NotificationManager } from '../../src/managers/notification';
import { CreateLocalClientConfig } from '../../src/config';
import { Logger } from '../helper';
import { CreateClientModel, SyncType } from '../../src/protocols/client_model';
import { CUID } from '../../src/protocols/cuid';

describe('Test notification manager', () => {
  it('Can connect MQTT server', async () => {
    const conf = CreateLocalClientConfig('hello_world');
    const clientModel = CreateClientModel(
      new CUID(),
      it.name,
      'hello_world',
      SyncType.NOTIFIABLE,
    );
    const mqttClient = new NotificationManager(conf, clientModel, Logger);
    // mqttClient.connect();
    Logger.info('wait begin');
    await new Promise((resolve) => setTimeout(resolve, 5000));
    Logger.info('wait end');
    mqttClient.disconnect();
  });
});
