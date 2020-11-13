/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.model = (function() {
    
        /**
         * Namespace model.
         * @exports model
         * @namespace
         */
        var model = {};
    
        model.Client = (function() {
    
            /**
             * Properties of a Client.
             * @memberof model
             * @interface IClient
             * @property {Uint8Array|null} [CUID] Client CUID
             * @property {string|null} [alias] Client alias
             * @property {string|null} [collection] Client collection
             * @property {model.SyncType|null} [syncType] Client syncType
             */
    
            /**
             * Constructs a new Client.
             * @memberof model
             * @classdesc Represents a Client.
             * @implements IClient
             * @constructor
             * @param {model.IClient=} [properties] Properties to set
             */
            function Client(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Client CUID.
             * @member {Uint8Array} CUID
             * @memberof model.Client
             * @instance
             */
            Client.prototype.CUID = $util.newBuffer([]);
    
            /**
             * Client alias.
             * @member {string} alias
             * @memberof model.Client
             * @instance
             */
            Client.prototype.alias = "";
    
            /**
             * Client collection.
             * @member {string} collection
             * @memberof model.Client
             * @instance
             */
            Client.prototype.collection = "";
    
            /**
             * Client syncType.
             * @member {model.SyncType} syncType
             * @memberof model.Client
             * @instance
             */
            Client.prototype.syncType = 0;
    
            /**
             * Creates a new Client instance using the specified properties.
             * @function create
             * @memberof model.Client
             * @static
             * @param {model.IClient=} [properties] Properties to set
             * @returns {model.Client} Client instance
             */
            Client.create = function create(properties) {
                return new Client(properties);
            };
    
            /**
             * Encodes the specified Client message. Does not implicitly {@link model.Client.verify|verify} messages.
             * @function encode
             * @memberof model.Client
             * @static
             * @param {model.IClient} message Client message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Client.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.CUID != null && Object.hasOwnProperty.call(message, "CUID"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.CUID);
                if (message.alias != null && Object.hasOwnProperty.call(message, "alias"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.alias);
                if (message.collection != null && Object.hasOwnProperty.call(message, "collection"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.collection);
                if (message.syncType != null && Object.hasOwnProperty.call(message, "syncType"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.syncType);
                return writer;
            };
    
            /**
             * Encodes the specified Client message, length delimited. Does not implicitly {@link model.Client.verify|verify} messages.
             * @function encodeDelimited
             * @memberof model.Client
             * @static
             * @param {model.IClient} message Client message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Client.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Client message from the specified reader or buffer.
             * @function decode
             * @memberof model.Client
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {model.Client} Client
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Client.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.Client();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.CUID = reader.bytes();
                        break;
                    case 2:
                        message.alias = reader.string();
                        break;
                    case 3:
                        message.collection = reader.string();
                        break;
                    case 4:
                        message.syncType = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Client message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof model.Client
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {model.Client} Client
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Client.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Client message.
             * @function verify
             * @memberof model.Client
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Client.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.CUID != null && message.hasOwnProperty("CUID"))
                    if (!(message.CUID && typeof message.CUID.length === "number" || $util.isString(message.CUID)))
                        return "CUID: buffer expected";
                if (message.alias != null && message.hasOwnProperty("alias"))
                    if (!$util.isString(message.alias))
                        return "alias: string expected";
                if (message.collection != null && message.hasOwnProperty("collection"))
                    if (!$util.isString(message.collection))
                        return "collection: string expected";
                if (message.syncType != null && message.hasOwnProperty("syncType"))
                    switch (message.syncType) {
                    default:
                        return "syncType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a Client message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof model.Client
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {model.Client} Client
             */
            Client.fromObject = function fromObject(object) {
                if (object instanceof $root.model.Client)
                    return object;
                var message = new $root.model.Client();
                if (object.CUID != null)
                    if (typeof object.CUID === "string")
                        $util.base64.decode(object.CUID, message.CUID = $util.newBuffer($util.base64.length(object.CUID)), 0);
                    else if (object.CUID.length)
                        message.CUID = object.CUID;
                if (object.alias != null)
                    message.alias = String(object.alias);
                if (object.collection != null)
                    message.collection = String(object.collection);
                switch (object.syncType) {
                case "LOCAL_ONLY":
                case 0:
                    message.syncType = 0;
                    break;
                case "MANUALLY":
                case 1:
                    message.syncType = 1;
                    break;
                case "NOTIFIABLE":
                case 2:
                    message.syncType = 2;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Client message. Also converts values to other types if specified.
             * @function toObject
             * @memberof model.Client
             * @static
             * @param {model.Client} message Client
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Client.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if (options.bytes === String)
                        object.CUID = "";
                    else {
                        object.CUID = [];
                        if (options.bytes !== Array)
                            object.CUID = $util.newBuffer(object.CUID);
                    }
                    object.alias = "";
                    object.collection = "";
                    object.syncType = options.enums === String ? "LOCAL_ONLY" : 0;
                }
                if (message.CUID != null && message.hasOwnProperty("CUID"))
                    object.CUID = options.bytes === String ? $util.base64.encode(message.CUID, 0, message.CUID.length) : options.bytes === Array ? Array.prototype.slice.call(message.CUID) : message.CUID;
                if (message.alias != null && message.hasOwnProperty("alias"))
                    object.alias = message.alias;
                if (message.collection != null && message.hasOwnProperty("collection"))
                    object.collection = message.collection;
                if (message.syncType != null && message.hasOwnProperty("syncType"))
                    object.syncType = options.enums === String ? $root.model.SyncType[message.syncType] : message.syncType;
                return object;
            };
    
            /**
             * Converts this Client to JSON.
             * @function toJSON
             * @memberof model.Client
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Client.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Client;
        })();
    
        /**
         * SyncType enum.
         * @name model.SyncType
         * @enum {number}
         * @property {number} LOCAL_ONLY=0 LOCAL_ONLY value
         * @property {number} MANUALLY=1 MANUALLY value
         * @property {number} NOTIFIABLE=2 NOTIFIABLE value
         */
        model.SyncType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "LOCAL_ONLY"] = 0;
            values[valuesById[1] = "MANUALLY"] = 1;
            values[valuesById[2] = "NOTIFIABLE"] = 2;
            return values;
        })();
    
        model.Timestamp = (function() {
    
            /**
             * Properties of a Timestamp.
             * @memberof model
             * @interface ITimestamp
             * @property {number|null} [era] Timestamp era
             * @property {number|Long|null} [lamport] Timestamp lamport
             * @property {Uint8Array|null} [CUID] Timestamp CUID
             * @property {number|null} [delimiter] Timestamp delimiter
             */
    
            /**
             * Constructs a new Timestamp.
             * @memberof model
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {model.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Timestamp era.
             * @member {number} era
             * @memberof model.Timestamp
             * @instance
             */
            Timestamp.prototype.era = 0;
    
            /**
             * Timestamp lamport.
             * @member {number|Long} lamport
             * @memberof model.Timestamp
             * @instance
             */
            Timestamp.prototype.lamport = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Timestamp CUID.
             * @member {Uint8Array} CUID
             * @memberof model.Timestamp
             * @instance
             */
            Timestamp.prototype.CUID = $util.newBuffer([]);
    
            /**
             * Timestamp delimiter.
             * @member {number} delimiter
             * @memberof model.Timestamp
             * @instance
             */
            Timestamp.prototype.delimiter = 0;
    
            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof model.Timestamp
             * @static
             * @param {model.ITimestamp=} [properties] Properties to set
             * @returns {model.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };
    
            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link model.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof model.Timestamp
             * @static
             * @param {model.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.era != null && Object.hasOwnProperty.call(message, "era"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.era);
                if (message.lamport != null && Object.hasOwnProperty.call(message, "lamport"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.lamport);
                if (message.CUID != null && Object.hasOwnProperty.call(message, "CUID"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.CUID);
                if (message.delimiter != null && Object.hasOwnProperty.call(message, "delimiter"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.delimiter);
                return writer;
            };
    
            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link model.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof model.Timestamp
             * @static
             * @param {model.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof model.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {model.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.Timestamp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.era = reader.uint32();
                        break;
                    case 2:
                        message.lamport = reader.uint64();
                        break;
                    case 3:
                        message.CUID = reader.bytes();
                        break;
                    case 4:
                        message.delimiter = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof model.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {model.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof model.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.era != null && message.hasOwnProperty("era"))
                    if (!$util.isInteger(message.era))
                        return "era: integer expected";
                if (message.lamport != null && message.hasOwnProperty("lamport"))
                    if (!$util.isInteger(message.lamport) && !(message.lamport && $util.isInteger(message.lamport.low) && $util.isInteger(message.lamport.high)))
                        return "lamport: integer|Long expected";
                if (message.CUID != null && message.hasOwnProperty("CUID"))
                    if (!(message.CUID && typeof message.CUID.length === "number" || $util.isString(message.CUID)))
                        return "CUID: buffer expected";
                if (message.delimiter != null && message.hasOwnProperty("delimiter"))
                    if (!$util.isInteger(message.delimiter))
                        return "delimiter: integer expected";
                return null;
            };
    
            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof model.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {model.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.model.Timestamp)
                    return object;
                var message = new $root.model.Timestamp();
                if (object.era != null)
                    message.era = object.era >>> 0;
                if (object.lamport != null)
                    if ($util.Long)
                        (message.lamport = $util.Long.fromValue(object.lamport)).unsigned = true;
                    else if (typeof object.lamport === "string")
                        message.lamport = parseInt(object.lamport, 10);
                    else if (typeof object.lamport === "number")
                        message.lamport = object.lamport;
                    else if (typeof object.lamport === "object")
                        message.lamport = new $util.LongBits(object.lamport.low >>> 0, object.lamport.high >>> 0).toNumber(true);
                if (object.CUID != null)
                    if (typeof object.CUID === "string")
                        $util.base64.decode(object.CUID, message.CUID = $util.newBuffer($util.base64.length(object.CUID)), 0);
                    else if (object.CUID.length)
                        message.CUID = object.CUID;
                if (object.delimiter != null)
                    message.delimiter = object.delimiter >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof model.Timestamp
             * @static
             * @param {model.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.era = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.lamport = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.lamport = options.longs === String ? "0" : 0;
                    if (options.bytes === String)
                        object.CUID = "";
                    else {
                        object.CUID = [];
                        if (options.bytes !== Array)
                            object.CUID = $util.newBuffer(object.CUID);
                    }
                    object.delimiter = 0;
                }
                if (message.era != null && message.hasOwnProperty("era"))
                    object.era = message.era;
                if (message.lamport != null && message.hasOwnProperty("lamport"))
                    if (typeof message.lamport === "number")
                        object.lamport = options.longs === String ? String(message.lamport) : message.lamport;
                    else
                        object.lamport = options.longs === String ? $util.Long.prototype.toString.call(message.lamport) : options.longs === Number ? new $util.LongBits(message.lamport.low >>> 0, message.lamport.high >>> 0).toNumber(true) : message.lamport;
                if (message.CUID != null && message.hasOwnProperty("CUID"))
                    object.CUID = options.bytes === String ? $util.base64.encode(message.CUID, 0, message.CUID.length) : options.bytes === Array ? Array.prototype.slice.call(message.CUID) : message.CUID;
                if (message.delimiter != null && message.hasOwnProperty("delimiter"))
                    object.delimiter = message.delimiter;
                return object;
            };
    
            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof model.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Timestamp;
        })();
    
        model.OperationID = (function() {
    
            /**
             * Properties of an OperationID.
             * @memberof model
             * @interface IOperationID
             * @property {number|null} [era] OperationID era
             * @property {number|Long|null} [lamport] OperationID lamport
             * @property {Uint8Array|null} [CUID] OperationID CUID
             * @property {number|Long|null} [seq] OperationID seq
             */
    
            /**
             * Constructs a new OperationID.
             * @memberof model
             * @classdesc Represents an OperationID.
             * @implements IOperationID
             * @constructor
             * @param {model.IOperationID=} [properties] Properties to set
             */
            function OperationID(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * OperationID era.
             * @member {number} era
             * @memberof model.OperationID
             * @instance
             */
            OperationID.prototype.era = 0;
    
            /**
             * OperationID lamport.
             * @member {number|Long} lamport
             * @memberof model.OperationID
             * @instance
             */
            OperationID.prototype.lamport = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * OperationID CUID.
             * @member {Uint8Array} CUID
             * @memberof model.OperationID
             * @instance
             */
            OperationID.prototype.CUID = $util.newBuffer([]);
    
            /**
             * OperationID seq.
             * @member {number|Long} seq
             * @memberof model.OperationID
             * @instance
             */
            OperationID.prototype.seq = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new OperationID instance using the specified properties.
             * @function create
             * @memberof model.OperationID
             * @static
             * @param {model.IOperationID=} [properties] Properties to set
             * @returns {model.OperationID} OperationID instance
             */
            OperationID.create = function create(properties) {
                return new OperationID(properties);
            };
    
            /**
             * Encodes the specified OperationID message. Does not implicitly {@link model.OperationID.verify|verify} messages.
             * @function encode
             * @memberof model.OperationID
             * @static
             * @param {model.IOperationID} message OperationID message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OperationID.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.era != null && Object.hasOwnProperty.call(message, "era"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.era);
                if (message.lamport != null && Object.hasOwnProperty.call(message, "lamport"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.lamport);
                if (message.CUID != null && Object.hasOwnProperty.call(message, "CUID"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.CUID);
                if (message.seq != null && Object.hasOwnProperty.call(message, "seq"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.seq);
                return writer;
            };
    
            /**
             * Encodes the specified OperationID message, length delimited. Does not implicitly {@link model.OperationID.verify|verify} messages.
             * @function encodeDelimited
             * @memberof model.OperationID
             * @static
             * @param {model.IOperationID} message OperationID message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OperationID.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an OperationID message from the specified reader or buffer.
             * @function decode
             * @memberof model.OperationID
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {model.OperationID} OperationID
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OperationID.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.OperationID();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.era = reader.uint32();
                        break;
                    case 2:
                        message.lamport = reader.uint64();
                        break;
                    case 3:
                        message.CUID = reader.bytes();
                        break;
                    case 4:
                        message.seq = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an OperationID message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof model.OperationID
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {model.OperationID} OperationID
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OperationID.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an OperationID message.
             * @function verify
             * @memberof model.OperationID
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            OperationID.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.era != null && message.hasOwnProperty("era"))
                    if (!$util.isInteger(message.era))
                        return "era: integer expected";
                if (message.lamport != null && message.hasOwnProperty("lamport"))
                    if (!$util.isInteger(message.lamport) && !(message.lamport && $util.isInteger(message.lamport.low) && $util.isInteger(message.lamport.high)))
                        return "lamport: integer|Long expected";
                if (message.CUID != null && message.hasOwnProperty("CUID"))
                    if (!(message.CUID && typeof message.CUID.length === "number" || $util.isString(message.CUID)))
                        return "CUID: buffer expected";
                if (message.seq != null && message.hasOwnProperty("seq"))
                    if (!$util.isInteger(message.seq) && !(message.seq && $util.isInteger(message.seq.low) && $util.isInteger(message.seq.high)))
                        return "seq: integer|Long expected";
                return null;
            };
    
            /**
             * Creates an OperationID message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof model.OperationID
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {model.OperationID} OperationID
             */
            OperationID.fromObject = function fromObject(object) {
                if (object instanceof $root.model.OperationID)
                    return object;
                var message = new $root.model.OperationID();
                if (object.era != null)
                    message.era = object.era >>> 0;
                if (object.lamport != null)
                    if ($util.Long)
                        (message.lamport = $util.Long.fromValue(object.lamport)).unsigned = true;
                    else if (typeof object.lamport === "string")
                        message.lamport = parseInt(object.lamport, 10);
                    else if (typeof object.lamport === "number")
                        message.lamport = object.lamport;
                    else if (typeof object.lamport === "object")
                        message.lamport = new $util.LongBits(object.lamport.low >>> 0, object.lamport.high >>> 0).toNumber(true);
                if (object.CUID != null)
                    if (typeof object.CUID === "string")
                        $util.base64.decode(object.CUID, message.CUID = $util.newBuffer($util.base64.length(object.CUID)), 0);
                    else if (object.CUID.length)
                        message.CUID = object.CUID;
                if (object.seq != null)
                    if ($util.Long)
                        (message.seq = $util.Long.fromValue(object.seq)).unsigned = true;
                    else if (typeof object.seq === "string")
                        message.seq = parseInt(object.seq, 10);
                    else if (typeof object.seq === "number")
                        message.seq = object.seq;
                    else if (typeof object.seq === "object")
                        message.seq = new $util.LongBits(object.seq.low >>> 0, object.seq.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from an OperationID message. Also converts values to other types if specified.
             * @function toObject
             * @memberof model.OperationID
             * @static
             * @param {model.OperationID} message OperationID
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            OperationID.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.era = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.lamport = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.lamport = options.longs === String ? "0" : 0;
                    if (options.bytes === String)
                        object.CUID = "";
                    else {
                        object.CUID = [];
                        if (options.bytes !== Array)
                            object.CUID = $util.newBuffer(object.CUID);
                    }
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.seq = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seq = options.longs === String ? "0" : 0;
                }
                if (message.era != null && message.hasOwnProperty("era"))
                    object.era = message.era;
                if (message.lamport != null && message.hasOwnProperty("lamport"))
                    if (typeof message.lamport === "number")
                        object.lamport = options.longs === String ? String(message.lamport) : message.lamport;
                    else
                        object.lamport = options.longs === String ? $util.Long.prototype.toString.call(message.lamport) : options.longs === Number ? new $util.LongBits(message.lamport.low >>> 0, message.lamport.high >>> 0).toNumber(true) : message.lamport;
                if (message.CUID != null && message.hasOwnProperty("CUID"))
                    object.CUID = options.bytes === String ? $util.base64.encode(message.CUID, 0, message.CUID.length) : options.bytes === Array ? Array.prototype.slice.call(message.CUID) : message.CUID;
                if (message.seq != null && message.hasOwnProperty("seq"))
                    if (typeof message.seq === "number")
                        object.seq = options.longs === String ? String(message.seq) : message.seq;
                    else
                        object.seq = options.longs === String ? $util.Long.prototype.toString.call(message.seq) : options.longs === Number ? new $util.LongBits(message.seq.low >>> 0, message.seq.high >>> 0).toNumber(true) : message.seq;
                return object;
            };
    
            /**
             * Converts this OperationID to JSON.
             * @function toJSON
             * @memberof model.OperationID
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            OperationID.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return OperationID;
        })();
    
        model.Operation = (function() {
    
            /**
             * Properties of an Operation.
             * @memberof model
             * @interface IOperation
             * @property {model.IOperationID|null} [ID] Operation ID
             * @property {model.TypeOfOperation|null} [opType] Operation opType
             * @property {Uint8Array|null} [body] Operation body
             */
    
            /**
             * Constructs a new Operation.
             * @memberof model
             * @classdesc Represents an Operation.
             * @implements IOperation
             * @constructor
             * @param {model.IOperation=} [properties] Properties to set
             */
            function Operation(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Operation ID.
             * @member {model.IOperationID|null|undefined} ID
             * @memberof model.Operation
             * @instance
             */
            Operation.prototype.ID = null;
    
            /**
             * Operation opType.
             * @member {model.TypeOfOperation} opType
             * @memberof model.Operation
             * @instance
             */
            Operation.prototype.opType = 0;
    
            /**
             * Operation body.
             * @member {Uint8Array} body
             * @memberof model.Operation
             * @instance
             */
            Operation.prototype.body = $util.newBuffer([]);
    
            /**
             * Creates a new Operation instance using the specified properties.
             * @function create
             * @memberof model.Operation
             * @static
             * @param {model.IOperation=} [properties] Properties to set
             * @returns {model.Operation} Operation instance
             */
            Operation.create = function create(properties) {
                return new Operation(properties);
            };
    
            /**
             * Encodes the specified Operation message. Does not implicitly {@link model.Operation.verify|verify} messages.
             * @function encode
             * @memberof model.Operation
             * @static
             * @param {model.IOperation} message Operation message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Operation.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.ID != null && Object.hasOwnProperty.call(message, "ID"))
                    $root.model.OperationID.encode(message.ID, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.opType != null && Object.hasOwnProperty.call(message, "opType"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.opType);
                if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.body);
                return writer;
            };
    
            /**
             * Encodes the specified Operation message, length delimited. Does not implicitly {@link model.Operation.verify|verify} messages.
             * @function encodeDelimited
             * @memberof model.Operation
             * @static
             * @param {model.IOperation} message Operation message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Operation.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an Operation message from the specified reader or buffer.
             * @function decode
             * @memberof model.Operation
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {model.Operation} Operation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Operation.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.Operation();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.ID = $root.model.OperationID.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.opType = reader.int32();
                        break;
                    case 3:
                        message.body = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an Operation message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof model.Operation
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {model.Operation} Operation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Operation.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an Operation message.
             * @function verify
             * @memberof model.Operation
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Operation.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.ID != null && message.hasOwnProperty("ID")) {
                    var error = $root.model.OperationID.verify(message.ID);
                    if (error)
                        return "ID." + error;
                }
                if (message.opType != null && message.hasOwnProperty("opType"))
                    switch (message.opType) {
                    default:
                        return "opType: enum value expected";
                    case 0:
                    case 2:
                    case 3:
                    case 5:
                    case 11:
                    case 21:
                    case 22:
                    case 31:
                    case 32:
                    case 33:
                    case 41:
                    case 42:
                    case 43:
                    case 44:
                    case 45:
                        break;
                    }
                if (message.body != null && message.hasOwnProperty("body"))
                    if (!(message.body && typeof message.body.length === "number" || $util.isString(message.body)))
                        return "body: buffer expected";
                return null;
            };
    
            /**
             * Creates an Operation message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof model.Operation
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {model.Operation} Operation
             */
            Operation.fromObject = function fromObject(object) {
                if (object instanceof $root.model.Operation)
                    return object;
                var message = new $root.model.Operation();
                if (object.ID != null) {
                    if (typeof object.ID !== "object")
                        throw TypeError(".model.Operation.ID: object expected");
                    message.ID = $root.model.OperationID.fromObject(object.ID);
                }
                switch (object.opType) {
                case "SNAPSHOT":
                case 0:
                    message.opType = 0;
                    break;
                case "DELETE":
                case 2:
                    message.opType = 2;
                    break;
                case "ERROR":
                case 3:
                    message.opType = 3;
                    break;
                case "TRANSACTION":
                case 5:
                    message.opType = 5;
                    break;
                case "COUNTER_INCREASE":
                case 11:
                    message.opType = 11;
                    break;
                case "HASH_MAP_PUT":
                case 21:
                    message.opType = 21;
                    break;
                case "HASH_MAP_REMOVE":
                case 22:
                    message.opType = 22;
                    break;
                case "LIST_INSERT":
                case 31:
                    message.opType = 31;
                    break;
                case "LIST_DELETE":
                case 32:
                    message.opType = 32;
                    break;
                case "LIST_UPDATE":
                case 33:
                    message.opType = 33;
                    break;
                case "DOCUMENT_PUT_OBJ":
                case 41:
                    message.opType = 41;
                    break;
                case "DOCUMENT_DEL_OBJ":
                case 42:
                    message.opType = 42;
                    break;
                case "DOCUMENT_INS_ARR":
                case 43:
                    message.opType = 43;
                    break;
                case "DOCUMENT_DEL_ARR":
                case 44:
                    message.opType = 44;
                    break;
                case "DOCUMENT_UPD_ARR":
                case 45:
                    message.opType = 45;
                    break;
                }
                if (object.body != null)
                    if (typeof object.body === "string")
                        $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
                    else if (object.body.length)
                        message.body = object.body;
                return message;
            };
    
            /**
             * Creates a plain object from an Operation message. Also converts values to other types if specified.
             * @function toObject
             * @memberof model.Operation
             * @static
             * @param {model.Operation} message Operation
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Operation.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.ID = null;
                    object.opType = options.enums === String ? "SNAPSHOT" : 0;
                    if (options.bytes === String)
                        object.body = "";
                    else {
                        object.body = [];
                        if (options.bytes !== Array)
                            object.body = $util.newBuffer(object.body);
                    }
                }
                if (message.ID != null && message.hasOwnProperty("ID"))
                    object.ID = $root.model.OperationID.toObject(message.ID, options);
                if (message.opType != null && message.hasOwnProperty("opType"))
                    object.opType = options.enums === String ? $root.model.TypeOfOperation[message.opType] : message.opType;
                if (message.body != null && message.hasOwnProperty("body"))
                    object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
                return object;
            };
    
            /**
             * Converts this Operation to JSON.
             * @function toJSON
             * @memberof model.Operation
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Operation.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Operation;
        })();
    
        /**
         * TypeOfOperation enum.
         * @name model.TypeOfOperation
         * @enum {number}
         * @property {number} SNAPSHOT=0 SNAPSHOT value
         * @property {number} DELETE=2 DELETE value
         * @property {number} ERROR=3 ERROR value
         * @property {number} TRANSACTION=5 TRANSACTION value
         * @property {number} COUNTER_INCREASE=11 COUNTER_INCREASE value
         * @property {number} HASH_MAP_PUT=21 HASH_MAP_PUT value
         * @property {number} HASH_MAP_REMOVE=22 HASH_MAP_REMOVE value
         * @property {number} LIST_INSERT=31 LIST_INSERT value
         * @property {number} LIST_DELETE=32 LIST_DELETE value
         * @property {number} LIST_UPDATE=33 LIST_UPDATE value
         * @property {number} DOCUMENT_PUT_OBJ=41 DOCUMENT_PUT_OBJ value
         * @property {number} DOCUMENT_DEL_OBJ=42 DOCUMENT_DEL_OBJ value
         * @property {number} DOCUMENT_INS_ARR=43 DOCUMENT_INS_ARR value
         * @property {number} DOCUMENT_DEL_ARR=44 DOCUMENT_DEL_ARR value
         * @property {number} DOCUMENT_UPD_ARR=45 DOCUMENT_UPD_ARR value
         */
        model.TypeOfOperation = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "SNAPSHOT"] = 0;
            values[valuesById[2] = "DELETE"] = 2;
            values[valuesById[3] = "ERROR"] = 3;
            values[valuesById[5] = "TRANSACTION"] = 5;
            values[valuesById[11] = "COUNTER_INCREASE"] = 11;
            values[valuesById[21] = "HASH_MAP_PUT"] = 21;
            values[valuesById[22] = "HASH_MAP_REMOVE"] = 22;
            values[valuesById[31] = "LIST_INSERT"] = 31;
            values[valuesById[32] = "LIST_DELETE"] = 32;
            values[valuesById[33] = "LIST_UPDATE"] = 33;
            values[valuesById[41] = "DOCUMENT_PUT_OBJ"] = 41;
            values[valuesById[42] = "DOCUMENT_DEL_OBJ"] = 42;
            values[valuesById[43] = "DOCUMENT_INS_ARR"] = 43;
            values[valuesById[44] = "DOCUMENT_DEL_ARR"] = 44;
            values[valuesById[45] = "DOCUMENT_UPD_ARR"] = 45;
            return values;
        })();
    
        /**
         * TypeOfDatatype enum.
         * @name model.TypeOfDatatype
         * @enum {number}
         * @property {number} COUNTER=0 COUNTER value
         * @property {number} HASH_MAP=1 HASH_MAP value
         * @property {number} LIST=2 LIST value
         * @property {number} DOCUMENT=3 DOCUMENT value
         */
        model.TypeOfDatatype = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "COUNTER"] = 0;
            values[valuesById[1] = "HASH_MAP"] = 1;
            values[valuesById[2] = "LIST"] = 2;
            values[valuesById[3] = "DOCUMENT"] = 3;
            return values;
        })();
    
        /**
         * StateOfDatatype enum.
         * @name model.StateOfDatatype
         * @enum {number}
         * @property {number} DUE_TO_CREATE=0 DUE_TO_CREATE value
         * @property {number} DUE_TO_SUBSCRIBE=1 DUE_TO_SUBSCRIBE value
         * @property {number} DUE_TO_SUBSCRIBE_CREATE=2 DUE_TO_SUBSCRIBE_CREATE value
         * @property {number} SUBSCRIBED=4 SUBSCRIBED value
         * @property {number} DUE_TO_UNSUBSCRIBE=5 DUE_TO_UNSUBSCRIBE value
         * @property {number} UNSUBSCRIBED=6 UNSUBSCRIBED value
         * @property {number} DELETED=7 DELETED value
         */
        model.StateOfDatatype = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "DUE_TO_CREATE"] = 0;
            values[valuesById[1] = "DUE_TO_SUBSCRIBE"] = 1;
            values[valuesById[2] = "DUE_TO_SUBSCRIBE_CREATE"] = 2;
            values[valuesById[4] = "SUBSCRIBED"] = 4;
            values[valuesById[5] = "DUE_TO_UNSUBSCRIBE"] = 5;
            values[valuesById[6] = "UNSUBSCRIBED"] = 6;
            values[valuesById[7] = "DELETED"] = 7;
            return values;
        })();
    
        model.PushPullPack = (function() {
    
            /**
             * Properties of a PushPullPack.
             * @memberof model
             * @interface IPushPullPack
             * @property {Uint8Array|null} [DUID] PushPullPack DUID
             * @property {string|null} [key] PushPullPack key
             * @property {number|null} [option] PushPullPack option
             * @property {model.ICheckPoint|null} [checkPoint] PushPullPack checkPoint
             * @property {number|null} [era] PushPullPack era
             * @property {number|null} [type] PushPullPack type
             * @property {Array.<model.IOperation>|null} [operations] PushPullPack operations
             */
    
            /**
             * Constructs a new PushPullPack.
             * @memberof model
             * @classdesc Represents a PushPullPack.
             * @implements IPushPullPack
             * @constructor
             * @param {model.IPushPullPack=} [properties] Properties to set
             */
            function PushPullPack(properties) {
                this.operations = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * PushPullPack DUID.
             * @member {Uint8Array} DUID
             * @memberof model.PushPullPack
             * @instance
             */
            PushPullPack.prototype.DUID = $util.newBuffer([]);
    
            /**
             * PushPullPack key.
             * @member {string} key
             * @memberof model.PushPullPack
             * @instance
             */
            PushPullPack.prototype.key = "";
    
            /**
             * PushPullPack option.
             * @member {number} option
             * @memberof model.PushPullPack
             * @instance
             */
            PushPullPack.prototype.option = 0;
    
            /**
             * PushPullPack checkPoint.
             * @member {model.ICheckPoint|null|undefined} checkPoint
             * @memberof model.PushPullPack
             * @instance
             */
            PushPullPack.prototype.checkPoint = null;
    
            /**
             * PushPullPack era.
             * @member {number} era
             * @memberof model.PushPullPack
             * @instance
             */
            PushPullPack.prototype.era = 0;
    
            /**
             * PushPullPack type.
             * @member {number} type
             * @memberof model.PushPullPack
             * @instance
             */
            PushPullPack.prototype.type = 0;
    
            /**
             * PushPullPack operations.
             * @member {Array.<model.IOperation>} operations
             * @memberof model.PushPullPack
             * @instance
             */
            PushPullPack.prototype.operations = $util.emptyArray;
    
            /**
             * Creates a new PushPullPack instance using the specified properties.
             * @function create
             * @memberof model.PushPullPack
             * @static
             * @param {model.IPushPullPack=} [properties] Properties to set
             * @returns {model.PushPullPack} PushPullPack instance
             */
            PushPullPack.create = function create(properties) {
                return new PushPullPack(properties);
            };
    
            /**
             * Encodes the specified PushPullPack message. Does not implicitly {@link model.PushPullPack.verify|verify} messages.
             * @function encode
             * @memberof model.PushPullPack
             * @static
             * @param {model.IPushPullPack} message PushPullPack message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PushPullPack.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.DUID != null && Object.hasOwnProperty.call(message, "DUID"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.DUID);
                if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.key);
                if (message.option != null && Object.hasOwnProperty.call(message, "option"))
                    writer.uint32(/* id 3, wireType 5 =*/29).fixed32(message.option);
                if (message.checkPoint != null && Object.hasOwnProperty.call(message, "checkPoint"))
                    $root.model.CheckPoint.encode(message.checkPoint, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.era != null && Object.hasOwnProperty.call(message, "era"))
                    writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.era);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.type);
                if (message.operations != null && message.operations.length)
                    for (var i = 0; i < message.operations.length; ++i)
                        $root.model.Operation.encode(message.operations[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified PushPullPack message, length delimited. Does not implicitly {@link model.PushPullPack.verify|verify} messages.
             * @function encodeDelimited
             * @memberof model.PushPullPack
             * @static
             * @param {model.IPushPullPack} message PushPullPack message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PushPullPack.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a PushPullPack message from the specified reader or buffer.
             * @function decode
             * @memberof model.PushPullPack
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {model.PushPullPack} PushPullPack
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PushPullPack.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.PushPullPack();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.DUID = reader.bytes();
                        break;
                    case 2:
                        message.key = reader.string();
                        break;
                    case 3:
                        message.option = reader.fixed32();
                        break;
                    case 4:
                        message.checkPoint = $root.model.CheckPoint.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.era = reader.uint32();
                        break;
                    case 6:
                        message.type = reader.int32();
                        break;
                    case 7:
                        if (!(message.operations && message.operations.length))
                            message.operations = [];
                        message.operations.push($root.model.Operation.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a PushPullPack message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof model.PushPullPack
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {model.PushPullPack} PushPullPack
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PushPullPack.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a PushPullPack message.
             * @function verify
             * @memberof model.PushPullPack
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PushPullPack.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.DUID != null && message.hasOwnProperty("DUID"))
                    if (!(message.DUID && typeof message.DUID.length === "number" || $util.isString(message.DUID)))
                        return "DUID: buffer expected";
                if (message.key != null && message.hasOwnProperty("key"))
                    if (!$util.isString(message.key))
                        return "key: string expected";
                if (message.option != null && message.hasOwnProperty("option"))
                    if (!$util.isInteger(message.option))
                        return "option: integer expected";
                if (message.checkPoint != null && message.hasOwnProperty("checkPoint")) {
                    var error = $root.model.CheckPoint.verify(message.checkPoint);
                    if (error)
                        return "checkPoint." + error;
                }
                if (message.era != null && message.hasOwnProperty("era"))
                    if (!$util.isInteger(message.era))
                        return "era: integer expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    if (!$util.isInteger(message.type))
                        return "type: integer expected";
                if (message.operations != null && message.hasOwnProperty("operations")) {
                    if (!Array.isArray(message.operations))
                        return "operations: array expected";
                    for (var i = 0; i < message.operations.length; ++i) {
                        var error = $root.model.Operation.verify(message.operations[i]);
                        if (error)
                            return "operations." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a PushPullPack message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof model.PushPullPack
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {model.PushPullPack} PushPullPack
             */
            PushPullPack.fromObject = function fromObject(object) {
                if (object instanceof $root.model.PushPullPack)
                    return object;
                var message = new $root.model.PushPullPack();
                if (object.DUID != null)
                    if (typeof object.DUID === "string")
                        $util.base64.decode(object.DUID, message.DUID = $util.newBuffer($util.base64.length(object.DUID)), 0);
                    else if (object.DUID.length)
                        message.DUID = object.DUID;
                if (object.key != null)
                    message.key = String(object.key);
                if (object.option != null)
                    message.option = object.option >>> 0;
                if (object.checkPoint != null) {
                    if (typeof object.checkPoint !== "object")
                        throw TypeError(".model.PushPullPack.checkPoint: object expected");
                    message.checkPoint = $root.model.CheckPoint.fromObject(object.checkPoint);
                }
                if (object.era != null)
                    message.era = object.era >>> 0;
                if (object.type != null)
                    message.type = object.type | 0;
                if (object.operations) {
                    if (!Array.isArray(object.operations))
                        throw TypeError(".model.PushPullPack.operations: array expected");
                    message.operations = [];
                    for (var i = 0; i < object.operations.length; ++i) {
                        if (typeof object.operations[i] !== "object")
                            throw TypeError(".model.PushPullPack.operations: object expected");
                        message.operations[i] = $root.model.Operation.fromObject(object.operations[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a PushPullPack message. Also converts values to other types if specified.
             * @function toObject
             * @memberof model.PushPullPack
             * @static
             * @param {model.PushPullPack} message PushPullPack
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PushPullPack.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.operations = [];
                if (options.defaults) {
                    if (options.bytes === String)
                        object.DUID = "";
                    else {
                        object.DUID = [];
                        if (options.bytes !== Array)
                            object.DUID = $util.newBuffer(object.DUID);
                    }
                    object.key = "";
                    object.option = 0;
                    object.checkPoint = null;
                    object.era = 0;
                    object.type = 0;
                }
                if (message.DUID != null && message.hasOwnProperty("DUID"))
                    object.DUID = options.bytes === String ? $util.base64.encode(message.DUID, 0, message.DUID.length) : options.bytes === Array ? Array.prototype.slice.call(message.DUID) : message.DUID;
                if (message.key != null && message.hasOwnProperty("key"))
                    object.key = message.key;
                if (message.option != null && message.hasOwnProperty("option"))
                    object.option = message.option;
                if (message.checkPoint != null && message.hasOwnProperty("checkPoint"))
                    object.checkPoint = $root.model.CheckPoint.toObject(message.checkPoint, options);
                if (message.era != null && message.hasOwnProperty("era"))
                    object.era = message.era;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = message.type;
                if (message.operations && message.operations.length) {
                    object.operations = [];
                    for (var j = 0; j < message.operations.length; ++j)
                        object.operations[j] = $root.model.Operation.toObject(message.operations[j], options);
                }
                return object;
            };
    
            /**
             * Converts this PushPullPack to JSON.
             * @function toJSON
             * @memberof model.PushPullPack
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PushPullPack.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return PushPullPack;
        })();
    
        model.CheckPoint = (function() {
    
            /**
             * Properties of a CheckPoint.
             * @memberof model
             * @interface ICheckPoint
             * @property {number|Long|null} [sseq] CheckPoint sseq
             * @property {number|Long|null} [cseq] CheckPoint cseq
             */
    
            /**
             * Constructs a new CheckPoint.
             * @memberof model
             * @classdesc Represents a CheckPoint.
             * @implements ICheckPoint
             * @constructor
             * @param {model.ICheckPoint=} [properties] Properties to set
             */
            function CheckPoint(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CheckPoint sseq.
             * @member {number|Long} sseq
             * @memberof model.CheckPoint
             * @instance
             */
            CheckPoint.prototype.sseq = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * CheckPoint cseq.
             * @member {number|Long} cseq
             * @memberof model.CheckPoint
             * @instance
             */
            CheckPoint.prototype.cseq = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new CheckPoint instance using the specified properties.
             * @function create
             * @memberof model.CheckPoint
             * @static
             * @param {model.ICheckPoint=} [properties] Properties to set
             * @returns {model.CheckPoint} CheckPoint instance
             */
            CheckPoint.create = function create(properties) {
                return new CheckPoint(properties);
            };
    
            /**
             * Encodes the specified CheckPoint message. Does not implicitly {@link model.CheckPoint.verify|verify} messages.
             * @function encode
             * @memberof model.CheckPoint
             * @static
             * @param {model.ICheckPoint} message CheckPoint message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CheckPoint.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.sseq != null && Object.hasOwnProperty.call(message, "sseq"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.sseq);
                if (message.cseq != null && Object.hasOwnProperty.call(message, "cseq"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.cseq);
                return writer;
            };
    
            /**
             * Encodes the specified CheckPoint message, length delimited. Does not implicitly {@link model.CheckPoint.verify|verify} messages.
             * @function encodeDelimited
             * @memberof model.CheckPoint
             * @static
             * @param {model.ICheckPoint} message CheckPoint message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CheckPoint.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CheckPoint message from the specified reader or buffer.
             * @function decode
             * @memberof model.CheckPoint
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {model.CheckPoint} CheckPoint
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CheckPoint.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.CheckPoint();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.sseq = reader.uint64();
                        break;
                    case 2:
                        message.cseq = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CheckPoint message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof model.CheckPoint
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {model.CheckPoint} CheckPoint
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CheckPoint.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CheckPoint message.
             * @function verify
             * @memberof model.CheckPoint
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CheckPoint.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.sseq != null && message.hasOwnProperty("sseq"))
                    if (!$util.isInteger(message.sseq) && !(message.sseq && $util.isInteger(message.sseq.low) && $util.isInteger(message.sseq.high)))
                        return "sseq: integer|Long expected";
                if (message.cseq != null && message.hasOwnProperty("cseq"))
                    if (!$util.isInteger(message.cseq) && !(message.cseq && $util.isInteger(message.cseq.low) && $util.isInteger(message.cseq.high)))
                        return "cseq: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a CheckPoint message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof model.CheckPoint
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {model.CheckPoint} CheckPoint
             */
            CheckPoint.fromObject = function fromObject(object) {
                if (object instanceof $root.model.CheckPoint)
                    return object;
                var message = new $root.model.CheckPoint();
                if (object.sseq != null)
                    if ($util.Long)
                        (message.sseq = $util.Long.fromValue(object.sseq)).unsigned = true;
                    else if (typeof object.sseq === "string")
                        message.sseq = parseInt(object.sseq, 10);
                    else if (typeof object.sseq === "number")
                        message.sseq = object.sseq;
                    else if (typeof object.sseq === "object")
                        message.sseq = new $util.LongBits(object.sseq.low >>> 0, object.sseq.high >>> 0).toNumber(true);
                if (object.cseq != null)
                    if ($util.Long)
                        (message.cseq = $util.Long.fromValue(object.cseq)).unsigned = true;
                    else if (typeof object.cseq === "string")
                        message.cseq = parseInt(object.cseq, 10);
                    else if (typeof object.cseq === "number")
                        message.cseq = object.cseq;
                    else if (typeof object.cseq === "object")
                        message.cseq = new $util.LongBits(object.cseq.low >>> 0, object.cseq.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a CheckPoint message. Also converts values to other types if specified.
             * @function toObject
             * @memberof model.CheckPoint
             * @static
             * @param {model.CheckPoint} message CheckPoint
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CheckPoint.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.sseq = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.sseq = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.cseq = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.cseq = options.longs === String ? "0" : 0;
                }
                if (message.sseq != null && message.hasOwnProperty("sseq"))
                    if (typeof message.sseq === "number")
                        object.sseq = options.longs === String ? String(message.sseq) : message.sseq;
                    else
                        object.sseq = options.longs === String ? $util.Long.prototype.toString.call(message.sseq) : options.longs === Number ? new $util.LongBits(message.sseq.low >>> 0, message.sseq.high >>> 0).toNumber(true) : message.sseq;
                if (message.cseq != null && message.hasOwnProperty("cseq"))
                    if (typeof message.cseq === "number")
                        object.cseq = options.longs === String ? String(message.cseq) : message.cseq;
                    else
                        object.cseq = options.longs === String ? $util.Long.prototype.toString.call(message.cseq) : options.longs === Number ? new $util.LongBits(message.cseq.low >>> 0, message.cseq.high >>> 0).toNumber(true) : message.cseq;
                return object;
            };
    
            /**
             * Converts this CheckPoint to JSON.
             * @function toJSON
             * @memberof model.CheckPoint
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CheckPoint.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CheckPoint;
        })();
    
        model.NotificationPushPull = (function() {
    
            /**
             * Properties of a NotificationPushPull.
             * @memberof model
             * @interface INotificationPushPull
             * @property {string|null} [CUID] NotificationPushPull CUID
             * @property {string|null} [DUID] NotificationPushPull DUID
             * @property {number|Long|null} [sseq] NotificationPushPull sseq
             */
    
            /**
             * Constructs a new NotificationPushPull.
             * @memberof model
             * @classdesc Represents a NotificationPushPull.
             * @implements INotificationPushPull
             * @constructor
             * @param {model.INotificationPushPull=} [properties] Properties to set
             */
            function NotificationPushPull(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * NotificationPushPull CUID.
             * @member {string} CUID
             * @memberof model.NotificationPushPull
             * @instance
             */
            NotificationPushPull.prototype.CUID = "";
    
            /**
             * NotificationPushPull DUID.
             * @member {string} DUID
             * @memberof model.NotificationPushPull
             * @instance
             */
            NotificationPushPull.prototype.DUID = "";
    
            /**
             * NotificationPushPull sseq.
             * @member {number|Long} sseq
             * @memberof model.NotificationPushPull
             * @instance
             */
            NotificationPushPull.prototype.sseq = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new NotificationPushPull instance using the specified properties.
             * @function create
             * @memberof model.NotificationPushPull
             * @static
             * @param {model.INotificationPushPull=} [properties] Properties to set
             * @returns {model.NotificationPushPull} NotificationPushPull instance
             */
            NotificationPushPull.create = function create(properties) {
                return new NotificationPushPull(properties);
            };
    
            /**
             * Encodes the specified NotificationPushPull message. Does not implicitly {@link model.NotificationPushPull.verify|verify} messages.
             * @function encode
             * @memberof model.NotificationPushPull
             * @static
             * @param {model.INotificationPushPull} message NotificationPushPull message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NotificationPushPull.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.CUID != null && Object.hasOwnProperty.call(message, "CUID"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.CUID);
                if (message.DUID != null && Object.hasOwnProperty.call(message, "DUID"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.DUID);
                if (message.sseq != null && Object.hasOwnProperty.call(message, "sseq"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.sseq);
                return writer;
            };
    
            /**
             * Encodes the specified NotificationPushPull message, length delimited. Does not implicitly {@link model.NotificationPushPull.verify|verify} messages.
             * @function encodeDelimited
             * @memberof model.NotificationPushPull
             * @static
             * @param {model.INotificationPushPull} message NotificationPushPull message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NotificationPushPull.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a NotificationPushPull message from the specified reader or buffer.
             * @function decode
             * @memberof model.NotificationPushPull
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {model.NotificationPushPull} NotificationPushPull
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NotificationPushPull.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.NotificationPushPull();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.CUID = reader.string();
                        break;
                    case 2:
                        message.DUID = reader.string();
                        break;
                    case 3:
                        message.sseq = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a NotificationPushPull message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof model.NotificationPushPull
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {model.NotificationPushPull} NotificationPushPull
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NotificationPushPull.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a NotificationPushPull message.
             * @function verify
             * @memberof model.NotificationPushPull
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NotificationPushPull.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.CUID != null && message.hasOwnProperty("CUID"))
                    if (!$util.isString(message.CUID))
                        return "CUID: string expected";
                if (message.DUID != null && message.hasOwnProperty("DUID"))
                    if (!$util.isString(message.DUID))
                        return "DUID: string expected";
                if (message.sseq != null && message.hasOwnProperty("sseq"))
                    if (!$util.isInteger(message.sseq) && !(message.sseq && $util.isInteger(message.sseq.low) && $util.isInteger(message.sseq.high)))
                        return "sseq: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a NotificationPushPull message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof model.NotificationPushPull
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {model.NotificationPushPull} NotificationPushPull
             */
            NotificationPushPull.fromObject = function fromObject(object) {
                if (object instanceof $root.model.NotificationPushPull)
                    return object;
                var message = new $root.model.NotificationPushPull();
                if (object.CUID != null)
                    message.CUID = String(object.CUID);
                if (object.DUID != null)
                    message.DUID = String(object.DUID);
                if (object.sseq != null)
                    if ($util.Long)
                        (message.sseq = $util.Long.fromValue(object.sseq)).unsigned = true;
                    else if (typeof object.sseq === "string")
                        message.sseq = parseInt(object.sseq, 10);
                    else if (typeof object.sseq === "number")
                        message.sseq = object.sseq;
                    else if (typeof object.sseq === "object")
                        message.sseq = new $util.LongBits(object.sseq.low >>> 0, object.sseq.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a NotificationPushPull message. Also converts values to other types if specified.
             * @function toObject
             * @memberof model.NotificationPushPull
             * @static
             * @param {model.NotificationPushPull} message NotificationPushPull
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NotificationPushPull.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.CUID = "";
                    object.DUID = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.sseq = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.sseq = options.longs === String ? "0" : 0;
                }
                if (message.CUID != null && message.hasOwnProperty("CUID"))
                    object.CUID = message.CUID;
                if (message.DUID != null && message.hasOwnProperty("DUID"))
                    object.DUID = message.DUID;
                if (message.sseq != null && message.hasOwnProperty("sseq"))
                    if (typeof message.sseq === "number")
                        object.sseq = options.longs === String ? String(message.sseq) : message.sseq;
                    else
                        object.sseq = options.longs === String ? $util.Long.prototype.toString.call(message.sseq) : options.longs === Number ? new $util.LongBits(message.sseq.low >>> 0, message.sseq.high >>> 0).toNumber(true) : message.sseq;
                return object;
            };
    
            /**
             * Converts this NotificationPushPull to JSON.
             * @function toJSON
             * @memberof model.NotificationPushPull
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NotificationPushPull.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return NotificationPushPull;
        })();
    
        model.DatatypeMeta = (function() {
    
            /**
             * Properties of a DatatypeMeta.
             * @memberof model
             * @interface IDatatypeMeta
             * @property {string|null} [key] DatatypeMeta key
             * @property {Uint8Array|null} [DUID] DatatypeMeta DUID
             * @property {model.IOperationID|null} [opID] DatatypeMeta opID
             * @property {model.TypeOfDatatype|null} [typeOf] DatatypeMeta typeOf
             * @property {model.StateOfDatatype|null} [state] DatatypeMeta state
             */
    
            /**
             * Constructs a new DatatypeMeta.
             * @memberof model
             * @classdesc Represents a DatatypeMeta.
             * @implements IDatatypeMeta
             * @constructor
             * @param {model.IDatatypeMeta=} [properties] Properties to set
             */
            function DatatypeMeta(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * DatatypeMeta key.
             * @member {string} key
             * @memberof model.DatatypeMeta
             * @instance
             */
            DatatypeMeta.prototype.key = "";
    
            /**
             * DatatypeMeta DUID.
             * @member {Uint8Array} DUID
             * @memberof model.DatatypeMeta
             * @instance
             */
            DatatypeMeta.prototype.DUID = $util.newBuffer([]);
    
            /**
             * DatatypeMeta opID.
             * @member {model.IOperationID|null|undefined} opID
             * @memberof model.DatatypeMeta
             * @instance
             */
            DatatypeMeta.prototype.opID = null;
    
            /**
             * DatatypeMeta typeOf.
             * @member {model.TypeOfDatatype} typeOf
             * @memberof model.DatatypeMeta
             * @instance
             */
            DatatypeMeta.prototype.typeOf = 0;
    
            /**
             * DatatypeMeta state.
             * @member {model.StateOfDatatype} state
             * @memberof model.DatatypeMeta
             * @instance
             */
            DatatypeMeta.prototype.state = 0;
    
            /**
             * Creates a new DatatypeMeta instance using the specified properties.
             * @function create
             * @memberof model.DatatypeMeta
             * @static
             * @param {model.IDatatypeMeta=} [properties] Properties to set
             * @returns {model.DatatypeMeta} DatatypeMeta instance
             */
            DatatypeMeta.create = function create(properties) {
                return new DatatypeMeta(properties);
            };
    
            /**
             * Encodes the specified DatatypeMeta message. Does not implicitly {@link model.DatatypeMeta.verify|verify} messages.
             * @function encode
             * @memberof model.DatatypeMeta
             * @static
             * @param {model.IDatatypeMeta} message DatatypeMeta message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DatatypeMeta.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
                if (message.DUID != null && Object.hasOwnProperty.call(message, "DUID"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.DUID);
                if (message.opID != null && Object.hasOwnProperty.call(message, "opID"))
                    $root.model.OperationID.encode(message.opID, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.typeOf != null && Object.hasOwnProperty.call(message, "typeOf"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.typeOf);
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.state);
                return writer;
            };
    
            /**
             * Encodes the specified DatatypeMeta message, length delimited. Does not implicitly {@link model.DatatypeMeta.verify|verify} messages.
             * @function encodeDelimited
             * @memberof model.DatatypeMeta
             * @static
             * @param {model.IDatatypeMeta} message DatatypeMeta message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DatatypeMeta.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a DatatypeMeta message from the specified reader or buffer.
             * @function decode
             * @memberof model.DatatypeMeta
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {model.DatatypeMeta} DatatypeMeta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DatatypeMeta.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.DatatypeMeta();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.key = reader.string();
                        break;
                    case 2:
                        message.DUID = reader.bytes();
                        break;
                    case 3:
                        message.opID = $root.model.OperationID.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.typeOf = reader.int32();
                        break;
                    case 5:
                        message.state = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a DatatypeMeta message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof model.DatatypeMeta
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {model.DatatypeMeta} DatatypeMeta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DatatypeMeta.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a DatatypeMeta message.
             * @function verify
             * @memberof model.DatatypeMeta
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DatatypeMeta.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.key != null && message.hasOwnProperty("key"))
                    if (!$util.isString(message.key))
                        return "key: string expected";
                if (message.DUID != null && message.hasOwnProperty("DUID"))
                    if (!(message.DUID && typeof message.DUID.length === "number" || $util.isString(message.DUID)))
                        return "DUID: buffer expected";
                if (message.opID != null && message.hasOwnProperty("opID")) {
                    var error = $root.model.OperationID.verify(message.opID);
                    if (error)
                        return "opID." + error;
                }
                if (message.typeOf != null && message.hasOwnProperty("typeOf"))
                    switch (message.typeOf) {
                    default:
                        return "typeOf: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.state != null && message.hasOwnProperty("state"))
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a DatatypeMeta message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof model.DatatypeMeta
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {model.DatatypeMeta} DatatypeMeta
             */
            DatatypeMeta.fromObject = function fromObject(object) {
                if (object instanceof $root.model.DatatypeMeta)
                    return object;
                var message = new $root.model.DatatypeMeta();
                if (object.key != null)
                    message.key = String(object.key);
                if (object.DUID != null)
                    if (typeof object.DUID === "string")
                        $util.base64.decode(object.DUID, message.DUID = $util.newBuffer($util.base64.length(object.DUID)), 0);
                    else if (object.DUID.length)
                        message.DUID = object.DUID;
                if (object.opID != null) {
                    if (typeof object.opID !== "object")
                        throw TypeError(".model.DatatypeMeta.opID: object expected");
                    message.opID = $root.model.OperationID.fromObject(object.opID);
                }
                switch (object.typeOf) {
                case "COUNTER":
                case 0:
                    message.typeOf = 0;
                    break;
                case "HASH_MAP":
                case 1:
                    message.typeOf = 1;
                    break;
                case "LIST":
                case 2:
                    message.typeOf = 2;
                    break;
                case "DOCUMENT":
                case 3:
                    message.typeOf = 3;
                    break;
                }
                switch (object.state) {
                case "DUE_TO_CREATE":
                case 0:
                    message.state = 0;
                    break;
                case "DUE_TO_SUBSCRIBE":
                case 1:
                    message.state = 1;
                    break;
                case "DUE_TO_SUBSCRIBE_CREATE":
                case 2:
                    message.state = 2;
                    break;
                case "SUBSCRIBED":
                case 4:
                    message.state = 4;
                    break;
                case "DUE_TO_UNSUBSCRIBE":
                case 5:
                    message.state = 5;
                    break;
                case "UNSUBSCRIBED":
                case 6:
                    message.state = 6;
                    break;
                case "DELETED":
                case 7:
                    message.state = 7;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a DatatypeMeta message. Also converts values to other types if specified.
             * @function toObject
             * @memberof model.DatatypeMeta
             * @static
             * @param {model.DatatypeMeta} message DatatypeMeta
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DatatypeMeta.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.key = "";
                    if (options.bytes === String)
                        object.DUID = "";
                    else {
                        object.DUID = [];
                        if (options.bytes !== Array)
                            object.DUID = $util.newBuffer(object.DUID);
                    }
                    object.opID = null;
                    object.typeOf = options.enums === String ? "COUNTER" : 0;
                    object.state = options.enums === String ? "DUE_TO_CREATE" : 0;
                }
                if (message.key != null && message.hasOwnProperty("key"))
                    object.key = message.key;
                if (message.DUID != null && message.hasOwnProperty("DUID"))
                    object.DUID = options.bytes === String ? $util.base64.encode(message.DUID, 0, message.DUID.length) : options.bytes === Array ? Array.prototype.slice.call(message.DUID) : message.DUID;
                if (message.opID != null && message.hasOwnProperty("opID"))
                    object.opID = $root.model.OperationID.toObject(message.opID, options);
                if (message.typeOf != null && message.hasOwnProperty("typeOf"))
                    object.typeOf = options.enums === String ? $root.model.TypeOfDatatype[message.typeOf] : message.typeOf;
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = options.enums === String ? $root.model.StateOfDatatype[message.state] : message.state;
                return object;
            };
    
            /**
             * Converts this DatatypeMeta to JSON.
             * @function toJSON
             * @memberof model.DatatypeMeta
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DatatypeMeta.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return DatatypeMeta;
        })();
    
        model.MessageHeader = (function() {
    
            /**
             * Properties of a MessageHeader.
             * @memberof model
             * @interface IMessageHeader
             * @property {string|null} [version] MessageHeader version
             * @property {number|null} [seq] MessageHeader seq
             * @property {model.TypeOfMessage|null} [typeOf] MessageHeader typeOf
             * @property {string|null} [collection] MessageHeader collection
             * @property {string|null} [clientAlias] MessageHeader clientAlias
             * @property {Uint8Array|null} [cuid] MessageHeader cuid
             */
    
            /**
             * Constructs a new MessageHeader.
             * @memberof model
             * @classdesc Represents a MessageHeader.
             * @implements IMessageHeader
             * @constructor
             * @param {model.IMessageHeader=} [properties] Properties to set
             */
            function MessageHeader(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * MessageHeader version.
             * @member {string} version
             * @memberof model.MessageHeader
             * @instance
             */
            MessageHeader.prototype.version = "";
    
            /**
             * MessageHeader seq.
             * @member {number} seq
             * @memberof model.MessageHeader
             * @instance
             */
            MessageHeader.prototype.seq = 0;
    
            /**
             * MessageHeader typeOf.
             * @member {model.TypeOfMessage} typeOf
             * @memberof model.MessageHeader
             * @instance
             */
            MessageHeader.prototype.typeOf = 0;
    
            /**
             * MessageHeader collection.
             * @member {string} collection
             * @memberof model.MessageHeader
             * @instance
             */
            MessageHeader.prototype.collection = "";
    
            /**
             * MessageHeader clientAlias.
             * @member {string} clientAlias
             * @memberof model.MessageHeader
             * @instance
             */
            MessageHeader.prototype.clientAlias = "";
    
            /**
             * MessageHeader cuid.
             * @member {Uint8Array} cuid
             * @memberof model.MessageHeader
             * @instance
             */
            MessageHeader.prototype.cuid = $util.newBuffer([]);
    
            /**
             * Creates a new MessageHeader instance using the specified properties.
             * @function create
             * @memberof model.MessageHeader
             * @static
             * @param {model.IMessageHeader=} [properties] Properties to set
             * @returns {model.MessageHeader} MessageHeader instance
             */
            MessageHeader.create = function create(properties) {
                return new MessageHeader(properties);
            };
    
            /**
             * Encodes the specified MessageHeader message. Does not implicitly {@link model.MessageHeader.verify|verify} messages.
             * @function encode
             * @memberof model.MessageHeader
             * @static
             * @param {model.IMessageHeader} message MessageHeader message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MessageHeader.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.version);
                if (message.seq != null && Object.hasOwnProperty.call(message, "seq"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.seq);
                if (message.typeOf != null && Object.hasOwnProperty.call(message, "typeOf"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.typeOf);
                if (message.collection != null && Object.hasOwnProperty.call(message, "collection"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.collection);
                if (message.clientAlias != null && Object.hasOwnProperty.call(message, "clientAlias"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.clientAlias);
                if (message.cuid != null && Object.hasOwnProperty.call(message, "cuid"))
                    writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.cuid);
                return writer;
            };
    
            /**
             * Encodes the specified MessageHeader message, length delimited. Does not implicitly {@link model.MessageHeader.verify|verify} messages.
             * @function encodeDelimited
             * @memberof model.MessageHeader
             * @static
             * @param {model.IMessageHeader} message MessageHeader message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MessageHeader.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a MessageHeader message from the specified reader or buffer.
             * @function decode
             * @memberof model.MessageHeader
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {model.MessageHeader} MessageHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MessageHeader.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.MessageHeader();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.version = reader.string();
                        break;
                    case 2:
                        message.seq = reader.uint32();
                        break;
                    case 3:
                        message.typeOf = reader.int32();
                        break;
                    case 4:
                        message.collection = reader.string();
                        break;
                    case 5:
                        message.clientAlias = reader.string();
                        break;
                    case 6:
                        message.cuid = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a MessageHeader message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof model.MessageHeader
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {model.MessageHeader} MessageHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MessageHeader.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a MessageHeader message.
             * @function verify
             * @memberof model.MessageHeader
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MessageHeader.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isString(message.version))
                        return "version: string expected";
                if (message.seq != null && message.hasOwnProperty("seq"))
                    if (!$util.isInteger(message.seq))
                        return "seq: integer expected";
                if (message.typeOf != null && message.hasOwnProperty("typeOf"))
                    switch (message.typeOf) {
                    default:
                        return "typeOf: enum value expected";
                    case 0:
                    case 1:
                    case 10:
                    case 11:
                        break;
                    }
                if (message.collection != null && message.hasOwnProperty("collection"))
                    if (!$util.isString(message.collection))
                        return "collection: string expected";
                if (message.clientAlias != null && message.hasOwnProperty("clientAlias"))
                    if (!$util.isString(message.clientAlias))
                        return "clientAlias: string expected";
                if (message.cuid != null && message.hasOwnProperty("cuid"))
                    if (!(message.cuid && typeof message.cuid.length === "number" || $util.isString(message.cuid)))
                        return "cuid: buffer expected";
                return null;
            };
    
            /**
             * Creates a MessageHeader message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof model.MessageHeader
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {model.MessageHeader} MessageHeader
             */
            MessageHeader.fromObject = function fromObject(object) {
                if (object instanceof $root.model.MessageHeader)
                    return object;
                var message = new $root.model.MessageHeader();
                if (object.version != null)
                    message.version = String(object.version);
                if (object.seq != null)
                    message.seq = object.seq >>> 0;
                switch (object.typeOf) {
                case "REQUEST_CLIENT":
                case 0:
                    message.typeOf = 0;
                    break;
                case "REQUEST_PUSHPULL":
                case 1:
                    message.typeOf = 1;
                    break;
                case "RESPONSE_CLIENT":
                case 10:
                    message.typeOf = 10;
                    break;
                case "RESPONSE_PUSHPULL":
                case 11:
                    message.typeOf = 11;
                    break;
                }
                if (object.collection != null)
                    message.collection = String(object.collection);
                if (object.clientAlias != null)
                    message.clientAlias = String(object.clientAlias);
                if (object.cuid != null)
                    if (typeof object.cuid === "string")
                        $util.base64.decode(object.cuid, message.cuid = $util.newBuffer($util.base64.length(object.cuid)), 0);
                    else if (object.cuid.length)
                        message.cuid = object.cuid;
                return message;
            };
    
            /**
             * Creates a plain object from a MessageHeader message. Also converts values to other types if specified.
             * @function toObject
             * @memberof model.MessageHeader
             * @static
             * @param {model.MessageHeader} message MessageHeader
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MessageHeader.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.version = "";
                    object.seq = 0;
                    object.typeOf = options.enums === String ? "REQUEST_CLIENT" : 0;
                    object.collection = "";
                    object.clientAlias = "";
                    if (options.bytes === String)
                        object.cuid = "";
                    else {
                        object.cuid = [];
                        if (options.bytes !== Array)
                            object.cuid = $util.newBuffer(object.cuid);
                    }
                }
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                if (message.seq != null && message.hasOwnProperty("seq"))
                    object.seq = message.seq;
                if (message.typeOf != null && message.hasOwnProperty("typeOf"))
                    object.typeOf = options.enums === String ? $root.model.TypeOfMessage[message.typeOf] : message.typeOf;
                if (message.collection != null && message.hasOwnProperty("collection"))
                    object.collection = message.collection;
                if (message.clientAlias != null && message.hasOwnProperty("clientAlias"))
                    object.clientAlias = message.clientAlias;
                if (message.cuid != null && message.hasOwnProperty("cuid"))
                    object.cuid = options.bytes === String ? $util.base64.encode(message.cuid, 0, message.cuid.length) : options.bytes === Array ? Array.prototype.slice.call(message.cuid) : message.cuid;
                return object;
            };
    
            /**
             * Converts this MessageHeader to JSON.
             * @function toJSON
             * @memberof model.MessageHeader
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MessageHeader.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return MessageHeader;
        })();
    
        /**
         * TypeOfMessage enum.
         * @name model.TypeOfMessage
         * @enum {number}
         * @property {number} REQUEST_CLIENT=0 REQUEST_CLIENT value
         * @property {number} REQUEST_PUSHPULL=1 REQUEST_PUSHPULL value
         * @property {number} RESPONSE_CLIENT=10 RESPONSE_CLIENT value
         * @property {number} RESPONSE_PUSHPULL=11 RESPONSE_PUSHPULL value
         */
        model.TypeOfMessage = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "REQUEST_CLIENT"] = 0;
            values[valuesById[1] = "REQUEST_PUSHPULL"] = 1;
            values[valuesById[10] = "RESPONSE_CLIENT"] = 10;
            values[valuesById[11] = "RESPONSE_PUSHPULL"] = 11;
            return values;
        })();
    
        /**
         * StateOfResponse enum.
         * @name model.StateOfResponse
         * @enum {number}
         * @property {number} OK=0 OK value
         * @property {number} ERR_CLIENT_INVALID_COLLECTION=101 ERR_CLIENT_INVALID_COLLECTION value
         * @property {number} ERR_CLIENT_INVALID_SYNCTYPE=102 ERR_CLIENT_INVALID_SYNCTYPE value
         */
        model.StateOfResponse = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "OK"] = 0;
            values[valuesById[101] = "ERR_CLIENT_INVALID_COLLECTION"] = 101;
            values[valuesById[102] = "ERR_CLIENT_INVALID_SYNCTYPE"] = 102;
            return values;
        })();
    
        model.ResponseState = (function() {
    
            /**
             * Properties of a ResponseState.
             * @memberof model
             * @interface IResponseState
             * @property {model.StateOfResponse|null} [state] ResponseState state
             * @property {string|null} [msg] ResponseState msg
             */
    
            /**
             * Constructs a new ResponseState.
             * @memberof model
             * @classdesc Represents a ResponseState.
             * @implements IResponseState
             * @constructor
             * @param {model.IResponseState=} [properties] Properties to set
             */
            function ResponseState(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResponseState state.
             * @member {model.StateOfResponse} state
             * @memberof model.ResponseState
             * @instance
             */
            ResponseState.prototype.state = 0;
    
            /**
             * ResponseState msg.
             * @member {string} msg
             * @memberof model.ResponseState
             * @instance
             */
            ResponseState.prototype.msg = "";
    
            /**
             * Creates a new ResponseState instance using the specified properties.
             * @function create
             * @memberof model.ResponseState
             * @static
             * @param {model.IResponseState=} [properties] Properties to set
             * @returns {model.ResponseState} ResponseState instance
             */
            ResponseState.create = function create(properties) {
                return new ResponseState(properties);
            };
    
            /**
             * Encodes the specified ResponseState message. Does not implicitly {@link model.ResponseState.verify|verify} messages.
             * @function encode
             * @memberof model.ResponseState
             * @static
             * @param {model.IResponseState} message ResponseState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResponseState.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
                if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
                return writer;
            };
    
            /**
             * Encodes the specified ResponseState message, length delimited. Does not implicitly {@link model.ResponseState.verify|verify} messages.
             * @function encodeDelimited
             * @memberof model.ResponseState
             * @static
             * @param {model.IResponseState} message ResponseState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResponseState.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResponseState message from the specified reader or buffer.
             * @function decode
             * @memberof model.ResponseState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {model.ResponseState} ResponseState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResponseState.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.ResponseState();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.state = reader.int32();
                        break;
                    case 2:
                        message.msg = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResponseState message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof model.ResponseState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {model.ResponseState} ResponseState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResponseState.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResponseState message.
             * @function verify
             * @memberof model.ResponseState
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResponseState.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.state != null && message.hasOwnProperty("state"))
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 0:
                    case 101:
                    case 102:
                        break;
                    }
                if (message.msg != null && message.hasOwnProperty("msg"))
                    if (!$util.isString(message.msg))
                        return "msg: string expected";
                return null;
            };
    
            /**
             * Creates a ResponseState message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof model.ResponseState
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {model.ResponseState} ResponseState
             */
            ResponseState.fromObject = function fromObject(object) {
                if (object instanceof $root.model.ResponseState)
                    return object;
                var message = new $root.model.ResponseState();
                switch (object.state) {
                case "OK":
                case 0:
                    message.state = 0;
                    break;
                case "ERR_CLIENT_INVALID_COLLECTION":
                case 101:
                    message.state = 101;
                    break;
                case "ERR_CLIENT_INVALID_SYNCTYPE":
                case 102:
                    message.state = 102;
                    break;
                }
                if (object.msg != null)
                    message.msg = String(object.msg);
                return message;
            };
    
            /**
             * Creates a plain object from a ResponseState message. Also converts values to other types if specified.
             * @function toObject
             * @memberof model.ResponseState
             * @static
             * @param {model.ResponseState} message ResponseState
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResponseState.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.state = options.enums === String ? "OK" : 0;
                    object.msg = "";
                }
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = options.enums === String ? $root.model.StateOfResponse[message.state] : message.state;
                if (message.msg != null && message.hasOwnProperty("msg"))
                    object.msg = message.msg;
                return object;
            };
    
            /**
             * Converts this ResponseState to JSON.
             * @function toJSON
             * @memberof model.ResponseState
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResponseState.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ResponseState;
        })();
    
        model.ClientRequest = (function() {
    
            /**
             * Properties of a ClientRequest.
             * @memberof model
             * @interface IClientRequest
             * @property {model.IMessageHeader|null} [header] ClientRequest header
             * @property {model.IClient|null} [client] ClientRequest client
             */
    
            /**
             * Constructs a new ClientRequest.
             * @memberof model
             * @classdesc Represents a ClientRequest.
             * @implements IClientRequest
             * @constructor
             * @param {model.IClientRequest=} [properties] Properties to set
             */
            function ClientRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ClientRequest header.
             * @member {model.IMessageHeader|null|undefined} header
             * @memberof model.ClientRequest
             * @instance
             */
            ClientRequest.prototype.header = null;
    
            /**
             * ClientRequest client.
             * @member {model.IClient|null|undefined} client
             * @memberof model.ClientRequest
             * @instance
             */
            ClientRequest.prototype.client = null;
    
            /**
             * Creates a new ClientRequest instance using the specified properties.
             * @function create
             * @memberof model.ClientRequest
             * @static
             * @param {model.IClientRequest=} [properties] Properties to set
             * @returns {model.ClientRequest} ClientRequest instance
             */
            ClientRequest.create = function create(properties) {
                return new ClientRequest(properties);
            };
    
            /**
             * Encodes the specified ClientRequest message. Does not implicitly {@link model.ClientRequest.verify|verify} messages.
             * @function encode
             * @memberof model.ClientRequest
             * @static
             * @param {model.IClientRequest} message ClientRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.model.MessageHeader.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.client != null && Object.hasOwnProperty.call(message, "client"))
                    $root.model.Client.encode(message.client, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ClientRequest message, length delimited. Does not implicitly {@link model.ClientRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof model.ClientRequest
             * @static
             * @param {model.IClientRequest} message ClientRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ClientRequest message from the specified reader or buffer.
             * @function decode
             * @memberof model.ClientRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {model.ClientRequest} ClientRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.ClientRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.header = $root.model.MessageHeader.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.client = $root.model.Client.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ClientRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof model.ClientRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {model.ClientRequest} ClientRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ClientRequest message.
             * @function verify
             * @memberof model.ClientRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ClientRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    var error = $root.model.MessageHeader.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.client != null && message.hasOwnProperty("client")) {
                    var error = $root.model.Client.verify(message.client);
                    if (error)
                        return "client." + error;
                }
                return null;
            };
    
            /**
             * Creates a ClientRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof model.ClientRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {model.ClientRequest} ClientRequest
             */
            ClientRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.model.ClientRequest)
                    return object;
                var message = new $root.model.ClientRequest();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".model.ClientRequest.header: object expected");
                    message.header = $root.model.MessageHeader.fromObject(object.header);
                }
                if (object.client != null) {
                    if (typeof object.client !== "object")
                        throw TypeError(".model.ClientRequest.client: object expected");
                    message.client = $root.model.Client.fromObject(object.client);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ClientRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof model.ClientRequest
             * @static
             * @param {model.ClientRequest} message ClientRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClientRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.header = null;
                    object.client = null;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.model.MessageHeader.toObject(message.header, options);
                if (message.client != null && message.hasOwnProperty("client"))
                    object.client = $root.model.Client.toObject(message.client, options);
                return object;
            };
    
            /**
             * Converts this ClientRequest to JSON.
             * @function toJSON
             * @memberof model.ClientRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClientRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ClientRequest;
        })();
    
        model.ClientResponse = (function() {
    
            /**
             * Properties of a ClientResponse.
             * @memberof model
             * @interface IClientResponse
             * @property {model.IMessageHeader|null} [header] ClientResponse header
             * @property {model.IResponseState|null} [state] ClientResponse state
             */
    
            /**
             * Constructs a new ClientResponse.
             * @memberof model
             * @classdesc Represents a ClientResponse.
             * @implements IClientResponse
             * @constructor
             * @param {model.IClientResponse=} [properties] Properties to set
             */
            function ClientResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ClientResponse header.
             * @member {model.IMessageHeader|null|undefined} header
             * @memberof model.ClientResponse
             * @instance
             */
            ClientResponse.prototype.header = null;
    
            /**
             * ClientResponse state.
             * @member {model.IResponseState|null|undefined} state
             * @memberof model.ClientResponse
             * @instance
             */
            ClientResponse.prototype.state = null;
    
            /**
             * Creates a new ClientResponse instance using the specified properties.
             * @function create
             * @memberof model.ClientResponse
             * @static
             * @param {model.IClientResponse=} [properties] Properties to set
             * @returns {model.ClientResponse} ClientResponse instance
             */
            ClientResponse.create = function create(properties) {
                return new ClientResponse(properties);
            };
    
            /**
             * Encodes the specified ClientResponse message. Does not implicitly {@link model.ClientResponse.verify|verify} messages.
             * @function encode
             * @memberof model.ClientResponse
             * @static
             * @param {model.IClientResponse} message ClientResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.model.MessageHeader.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    $root.model.ResponseState.encode(message.state, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ClientResponse message, length delimited. Does not implicitly {@link model.ClientResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof model.ClientResponse
             * @static
             * @param {model.IClientResponse} message ClientResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ClientResponse message from the specified reader or buffer.
             * @function decode
             * @memberof model.ClientResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {model.ClientResponse} ClientResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.ClientResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.header = $root.model.MessageHeader.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.state = $root.model.ResponseState.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ClientResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof model.ClientResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {model.ClientResponse} ClientResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ClientResponse message.
             * @function verify
             * @memberof model.ClientResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ClientResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    var error = $root.model.MessageHeader.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.state != null && message.hasOwnProperty("state")) {
                    var error = $root.model.ResponseState.verify(message.state);
                    if (error)
                        return "state." + error;
                }
                return null;
            };
    
            /**
             * Creates a ClientResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof model.ClientResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {model.ClientResponse} ClientResponse
             */
            ClientResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.model.ClientResponse)
                    return object;
                var message = new $root.model.ClientResponse();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".model.ClientResponse.header: object expected");
                    message.header = $root.model.MessageHeader.fromObject(object.header);
                }
                if (object.state != null) {
                    if (typeof object.state !== "object")
                        throw TypeError(".model.ClientResponse.state: object expected");
                    message.state = $root.model.ResponseState.fromObject(object.state);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ClientResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof model.ClientResponse
             * @static
             * @param {model.ClientResponse} message ClientResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClientResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.header = null;
                    object.state = null;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.model.MessageHeader.toObject(message.header, options);
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = $root.model.ResponseState.toObject(message.state, options);
                return object;
            };
    
            /**
             * Converts this ClientResponse to JSON.
             * @function toJSON
             * @memberof model.ClientResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClientResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ClientResponse;
        })();
    
        model.PushPullRequest = (function() {
    
            /**
             * Properties of a PushPullRequest.
             * @memberof model
             * @interface IPushPullRequest
             * @property {model.IMessageHeader|null} [header] PushPullRequest header
             * @property {number|null} [ID] PushPullRequest ID
             * @property {Array.<model.IPushPullPack>|null} [PushPullPacks] PushPullRequest PushPullPacks
             */
    
            /**
             * Constructs a new PushPullRequest.
             * @memberof model
             * @classdesc Represents a PushPullRequest.
             * @implements IPushPullRequest
             * @constructor
             * @param {model.IPushPullRequest=} [properties] Properties to set
             */
            function PushPullRequest(properties) {
                this.PushPullPacks = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * PushPullRequest header.
             * @member {model.IMessageHeader|null|undefined} header
             * @memberof model.PushPullRequest
             * @instance
             */
            PushPullRequest.prototype.header = null;
    
            /**
             * PushPullRequest ID.
             * @member {number} ID
             * @memberof model.PushPullRequest
             * @instance
             */
            PushPullRequest.prototype.ID = 0;
    
            /**
             * PushPullRequest PushPullPacks.
             * @member {Array.<model.IPushPullPack>} PushPullPacks
             * @memberof model.PushPullRequest
             * @instance
             */
            PushPullRequest.prototype.PushPullPacks = $util.emptyArray;
    
            /**
             * Creates a new PushPullRequest instance using the specified properties.
             * @function create
             * @memberof model.PushPullRequest
             * @static
             * @param {model.IPushPullRequest=} [properties] Properties to set
             * @returns {model.PushPullRequest} PushPullRequest instance
             */
            PushPullRequest.create = function create(properties) {
                return new PushPullRequest(properties);
            };
    
            /**
             * Encodes the specified PushPullRequest message. Does not implicitly {@link model.PushPullRequest.verify|verify} messages.
             * @function encode
             * @memberof model.PushPullRequest
             * @static
             * @param {model.IPushPullRequest} message PushPullRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PushPullRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.model.MessageHeader.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.ID != null && Object.hasOwnProperty.call(message, "ID"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.ID);
                if (message.PushPullPacks != null && message.PushPullPacks.length)
                    for (var i = 0; i < message.PushPullPacks.length; ++i)
                        $root.model.PushPullPack.encode(message.PushPullPacks[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified PushPullRequest message, length delimited. Does not implicitly {@link model.PushPullRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof model.PushPullRequest
             * @static
             * @param {model.IPushPullRequest} message PushPullRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PushPullRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a PushPullRequest message from the specified reader or buffer.
             * @function decode
             * @memberof model.PushPullRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {model.PushPullRequest} PushPullRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PushPullRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.PushPullRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.header = $root.model.MessageHeader.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.ID = reader.int32();
                        break;
                    case 3:
                        if (!(message.PushPullPacks && message.PushPullPacks.length))
                            message.PushPullPacks = [];
                        message.PushPullPacks.push($root.model.PushPullPack.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a PushPullRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof model.PushPullRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {model.PushPullRequest} PushPullRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PushPullRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a PushPullRequest message.
             * @function verify
             * @memberof model.PushPullRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PushPullRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    var error = $root.model.MessageHeader.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.ID != null && message.hasOwnProperty("ID"))
                    if (!$util.isInteger(message.ID))
                        return "ID: integer expected";
                if (message.PushPullPacks != null && message.hasOwnProperty("PushPullPacks")) {
                    if (!Array.isArray(message.PushPullPacks))
                        return "PushPullPacks: array expected";
                    for (var i = 0; i < message.PushPullPacks.length; ++i) {
                        var error = $root.model.PushPullPack.verify(message.PushPullPacks[i]);
                        if (error)
                            return "PushPullPacks." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a PushPullRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof model.PushPullRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {model.PushPullRequest} PushPullRequest
             */
            PushPullRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.model.PushPullRequest)
                    return object;
                var message = new $root.model.PushPullRequest();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".model.PushPullRequest.header: object expected");
                    message.header = $root.model.MessageHeader.fromObject(object.header);
                }
                if (object.ID != null)
                    message.ID = object.ID | 0;
                if (object.PushPullPacks) {
                    if (!Array.isArray(object.PushPullPacks))
                        throw TypeError(".model.PushPullRequest.PushPullPacks: array expected");
                    message.PushPullPacks = [];
                    for (var i = 0; i < object.PushPullPacks.length; ++i) {
                        if (typeof object.PushPullPacks[i] !== "object")
                            throw TypeError(".model.PushPullRequest.PushPullPacks: object expected");
                        message.PushPullPacks[i] = $root.model.PushPullPack.fromObject(object.PushPullPacks[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a PushPullRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof model.PushPullRequest
             * @static
             * @param {model.PushPullRequest} message PushPullRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PushPullRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.PushPullPacks = [];
                if (options.defaults) {
                    object.header = null;
                    object.ID = 0;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.model.MessageHeader.toObject(message.header, options);
                if (message.ID != null && message.hasOwnProperty("ID"))
                    object.ID = message.ID;
                if (message.PushPullPacks && message.PushPullPacks.length) {
                    object.PushPullPacks = [];
                    for (var j = 0; j < message.PushPullPacks.length; ++j)
                        object.PushPullPacks[j] = $root.model.PushPullPack.toObject(message.PushPullPacks[j], options);
                }
                return object;
            };
    
            /**
             * Converts this PushPullRequest to JSON.
             * @function toJSON
             * @memberof model.PushPullRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PushPullRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return PushPullRequest;
        })();
    
        model.PushPullResponse = (function() {
    
            /**
             * Properties of a PushPullResponse.
             * @memberof model
             * @interface IPushPullResponse
             * @property {model.IMessageHeader|null} [header] PushPullResponse header
             * @property {number|null} [ID] PushPullResponse ID
             * @property {Array.<model.IPushPullPack>|null} [PushPullPacks] PushPullResponse PushPullPacks
             */
    
            /**
             * Constructs a new PushPullResponse.
             * @memberof model
             * @classdesc Represents a PushPullResponse.
             * @implements IPushPullResponse
             * @constructor
             * @param {model.IPushPullResponse=} [properties] Properties to set
             */
            function PushPullResponse(properties) {
                this.PushPullPacks = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * PushPullResponse header.
             * @member {model.IMessageHeader|null|undefined} header
             * @memberof model.PushPullResponse
             * @instance
             */
            PushPullResponse.prototype.header = null;
    
            /**
             * PushPullResponse ID.
             * @member {number} ID
             * @memberof model.PushPullResponse
             * @instance
             */
            PushPullResponse.prototype.ID = 0;
    
            /**
             * PushPullResponse PushPullPacks.
             * @member {Array.<model.IPushPullPack>} PushPullPacks
             * @memberof model.PushPullResponse
             * @instance
             */
            PushPullResponse.prototype.PushPullPacks = $util.emptyArray;
    
            /**
             * Creates a new PushPullResponse instance using the specified properties.
             * @function create
             * @memberof model.PushPullResponse
             * @static
             * @param {model.IPushPullResponse=} [properties] Properties to set
             * @returns {model.PushPullResponse} PushPullResponse instance
             */
            PushPullResponse.create = function create(properties) {
                return new PushPullResponse(properties);
            };
    
            /**
             * Encodes the specified PushPullResponse message. Does not implicitly {@link model.PushPullResponse.verify|verify} messages.
             * @function encode
             * @memberof model.PushPullResponse
             * @static
             * @param {model.IPushPullResponse} message PushPullResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PushPullResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.model.MessageHeader.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.ID != null && Object.hasOwnProperty.call(message, "ID"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.ID);
                if (message.PushPullPacks != null && message.PushPullPacks.length)
                    for (var i = 0; i < message.PushPullPacks.length; ++i)
                        $root.model.PushPullPack.encode(message.PushPullPacks[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified PushPullResponse message, length delimited. Does not implicitly {@link model.PushPullResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof model.PushPullResponse
             * @static
             * @param {model.IPushPullResponse} message PushPullResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PushPullResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a PushPullResponse message from the specified reader or buffer.
             * @function decode
             * @memberof model.PushPullResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {model.PushPullResponse} PushPullResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PushPullResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.PushPullResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.header = $root.model.MessageHeader.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.ID = reader.int32();
                        break;
                    case 3:
                        if (!(message.PushPullPacks && message.PushPullPacks.length))
                            message.PushPullPacks = [];
                        message.PushPullPacks.push($root.model.PushPullPack.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a PushPullResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof model.PushPullResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {model.PushPullResponse} PushPullResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PushPullResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a PushPullResponse message.
             * @function verify
             * @memberof model.PushPullResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PushPullResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    var error = $root.model.MessageHeader.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.ID != null && message.hasOwnProperty("ID"))
                    if (!$util.isInteger(message.ID))
                        return "ID: integer expected";
                if (message.PushPullPacks != null && message.hasOwnProperty("PushPullPacks")) {
                    if (!Array.isArray(message.PushPullPacks))
                        return "PushPullPacks: array expected";
                    for (var i = 0; i < message.PushPullPacks.length; ++i) {
                        var error = $root.model.PushPullPack.verify(message.PushPullPacks[i]);
                        if (error)
                            return "PushPullPacks." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a PushPullResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof model.PushPullResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {model.PushPullResponse} PushPullResponse
             */
            PushPullResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.model.PushPullResponse)
                    return object;
                var message = new $root.model.PushPullResponse();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".model.PushPullResponse.header: object expected");
                    message.header = $root.model.MessageHeader.fromObject(object.header);
                }
                if (object.ID != null)
                    message.ID = object.ID | 0;
                if (object.PushPullPacks) {
                    if (!Array.isArray(object.PushPullPacks))
                        throw TypeError(".model.PushPullResponse.PushPullPacks: array expected");
                    message.PushPullPacks = [];
                    for (var i = 0; i < object.PushPullPacks.length; ++i) {
                        if (typeof object.PushPullPacks[i] !== "object")
                            throw TypeError(".model.PushPullResponse.PushPullPacks: object expected");
                        message.PushPullPacks[i] = $root.model.PushPullPack.fromObject(object.PushPullPacks[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a PushPullResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof model.PushPullResponse
             * @static
             * @param {model.PushPullResponse} message PushPullResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PushPullResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.PushPullPacks = [];
                if (options.defaults) {
                    object.header = null;
                    object.ID = 0;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.model.MessageHeader.toObject(message.header, options);
                if (message.ID != null && message.hasOwnProperty("ID"))
                    object.ID = message.ID;
                if (message.PushPullPacks && message.PushPullPacks.length) {
                    object.PushPullPacks = [];
                    for (var j = 0; j < message.PushPullPacks.length; ++j)
                        object.PushPullPacks[j] = $root.model.PushPullPack.toObject(message.PushPullPacks[j], options);
                }
                return object;
            };
    
            /**
             * Converts this PushPullResponse to JSON.
             * @function toJSON
             * @memberof model.PushPullResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PushPullResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return PushPullResponse;
        })();
    
        model.OrtooService = (function() {
    
            /**
             * Constructs a new OrtooService service.
             * @memberof model
             * @classdesc Represents an OrtooService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function OrtooService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }
    
            (OrtooService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = OrtooService;
    
            /**
             * Creates new OrtooService service using the specified rpc implementation.
             * @function create
             * @memberof model.OrtooService
             * @static
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             * @returns {OrtooService} RPC service. Useful where requests and/or responses are streamed.
             */
            OrtooService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                return new this(rpcImpl, requestDelimited, responseDelimited);
            };
    
            /**
             * Callback as used by {@link model.OrtooService#processPushPull}.
             * @memberof model.OrtooService
             * @typedef ProcessPushPullCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {model.PushPullResponse} [response] PushPullResponse
             */
    
            /**
             * Calls ProcessPushPull.
             * @function processPushPull
             * @memberof model.OrtooService
             * @instance
             * @param {model.IPushPullRequest} request PushPullRequest message or plain object
             * @param {model.OrtooService.ProcessPushPullCallback} callback Node-style callback called with the error, if any, and PushPullResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(OrtooService.prototype.processPushPull = function processPushPull(request, callback) {
                return this.rpcCall(processPushPull, $root.model.PushPullRequest, $root.model.PushPullResponse, request, callback);
            }, "name", { value: "ProcessPushPull" });
    
            /**
             * Calls ProcessPushPull.
             * @function processPushPull
             * @memberof model.OrtooService
             * @instance
             * @param {model.IPushPullRequest} request PushPullRequest message or plain object
             * @returns {Promise<model.PushPullResponse>} Promise
             * @variation 2
             */
    
            /**
             * Callback as used by {@link model.OrtooService#processClient}.
             * @memberof model.OrtooService
             * @typedef ProcessClientCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {model.ClientResponse} [response] ClientResponse
             */
    
            /**
             * Calls ProcessClient.
             * @function processClient
             * @memberof model.OrtooService
             * @instance
             * @param {model.IClientRequest} request ClientRequest message or plain object
             * @param {model.OrtooService.ProcessClientCallback} callback Node-style callback called with the error, if any, and ClientResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(OrtooService.prototype.processClient = function processClient(request, callback) {
                return this.rpcCall(processClient, $root.model.ClientRequest, $root.model.ClientResponse, request, callback);
            }, "name", { value: "ProcessClient" });
    
            /**
             * Calls ProcessClient.
             * @function processClient
             * @memberof model.OrtooService
             * @instance
             * @param {model.IClientRequest} request ClientRequest message or plain object
             * @returns {Promise<model.ClientResponse>} Promise
             * @variation 2
             */
    
            return OrtooService;
        })();
    
        return model;
    })();

    return $root;
});
