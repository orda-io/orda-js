import { Api, ApiConfig, OrdaOperation } from '@orda/generated/openapi';
import { TypeOfDatatype } from '@orda/types/datatype';

const baseUrl = 'http://127.0.0.1:29862';

export async function testEncodingOperation(type: TypeOfDatatype, op: OrdaOperation): Promise<OrdaOperation> {
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
