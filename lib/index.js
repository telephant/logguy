'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function logClassEnhance(log) {
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

exports.LogguyLevel = void 0;
(function (LogguyLevel) {
    LogguyLevel[LogguyLevel["debug"] = 1] = "debug";
    LogguyLevel[LogguyLevel["info"] = 2] = "info";
    LogguyLevel[LogguyLevel["warn"] = 3] = "warn";
    LogguyLevel[LogguyLevel["error"] = 4] = "error";
})(exports.LogguyLevel || (exports.LogguyLevel = {}));

const LEVEL_MAP = {
    [exports.LogguyLevel.debug]: 'DEBUG',
    [exports.LogguyLevel.info]: 'INFO',
    [exports.LogguyLevel.warn]: 'WARN',
    [exports.LogguyLevel.error]: 'ERROR',
};

class Logguy {
    constructor(specs) {
        var _a, _b, _c, _d, _e, _f, _g;
        // prefix.
        this._prefix = (_a = specs === null || specs === void 0 ? void 0 : specs.prefix) !== null && _a !== void 0 ? _a : '';
        // default log level is 'debug', the lowest one.
        this._level = (_b = specs === null || specs === void 0 ? void 0 : specs.level) !== null && _b !== void 0 ? _b : exports.LogguyLevel.debug;
        // display time or not.
        this._time = (_c = specs === null || specs === void 0 ? void 0 : specs.time) !== null && _c !== void 0 ? _c : false;
        // time exact at milliseconds.
        this._timeMilliseconds = (_d = specs === null || specs === void 0 ? void 0 : specs.timeMilliseconds) !== null && _d !== void 0 ? _d : false;
        // ignore, when hit the lables.
        this._ignoreLabels = (_e = specs === null || specs === void 0 ? void 0 : specs.ignoreLabels) !== null && _e !== void 0 ? _e : {};
        // save log or not.
        this._isSave = (_f = specs === null || specs === void 0 ? void 0 : specs.isSave) !== null && _f !== void 0 ? _f : false;
        // method for saving.
        this._saveMethod = (_g = specs === null || specs === void 0 ? void 0 : specs.saveMethod) !== null && _g !== void 0 ? _g : null;
    }
    debug(...args) {
        this._print(exports.LogguyLevel.debug, ...args);
    }
    info(...args) {
        this._print(exports.LogguyLevel.info, ...args);
    }
    warn(...args) {
        this._print(exports.LogguyLevel.warn, ...args);
    }
    error(...args) {
        this._print(exports.LogguyLevel.error, ...args);
    }
    _checkIfIgnore(labels) {
        const keys = Object.keys(this._ignoreLabels);
        if (keys.length === 0) {
            return false;
        }
        const target = keys.find((k) => labels[k] && this._ignoreLabels[k].includes(labels[k]));
        return Boolean(target);
    }
    _validOutputLevel(currentLevel) {
        return currentLevel >= this._level;
    }
    _print(level, ...args) {
        var _a;
        let logData;
        let title;
        switch (args.length) {
            case 1:
                if (typeof args[0] === 'string') {
                    [title] = args;
                }
                else {
                    [logData] = args;
                    title = '';
                }
                break;
            case 2:
                [title, logData] = args;
                break;
        }
        if (title && typeof title !== 'string') {
            if (this._checkIfIgnore(title)) {
                return;
            }
        }
        const prefix = (_a = this._prefix) !== null && _a !== void 0 ? _a : '';
        const time = this._time ? getTime(this._timeMilliseconds) : null;
        let formatTitle = '';
        if (typeof title === 'string') {
            formatTitle = this._assembleTitle(prefix, time, { level: LEVEL_MAP[level] }) + title;
        }
        else {
            formatTitle = this._assembleTitle(prefix, time, { level: LEVEL_MAP[level] }, title);
        }
        const printData = [
            formatTitle,
        ];
        // control log level print immediately..
        if (this._validOutputLevel(level)) {
            if (logData) {
                printData.push(logData);
            }
            switch (level) {
                case exports.LogguyLevel.debug:
                    console.debug(...printData);
                    break;
                case exports.LogguyLevel.info:
                    console.info(...printData);
                    break;
                case exports.LogguyLevel.warn:
                    console.warn(...printData);
                    break;
                case exports.LogguyLevel.error:
                    console.error(...printData);
                    break;
            }
        }
        if (this._isSave && this._saveMethod) {
            this._saveMethod(formatTitle, logData);
        }
    }
    _assembleTitle(...args) {
        const res = args.reduce((acc, curArg, index) => {
            if (!curArg) {
                return acc !== null && acc !== void 0 ? acc : '';
            }
            const type = typeof curArg;
            let title = '';
            switch (type) {
                case 'function':
                    title = `${acc}[${curArg.toString()}]`;
                    break;
                case 'object':
                    if (Array.isArray(curArg)) {
                        return `${acc}[${curArg.join(',')}]`;
                    }
                    const keys = Object.keys(curArg);
                    const format = keys.map((key) => `[${key.toUpperCase()}: ${curArg[key]}]`);
                    title = `${acc}${format.join(' ')}`;
                    break;
                default:
                    title = `${acc}[${curArg}]`;
            }
            return title;
        }, '');
        return res;
    }
}
const getTime = (timeMilliseconds) => {
    const dObj = new Date();
    const y = dObj.getFullYear();
    const m = dObj.getMonth();
    const d = dObj.getDay();
    const h = dObj.getHours();
    const mins = dObj.getMinutes();
    const s = dObj.getSeconds();
    const ms = dObj.getMilliseconds();
    return `${y}-${m}-${d} ${h}:${mins}:${s}${timeMilliseconds ? `.${ms}` : ''}`;
};

exports.LEVEL_MAP = LEVEL_MAP;
exports.LogClassEnhance = logClassEnhance;
exports.LogFuncEnhance = logFunctionEnhance;
exports["default"] = Logguy;
