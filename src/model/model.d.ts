import * as $protobuf from "protobufjs";
/** Namespace model. */
export namespace model {

    /** Properties of a Client. */
    interface IClient {

        /** Client CUID */
        CUID?: (Uint8Array|null);

        /** Client alias */
        alias?: (string|null);

        /** Client collection */
        collection?: (string|null);

        /** Client syncType */
        syncType?: (model.SyncType|null);
    }

    /** Represents a Client. */
    class Client implements IClient {

        /**
         * Constructs a new Client.
         * @param [properties] Properties to set
         */
        constructor(properties?: model.IClient);

        /** Client CUID. */
        public CUID: Uint8Array;

        /** Client alias. */
        public alias: string;

        /** Client collection. */
        public collection: string;

        /** Client syncType. */
        public syncType: model.SyncType;

        /**
         * Creates a new Client instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Client instance
         */
        public static create(properties?: model.IClient): model.Client;

        /**
         * Encodes the specified Client message. Does not implicitly {@link model.Client.verify|verify} messages.
         * @param message Client message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: model.IClient, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Client message, length delimited. Does not implicitly {@link model.Client.verify|verify} messages.
         * @param message Client message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: model.IClient, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Client message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Client
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): model.Client;

        /**
         * Decodes a Client message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Client
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): model.Client;

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
        public static fromObject(object: { [k: string]: any }): model.Client;

        /**
         * Creates a plain object from a Client message. Also converts values to other types if specified.
         * @param message Client
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: model.Client, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Client to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** SyncType enum. */
    enum SyncType {
        LOCAL_ONLY = 0,
        MANUALLY = 1,
        NOTIFIABLE = 2
    }

    /** Properties of a Timestamp. */
    interface ITimestamp {

        /** Timestamp era */
        era?: (number|null);

        /** Timestamp lamport */
        lamport?: (number|Long|null);

        /** Timestamp CUID */
        CUID?: (Uint8Array|null);

        /** Timestamp delimiter */
        delimiter?: (number|null);
    }

    /** Represents a Timestamp. */
    class Timestamp implements ITimestamp {

        /**
         * Constructs a new Timestamp.
         * @param [properties] Properties to set
         */
        constructor(properties?: model.ITimestamp);

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
        public static create(properties?: model.ITimestamp): model.Timestamp;

        /**
         * Encodes the specified Timestamp message. Does not implicitly {@link model.Timestamp.verify|verify} messages.
         * @param message Timestamp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: model.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link model.Timestamp.verify|verify} messages.
         * @param message Timestamp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: model.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Timestamp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Timestamp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): model.Timestamp;

        /**
         * Decodes a Timestamp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Timestamp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): model.Timestamp;

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
        public static fromObject(object: { [k: string]: any }): model.Timestamp;

        /**
         * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
         * @param message Timestamp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: model.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Timestamp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an OperationID. */
    interface IOperationID {

        /** OperationID era */
        era?: (number|null);

        /** OperationID lamport */
        lamport?: (number|Long|null);

        /** OperationID CUID */
        CUID?: (Uint8Array|null);

        /** OperationID seq */
        seq?: (number|Long|null);
    }

    /** Represents an OperationID. */
    class OperationID implements IOperationID {

        /**
         * Constructs a new OperationID.
         * @param [properties] Properties to set
         */
        constructor(properties?: model.IOperationID);

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
        public static create(properties?: model.IOperationID): model.OperationID;

        /**
         * Encodes the specified OperationID message. Does not implicitly {@link model.OperationID.verify|verify} messages.
         * @param message OperationID message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: model.IOperationID, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OperationID message, length delimited. Does not implicitly {@link model.OperationID.verify|verify} messages.
         * @param message OperationID message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: model.IOperationID, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OperationID message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OperationID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): model.OperationID;

        /**
         * Decodes an OperationID message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OperationID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): model.OperationID;

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
        public static fromObject(object: { [k: string]: any }): model.OperationID;

        /**
         * Creates a plain object from an OperationID message. Also converts values to other types if specified.
         * @param message OperationID
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: model.OperationID, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OperationID to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Operation. */
    interface IOperation {

