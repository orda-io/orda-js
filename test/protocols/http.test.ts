import { ClientModel, SyncType } from '@ooo/types/client';
import { CUID } from '@ooo/types/uid';

describe('Test http', () => {
  it('Should work with http', async () => {
    const client = new ClientModel(
      new CUID(),
      'hello_world',
      'hello_world',
      SyncType.NOTIFIABLE
    );
    // const clientRequest = ortoo.ClientRequest.create({
    //   header: ortoo.MessageHeader.create(<ortoo.IMessageHeader>{
    //     version: 'v1',
    //   }),
    //   client: client.toPb(),
    // });
    // await axios
    //   .post('http://localhost:29861/api/v1/clients', clientRequest)
    //   .then((response) => {
    //     console.log(`${response}`);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  });
});
