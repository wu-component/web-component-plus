/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

const Metadata = new WeakMap();
function decorateProperty(decorators, target, propertyKey, descriptor) {
    decorators.reverse().forEach((decorator) => {
        descriptor = decorator(target, propertyKey, descriptor) || descriptor;
    });
    return descriptor;
}
function decorateConstructor(decorators, target) {
    decorators.reverse().forEach((decorator) => {
        const decorated = decorator(target);
        if (decorated) {
            target = decorated;
        }
    });
    return target;
}
function decorate(decorators, target, propertyKey, attributes) {
    if (!Array.isArray(decorators) || decorators.length === 0) {
        throw new TypeError();
    }
    if (propertyKey !== undefined) {
        return decorateProperty(decorators, target, propertyKey, attributes);
    }
    if (typeof target === 'function') {
        return decorateConstructor(decorators, target);
    }
    return;
}
function getMetadataMap(target, propertyKey) {
    return Metadata.get(target) && Metadata.get(target).get(propertyKey);
}
function ordinaryGetOwnMetadata(metadataKey, target, propertyKey) {
    if (target === undefined) {
        throw new TypeError();
    }
    const metadataMap = getMetadataMap(target, propertyKey);
    return metadataMap && metadataMap.get(metadataKey);
}
function createMetadataMap(target, propertyKey) {
    const targetMetadata = Metadata.get(target) ||
        new Map();
    Metadata.set(target, targetMetadata);
    const metadataMap = targetMetadata.get(propertyKey) || new Map();
    targetMetadata.set(propertyKey, metadataMap);
    return metadataMap;
}
function ordinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey) {
    if (propertyKey && !['string', 'symbol'].includes(typeof propertyKey)) {
        throw new TypeError();
    }
    (getMetadataMap(target, propertyKey) ||
        createMetadataMap(target, propertyKey)).set(metadataKey, metadataValue);
}
function ordinaryGetMetadata(metadataKey, target, propertyKey) {
    return ordinaryGetOwnMetadata(metadataKey, target, propertyKey)
        ? ordinaryGetOwnMetadata(metadataKey, target, propertyKey)
        : Object.getPrototypeOf(target)
            ? ordinaryGetMetadata(metadataKey, Object.getPrototypeOf(target), propertyKey)
            : undefined;
}
function metadata(metadataKey, metadataValue) {
    return function decorator(target, propertyKey) {
        ordinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
    };
}
function getMetadata(metadataKey, target, propertyKey) {
    return ordinaryGetMetadata(metadataKey, target, propertyKey);
}
function getOwnMetadata(metadataKey, target, propertyKey) {
    return ordinaryGetOwnMetadata(metadataKey, target, propertyKey);
}
function hasOwnMetadata(metadataKey, target, propertyKey) {
    return !!ordinaryGetOwnMetadata(metadataKey, target, propertyKey);
}
function hasMetadata(metadataKey, target, propertyKey) {
    return !!ordinaryGetMetadata(metadataKey, target, propertyKey);
}
function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
    ordinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
}
const Reflection = {
    decorate,
    defineMetadata,
    getMetadata,
    getOwnMetadata,
    hasMetadata,
    hasOwnMetadata,
    metadata,
};
Object.assign(Reflect, Reflection);

(function () {
    if (
    // No Reflect, no classes, no need for shim because native custom elements
    // require ES2015 classes or Reflect.
    window.Reflect === undefined ||
        window.customElements === undefined ||
        // The webcomponentsjs custom elements polyfill doesn't require
        // ES2015-compatible construction (`super()` or `Reflect.construct`).
        window.customElements.hasOwnProperty('polyfillWrapFlushCallback')) {
        return;
    }
    var BuiltInHTMLElement = HTMLElement;
    // @ts-ignore
    window.HTMLElement = function HTMLElement() {
        return Reflect.construct(BuiltInHTMLElement, [], this.constructor);
    };
    HTMLElement.prototype = BuiltInHTMLElement.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement);
})();
// queueMicrotask 兼容
if (typeof window.queueMicrotask !== "function") {
    window.queueMicrotask = function (callback) {
        Promise.resolve()
            .then(callback)
            .catch(function (e) { return setTimeout(function () { throw e; }); });
    };
}

function getGlobal() {
    return (self ||
        window ||
        (function () {
            // @ts-ignore
            return this;
        })());
}
var webOptions = {
    store: null,
    root: getGlobal(),
    mapping: {},
    vnode: undefined,
};
var ATTR_KEY = 'prevProps';
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
var PROP_META_KEY = Symbol('PROP_META_KEY');
var STATE_META_KEY = Symbol('STATE_META_KEY');
var COMPONENT_CUSTOM_EVENT = Symbol('COMPONENT_CUSTOM_EVENT');
var COMPONENT_CUSTOM_INJECT = Symbol('COMPONENT_CUSTOM_INJECT');
var COMPONENT_CUSTOM_PROVIDE = Symbol('COMPONENT_CUSTOM_PROVIDE');
var COMPONENT_WATCH = Symbol('COMPONENT_WATCH');

var Dep = /** @class */ (function () {
    /**
     * 订阅中心构造器
     */
    function Dep() {
        this.subs = [];
    }
    /**
     * 收集依赖
     * @param {*} sub
     */
    Dep.prototype.addSub = function (sub) {
        // 此处临时使用includes防重复添加
        if (!this.subs.includes(sub)) {
            this.subs.push(sub);
        }
    };
    /**
     * 派发更新
     */
    Dep.prototype.notify = function () {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    };
    Dep.prototype.depend = function () {
        if (Dep.target) {
            if (!this.subs.includes(Dep.target)) {
                this.subs.push(Dep.target);
            }
        }
    };
    return Dep;
}());

/**
 * 判断是否是期望的类型
 * @param { unknown } param 将要判断的变量
 * @param { ...string } types 期望的类型
 * @return { boolean } 返回期望是否正确
 */
var isExpectType = function (param) {
    var types = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
    }
    return types.some(function (type) { return Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === type; });
};
var hasProto = '__proto__' in {};
function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
}
function parsePath(path) {
    path += '.';
    var segments = [];
    var segment = '';
    for (var i = 0; i < path.length; i++) {
        var curr = path[i];
        if (/\[|\./.test(curr)) {
            segments.push(segment);
            segment = '';
        }
        else if (/\W/.test(curr)) {
            continue;
        }
        else {
            segment += curr;
        }
    }
    return function (data) {
        return segments.reduce(function (data, key) {
            return data[key];
        }, data);
    };
}
function traverse(value) {
    // const seenObjects = new Set()
    var dfs = function (data) {
        if (!isExpectType(data, 'array', 'object'))
            return;
        Object.keys(data).forEach(function (key) {
            var value = data[key];
            dfs(value);
        });
    };
    dfs(value);
    // seenObjects.clear()
}

/**
 * 重写数组的原型方法
 */
var oldArrayProto = Array.prototype;
var newArrayProto = Object.create(oldArrayProto);
var methods = ['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse'];
methods.forEach(function (method) {
    newArrayProto[method] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var res = oldArrayProto[method].apply(this, args);
        var luckyOb = this['__luckyOb__'];
        if (['push', 'unshift', 'splice'].includes(method))
            luckyOb.walk(this);
        luckyOb.dep.notify();
        return res;
    };
});

var Observer = /** @class */ (function () {
    /**
     * 观察者构造器
     * @param value
     */
    function Observer(value) {
        // this.value = value
        this.dep = new Dep();
        // 将响应式对象代理到当前value上面, 并且将当前的enumerable设置为false
        def(value, '__observer__', this);
        if (Array.isArray(value)) { // 如果是数组, 则重写原型方法
            if (hasProto) {
                value['__proto__'] = newArrayProto;
            }
            else {
                Object.getOwnPropertyNames(newArrayProto).forEach(function (key) {
                    def(value, key, newArrayProto[key]);
                });
            }
        }
        this.walk(value);
    }
    Observer.prototype.walk = function (data) {
        Object.keys(data).forEach(function (key) {
            defineReactive(data, key, data[key]);
        });
    };
    return Observer;
}());
/**
 * 处理响应式
 * @param { Object | Array } data
 */
function observe(data) {
    if (!data || typeof data !== 'object')
        return;
    var luckyOb;
    if ('__observer__' in data) {
        luckyOb = data['__observer__'];
    }
    else {
        luckyOb = new Observer(data);
    }
    return luckyOb;
}
/**
 * 重写 setter / getter
 * @param {*} data
 * @param {*} key
 * @param {*} val
 */
