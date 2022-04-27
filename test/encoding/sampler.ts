import { Api, ApiConfig, OrdaOperation } from '@orda/generated/openapi';
import { TypeOfDatatype } from '@orda/types/datatype';
import { testConf } from '../test_config';

export async function testEncodingOperation(type: TypeOfDatatype, op: OrdaOperation): Promise<OrdaOperation> {
  const apiConfig: ApiConfig = {
    baseUrl: testConf.serverAddr,
    baseApiParams: {
      headers: testConf.customHeaders,
    },
  };
  const orda = new Api(apiConfig);

  const req = await orda.api.ordaServiceTestEncodingOperation({
    type: type,
    op: op,
  });
  return req.data.op!;
}
