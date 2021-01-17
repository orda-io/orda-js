import * as jspb from 'google-protobuf';

export class Client extends jspb.Message {
  getCuid(): Uint8Array | string;
  getCuid_asU8(): Uint8Array;
  getCuid_asB64(): string;
  setCuid(value: Uint8Array | string): Client;

  getAlias(): string;
  setAlias(value: string): Client;

  getCollection(): string;

  setCollection(value: string): Client;

  getSynctype(): SyncType;

  setSynctype(value: SyncType): Client;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): Client.AsObject;

  static toObject(includeInstance: boolean, msg: Client): Client.AsObject;

  static serializeBinaryToWriter(
    message: Client,
    writer: jspb.BinaryWriter
  ): void;

  static deserializeBinary(bytes: Uint8Array): Client;

  static deserializeBinaryFromReader(
    message: Client,
    reader: jspb.BinaryReader
  ): Client;
}

export declare namespace Client {
  export type AsObject = {
    cuid: Uint8Array | string;
    alias: string;
    collection: string;
    synctype: SyncType;
  };
}

export class Timestamp extends jspb.Message {
  getEra(): number;
  setEra(value: number): Timestamp;

  getLamport(): number;
  setLamport(value: number): Timestamp;

  getCuid(): Uint8Array | string;

  getCuid_asU8(): Uint8Array;

  getCuid_asB64(): string;

  setCuid(value: Uint8Array | string): Timestamp;

  getDelimiter(): number;

  setDelimiter(value: number): Timestamp;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): Timestamp.AsObject;

  static toObject(includeInstance: boolean, msg: Timestamp): Timestamp.AsObject;

  static serializeBinaryToWriter(
    message: Timestamp,
    writer: jspb.BinaryWriter
  ): void;

  static deserializeBinary(bytes: Uint8Array): Timestamp;

  static deserializeBinaryFromReader(
    message: Timestamp,
    reader: jspb.BinaryReader
  ): Timestamp;
}

export declare namespace Timestamp {
  export type AsObject = {
    era: number;
    lamport: number;
    cuid: Uint8Array | string;
    delimiter: number;
  };
}

export class OperationID extends jspb.Message {
  getEra(): number;
  setEra(value: number): OperationID;

  getLamport(): string;
  setLamport(value: string): OperationID;

  getCuid(): Uint8Array | string;

  getCuid_asU8(): Uint8Array;

  getCuid_asB64(): string;

  setCuid(value: Uint8Array | string): OperationID;

  getSeq(): string;

  setSeq(value: string): OperationID;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): OperationID.AsObject;

  static toObject(
    includeInstance: boolean,
    msg: OperationID
  ): OperationID.AsObject;

  static serializeBinaryToWriter(
    message: OperationID,
    writer: jspb.BinaryWriter
  ): void;

  static deserializeBinary(bytes: Uint8Array): OperationID;

  static deserializeBinaryFromReader(
    message: OperationID,
    reader: jspb.BinaryReader
  ): OperationID;
}

export declare namespace OperationID {
  export type AsObject = {
    era: number;
    lamport: string;
    cuid: Uint8Array | string;
    seq: string;
  };
}

export class Operation extends jspb.Message {
  getId(): OperationID | undefined;
  setId(value?: OperationID): Operation;
  hasId(): boolean;
  clearId(): Operation;

  getOptype(): TypeOfOperation;

  setOptype(value: TypeOfOperation): Operation;

  getBody(): Uint8Array | string;

  getBody_asU8(): Uint8Array;

  getBody_asB64(): string;

  setBody(value: Uint8Array | string): Operation;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): Operation.AsObject;

  static toObject(includeInstance: boolean, msg: Operation): Operation.AsObject;

  static serializeBinaryToWriter(
    message: Operation,
    writer: jspb.BinaryWriter
  ): void;

  static deserializeBinary(bytes: Uint8Array): Operation;

  static deserializeBinaryFromReader(
    message: Operation,
    reader: jspb.BinaryReader
  ): Operation;
}

export declare namespace Operation {
  export type AsObject = {
    id?: OperationID.AsObject;
    optype: TypeOfOperation;
    body: Uint8Array | string;
  };
}

export class PushPullPack extends jspb.Message {
  getDuid(): Uint8Array | string;
  getDuid_asU8(): Uint8Array;
  getDuid_asB64(): string;
  setDuid(value: Uint8Array | string): PushPullPack;