function defineReactive(data, key, val) {
    var property = Object.getOwnPropertyDescriptor(data, key);
    if (property && property.configurable === false) {
        return;
    }
    var getter = property && property.get;
    var setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
        val = data[key];
    }
    observe(val);
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            var _a;
            var value = getter ? getter.call(data) : val;
            var ob = this.__observer__;
            (_a = ob === null || ob === void 0 ? void 0 : ob.dep) === null || _a === void 0 ? void 0 : _a.depend();
            return value;
        },
        set: function (newVal) {
            var _a;
            if (newVal === val)
                return;
            val = newVal;
            observe(newVal);
            var ob = this.__observer__;
            (_a = ob === null || ob === void 0 ? void 0 : ob.dep) === null || _a === void 0 ? void 0 : _a.notify();
        }
    });
}

var uid = 0;
var Watcher = /** @class */ (function () {
    /**
     * 观察者构造器
     * @param {*} $vm
     * @param {*} expr
     * @param {*} cb
     * @param options
     */
    function Watcher($vm, expr, cb, options) {
        if (options === void 0) { options = {}; }
        this.id = uid++;
        this.$vm = $vm;
        this.expr = expr;
        this.deep = !!options.deep;
        if (typeof expr === 'function') {
            this.getter = expr;
        }
        else {
            this.getter = parsePath(expr);
        }
        this.cb = cb;
        this.value = this.get();
    }
    /**
     * 根据表达式获取新值
     */
    Watcher.prototype.get = function () {
        Dep.target = this;
        var value = this.getter.call(this.$vm, this.$vm);
        // 处理深度监听
        if (this.deep) {
            traverse(value);
        }
        Dep.target = null;
        return value;
    };
    /**
     * 触发 watcher 更新
     */
    Watcher.prototype.update = function () {
        // get获取新值
        var newVal = this.get();
        // 读取之前存储的旧值
        var oldVal = this.value;
        this.value = newVal;
        // 触发 watch 回调
        this.cb.call(this.$vm, newVal, oldVal);
    };
    return Watcher;
}());

var CommonReactive = /** @class */ (function () {
    function CommonReactive(vm) {
        this.vm = vm;
    }
    CommonReactive.prototype.proxy = function (target, sourceKey, key) {
        Object.defineProperty(target, key, {
            get: function () {
                return this[sourceKey][key];
            },
            set: function (val) {
                this[sourceKey][key] = val;
            }
        });
    };
    return CommonReactive;
}());

/**
 * 属性装饰器
 * @param options
 * @constructor
 */
function Prop(options) {
    if (options === void 0) { options = { default: undefined }; }
    return function (target, attr) {
        defineProps(options, target, attr);
    };
}
/**
 * 定义Prop
 * @param options
 * @param target
 * @param attr
 */
function defineProps(options, target, attr) {
    var _a;
    if (options === void 0) { options = { default: undefined }; }
    var value = options.default;
    var keys = (_a = Reflect.getMetadata(PROP_META_KEY, target)) !== null && _a !== void 0 ? _a : [];
    keys.push({ default: value, type: options.type, attr: attr });
    Reflect.defineMetadata(PROP_META_KEY, keys, target);
}
/**
 * PROP 响应式处理
 */
var PropsReactive = /** @class */ (function (_super) {
    __extends(PropsReactive, _super);
    function PropsReactive(vm, propsList, watchList) {
        if (propsList === void 0) { propsList = []; }
        var _a;
        var _this = _super.call(this, vm) || this;
        _this.propsList = propsList.length ? propsList : (_a = Reflect.getMetadata(PROP_META_KEY, _this.vm)) !== null && _a !== void 0 ? _a : [];
        _this.observerProps();
        return _this;
    }
    /**
     * PROP 响应式处理
     * @private
     */
    PropsReactive.prototype.observerProps = function () {
        var _this = this;
        var $props = {};
        var propsList = this.propsList;
        $props = propsList.reduce(function (pre, curr, index) {
            pre[curr.attr] = curr.default;
            return pre;
        }, {});
        this.vm.$props = $props;
        var keys = Object.keys(this.vm.$props);
        var i = keys.length;
        while (i--) {
            var key = keys[i];
            this.proxy(this.vm, "$props", key);
        }
        observe(this.vm.$props);
        new Watcher(this.vm.$props, function () {
            return _this.vm.render.call(_this.vm, _this.vm.$props, null);
        }, function (ww, t) {
            _this.vm.update.call(_this.vm, _this.vm.$props, null);
        });
    };
    return PropsReactive;
}(CommonReactive));

var toDotCase = function (str) {
    return str
        .replace(/(?!^)([A-Z])/g, ' $1')
        .replace(/[_\s]+(?=[a-zA-Z])/g, '.')
        .toLowerCase();
};

/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
/**
 * This shim allows elements written in, or compiled to, ES5 to work on native
 * implementations of Custom Elements v1. It sets new.target to the value of
 * this.constructor so that the native HTMLElement constructor can access the
 * current under-construction element's definition.
 */
(function () {
    if (
    // No Reflect, no classes, no need for shim because native custom elements
    // require ES2015 classes or Reflect.
    window.Reflect === undefined ||
        window.customElements === undefined ||
        // The webcomponentsjs custom elements polyfill doesn't require
        // ES2015-compatible construction (`super()` or `Reflect.construct`).
        window.customElements.hasOwnProperty('polyfillWrapFlushCallback')) {
        return;
    }
    var BuiltInHTMLElement = HTMLElement;
    // @ts-ignore
    window.HTMLElement = function HTMLElement() {
        return Reflect.construct(BuiltInHTMLElement, [], this.constructor);
    };
    HTMLElement.prototype = BuiltInHTMLElement.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement);
})();
function cssToDom(css) {
    var node = document.createElement('style');
    node.textContent = css;
    return node;
}
function camelCase(str) {
    return str.replace(/-(\w)/g, function ($, $1) {
        return $1.toUpperCase();
    });
}
function Fragment(props) {
    return props.children;
}
/** Invoke or update a ref, depending on whether it is a function or object ref.
 *  @param {object|function} [ref=null]
 *  @param {any} [value]
 */
function applyRef(ref, value) {
    if (ref != null) {
        if (typeof ref == 'function')
            ref(value);
        else
            ref.current = value;
    }
}
/**
 * Call a function asynchronously, as soon as possible. Makes
 * use of HTML Promise to schedule the callback if available,
 * otherwise falling back to `setTimeout` (mainly for IE<11).
 * @type {(callback: function) => void}
 */
typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
// 划线转驼峰
function hyphenateReverse(str) {
    if (str.indexOf('-') > -1) {
        return str.replace(/(\-([a-z]))/g, function (match, p1, p2, offset, string) {
            // 这里有两个捕获组，第一个捕获组捕获全部并包含了第二个捕获组，所以match等于p1
            return p2.toUpperCase();
        });
    }
    return str;
}
function getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getAttrMap(dom) {
    var pairs = {};
    for (var i = 0, len = dom.attributes.length; i < len; i++) {
        var name_1 = dom.attributes[i].nodeName;
        var value = dom.attributes[i].nodeValue;
        if (dom.attributes[i].specified) {
            pairs[hyphenateReverse(name_1)] = value;
        }
    }
    return pairs;
}

/**
 * 自定义事件处理
 */
var EmitReactive = /** @class */ (function () {
    function EmitReactive(vm) {
        var _a;
        this.vm = vm;
        this.emitList = (_a = Reflect.getMetadata(COMPONENT_CUSTOM_EVENT, this.vm)) !== null && _a !== void 0 ? _a : [];
        this.observerEmits();
    }
    /**
     * PROP 响应式处理
     * @private
     */
    EmitReactive.prototype.observerEmits = function () {
        var _this = this;
        var that = this;
        var functions = this.emitList;
        functions.forEach(function (event) {
            Object.defineProperty(_this.vm, event.methodName, {
                get: function () {
                    return function () {
                        var _a;
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var result = (_a = event.methodFun).call.apply(_a, __spreadArray([that.vm], args, false));
                        var evtName = event.eventName ? event.eventName : toDotCase(event.methodName);
                        that.vm._dispatchEvent.call(that.vm, evtName, result);
                    };
                },
            });
        });
    };
    return EmitReactive;
}());

/**
 * 属性装饰器
 * @param options
 * @constructor
 */
