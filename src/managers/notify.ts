import { ClientConfig } from '@ooo/config';
import { ClientContext } from '@ooo/context';
import type { OnConnectionLostHandler, OnMessageHandler } from 'paho-mqtt';
import Paho, {
  ErrorWithInvocationContext,
  Message,
  MQTTError,
  OnFailureCallback,
  OnSuccessCallback,
} from 'paho-mqtt';
import { uint64, Uint64 } from '@ooo/types/integer';
import { ErrClient } from '@ooo/errors/client';
import { getAgent } from '@ooo/constants/constants';

// without mqtt, mqtt-packet 83K
// with mqtt, mqtt-packet 267K
// with paho-mqtt 114K

export interface NotifyReceiver {
  onReceiveNotification(
    cuid: string,
    duid: string,
    key: string,
    sseq: Uint64
  ): void;
}

const STATES = {
  NOT_CONNECTED: 'not_connected',
  CONNECTED: 'connected',
  CLOSED: 'closed',
} as const;
type STATES = typeof STATES[keyof typeof STATES];

export class NotifyManager {
  private readonly ctx: ClientContext;
  private readonly notificationUri: string;
  private client: Paho.Client;
  private receiver?: NotifyReceiver;

  private states: STATES;

  constructor(
    conf: ClientConfig,
    ctx: ClientContext,
    receiver?: NotifyReceiver
  ) {
    this.ctx = ctx;
    this.notificationUri = conf.notificationUri;
    this.client = new Paho.Client(this.notificationUri, this.ctx.client.cuid);
    this.receiver = receiver;
    this.client.onConnectionLost = this.onConnectLost;
    this.client.onMessageArrived = this.onMessageArrived;
    this.states = STATES.NOT_CONNECTED;
    this.ctx.L.debug(
      `[🔔👇] create notifyManager of ${this.ctx.client.alias} to ${this.notificationUri}`
    );
  }

  addNotifyReceiver(receiver?: NotifyReceiver): void {
    this.receiver = receiver;
  }

  public connect(): void {
    this.ctx.L.debug('[🔔] connect notifyManager');
    this.client.connect({
      onSuccess: this.onConnect,
      userName: `${getAgent()}/${this.ctx.client.alias}`,
    });
  }

  public isConnected(): boolean {
    return this.client.isConnected();
  }

  public subscribeDatatype(key: string): void {
    const topic = `${this.ctx.client.collection}/${key}`;
    this.client.subscribe(topic, {
      qos: 0,
      onFailure: this.onFailureSubscribe,
    });
  }

  onFailureSubscribe: OnFailureCallback = (e: ErrorWithInvocationContext) => {
    throw new ErrClient.Subscribe(this.ctx.L, e.errorMessage);
  };

  public onConnect: OnSuccessCallback = (o) => {
    if (this.states === STATES.CLOSED) {
      this.ctx.L.debug('connected after closed');
      this.disconnect();
      return;
    }
    this.ctx.L.debug(
      `[🔔] connected ${this.ctx.client.alias} by notifyManager to ${this.notificationUri}`
    );
    this.states = STATES.CONNECTED;
  };

  private onConnectLost: OnConnectionLostHandler = (error: MQTTError) => {
    if (error.errorCode !== 0)
      this.ctx.L.debug(
        `connection lost: [${error.errorCode}] ${error.errorMessage}`
      );
  };

  onMessageArrived: OnMessageHandler = async (message: Message) => {
    const notify = JSON.parse(message.payloadString);
    if (this.ctx.client.cuid === notify.CUID) {
      // drain
      return;
    }
    const topics = message.destinationName.split('/');
    if (topics[0] !== this.ctx.client.collection) {
      this.ctx.L.error(
        `[🔔] mismatch collections ${this.ctx.client.collection} vs. ${topics[0]}`
      );
      return;
    }
    const key = topics[1];
    const notification = `Notification{cuid:${notify.CUID}, key:${key}, duid:${notify.DUID}, sseq:${notify.sseq}}`;
    this.ctx.L.debug(`[🔔🔻] receive ${notification}`);
    await this.receiver?.onReceiveNotification(
      notify.CUID,
      notify.DUID,
      key,
      uint64(notify.sseq)
    );
    this.ctx.L.debug(`[🔔🔺] finish ${notification}`);
  };

  disconnect(): void {
    if (this.client.isConnected()) {
      this.client.disconnect();
      this.ctx.L.debug('[🔔👆] close notifyManager');
    }
    this.states = STATES.CLOSED;
  }
}
