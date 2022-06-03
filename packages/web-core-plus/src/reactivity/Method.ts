import 'reflect-metadata';
import { COMPONENT_CUSTOM_METHOD } from '../app-data';
export interface MethodOptions {
    methodName?: any;
    methodFun?: any;
    eventName?: string;
}

export function Method(): any {
    return function(target: any, methodName: string, desc: any) {
        const functions: MethodOptions[] = Reflect.getMetadata(COMPONENT_CUSTOM_METHOD, target) ?? [];
        const methodFun = desc.value;
        functions.push({ methodName: methodName, methodFun });
        Reflect.defineMetadata(COMPONENT_CUSTOM_METHOD, functions, target);
    };
}