function State(options) {
    if (options === void 0) { options = { default: undefined }; }
    return function (target, attr) {
        defineStates(options, target, attr);
    };
}
/**
 * 定义Prop
 * @param options
 * @param target
 * @param attr
 */
function defineStates(options, target, attr) {
    var _a;
    if (options === void 0) { options = { default: undefined }; }
    var value = options.default;
    var keys = (_a = Reflect.getMetadata(STATE_META_KEY, target)) !== null && _a !== void 0 ? _a : [];
    keys.push({ default: value, type: options.type, attr: attr });
    Reflect.defineMetadata(STATE_META_KEY, keys, target);
}
/**
/**
 * PROP 响应式处理
 */
var StatesReactive = /** @class */ (function (_super) {
    __extends(StatesReactive, _super);
    function StatesReactive(vm, statesList) {
        if (statesList === void 0) { statesList = []; }
        var _a;
        var _this = _super.call(this, vm) || this;
        _this.statesList = statesList.length ? statesList : (_a = Reflect.getMetadata(STATE_META_KEY, _this.vm)) !== null && _a !== void 0 ? _a : [];
        _this.observerStates();
        return _this;
    }
    /**
     * PROP 响应式处理
     * @private
     */
    StatesReactive.prototype.observerStates = function () {
        var _this = this;
        var $states = {};
        var propsList = this.statesList;
        $states = propsList.reduce(function (pre, curr, index) {
            pre[curr.attr] = curr.default;
            return pre;
        }, {});
        this.vm.$states = $states;
        var keys = Object.keys(this.vm.$states);
        var i = keys.length;
        while (i--) {
            var key = keys[i];
            this.proxy(this.vm, "$states", key);
        }
        observe(this.vm.$states);
        new Watcher(this.vm.$states, function () {
            return _this.vm.render.call(_this.vm, _this.vm.$states, null);
        }, function (ww, t) {
            _this.vm.update.call(_this.vm, _this.vm.$states, null);
        });
    };
    return StatesReactive;
}(CommonReactive));

/**
 * Watch 装饰器
 * @param path
 * @param options
 * @constructor
 */
function Watch(path, options) {
    return function (target, methodName, desc) {
        var _a;
        var functions = (_a = Reflect.getMetadata(COMPONENT_WATCH, target)) !== null && _a !== void 0 ? _a : [];
        var methodFun = desc.value;
        functions.push({
            callback: methodFun,
            options: options || {},
            callbackName: methodName,
            path: path,
        });
        Reflect.defineMetadata(COMPONENT_WATCH, functions, target);
    };
}
/**
 * PROP 响应式处理
 */
var WatchReactive = /** @class */ (function (_super) {
    __extends(WatchReactive, _super);
    function WatchReactive(vm, watchList) {
        if (watchList === void 0) { watchList = []; }
        var _a;
        var _this = _super.call(this, vm) || this;
        _this.watchList = watchList.length ? watchList : (_a = Reflect.getMetadata(COMPONENT_WATCH, _this.vm)) !== null && _a !== void 0 ? _a : [];
        _this.observer();
        return _this;
    }
    /**
     * PROP 响应式处理
     * @private
     */
    WatchReactive.prototype.observer = function () {
        var _this = this;
        var $watch = {};
        var watchList = this.watchList;
        $watch = watchList.reduce(function (pre, curr, index) {
            _this.$watch(curr.path, _this.vm[curr.callbackName], curr);
            pre[curr.path] = curr;
            return pre;
        }, {});
        this.vm.$watch = $watch;
    };
    /**
     * 添加一个观察者 create user watcher
     * @param expr 表达式
     * @param handler 回调函数
     * @param watchOpt 配置参数
     * @return 卸载当前观察者的函数 (暂未返回)
     */
    WatchReactive.prototype.$watch = function (expr, handler, watchOpt) {
        if (watchOpt === void 0) { watchOpt = {}; }
        if (typeof handler === 'object') {
            watchOpt = handler;
            handler = watchOpt.handler;
        }
        var watcher = new Watcher(this.vm, expr, handler, watchOpt);
        if (watchOpt.immediate) {
            handler.call(this.vm, watcher.value);
        }
        return function unWatchFn() { };
    };
    return WatchReactive;
}(CommonReactive));

function define(options, ctor) {
    // 默认挂载dom
    if (options.isMountDom === undefined) {
        options.isMountDom = true;
    }
    if (customElements.get(options.name)) {
        return;
    }
    ctor.$options = options;
    customElements.define(options.name, ctor, options.options || {});
}

function Component(options) {
    return function (target) {
        define(options, target);
    };
}

/**
 * 格式化数据类型
 */
function formatValue(val, type, defaultValue) {
    var newValue = undefined;
    try {
        if (val !== null) {
            switch (type) {
                case String:
                    newValue = val;
                    break;
                case Number:
                    newValue = Number(val);
                    break;
                case Boolean:
                    newValue = !(val === 'false' || val === '0' || val === false);
                    break;
                case Array:
                case Object:
                    if (typeof val === 'string') {
                        newValue = JSON.parse(val.replace(/'/g, '"'));
                    }
                    else if (Object.prototype.toString.call(val) === '[object Array]' || Object.prototype.toString.call(val) === '[object Object]') {
                        newValue = val;
                    }
                    else {
                        newValue = JSON.parse(val
                            .replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?:([^\/])/g, '"$2":$4')
                            .replace(/'([\s\S]*?)'/g, '"$1"')
                            .replace(/,(\s*})/g, '$1'));
                    }
                    break;
                default:
                    newValue = val;
                    break;
            }
        }
        else {
            newValue = defaultValue;
        }
        return newValue;
    }
    catch (e) {
        console.warn("formatValue file, please input element attr", e);
        return newEval(val);
    }
}
function newEval(fn) {
    try {
        var Fn = Function;
        return new Fn('return ' + fn)();
    }
    catch (e) {
        console.warn("eval fail", e);
    }
}

/**
 * Create an element with the given nodeName.
 * @param {string} nodeName The DOM node to create
 * @param {boolean} [isSvg=false] If `true`, creates an element within the SVG
 *  namespace.
 * @returns {Element} The created DOM node
 */
function createNode(nodeName, isSvg) {
    /** @type {Element} */
    var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
    node.normalizedNodeName = nodeName;
    return node;
}
/**
 * Remove a child node from its parent if attached.
 * @param {Node} node The node to remove
 */
function removeNode(node) {
    var parentNode = node.parentNode;
    if (parentNode)
        parentNode.removeChild(node);
}
/**
 * Check if two nodes are equivalent.
 *
 * @param {Node} node      DOM Node to compare
 * @param {VNode} vnode      Virtual DOM node to compare
 * @param {boolean} [hydrating=false]  If true, ignores component constructors when comparing.
 * @private
 */
function isSameNodeType(node, vnode, hydrating) {
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        return node.splitText !== undefined;
    }
    if (typeof vnode.nodeName === 'string') {
        return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
    }
    else if (typeof vnode.nodeName === 'function') {
        return webOptions.mapping[node.nodeName.toLowerCase()] === vnode.nodeName;
    }
    return hydrating || node._componentConstructor === vnode.nodeName;
}
/**
 * Check if an Element has a given nodeName, case-insensitively.
 *
 * @param {Element} node  A DOM Element to inspect the name of.
 * @param {String} nodeName  Unnormalized name to compare against.
 */
