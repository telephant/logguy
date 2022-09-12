
import Logguy from '../logguy';

interface IOptions {
  inputs?: boolean;
  outputs?: boolean;
  exception?: boolean;
  outputsNullSkip?: boolean;
}

export function logFunctionEnhance(logger: Logguy, options?: IOptions) {
  /**
   * @target target class object
   * @propertyKey key of member,that is part of the target
   * @descriptor member, which is called.
   */
  return function (fn: Function) {
    const fnName = fn.name;
    const {
      inputs = true,
      outputs = true,
      outputsNullSkip = false,
      exception = true,
    } = options ?? {};

    return function (...args: any[]) {
      if (inputs) {
        logger.info(`${fnName} called, inputs: ${args.toString()}`);
      }

      let result;
      try {
        result = Function.apply(fn, args);
      } catch (err) {
        if (exception) {
          logger.error(`${fnName} called, error: ${err}`);
        }
        throw err;
      }

      if (outputs) {
        if (!outputsNullSkip || (result === undefined || result === null)) {
          logger.info(`${fnName} called, outputs: ${result}`);
        }
      }

      return result;
    };
  };
};

export default logFunctionEnhance;
