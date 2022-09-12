export declare enum LogguyLevel {
    debug = 1,
    log = 2,
    info = 3,
    warn = 4,
    error = 5
}
export declare type LogguyData = any;
export declare type LogguyLabel = {
    [k: string]: number | string;
};
export declare type IgnoreLogguyLabel = {
    [k: string]: any;
};
export interface LogguySpecs {
    prefix?: string;
    level?: LogguyLevel;
    time?: boolean;
    timeMilliseconds?: boolean;
    ignoreLabels?: IgnoreLogguyLabel;
    isSave?: boolean;
    saveMethod?: (...args: any[]) => void;
}
export interface ILogguy {
    debug(label: string): void;
    debug(data: LogguyData): void;
    debug(label: string | LogguyLabel, data: LogguyData): void;
    info(label: string): void;
    info(data: LogguyData): void;
    info(label: string | LogguyLabel, data: LogguyData): void;
    warn(label: string): void;
    warn(data: LogguyData): void;
    warn(label: string | LogguyLabel, data: LogguyData): void;
    error(label: string): void;
    error(data: LogguyData): void;
    error(label: string | LogguyLabel, data: LogguyData): void;
}
