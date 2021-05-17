import {
  OrtooOperation as OperationOa,
  OrtooTypeOfOperation as OpType,
} from '@ooo/generated/openapi';
import { OrtooLogger } from '@ooo/utils/ortoo_logger';
import {
  ErrorOperation,
  SnapshotOperation,
  TransactionOperation,
} from '@ooo/operations/meta';
import { IncreaseOperation } from '@ooo/operations/counter';
import { OperationId } from '@ooo/types/operation';
import { ErrDatatype } from '@ooo/errors/datatype';
import { Op } from '@ooo/operations/operation';
import { PutOperation, RemoveOperation } from '@ooo/operations/map';

export function convertOpenApiOperation(
  opa: OperationOa,
  logger?: OrtooLogger
): Op {
  let op: Op | undefined;
  const decodedBody = Buffer.from(opa.body!, 'base64').toString('ascii');

  switch (opa?.opType) {
    case OpType.SNAPSHOT:
      op = SnapshotOperation.fromOpenApi(decodedBody, logger);
      break;
    case OpType.ERROR:
      op = ErrorOperation.fromOpenApi(decodedBody, logger);
      break;
    case OpType.TRANSACTION:
      op = TransactionOperation.fromOpenApi(decodedBody, logger);
      break;
    case OpType.COUNTER_INCREASE:
      op = IncreaseOperation.fromOpenApi(decodedBody, logger);
      break;
    case OpType.MAP_PUT:
      op = PutOperation.fromOpenApi(decodedBody, logger);
      break;
    case OpType.MAP_REMOVE:
      op = RemoveOperation.fromOpenApi(decodedBody, logger);
      break;
    case OpType.LIST_INSERT:
      break;
    case OpType.LIST_DELETE:
      break;
    case OpType.LIST_UPDATE:
      break;
    case OpType.DOC_PUT_OBJ:
      break;
    case OpType.DOC_DEL_OBJ:
      break;
    case OpType.DOC_INS_ARR:
      break;
    case OpType.DOC_DEL_ARR:
      break;
    case OpType.DOC_UPD_ARR:
      break;
  }
  if (op) {
    op.id = OperationId.fromOpenApi(opa.ID!);
    return op;
  }
  logger?.info(`${JSON.stringify(opa)}`);
  throw new ErrDatatype.Marshal(logger);
}
