export enum SyncType {
  LOCAL_ONLY = 'LOCAL_ONLY',
  MANUALLY = 'MANUALLY',
  REALTIME = 'REALTIME',
}

export const encodeSyncType: { [key: string]: number } = {
  LOCAL_ONLY: 0,
  MANUALLY: 1,
  REALTIME: 2,
};

export const decodeSyncType: { [key: number]: SyncType } = {
  0: SyncType.LOCAL_ONLY,
  1: SyncType.MANUALLY,
  2: SyncType.REALTIME,
};

export enum ClientType {
  PERSISTENT = 'PERSISTENT',
  EPHEMERAL = 'EPHEMERAL',
}

export const encodeClientType: { [key: string]: number } = {
  PERSISTENT: 0,
  EPHEMERAL: 1,
};

export const decodeClientType: { [key: number]: ClientType } = {
  0: ClientType.PERSISTENT,
  1: ClientType.EPHEMERAL,
};

export enum TypeOfOperation {
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

export const encodeTypeOfOperation: { [key: string]: number } = {
  NO_OP: 0,
  ERROR: 1,
  TRANSACTION: 2,
  COUNTER_SNAPSHOT: 10,
  COUNTER_INCREASE: 11,
  MAP_SNAPSHOT: 20,
  MAP_PUT: 21,
  MAP_REMOVE: 22,
  LIST_SNAPSHOT: 30,
  LIST_INSERT: 31,
  LIST_DELETE: 32,
  LIST_UPDATE: 33,
  DOC_SNAPSHOT: 40,
  DOC_OBJ_PUT: 41,
  DOC_OBJ_RMV: 42,
  DOC_ARR_INS: 43,
  DOC_ARR_DEL: 44,
  DOC_ARR_UPD: 45,
};

export const decodeTypeOfOperation: { [key: number]: TypeOfOperation } = {
  0: TypeOfOperation.NO_OP,
  1: TypeOfOperation.ERROR,
  2: TypeOfOperation.TRANSACTION,
  10: TypeOfOperation.COUNTER_SNAPSHOT,
  11: TypeOfOperation.COUNTER_INCREASE,
  20: TypeOfOperation.MAP_SNAPSHOT,
  21: TypeOfOperation.MAP_PUT,
  22: TypeOfOperation.MAP_REMOVE,
  30: TypeOfOperation.LIST_SNAPSHOT,
  31: TypeOfOperation.LIST_INSERT,
  32: TypeOfOperation.LIST_DELETE,
  33: TypeOfOperation.LIST_UPDATE,
  40: TypeOfOperation.DOC_SNAPSHOT,
  41: TypeOfOperation.DOC_OBJ_PUT,
  42: TypeOfOperation.DOC_OBJ_RMV,
  43: TypeOfOperation.DOC_ARR_INS,
  44: TypeOfOperation.DOC_ARR_DEL,
  45: TypeOfOperation.DOC_ARR_UPD,
};

export enum StateOfDatatype {
  DUE_TO_CREATE = 'DUE_TO_CREATE',
  DUE_TO_SUBSCRIBE = 'DUE_TO_SUBSCRIBE',
  DUE_TO_SUBSCRIBE_CREATE = 'DUE_TO_SUBSCRIBE_CREATE',
  SUBSCRIBED = 'SUBSCRIBED',
  DUE_TO_UNSUBSCRIBE = 'DUE_TO_UNSUBSCRIBE',
  CLOSED = 'CLOSED',
  DELETED = 'DELETED',
}

export const encodeStateOfDatatype: { [key: string]: number } = {
  DUE_TO_CREATE: 0,
  DUE_TO_SUBSCRIBE: 1,
  DUE_TO_SUBSCRIBE_CREATE: 2,
  SUBSCRIBED: 3,
  DUE_TO_UNSUBSCRIBE: 4,
  CLOSED: 5,
  DELETED: 6,
};

export const decodeStateOfDatatype: { [key: number]: StateOfDatatype } = {
  0: StateOfDatatype.DUE_TO_CREATE,
  1: StateOfDatatype.DUE_TO_SUBSCRIBE,
  2: StateOfDatatype.DUE_TO_SUBSCRIBE_CREATE,
  3: StateOfDatatype.SUBSCRIBED,
  4: StateOfDatatype.DUE_TO_UNSUBSCRIBE,
  5: StateOfDatatype.CLOSED,
  6: StateOfDatatype.DELETED,
};

export enum StateOfResponse {
  OK = 'OK',
  ERR_CLIENT_INVALID_COLLECTION = 'ERR_CLIENT_INVALID_COLLECTION',
  ERR_CLIENT_INVALID_SYNC_TYPE = 'ERR_CLIENT_INVALID_SYNC_TYPE',
}

export const encodeStateOfResponse: { [key: string]: number } = {
  OK: 0,
  ERR_CLIENT_INVALID_COLLECTION: 101,
  ERR_CLIENT_INVALID_SYNC_TYPE: 102,
};

export const decodeStateOfResponse: { [key: number]: StateOfResponse } = {
  0: StateOfResponse.OK,
  101: StateOfResponse.ERR_CLIENT_INVALID_COLLECTION,
  102: StateOfResponse.ERR_CLIENT_INVALID_SYNC_TYPE,
};

export enum RequestType {
  CLIENTS = 'CLIENTS',
  PUSHPULLS = 'PUSHPULLS',
}

export const encodeRequestType: { [key: string]: number } = {
  CLIENTS: 0,
  PUSHPULLS: 1,
};

export const decodeRequestType: { [key: number]: RequestType } = {
  0: RequestType.CLIENTS,
  1: RequestType.PUSHPULLS,
};

export enum TypeOfDatatype {
  COUNTER = 'COUNTER',
  MAP = 'MAP',
  LIST = 'LIST',
  DOCUMENT = 'DOCUMENT',
}

export const encodeTypeOfDatatype: { [key: string]: number } = {
  COUNTER: 0,
  MAP: 1,
  LIST: 2,
  DOCUMENT: 3,
};

export const decodeTypeOfDatatype: { [key: number]: TypeOfDatatype } = {
  0: TypeOfDatatype.COUNTER,
  1: TypeOfDatatype.MAP,
  2: TypeOfDatatype.LIST,
  3: TypeOfDatatype.DOCUMENT,
};

export interface Long {
  low: number;
  high: number;
  unsigned: boolean;
}

interface ByteBuffer {
  bytes: Uint8Array;
  offset: number;
  limit: number;
}

function pushTemporaryLength(bb: ByteBuffer): number {
  const length = readVarint32(bb);
  const limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb: ByteBuffer, type: number): void {
  switch (type) {
    case 0:
      while (readByte(bb) & 0x80) {}
      break;
    case 2:
      skip(bb, readVarint32(bb));
      break;
    case 5:
      skip(bb, 4);
      break;
    case 1:
      skip(bb, 8);
      break;
    default:
      throw new Error('Unimplemented type: ' + type);
  }
}

function stringToLong(value: string): Long {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value: Long): string {
  const low = value.low;
  const high = value.high;
  return String.fromCharCode(low & 0xffff, low >>> 16, high & 0xffff, high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

const f32 = new Float32Array(1);
const f32_u8 = new Uint8Array(f32.buffer);

const f64 = new Float64Array(1);
const f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value: number): Long {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

const bbStack: ByteBuffer[] = [];

function popByteBuffer(): ByteBuffer {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb: ByteBuffer): void {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes: Uint8Array): ByteBuffer {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb: ByteBuffer): Uint8Array {
  const bytes = bb.bytes;
  const limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb: ByteBuffer, offset: number): void {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb: ByteBuffer): boolean {
  return bb.offset >= bb.limit;
}

function grow(bb: ByteBuffer, count: number): number {
  const bytes = bb.bytes;
  const offset = bb.offset;
  const limit = bb.limit;
  const finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    const newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb: ByteBuffer, count: number): number {
  const offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb: ByteBuffer, count: number): Uint8Array {
  const offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb: ByteBuffer, buffer: Uint8Array): void {
  const offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb: ByteBuffer, count: number): string {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  const offset = advance(bb, count);
  const fromCharCode = String.fromCharCode;
  const bytes = bb.bytes;
  const invalid = '\uFFFD';
  let text = '';

  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset],
      c2: number,
      c3: number,
      c4: number,
      c: number;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xe0) === 0xc0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xc0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1f) << 6) | (c2 & 0x3f);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xf0) == 0xe0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xc0c0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0f) << 12) | ((c2 & 0x3f) << 6) | (c3 & 0x3f);
          if (c < 0x0800 || (c >= 0xd800 && c <= 0xdfff)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xf8) == 0xf0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xc0c0c0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3f) << 0x0c) | ((c3 & 0x3f) << 0x06) | (c4 & 0x3f);
          if (c < 0x10000 || c > 0x10ffff) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xd800, (c & 0x3ff) + 0xdc00);
            i += 3;
          }
        }
      }
    } else text += invalid;
  }

  return text;
}

