
import Logguy from '../logguy';

interface IOptions {
  inputs?: boolean;
  outputs?: boolean;
  exception?: boolean;
  outputsNullSkip?: boolean;
}

export function logClassEnhance(log: Logguy) {
  const logger = log;

  return function (options?: IOptions) {
    /**
     * @target target class object
     * @propertyKey key of member,that is part of the target
     * @descriptor member, which is called.
     */
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const original = descriptor.value;
      const className = target.name;

      const {
        inputs = true,
        outputs = true,
        outputsNullSkip = false,
        exception = true,
      } = options ?? {};

      descriptor.value = function (...args: any[]) {
        if (inputs) {
          logger.info(`${className}::${propertyKey} called, inputs: ${args.toString()}`);
        }

        let result;
        try {
          result = original.apply(this, args);
        } catch (err) {
          if (exception) {
            logger.error(`${className}::${propertyKey} called, error: ${err}`);
          }
          throw err;
        }

        if (outputs) {
          if (!outputsNullSkip || (result === undefined || result === null)) {
            logger.info(`${className}::${propertyKey} called, outputs: ${result}`);
          }
        }

        return result;
      };

      return descriptor;
    };
  }
};

export default logClassEnhance;
