import { WuComponent } from "@/core/base/WuComponent";
import {
    CustomTagOptions,
    InjectOptions,
    PropertyDeclaration,
    ProvideConfig,
    ProvideOptions, StateOptions,
    WatchOptions
} from "@/type";
import {
    Descriptors,
    ElementProperties,
    InjectDescriptors,
    ProvideDescriptors,
    WatchDescriptors
} from "@/core/base/constant";
import { defaultConverter, toDotCase } from "@/share";

const defaultPropertyDeclaration: PropertyDeclaration = {
    observed: true,
    type: String,
    converter: defaultConverter,
};
/**
 * 定义组件
 * @param options
 * @param ctor
 */
export function defineComponent(ctor: typeof WuComponent, options: CustomTagOptions) {
    // 默认挂载dom
    if (options.isMountDom === undefined) {
        options.isMountDom = true;
    }
    // @ts-ignore
    ctor.$options = options;

    class CustomElement extends ctor {
        static get observedAttributes() {
            const attributes: string[] = [ 'css' ];
            ElementProperties.forEach((elOption, constructor, elName) => {
                if (constructor === ctor && elOption.observed) {
                    attributes.push(elName);
                }
            });
            return attributes;
        }

        static isBooleanProperty(propertyName: string) {
            let isBoolean = false;
            // @ts-ignore
            ElementProperties.forEach((elOption, constructor, elName) => {
                if (constructor === ctor && elOption.type === Boolean && propertyName === elName) {
                    isBoolean = true;
                    return isBoolean;
                }
            });
            return isBoolean;
        }

        constructor() {
            super();

            let style = '';
            if (typeof options.css === 'string') {
                style = options.css;
            }
            if (Object.prototype.toString.call(options.css) === '[object Array]') {
                style = options.css[0][1];
            }

            if (style) {
                this.getStyles = () => style;
            }
            if(options.is !== 'LightDom') {

            }
            const shadowRoot = options.is !== 'LightDom'? (this.shadowRoot || this.attachShadow({ mode: "open" })): this;

            if (shadowRoot) {
                if (typeof this.getStyles === "function") {
                    const styleEl = document.createElement("style");
                    styleEl.innerHTML = this.getStyles();
                    shadowRoot.append(styleEl);
                }
            }

            /**
             * 重写类的属性描述符，并重写属性初始值。
             * 注：由于子类的属性初始化晚于当前基类的构造函数，同名属性会导致属性描述符被覆盖，所以必须放在基类构造函数之后执行
             */
            Descriptors.forEach((descriptorCreator, constructor, propertyName) => {
                if (constructor === ctor) {
                    Object.defineProperty(
                        this,
                        propertyName,
                        descriptorCreator((this as never)[propertyName])
                    );
                }
            });
            this.$watchMap = WatchDescriptors.getProperty(ctor);
            /**
             * inject 处理
             */
            const injectsList = [];
            (InjectDescriptors.getProperty(ctor) || new Map())?.forEach((value, key, map) => {
                injectsList.push(value);
            });
            this.$injectsList = injectsList;
            /**
             * provide 处理
             */
            const providesList = [];
            (ProvideDescriptors.getProperty(ctor) || new Map())?.forEach((value, key, map) => {
                providesList.push(value);
            });
            this.$providesMap = providesList.reduce((previousValue: Record<string, ProvideConfig>, currentValue: ProvideConfig) => {
                previousValue[currentValue.key] = currentValue;
                return previousValue;
            }, {} as Record<string, ProvideConfig> );
        }
    }
    if (!customElements.get(options.name)) {
        customElements.define(options.name, CustomElement, options.options || {});
    }

}

/**
 * 属性装饰器
 * @param options
 * @constructor
 */
export const Prop = (options: PropertyDeclaration = {}) => {
    return (target: unknown, name: string) => {
        const newOpt = Object.assign({}, defaultPropertyDeclaration, options);
        target[name] = newOpt.converter(newOpt.default, newOpt.type);
        return (target.constructor as typeof WuComponent).createProperty(
            name,
            newOpt
        );
    };
};

/**
 * 属性装饰器
 * @param options
 * @constructor
 */
export const State = (options?: StateOptions) => {
    return (target: unknown, name: string) => {
        return (target.constructor as typeof WuComponent).createState(name, options);
    };
};

/**
 * 像外抛出自定义事件
 * @param event
 * @constructor
 */
export const Emit = (event?: string) => {
    return function(target: any, methodName: string, descriptor: any) {
        const origin = descriptor.value;
        return {
            ...descriptor,
            value: function (...arg) {
                const result = origin.call(this, ...arg);
                const evtName = event ?event : toDotCase(methodName);
                this.customDispatchEvent.call(this, evtName, result);
            },
        };
    };
};

/**
 * Watch 装饰器
 * @param path
 * @param options
 * @constructor
 */
export function Watch(path: string, options?: WatchOptions): any {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        (target.constructor as typeof WuComponent).createWatch(path, {
            ...options,
            path: options?.path || path,
            callbackName: key,
            callback: descriptor,
            options
        });
    };
}

/**
 * 向子组件注入数据
 * @param key
 * @param config
 * @constructor
 */
export function Provide(key: string, config: ProvideOptions = {}): any {
    return function(target: any, methodName: string) {
        (target.constructor as typeof WuComponent).creatProvide(key, {
            key: key,
            functionName: methodName,
            config
        });
    };
}



/**
 * 组件接受父组件注入的数据
 * @param key
 * @param options
 * @constructor
 */
export function Inject(key: string, options: InjectOptions = {}): PropertyDecorator {
    return function(target: any, attr: any) {
        (target.constructor as typeof WuComponent).createInject(key, {
            ...options,
            attr,
            key
        });
    };
}

/**
 * 组件定义
 * @param options
 * @constructor
 */
export function Component(options: CustomTagOptions) {
    return function (target: typeof WuComponent) {
        defineComponent(target, options);
    };
}

