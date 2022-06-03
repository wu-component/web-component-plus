import 'reflect-metadata';
import { COMPONENT_CUSTOM_PROVIDE } from '../app-data';
export interface ProvideOptions {
    [key: string]: any;
}

export interface ProvideConfig {
    key: string; // 需要接受的字段集合
    functionName: string; // 需要接受的字段集合
    [key: string]: any;
}

/**
 * 向子组件注入数据
 * @param key
 * @param config
 * @constructor
 */
export function Provide(key: string, config: ProvideOptions = {}): any {
    return function(target: any, methodName: string) {
        const functions: ProvideConfig[] = Reflect.getMetadata(COMPONENT_CUSTOM_PROVIDE, target) ?? [];
        functions.push({ key: key, functionName: methodName, config });
        Reflect.defineMetadata(COMPONENT_CUSTOM_PROVIDE, functions, target);
    };
}
