import * as $protobuf from "protobufjs";
/** Properties of a MessageHeader. */
export interface IMessageHeader {

    /** MessageHeader version */
    version?: (string|null);

    /** MessageHeader seq */
    seq?: (number|null);

    /** MessageHeader typeOf */
    typeOf?: (TypeOfMessage|null);

    /** MessageHeader collection */
    collection?: (string|null);

    /** MessageHeader clientAlias */
    clientAlias?: (string|null);

    /** MessageHeader cuid */
    cuid?: (Uint8Array|null);
}

/** Represents a MessageHeader. */
export class MessageHeader implements IMessageHeader {

    /**
     * Constructs a new MessageHeader.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMessageHeader);

    /** MessageHeader version. */
    public version: string;

    /** MessageHeader seq. */
    public seq: number;

    /** MessageHeader typeOf. */
    public typeOf: TypeOfMessage;

    /** MessageHeader collection. */
    public collection: string;

    /** MessageHeader clientAlias. */
    public clientAlias: string;

    /** MessageHeader cuid. */
    public cuid: Uint8Array;

    /**
     * Creates a new MessageHeader instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MessageHeader instance
     */
    public static create(properties?: IMessageHeader): MessageHeader;

    /**
     * Encodes the specified MessageHeader message. Does not implicitly {@link MessageHeader.verify|verify} messages.
     * @param message MessageHeader message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMessageHeader, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MessageHeader message, length delimited. Does not implicitly {@link MessageHeader.verify|verify} messages.
     * @param message MessageHeader message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMessageHeader, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MessageHeader message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MessageHeader
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MessageHeader;

    /**
     * Decodes a MessageHeader message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MessageHeader
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MessageHeader;

    /**
     * Verifies a MessageHeader message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MessageHeader message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MessageHeader
     */
    public static fromObject(object: { [k: string]: any }): MessageHeader;

    /**
     * Creates a plain object from a MessageHeader message. Also converts values to other types if specified.
     * @param message MessageHeader
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MessageHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MessageHeader to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** TypeOfMessage enum. */
export enum TypeOfMessage {
    REQUEST_CLIENT = 0,
    REQUEST_PUSHPULL = 1,
    RESPONSE_CLIENT = 10,
    RESPONSE_PUSHPULL = 11
}

/** StateOfResponse enum. */
export enum StateOfResponse {
    OK = 0,
    ERR_CLIENT_INVALID_COLLECTION = 101,
    ERR_CLIENT_INVALID_SYNCTYPE = 102
}

/** Represents a ResponseState. */
export class ResponseState implements IResponseState {

    /**
     * Constructs a new ResponseState.
     * @param [properties] Properties to set
     */
    constructor(properties?: IResponseState);

    /** ResponseState state. */
    public state: StateOfResponse;

    /** ResponseState msg. */
    public msg: string;

    /**
     * Creates a new ResponseState instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ResponseState instance
     */
    public static create(properties?: IResponseState): ResponseState;

    /**
     * Encodes the specified ResponseState message. Does not implicitly {@link ResponseState.verify|verify} messages.
     * @param message ResponseState message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IResponseState, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ResponseState message, length delimited. Does not implicitly {@link ResponseState.verify|verify} messages.
     * @param message ResponseState message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IResponseState, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ResponseState message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ResponseState
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ResponseState;

    /**
     * Decodes a ResponseState message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ResponseState
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ResponseState;

    /**
     * Verifies a ResponseState message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ResponseState message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ResponseState
     */
    public static fromObject(object: { [k: string]: any }): ResponseState;

    /**
     * Creates a plain object from a ResponseState message. Also converts values to other types if specified.
     * @param message ResponseState
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ResponseState, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ResponseState to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a ClientRequest. */
export class ClientRequest implements IClientRequest {

    /**
     * Constructs a new ClientRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: IClientRequest);

    /** ClientRequest header. */
    public header?: (IMessageHeader|null);

    /** ClientRequest client. */
    public client?: (IClient|null);

    /**
     * Creates a new ClientRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ClientRequest instance
     */
    public static create(properties?: IClientRequest): ClientRequest;

