/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface OrdaCheckPoint {
  /**
   * @inject_tag: bson:"s",json:"s"
   * @format uint64
   */
  sseq?: string;

  /**
   * @inject_tag: bson:"c",json:"c"
   * @format uint64
   */
  cseq?: string;
}

export interface OrdaClientMessage {
  header?: OrdaHeader;
  collection?: string;
  cuid?: string;
  clientAlias?: string;
  clientType?: OrdaClientType;
  syncType?: OrdaSyncType;
}

export enum OrdaClientType {
  PERSISTENT = 'PERSISTENT',
  EPHEMERAL = 'EPHEMERAL',
}

export interface OrdaCollectionMessage {
  collection?: string;
}

export interface OrdaDatatypeMeta {
  key?: string;
  DUID?: string;
  opID?: OrdaOperationID;
  typeOf?: OrdaTypeOfDatatype;
}

export interface OrdaEncodingMessage {
  type?: OrdaTypeOfDatatype;
  op?: OrdaOperation;
}

export interface OrdaHeader {
  version?: string;
  agent?: string;
  type?: OrdaRequestType;
}

export interface OrdaOperation {
  ID?: OrdaOperationID;
  opType?: OrdaTypeOfOperation;

  /** @format byte */
  body?: string;
}

export interface OrdaOperationID {
  /**
   * @inject_tag: json:"e,omitempty"
   * @format int64
   */
  era?: number;

  /**
   * @inject_tag: json:"l,omitempty"
   * @format uint64
   */
  lamport?: string;

  /** @inject_tag: json:"c,omitempty" */
  CUID?: string;

  /**
   * @inject_tag: json:"s,omitempty"
   * @format uint64
   */
  seq?: string;
}

export interface OrdaPushPullMessage {
  header?: OrdaHeader;
  collection?: string;
  cuid?: string;
  PushPullPacks?: OrdaPushPullPack[];
}

export interface OrdaPushPullPack {
  DUID?: string;
  key?: string;

  /** @format int64 */
  option?: number;
  checkPoint?: OrdaCheckPoint;

  /** @format int64 */
  era?: number;
  type?: OrdaTypeOfDatatype;
  operations?: OrdaOperation[];
}

export enum OrdaRequestType {
  CLIENTS = 'CLIENTS',
  PUSHPULLS = 'PUSHPULLS',
}

export interface OrdaSnapshotResponse {
  meta?: OrdaDatatypeMeta;
  json?: string;
}

export enum OrdaSyncType {
  LOCAL_ONLY = 'LOCAL_ONLY',
  MANUALLY = 'MANUALLY',
  REALTIME = 'REALTIME',
}

export enum OrdaTypeOfDatatype {
  COUNTER = 'COUNTER',
  MAP = 'MAP',
  LIST = 'LIST',
  DOCUMENT = 'DOCUMENT',
}

export enum OrdaTypeOfOperation {
  NO_OP = 'NO_OP',
  ERROR = 'ERROR',
  TRANSACTION = 'TRANSACTION',
  COUNTER_SNAPSHOT = 'COUNTER_SNAPSHOT',
  COUNTER_INCREASE = 'COUNTER_INCREASE',
  MAP_SNAPSHOT = 'MAP_SNAPSHOT',
  MAP_PUT = 'MAP_PUT',
  MAP_REMOVE = 'MAP_REMOVE',
  LIST_SNAPSHOT = 'LIST_SNAPSHOT',
  LIST_INSERT = 'LIST_INSERT',
  LIST_DELETE = 'LIST_DELETE',
  LIST_UPDATE = 'LIST_UPDATE',
  DOC_SNAPSHOT = 'DOC_SNAPSHOT',
  DOC_OBJ_PUT = 'DOC_OBJ_PUT',
  DOC_OBJ_RMV = 'DOC_OBJ_RMV',
  DOC_ARR_INS = 'DOC_ARR_INS',
  DOC_ARR_DEL = 'DOC_ARR_DEL',
  DOC_ARR_UPD = 'DOC_ARR_UPD',
}

export interface ProtobufAny {
  '@type'?: string;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Orda gRPC gateway APIs
 * @version v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags OrdaService
     * @name OrdaServiceCreateCollection
     * @request PUT:/api/v1/collections/{collection}
     */
    ordaServiceCreateCollection: (collection: string, params: RequestParams = {}) =>
      this.request<OrdaCollectionMessage, RpcStatus>({
        path: `/api/v1/collections/${collection}`,
        method: 'PUT',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrdaService
     * @name OrdaServiceProcessClient
     * @request POST:/api/v1/collections/{collection}/clients/{cuid}
     */
    ordaServiceProcessClient: (
      collection: string,
      cuid: string,
      body: { header?: OrdaHeader; clientAlias?: string; clientType?: OrdaClientType; syncType?: OrdaSyncType },
      params: RequestParams = {}
    ) =>
      this.request<OrdaClientMessage, RpcStatus>({
        path: `/api/v1/collections/${collection}/clients/${cuid}`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrdaService
     * @name OrdaServiceSnapshotDatatype
     * @request GET:/api/v1/collections/{collection}/datatypes/{key}
     */
    ordaServiceSnapshotDatatype: (
      collection: string,
      key: string,
      query?: { duid?: string; sseq?: string },
      params: RequestParams = {}
    ) =>
      this.request<OrdaSnapshotResponse, RpcStatus>({
        path: `/api/v1/collections/${collection}/datatypes/${key}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrdaService
     * @name OrdaServiceProcessPushPull
     * @request POST:/api/v1/collections/{collection}/pushpulls/{cuid}
     */
    ordaServiceProcessPushPull: (
      collection: string,
      cuid: string,
      body: { header?: OrdaHeader; PushPullPacks?: OrdaPushPullPack[] },
      params: RequestParams = {}
    ) =>
      this.request<OrdaPushPullMessage, RpcStatus>({
        path: `/api/v1/collections/${collection}/pushpulls/${cuid}`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrdaService
     * @name OrdaServiceResetCollection
     * @request PUT:/api/v1/collections/{collection}/reset
     */
    ordaServiceResetCollection: (collection: string, params: RequestParams = {}) =>
      this.request<OrdaCollectionMessage, RpcStatus>({
        path: `/api/v1/collections/${collection}/reset`,
        method: 'PUT',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrdaService
     * @name OrdaServiceTestEncodingOperation
     * @request POST:/api/v1/samples/operation
     */
    ordaServiceTestEncodingOperation: (body: OrdaEncodingMessage, params: RequestParams = {}) =>
      this.request<OrdaEncodingMessage, RpcStatus>({
        path: `/api/v1/samples/operation`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
}
