import { Api, ApiConfig, OrdaOperation } from "@ooo/generated/openapi";
import { TypeOfDatatype } from "@ooo/types/datatype";

const baseUrl = 'http://127.0.0.1:29862';

// export async function testEncodingOperation(
//   type: OrdaTypeOfOperation
// ): Promise<OrdaOperation> {
//   const apiConfig: ApiConfig = {
//     baseUrl: baseUrl,
//   };
//   const orda = new Api(apiConfig);
//   const req = await orda.api.ordaServiceTestEncodingOperation({
//     opType: type,
//   });
//   return req.data;
// }

export async function testEncodingOperation(
  type: TypeOfDatatype,
  op: OrdaOperation
): Promise<OrdaOperation> {
  const apiConfig: ApiConfig = {
    baseUrl: baseUrl,
  };
  const orda = new Api(apiConfig);

  const req = await orda.api.ordaServiceTestEncodingOperation({
    type: type,
    op: op,
  });
  return req.data.op!;
}
