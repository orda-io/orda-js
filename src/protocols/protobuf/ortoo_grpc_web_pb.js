/**
 * @fileoverview gRPC-Web generated client stub for ortoo
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.ortoo = require('./ortoo_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.ortoo.OrtooServiceClient =
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
proto.ortoo.OrtooServicePromiseClient =
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
 *   !proto.ortoo.PushPullRequest,
 *   !proto.ortoo.PushPullResponse>}
 */
const methodDescriptor_OrtooService_ProcessPushPull = new grpc.web.MethodDescriptor(
  '/ortoo.OrtooService/ProcessPushPull',
  grpc.web.MethodType.UNARY,
  proto.ortoo.PushPullRequest,
  proto.ortoo.PushPullResponse,
  /**
   * @param {!proto.ortoo.PushPullRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ortoo.PushPullResponse.deserializeBinary,
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ortoo.PushPullRequest,
 *   !proto.ortoo.PushPullResponse>}
 */
const methodInfo_OrtooService_ProcessPushPull = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ortoo.PushPullResponse,
  /**
   * @param {!proto.ortoo.PushPullRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ortoo.PushPullResponse.deserializeBinary,
);


/**
 * @param {!proto.ortoo.PushPullRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ortoo.PushPullResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ortoo.PushPullResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ortoo.OrtooServiceClient.prototype.processPushPull =
  function(request, metadata, callback) {
    return this.client_.rpcCall(this.hostname_ +
      '/ortoo.OrtooService/ProcessPushPull',
      request,
      metadata || {},
      methodDescriptor_OrtooService_ProcessPushPull,
      callback);
  };


/**
 * @param {!proto.ortoo.PushPullRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ortoo.PushPullResponse>}
 *     Promise that resolves to the response
 */
proto.ortoo.OrtooServicePromiseClient.prototype.processPushPull =
  function(request, metadata) {
    return this.client_.unaryCall(this.hostname_ +
      '/ortoo.OrtooService/ProcessPushPull',
      request,
      metadata || {},
      methodDescriptor_OrtooService_ProcessPushPull);
  };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ortoo.ClientRequest,
 *   !proto.ortoo.ClientResponse>}
 */
const methodDescriptor_OrtooService_ProcessClient = new grpc.web.MethodDescriptor(
  '/ortoo.OrtooService/ProcessClient',
  grpc.web.MethodType.UNARY,
  proto.ortoo.ClientRequest,
  proto.ortoo.ClientResponse,
  /**
   * @param {!proto.ortoo.ClientRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ortoo.ClientResponse.deserializeBinary,
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ortoo.ClientRequest,
 *   !proto.ortoo.ClientResponse>}
 */
const methodInfo_OrtooService_ProcessClient = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ortoo.ClientResponse,
  /**
   * @param {!proto.ortoo.ClientRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ortoo.ClientResponse.deserializeBinary,
);


/**
 * @param {!proto.ortoo.ClientRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ortoo.ClientResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ortoo.ClientResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ortoo.OrtooServiceClient.prototype.processClient =
  function(request, metadata, callback) {
    return this.client_.rpcCall(this.hostname_ +
      '/ortoo.OrtooService/ProcessClient',
      request,
      metadata || {},
      methodDescriptor_OrtooService_ProcessClient,
      callback);
  };


/**
 * @param {!proto.ortoo.ClientRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ortoo.ClientResponse>}
 *     Promise that resolves to the response
 */
proto.ortoo.OrtooServicePromiseClient.prototype.processClient =
  function(request, metadata) {
    return this.client_.unaryCall(this.hostname_ +
      '/ortoo.OrtooService/ProcessClient',
      request,
      metadata || {},
      methodDescriptor_OrtooService_ProcessClient);
  };


module.exports = proto.ortoo;

