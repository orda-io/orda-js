import { ClientConfig } from '@ooo/config';
// import mqtt from 'mqtt';
// import { Packet } from 'mqtt-packet';
import { ClientContext } from '@ooo/context';

export class NotificationManager {
  private readonly ctx: ClientContext;
  private readonly notificationUri: string;
  // private mqttClient: mqtt.Client | null = null;

  constructor(conf: ClientConfig, ctx: ClientContext) {
    this.ctx = ctx;
    this.notificationUri = conf.notificationUri;
  }

  public connect(): void {
    // this.mqttClient = mqtt.connect(this.notificationUri, {
    //   clean: true,
    //   clientId: this.ctx.client.cuid.toString(),
    //   username: this.ctx.client.alias,
    // });
    //
    // this.mqttClient.on('connect', this.onConnect);
    // this.mqttClient.on('message', this.onMessage);
    // this.mqttClient.on('error', this.onError);
    // this.mqttClient.on('packetsend', this.onPacketSend);
    // this.mqttClient.on('packetreceive', this.onPacketReceive);
  }

  // private onConnect: mqtt.OnConnectCallback = (packet: Packet): void => {
  //   this.ctx.L.info('connect MQTT:', packet);
  // };
  //
  // private onMessage: mqtt.OnMessageCallback = (
  //   topic: string,
  //   payload: Buffer,
  //   packet: Packet
  // ): void => {
  //   this.ctx.L.info('Message:', topic.toString());
  // };
  //
  // private onError: mqtt.OnErrorCallback = (error: Error): void => {
  //   this.ctx.L.info('error MQTT', error);
  // };

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
