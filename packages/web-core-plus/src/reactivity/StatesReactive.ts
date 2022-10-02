import { STATE_META_KEY } from "../app-data";
import { CommonReactive } from "./CommonReactive";
import { observe } from "../core/observer";
import Watcher from "../core/observer/watcher";

declare type PropTyp = Object | String | Boolean | Function | Array<any>;

export interface StateOptions {
    default?: any;
    attr?: string;
    type?: PropTyp;
}
/**
 * 属性装饰器
 * @param options
 * @constructor
 */
export function State(options: StateOptions = { default: undefined }): PropertyDecorator {
    return function(target: any, attr: any) {
        defineStates(options, target, attr);
    };
}

/**
 * 定义Prop
 * @param options
 * @param target
 * @param attr
 */
export function defineStates(options: StateOptions = { default: undefined }, target: any, attr: string) {
    const value = options.default;
    const keys: StateOptions[] = Reflect.getMetadata(STATE_META_KEY, target) ?? [];
    keys.push({ default: value, type: options.type, attr });
    Reflect.defineMetadata(STATE_META_KEY, keys, target);
}

/**
/**
 * PROP 响应式处理
 */
export class StatesReactive extends CommonReactive {
    private readonly statesList!: StateOptions[];
    constructor(vm: any, statesList: StateOptions[] = []) {
        super(vm);
        this.statesList = statesList.length? statesList: Reflect.getMetadata(STATE_META_KEY, this.vm) ?? [];
        this.observerStates();
    }

    /**
     * PROP 响应式处理
     * @private
     */
    private observerStates() {
        let $states: Record<string, any> = {};
        const propsList: StateOptions[] = this.statesList;
        $states = propsList.reduce((pre, curr, index) => {
            pre[curr.attr] = curr.default;
            return pre;
        }, {});
        this.vm.$states = $states;
        const keys = Object.keys(this.vm.$states);
        let i = keys.length;
        while (i--) {
            const key = keys[i];
            this.proxy(this.vm, "$states", key);
        }
        observe(this.vm.$states);
        new Watcher(this.vm.$states, () => {
            return this.vm.render.call(this.vm, this.vm.$states, null);
        }, (ww, t) => {
            this.vm.update.call(this.vm, this.vm.$states, null);
        });

    }

}
