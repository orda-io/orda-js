import { ClientConfig } from '../config';
import mqtt from 'mqtt';
import { Packet } from 'mqtt-packet';
import { OrtooContext } from '../context';

export class NotificationManager {
  private readonly ctx: OrtooContext;
  private readonly notificationUri: string;
  private mqttClient: mqtt.Client | null = null;

  constructor(conf: ClientConfig, ctx: OrtooContext) {
    this.ctx = ctx;
    this.notificationUri = conf.NotificationUri;
  }

  public connect(): void {
    this.mqttClient = mqtt.connect(this.notificationUri, {
      clean: true,
      clientId: this.ctx.client.cuid,
      username: this.ctx.client.getAlias(),
    });

    this.mqttClient.on('connect', this.onConnect);
    this.mqttClient.on('message', this.onMessage);
    this.mqttClient.on('error', this.onError);
    // this.mqttClient.on('packetsend', this.onPacketSend);
    // this.mqttClient.on('packetreceive', this.onPacketReceive);
  }

  private onConnect: mqtt.OnConnectCallback = (packet: Packet): void => {
    this.ctx.L.info('connect MQTT:', packet);
  };

  private onMessage: mqtt.OnMessageCallback = (
    topic: string,
    payload: Buffer,
    packet: Packet
  ): void => {
    this.ctx.L.info('Message:', topic.toString());
  };

  private onError: mqtt.OnErrorCallback = (error: Error): void => {
    this.ctx.L.info('error MQTT', error);
  };

  // private onPacketSend: mqtt.OnConnectCallback = (packet: Packet): void => {
  //   this.Logger.info('onPacketSend', packet);
  // };
  //
  // private onPacketReceive = (packet: Packet): void => {
  //   this.Logger.info('onPacketReceive', packet);
  // };

  subscribe(topic: string): void {
    // this.mqttClient?.subscribe(topic);
  }

  disconnect(): void {
    // this.mqttClient?.end();
  }
}
