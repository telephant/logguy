import logFunctionDecorator from '../decorator/log-function-decorator';
import logPropertyEnhance from '../decorator/log-class-decorator';
import Logguy from '../logguy';
import { LogguyLevel } from '../interface';


/**
 * class decorator.
 */
const clogger = new Logguy({ prefix: 'CLASS' });

const logEnhance = logPropertyEnhance(clogger);
class TestClassLog {
  @logEnhance()
  static test(a: string, b: number) {
    return 321;
  }
}
TestClassLog.test('aaa', 2222);

/**
 * function decorator.
 */
const flogger = new Logguy({ prefix: 'FUNCTION' });
const testFn = (c: string, d: string) => {
  const b = 1;
return b;
};
logFunctionDecorator(flogger)(testFn)('a', 'b');

/**
 * normal log print.
 */
const logData = {
  name: 'box',
  age: 10,
  sons: {
    bob: 'male',
    alice: 'female',
  },
  hobby: ['basketball', 'tennis'],
};
const errorData = new Error('error self');
const logger = new Logguy({
  prefix: 'COMMON',
  // level: LogguyLevel.warn,
  ignoreLabels: { event: 'ignore' },
  time: true,
});
logger.debug('test debug string!!!');
logger.debug('test debug data', logData);
logger.debug(logData);
logger.debug({ event: 'fire', method: 'notify' });
logger.debug({ event: 'fire', method: 'notify' }, logData);
logger.debug({ event: 'ignore', method: 'notify' }, { a: 111 });
logger.info('test info data', logData);
logger.warn('test warn data', logData);
logger.error('test error data', errorData);
