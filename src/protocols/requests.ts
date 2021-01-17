import {
  ClientRequest,
  ClientResponse,
  TypeOfMessage,
} from '@ooo/protobuf/ortoo_pb';
import { CreateMessageHeader } from '@ooo/protocols/message_header';
import { ClientModel } from '@ooo/types/client';

export { ClientRequest, ClientResponse };

export function CreateClientRequest(
  seq: number,
  client: ClientModel
): ClientRequest {
  const request = new ClientRequest();
  request.setHeader(
    CreateMessageHeader(
      TypeOfMessage.REQUEST_CLIENT,
      client.alias,
      client.collection,
      seq,
      client.cuid.AsUint8Array
    )
  );
  request.setClient(client.toClientPb());
  return request;
}
