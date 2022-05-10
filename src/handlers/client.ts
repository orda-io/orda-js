import { Client } from '@orda/client';

export interface ClientHandlers {
  onClientConnect?(client: Client): void;

  onClientError?(client: Client, e: Error): void;

  onClientClose?(client: Client): void;

  onClientDisconnect?(client: Client): void;
}
