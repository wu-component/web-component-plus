import "reflect-metadata";
import { WatchMetaOptions } from "./WatchReactive";
import { STATE_META_KEY, COMPONENT_WATCH } from "../app-data";

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
export class StatesReactive {
    private readonly vm!: any;
    private readonly statesList!: StateOptions[];
    private readonly watchList!: WatchMetaOptions[];
    constructor(vm: any, statesList: StateOptions[] = [], watchList: WatchMetaOptions[] = []) {
        this.vm = vm;
        this.statesList = statesList.length? statesList: Reflect.getMetadata(STATE_META_KEY, this.vm) ?? [];
        this.watchList = watchList.length? watchList: Reflect.getMetadata(COMPONENT_WATCH, this.vm) ?? [];
        this.observerStates();
    }

    /**
     * 过滤 PROP 对应的 watch
     * @private
     */
    private watchCallback() {
        const functions: WatchMetaOptions[] = this.watchList;
        const keys: StateOptions[] = this.statesList;
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
    private observerStates() {
        const statesList: StateOptions[] = this.statesList;
        const statesData: Record<string, any> = {};
        this.observe(statesData);
        const watchHandlers: WatchMetaOptions[] = this.watchCallback();
        const that = this;
        for (let i = 0; i < statesList.length; i ++) {
            statesData[statesList[i].attr] = statesList[i].default;
            const key = statesList[i].attr;
            Object.defineProperty(this.vm, key, {
                get(): any {
                    return this.$states[key];
                },
                set(value: any) {
                    const watchs: WatchMetaOptions[] = watchHandlers.filter(item => item.path === key);
                    if(watchs.length) {
                        watchs.forEach(item => {
                            item.callback.call(that.vm, value, this.$states[key]);
                        });
                    }
                    this.$states[key] = value;
                }
            });
        }

    }

    /**
     * 所有 PROP 挂载对应的 $states 中
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
        this.vm.$states =  new Proxy(data,{
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
        return this.vm.$states;
    }
}