        /** Operation ID */
        ID?: (model.IOperationID|null);

        /** Operation opType */
        opType?: (model.TypeOfOperation|null);

        /** Operation body */
        body?: (Uint8Array|null);
    }

    /** Represents an Operation. */
    class Operation implements IOperation {

        /**
         * Constructs a new Operation.
         * @param [properties] Properties to set
         */
        constructor(properties?: model.IOperation);

        /** Operation ID. */
        public ID?: (model.IOperationID|null);

        /** Operation opType. */
        public opType: model.TypeOfOperation;

        /** Operation body. */
        public body: Uint8Array;

        /**
         * Creates a new Operation instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Operation instance
         */
        public static create(properties?: model.IOperation): model.Operation;

        /**
         * Encodes the specified Operation message. Does not implicitly {@link model.Operation.verify|verify} messages.
         * @param message Operation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: model.IOperation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Operation message, length delimited. Does not implicitly {@link model.Operation.verify|verify} messages.
         * @param message Operation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: model.IOperation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Operation message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Operation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): model.Operation;

        /**
         * Decodes an Operation message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Operation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): model.Operation;

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
        public static fromObject(object: { [k: string]: any }): model.Operation;

        /**
         * Creates a plain object from an Operation message. Also converts values to other types if specified.
         * @param message Operation
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: model.Operation, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Operation to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** TypeOfOperation enum. */
    enum TypeOfOperation {
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
    enum TypeOfDatatype {
        COUNTER = 0,
        HASH_MAP = 1,
        LIST = 2,
        DOCUMENT = 3
    }

    /** StateOfDatatype enum. */
    enum StateOfDatatype {
        DUE_TO_CREATE = 0,
        DUE_TO_SUBSCRIBE = 1,
        DUE_TO_SUBSCRIBE_CREATE = 2,
        SUBSCRIBED = 4,
        DUE_TO_UNSUBSCRIBE = 5,
        UNSUBSCRIBED = 6,
        DELETED = 7
    }

    /** Properties of a PushPullPack. */
    interface IPushPullPack {

        /** PushPullPack DUID */
        DUID?: (Uint8Array|null);

        /** PushPullPack key */
        key?: (string|null);

        /** PushPullPack option */
        option?: (number|null);

        /** PushPullPack checkPoint */
        checkPoint?: (model.ICheckPoint|null);

        /** PushPullPack era */
        era?: (number|null);

        /** PushPullPack type */
        type?: (number|null);

        /** PushPullPack operations */
        operations?: (model.IOperation[]|null);
    }

    /** Represents a PushPullPack. */
    class PushPullPack implements IPushPullPack {

        /**
         * Constructs a new PushPullPack.
         * @param [properties] Properties to set
         */
        constructor(properties?: model.IPushPullPack);

        /** PushPullPack DUID. */
        public DUID: Uint8Array;

        /** PushPullPack key. */
        public key: string;

        /** PushPullPack option. */
        public option: number;

        /** PushPullPack checkPoint. */
        public checkPoint?: (model.ICheckPoint|null);

        /** PushPullPack era. */
        public era: number;

        /** PushPullPack type. */
        public type: number;

        /** PushPullPack operations. */
        public operations: model.IOperation[];

        /**
         * Creates a new PushPullPack instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PushPullPack instance
         */
        public static create(properties?: model.IPushPullPack): model.PushPullPack;

        /**
         * Encodes the specified PushPullPack message. Does not implicitly {@link model.PushPullPack.verify|verify} messages.
         * @param message PushPullPack message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: model.IPushPullPack, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PushPullPack message, length delimited. Does not implicitly {@link model.PushPullPack.verify|verify} messages.
         * @param message PushPullPack message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: model.IPushPullPack, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PushPullPack message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PushPullPack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): model.PushPullPack;

        /**
         * Decodes a PushPullPack message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PushPullPack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): model.PushPullPack;

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
        public static fromObject(object: { [k: string]: any }): model.PushPullPack;

        /**
         * Creates a plain object from a PushPullPack message. Also converts values to other types if specified.
         * @param message PushPullPack
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: model.PushPullPack, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PushPullPack to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CheckPoint. */
    interface ICheckPoint {

