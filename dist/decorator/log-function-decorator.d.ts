import Logguy from '../logguy';
interface IOptions {
    inputs?: boolean;
    outputs?: boolean;
    exception?: boolean;
    outputsNullSkip?: boolean;
}
export declare function logFunctionEnhance(logger: Logguy, options?: IOptions): (fn: Function) => (...args: any[]) => Function;
export default logFunctionEnhance;