    /**
     * Encodes the specified ClientRequest message. Does not implicitly {@link ClientRequest.verify|verify} messages.
     * @param message ClientRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IClientRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ClientRequest message, length delimited. Does not implicitly {@link ClientRequest.verify|verify} messages.
     * @param message ClientRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IClientRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ClientRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ClientRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ClientRequest;

    /**
     * Decodes a ClientRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ClientRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ClientRequest;

    /**
     * Verifies a ClientRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ClientRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ClientRequest
     */
    public static fromObject(object: { [k: string]: any }): ClientRequest;

    /**
     * Creates a plain object from a ClientRequest message. Also converts values to other types if specified.
     * @param message ClientRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ClientRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ClientRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a ClientResponse. */
export class ClientResponse implements IClientResponse {

    /**
     * Constructs a new ClientResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: IClientResponse);

    /** ClientResponse header. */
    public header?: (IMessageHeader|null);

    /** ClientResponse state. */
    public state?: (IResponseState|null);

    /**
     * Creates a new ClientResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ClientResponse instance
     */
    public static create(properties?: IClientResponse): ClientResponse;

    /**
     * Encodes the specified ClientResponse message. Does not implicitly {@link ClientResponse.verify|verify} messages.
     * @param message ClientResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IClientResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ClientResponse message, length delimited. Does not implicitly {@link ClientResponse.verify|verify} messages.
     * @param message ClientResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IClientResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ClientResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ClientResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ClientResponse;

    /**
     * Decodes a ClientResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ClientResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ClientResponse;

    /**
     * Verifies a ClientResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ClientResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ClientResponse
     */
    public static fromObject(object: { [k: string]: any }): ClientResponse;

    /**
     * Creates a plain object from a ClientResponse message. Also converts values to other types if specified.
     * @param message ClientResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ClientResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ClientResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a PushPullRequest. */
export class PushPullRequest implements IPushPullRequest {

    /**
     * Constructs a new PushPullRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPushPullRequest);

    /** PushPullRequest header. */
    public header?: (IMessageHeader|null);

    /** PushPullRequest ID. */
    public ID: number;

    /** PushPullRequest PushPullPacks. */
    public PushPullPacks: IPushPullPack[];

    /**
     * Creates a new PushPullRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PushPullRequest instance
     */
    public static create(properties?: IPushPullRequest): PushPullRequest;

    /**
     * Encodes the specified PushPullRequest message. Does not implicitly {@link PushPullRequest.verify|verify} messages.
     * @param message PushPullRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPushPullRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PushPullRequest message, length delimited. Does not implicitly {@link PushPullRequest.verify|verify} messages.
     * @param message PushPullRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPushPullRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PushPullRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PushPullRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PushPullRequest;

    /**
     * Decodes a PushPullRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PushPullRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PushPullRequest;

    /**
     * Verifies a PushPullRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PushPullRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PushPullRequest
     */
    public static fromObject(object: { [k: string]: any }): PushPullRequest;

    /**
     * Creates a plain object from a PushPullRequest message. Also converts values to other types if specified.
     * @param message PushPullRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PushPullRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PushPullRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a PushPullResponse. */
export class PushPullResponse implements IPushPullResponse {

    /**
     * Constructs a new PushPullResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPushPullResponse);

    /** PushPullResponse header. */
    public header?: (IMessageHeader|null);

    /** PushPullResponse ID. */
    public ID: number;

    /** PushPullResponse PushPullPacks. */
    public PushPullPacks: IPushPullPack[];

    /**
     * Creates a new PushPullResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PushPullResponse instance
     */
    public static create(properties?: IPushPullResponse): PushPullResponse;

    /**
     * Encodes the specified PushPullResponse message. Does not implicitly {@link PushPullResponse.verify|verify} messages.
     * @param message PushPullResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPushPullResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PushPullResponse message, length delimited. Does not implicitly {@link PushPullResponse.verify|verify} messages.
     * @param message PushPullResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPushPullResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PushPullResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PushPullResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PushPullResponse;

    /**
     * Decodes a PushPullResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PushPullResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PushPullResponse;

    /**
     * Verifies a PushPullResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PushPullResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PushPullResponse
     */
    public static fromObject(object: { [k: string]: any }): PushPullResponse;

    /**
     * Creates a plain object from a PushPullResponse message. Also converts values to other types if specified.
     * @param message PushPullResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PushPullResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PushPullResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an OrtooService */
export class OrtooService extends $protobuf.rpc.Service {

