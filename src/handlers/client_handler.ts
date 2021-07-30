import { Client } from '@orda/client';

export class ClientHandlers {
  onConnect?: (client: Client) => void;
  onError?: (client: Client, e: Error) => void;
  onClose?: (client: Client) => void;

  constructor(
    onConnect?: (client: Client) => void,
    onError?: (client: Client, e: Error) => void,
    onClose?: (client: Client) => void,
    scope?: never
  ) {
    this.onConnect = onConnect?.bind(scope);
    this.onError = onError;
    this.onClose = onClose;
    if (scope) {
      this.onConnect?.bind(scope);
      this.onError?.bind(scope);
      this.onClose?.bind(scope);
    }
  }

  addOnConnectHandler(onConnect?: (client: Client) => void): ClientHandlers {
    this.onConnect = onConnect;
    return this;
  }

  addOnErrorsHandler(onError?: (client: Client, e: Error) => void): ClientHandlers {
    this.onError = onError;
    return this;
  }

  addOnCloseHandler(onClose?: (client: Client) => void): ClientHandlers {
    this.onClose = onClose;
    return this;
  }
}
