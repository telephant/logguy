"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logPropertyEnhance = void 0;
function logPropertyEnhance(log) {
    const logger = log;
    return function (options) {
        /**
         * @target target class object
         * @propertyKey key of member,that is part of the target
         * @descriptor member, which is called.
         */
        return function (target, propertyKey, descriptor) {
            const original = descriptor.value;
            const className = target.name;
            const { inputs = true, outputs = true, outputsNullSkip = false, exception = true, } = options !== null && options !== void 0 ? options : {};
            descriptor.value = function (...args) {
                if (inputs) {
                    logger.info(`${className}::${propertyKey} called, inputs: ${args.toString()}`);
                }
                let result;
                try {
                    result = original.apply(this, args);
                }
                catch (err) {
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
    };
}
exports.logPropertyEnhance = logPropertyEnhance;
;
exports.default = logPropertyEnhance;
