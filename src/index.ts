import LogFuncEnhance from './decorator/log-function-decorator';
import LogClassEnhance from './decorator/log-class-decorator';
import Logguy from './logguy';
export * from './constant';
export * from './interface';

const modules = {
  Logguy,
  LogFuncEnhance,
  LogClassEnhance,
};

export default modules;
