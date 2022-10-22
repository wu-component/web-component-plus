import Dep from './dep';
export default class Observer {
    value: any;
    dep: Dep;
    /**
     * 观察者构造器
     * @param value
     */
    constructor(value: any);
    walk(data: object | any[]): void;
}
/**
 * 处理响应式
 * @param { Object | Array } data
 */
export declare function observe(data: any): Observer | void;
/**
 * 重写 setter / getter
 * @param {*} data
 * @param {*} key
 * @param {*} val
 */
export declare function defineReactive(data: any, key: string | number, val: any): void;