    /**
     * Constructs a new OrtooService service.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     */
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

    /**
     * Creates new OrtooService service using the specified rpc implementation.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     * @returns RPC service. Useful where requests and/or responses are streamed.
     */
    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): OrtooService;

    /**
     * Calls ProcessPushPull.
     * @param request PushPullRequest message or plain object
     * @param callback Node-style callback called with the error, if any, and PushPullResponse
     */
    public processPushPull(request: IPushPullRequest, callback: OrtooService.ProcessPushPullCallback): void;

    /**
     * Calls ProcessPushPull.
     * @param request PushPullRequest message or plain object
     * @returns Promise
     */
    public processPushPull(request: IPushPullRequest): Promise<PushPullResponse>;

    /**
     * Calls ProcessClient.
     * @param request ClientRequest message or plain object
     * @param callback Node-style callback called with the error, if any, and ClientResponse
     */
    public processClient(request: IClientRequest, callback: OrtooService.ProcessClientCallback): void;

    /**
     * Calls ProcessClient.
     * @param request ClientRequest message or plain object
     * @returns Promise
     */
    public processClient(request: IClientRequest): Promise<ClientResponse>;
}

export namespace OrtooService {

    /**
     * Callback as used by {@link OrtooService#processPushPull}.
     * @param error Error, if any
     * @param [response] PushPullResponse
     */
    type ProcessPushPullCallback = (error: (Error|null), response?: PushPullResponse) => void;

    /**
     * Callback as used by {@link OrtooService#processClient}.
     * @param error Error, if any
     * @param [response] ClientResponse
     */
    type ProcessClientCallback = (error: (Error|null), response?: ClientResponse) => void;
}

/** Represents a Client. */
export class Client implements IClient {

    /**
     * Constructs a new Client.
     * @param [properties] Properties to set
     */
    constructor(properties?: IClient);

    /** Client CUID. */
    public CUID: Uint8Array;

    /** Client alias. */
    public alias: string;

    /** Client collection. */
    public collection: string;

    /** Client syncType. */
    public syncType: SyncType;

    /**
     * Creates a new Client instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Client instance
     */
    public static create(properties?: IClient): Client;

    /**
     * Encodes the specified Client message. Does not implicitly {@link Client.verify|verify} messages.
     * @param message Client message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IClient, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Client message, length delimited. Does not implicitly {@link Client.verify|verify} messages.
     * @param message Client message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IClient, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Client message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Client
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Client;

    /**
     * Decodes a Client message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Client
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Client;

    /**
     * Verifies a Client message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Client message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Client
     */
    public static fromObject(object: { [k: string]: any }): Client;

    /**
     * Creates a plain object from a Client message. Also converts values to other types if specified.
     * @param message Client
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Client, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Client to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** SyncType enum. */
export enum SyncType {
    LOCAL_ONLY = 0,
    MANUALLY = 1,
    NOTIFIABLE = 2
}

/** Represents a Timestamp. */
export class Timestamp implements ITimestamp {

    /**
     * Constructs a new Timestamp.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITimestamp);

    /** Timestamp era. */
    public era: number;

    /** Timestamp lamport. */
    public lamport: (number|Long);

    /** Timestamp CUID. */
    public CUID: Uint8Array;

    /** Timestamp delimiter. */
    public delimiter: number;

    /**
     * Creates a new Timestamp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Timestamp instance
     */
    public static create(properties?: ITimestamp): Timestamp;

    /**
     * Encodes the specified Timestamp message. Does not implicitly {@link Timestamp.verify|verify} messages.
     * @param message Timestamp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link Timestamp.verify|verify} messages.
     * @param message Timestamp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Timestamp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Timestamp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Timestamp;

    /**
     * Decodes a Timestamp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Timestamp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Timestamp;

    /**
     * Verifies a Timestamp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Timestamp
     */
    public static fromObject(object: { [k: string]: any }): Timestamp;

    /**
     * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
     * @param message Timestamp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Timestamp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an OperationID. */
export class OperationID implements IOperationID {

    /**
     * Constructs a new OperationID.
     * @param [properties] Properties to set
     */
    constructor(properties?: IOperationID);

    /** OperationID era. */
    public era: number;

    /** OperationID lamport. */
    public lamport: (number|Long);

    /** OperationID CUID. */
    public CUID: Uint8Array;

