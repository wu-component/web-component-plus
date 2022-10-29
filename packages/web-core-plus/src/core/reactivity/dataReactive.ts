import { EventOptions, PropOptions, StateOptions, WatchOptType } from "@/type";
import { COMPONENT_CUSTOM_EVENT, COMPONENT_WATCH, PROP_META_KEY, STATE_META_KEY } from "@/app-data";
// import { observe } from "@/core";
import Watcher from "@/core/observer/watcher";
import { toDotCase } from "@/share";

export function proxy(target, sourceKey, key) {
    Object.defineProperty(target, key, {
        get() {
            return this[sourceKey][key];
        },
        set(val) {
            this[sourceKey][key] = val;
            this["props"][key] = val;
            this.update.call(this, this.$reactive, null);
        }
    });
}

/**
 * 数据响应式操操作
 */
export function dataReactive(){
    let $reactive: Record<string, any> = {};
    const propsList: PropOptions[] = this.geMateList(PROP_META_KEY);
    const statesList: StateOptions[] = this.geMateList(STATE_META_KEY);
    $reactive = propsList.reduce((pre, curr, index) => {
        pre[curr.attr] = curr.default;
        return pre;
    }, $reactive);
    $reactive = statesList.reduce((pre, curr, index) => {
        pre[curr.attr] = curr.default;
        return pre;
    }, $reactive || {});
    if (!this.$reactive) {
        this.$reactive = {};
    }
    this.$reactive = { ...this.$reactive, ...$reactive };
    const keys = Object.keys(this.$reactive);
    let i = keys.length;
    while (i--) {
        const key = keys[i];
        proxy(this, "$reactive", key);
    }
    /*observe(this.$reactive);
    new Watcher(this.$reactive, () => {
        return this.render.call(this, this.$reactive, null);
    }, (ww, t) => {
        this.update.call(this, this.$reactive, null);
    });*/
};

/**
 * 事件处理
 */
export function emitReactive() {
    const emitList = this.geMateList(COMPONENT_CUSTOM_EVENT) ?? [];
    const that = this;
    emitList.forEach((event: EventOptions) => {
        Object.defineProperty(this, event.methodName, {
            get: function() {
                return function(...args: any) {
                    const result: any = event.methodFun.call(that, ...args);
                    const evtName = event.eventName ? event.eventName : toDotCase(event.methodName);
                    that.customDispatchEvent.call(that, evtName, result);
                };
            },
        });
    });
}

export function $watch (expr: string | Function, handler: Function | WatchOptType, watchOpt: WatchOptType = {}, that): Function {
    if (typeof handler === 'object') {
        watchOpt = handler;
        handler = watchOpt.handler!;
    }
    const watcher = new Watcher(that.$reactive, expr, handler, watchOpt);
    if (watchOpt.immediate) {
        handler.call(that, watcher.value);
    }
    return function unWatchFn () {};
}
/**
 * watch 处理
 */
export function watchReactive() {
    const watchList = this.geMateList(COMPONENT_WATCH) ?? [];
    const that = this;
    let $w: Record<string, any> = {};
    $w = watchList.reduce((pre, curr) => {
        $watch(curr.path, (...args) => {
            that[curr.callbackName].call(that, ...args);
        }, curr, that);
        pre[curr.path] = curr;
        return pre;
    }, {});
    that.$watch = $w;
}

