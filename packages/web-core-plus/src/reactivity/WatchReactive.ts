import "reflect-metadata";
import { COMPONENT_WATCH } from "../app-data";
interface WatchOptions {
    deep?: boolean;
}
export interface WatchMetaOptions {
    path: string;
    deep?: boolean;
    callbackName?: any;
    callback?: any;
    options?: WatchOptions;
}

/**
 * Watch 装饰器
 * @param path
 * @param options
 * @constructor
 */
export function Watch(path: string, options?: WatchMetaOptions): any {
    return function(target: any, methodName: string, desc: any) {
        const functions: WatchMetaOptions[] = Reflect.getMetadata(COMPONENT_WATCH, target) ?? [];
        const methodFun = desc.value;
        functions.push({
            callback: methodFun,
            options: options || {},
            callbackName: methodName,
            path,
        });
        Reflect.defineMetadata(COMPONENT_WATCH, functions, target);
    };
}