function isNamedNode(node, nodeName) {
    return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Proxy an event to hooked event handlers
 * @param {Event} e The event object from the browser
 * @private
 */
function eventProxy(e) {
    // @ts-ignore
    return this._listeners[e.type]((webOptions.event && webOptions.event(e)) || e);
}
function bindEvent(node, name, value, old) {
    var useCapture = name !== (name = name.replace(/Capture$/, ''));
    var nameLower = name.toLowerCase();
    name = (nameLower in node ? nameLower : name).slice(2);
    if (value) {
        if (!old) {
            node.addEventListener(name, eventProxy, useCapture);
        }
    }
    else {
        node.removeEventListener(name, eventProxy, useCapture);
    }
    (node._listeners || (node._listeners = {}))[name] = value;
}

var extension = {};

/**
 * Set a named attribute on the given Node, with special behavior for some names
 * and event handlers. If `value` is `null`, the attribute/handler will be
 * removed.
 * @param {Element} node An element to mutate
 * @param {string} name The name/key to set, such as an event or attribute name
 * @param {*} old The last value that was set for this name/node pair
 * @param {*} value An attribute value, such as a function to be used as an
 *  event handler
 * @param {boolean} isSvg Are we currently diffing inside an svg?
 * @param component
 * @private
 */
function setAccessor(node, name, old, value, isSvg, component) {
    if (name === 'className')
        name = 'class';
    if (name[0] == 'o' && name[1] == '-') {
        if (extension[name]) {
            extension[name](node, value, component);
        }
    }
    else if (name === 'key') ;
    else if (name === 'ref') {
        applyRef(old, null);
        applyRef(value, node);
    }
    else if (name === 'class' && !isSvg) {
        node.className = value || '';
    }
    else if (name === 'style') {
        if (!value || typeof value === 'string' || typeof old === 'string') {
            node.style.cssText = value || '';
        }
        if (value && typeof value === 'object') {
            if (typeof old !== 'string') {
                for (var i in old)
                    if (!(i in value))
                        node.style[i] = '';
            }
            for (var i in value) {
                node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
            }
        }
    }
    else if (name === 'dangerouslySetInnerHTML') {
        if (value)
            node.innerHTML = value.__html || '';
    }
    else if (name[0] == 'o' && name[1] == 'n') {
        bindEvent(node, name, value, old);
    }
    else if (node.nodeName === 'INPUT' && name === 'value') {
        node[name] = value == null ? '' : value;
    }
    else if (name !== 'list' && name !== 'type' && name !== 'css' && !isSvg && name in node && value !== '') {
        //value !== '' fix for selected, disabled, checked with pure element
        // Attempt to set a DOM property to the given value.
        // IE & FF throw for certain property-value combinations.
        try {
            node[name] = value == null ? '' : value;
        }
        catch (e) { }
        if ((value == null || value === false) && name != 'spellcheck')
            node.pureRemoveAttribute ? node.pureRemoveAttribute(name) : node.removeAttribute(name);
    }
    else {
        var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));
        // spellcheck is treated differently than all other boolean values and
        // should not be removed when the value is `false`. See:
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-spellcheck
        if (value == null || value === false) {
            if (ns)
                node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());
            else
                node.pureRemoveAttribute ? node.pureRemoveAttribute(name) : node.removeAttribute(name);
        }
        else if (typeof value !== 'function') {
            if (ns) {
                node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);
            }
            else {
                node.pureSetAttribute ? node.pureSetAttribute(name, value) : node.setAttribute(name, value);
            }
        }
    }
}

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = 0;
/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;
/** Global flag indicating if the diff is performing hydration */
var hydrating = false;
/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *  @param {Element} [dom=null]    A DOM node to mutate into the shape of the `vnode`
 *  @param {VNode} vnode      A VNode (with descendants forming a tree) representing the desired DOM structure
 *  @param parent
 *  @param component
 *  @param updateSelf
 *  @returns {Element} dom      The created/mutated element
 *  @private
 */
function diff(dom, vnode, parent, component, updateSelf) {
    //first render return undefined
    if (!dom && !vnode)
        return;
    // diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
    var ret;
    if (!diffLevel++) {
        // when first starting the diff, check if we're diffing an SVG or within an SVG
        isSvgMode = parent != null && parent.ownerSVGElement !== undefined;
        // hydration is indicated by the existing element to be diffed not having a prop cache
        hydrating = dom != null && !(ATTR_KEY in dom);
    }
    if (vnode && vnode.nodeName === Fragment) {
        vnode = vnode.children;
    }
    if (isArray(vnode)) {
        if (parent) {
            //don't use css and props.css when using h.f
            innerDiffNode(parent, vnode, hydrating, component, updateSelf);
        }
        else {
            ret = [];
            vnode.forEach(function (item, index) {
                var ele = idiff(index === 0 ? dom : null, item, component, updateSelf);
                ret.push(ele);
            });
        }
    }
    else {
        if (isArray(dom)) {
            dom.forEach(function (one, index) {
                if (index === 0) {
                    ret = idiff(one, vnode, component, updateSelf);
                }
                else {
                    recollectNodeTree(one, false);
                }
            });
        }
        else {
            ret = idiff(dom, vnode, component, updateSelf);
        }
        // append the element if its a new parent
        if (parent && ret.parentNode !== parent)
            parent.appendChild(ret);
    }
    // diffLevel being reduced to 0 means we're exiting the diff
    if (!--diffLevel) {
        hydrating = false;
        // invoke queued componentDidMount lifecycle methods
    }
    return ret;
}
/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
function idiff(dom, vnode, component, updateSelf) {
    if (dom && vnode && dom.props) {
        dom.props.children = vnode.children;
    }
    var out = dom;
    var prevSvgMode = isSvgMode;
    // empty values (null, undefined, booleans) render as empty Text nodes
    if (vnode == null || typeof vnode === 'boolean')
        vnode = '';
    // Fast case: Strings & Numbers create/update Text nodes.
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        // update if it's already a Text node:
        if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || component)) {
            /* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
            if (dom.nodeValue != vnode) {
                dom.nodeValue = vnode;
            }
        }
        else {
            // it wasn't a Text node: replace it with one and recycle the old Element
            // @ts-ignore
            out = document.createTextNode(vnode);
            if (dom) {
                if (dom.parentNode)
                    dom.parentNode.replaceChild(out, dom);
                recollectNodeTree(dom, true);
            }
        }
        out[ATTR_KEY] = true;
        return out;
    }
    // If the VNode represents a Component, perform a component diff:
    var vnodeName = vnode.nodeName;
    if (typeof vnodeName === 'function') {
        for (var key in webOptions.mapping) {
            if (webOptions.mapping[key] === vnodeName) {
                vnodeName = key;
                vnode.nodeName = key;
                break;
            }
        }
    }
    // Tracks entering and exiting SVG namespace when descending through the tree.
    isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;
    // If there's no existing element or it's the wrong type, create a new one:
    vnodeName = String(vnodeName);
    if (!dom || !isNamedNode(dom, vnodeName)) {
        out = createNode(vnodeName, isSvgMode);
        if (dom) {
            // move children into the replacement node
            while (dom.firstChild)
                out.appendChild(dom.firstChild);
            // if the previous Element was mounted into the DOM, replace it inline
            if (dom.parentNode)
                dom.parentNode.replaceChild(out, dom);
            // recycle the old element (skips non-Element node types)
            recollectNodeTree(dom, true);
        }
    }
    var fc = out.firstChild;
    var props = out[ATTR_KEY];
    var vchildren = vnode.children;
    if (props == null) {
        props = out[ATTR_KEY] = {};
        for (var a = out.attributes, i = a.length; i--;)
            props[a[i].name] = a[i].value;
    }
    // Optimization: fast-path for elements containing a single TextNode:
    if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
        if (fc.nodeValue != vchildren[0]) {
            fc.nodeValue = vchildren[0];
        }
    }
    // otherwise, if there are existing or new children, diff them:
    else if ((vchildren && vchildren.length) || fc != null) {
        if (!(out.constructor.is == 'CustomWebComponent' && out.constructor.noSlot)) {
            innerDiffNode(out, vchildren, hydrating || props.dangerouslySetInnerHTML != null, component, updateSelf);
        }
    }
    // Apply attributes/props from VNode to the DOM Element:
    diffAttributes(out, vnode.attributes, props, component, updateSelf);
    if (out.props) {
        out.props.children = vnode.children;
    }
    // restore previous SVG mode: (in case we're exiting an SVG namespace)
    isSvgMode = prevSvgMode;
    return out;
}
/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *  @param {Element} dom      Element whose children should be compared & mutated
 *  @param {Array} vchildren    Array of VNodes to compare to `dom.childNodes`
 *  @param {Boolean} isHydrating  If `true`, consumes externally created elements similar to hydration
 * @param component
 * @param updateSelf
 */
function innerDiffNode(dom, vchildren, isHydrating, component, updateSelf) {
    var originalChildren = dom.childNodes;
    var children = [];
    var keyed = {};
    var keyedLen = 0;
    var min = 0;
    var len = (originalChildren === null || originalChildren === void 0 ? void 0 : originalChildren.length) || 0;
    var childrenLen = 0;
    var vlen = vchildren ? vchildren.length : 0;
    var j;
    var c;
    var f;
    var vchild;
    var child;
    // Build up a map of keyed children and an Array of unkeyed children:
    if (len !== 0) {
        for (var i = 0; i < len; i++) {
            var child_1 = originalChildren[i], props = child_1[ATTR_KEY], key = vlen && props ? (child_1._component ? child_1._component.__key : props.key) : null;
            if (key != null) {
                keyedLen++;
                keyed[key] = child_1;
            }
            else if (props || (child_1.splitText !== undefined ? (isHydrating ? child_1.nodeValue.trim() : true) : isHydrating)) {
                children[childrenLen++] = child_1;
            }
        }
    }
    if (vlen !== 0) {
        for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            if (vchild) {
                // attempt to find a node based on key matching
                var key = vchild.key;
                if (key != null) {
                    if (keyedLen && keyed[key] !== undefined) {
                        child = keyed[key];
                        keyed[key] = undefined;
                        keyedLen--;
                    }
                }
                // attempt to pluck a node of the same type from the existing children
                else if (!child && min < childrenLen) {
                    for (j = min; j < childrenLen; j++) {
                        if (children[j] !== undefined && isSameNodeType((c = children[j]), vchild, isHydrating)) {
                            child = c;
                            children[j] = undefined;
                            if (j === childrenLen - 1)
                                childrenLen--;
                            if (j === min)
                                min++;
                            break;
                        }
                    }
                }
            }
            // morph the matched/found/created DOM child to match vchild (deep)
            child = idiff(child, vchild, component, updateSelf);
            f = originalChildren[i];
            if (child && child !== dom && child !== f) {
                if (f == null) {
                    dom.appendChild(child);
                }
                else if (child === f.nextSibling) {
                    removeNode(f);
                }
                else {
                    dom.insertBefore(child, f);
                }
            }
        }
    }
    // remove unused keyed children:
    if (keyedLen) {
        for (var i in keyed)
            if (keyed[i] !== undefined)
                recollectNodeTree(keyed[i], false);
    }
    // remove orphaned unkeyed children:
    while (min <= childrenLen) {
        if ((child = children[childrenLen--]) !== undefined)
            recollectNodeTree(child, false);
    }
}
/** Recursively recycle (or just unmount) a node and its descendants.
 *  @param {Node} node            DOM node to start unmount/removal from
 *  @param {Boolean} [unmountOnly=false]  If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
    // If the node's VNode had a ref function, invoke it with null here.
    // (this is part of the React spec, and smart for unsetting references)
    if (node[ATTR_KEY] != null && node[ATTR_KEY].ref) {
        if (typeof node[ATTR_KEY].ref === 'function') {
            node[ATTR_KEY].ref(null);
        }
        else if (node[ATTR_KEY].ref.current) {
            node[ATTR_KEY].ref.current = null;
        }
    }
    if (unmountOnly === false || node[ATTR_KEY] == null) {
        removeNode(node);
    }
    removeChildren(node);
}
/** Recollect/unmount all children.
 *  - we use .lastChild here because it causes less reflow than .firstChild
 *  - it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren(node) {
    node = node.lastChild;
    while (node) {
        var next = node.previousSibling;
        recollectNodeTree(node, true);
        node = next;
    }
}
/** Apply differences in attributes from a VNode to the given DOM Element.
 *  @param {Element} dom    Element with attributes to diff `attrs` against
 *  @param {Object} attrs    The desired end-state key-value attribute pairs
 *  @param {Object} old      Current/previous attributes (from previous VNode or element's prop cache)
 * @param component
 * @param updateSelf
 */
