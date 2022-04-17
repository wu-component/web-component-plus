import "reflect-metadata";
import { COMPONENT_CUSTOM_EVENT, COMPONENT_WATCH, PROP_META_KEY, STATE_META_KEY } from "../app-data";
import { PropOptions } from "./PropDecorators";
import { formatValue } from "../utils/format-type";
import { diff } from "../runtime";
import { cssToDom, hyphenate, isObject, toDotCase } from "../utils";
import { EventOptions } from "./EmitDecorators";
import { WatchMetaOptions } from "./WatchDecorators";
import { StateOptions } from "./StateDecorators";

type ComponentEnums = 'CustomWebComponent'
export interface CustomTagOptions {
    name: string;
    is?: ComponentEnums;
    css?: string;
    options?: ElementDefinitionOptions
}

/**
 * 数据响应式处理逻辑
 * @param keys
 * @param functions
 * @param customElement
 */
function injectKeys(keys: PropOptions[], functions: WatchMetaOptions[], customElement: any) {
    const onlyFunctions: WatchMetaOptions[] = [];
    for (let i = 0; i < functions.length; i ++) {
        const current = keys.find(item => item.attr === functions[i].path);
        if (!current) {
            onlyFunctions.push(functions[i]);
        }
    }
    keys.forEach((props: PropOptions) => {
        const attr = `__${props.attr}__props__`;
        Object.defineProperty(customElement.prototype, props.attr, {
            get: function() {
                if (this[attr] || typeof this[attr] === "boolean" || this[attr] === null) {
                    return this[attr];
                }
                return props.default || undefined;

            },
            set: function (val: any){
                const oldValue = isObject(this[attr]) || Array.isArray(this[attr])? JSON.parse(JSON.stringify(this[attr])): this[attr];
                this[attr] = formatValue(val, props.type, props.default);
                customElement.prototype?.update.call(this);
                const watch: WatchMetaOptions = functions.find(item => item.path === props.attr);
                if (watch) {
                    if (this[attr] !== oldValue) {
                        customElement.prototype[watch.callbackName].call(this, this[attr], oldValue);
                    }

                }
                return true;
            }
        });
    });
    injectWatch(onlyFunctions, customElement);
}

/**
 * 数据响应式处理逻辑
 * @param functions
 * @param customElement
 */
function injectWatch( functions: WatchMetaOptions[], customElement: any) {
    functions.forEach((props: WatchMetaOptions) => {
        const attr = `__${props.path}__watch__`;
        Object.defineProperty(customElement.prototype, props.path, {
            get: function() {
                return this[attr];
            },
            set: function (val: any){
                const oldValue = isObject(this[attr]) || Array.isArray(this[attr])? JSON.parse(JSON.stringify(this[attr])): this[attr];
                this[attr] = val;
                if (val !== oldValue) {
                    customElement.prototype[props.callbackName].call(this, this[attr], oldValue);
                }
                return true;
            }
        });
    });
}

/**
 * 事件响应逻辑处理
 * @param functions
 * @param customElement
 */
function injectEmit(functions: EventOptions[], customElement: any) {
    functions.forEach((event: EventOptions) => {
        Object.defineProperty(customElement.prototype, event.methodName, {
            get: function() {
                return function(...args:any) {
                    const result: any = event.methodFun.call(this, args);
                    if (result) {
                        const evtName = (event.eventName) ? event.eventName: toDotCase(event.methodName);
                        customElement.prototype._dispatchEvent.call(this, evtName, result);
                    }
                };
            }
        });
    });
}


/**
 * 数据响应式处理逻辑
 * @param stateList
 * @param customElement
 */
function injectState( stateList: StateOptions[], customElement: any) {
    stateList.forEach((props: StateOptions) => {
    });
}
/**
 * 组件装饰器
 * @param options
 * @constructor
 */
