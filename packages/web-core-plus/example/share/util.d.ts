/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
export declare function cssToDom(css: string): HTMLStyleElement;
export declare function camelCase(str: string): string;
export declare function Fragment(props: any): any;
export declare function extend(obj: any, props: any): any;
/** Invoke or update a ref, depending on whether it is a function or object ref.
 *  @param {object|function} [ref=null]
 *  @param {any} [value]
 */
export declare function applyRef(ref: any, value: any): void;
/**
 * Call a function asynchronously, as soon as possible. Makes
 * use of HTML Promise to schedule the callback if available,
 * otherwise falling back to `setTimeout` (mainly for IE<11).
 * @type {(callback: function) => void}
 */
export declare const defer: any;
export declare function isArray(obj: any): boolean;
export declare function pathToArr(path: string): string[];
export declare function hyphenate(str: string): string;
export declare function hyphenateReverse(str: string): string;
export declare function capitalize(name: string): string;
export declare function getValByPath(path: string, current: any): any;
export declare function removeItem(item: any, arr: any): void;
export declare function getGuid(): string;
