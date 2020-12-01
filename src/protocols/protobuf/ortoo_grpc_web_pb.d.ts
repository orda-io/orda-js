import * as grpcWeb from 'grpc-web';

import * as ortoo_pb from './ortoo_pb';

export class OrtooServiceClient {
  constructor(
    hostname: string,
    credentials?: null | { [index: string]: string },
    options?: null | { [index: string]: any }
  );

  processPushPull(
    request: ortoo_pb.PushPullRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error, response: ortoo_pb.PushPullResponse) => void
  ): grpcWeb.ClientReadableStream<ortoo_pb.PushPullResponse>;

  processClient(
    request: ortoo_pb.ClientRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error, response: ortoo_pb.ClientResponse) => void
  ): grpcWeb.ClientReadableStream<ortoo_pb.ClientResponse>;
}

export class OrtooServicePromiseClient {
  constructor(
    hostname: string,
    credentials?: null | { [index: string]: string },
    options?: null | { [index: string]: any }
  );

  processPushPull(
    request: ortoo_pb.PushPullRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<ortoo_pb.PushPullResponse>;

  processClient(
    request: ortoo_pb.ClientRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<ortoo_pb.ClientResponse>;
}