function diffAttributes(dom, attrs, old, component, updateSelf) {
    var name;
    //let update = false
    var isWeElement = dom.update;
    var oldClone;
    if (dom.receiveProps) {
        oldClone = Object.assign({}, old);
    }
    // remove attributes no longer present on the vnode by setting them to undefined
    for (name in old) {
        if (!(attrs && attrs[name] != null) && old[name] != null) {
            setAccessor(dom, name, old[name], (old[name] = undefined), isSvgMode, component);
            if (isWeElement) {
                delete dom.props[name];
                //update = true
            }
        }
    }
    // add new & update changed attributes
    for (name in attrs) {
        if (isWeElement && typeof attrs[name] === 'object' && name !== 'ref') {
            if (name === 'style') {
                setAccessor(dom, name, old[name], (old[name] = attrs[name]), isSvgMode, component);
            }
            var ccName = camelCase(name);
            dom.props[ccName] = old[ccName] = attrs[name];
            //update = true
        }
        else if (name !== 'children' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
            setAccessor(dom, name, old[name], attrs[name], isSvgMode, component);
            //fix lazy load props missing
            if (dom.nodeName.indexOf('-') !== -1) {
                dom.props = dom.props || {};
                var ccName = camelCase(name);
                dom.props[ccName] = old[ccName] = attrs[name];
                //update = true
            }
            else {
                old[name] = attrs[name];
            }
        }
    }
    if (isWeElement && !updateSelf && dom.parentNode) {
        //__hasChildren is not accuracy when it was empty at first, so add dom.children.length > 0 condition
        //if (update || dom.__hasChildren || dom.children.length > 0 || (dom.store && !dom.store.data)) {
        if (dom.receiveProps(dom.props, oldClone) !== false) {
            dom.update();
        }
        //}
    }
}

var stack = [];
function h(nodeName, attributes) {
    var children = [], lastSimple, child, simple, i;
    for (i = arguments.length; i-- > 2;) {
        stack.push(arguments[i]);
    }
    if (attributes && attributes.children != null) {
        if (!stack.length)
            stack.push(attributes.children);
        delete attributes.children;
    }
    while (stack.length) {
        if ((child = stack.pop()) && child.pop !== undefined) {
            for (i = child.length; i--;)
                stack.push(child[i]);
        }
        else {
            if (typeof child === 'boolean')
                child = null;
            if ((simple = typeof nodeName !== 'function')) {
                if (child == null)
                    child = '';
                else if (typeof child === 'number')
                    child = String(child);
                else if (typeof child !== 'string')
                    simple = false;
            }
            if (simple && lastSimple) {
                children[children.length - 1] += child;
            }
            else if (children.length === 0) {
                children = [child];
            }
            else {
                children.push(child);
            }
            lastSimple = simple;
        }
    }
    if (nodeName === Fragment) {
        return children;
    }
    var p = {
        nodeName: nodeName,
        children: children,
        attributes: attributes == null ? undefined : attributes,
        key: attributes == null ? undefined : attributes.key,
    };
    // if a "vnode hook" is defined, pass every created VNode to it
    if (webOptions.vnode !== undefined)
        webOptions.vnode(p);
    return p;
}

