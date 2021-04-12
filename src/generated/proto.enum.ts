export const enum SyncType {
  LOCAL_ONLY = 'LOCAL_ONLY',
  MANUALLY = 'MANUALLY',
  NOTIFIABLE = 'NOTIFIABLE',
}

export const encodeSyncType: { [key: string]: number } = {
  LOCAL_ONLY: 0,
  MANUALLY: 1,
  NOTIFIABLE: 2,
};

export const decodeSyncType: { [key: number]: SyncType } = {
  0: SyncType.LOCAL_ONLY,
  1: SyncType.MANUALLY,
  2: SyncType.NOTIFIABLE,
};

export const enum ClientType {
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

export const enum TypeOfOperation {
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

export const encodeTypeOfOperation: { [key: string]: number } = {
  SNAPSHOT: 0,
  DELETE: 2,
  ERROR: 3,
  TRANSACTION: 5,
  COUNTER_INCREASE: 11,
  MAP_PUT: 21,
  MAP_REMOVE: 22,
  LIST_INSERT: 31,
  LIST_DELETE: 32,
  LIST_UPDATE: 33,
  DOC_PUT_OBJ: 41,
  DOC_DEL_OBJ: 42,
  DOC_INS_ARR: 43,
  DOC_DEL_ARR: 44,
  DOC_UPD_ARR: 45,
};

export const decodeTypeOfOperation: { [key: number]: TypeOfOperation } = {
  0: TypeOfOperation.SNAPSHOT,
  2: TypeOfOperation.DELETE,
  3: TypeOfOperation.ERROR,
  5: TypeOfOperation.TRANSACTION,
  11: TypeOfOperation.COUNTER_INCREASE,
  21: TypeOfOperation.MAP_PUT,
  22: TypeOfOperation.MAP_REMOVE,
  31: TypeOfOperation.LIST_INSERT,
  32: TypeOfOperation.LIST_DELETE,
  33: TypeOfOperation.LIST_UPDATE,
  41: TypeOfOperation.DOC_PUT_OBJ,
  42: TypeOfOperation.DOC_DEL_OBJ,
  43: TypeOfOperation.DOC_INS_ARR,
  44: TypeOfOperation.DOC_DEL_ARR,
  45: TypeOfOperation.DOC_UPD_ARR,
};

export const enum StateOfDatatype {
  DUE_TO_CREATE = 'DUE_TO_CREATE',
  DUE_TO_SUBSCRIBE = 'DUE_TO_SUBSCRIBE',
  DUE_TO_SUBSCRIBE_CREATE = 'DUE_TO_SUBSCRIBE_CREATE',
  SUBSCRIBED = 'SUBSCRIBED',
  DUE_TO_UNSUBSCRIBE = 'DUE_TO_UNSUBSCRIBE',
  UNSUBSCRIBED = 'UNSUBSCRIBED',
  DELETED = 'DELETED',
}

export const encodeStateOfDatatype: { [key: string]: number } = {
  DUE_TO_CREATE: 0,
  DUE_TO_SUBSCRIBE: 1,
  DUE_TO_SUBSCRIBE_CREATE: 2,
  SUBSCRIBED: 3,
  DUE_TO_UNSUBSCRIBE: 4,
  UNSUBSCRIBED: 5,
  DELETED: 6,
};

export const decodeStateOfDatatype: { [key: number]: StateOfDatatype } = {
  0: StateOfDatatype.DUE_TO_CREATE,
  1: StateOfDatatype.DUE_TO_SUBSCRIBE,
  2: StateOfDatatype.DUE_TO_SUBSCRIBE_CREATE,
  3: StateOfDatatype.SUBSCRIBED,
  4: StateOfDatatype.DUE_TO_UNSUBSCRIBE,
  5: StateOfDatatype.UNSUBSCRIBED,
  6: StateOfDatatype.DELETED,
};

export const enum StateOfResponse {
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

export const enum RequestType {
  CLIENTS = 'CLIENTS',
  PUSHPULLS = 'PUSHPULLS',
}

export const encodeRequestType: { [key: string]: number } = {
  CLIENTS: 0,
  PUSHPULLS: 1,
};