        /** CheckPoint sseq */
        sseq?: (number|Long|null);

        /** CheckPoint cseq */
        cseq?: (number|Long|null);
    }

    /** Represents a CheckPoint. */
    class CheckPoint implements ICheckPoint {

        /**
         * Constructs a new CheckPoint.
         * @param [properties] Properties to set
         */
        constructor(properties?: model.ICheckPoint);

        /** CheckPoint sseq. */
        public sseq: (number|Long);

        /** CheckPoint cseq. */
        public cseq: (number|Long);

        /**
         * Creates a new CheckPoint instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CheckPoint instance
         */
        public static create(properties?: model.ICheckPoint): model.CheckPoint;

        /**
         * Encodes the specified CheckPoint message. Does not implicitly {@link model.CheckPoint.verify|verify} messages.
         * @param message CheckPoint message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: model.ICheckPoint, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CheckPoint message, length delimited. Does not implicitly {@link model.CheckPoint.verify|verify} messages.
         * @param message CheckPoint message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: model.ICheckPoint, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CheckPoint message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CheckPoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): model.CheckPoint;

        /**
         * Decodes a CheckPoint message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CheckPoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): model.CheckPoint;

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
        public static fromObject(object: { [k: string]: any }): model.CheckPoint;

        /**
         * Creates a plain object from a CheckPoint message. Also converts values to other types if specified.
         * @param message CheckPoint
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: model.CheckPoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CheckPoint to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NotificationPushPull. */
    interface INotificationPushPull {

        /** NotificationPushPull CUID */
        CUID?: (string|null);

        /** NotificationPushPull DUID */
        DUID?: (string|null);

        /** NotificationPushPull sseq */
        sseq?: (number|Long|null);
    }

    /** Represents a NotificationPushPull. */
    class NotificationPushPull implements INotificationPushPull {

        /**
         * Constructs a new NotificationPushPull.
         * @param [properties] Properties to set
         */
        constructor(properties?: model.INotificationPushPull);

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
        public static create(properties?: model.INotificationPushPull): model.NotificationPushPull;

        /**
         * Encodes the specified NotificationPushPull message. Does not implicitly {@link model.NotificationPushPull.verify|verify} messages.
         * @param message NotificationPushPull message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: model.INotificationPushPull, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NotificationPushPull message, length delimited. Does not implicitly {@link model.NotificationPushPull.verify|verify} messages.
         * @param message NotificationPushPull message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: model.INotificationPushPull, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NotificationPushPull message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NotificationPushPull
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): model.NotificationPushPull;

        /**
         * Decodes a NotificationPushPull message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NotificationPushPull
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): model.NotificationPushPull;

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
        public static fromObject(object: { [k: string]: any }): model.NotificationPushPull;

        /**
         * Creates a plain object from a NotificationPushPull message. Also converts values to other types if specified.
         * @param message NotificationPushPull
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: model.NotificationPushPull, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NotificationPushPull to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DatatypeMeta. */
    interface IDatatypeMeta {

        /** DatatypeMeta key */
        key?: (string|null);

        /** DatatypeMeta DUID */
        DUID?: (Uint8Array|null);

        /** DatatypeMeta opID */
        opID?: (model.IOperationID|null);

        /** DatatypeMeta typeOf */
        typeOf?: (model.TypeOfDatatype|null);

        /** DatatypeMeta state */
        state?: (model.StateOfDatatype|null);
    }

    /** Represents a DatatypeMeta. */
    class DatatypeMeta implements IDatatypeMeta {

        /**
         * Constructs a new DatatypeMeta.
         * @param [properties] Properties to set
         */
        constructor(properties?: model.IDatatypeMeta);

        /** DatatypeMeta key. */
        public key: string;

        /** DatatypeMeta DUID. */
        public DUID: Uint8Array;

