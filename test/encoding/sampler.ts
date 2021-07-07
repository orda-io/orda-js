import { Api, ApiConfig, OrtooOperation } from '@ooo/generated/openapi';
import { TypeOfDatatype } from '@ooo/types/datatype';

const baseUrl = 'http://127.0.0.1:29862';

// export async function testEncodingOperation(
//   type: OrtooTypeOfOperation
// ): Promise<OrtooOperation> {
//   const apiConfig: ApiConfig = {
//     baseUrl: baseUrl,
//   };
//   const ortoo = new Api(apiConfig);
//   const req = await ortoo.api.ortooServiceTestEncodingOperation({
//     opType: type,
//   });
//   return req.data;
// }

export async function testEncodingOperation(
  type: TypeOfDatatype,
  op: OrtooOperation
): Promise<OrtooOperation> {
  const apiConfig: ApiConfig = {
    baseUrl: baseUrl,
  };
  const ortoo = new Api(apiConfig);

  const req = await ortoo.api.ortooServiceTestEncodingOperation({
    type: type,
    op: op,
  });
  return req.data.op!;
}