    /** OperationID seq. */
    public seq: (number|Long);

    /**
     * Creates a new OperationID instance using the specified properties.
     * @param [properties] Properties to set
     * @returns OperationID instance
     */
    public static create(properties?: IOperationID): OperationID;

    /**
     * Encodes the specified OperationID message. Does not implicitly {@link OperationID.verify|verify} messages.
     * @param message OperationID message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IOperationID, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified OperationID message, length delimited. Does not implicitly {@link OperationID.verify|verify} messages.
     * @param message OperationID message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IOperationID, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an OperationID message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns OperationID
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): OperationID;

    /**
     * Decodes an OperationID message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns OperationID
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): OperationID;

    /**
     * Verifies an OperationID message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an OperationID message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns OperationID
     */
    public static fromObject(object: { [k: string]: any }): OperationID;

    /**
     * Creates a plain object from an OperationID message. Also converts values to other types if specified.
     * @param message OperationID
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: OperationID, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this OperationID to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an Operation. */
export class Operation implements IOperation {

    /**
     * Constructs a new Operation.
     * @param [properties] Properties to set
     */
    constructor(properties?: IOperation);

    /** Operation ID. */
    public ID?: (IOperationID|null);

    /** Operation opType. */
    public opType: TypeOfOperation;

    /** Operation body. */
    public body: Uint8Array;

    /**
     * Creates a new Operation instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Operation instance
     */
    public static create(properties?: IOperation): Operation;

    /**
     * Encodes the specified Operation message. Does not implicitly {@link Operation.verify|verify} messages.
     * @param message Operation message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IOperation, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Operation message, length delimited. Does not implicitly {@link Operation.verify|verify} messages.
     * @param message Operation message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IOperation, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Operation message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Operation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Operation;

    /**
     * Decodes an Operation message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Operation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Operation;

    /**
     * Verifies an Operation message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Operation message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Operation
     */
    public static fromObject(object: { [k: string]: any }): Operation;

    /**
     * Creates a plain object from an Operation message. Also converts values to other types if specified.
     * @param message Operation
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Operation, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Operation to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** TypeOfOperation enum. */
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
    DOCUMENT_UPD_ARR = 45
}

/** TypeOfDatatype enum. */
export enum TypeOfDatatype {
    COUNTER = 0,
    HASH_MAP = 1,
    LIST = 2,
    DOCUMENT = 3
}

/** StateOfDatatype enum. */
export enum StateOfDatatype {
    DUE_TO_CREATE = 0,
    DUE_TO_SUBSCRIBE = 1,
    DUE_TO_SUBSCRIBE_CREATE = 2,
    SUBSCRIBED = 4,
    DUE_TO_UNSUBSCRIBE = 5,
    UNSUBSCRIBED = 6,
    DELETED = 7
}

/** Represents a PushPullPack. */
export class PushPullPack implements IPushPullPack {

    /**
     * Constructs a new PushPullPack.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPushPullPack);

    /** PushPullPack DUID. */
    public DUID: Uint8Array;

    /** PushPullPack key. */
    public key: string;

    /** PushPullPack option. */
    public option: number;

    /** PushPullPack checkPoint. */
    public checkPoint?: (ICheckPoint|null);

    /** PushPullPack era. */
    public era: number;

    /** PushPullPack type. */
    public type: number;

    /** PushPullPack operations. */
    public operations: IOperation[];

    /**
     * Creates a new PushPullPack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PushPullPack instance
     */
    public static create(properties?: IPushPullPack): PushPullPack;

    /**
     * Encodes the specified PushPullPack message. Does not implicitly {@link PushPullPack.verify|verify} messages.
     * @param message PushPullPack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPushPullPack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PushPullPack message, length delimited. Does not implicitly {@link PushPullPack.verify|verify} messages.
     * @param message PushPullPack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPushPullPack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PushPullPack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PushPullPack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PushPullPack;

    /**
     * Decodes a PushPullPack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PushPullPack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PushPullPack;

    /**
     * Verifies a PushPullPack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PushPullPack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PushPullPack
     */
    public static fromObject(object: { [k: string]: any }): PushPullPack;

    /**
     * Creates a plain object from a PushPullPack message. Also converts values to other types if specified.
     * @param message PushPullPack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PushPullPack, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PushPullPack to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a CheckPoint. */
export class CheckPoint implements ICheckPoint {