        /** DatatypeMeta opID. */
        public opID?: (model.IOperationID|null);

        /** DatatypeMeta typeOf. */
        public typeOf: model.TypeOfDatatype;

        /** DatatypeMeta state. */
        public state: model.StateOfDatatype;

        /**
         * Creates a new DatatypeMeta instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DatatypeMeta instance
         */
        public static create(properties?: model.IDatatypeMeta): model.DatatypeMeta;

        /**
         * Encodes the specified DatatypeMeta message. Does not implicitly {@link model.DatatypeMeta.verify|verify} messages.
         * @param message DatatypeMeta message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: model.IDatatypeMeta, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DatatypeMeta message, length delimited. Does not implicitly {@link model.DatatypeMeta.verify|verify} messages.
         * @param message DatatypeMeta message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: model.IDatatypeMeta, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DatatypeMeta message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DatatypeMeta
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): model.DatatypeMeta;

        /**
         * Decodes a DatatypeMeta message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DatatypeMeta
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): model.DatatypeMeta;

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
        public static fromObject(object: { [k: string]: any }): model.DatatypeMeta;

        /**
         * Creates a plain object from a DatatypeMeta message. Also converts values to other types if specified.
         * @param message DatatypeMeta
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: model.DatatypeMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DatatypeMeta to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MessageHeader. */
    interface IMessageHeader {

        /** MessageHeader version */
        version?: (string|null);

        /** MessageHeader seq */
        seq?: (number|null);

        /** MessageHeader typeOf */
        typeOf?: (model.TypeOfMessage|null);

        /** MessageHeader collection */
        collection?: (string|null);

        /** MessageHeader clientAlias */
        clientAlias?: (string|null);

        /** MessageHeader cuid */
        cuid?: (Uint8Array|null);
    }

    /** Represents a MessageHeader. */
    class MessageHeader implements IMessageHeader {

        /**
         * Constructs a new MessageHeader.
         * @param [properties] Properties to set
         */
        constructor(properties?: model.IMessageHeader);

        /** MessageHeader version. */
        public version: string;

        /** MessageHeader seq. */
        public seq: number;

        /** MessageHeader typeOf. */
        public typeOf: model.TypeOfMessage;

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
        public static create(properties?: model.IMessageHeader): model.MessageHeader;

        /**
         * Encodes the specified MessageHeader message. Does not implicitly {@link model.MessageHeader.verify|verify} messages.
         * @param message MessageHeader message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: model.IMessageHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MessageHeader message, length delimited. Does not implicitly {@link model.MessageHeader.verify|verify} messages.
         * @param message MessageHeader message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: model.IMessageHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MessageHeader message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MessageHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): model.MessageHeader;

        /**
         * Decodes a MessageHeader message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MessageHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): model.MessageHeader;

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
        public static fromObject(object: { [k: string]: any }): model.MessageHeader;

        /**
         * Creates a plain object from a MessageHeader message. Also converts values to other types if specified.
         * @param message MessageHeader
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: model.MessageHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MessageHeader to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** TypeOfMessage enum. */
    enum TypeOfMessage {
        REQUEST_CLIENT = 0,
        REQUEST_PUSHPULL = 1,
        RESPONSE_CLIENT = 10,
        RESPONSE_PUSHPULL = 11
    }

    /** StateOfResponse enum. */
    enum StateOfResponse {
        OK = 0,
        ERR_CLIENT_INVALID_COLLECTION = 101,
        ERR_CLIENT_INVALID_SYNCTYPE = 102
    }

    /** Properties of a ResponseState. */
    interface IResponseState {

        /** ResponseState state */
        state?: (model.StateOfResponse|null);

        /** ResponseState msg */
        msg?: (string|null);
    }

    /** Represents a ResponseState. */
    class ResponseState implements IResponseState {

        /**
         * Constructs a new ResponseState.
         * @param [properties] Properties to set
         */
        constructor(properties?: model.IResponseState);

        /** ResponseState state. */
        public state: model.StateOfResponse;

        /** ResponseState msg. */
        public msg: string;

