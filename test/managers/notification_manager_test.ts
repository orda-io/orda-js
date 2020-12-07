import { NotificationManager } from '../../src/managers/notification_manager';
import { CreateLocalClientConfig } from '../../src/config';
import { Logger } from '../helper';

describe('Test notification manager', () => {
  it('Can connect MQTT server', async () => {
    const conf = CreateLocalClientConfig('hello_world');
    const mqttClient = new NotificationManager(
      conf,
      'test_mqtt_ortoojs',
      Logger,
    );
    mqttClient.connect();
    Logger.info('wait begin');
    await new Promise((resolve) => setTimeout(resolve, 5000));
    Logger.info('wait end');
    mqttClient.disconnect();
  });
});
