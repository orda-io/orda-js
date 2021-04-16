import { ClientConfig } from '@ooo/config';
import { ClientContext } from '@ooo/context';
import type { OnConnectionLostHandler, OnMessageHandler } from 'paho-mqtt';
import Paho, {
  ErrorWithInvocationContext,
  Message,
  MQTTError,
  OnSubscribeSuccessCallback,
  OnSubscribeSuccessParams,
  OnSuccessCallback,
} from 'paho-mqtt';

// without mqtt, mqtt-packet 83K
// with mqtt, mqtt-packet 267K
// with paho-mqtt 114K

const STATES = {
  NOT_CONNECTED: 'not_connected',
  CONNECTED: 'connected',
  CLOSED: 'closed',
} as const;
type STATES = typeof STATES[keyof typeof STATES]; // 'iOS' | 'Android'

export class NotifyManager {
  private readonly ctx: ClientContext;
  private readonly notificationUri: string;
  private client: Paho.Client;

  private states: STATES;

  constructor(conf: ClientConfig, ctx: ClientContext) {
    this.ctx = ctx;
    this.notificationUri = conf.notificationUri;
    this.client = new Paho.Client(
      this.notificationUri,
      this.ctx.client.cuid.toString()
    );
    this.client.onConnectionLost = this.onConnectLost;
    this.client.onMessageArrived = this.onMessageArrived;
    this.states = STATES.NOT_CONNECTED;
    this.ctx.L.debug(
      `[🔔] create notifyManager of ${this.ctx.client.alias} to ${this.notificationUri}`
    );
  }

  public connect(): void {
    this.ctx.L.debug('[🔔🔻] connect notifyManager');
    this.client.connect({
      onSuccess: this.onConnect,
    });
  }

  public isConnected(): boolean {
    return this.client.isConnected();
  }

  public subscribeDatatype(key: string): void {
    const topic = `${this.ctx.client.collection}/${key}`;
    this.client.subscribe(topic, {
      qos: 0,
      /** passed to the onSuccess callback or onFailure callback. */
      // invocationContext?: any;
      /** called when the subscribe acknowledgement has been received from the server. */
      onSuccess: this.onSuccessSubscribe,
      onFailure: (e: ErrorWithInvocationContext) => void {},
    });
    // this.client.send();
  }

  onSuccessSubscribe: OnSubscribeSuccessCallback = (
    o: OnSubscribeSuccessParams
  ) => {
    this.ctx.L.info(`${o}`);
  };

  public subscribe(topic: string): void {
    this.client.subscribe(topic);
    this.client.send(topic, '');
  }

  public onConnect: OnSuccessCallback = (o) => {
    if (this.states === STATES.CLOSED) {
      this.ctx.L.debug('connected after closed');
      this.disconnect();
      return;
    }
    this.ctx.L.debug(
      `[🔔🔻] connected ${this.ctx.client.alias} by notifyManager to ${this.notificationUri}`
    );
    this.states = STATES.CONNECTED;
  };

  private onConnectLost: OnConnectionLostHandler = (error: MQTTError) => {
    if (error.errorCode !== 0)
      this.ctx.L.debug(
        `connection lost: [${error.errorCode}] ${error.errorMessage}`
      );
  };

  onMessageArrived: OnMessageHandler = (message: Message) => {
    this.ctx.L.info(`${message.destinationName}, ${message.payloadString}`);
  };

  disconnect(): void {
    this.ctx.L.debug(
      `[🔔] disconnecting ${
        this.ctx.client.alias
      }: ${this.client.isConnected()}`
    );
    if (this.client.isConnected()) {
      this.client.disconnect();
      this.ctx.L.debug('[🔔🔺] disconnected notifyManager');
    }
    this.states = STATES.CLOSED;
  }
}
