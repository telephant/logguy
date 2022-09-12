"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_function_decorator_1 = __importDefault(require("../decorator/log-function-decorator"));
const class_log_decorator_1 = __importDefault(require("../decorator/class-log-decorator"));
const logguy_1 = __importDefault(require("../logguy"));
const interface_1 = require("../interface");
/**
 * class decorator.
 */
const clogger = new logguy_1.default({ prefix: 'CLASS' });
const logEnhance = (0, class_log_decorator_1.default)(clogger);
class TestClassLog {
    static test(a, b) {
        return 321;
    }
}
__decorate([
    logEnhance()
], TestClassLog, "test", null);
TestClassLog.test('aaa', 2222);
/**
 * function decorator.
 */
const flogger = new logguy_1.default({ prefix: 'FUNCTION' });
const testFn = (c, d) => {
    const b = 1;
    return b;
};
(0, log_function_decorator_1.default)(flogger)(testFn)('a', 'b');
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
const logger = new logguy_1.default({
    prefix: 'COMMON',
    level: interface_1.LogguyLevel.warn,
    time: true,
});
logger.debug('test debug data', logData);
logger.info('test info data', logData);
logger.warn('test warn data', logData);
logger.error('test error data', errorData);
