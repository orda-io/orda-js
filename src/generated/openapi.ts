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

export interface OrtooCheckPoint {
  /** @format uint64 */
  sseq?: string;

  /** @format uint64 */
  cseq?: string;
}

export interface OrtooClientMessage {
  header?: OrtooHeader;
  collection?: string;
  cuid?: string;
  clientAlias?: string;
  clientType?: OrtooClientType;
  syncType?: OrtooSyncType;
}

export enum OrtooClientType {
  PERSISTENT = "PERSISTENT",
  EPHEMERAL = "EPHEMERAL",
}

export interface OrtooCollectionMessage {
  collection?: string;
}

export interface OrtooDatatypeMeta {
  key?: string;
  DUID?: string;
  opID?: OrtooOperationID;
  typeOf?: OrtooTypeOfDatatype;
  state?: OrtooStateOfDatatype;
}

export interface OrtooHeader {
  version?: string;
  agent?: string;
  type?: OrtooRequestType;
}

export interface OrtooOperation {
  ID?: OrtooOperationID;
  opType?: OrtooTypeOfOperation;

  /** @format byte */
  body?: string;
}

export interface OrtooOperationID {
  /** @format int64 */
  era?: number;

  /** @format uint64 */
  lamport?: string;
  CUID?: string;

  /** @format uint64 */
  seq?: string;
}

export interface OrtooPushPullMessage {
  header?: OrtooHeader;
  collection?: string;
  cuid?: string;
  PushPullPacks?: OrtooPushPullPack[];
}

export interface OrtooPushPullPack {
  DUID?: string;
  key?: string;

  /** @format int64 */
  option?: number;
  checkPoint?: OrtooCheckPoint;

  /** @format int64 */
  era?: number;
  type?: OrtooTypeOfDatatype;
  operations?: OrtooOperation[];
}

export enum OrtooRequestType {
  CLIENTS = "CLIENTS",
  PUSHPULLS = "PUSHPULLS",
}

export interface OrtooSnapshotResponse {
  meta?: OrtooDatatypeMeta;
  json?: string;
}

export enum OrtooStateOfDatatype {
  DUE_TO_CREATE = "DUE_TO_CREATE",
  DUE_TO_SUBSCRIBE = "DUE_TO_SUBSCRIBE",
  DUE_TO_SUBSCRIBE_CREATE = "DUE_TO_SUBSCRIBE_CREATE",
  SUBSCRIBED = "SUBSCRIBED",
  DUE_TO_UNSUBSCRIBE = "DUE_TO_UNSUBSCRIBE",
  UNSUBSCRIBED = "UNSUBSCRIBED",
  DELETED = "DELETED",
}

export enum OrtooSyncType {
  LOCAL_ONLY = "LOCAL_ONLY",
  MANUALLY = "MANUALLY",
  NOTIFIABLE = "NOTIFIABLE",
}

export enum OrtooTypeOfDatatype {
  COUNTER = "COUNTER",
  MAP = "MAP",
  LIST = "LIST",
  DOCUMENT = "DOCUMENT",
}

export enum OrtooTypeOfOperation {
  NO_OP = 'NO_OP',
  SNAPSHOT = 'SNAPSHOT',
  DELETE = 'DELETE',
  ERROR = 'ERROR',
  TRANSACTION = 'TRANSACTION',
  COUNTER_INCREASE = 'COUNTER_INCREASE',
  MAP_PUT = 'MAP_PUT',
  MAP_REMOVE = 'MAP_REMOVE',
  LIST_INSERT = 'LIST_INSERT',
  LIST_DELETE = 'LIST_DELETE',
  LIST_UPDATE = 'LIST_UPDATE',
  DOC_PUT_OBJ = 'DOC_PUT_OBJ',
  DOC_DEL_OBJ = 'DOC_DEL_OBJ',
  DOC_INS_ARR = 'DOC_INS_ARR',
  DOC_DEL_ARR = 'DOC_DEL_ARR',
  DOC_UPD_ARR = 'DOC_UPD_ARR',
}

export interface ProtobufAny {
  typeUrl?: string;

  /** @format byte */
  value?: string;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
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

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private addQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];

    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`)
    );
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as QueryParamsType)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
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
    format = "json",
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];

    return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = (null as unknown) as T;
      r.error = (null as unknown) as E;

      const data = await response[format]()
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
 * @title Ortoo gRPC gateway APIs
 * @version v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags OrtooService
     * @name OrtooServiceCreateCollection
     * @request PUT:/api/v1/collections/{collection}
     */
    ortooServiceCreateCollection: (collection: string, params: RequestParams = {}) =>
      this.request<OrtooCollectionMessage, RpcStatus>({
        path: `/api/v1/collections/${collection}`,
        method: "PUT",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrtooService
     * @name OrtooServiceProcessClient
     * @request POST:/api/v1/collections/{collection}/clients/{cuid}
     */
    ortooServiceProcessClient: (
      collection: string,
      cuid: string,
      body: OrtooClientMessage,
      params: RequestParams = {},
    ) =>
      this.request<OrtooClientMessage, RpcStatus>({
        path: `/api/v1/collections/${collection}/clients/${cuid}`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrtooService
     * @name OrtooServiceSnapshotDatatype
     * @request GET:/api/v1/collections/{collection}/datatypes/{key}
     */
    ortooServiceSnapshotDatatype: (
      collection: string,
      key: string,
      query?: { duid?: string; sseq?: string },
      params: RequestParams = {},
    ) =>
      this.request<OrtooSnapshotResponse, RpcStatus>({
        path: `/api/v1/collections/${collection}/datatypes/${key}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrtooService
     * @name OrtooServiceProcessPushPull
     * @request POST:/api/v1/collections/{collection}/pushpulls/{cuid}
     */
    ortooServiceProcessPushPull: (
      collection: string,
      cuid: string,
      body: OrtooPushPullMessage,
      params: RequestParams = {},
    ) =>
      this.request<OrtooPushPullMessage, RpcStatus>({
        path: `/api/v1/collections/${collection}/pushpulls/${cuid}`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrtooService
     * @name OrtooServiceResetCollection
     * @request PUT:/api/v1/collections/{collection}/reset
     */
    ortooServiceResetCollection: (collection: string, params: RequestParams = {}) =>
      this.request<OrtooCollectionMessage, RpcStatus>({
        path: `/api/v1/collections/${collection}/reset`,
        method: "PUT",
        format: "json",
        ...params,
      }),
  };
}
