import { WatchMetaOptions } from "./WatchReactive";
import { PROP_META_KEY, STATE_META_KEY } from "../app-data";
import { observe } from "../core/observer";
import Watcher from "../core/observer/watcher";
import { CommonReactive } from "./CommonReactive";
import { WuComponent } from "./component";

declare type PropTyp = Object | String | Boolean | Function | Array<any>;

export interface PropOptions {
    default?: any;
    attr?: string;
    type?: PropTyp;
}

export interface StateOptions {
    default?: any;
    attr?: string;
    type?: PropTyp;
}

export interface DataReactiveOptions {
    vm: WuComponent;
    propsList?: PropOptions[];
    statesList?: StateOptions[];
    watchList?: WatchMetaOptions[]
}

export type ReactiveType = 'PROPS' | 'STATE'
/**
 * 属性装饰器
 * @param options
 * @constructor
 */
export function Prop(options: PropOptions = { default: undefined }): PropertyDecorator {
    return function(target: any, attr: any) {
        defineProps(options, target, attr);
    };
}

/**
 * 定义Prop
 * @param options
 * @param target
 * @param attr
 */
export function defineProps(options: PropOptions = { default: undefined }, target: any, attr: string) {
    const value = options.default;
    const keys: PropOptions[] = Reflect.getMetadata(PROP_META_KEY, target) ?? [];
    keys.push({ default: value, type: options.type, attr });
    Reflect.defineMetadata(PROP_META_KEY, keys, target);
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
 * PROP 响应式处理
 */
export class DataReactive extends CommonReactive {
    private readonly propsList!: PropOptions[];
    private readonly statesList!: StateOptions[];
    constructor(options: DataReactiveOptions) {
        super(options?.vm);
        const { propsList = [], statesList = [] } = options || {};
        this.propsList = propsList.length? propsList: Reflect.getMetadata(PROP_META_KEY, this.vm) ?? [];
        this.statesList = statesList.length? statesList: Reflect.getMetadata(STATE_META_KEY, this.vm) ?? [];
        this.observer();
    }

    /**
     * 数据劫持更新
     * @private
     */
    private observer() {
        let $reactive: Record<string, any> = {};
        const propsList: PropOptions[] = this.propsList;
        const statesList: StateOptions[] = this.statesList;
        $reactive = propsList.reduce((pre, curr, index) => {
            pre[curr.attr] = curr.default;
            return pre;
        }, $reactive);

        $reactive = statesList.reduce((pre, curr, index) => {
            pre[curr.attr] = curr.default;
            return pre;
        }, $reactive || {});
        this.vm.$reactive = $reactive;
        const keys = Object.keys(this.vm.$reactive);
        let i = keys.length;
        while (i--) {
            const key = keys[i];
            this.proxy(this.vm, "$reactive", key);
        }
        observe(this.vm.$reactive);
        new Watcher(this.vm.$reactive, () => {
            return this.vm.render.call(this.vm, this.vm.$reactive, null);
        }, (ww, t) => {
            this.vm.update.call(this.vm, this.vm.$reactive, null);
        });
    }
}