function writeString(bb: ByteBuffer, text: string): void {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  const n = text.length;
  let byteCount = 0;

  // Write the byte count first
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xd800 && c <= 0xdbff && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35fdc00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  let offset = grow(bb, byteCount);
  const bytes = bb.bytes;

  // Then write the bytes
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xd800 && c <= 0xdbff && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35fdc00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1f) | 0xc0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0f) | 0xe0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xf0;
          bytes[offset++] = ((c >> 12) & 0x3f) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3f) | 0x80;
      }
      bytes[offset++] = (c & 0x3f) | 0x80;
    }
  }
}

function writeByteBuffer(bb: ByteBuffer, buffer: ByteBuffer): void {
  const offset = grow(bb, buffer.limit);
  const from = bb.bytes;
  const to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (let i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb: ByteBuffer): number {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb: ByteBuffer, value: number): void {
  const offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  const bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  const bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb: ByteBuffer): number {
  let offset = advance(bb, 8);
  const bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 8);
  const bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb: ByteBuffer): number {
  const offset = advance(bb, 4);
  const bytes = bb.bytes;
  return bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16) | (bytes[offset + 3] << 24);
}

function writeInt32(bb: ByteBuffer, value: number): void {
  const offset = grow(bb, 4);
  const bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb: ByteBuffer, unsigned: boolean): Long {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb: ByteBuffer, value: Long): void {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb: ByteBuffer): number {
  let c = 0;
  let value = 0;
  let b: number;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7f) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb: ByteBuffer, value: number): void {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb: ByteBuffer, unsigned: boolean): Long {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b: number;

  b = readByte(bb);
  part0 = b & 0x7f;
  if (b & 0x80) {
    b = readByte(bb);
    part0 |= (b & 0x7f) << 7;
    if (b & 0x80) {
      b = readByte(bb);
      part0 |= (b & 0x7f) << 14;
      if (b & 0x80) {
        b = readByte(bb);
        part0 |= (b & 0x7f) << 21;
        if (b & 0x80) {
          b = readByte(bb);
          part1 = b & 0x7f;
          if (b & 0x80) {
            b = readByte(bb);
            part1 |= (b & 0x7f) << 7;
            if (b & 0x80) {
              b = readByte(bb);
              part1 |= (b & 0x7f) << 14;
              if (b & 0x80) {
                b = readByte(bb);
                part1 |= (b & 0x7f) << 21;
                if (b & 0x80) {
                  b = readByte(bb);
                  part2 = b & 0x7f;
                  if (b & 0x80) {
                    b = readByte(bb);
                    part2 |= (b & 0x7f) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb: ByteBuffer, value: Long): void {
  const part0 = value.low >>> 0;
  const part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  const part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  const size =
    part2 === 0
      ? part1 === 0
        ? part0 < 1 << 14
          ? part0 < 1 << 7
            ? 1
            : 2
          : part0 < 1 << 21
            ? 3
            : 4
        : part1 < 1 << 14
          ? part1 < 1 << 7
            ? 5
            : 6
          : part1 < 1 << 21
            ? 7
            : 8
      : part2 < 1 << 7
        ? 9
        : 10;

  const offset = grow(bb, size);
  const bytes = bb.bytes;

  switch (size) {
    case 10:
      bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9:
      bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7f;
    case 8:
      bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7f;
    case 7:
      bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7f;
    case 6:
      bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7f;
    case 5:
      bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7f;
    case 4:
      bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7f;
    case 3:
      bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7f;
    case 2:
      bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7f;
    case 1:
      bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7f;
  }
}

function readVarint32ZigZag(bb: ByteBuffer): number {
  const value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb: ByteBuffer, value: number): void {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb: ByteBuffer): Long {
  const value = readVarint64(bb, /* unsigned */ false);
  const low = value.low;
  const high = value.high;
  const flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb: ByteBuffer, value: Long): void {
  const low = value.low;
  const high = value.high;
  const flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
