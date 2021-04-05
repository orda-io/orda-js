import { createLocalClientConfig } from '@ooo/config';
import { ClientModel, SyncType } from '@ooo/types/client';
import { CUID } from '@ooo/types/uid';
import { ClientContext } from '@ooo/context';
import { helper } from '@test/helper';
import { NotifyManager } from '@ooo/managers/notify';
import waitForExpect from 'wait-for-expect';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Test Notify Manager', () => {
  it('Can connect EMQX server', async () => {
    const conf = createLocalClientConfig('hello_world');
    const clientModel = new ClientModel(
      new CUID(),
      it.name,
      'hello_world',
      SyncType.NOTIFIABLE
    );
    const ctx = new ClientContext(clientModel, helper.loggerFactory);
    const notifyManager = new NotifyManager(conf, ctx);
    notifyManager.connect();
    await waitForExpect(() => {
      expect(notifyManager.isConnected()).to.equal(true);
    }, 2000);
    const disconnect = sinon.spy(notifyManager, 'onMessageArrived');
    notifyManager.subscribe('ortoo-js/test');

    await helper.sleep(2);

    notifyManager.disconnect();
    // sinon.assert.calledOnce(disconnect);
  });
});
