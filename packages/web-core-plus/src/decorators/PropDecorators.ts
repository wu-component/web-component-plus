import 'reflect-metadata';
import { PropTyp } from '../declarations';
import { PROP_META_KEY } from '../app-data';

export interface PropOptions {
    default?: any;
    attr?: string;
    type?: PropTyp;
}

/**
 * 属性装饰器
 * @param options
 * @constructor
 */
export function Prop(options: PropOptions = { default: undefined }): PropertyDecorator {
    return function(target: any, attr: any) {
        const value = options.default;
        const keys: PropOptions[] = Reflect.getMetadata(PROP_META_KEY, target) ?? [];
        keys.push({ default: value, type: options.type, attr });
        Reflect.defineMetadata(PROP_META_KEY, keys, target);
    };
}
