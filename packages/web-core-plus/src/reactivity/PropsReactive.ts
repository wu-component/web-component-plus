import "reflect-metadata";
import { WatchMetaOptions } from "./WatchReactive";
import { PROP_META_KEY, COMPONENT_WATCH } from "../app-data";

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
export class PropsReactive {
    private readonly vm!: any;
    private readonly propsList!: PropOptions[];
    private readonly watchList!: WatchMetaOptions[];
    constructor(vm: any, propsList: PropOptions[] = [], watchList: WatchMetaOptions[] = []) {
        this.vm = vm;
        this.propsList = propsList.length? propsList: Reflect.getMetadata(PROP_META_KEY, this.vm) ?? [];
        this.watchList = watchList.length? watchList: Reflect.getMetadata(COMPONENT_WATCH, this.vm) ?? [];
        this.observerProps();
    }

    /**
     * 过滤 PROP 对应的 watch
     * @private
     */
    private watchCallback() {
        const functions: WatchMetaOptions[] = this.watchList;
        const keys: PropOptions[] = this.propsList;
        const onlyFunctions: WatchMetaOptions[] = [];
        for (let i = 0; i < functions.length; i++) {
            const current = keys.find(item => item.attr === functions[i].path);
            if (current) {
                onlyFunctions.push(functions[i]);
            }
        }
        return onlyFunctions;
    }

    /**
     * PROP 响应式处理
     * @private
     */
    private observerProps() {
        const propsList: PropOptions[] = this.propsList;
        const propsData: Record<string, any> = {};
        this.observe(propsData);
        const watchHandlers: WatchMetaOptions[] = this.watchCallback();
        const that = this;
        for (let i = 0; i < propsList.length; i ++) {
            propsData[propsList[i].attr] = propsList[i].default;
            const key = propsList[i].attr;
            Object.defineProperty(this.vm, key, {
                get(): any {
                    return this.$props[key];
                },
                set(value: any) {
                    const watchs: WatchMetaOptions[] = watchHandlers.filter(item => item.path === key);
                    if(watchs.length) {
                        watchs.forEach(item => {
                            item.callback.call(that.vm, value, this.$props[key]);
                        });
                    }
                    this.$props[key] = value;
                }
            });
        }

    }

    /**
     * 所有 PROP 挂载对应的 $props 中
     * @param data
     * @private
     */
    private observe(data: any={}): any { //递归监听对象所有属性，属性的属性。。。。
        if(typeof data !== 'object'){
            return data;
        }
        Object.keys(data).forEach(key=>{
            data[key] = this.observe(data[key]);
        });
        return this.defineReactive(data);
    }

    /**
     * 多层对象递归处理成响应式
     * @param data
     * @private
     */
    private defineReactive(data:any = {}) {
        const that = this;
        this.vm.$props =  new Proxy(data,{
            get(target,key){
                return Reflect.get(target,key);
            },
            set(target,key,value){
                if(target[key] === value){
                    return Reflect.set(target, key, value);
                }
                const res = Reflect.set(target, key, value);
                that.vm.update.call(that.vm, res);
                return res;
            }
        });
        return this.vm.$props;
    }
}