    /**
     * Constructs a new CheckPoint.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICheckPoint);

    /** CheckPoint sseq. */
    public sseq: (number|Long);

    /** CheckPoint cseq. */
    public cseq: (number|Long);

    /**
     * Creates a new CheckPoint instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CheckPoint instance
     */
    public static create(properties?: ICheckPoint): CheckPoint;

    /**
     * Encodes the specified CheckPoint message. Does not implicitly {@link CheckPoint.verify|verify} messages.
     * @param message CheckPoint message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICheckPoint, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CheckPoint message, length delimited. Does not implicitly {@link CheckPoint.verify|verify} messages.
     * @param message CheckPoint message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICheckPoint, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CheckPoint message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CheckPoint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CheckPoint;

    /**
     * Decodes a CheckPoint message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CheckPoint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CheckPoint;

    /**
     * Verifies a CheckPoint message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CheckPoint message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CheckPoint
     */
    public static fromObject(object: { [k: string]: any }): CheckPoint;

    /**
     * Creates a plain object from a CheckPoint message. Also converts values to other types if specified.
     * @param message CheckPoint
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CheckPoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CheckPoint to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a NotificationPushPull. */
export class NotificationPushPull implements INotificationPushPull {

    /**
     * Constructs a new NotificationPushPull.
     * @param [properties] Properties to set
     */
    constructor(properties?: INotificationPushPull);

    /** NotificationPushPull CUID. */
    public CUID: string;

    /** NotificationPushPull DUID. */
    public DUID: string;

    /** NotificationPushPull sseq. */
    public sseq: (number|Long);

    /**
     * Creates a new NotificationPushPull instance using the specified properties.
     * @param [properties] Properties to set
     * @returns NotificationPushPull instance
     */
    public static create(properties?: INotificationPushPull): NotificationPushPull;

    /**
     * Encodes the specified NotificationPushPull message. Does not implicitly {@link NotificationPushPull.verify|verify} messages.
     * @param message NotificationPushPull message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: INotificationPushPull, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified NotificationPushPull message, length delimited. Does not implicitly {@link NotificationPushPull.verify|verify} messages.
     * @param message NotificationPushPull message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: INotificationPushPull, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a NotificationPushPull message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns NotificationPushPull
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): NotificationPushPull;

    /**
     * Decodes a NotificationPushPull message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns NotificationPushPull
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): NotificationPushPull;

    /**
     * Verifies a NotificationPushPull message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a NotificationPushPull message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns NotificationPushPull
     */
    public static fromObject(object: { [k: string]: any }): NotificationPushPull;

    /**
     * Creates a plain object from a NotificationPushPull message. Also converts values to other types if specified.
     * @param message NotificationPushPull
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: NotificationPushPull, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this NotificationPushPull to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a DatatypeMeta. */
export class DatatypeMeta implements IDatatypeMeta {

    /**
     * Constructs a new DatatypeMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDatatypeMeta);

    /** DatatypeMeta key. */
    public key: string;

    /** DatatypeMeta DUID. */
    public DUID: Uint8Array;

    /** DatatypeMeta opID. */
    public opID?: (IOperationID|null);

    /** DatatypeMeta typeOf. */
    public typeOf: TypeOfDatatype;

    /** DatatypeMeta state. */
    public state: StateOfDatatype;

    /**
     * Creates a new DatatypeMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DatatypeMeta instance
     */
    public static create(properties?: IDatatypeMeta): DatatypeMeta;

    /**
     * Encodes the specified DatatypeMeta message. Does not implicitly {@link DatatypeMeta.verify|verify} messages.
     * @param message DatatypeMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDatatypeMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DatatypeMeta message, length delimited. Does not implicitly {@link DatatypeMeta.verify|verify} messages.
     * @param message DatatypeMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDatatypeMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DatatypeMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DatatypeMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DatatypeMeta;

    /**
     * Decodes a DatatypeMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DatatypeMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DatatypeMeta;

    /**
     * Verifies a DatatypeMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DatatypeMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DatatypeMeta
     */
    public static fromObject(object: { [k: string]: any }): DatatypeMeta;

    /**
     * Creates a plain object from a DatatypeMeta message. Also converts values to other types if specified.
     * @param message DatatypeMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DatatypeMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DatatypeMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
