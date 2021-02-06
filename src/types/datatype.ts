export {
  DatatypeMeta,
  TypeOfDatatype,
  StateOfDatatype,
} from '@ooo/protobuf/ortoo_pb';

export { DatatypeNames, StateOfDatatypeNames };

const DatatypeNames = {
  0: 'COUNTER',
  1: 'MAP',
  2: 'LIST',
  3: 'DOC',
};

const StateOfDatatypeNames = {
  0: 'DUE_TO_CREATE',
  1: 'DUE_TO_SUBSCRIBE',
  2: 'DUE_TO_SUBSCRIBE_CREATE',
  3: 'SUBSCRIBED',
  4: 'DUE_TO_UNSUBSCRIBE',
  5: 'UNSUBSCRIBED',
  6: 'DELETED',
};
