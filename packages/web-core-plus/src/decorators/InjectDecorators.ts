import 'reflect-metadata';
import { COMPONENT_CUSTOM_INJECT } from '@/app-data';
export interface InjectOptions {
    key: string; // 需要接受的字段集合
    [key: string]: any;
}

export function Inject(options: InjectOptions): PropertyDecorator {
    return function(target: any, attr: any) {
        const keys: InjectOptions[] = Reflect.getMetadata(COMPONENT_CUSTOM_INJECT, target) ?? [];
        keys.push({ ...options, attr });
        Reflect.defineMetadata(COMPONENT_CUSTOM_INJECT, keys, target);
    };
}

export function GetInject(): PropertyDecorator {
    return function(target: any, attr: any) {
        const keys: InjectOptions[] = Reflect.getMetadata(COMPONENT_CUSTOM_INJECT, target) ?? [];
        return keys;
    };
}
