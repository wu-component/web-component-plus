import { WatchMetaOptions } from "./WatchReactive";
import { PROP_META_KEY } from "../app-data";
import { observe } from "../core/observer";
import Watcher from "../core/observer/watcher";
import { CommonReactive } from "./CommonReactive";

declare type PropTyp = Object | String | Boolean | Function | Array<any>;

export interface PropOptions {
    default?: any;
    attr?: string;
    type?: PropTyp;
}
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
 * PROP 响应式处理
 */
export class PropsReactive extends CommonReactive {
    private readonly propsList!: PropOptions[];
    constructor(vm: any, propsList: PropOptions[] = [], watchList: WatchMetaOptions[] = []) {
        super(vm);
        this.propsList = propsList.length? propsList: Reflect.getMetadata(PROP_META_KEY, this.vm) ?? [];
        this.observerProps();
    }

    /**
     * PROP 响应式处理
     * @private
     */
    private observerProps() {
        let $props: Record<string, any> = {};
        const propsList: PropOptions[] = this.propsList;
        $props = propsList.reduce((pre, curr, index) => {
            pre[curr.attr] = curr.default;
            return pre;
        }, {});
        this.vm.$props = $props;
        const keys = Object.keys(this.vm.$props);
        let i = keys.length;
        while (i--) {
            const key = keys[i];
            this.proxy(this.vm, "$props", key);
        }
        observe(this.vm.$props);
        new Watcher(this.vm.$props, () => {
            return this.vm.render.call(this.vm, this.vm.$props, null);
        }, (ww, t) => {
            this.vm.update.call(this.vm, this.vm.$props, null);
        });
    }
}