        /**
         * Creates a new ResponseState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponseState instance
         */
        public static create(properties?: model.IResponseState): model.ResponseState;

        /**
         * Encodes the specified ResponseState message. Does not implicitly {@link model.ResponseState.verify|verify} messages.
         * @param message ResponseState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: model.IResponseState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResponseState message, length delimited. Does not implicitly {@link model.ResponseState.verify|verify} messages.
         * @param message ResponseState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: model.IResponseState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResponseState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResponseState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): model.ResponseState;

        /**
         * Decodes a ResponseState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResponseState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): model.ResponseState;

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
        public static fromObject(object: { [k: string]: any }): model.ResponseState;

        /**
         * Creates a plain object from a ResponseState message. Also converts values to other types if specified.
         * @param message ResponseState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: model.ResponseState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResponseState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ClientRequest. */
    interface IClientRequest {

        /** ClientRequest header */
        header?: (model.IMessageHeader|null);

        /** ClientRequest client */
        client?: (model.IClient|null);
    }

    /** Represents a ClientRequest. */
    class ClientRequest implements IClientRequest {

        /**
         * Constructs a new ClientRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: model.IClientRequest);

        /** ClientRequest header. */
        public header?: (model.IMessageHeader|null);

        /** ClientRequest client. */
        public client?: (model.IClient|null);

        /**
         * Creates a new ClientRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientRequest instance
         */
        public static create(properties?: model.IClientRequest): model.ClientRequest;

        /**
         * Encodes the specified ClientRequest message. Does not implicitly {@link model.ClientRequest.verify|verify} messages.
         * @param message ClientRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: model.IClientRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientRequest message, length delimited. Does not implicitly {@link model.ClientRequest.verify|verify} messages.
         * @param message ClientRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: model.IClientRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): model.ClientRequest;

        /**
         * Decodes a ClientRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): model.ClientRequest;

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
        public static fromObject(object: { [k: string]: any }): model.ClientRequest;

        /**
         * Creates a plain object from a ClientRequest message. Also converts values to other types if specified.
         * @param message ClientRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: model.ClientRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ClientResponse. */
    interface IClientResponse {

        /** ClientResponse header */
        header?: (model.IMessageHeader|null);

        /** ClientResponse state */
        state?: (model.IResponseState|null);
    }

    /** Represents a ClientResponse. */
    class ClientResponse implements IClientResponse {

        /**
         * Constructs a new ClientResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: model.IClientResponse);

        /** ClientResponse header. */
        public header?: (model.IMessageHeader|null);

        /** ClientResponse state. */
        public state?: (model.IResponseState|null);

        /**
         * Creates a new ClientResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientResponse instance
         */
        public static create(properties?: model.IClientResponse): model.ClientResponse;

        /**
         * Encodes the specified ClientResponse message. Does not implicitly {@link model.ClientResponse.verify|verify} messages.
         * @param message ClientResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: model.IClientResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientResponse message, length delimited. Does not implicitly {@link model.ClientResponse.verify|verify} messages.
         * @param message ClientResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: model.IClientResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): model.ClientResponse;

        /**
         * Decodes a ClientResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): model.ClientResponse;

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
        public static fromObject(object: { [k: string]: any }): model.ClientResponse;

        /**
         * Creates a plain object from a ClientResponse message. Also converts values to other types if specified.
         * @param message ClientResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: model.ClientResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PushPullRequest. */
    interface IPushPullRequest {

        /** PushPullRequest header */
        header?: (model.IMessageHeader|null);

        /** PushPullRequest ID */
        ID?: (number|null);

        /** PushPullRequest PushPullPacks */
        PushPullPacks?: (model.IPushPullPack[]|null);
    }

    /** Represents a PushPullRequest. */
    class PushPullRequest implements IPushPullRequest {

        /**
         * Constructs a new PushPullRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: model.IPushPullRequest);

        /** PushPullRequest header. */
        public header?: (model.IMessageHeader|null);

        /** PushPullRequest ID. */
        public ID: number;

