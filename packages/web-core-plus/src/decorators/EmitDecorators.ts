import 'reflect-metadata';
import { toDotCase } from '../utils';
import { COMPONENT_CUSTOM_EVENT } from '../app-data';

export interface EventOptions {
    methodName?: any;
    methodFun?: any;
    eventName?: string;
}

export function Emit(event?: string): any {
    return function(target: any, methodName: string, desc: any) {
        const functions: EventOptions[] = Reflect.getMetadata(COMPONENT_CUSTOM_EVENT, target) ?? [];
        const methodFun = desc.value;
        const eventName = event ? event : toDotCase(methodName);
        functions.push({ methodName: methodName, methodFun, eventName });
        Reflect.defineMetadata(COMPONENT_CUSTOM_EVENT, functions, target);
    };
}
