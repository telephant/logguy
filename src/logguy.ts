import {
  ILogguy,
  LogguyLevel,
  LogguySpecs,
} from './interface';
import {
  LEVEL_MAP,
} from './constant';

export default class Logguy implements ILogguy {
  private _prefix: string;

  /**
   * log level.
   */
  private _level: LogguyLevel;

  /**
   * display time or not.
   */
  private _time: boolean;

  /**
   * save log or not.
   */
  private _isSave: boolean;

  /**
   * method for saving.
   */
  private _saveMethod: ((...args: any[]) => void) | null;

  /**
   * time exact at milliseconds.
   */
  private _timeMilliseconds: boolean;

  constructor(specs?: LogguySpecs) {
    // prefix.
    this._prefix = specs?.prefix ?? '';

    // default log level is 'debug', the lowest one.
    this._level = specs?.level ?? LogguyLevel.debug;

    // display time or not.
    this._time = specs?.time ?? false;

    // time exact at milliseconds.
    this._timeMilliseconds = specs?.timeMilliseconds ?? false;

    // save log or not.
    this._isSave = specs?.isSave ?? false;

    // method for saving.
    this._saveMethod = specs?.saveMethod ?? null;
  }

  debug(...args: any[]) {
    if (!this._validOutputLevel(LogguyLevel.debug)) {
      return;
    }

    this._print(LogguyLevel.debug, ...args);
  }

  info(...args: any[]) {
    if (!this._validOutputLevel(LogguyLevel.info)) {
      return;
    }

    this._print(LogguyLevel.info, ...args);
  }

  warn(...args: any[]) {
    if (!this._validOutputLevel(LogguyLevel.warn)) {
      return;
    }

    this._print(LogguyLevel.warn, ...args);
  }

  error(...args: any[]) {
    if (!this._validOutputLevel(LogguyLevel.error)) {
      return;
    }

    this._print(LogguyLevel.error, ...args);
  }

  _validOutputLevel(currentLevel: LogguyLevel) {
    return currentLevel >= this._level;
  }

  _print(level: LogguyLevel, ...args: any[]) {

    let logData;
    let title;
    switch (args.length) {
      case 1:
        [logData] = args;
        title = '';
        break;
      case 2:
        [title, logData] = args;
        break;
    }

    const prefix = this._prefix ?? '';
    const time = this._time ? getTime(this._timeMilliseconds) : null;
    const formatTitle = this._assembleTitle(prefix, time, { level: LEVEL_MAP[level] }, title);

    switch(level){
      case LogguyLevel.debug:
        console.debug(formatTitle, logData);
        break;
      case LogguyLevel.info:
        console.info(formatTitle, logData);
        break;
      case LogguyLevel.warn:
        console.warn(formatTitle, logData);
        break;
      case LogguyLevel.error:
        console.error(formatTitle, logData);
        break;
    }

    if (this._isSave && this._saveMethod) {
      this._saveMethod(formatTitle, logData);
    }
  }

  _assembleTitle(...args: any[]) {
    const res = args.reduce((acc: string, curArg: any, index: number) => {
      if (!curArg) {
        return acc ?? '';
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

const getTime = (timeMilliseconds: boolean) => {
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
