import { EventOptions, ReactiveDataOption } from "@/type";
import { COMPONENT_CUSTOM_EVENT } from "@/app-data";
import { toDotCase } from "@/share";

export function proxy(target, sourceKey, key) {
    Object.defineProperty(target, key, {
        get() {
            return this[sourceKey][key];
        },
        set(val) {
            const old = this[sourceKey][key];
            this[sourceKey][key] = val;
            this["props"][key] = val;
            this.update.call(this, this.$reactive, null);
            this.watchChangeCallback.call(this, key, val, old);
        }
    });
}

/**
 * 数据响应式操操作
 */
export function dataReactive(list: ReactiveDataOption[]){
    let $reactive: Record<string, any> = {};
    $reactive = list.reduce((pre, curr, index) => {
        pre[curr.attr] = curr.default;
        return pre;
    }, $reactive);
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
}

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