  getKey(): string;
  setKey(value: string): PushPullPack;

  getOption(): number;
  setOption(value: number): PushPullPack;

  getCheckpoint(): CheckPoint | undefined;
  setCheckpoint(value?: CheckPoint): PushPullPack;
  hasCheckpoint(): boolean;
  clearCheckpoint(): PushPullPack;

  getEra(): number;
  setEra(value: number): PushPullPack;

  getType(): number;

  setType(value: number): PushPullPack;

  getOperationsList(): Array<Operation>;

  setOperationsList(value: Array<Operation>): PushPullPack;

  clearOperationsList(): PushPullPack;

  addOperations(value?: Operation, index?: number): Operation;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): PushPullPack.AsObject;

  static toObject(
    includeInstance: boolean,
    msg: PushPullPack
  ): PushPullPack.AsObject;

  static serializeBinaryToWriter(
    message: PushPullPack,
    writer: jspb.BinaryWriter
  ): void;

  static deserializeBinary(bytes: Uint8Array): PushPullPack;

  static deserializeBinaryFromReader(
    message: PushPullPack,
    reader: jspb.BinaryReader
  ): PushPullPack;
}

export declare namespace PushPullPack {
  export type AsObject = {
    duid: Uint8Array | string;
    key: string;
    option: number;
    checkpoint?: CheckPoint.AsObject;
    era: number;
    type: number;
    operationsList: Array<Operation.AsObject>;
  };
}

export class CheckPoint extends jspb.Message {
  getSseq(): string;

  setSseq(value: string): CheckPoint;

  getCseq(): string;

  setCseq(value: string): CheckPoint;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): CheckPoint.AsObject;

  static toObject(
    includeInstance: boolean,
    msg: CheckPoint
  ): CheckPoint.AsObject;

  static serializeBinaryToWriter(
    message: CheckPoint,
    writer: jspb.BinaryWriter
  ): void;

  static deserializeBinary(bytes: Uint8Array): CheckPoint;

  static deserializeBinaryFromReader(
    message: CheckPoint,
    reader: jspb.BinaryReader
  ): CheckPoint;
}

export declare namespace CheckPoint {
  export type AsObject = {
    sseq: string;
    cseq: string;
  };
}

export class NotificationPushPull extends jspb.Message {
  getCuid(): string;

  setCuid(value: string): NotificationPushPull;

  getDuid(): string;

  setDuid(value: string): NotificationPushPull;

  getSseq(): string;

  setSseq(value: string): NotificationPushPull;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): NotificationPushPull.AsObject;

  static toObject(
    includeInstance: boolean,
    msg: NotificationPushPull
  ): NotificationPushPull.AsObject;

  static serializeBinaryToWriter(
    message: NotificationPushPull,
    writer: jspb.BinaryWriter
  ): void;

  static deserializeBinary(bytes: Uint8Array): NotificationPushPull;

  static deserializeBinaryFromReader(
    message: NotificationPushPull,
    reader: jspb.BinaryReader
  ): NotificationPushPull;
}

export declare namespace NotificationPushPull {
  export type AsObject = {
    cuid: string;
    duid: string;
    sseq: string;
  };
}

export class DatatypeMeta extends jspb.Message {
  getKey(): string;
  setKey(value: string): DatatypeMeta;

  getDuid(): Uint8Array | string;
  getDuid_asU8(): Uint8Array;
  getDuid_asB64(): string;
  setDuid(value: Uint8Array | string): DatatypeMeta;

  getOpid(): OperationID | undefined;
  setOpid(value?: OperationID): DatatypeMeta;
  hasOpid(): boolean;

  clearOpid(): DatatypeMeta;

  getTypeof(): TypeOfDatatype;

  setTypeof(value: TypeOfDatatype): DatatypeMeta;

  getState(): StateOfDatatype;

  setState(value: StateOfDatatype): DatatypeMeta;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): DatatypeMeta.AsObject;

  static toObject(
    includeInstance: boolean,
    msg: DatatypeMeta
  ): DatatypeMeta.AsObject;

  static serializeBinaryToWriter(
    message: DatatypeMeta,
    writer: jspb.BinaryWriter
  ): void;

  static deserializeBinary(bytes: Uint8Array): DatatypeMeta;

  static deserializeBinaryFromReader(
    message: DatatypeMeta,
    reader: jspb.BinaryReader
  ): DatatypeMeta;
}

