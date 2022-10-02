export interface WatchOptType {
    handler?: () => Function;
    immediate?: boolean;
    deep?: boolean;
}
export default class Watcher {
    id: number;
    $vm: any;
    expr: string | Function;
    cb: Function;
    deep: boolean;
    getter: Function;
    value: any;
    /**
     * 观察者构造器
     * @param {*} $vm
     * @param {*} expr
     * @param {*} cb
     * @param options
     */
    constructor($vm: any, expr: string | Function, cb: Function, options?: WatchOptType);
    /**
     * 根据表达式获取新值
     */
    get(): any;
    /**
     * 触发 watcher 更新
     */
    update(): void;
}
