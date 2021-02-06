import { OrtooLoggerFactory } from '@ooo/utils/ortoo_logger';

function generate_error(): Error {
  throw new Error('generated error');
}

describe('Test OrtooLogger', () => {
  it('Can log with OrtooLogger', () => {
    const num = 1234;
    const logFactory = new OrtooLoggerFactory('trace');
    const logger = logFactory.getLogger('test logging');
    logger.trace('trace message');
    logger.debug('debug message');
    logger.info(`log message:${num}`);
    logger.warn('warn message');
    try {
      generate_error();
    } catch (e) {
      logger.error('error message', e);
    }
    logger.log('log withPos back');
  });
});
