export declare enum LogguyLevel {
    debug = 1,
    log = 2,
    info = 3,
    warn = 4,
    error = 5
}
export declare type LogguyData = {};
export interface LogguySpecs {
    prefix?: string;
    level?: LogguyLevel;
    time?: boolean;
    timeMilliseconds?: boolean;
    isSave?: boolean;
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
}
