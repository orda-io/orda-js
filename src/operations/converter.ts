import { OrtooOperation as OperationOa, OrtooTypeOfOperation as OpType } from '@ooo/generated/openapi';
import { OrtooLogger } from '@ooo/utils/ortoo_logger';
import { ErrorOperation, SnapshotOperation, TransactionOperation } from '@ooo/operations/meta';
import { IncreaseOperation } from '@ooo/operations/counter';
import { OperationID } from '@ooo/types/operation';
import { ErrDatatype } from '@ooo/errors/datatype';
import { Op } from '@ooo/operations/operation';
import { PutOperation, RemoveOperation } from '@ooo/operations/map';
import { DeleteOperation, InsertOperation, UpdateOperation } from '@ooo/operations/list';
import {
  DocDeleteInArrayOperation,
  DocInsertToArrayOperation,
  DocPutInObjOperation,
  DocRemoveInObjOperation,
  DocUpdateInArrayOperation,
} from '@ooo/operations/document';

export function convertFromOpenApiOperation(opa: OperationOa, logger?: OrtooLogger): Op {
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
      op = InsertOperation.fromOpenApi(decodedBody, logger);
      break;
    case OpType.LIST_DELETE:
      op = DeleteOperation.fromOpenApi(decodedBody, logger);
      break;
    case OpType.LIST_UPDATE:
      op = UpdateOperation.fromOpenApi(decodedBody, logger);
      break;
    case OpType.DOC_OBJ_PUT:
      op = DocPutInObjOperation.fromOpenApi(decodedBody, logger);
      break;
    case OpType.DOC_OBJ_RMV:
      op = DocRemoveInObjOperation.fromOpenApi(decodedBody, logger);
      break;
    case OpType.DOC_ARR_INS:
      op = DocInsertToArrayOperation.fromOpenApi(decodedBody, logger);
      break;
    case OpType.DOC_ARR_DEL:
      op = DocDeleteInArrayOperation.fromOpenApi(decodedBody, logger);
      break;
    case OpType.DOC_ARR_UPD:
      op = DocUpdateInArrayOperation.fromOpenApi(decodedBody, logger);
      break;
  }
  if (op) {
    op.id = OperationID.fromOpenApi(opa.ID!);
    return op;
  }
  logger?.info(`${JSON.stringify(opa)}`);
  throw new ErrDatatype.Marshal(logger);
}