var WuComponent = /** @class */ (function (_super) {
    __extends(WuComponent, _super);
    function WuComponent() {
        var _this = _super.call(this) || this;
        _this.rootNode = null;
        _this.isInstalled = false;
        _this.willUpdate = false;
        _this._customStyleContent = '';
        _this.props = {};
        _this.prevProps = {};
        _this._customStyleElement = null;
        _this.provides = [];
        _this.$options = _this.constructor.$options;
        _this._initComponent_();
        _this.injection = null;
        _this.rootNode = null;
        _this.isInstalled = false;
        _this.willUpdate = false;
        _this._customStyleContent = '';
        _this.props = {};
        _this.prevProps = {};
        _this._customStyleElement = null;
        _this.store = null;
        _this.injection = {};
        _this.providesMap = _this.getProvides();
        _this.injectsList = _this.getInjects();
        return _this;
    }
    WuComponent.prototype._initComponent_ = function () {
        var _a, _b, _c;
        this.elementId = getGuid();
        this.propsList = (_a = Reflect.getMetadata(PROP_META_KEY, this)) !== null && _a !== void 0 ? _a : [];
        this.injects = (_b = Reflect.getMetadata(COMPONENT_CUSTOM_INJECT, this)) !== null && _b !== void 0 ? _b : [];
        this.provides = (_c = Reflect.getMetadata(COMPONENT_CUSTOM_PROVIDE, this)) !== null && _c !== void 0 ? _c : [];
        new PropsReactive(this);
        new WatchReactive(this);
        new StatesReactive(this);
        new EmitReactive(this);
    };
    Object.defineProperty(WuComponent, "observedAttributes", {
        get: function () {
            return [];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 获取当前组件注入的数据
     */
    WuComponent.prototype.getProvides = function () {
        return this.provides.reduce(function (previousValue, currentValue) {
            previousValue[currentValue.key] = currentValue;
            return previousValue;
        }, {});
    };
    /**
     * 获取当前组件注入的数据
     */
    WuComponent.prototype.getInjects = function () {
        return this.injects;
    };
    Object.defineProperty(WuComponent.prototype, "isInject", {
        /**
         * 判断是否需要读取注入的数据
         */
        get: function () {
            return Array.isArray(this.injectsList) && this.injectsList.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WuComponent.prototype, "isProvide", {
        /**
         * 是否注入
         */
        get: function () {
            return Object.keys(this.providesMap).length > 0;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 属性移除
     * @param key
     */
    WuComponent.prototype.removeAttribute = function (key) {
        _super.prototype.removeAttribute.call(this, key);
        this.isInstalled && this.update();
    };
    /**
     * 设置属性
     * @param key
     * @param val
     */
    WuComponent.prototype.setAttribute = function (key, val) {
        var newValue;
        if (val && typeof val === 'object') {
            newValue = JSON.stringify(val);
        }
        else {
            newValue = val;
        }
        _super.prototype.setAttribute.call(this, key, newValue);
        if (this.isInstalled) {
            this[key] = val;
            this.props[key] = val;
        }
    };
    WuComponent.prototype.getAttribute = function (key) {
        var value = this[key];
        if (!value) {
            value = _super.prototype.getAttribute.call(this, key);
        }
        return value;
    };
    WuComponent.prototype.pureRemoveAttribute = function (key) {
        _super.prototype.removeAttribute.call(this, key);
    };
    WuComponent.prototype.pureSetAttribute = function (key, val) {
        _super.prototype.setAttribute.call(this, key, val);
    };
    /**
     * 属性变化
     */
    WuComponent.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        this.update([], false);
    };
    /**
     * 组件更新
     * @param ignoreAttrs
     * @param updateSelf
     */
    WuComponent.prototype.update = function (ignoreAttrs, updateSelf) {
        // queueWatcher(this as any);
        this.callUpdate(ignoreAttrs, updateSelf);
    };
    /**
     * 真正执行更新
     * @private
     */
    WuComponent.prototype.callUpdate = function (ignoreAttrs, updateSelf) {
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
        if (this._customStyleContent != this.$options.css) {
            this._customStyleContent = this.$options.css;
            // this.customStyleElement.textContent = this.customStyleContent;
        }
        // 属性变化，重新执行render 渲染， 走diff，生成新的dom
        var rendered = this.render(this.props, this.store);
        this.rendered();
        this.rootNode = diff(this.rootNode, rendered, (this === null || this === void 0 ? void 0 : this.shadowRoot) || this, this, updateSelf);
        this.willUpdate = false;
        this.updated();
    };
    /**
     * 初始化影子dom
     * @private
     */
    WuComponent.prototype.initShadowRoot = function () {
        var _a;
        var shadowRoot;
        if (this.$options.is === 'LightDom') {
            shadowRoot = this;
        }
        else {
            shadowRoot = this.shadowRoot || ((_a = this.attachShadow) === null || _a === void 0 ? void 0 : _a.call(this, { mode: 'open' }));
            var fc = void 0;
            while ((fc = shadowRoot.firstChild)) {
                shadowRoot.removeChild(fc);
            }
        }
        if (this.$options.css) {
            this._customStyleElement = cssToDom(this.$options.css);
            this._customStyleContent = this.$options.css;
            shadowRoot.appendChild(this._customStyleElement);
        }
        return shadowRoot;
    };
    /**
     * 更新数据注入
     */
    WuComponent.prototype.updateInject = function (callBack) {
        var _this = this;
        if (!this.isInject) {
            return;
        }
        Promise.resolve().then(function () {
            var p = _this.parentNode;
            var currentParent;
            var provide;
            while (p && !provide) {
                provide = p.isProvide ? p.providesMap : undefined;
                if (provide) {
                    currentParent = p;
                }
                p = p.parentNode || p.host;
            }
            if (provide) {
                _this.injectsList.forEach(function (inject) {
                    var callName = provide[inject.key].functionName;
                    _this[inject.attr] = currentParent[callName]();
                });
                typeof callBack === "function" && callBack();
                return;
            }
            else {
                console.warn("The provide prop was not found on the parent node or the provide type is incorrect. please check ".concat(_this.tagName));
            }
        });
    };
    /***
     * 挂载自定义组件
     */
    WuComponent.prototype.connectedCallback = function () {
        var _this = this;
        this.updateInject(this.update.bind(this));
        // @ts-ignore
        var shadowRoot = this.initShadowRoot();
        this.attrsToProps();
        this.beforeInstall();
        this.install();
        this.afterInstall();
        this.beforeRender();
        var rendered = this.render(this.props, this.store);
        this.rootNode = diff(null, rendered, null, this);
        if (this.$options.isMountDom === true) {
            if (Array.isArray(this.rootNode)) {
                this.rootNode.forEach(function (item) { return shadowRoot.appendChild(item); });
            }
            else {
                this.rootNode && shadowRoot.appendChild(this.rootNode);
            }
        }
        this.isInstalled = true;
        this.rendered();
        if (this.isInject) {
            Promise.resolve().then(function () { return _this.connected(shadowRoot); });
        }
        else {
            this.connected(shadowRoot);
        }
    };
    /**
     * 组件销毁
     */
    WuComponent.prototype.disconnectedCallback = function () {
        this.disConnected();
    };
    /**
     * 组件挂载
     */
    WuComponent.prototype.connected = function (shadowRoot) { };
    /**
     * 组件卸载
     */
    WuComponent.prototype.disConnected = function () { };
    /**
     * 组件更新前检查
     */
    WuComponent.prototype.preBeforeUpdate = function () {
        return true;
    };
    /**
     * 更新前
     */
    WuComponent.prototype.beforeUpdate = function () { };
    /**
     * 更新完成
     */
    WuComponent.prototype.updated = function () { };
    /**
     * 强制刷新
     */
    WuComponent.prototype.forceUpdate = function () {
        this.update([], true);
    };
    /**
     * 更新属性
     * @param obj
     */
    WuComponent.prototype.updateProps = function (obj) {
        var _this = this;
        Object.keys(obj).forEach(function (key) {
            _this.props[key] = obj[key];
            if (_this.prevProps) {
                _this.prevProps[key] = obj[key];
            }
        });
        this.forceUpdate();
    };
    /**
     * 屬性值初始化
     * @param ignoreAttrs
     */
    WuComponent.prototype.attrsToProps = function (ignoreAttrs) {
        var _this = this;
        var ele = this;
        if (!this.propsList || (Array.isArray(this.propsList) && !this.propsList.length))
            return;
        // 拿到dom绑定的属性
        var host = this.shadowRoot && this.shadowRoot.host ? this.shadowRoot.host : this;
        var attrMap = getAttrMap(host);
        this.propsList.forEach(function (key) {
            var attr = hyphenateReverse(key.attr);
            var val = attrMap[attr];
            if (!val) {
                val = ele.getAttribute(attr);
            }
            var newValue = formatValue(val, key.type, key.default);
            _this[attr] = newValue;
            _this.props[attr] = newValue;
            // this.setAttribute(attr, newValue);
        });
    };
    /**
     * 事件
     * @param evtName
     * @param result
     */
    WuComponent.prototype._dispatchEvent = function (evtName, result) {
        var event = new CustomEvent(evtName, {
            detail: result || null,
            bubbles: true,
            composed: true, // 设置为可穿透组件
        });
        if (this === null || this === void 0 ? void 0 : this.shadowRoot) {
            this === null || this === void 0 ? void 0 : this.shadowRoot.dispatchEvent(event);
            return;
        }
        this.dispatchEvent(event);
    };
    WuComponent.prototype.beforeInstall = function () { };
    WuComponent.prototype.install = function () { };
    WuComponent.prototype.afterInstall = function () { };
    /**
     * 渲染前
     */
    WuComponent.prototype.beforeRender = function () { };
    /**
     * 渲染结束
     */
    WuComponent.prototype.rendered = function () { };
    WuComponent.prototype.receiveProps = function () { };
    WuComponent.prototype.render = function (props, store) { };
    WuComponent.is = 'CustomWebComponent';
    return WuComponent;
}(HTMLElement));

/**
 * classNames based on https://github.com/JedWatson/classnames
 * by Jed Watson
 * Licensed under the MIT License
 * https://github.com/JedWatson/classnames/blob/master/LICENSE
 * modified by dntzhang
 */
var hasOwn = {}.hasOwnProperty;
function classNames() {
    var classes = [];
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg)
            continue;
        var argType = typeof arg;
        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        }
        else if (Array.isArray(arg) && arg.length) {
            // @ts-ignore
            var inner = classNames.apply(null, arg);
            if (inner) {
                classes.push(inner);
            }
        }
        else if (argType === 'object') {
            for (var key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }
    return classes.join(' ');
}
function extractClass(a, b, c) {
    var _a = Array.prototype.slice.call(arguments, 0), props = _a[0], args = _a.slice(1);
    if (props.class) {
        args.unshift(props.class);
        delete props.class;
    }
    else if (props.className) {
        args.unshift(props.className);
        delete props.className;
    }
    if (args.length > 0) {
        return { class: classNames.apply(null, args) };
    }
    return { class: '' };
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/* 53a8ff */\n/* 66b1ff */\n/* 79bbff */\n/* 8cc5ff */\n/* a0cfff */\n/* b3d8ff */\n/* c6e2ff */\n/* d9ecff */\n/* ecf5ff */\n/**************************Radio****************************/\n/* Input-------------------------- */\n/* Break-point\n--------------------------*/\n/* Link\n--------------------------*/\n/* Switch\n-------------------------- */\n/* Table\n-------------------------- */\n/* Pagination\n-------------------------- */\n/* Dropdown\n-------------------------- */\n/* Checkbox\n-------------------------- */\n/* Tag\n-------------------------- */\n/* Message\n-------------------------- */\n/* Rate\n--------------------------*/\n/* Timeline\n--------------------------*/\n/* Select\n-------------------------- */\n/* Avatar\n--------------------------*/\n/* Badge\n-------------------------- */\n/* Empty\n-------------------------- */\n/* Skeleton\n--------------------------*/\n/* Svg\n--------------- */\n/* Card\n--------------------------*/\n/* Header\n  --------------------------*/\n/* Footer\n--------------------------*/\n/* Main\n--------------------------*/\n/* Alert\n-------------------------- */\n/* Pagination\n-------------------------- */\n/* Transition\n-------------------------- */\n/* Collapse\n--------------------------*/\n/* Menu\n--------------------------*/\n/* Tree\n-------------------------- */\n/* BEM support Func\n -------------------------- */\n/* Break-points\n -------------------------- */\n/* Scrollbar\n -------------------------- */\n/* Placeholder\n -------------------------- */\n:host {\n  display: inline-block;\n}\n\n:host([block]) {\n  display: block;\n}\n\n.wu-button {\n  display: inline-block;\n  line-height: 1;\n  white-space: nowrap;\n  cursor: pointer;\n  background: #FFFFFF;\n  border: 1px solid #C0C4CC;\n  color: #606266;\n  -webkit-appearance: none;\n  text-align: center;\n  box-sizing: border-box;\n  outline: none;\n  margin: 0;\n  transition: 0.1s;\n  font-weight: 500;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  padding: 12px 20px;\n  font-size: 14px;\n  border-radius: 4px;\n}\n.wu-button + .wu-button {\n  margin-left: 10px;\n}\n.wu-button.is-round {\n  padding: 12px 20px;\n}\n.wu-button:hover, .wu-button:focus {\n  color: #409EFF;\n  border-color: #c6e2ff;\n  background-color: #ecf5ff;\n}\n.wu-button:active {\n  color: #3a8ee6;\n  border-color: #3a8ee6;\n  outline: none;\n}\n.wu-button::-moz-focus-inner {\n  border: 0;\n}\n.wu-button [class*=wu-icon-] + span {\n  margin-left: 5px;\n}\n.wu-button.is-plain:hover, .wu-button.is-plain:focus {\n  background: #FFFFFF;\n  border-color: #409EFF;\n  color: #409EFF;\n}\n.wu-button.is-plain:active {\n  background: #FFFFFF;\n  border-color: #3a8ee6;\n  color: #3a8ee6;\n  outline: none;\n}\n\n.wu-button.is-active {\n  color: #3a8ee6;\n  border-color: #3a8ee6;\n}\n\n.wu-button.is-disabled, .wu-button.is-disabled:hover, .wu-button.is-disabled:focus {\n  color: #C0C4CC;\n  cursor: not-allowed;\n  background-image: none;\n  background-color: #FFFFFF;\n  border-color: #EBEEF5;\n}\n.wu-button.is-disabled.wu-button--text {\n  background-color: transparent;\n}\n.wu-button.is-disabled.is-plain, .wu-button.is-disabled.is-plain:hover, .wu-button.is-disabled.is-plain:focus {\n  background-color: #FFFFFF;\n  border-color: #EBEEF5;\n  color: #C0C4CC;\n}\n\n.wu-button.is-loading {\n  position: relative;\n  pointer-events: none;\n}\n.wu-button.is-loading:before {\n  pointer-events: none;\n  content: \"\";\n  position: absolute;\n  left: -1px;\n  top: -1px;\n  right: -1px;\n  bottom: -1px;\n  border-radius: inherit;\n  background-color: rgba(255, 255, 255, 0.35);\n}\n\n.wu-button.is-round {\n  border-radius: 20px;\n  padding: 12px 23px;\n}\n\n.wu-button.is-circle {\n  border-radius: 50%;\n  padding: 12px;\n}\n\n.wu-button-primary {\n  color: #FFFFFF;\n  background-color: #409EFF;\n  border-color: #409EFF;\n}\n.wu-button-primary:hover, .wu-button-primary:focus {\n  background: #66b1ff;\n  border-color: #66b1ff;\n  color: #FFFFFF;\n}\n.wu-button-primary:active {\n  background: #3a8ee6;\n  border-color: #3a8ee6;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-primary.is-active {\n  background: #3a8ee6;\n  border-color: #3a8ee6;\n  color: #FFFFFF;\n}\n.wu-button-primary.is-disabled, .wu-button-primary.is-disabled:hover, .wu-button-primary.is-disabled:focus, .wu-button-primary.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #a0cfff;\n  border-color: #a0cfff;\n}\n.wu-button-primary.is-plain {\n  color: #409EFF;\n  background: #ecf5ff;\n  border-color: #b3d8ff;\n}\n.wu-button-primary.is-plain:hover, .wu-button-primary.is-plain:focus {\n  background: #409EFF;\n  border-color: #409EFF;\n  color: #FFFFFF;\n}\n.wu-button-primary.is-plain:active {\n  background: #3a8ee6;\n  border-color: #3a8ee6;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-primary.is-plain.is-disabled, .wu-button-primary.is-plain.is-disabled:hover, .wu-button-primary.is-plain.is-disabled:focus, .wu-button-primary.is-plain.is-disabled:active {\n  color: #8cc5ff;\n  background-color: #ecf5ff;\n  border-color: #d9ecff;\n}\n\n.wu-button-success {\n  color: #FFFFFF;\n  background-color: #67C23A;\n  border-color: #67C23A;\n}\n.wu-button-success:hover, .wu-button-success:focus {\n  background: #85ce61;\n  border-color: #85ce61;\n  color: #FFFFFF;\n}\n.wu-button-success:active {\n  background: #5daf34;\n  border-color: #5daf34;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-success.is-active {\n  background: #5daf34;\n  border-color: #5daf34;\n  color: #FFFFFF;\n}\n.wu-button-success.is-disabled, .wu-button-success.is-disabled:hover, .wu-button-success.is-disabled:focus, .wu-button-success.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #b3e19d;\n  border-color: #b3e19d;\n}\n.wu-button-success.is-plain {\n  color: #67C23A;\n  background: #f0f9eb;\n  border-color: #c2e7b0;\n}\n.wu-button-success.is-plain:hover, .wu-button-success.is-plain:focus {\n  background: #67C23A;\n  border-color: #67C23A;\n  color: #FFFFFF;\n}\n.wu-button-success.is-plain:active {\n  background: #5daf34;\n  border-color: #5daf34;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-success.is-plain.is-disabled, .wu-button-success.is-plain.is-disabled:hover, .wu-button-success.is-plain.is-disabled:focus, .wu-button-success.is-plain.is-disabled:active {\n  color: #a4da89;\n  background-color: #f0f9eb;\n  border-color: #e1f3d8;\n}\n\n.wu-button-warning {\n  color: #FFFFFF;\n  background-color: #E6A23C;\n  border-color: #E6A23C;\n}\n.wu-button-warning:hover, .wu-button-warning:focus {\n  background: #ebb563;\n  border-color: #ebb563;\n  color: #FFFFFF;\n}\n.wu-button-warning:active {\n  background: #cf9236;\n  border-color: #cf9236;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-warning.is-active {\n  background: #cf9236;\n  border-color: #cf9236;\n  color: #FFFFFF;\n}\n.wu-button-warning.is-disabled, .wu-button-warning.is-disabled:hover, .wu-button-warning.is-disabled:focus, .wu-button-warning.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #f3d19e;\n  border-color: #f3d19e;\n}\n.wu-button-warning.is-plain {\n  color: #E6A23C;\n  background: #fdf6ec;\n  border-color: #f5dab1;\n}\n.wu-button-warning.is-plain:hover, .wu-button-warning.is-plain:focus {\n  background: #E6A23C;\n  border-color: #E6A23C;\n  color: #FFFFFF;\n}\n.wu-button-warning.is-plain:active {\n  background: #cf9236;\n  border-color: #cf9236;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-warning.is-plain.is-disabled, .wu-button-warning.is-plain.is-disabled:hover, .wu-button-warning.is-plain.is-disabled:focus, .wu-button-warning.is-plain.is-disabled:active {\n  color: #f0c78a;\n  background-color: #fdf6ec;\n  border-color: #faecd8;\n}\n\n.wu-button-danger {\n  color: #FFFFFF;\n  background-color: #F56C6C;\n  border-color: #F56C6C;\n}\n.wu-button-danger:hover, .wu-button-danger:focus {\n  background: #f78989;\n  border-color: #f78989;\n  color: #FFFFFF;\n}\n.wu-button-danger:active {\n  background: #dd6161;\n  border-color: #dd6161;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-danger.is-active {\n  background: #dd6161;\n  border-color: #dd6161;\n  color: #FFFFFF;\n}\n.wu-button-danger.is-disabled, .wu-button-danger.is-disabled:hover, .wu-button-danger.is-disabled:focus, .wu-button-danger.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #fab6b6;\n  border-color: #fab6b6;\n}\n.wu-button-danger.is-plain {\n  color: #F56C6C;\n  background: #fef0f0;\n  border-color: #fbc4c4;\n}\n.wu-button-danger.is-plain:hover, .wu-button-danger.is-plain:focus {\n  background: #F56C6C;\n  border-color: #F56C6C;\n  color: #FFFFFF;\n}\n.wu-button-danger.is-plain:active {\n  background: #dd6161;\n  border-color: #dd6161;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-danger.is-plain.is-disabled, .wu-button-danger.is-plain.is-disabled:hover, .wu-button-danger.is-plain.is-disabled:focus, .wu-button-danger.is-plain.is-disabled:active {\n  color: #f9a7a7;\n  background-color: #fef0f0;\n  border-color: #fde2e2;\n}\n\n.wu-button-info {\n  color: #FFFFFF;\n  background-color: #909399;\n  border-color: #909399;\n}\n.wu-button-info:hover, .wu-button-info:focus {\n  background: #a6a9ad;\n  border-color: #a6a9ad;\n  color: #FFFFFF;\n}\n.wu-button-info:active {\n  background: #82848a;\n  border-color: #82848a;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-info.is-active {\n  background: #82848a;\n  border-color: #82848a;\n  color: #FFFFFF;\n}\n.wu-button-info.is-disabled, .wu-button-info.is-disabled:hover, .wu-button-info.is-disabled:focus, .wu-button-info.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #c8c9cc;\n  border-color: #c8c9cc;\n}\n.wu-button-info.is-plain {\n  color: #909399;\n  background: #f4f4f5;\n  border-color: #d3d4d6;\n}\n.wu-button-info.is-plain:hover, .wu-button-info.is-plain:focus {\n  background: #909399;\n  border-color: #909399;\n  color: #FFFFFF;\n}\n.wu-button-info.is-plain:active {\n  background: #82848a;\n  border-color: #82848a;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-info.is-plain.is-disabled, .wu-button-info.is-plain.is-disabled:hover, .wu-button-info.is-plain.is-disabled:focus, .wu-button-info.is-plain.is-disabled:active {\n  color: #bcbec2;\n  background-color: #f4f4f5;\n  border-color: #e9e9eb;\n}\n\n.wu-button-medium {\n  padding: 10px 20px;\n  font-size: 14px;\n  border-radius: 4px;\n}\n.wu-button-medium.is-round {\n  padding: 10px 20px;\n}\n.wu-button-medium.is-circle {\n  padding: 10px;\n}\n\n.wu-button-small {\n  padding: 9px 15px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n.wu-button-small.is-round {\n  padding: 9px 15px;\n}\n.wu-button-small.is-circle {\n  padding: 9px;\n}\n\n.wu-button-mini {\n  padding: 7px 15px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n.wu-button-mini.is-round {\n  padding: 7px 15px;\n}\n.wu-button-mini.is-circle {\n  padding: 7px;\n}\n\n.wu-button-text {\n  border-color: transparent;\n  color: #409EFF;\n  background: transparent;\n  padding-left: 0;\n  padding-right: 0;\n}\n.wu-button-text:hover, .wu-button-text:focus {\n  color: #66b1ff;\n  border-color: transparent;\n  background-color: transparent;\n}\n.wu-button-text:active {\n  color: #3a8ee6;\n  border-color: transparent;\n  background-color: transparent;\n}\n.wu-button-text.is-disabled, .wu-button-text.is-disabled:hover, .wu-button-text.is-disabled:focus {\n  border-color: transparent;\n}\n\n.loading {\n  width: 1em;\n  height: 1em;\n  display: inline-block;\n  animation: loading 1s steps(12, end) infinite;\n  vertical-align: -0.125em;\n}\n\n@-webkit-keyframes loading {\n  0% {\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n@keyframes loading {\n  0% {\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    transform: rotate3d(0, 0, 1, 360deg);\n  }\n}";
styleInject(css_248z);

// import "../core/observer/example";
var WuButton = /** @class */ (function (_super) {
    __extends(WuButton, _super);
    function WuButton() {
        return _super.call(this) || this;
    }
    WuButton.prototype.typeChange = function (val, old) {
        console.log(val, old);
    };
    WuButton.prototype.render = function (_renderProps, _store) {
        var _a;
        var _this = this;
        return (h("button", __assign({ onclick: function () {
                var types = ["success", "primary", "warning", "danger"];
                var index = Math.floor(Math.random() * 4);
                _this.type = types[index];
            }, disabled: this.disabled }, extractClass({}, 'wu-button', (_a = {},
            _a['wu-button-' + this.type] = this.type,
            _a['wu-button-' + this.size] = this.size,
            _a['is-plain'] = this.plain,
            _a['is-round'] = this.round,
            _a['is-circle'] = this.circle,
            _a['is-disabled'] = this.disabled,
            _a)), { type: this.nativeType }),
            this.loading && [
                h("svg", { class: "loading", viewBox: "0 0 1024 1024", focusable: "false", "data-icon": "loading", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true" },
                    h("path", { d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" })),
                ' ',
            ],
            this.text,
            h("slot", null)));
    };
    __decorate([
        Prop({ default: 'primary', type: String }),
        __metadata("design:type", String)
    ], WuButton.prototype, "type", void 0);
    __decorate([
        Prop({ default: 'mini', type: String }),
        __metadata("design:type", String)
    ], WuButton.prototype, "size", void 0);
    __decorate([
        Prop({ default: false, type: Boolean }),
        __metadata("design:type", Boolean)
    ], WuButton.prototype, "plain", void 0);
    __decorate([
        Prop({ default: false, type: Boolean }),
        __metadata("design:type", Boolean)
    ], WuButton.prototype, "round", void 0);
    __decorate([
        Prop({ default: false, type: Boolean }),
        __metadata("design:type", Boolean)
    ], WuButton.prototype, "circle", void 0);
    __decorate([
        Prop({ default: false, type: Boolean }),
        __metadata("design:type", Boolean)
    ], WuButton.prototype, "loading", void 0);
    __decorate([
        Prop({ default: false, type: Boolean }),
        __metadata("design:type", Boolean)
    ], WuButton.prototype, "disabled", void 0);
    __decorate([
        Prop({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuButton.prototype, "icon", void 0);
    __decorate([
        Prop({ default: 'button', type: String }),
        __metadata("design:type", String)
    ], WuButton.prototype, "nativeType", void 0);
    __decorate([
        Prop({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuButton.prototype, "text", void 0);
    __decorate([
        State({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuButton.prototype, "text1", void 0);
    __decorate([
        Watch("type"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], WuButton.prototype, "typeChange", null);
    WuButton = __decorate([
        Component({
            name: 'test-com-new1',
            css: css_248z,
        }),
        __metadata("design:paramtypes", [])
    ], WuButton);
    return WuButton;
}(WuComponent));

export { WuButton };
