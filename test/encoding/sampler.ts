import { Api, ApiConfig, OrdaOperation } from '@orda/generated/openapi';
import { TypeOfDatatype } from '@orda/types/datatype';
import { serverUrl } from '../test_config';

export async function testEncodingOperation(type: TypeOfDatatype, op: OrdaOperation): Promise<OrdaOperation> {
  const apiConfig: ApiConfig = {
    baseUrl: serverUrl,
  };
  const orda = new Api(apiConfig);

  const req = await orda.api.ordaServiceTestEncodingOperation({
    type: type,
    op: op,
  });
  return req.data.op!;
}
