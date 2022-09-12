import LogFuncEnhance from './decorator/log-function-decorator';
import LogClassEnhance from './decorator/log-class-decorator';
import Logguy from './logguy';
export * from './constant';
export * from './interface';
declare const modules: {
    Logguy: typeof Logguy;
    LogFuncEnhance: typeof LogFuncEnhance;
    LogClassEnhance: typeof LogClassEnhance;
};
export default modules;
