import { pathToArr } from './util';

export const extension:any = {};

export function extend(name: string, handler: any) {
    extension['o-' + name] = handler;
}

export function set(origin: any, path: any, value: any) {
    const arr = pathToArr(path);
    let current = origin;
    for (let i = 0, len = arr.length; i < len; i++) {
        if (i === len - 1) {
            current[arr[i]] = value;
        } else {
            current = current[arr[i]];
        }
    }
}

export function get(origin: any, path: string) {
    const arr = pathToArr(path);
    let current = origin;
    for (let i = 0, len = arr.length; i < len; i++) {
        current = current[arr[i]];
    }

    return current;
}

function eventProxy(e: any) {
    // @ts-ignore
    return this._listeners[e.type](e);
}

export function bind(el: any, type: string, handler:any) {
    el._listeners = el._listeners || {};
    el._listeners[type] = handler;
    el.addEventListener(type, eventProxy);
}

export function unbind(el: HTMLElement, type: string) {
    el.removeEventListener(type, eventProxy);
}
