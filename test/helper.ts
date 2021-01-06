import { OrtooLoggerFactory } from '../src/utils/ortoo_logger';

const logFactory = new OrtooLoggerFactory('trace');

export const TestLogger = logFactory.getLogger('test');