export declare namespace DatatypeMeta {
  export type AsObject = {
    key: string;
    duid: Uint8Array | string;
    opid?: OperationID.AsObject;
    pb_typeof: TypeOfDatatype;
    state: StateOfDatatype;
  };
}

export class MessageHeader extends jspb.Message {
  getVersion(): string;
  setVersion(value: string): MessageHeader;

  getSeq(): number;
  setSeq(value: number): MessageHeader;

  getTypeof(): TypeOfMessage;
  setTypeof(value: TypeOfMessage): MessageHeader;

  getCollection(): string;
  setCollection(value: string): MessageHeader;

  getClientalias(): string;

  setClientalias(value: string): MessageHeader;

  getCuid(): Uint8Array | string;

  getCuid_asU8(): Uint8Array;

  getCuid_asB64(): string;

  setCuid(value: Uint8Array | string): MessageHeader;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): MessageHeader.AsObject;

  static toObject(
    includeInstance: boolean,
    msg: MessageHeader
  ): MessageHeader.AsObject;

  static serializeBinaryToWriter(
    message: MessageHeader,
    writer: jspb.BinaryWriter
  ): void;

  static deserializeBinary(bytes: Uint8Array): MessageHeader;

  static deserializeBinaryFromReader(
    message: MessageHeader,
    reader: jspb.BinaryReader
  ): MessageHeader;
}

export declare namespace MessageHeader {
  export type AsObject = {
    version: string;
    seq: number;
    pb_typeof: TypeOfMessage;
    collection: string;
    clientalias: string;
    cuid: Uint8Array | string;
  };
}

export class ResponseState extends jspb.Message {
  getState(): StateOfResponse;

  setState(value: StateOfResponse): ResponseState;

  getMsg(): string;

  setMsg(value: string): ResponseState;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): ResponseState.AsObject;

  static toObject(
    includeInstance: boolean,
    msg: ResponseState
  ): ResponseState.AsObject;

  static serializeBinaryToWriter(
    message: ResponseState,
    writer: jspb.BinaryWriter
  ): void;

  static deserializeBinary(bytes: Uint8Array): ResponseState;

  static deserializeBinaryFromReader(
    message: ResponseState,
    reader: jspb.BinaryReader
  ): ResponseState;
}

export declare namespace ResponseState {
  export type AsObject = {
    state: StateOfResponse;
    msg: string;
  };
}

export class ClientRequest extends jspb.Message {
  getHeader(): MessageHeader | undefined;
  setHeader(value?: MessageHeader): ClientRequest;

  hasHeader(): boolean;

  clearHeader(): ClientRequest;

  getClient(): Client | undefined;

  setClient(value?: Client): ClientRequest;

  hasClient(): boolean;

  clearClient(): ClientRequest;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): ClientRequest.AsObject;

  static toObject(
    includeInstance: boolean,
    msg: ClientRequest
  ): ClientRequest.AsObject;

  static serializeBinaryToWriter(
    message: ClientRequest,
    writer: jspb.BinaryWriter
  ): void;

  static deserializeBinary(bytes: Uint8Array): ClientRequest;

  static deserializeBinaryFromReader(
    message: ClientRequest,
    reader: jspb.BinaryReader
  ): ClientRequest;
}

export declare namespace ClientRequest {
  export type AsObject = {
    header?: MessageHeader.AsObject;
    client?: Client.AsObject;
  };
}

export class ClientResponse extends jspb.Message {
  getHeader(): MessageHeader | undefined;
  setHeader(value?: MessageHeader): ClientResponse;

  hasHeader(): boolean;

  clearHeader(): ClientResponse;

  getState(): ResponseState | undefined;

  setState(value?: ResponseState): ClientResponse;

  hasState(): boolean;

  clearState(): ClientResponse;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): ClientResponse.AsObject;

  static toObject(
    includeInstance: boolean,
    msg: ClientResponse
  ): ClientResponse.AsObject;

  static serializeBinaryToWriter(
    message: ClientResponse,
    writer: jspb.BinaryWriter
  ): void;

  static deserializeBinary(bytes: Uint8Array): ClientResponse;

  static deserializeBinaryFromReader(
    message: ClientResponse,
    reader: jspb.BinaryReader
  ): ClientResponse;
}

export declare namespace ClientResponse {
  export type AsObject = {
    header?: MessageHeader.AsObject;
    state?: ResponseState.AsObject;
  };
}

