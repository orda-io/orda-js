import { Client, ClientRequest, ClientResponse, TypeOfMessage } from './protobuf/ortoo_pb';
import { CreateMessageHeader } from './message_header';

export { ClientRequest, ClientResponse };

export function CreateClientRequest(
  seq: number,
  client: Client,
): ClientRequest {
  const request = new ClientRequest();
  request.setHeader(
    CreateMessageHeader(
      TypeOfMessage.REQUEST_CLIENT,
      client.getAlias(),
      client.getCollection(),
      seq,
      client.getCuid_asU8(),
    ),
  );
  request.setClient(client);
  return request;
}