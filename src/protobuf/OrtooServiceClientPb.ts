/**
 * @fileoverview gRPC-Web generated client stub for ortoo
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as ortoo_pb from './ortoo_pb';


export class OrtooServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoProcessPushPull = new grpcWeb.AbstractClientBase.MethodInfo(
    ortoo_pb.PushPullResponse,
    (request: ortoo_pb.PushPullRequest) => {
      return request.serializeBinary();
    },
    ortoo_pb.PushPullResponse.deserializeBinary
  );

  processPushPull(
    request: ortoo_pb.PushPullRequest,
    metadata: grpcWeb.Metadata | null): Promise<ortoo_pb.PushPullResponse>;

  processPushPull(
    request: ortoo_pb.PushPullRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ortoo_pb.PushPullResponse) => void): grpcWeb.ClientReadableStream<ortoo_pb.PushPullResponse>;

  processPushPull(
    request: ortoo_pb.PushPullRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: ortoo_pb.PushPullResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/ortoo.OrtooService/ProcessPushPull',
        request,
        metadata || {},
        this.methodInfoProcessPushPull,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/ortoo.OrtooService/ProcessPushPull',
    request,
    metadata || {},
    this.methodInfoProcessPushPull);
  }

  methodInfoProcessClient = new grpcWeb.AbstractClientBase.MethodInfo(
    ortoo_pb.ClientResponse,
    (request: ortoo_pb.ClientRequest) => {
      return request.serializeBinary();
    },
    ortoo_pb.ClientResponse.deserializeBinary
  );

  processClient(
    request: ortoo_pb.ClientRequest,
    metadata: grpcWeb.Metadata | null): Promise<ortoo_pb.ClientResponse>;

  processClient(
    request: ortoo_pb.ClientRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ortoo_pb.ClientResponse) => void): grpcWeb.ClientReadableStream<ortoo_pb.ClientResponse>;

  processClient(
    request: ortoo_pb.ClientRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: ortoo_pb.ClientResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/ortoo.OrtooService/ProcessClient',
        request,
        metadata || {},
        this.methodInfoProcessClient,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/ortoo.OrtooService/ProcessClient',
    request,
    metadata || {},
    this.methodInfoProcessClient);
  }

}