export class PushPullRequest extends jspb.Message {
  getHeader(): MessageHeader | undefined;
  setHeader(value?: MessageHeader): PushPullRequest;
  hasHeader(): boolean;
  clearHeader(): PushPullRequest;

  getId(): number;

  setId(value: number): PushPullRequest;

  getPushpullpacksList(): Array<PushPullPack>;

  setPushpullpacksList(value: Array<PushPullPack>): PushPullRequest;

  clearPushpullpacksList(): PushPullRequest;

  addPushpullpacks(value?: PushPullPack, index?: number): PushPullPack;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): PushPullRequest.AsObject;

  static toObject(
    includeInstance: boolean,
    msg: PushPullRequest
  ): PushPullRequest.AsObject;

  static serializeBinaryToWriter(
    message: PushPullRequest,
    writer: jspb.BinaryWriter
  ): void;

  static deserializeBinary(bytes: Uint8Array): PushPullRequest;

  static deserializeBinaryFromReader(
    message: PushPullRequest,
    reader: jspb.BinaryReader
  ): PushPullRequest;
}

export declare namespace PushPullRequest {
  export type AsObject = {
    header?: MessageHeader.AsObject;
    id: number;
    pushpullpacksList: Array<PushPullPack.AsObject>;
  };
}

export class PushPullResponse extends jspb.Message {
  getHeader(): MessageHeader | undefined;
  setHeader(value?: MessageHeader): PushPullResponse;
  hasHeader(): boolean;
  clearHeader(): PushPullResponse;

  getId(): number;

  setId(value: number): PushPullResponse;

  getPushpullpacksList(): Array<PushPullPack>;

  setPushpullpacksList(value: Array<PushPullPack>): PushPullResponse;

  clearPushpullpacksList(): PushPullResponse;

  addPushpullpacks(value?: PushPullPack, index?: number): PushPullPack;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): PushPullResponse.AsObject;

  static toObject(
    includeInstance: boolean,
    msg: PushPullResponse
  ): PushPullResponse.AsObject;

  static serializeBinaryToWriter(
    message: PushPullResponse,
    writer: jspb.BinaryWriter
  ): void;

  static deserializeBinary(bytes: Uint8Array): PushPullResponse;

  static deserializeBinaryFromReader(
    message: PushPullResponse,
    reader: jspb.BinaryReader
  ): PushPullResponse;
}

export declare namespace PushPullResponse {
  export type AsObject = {
    header?: MessageHeader.AsObject;
    id: number;
    pushpullpacksList: Array<PushPullPack.AsObject>;
  };
}

export enum SyncType {
  LOCAL_ONLY = 0,
  MANUALLY = 1,
  NOTIFIABLE = 2,
}

export enum TypeOfOperation {
  SNAPSHOT = 0,
  DELETE = 2,
  ERROR = 3,
  TRANSACTION = 5,
  COUNTER_INCREASE = 11,
  HASH_MAP_PUT = 21,
  HASH_MAP_REMOVE = 22,
  LIST_INSERT = 31,
  LIST_DELETE = 32,
  LIST_UPDATE = 33,
  DOCUMENT_PUT_OBJ = 41,
  DOCUMENT_DEL_OBJ = 42,
  DOCUMENT_INS_ARR = 43,
  DOCUMENT_DEL_ARR = 44,
  DOCUMENT_UPD_ARR = 45,
}

export enum TypeOfDatatype {
  COUNTER = 0,
  HASH_MAP = 1,
  LIST = 2,
  DOCUMENT = 3,
}

export enum StateOfDatatype {
  DUE_TO_CREATE = 0,
  DUE_TO_SUBSCRIBE = 1,
  DUE_TO_SUBSCRIBE_CREATE = 2,
  SUBSCRIBED = 4,
  DUE_TO_UNSUBSCRIBE = 5,
  UNSUBSCRIBED = 6,
  DELETED = 7,
}

export enum TypeOfMessage {
  REQUEST_CLIENT = 0,
  REQUEST_PUSHPULL = 1,
  RESPONSE_CLIENT = 10,
  RESPONSE_PUSHPULL = 11,
}

export enum StateOfResponse {
  OK = 0,
  ERR_CLIENT_INVALID_COLLECTION = 101,
  ERR_CLIENT_INVALID_SYNCTYPE = 102,
}
