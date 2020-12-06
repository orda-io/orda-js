import { OrtooLog, OrtooLogger } from '../../src/utils/logging';

function generate_error(): Error {
  throw new Error('generated error');
}

describe('Test logging', () => {
  it('Can log with root logger', () => {
    const num = 1234;
    OrtooLog.trace('trace message');
    OrtooLog.debug('debug message');
    OrtooLog.log(`log message:${num}`);
    OrtooLog.info('info', num);
    OrtooLog.warn('warn message');
    try {
      generate_error();
    } catch (e) {
      OrtooLog.error(e);
    }
  });

  it('Can log with specific logger', () => {
    const l = new OrtooLogger('HelloLogger');
    l.info('info HelloLogger');
    l.debug('debug HelloLogger');
  });
});
