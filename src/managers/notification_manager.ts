import Paho, { ErrorWithInvocationContext, Message, MQTTError, WithInvocationContext } from 'paho-mqtt';
import { OrtooLogger } from '../utils/logging';
import { ClientConfig } from '../config';

export class NotificationManager {
  private mqttClient: Paho.Client;
  private Logger: OrtooLogger;

  constructor(conf: ClientConfig, alias: string, logger: OrtooLogger) {
    this.Logger = logger;

    this.mqttClient = new Paho.Client('127.0.0.1', 9001, '/ws', alias);
    // this.mqttClient.startTrace();
    this.mqttClient.onConnectionLost = this.onConnectionLostHandler;
    this.mqttClient.onMessageArrived = this.onMessageArrived;
  }

  private onConnectionLostHandler = (error: MQTTError): void => {
    this.Logger.info('connectionLost:', error);
  };

  private onMessageArrived = (message: Message): void => {
    this.Logger.info('receiveMsg:', message);
  };

  private onSuccess = (o: WithInvocationContext): void => {
    this.Logger.info('onSuccess:', o);
  };

  private onFailure = (e: ErrorWithInvocationContext): void => {
    this.Logger.info('Failure: ', e);
  };

  connect() {
    this.mqttClient.connect({
      onSuccess: this.onSuccess,
      onFailure: this.onFailure,
    });
  }

  disconnect() {
    this.Logger.info('is connected:', this.mqttClient.isConnected());
    // this.mqttClient.disconnect();
  }
}
