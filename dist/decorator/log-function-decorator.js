"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logFunctionEnhance = void 0;
function logFunctionEnhance(logger, options) {
    /**
     * @target target class object
     * @propertyKey key of member,that is part of the target
     * @descriptor member, which is called.
     */
    return function (fn) {
        const fnName = fn.name;
        const { inputs = true, outputs = true, outputsNullSkip = false, exception = true, } = options !== null && options !== void 0 ? options : {};
        return function (...args) {
            if (inputs) {
                logger.info(`${fnName} called, inputs: ${args.toString()}`);
            }
            let result;
            try {
                result = Function.apply(fn, args);
            }
            catch (err) {
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
}
exports.logFunctionEnhance = logFunctionEnhance;
;
exports.default = logFunctionEnhance;