export function Component(options: CustomTagOptions): ClassDecorator {
    return (target: any) => {
        const keys: PropOptions[] = Reflect.getMetadata(PROP_META_KEY, target.prototype) ?? [];
        const functions: EventOptions[] = Reflect.getMetadata(COMPONENT_CUSTOM_EVENT, target.prototype) ?? [];
        const watchs: WatchMetaOptions[] = Reflect.getMetadata(COMPONENT_WATCH, target.prototype) ?? [];
        const statesList: StateOptions[] = Reflect.getMetadata(STATE_META_KEY, target.prototype) ?? [];
        const keysList = keys.map(item => item.attr);
        // 数据处理成响应式
        const customElement: any = class extends (target as { new (): any }) {
            public _shadowRootDom: any = null;
            public rootNode = null;
            public isInstalled = false;
            public willUpdate = false;
            public _customStyleContent = '';
            public props = {};
            public prevProps = {};
            public _customStyleElement = null;
            public _shadowRoot = null;
            public store = {};
            public __keyList__ = keys;

            constructor() {
                super();
            }
            static is = 'CustomWebComponent';

            static get observedAttributes() {
                return [];
            }

            /**
             * 属性移除
             * @param key
             */
            public removeAttribute(key: string): void {
                super.removeAttribute(key);
                this.isInstalled && this.update();
            }

            /**
             * 设置属性
             * @param key
             * @param val
             */
            public setAttribute(key: string, val: any): void {
                if (val && typeof val === 'object') {
                    super.setAttribute(key, JSON.stringify(val));
                } else {
                    super.setAttribute(key, val);
                }
                if (this.isInstalled) {
                    this[key] = val;
                }
            }

            /**
             * 属性变化
             */
            public attributeChangedCallback(name: string, oldValue: any, newValue: any) {
                super.attributeChangedCallback?.(name, oldValue, newValue);
                this.update([], false);
            }

            /**
             * 组件更新
             * @param ignoreAttrs
             * @param updateSelf
             */
            public update(ignoreAttrs?: string[], updateSelf?: boolean) {
                if (!this.isInstalled || this.willUpdate) {
                    return;
                }
                if (!this.preBeforeUpdate()) {
                    return;
                }
                this.willUpdate = true;
                // this.attrsToProps();
                this.beforeUpdate();
                this.beforeRender();
                if (this._customStyleContent != options.css) {
                    this._customStyleContent = options.css;
                    // this.customStyleElement.textContent = this.customStyleContent;
                }
                // 属性变化，重新执行render 渲染， 走diff，生成新的dom
                const rendered = this.render(this.props, this.store);
                this.rendered();
                this.rootNode = diff(
                    this.rootNode,
                    rendered,
                    this?.shadowRoot || this?._shadowRootDom || this,
                    this,
                    updateSelf
                );
                this.willUpdate = false;
                this.updated();
            }

            /**
             * 初始化影子dom
             * @private
             */
            public initShadowRoot() {
                let shadowRoot: ShadowRoot;
                if ((this.constructor as any).isLightDom) {
                    shadowRoot = this as unknown as ShadowRoot;
                } else {
                    shadowRoot = this.shadowRoot || this.attachShadow({ mode: 'open' });
                    let fc;
                    while ((fc = shadowRoot.firstChild)) {
                        shadowRoot.removeChild(fc);
                    }
                }
                if (options.css) {
                    this._customStyleElement = cssToDom(options.css);
                    this._customStyleContent = options.css;
                    shadowRoot.appendChild(this._customStyleElement);
                }
                return shadowRoot;
            }

            /***
             * 挂载自定义组件
             */
            public connectedCallback() {
                const shadowRoot: ShadowRoot = this.initShadowRoot();
                this.attrsToProps();
                this.beforeInstall();
                this.install();
                this.afterInstall();
                this.beforeRender();
                const rendered = this.render();
                this.rootNode = diff(null, rendered, null, this);
                if (Array.isArray(this.rootNode)) {
                    this.rootNode.forEach(item => shadowRoot.appendChild(item));
                } else {
                    this.rootNode && shadowRoot.appendChild(this.rootNode);
                }
                this._shadowRootDom = shadowRoot;
                this._shadowRoot = shadowRoot;
                this.isInstalled = true;
                this.rendered();
                this.connected(shadowRoot);
            }

            /**
             * 组件销毁
             */
            public disconnectedCallback() {
                this.disConnected();
            }

            /**
             * 组件挂载
             */
            public connected(shadowRoot: ShadowRoot) {
                super.connected?.(shadowRoot);
            }

            /**
             * 组件卸载
             */
            public disConnected() {
                super.disConnected?.();
            }

            /**
             * 组件更新前检查
             */
            private preBeforeUpdate(): boolean {
                if (super.preBeforeUpdate) {
                    return super.preBeforeUpdate?.();
                }
                return true;
            }

            /**
             * 更新前
             */
            public beforeUpdate() {
                super.beforeUpdate?.();
            }

            /**
             * 更新完成
             */
            public updated() {
                super.updated?.();
            }

            /**
             * 强制刷新
             */
            public forceUpdate() {
                this.update([], true);
            }

            /**
             * 更新属性
             * @param obj
             */
            public updateProps(obj: any) {
                Object.keys(obj).forEach((key: string) => {
                    // @ts-ignore
                    this.props[key] = obj[key];
                    if (this.prevProps) {
                        // @ts-ignore
                        this.prevProps[key] = obj[key];
                    }
                });
                this.forceUpdate();
            }

            /**
             * 屬性值初始化
             * @param ignoreAttrs
             */
            public attrsToProps(ignoreAttrs?: any[]) {
                const ele: any = this;
                if (!keysList) return;
                keys.forEach((key: PropOptions) => {
                    const val = ele.getAttribute(hyphenate(key.attr));
                    this[key.attr] = formatValue(val, key.type, key.default);
                });
            }

            /**
             * 事件
             * @param evtName
             * @param result
             */
            public _dispatchEvent(evtName: string, result: any) {
                if (this?.shadowRoot) {
                    this?.shadowRoot.dispatchEvent(new CustomEvent(evtName, {
                        detail: result || null,
                        bubbles: true,  // 设置为冒泡
                        composed: true  // 设置为可穿透组件
                    }));
                    return;
                }
                if (this?._shadowRootDom) {
                    this?._shadowRootDom.dispatchEvent(new CustomEvent(evtName, {
                        detail: result || null,
                        bubbles: true,  // 设置为冒泡
                        composed: true  // 设置为可穿透组件
                    }));
                    return;
                }
                this.dispatchEvent(new CustomEvent(evtName, {
                    detail: result || null,
                    bubbles: true,  // 设置为冒泡
                    composed: true  // 设置为可穿透组件
                }));
            }


            public beforeInstall() {
                super.beforeInstall?.();
            }

            public install() {
                super.install?.();
            }

            public afterInstall() {
                super.afterInstall?.();
            }

            /**
             * 渲染前
             */
            public beforeRender() {
                super.beforeRender?.();
            }

            /**
             * 渲染结束
             */
            public rendered() {
                super.rendered?.();
            }

        };
        Reflect.defineMetadata(COMPONENT_CUSTOM_EVENT, target, customElement);
        // 数据响应式处理
        injectKeys(keys, watchs, customElement);
        // 事件代理处理
        injectEmit(functions, customElement);
        injectState(statesList, customElement);
        if (!customElements.get(options.name)) {
            customElements.define(options.name, customElement, options.options || {});
        }
        return customElement;
    };
}
