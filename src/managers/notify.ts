import { ClientContext } from '@orda/context';
import * as mqtt from 'mqtt';
import { ClientConfig } from '@orda/config';
import { getAgent } from '@orda/constants/constants';
import {
  ClientSubscribeCallback,
  ISubscriptionGrant,
  OnConnectCallback,
  OnDisconnectCallback,
  OnErrorCallback,
  OnMessageCallback,
  PacketCallback,
} from 'mqtt/types/lib/client';
import { IConnackPacket, IDisconnectPacket, IPublishPacket, Packet } from 'mqtt-packet';
import { Uint64, uint64 } from '@orda-io/orda-integer';
import { ErrClient } from '@orda/errors/client';

const STATES = {
  NOT_CONNECTED: 'not_connected',
  CONNECTED: 'connected',
  CLOSED: 'closed',
} as const;
type STATES = typeof STATES[keyof typeof STATES];

const defaultKeepAlive = 60;
const defaultConnectTimeout = 10 * 1000;

export interface NotifyReceiver {
  onReceiveNotification(cuid: string, duid: string, key: string, sseq: Uint64): void;
}

export class NotifyManager {
  private readonly ctx: ClientContext;
  private readonly conf: ClientConfig;
  private readonly wsOpt: mqtt.IClientOptions;
  private readonly notificationUri: string;
  private receiver?: NotifyReceiver;

  private client?: mqtt.MqttClient;
  private states: STATES;
  private subscribeTopics: Map<string, string>;
  private unsubscribeTopics: Map<string, string>;

  constructor(conf: ClientConfig, ctx: ClientContext, receiver?: NotifyReceiver) {
    this.ctx = ctx;
    this.conf = conf;
    this.receiver = receiver;
    this.states = STATES.NOT_CONNECTED;

    this.wsOpt = {
      username: `${getAgent()}/${this.ctx.client.alias}`,
      protocolId: 'MQTT',
      keepalive: defaultKeepAlive,
      connectTimeout: defaultConnectTimeout,
      wsOptions: {
        headers: conf.customHeaders as any,
      },
    };

    this.ctx.L.debug(`[🔔] custom headers: ${JSON.stringify(this.wsOpt.wsOptions?.headers)}`);
    this.notificationUri = conf.notificationUri;
    this.subscribeTopics = new Map<string, string>();
    this.unsubscribeTopics = new Map<string, string>();
    this.ctx.L.debug(`[🔔👇] create notifyManager of ${this.ctx.client.alias} to ${this.notificationUri}`);
  }

  addNotifyReceiver(receiver?: NotifyReceiver): void {
    this.receiver = receiver;
  }

  public connect(): void {
    this.client = mqtt.connect(this.notificationUri, this.wsOpt);

    this.client.on('connect', this.onConnect);
    this.client.on('reconnect', this.onReconnect);
    this.client.on('packetreceive', this.onPacketReceive);
    this.client.on('packetsend', this.onPacketSend);
    this.client.on('disconnect', this.onConnectLost);
    this.client.on('message', this.onMessageArrived);
    this.client.on('error', this.onErrorCallback);

    this.ctx.L.debug(`[🔔] connect notifyManager`);
  }

  onReconnect = () => {
    this.ctx.L.debug(`[🔔] reconnect: ${JSON.stringify(this.client?.options.wsOptions)}`);
  };

  onPacketSend = (packet: Packet) => {
    // this.ctx.L.debug(`[🔔] packetSend: ${JSON.stringify(packet)}`);
  };

  onPacketReceive = (packet: Packet) => {
    // this.ctx.L.debug(`[🔔] packetReceive: ${JSON.stringify(packet)}`);
  };

  onConnect: OnConnectCallback = (packet: IConnackPacket) => {
    if (this.states === STATES.CLOSED) {
      this.ctx.L.debug('connected after closed');
      this.disconnect();
      return;
    }
    if (packet.cmd === 'connack') {
      this.ctx.L.debug(`[🔔] connected ${this.ctx.client.alias} by notifyManager to ${this.notificationUri}`);
      this.states = STATES.CONNECTED;
      if (this.subscribeTopics.size > 0) {
        this.subscribeDatatype();
      }
    } else {
      this.ctx.L.warn(`[🔔] fail to connect notifyManager: ${JSON.stringify(packet)}`);
    }
  };

  public onConnectLost: OnDisconnectCallback = (packet: IDisconnectPacket) => {
    this.ctx.L.info(`OnDisconnectCallback: ${JSON.stringify(packet)}`);
  };

  public onMessageArrived: OnMessageCallback = async (topic: string, payload: Buffer, packet: IPublishPacket) => {
    const notify = JSON.parse(payload.toString());
    if (this.ctx.client.cuid === notify.CUID) {
      // drain
      return;
    }
    if (!topic.startsWith(this.ctx.client.collection)) {
      this.ctx.L.error(`[🔔] mismatch collections ${this.ctx.client.collection} for ${topic}`);
      return;
    }
    const key = topic.substring(this.ctx.client.collection.length + 1);
    const notification = `Notification{cuid:${notify.CUID}, key:${key}, duid:${notify.DUID}, sseq:${notify.sseq}}`;
    this.ctx.L.debug(`[🔔🔻] receive ${notification}`);
    await this.receiver?.onReceiveNotification(notify.CUID, notify.DUID, key, uint64(notify.sseq));
    this.ctx.L.debug(`[🔔🔺] finish ${notification}`);
  };

  onErrorCallback: OnErrorCallback = (error: Error) => {
    this.ctx.L.warn(`[🔔] receive error in notifyManager: ${JSON.stringify(error)}`);
  };

  public isConnected(): boolean {
    return this.client ? this.client.connected : false;
  }

  public subscribeDatatype(...keys: string[]): void {
    if (keys.length > 0) {
      keys.forEach((k) => this.subscribeTopics.set(`${this.ctx.client.collection}/${k}`, k));
    }
    if (this.isConnected() && this.subscribeTopics.size > 0) {
      const topics = Array.from(this.subscribeTopics.keys());
      this.ctx.L.debug(`[🔔] subscribe ${topics}`);
      this.client?.subscribe(topics, { qos: 0 }, this.onSubscribe);
    }
  }

  public onSubscribe: ClientSubscribeCallback = (err: Error, granted: ISubscriptionGrant[]): void => {
    if (err) {
      this.ctx.L.warn(`[🔔] fail to subscribe: ${JSON.stringify(err)}`);
      throw new ErrClient.Subscribe(this.ctx.L, JSON.stringify(err));
    }

    granted.map((topic) => {
      this.ctx.L.debug(`[🔔] subscribe ${JSON.stringify(topic)}`);
      this.subscribeTopics.delete(topic.topic);
    });
  };

  onUnsubscribe: PacketCallback = (error?: Error, packet?: Packet) => {
    this.ctx.L.info(`${JSON.stringify(error)}, ${JSON.stringify(packet)}`);
  };

  public unsubscribeDatatype(...keys: string[]): void {
    if (keys.length > 0) {
      keys.forEach((k) => this.unsubscribeTopics.set(`${this.ctx.client.collection}/${k}`, k));
    }
    if (this.isConnected() && this.unsubscribeTopics.size > 0) {
      const topics = Array.from(this.unsubscribeTopics.keys());
      this.ctx.L.debug(`[🔔] unsubscribe ${topics}`);
      this.client?.unsubscribe(topics, this.onUnsubscribe);
    }
  }

  disconnect(): void {
    if (this.isConnected()) {
      this.client?.end();
      this.ctx.L.debug('[🔔👆] close notifyManager');
    }
    this.states = STATES.CLOSED;
  }
}
