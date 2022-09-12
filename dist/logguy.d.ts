import { ILogguy, LogguyLevel, LogguySpecs } from './interface';
export default class Logguy implements ILogguy {
    private _prefix;
    /**
     * log level.
     */
    private _level;
    /**
     * display time or not.
     */
    private _time;
    /**
     * save log or not.
     */
    private _isSave;
    /**
     * method for saving.
     */
    private _saveMethod;
    /**
     * time exact at milliseconds.
     */
    private _timeMilliseconds;
    constructor(specs?: LogguySpecs);
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    _validOutputLevel(currentLevel: LogguyLevel): boolean;
    _print(level: LogguyLevel, ...args: any[]): void;
    _assembleTitle(...args: any[]): string;
}
