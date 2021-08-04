import { OrdaOperation as OperationOa, OrdaTypeOfOperation as OpType } from '@orda/generated/openapi';
import { OrdaLogger } from '@orda-io/orda-logger';
import { ErrorOperation, SnapshotOperation, TransactionOperation } from '@orda/operations/meta';
import { IncreaseOperation } from '@orda/operations/counter';
import { OperationID } from '@orda/types/operation';
import { ErrDatatype } from '@orda/errors/datatype';
import { Op } from '@orda/operations/operation';
import { PutOperation, RemoveOperation } from '@orda/operations/map';
import { DeleteOperation, InsertOperation, UpdateOperation } from '@orda/operations/list';
import {
  DocDeleteInArrayOperation,
  DocInsertToArrayOperation,
  DocPutInObjOperation,
  DocRemoveInObjOperation,
  DocUpdateInArrayOperation,
} from '@orda/operations/document';
import { commonBtoA, isBrowser } from '@orda/utils/browser_or_node';

export function convertFromOpenApiOperation(opa: OperationOa, logger?: OrdaLogger): Op {
  let op: Op | undefined;
  logger?.log(`isBrowser:${isBrowser}`);
  const decodedBody = commonBtoA(opa.body!);

  switch (opa?.opType) {
    case OpType.COUNTER_SNAPSHOT:
    case OpType.MAP_SNAPSHOT:
    case OpType.LIST_SNAPSHOT:
    case OpType.DOC_SNAPSHOT:
      op = SnapshotOperation.fromOpenApi(opa.opType, decodedBody, logger);
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
