export interface IIgnoreLabels {
    [key: string]: any[];
}
export declare enum ILogLevel {
    info = "info",
    warning = "waring",
    error = "error"
}
export interface LogObj {
    [key: string]: any;
}
interface LoggerSpecsProps {
    prefix?: string;
    showTime?: boolean;
    ignoreLabels?: IIgnoreLabels;
    level?: ILogLevel;
    /**
     * key of the data to show.
     * eg.
     * const data = { method: 'test', data: { name: 'Bob', sex: 'male' } };
     * so we can config the keys as:
     *      const configLabelKeys = [
     *        'method',
     *        'data.name',
     *      ];
     * then, we will get two labels and print :
     *    [method: test] [data.name: Bob]
     */
    configLabelKeys?: string[];
    /**
     * is exact at milliseconds.
     */
    exactMilliseconds?: boolean;
}
/**
 * function includes:
 * 1. show current time.
 * 2. set log level, filter print log by level.
 * 3. filter by ignore label.
 * 4. config by key.
 * 5. colorful.
 * 6. report and report by level.
 */
interface ILogger {
    collapsed(logObj: LogObj, prefix?: string): void;
    collapsed(labels: LogObj, logObj: LogObj, prefix?: string): void;
    info(data: LogObj): void;
    info(data: LogObj, stringify: boolean): void;
}
export declare class Logger implements ILogger {
    private _prefix;
    private _showTime;
    private _ignoreLabels;
    private _level;
    private _configLabelKeys;
    private _exactMilliseconds;
    constructor(specs?: LoggerSpecsProps);
    getLabels(data: LogObj): LogObj;
    collapsed(...args: any[]): void;
    info(data: {
        [key: string]: any;
    }, stringify?: boolean): void;
    strout(content: string): void;
    error(content: string): void;
    _getValueFromNestKey(key: string, data: any): any;
    _checkIfIgnore(labels: {
        [key: string]: any;
    }): boolean;
    _lableToArrayStr(logObj: {
        [key: string]: any;
    }): string[];
    _colorfulItems(items: string[]): [string, string];
    _print(logObj: {
        [key: string]: any;
    }): void;
    _printStr(content: string): void;
    end(): void;
}
export declare const getCurrentTime: (isExactMilliseconds?: boolean) => string;
export default Logger;
