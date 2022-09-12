import Logguy from '../logguy';
interface IOptions {
    inputs?: boolean;
    outputs?: boolean;
    exception?: boolean;
    outputsNullSkip?: boolean;
}
export declare function logClassEnhance(log: Logguy): (options?: IOptions) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export default logClassEnhance;
