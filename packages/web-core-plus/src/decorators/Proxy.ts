/**
 * 数据用作响应式
 * @param target
 */
import { isObject } from "../utils";
const toProxy = new WeakMap(); // 用来保存代理后的对象
export function reactive(target: any, callback: any) {
    if(!isObject(target)) {
        return target;
    }
    if(toProxy.get(target)) { // 判断对象是否已经被代理了
        return toProxy.get(target);
    }
    const handler = {
        get(target: any, key: string, receiver: any) {
            const proxyTarget =  Reflect.get(target, key, receiver);
            if(isObject(target[key])) {
                return reactive(proxyTarget, callback);
            }

            return proxyTarget;
        },
        set(target: any, key: string, value: any, receiver:any) {
            if(!target.hasOwnProperty(key)) {
                if (typeof callback === 'function') {
                    callback.call(this);
                }
            }
            return Reflect.set(target, key, value, receiver); // 相当于 target[key] = value
        }
    };
    let observed = new Proxy(target, handler);
    toProxy.set(target, observed); // 保存已经代理了的对象
    return observed;
}
