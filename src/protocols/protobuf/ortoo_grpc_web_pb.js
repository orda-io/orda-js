/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./ortoo_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.OrtooServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.OrtooServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.PushPullRequest,
 *   !proto.PushPullResponse>}
 */
const methodDescriptor_OrtooService_ProcessPushPull = new grpc.web.MethodDescriptor(
  '/OrtooService/ProcessPushPull',
  grpc.web.MethodType.UNARY,
  proto.PushPullRequest,
  proto.PushPullResponse,
  /**
   * @param {!proto.PushPullRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.PushPullResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.PushPullRequest,
 *   !proto.PushPullResponse>}
 */
const methodInfo_OrtooService_ProcessPushPull = new grpc.web.AbstractClientBase.MethodInfo(
  proto.PushPullResponse,
  /**
   * @param {!proto.PushPullRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.PushPullResponse.deserializeBinary
);


/**
 * @param {!proto.PushPullRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.PushPullResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.PushPullResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.OrtooServiceClient.prototype.processPushPull =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/OrtooService/ProcessPushPull',
      request,
      metadata || {},
      methodDescriptor_OrtooService_ProcessPushPull,
      callback);
};


/**
 * @param {!proto.PushPullRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.PushPullResponse>}
 *     Promise that resolves to the response
 */
proto.OrtooServicePromiseClient.prototype.processPushPull =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/OrtooService/ProcessPushPull',
      request,
      metadata || {},
      methodDescriptor_OrtooService_ProcessPushPull);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ClientRequest,
 *   !proto.ClientResponse>}
 */
const methodDescriptor_OrtooService_ProcessClient = new grpc.web.MethodDescriptor(
  '/OrtooService/ProcessClient',
  grpc.web.MethodType.UNARY,
  proto.ClientRequest,
  proto.ClientResponse,
  /**
   * @param {!proto.ClientRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ClientResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ClientRequest,
 *   !proto.ClientResponse>}
 */
const methodInfo_OrtooService_ProcessClient = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ClientResponse,
  /**
   * @param {!proto.ClientRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ClientResponse.deserializeBinary
);


/**
 * @param {!proto.ClientRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ClientResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ClientResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.OrtooServiceClient.prototype.processClient =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/OrtooService/ProcessClient',
      request,
      metadata || {},
      methodDescriptor_OrtooService_ProcessClient,
      callback);
};


/**
 * @param {!proto.ClientRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ClientResponse>}
 *     Promise that resolves to the response
 */
proto.OrtooServicePromiseClient.prototype.processClient =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/OrtooService/ProcessClient',
      request,
      metadata || {},
      methodDescriptor_OrtooService_ProcessClient);
};


module.exports = proto;

