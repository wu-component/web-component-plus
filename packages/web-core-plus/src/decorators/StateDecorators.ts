import 'reflect-metadata';
import { PropTyp } from '../declarations';
import { STATE_META_KEY } from  '../app-data';

export interface StateOptions {
    default?: any;
    attr?: string;
    type?: PropTyp;
}

/**
 * 属性装饰器
 * @param options
 * @constructor
 */
export function State(options: StateOptions = { default: undefined }): PropertyDecorator {
    return function(target: any, attr: any) {
        const value = options.default || options.default || undefined;
        const keys: StateOptions[] = Reflect.getMetadata(STATE_META_KEY, target) ?? [];
        keys.push({ default: value, type: options.type, attr });
        Reflect.defineMetadata(STATE_META_KEY, keys, target);
    };
}
