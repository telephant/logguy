export enum LogguyLevel {
  debug = 1,
  log = 2,
  info = 3,
  warn = 4,
  error = 5,
}

export type LogguyData = {};

export interface LogguySpecs {
  prefix?: string;
  level?: LogguyLevel;
  // show time or not.
  time?: boolean;
  // exact at milliseconds.
  timeMilliseconds?: boolean;
  // save the log data or not.
  isSave?: boolean;
  // method of saving log data.
  saveMethod?: (...args: any[]) => void;
}

export interface ILogguy {
  debug(data: LogguyData): void;
  debug(title: string, data: LogguyData): void;

  info(data: LogguyData): void;
  info(title: string, data: LogguyData): void;

  warn(data: LogguyData): void;
  warn(title: string, data: LogguyData): void;

  error(data: LogguyData): void;
  error(title: string, data: LogguyData): void;

  // collapsed(logObj: LogObj, prefix?: string): void;
  // collapsed(labels: LogObj, logObj: LogObj, prefix?: string): void;
  // info(data: LogObj): void;
  // info(data: LogObj, stringify: boolean): void;
}
