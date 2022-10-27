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
(function() {
    if (
        // No Reflect, no classes, no need for shim because native custom elements
        // require ES2015 classes or Reflect.
        window.Reflect === undefined ||
        window.customElements === undefined ||
        // The webcomponentsjs custom elements polyfill doesn't require
        // ES2015-compatible construction (`super()` or `Reflect.construct`).
        window.customElements.hasOwnProperty('polyfillWrapFlushCallback')
    ) {
        return;
    }
    const BuiltInHTMLElement = HTMLElement;
    // @ts-ignore
    window.HTMLElement = function HTMLElement() {
        return Reflect.construct(BuiltInHTMLElement, [], this.constructor);
    };
    HTMLElement.prototype = BuiltInHTMLElement.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement);
})();

export function cssToDom(css: string) {
    const node = document.createElement('style');
    node.textContent = css;
    return node;
}

export function camelCase(str: string) {
    return str.replace(/-(\w)/g, ($, $1) => {
        return $1.toUpperCase();
    });
}

export function Fragment(props: any) {
    return props.children;
}

export function extend(obj: any, props: any) {
    for (const i in props) obj[i] = props[i];
    return obj;
}

/** Invoke or update a ref, depending on whether it is a function or object ref.
 *  @param {object|function} [ref=null]
 *  @param {any} [value]
 */
export function applyRef(ref: any, value: any) {
    if (ref != null) {
        if (typeof ref == 'function') ref(value);
        else ref.current = value;
    }
}

/**
 * Call a function asynchronously, as soon as possible. Makes
 * use of HTML Promise to schedule the callback if available,
 * otherwise falling back to `setTimeout` (mainly for IE<11).
 * @type {(callback: function) => void}
 */
export const defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

export function isArray(obj: any) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

export function pathToArr(path: string) {
    if (typeof path !== 'string' || !path) return [];
    // return path.split(/\.|\[|\]/).filter(name => !!name)
    return path
        .replace(/]/g, '')
        .replace(/\[/g, '.')
        .split('.');
}

const hyphenateRE = /\B([A-Z])/g;
// 驼峰转划线
export function hyphenate(str: string) {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
}
// 划线转驼峰
export function hyphenateReverse(str: string) {
    if (str.indexOf('-') > -1) {
        return str.replace(/(\-([a-z]))/g, (match: any, p1: any, p2: any, offset: any, string: any) => {
            // 这里有两个捕获组，第一个捕获组捕获全部并包含了第二个捕获组，所以match等于p1
            return p2.toUpperCase();
        });
    }
    return str;
}

export function capitalize(name: string) {
    return name
        .replace(/\-(\w)/g, function (all, letter) {
            return letter.toUpperCase();
        })
        .replace(/^\S/, (s) => s.toUpperCase());
}

export function getValByPath(path: string, current: any) {
    const arr = pathToArr(path);
    arr.forEach(prop => {
        current = current[prop];
    });
    return current;
}

export function removeItem(item: any, arr: any) {
    if (!arr) return;
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === item) {
            arr.splice(i, 1);
            break;
        }
    }
}

export function getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
