import { OrtooLogger } from '../utils/logging';
import { ClientConfig } from '../config';
import { ClientModel } from '../protocols/client_model';
import mqtt from 'mqtt';
import { Packet } from 'mqtt-packet';

export class NotificationManager {
  private mqttClient: mqtt.Client;
  private Logger: OrtooLogger;

  constructor(conf: ClientConfig, cm: ClientModel, logger: OrtooLogger) {
    this.Logger = logger;
    this.mqttClient = mqtt.connect(conf.NotificationUri, {
      clean: true,
      clientId: cm.cuid,
      username: cm.getAlias(),
    });

    this.mqttClient.on('connect', this.onConnect);
    this.mqttClient.on('message', this.onMessage);
    this.mqttClient.on('error', this.onError);
    this.mqttClient.on('packetsend', this.onPacketSend);
    this.mqttClient.on('packetreceive', this.onPacketReceive);
  }

  private onPacketSend = (packet: Packet): void => {
    this.Logger.info('onPacketSend', packet);
  };

  private onPacketReceive = (packet: Packet): void => {
    this.Logger.info('onPacketReceive', packet);
  };

  private onConnect = (): void => {
    this.Logger.info('connect MQTT');
  };

  private onError = (error: Error): void => {
    this.Logger.info('error MQTT', error);
  };

  private onMessage = (topic: string, message: string): void => {
    this.Logger.info('Message:', message.toString());
  };

  subscribe(): void {
    this.mqttClient.subscribe('presence');
  }

  publish(): void {
    this.mqttClient.publish('presence', 'bin hier');
  }

  disconnect(): void {
    // this.Logger.info('is connected:', this.mqttPaho.isConnected());
    this.mqttClient.end();
  }
}
