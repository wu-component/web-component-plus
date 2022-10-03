import { COMPONENT_WATCH } from "../app-data";
import { CommonReactive } from "./CommonReactive";
import Watcher from "../core/observer/watcher";
interface WatchOptions {
    deep?: boolean;
}
export interface WatchMetaOptions {
    path: string;
    deep?: boolean;
    callbackName?: any;
    callback?: any;
    options?: WatchOptions;
}

export interface WatchOptType {
    handler?: () => Function
    immediate?: boolean
    deep?: boolean
}

/**
 * Watch 装饰器
 * @param path
 * @param options
 * @constructor
 */
export function Watch(path: string, options?: WatchMetaOptions): any {
    return function(target: any, methodName: string, desc: any) {
        const functions: WatchMetaOptions[] = Reflect.getMetadata(COMPONENT_WATCH, target) ?? [];
        const methodFun = desc.value;
        functions.push({
            callback: methodFun,
            options: options || {},
            callbackName: methodName,
            path,
        });
        Reflect.defineMetadata(COMPONENT_WATCH, functions, target);
    };
}


/**
 * PROP 响应式处理
 */
export class WatchReactive extends CommonReactive {
    private readonly watchList!: WatchMetaOptions[];
    constructor(vm: any, watchList: WatchMetaOptions[] = []) {
        super(vm);
        this.watchList = watchList.length? watchList: Reflect.getMetadata(COMPONENT_WATCH, this.vm) ?? [];
        this.observer();
    }

    /**
     * PROP 响应式处理
     * @private
     */
    private observer() {
        let $watch: Record<string, any> = {};
        const watchList: WatchMetaOptions[] = this.watchList;
        $watch = watchList.reduce((pre, curr, index) => {
            this.$watch(curr.path, this.vm[curr.callbackName], curr);
            pre[curr.path] = curr;
            return pre;
        }, {});
        this.vm.$watch = $watch;
    }

    /**
     * 添加一个观察者 create user watcher
     * @param expr 表达式
     * @param handler 回调函数
     * @param watchOpt 配置参数
     * @return 卸载当前观察者的函数 (暂未返回)
     */
    protected $watch (expr: string | Function, handler: Function | WatchOptType, watchOpt: WatchOptType = {}): Function {
        if (typeof handler === 'object') {
            watchOpt = handler;
            handler = watchOpt.handler!;
        }
        const watcher = new Watcher(this.vm.$reactive, expr, handler, watchOpt);
        if (watchOpt.immediate) {
            handler.call(this.vm, watcher.value);
        }
        return function unWatchFn () {};
    }
}