        /** PushPullRequest PushPullPacks. */
        public PushPullPacks: model.IPushPullPack[];

        /**
         * Creates a new PushPullRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PushPullRequest instance
         */
        public static create(properties?: model.IPushPullRequest): model.PushPullRequest;

        /**
         * Encodes the specified PushPullRequest message. Does not implicitly {@link model.PushPullRequest.verify|verify} messages.
         * @param message PushPullRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: model.IPushPullRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PushPullRequest message, length delimited. Does not implicitly {@link model.PushPullRequest.verify|verify} messages.
         * @param message PushPullRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: model.IPushPullRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PushPullRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PushPullRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): model.PushPullRequest;

        /**
         * Decodes a PushPullRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PushPullRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): model.PushPullRequest;

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
        public static fromObject(object: { [k: string]: any }): model.PushPullRequest;

        /**
         * Creates a plain object from a PushPullRequest message. Also converts values to other types if specified.
         * @param message PushPullRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: model.PushPullRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PushPullRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PushPullResponse. */
    interface IPushPullResponse {

        /** PushPullResponse header */
        header?: (model.IMessageHeader|null);

        /** PushPullResponse ID */
        ID?: (number|null);

        /** PushPullResponse PushPullPacks */
        PushPullPacks?: (model.IPushPullPack[]|null);
    }

    /** Represents a PushPullResponse. */
    class PushPullResponse implements IPushPullResponse {

        /**
         * Constructs a new PushPullResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: model.IPushPullResponse);

        /** PushPullResponse header. */
        public header?: (model.IMessageHeader|null);

        /** PushPullResponse ID. */
        public ID: number;

        /** PushPullResponse PushPullPacks. */
        public PushPullPacks: model.IPushPullPack[];

        /**
         * Creates a new PushPullResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PushPullResponse instance
         */
        public static create(properties?: model.IPushPullResponse): model.PushPullResponse;

        /**
         * Encodes the specified PushPullResponse message. Does not implicitly {@link model.PushPullResponse.verify|verify} messages.
         * @param message PushPullResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: model.IPushPullResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PushPullResponse message, length delimited. Does not implicitly {@link model.PushPullResponse.verify|verify} messages.
         * @param message PushPullResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: model.IPushPullResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PushPullResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PushPullResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): model.PushPullResponse;

        /**
         * Decodes a PushPullResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PushPullResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): model.PushPullResponse;

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
        public static fromObject(object: { [k: string]: any }): model.PushPullResponse;

        /**
         * Creates a plain object from a PushPullResponse message. Also converts values to other types if specified.
         * @param message PushPullResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: model.PushPullResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PushPullResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Represents an OrtooService */
    class OrtooService extends $protobuf.rpc.Service {

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
        public processPushPull(request: model.IPushPullRequest, callback: model.OrtooService.ProcessPushPullCallback): void;

        /**
         * Calls ProcessPushPull.
         * @param request PushPullRequest message or plain object
         * @returns Promise
         */
        public processPushPull(request: model.IPushPullRequest): Promise<model.PushPullResponse>;

        /**
         * Calls ProcessClient.
         * @param request ClientRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and ClientResponse
         */
        public processClient(request: model.IClientRequest, callback: model.OrtooService.ProcessClientCallback): void;

        /**
         * Calls ProcessClient.
         * @param request ClientRequest message or plain object
         * @returns Promise
         */
        public processClient(request: model.IClientRequest): Promise<model.ClientResponse>;
    }

    namespace OrtooService {

        /**
         * Callback as used by {@link model.OrtooService#processPushPull}.
         * @param error Error, if any
         * @param [response] PushPullResponse
         */
        type ProcessPushPullCallback = (error: (Error|null), response?: model.PushPullResponse) => void;

        /**
         * Callback as used by {@link model.OrtooService#processClient}.
         * @param error Error, if any
         * @param [response] ClientResponse
         */
        type ProcessClientCallback = (error: (Error|null), response?: model.ClientResponse) => void;
    }
}
