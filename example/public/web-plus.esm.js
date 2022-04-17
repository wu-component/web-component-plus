/*! *****************************************************************************
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

var extendStatics$1 = function(d, b) {
    extendStatics$1 = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics$1(d, b);
};

function __extends$1(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics$1(d, b);
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

/*! *****************************************************************************
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

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var Reflect$1;
(function (Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function (factory) {
        var root = typeof commonjsGlobal === "object" ? commonjsGlobal :
            typeof self === "object" ? self :
                typeof this === "object" ? this :
                    Function("return this;")();
        var exporter = makeExporter(Reflect);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        else {
            exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter);
        function makeExporter(target, previous) {
            return function (key, value) {
                if (typeof target[key] !== "function") {
                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                }
                if (previous)
                    previous(key, value);
            };
        }
    })(function (exporter) {
        var hasOwn = Object.prototype.hasOwnProperty;
        // feature test for Symbol support
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
            create: supportsCreate
                ? function () { return MakeDictionary(Object.create(null)); }
                : supportsProto
                    ? function () { return MakeDictionary({ __proto__: null }); }
                    : function () { return MakeDictionary({}); },
            has: downLevel
                ? function (map, key) { return hasOwn.call(map, key); }
                : function (map, key) { return key in map; },
            get: downLevel
                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                : function (map, key) { return map[key]; },
        };
        // Load global or shim versions of Map, Set, and WeakMap
        var functionPrototype = Object.getPrototypeOf(Function);
        var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        // [[Metadata]] internal slot
        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
        var Metadata = new _WeakMap();
        /**
         * Applies a set of decorators to a property of a target object.
         * @param decorators An array of decorators.
         * @param target The target object.
         * @param propertyKey (Optional) The property key to decorate.
         * @param attributes (Optional) The property descriptor for the target key.
         * @remarks Decorators are applied in reverse order.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Example = Reflect.decorate(decoratorsArray, Example);
         *
         *     // property (on constructor)
         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Object.defineProperty(Example, "staticMethod",
         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
         *
         *     // method (on prototype)
         *     Object.defineProperty(Example.prototype, "method",
         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
         *
         */
        function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                    throw new TypeError();
                if (IsNull(attributes))
                    attributes = undefined;
                propertyKey = ToPropertyKey(propertyKey);
                return DecorateProperty(decorators, target, propertyKey, attributes);
            }
            else {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsConstructor(target))
                    throw new TypeError();
                return DecorateConstructor(decorators, target);
            }
        }
        exporter("decorate", decorate);
        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
        /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter.
         * @param metadataKey The key for the metadata entry.
         * @param metadataValue The value for the metadata entry.
         * @returns A decorator function.
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten.
         * @example
         *
         *     // constructor
         *     @Reflect.metadata(key, value)
         *     class Example {
         *     }
         *
         *     // property (on constructor, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticProperty;
         *     }
         *
         *     // property (on prototype, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         property;
         *     }
         *
         *     // method (on constructor)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticMethod() { }
         *     }
         *
         *     // method (on prototype)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         method() { }
         *     }
         *
         */
        function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
        }
        exporter("metadata", metadata);
        /**
         * Define a unique metadata entry on the target.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param metadataValue A value that contains attached metadata.
         * @param target The target object on which to define metadata.
         * @param propertyKey (Optional) The property key for the target.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Reflect.defineMetadata("custom:annotation", options, Example);
         *
         *     // property (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         *     // method (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *     // decorator factory as metadata-producing annotation.
         *     function MyAnnotation(options): Decorator {
         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         *     }
         *
         */
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        /**
         * Gets a value indicating whether the target object has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        /**
         * Gets the metadata keys defined on the target object or its prototype chain.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
         *
         */
        function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        /**
         * Gets the unique metadata keys defined on the target object.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         *
         */
        function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        /**
         * Deletes the metadata entry from the target object with the provided key.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            if (!metadataMap.delete(metadataKey))
                return false;
            if (metadataMap.size > 0)
                return true;
            var targetMetadata = Metadata.get(target);
            targetMetadata.delete(propertyKey);
            if (targetMetadata.size > 0)
                return true;
            Metadata.delete(target);
            return true;
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsConstructor(decorated))
                        throw new TypeError();
                    target = decorated;
                }
            }
            return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target, propertyKey, descriptor);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsObject(decorated))
                        throw new TypeError();
                    descriptor = decorated;
                }
            }
            return descriptor;
        }
        function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = Metadata.get(O);
            if (IsUndefined(targetMetadata)) {
                if (!Create)
                    return undefined;
                targetMetadata = new _Map();
                Metadata.set(O, targetMetadata);
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
                if (!Create)
                    return undefined;
                metadataMap = new _Map();
                targetMetadata.set(P, metadataMap);
            }
            return metadataMap;
        }
        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return true;
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryHasMetadata(MetadataKey, parent, P);
            return false;
        }
        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            return ToBoolean(metadataMap.has(MetadataKey));
        }
        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryGetMetadata(MetadataKey, parent, P);
            return undefined;
        }
        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return undefined;
            return metadataMap.get(MetadataKey);
        }
        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
            metadataMap.set(MetadataKey, MetadataValue);
        }
        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
        function OrdinaryMetadataKeys(O, P) {
            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (parent === null)
                return ownKeys;
            var parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0)
                return ownKeys;
            if (ownKeys.length <= 0)
                return parentKeys;
            var set = new _Set();
            var keys = [];
            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                var key = ownKeys_1[_i];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                var key = parentKeys_1[_a];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            return keys;
        }
        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
        function OrdinaryOwnMetadataKeys(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
                var next = IteratorStep(iterator);
                if (!next) {
                    keys.length = k;
                    return keys;
                }
                var nextValue = IteratorValue(next);
                try {
                    keys[k] = nextValue;
                }
                catch (e) {
                    try {
                        IteratorClose(iterator);
                    }
                    finally {
                        throw e;
                    }
                }
                k++;
            }
        }
        // 6 ECMAScript Data Typ0es and Values
        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
        function Type(x) {
            if (x === null)
                return 1 /* Null */;
            switch (typeof x) {
                case "undefined": return 0 /* Undefined */;
                case "boolean": return 2 /* Boolean */;
                case "string": return 3 /* String */;
                case "symbol": return 4 /* Symbol */;
                case "number": return 5 /* Number */;
                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                default: return 6 /* Object */;
            }
        }
        // 6.1.1 The Undefined Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
        function IsUndefined(x) {
            return x === undefined;
        }
        // 6.1.2 The Null Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
        function IsNull(x) {
            return x === null;
        }
        // 6.1.5 The Symbol Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
        function IsSymbol(x) {
            return typeof x === "symbol";
        }
        // 6.1.7 The Object Type
        // https://tc39.github.io/ecma262/#sec-object-type
        function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
        }
        // 7.1 Type Conversion
        // https://tc39.github.io/ecma262/#sec-type-conversion
        // 7.1.1 ToPrimitive(input [, PreferredType])
        // https://tc39.github.io/ecma262/#sec-toprimitive
        function ToPrimitive(input, PreferredType) {
            switch (Type(input)) {
                case 0 /* Undefined */: return input;
                case 1 /* Null */: return input;
                case 2 /* Boolean */: return input;
                case 3 /* String */: return input;
                case 4 /* Symbol */: return input;
                case 5 /* Number */: return input;
            }
            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== undefined) {
                var result = exoticToPrim.call(input, hint);
                if (IsObject(result))
                    throw new TypeError();
                return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
        function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
                var toString_1 = O.toString;
                if (IsCallable(toString_1)) {
                    var result = toString_1.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            else {
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var toString_2 = O.toString;
                if (IsCallable(toString_2)) {
                    var result = toString_2.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            throw new TypeError();
        }
        // 7.1.2 ToBoolean(argument)
        // https://tc39.github.io/ecma262/2016/#sec-toboolean
        function ToBoolean(argument) {
            return !!argument;
        }
        // 7.1.12 ToString(argument)
        // https://tc39.github.io/ecma262/#sec-tostring
        function ToString(argument) {
            return "" + argument;
        }
        // 7.1.14 ToPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-topropertykey
        function ToPropertyKey(argument) {
            var key = ToPrimitive(argument, 3 /* String */);
            if (IsSymbol(key))
                return key;
            return ToString(key);
        }
        // 7.2 Testing and Comparison Operations
        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
        // 7.2.2 IsArray(argument)
        // https://tc39.github.io/ecma262/#sec-isarray
        function IsArray(argument) {
            return Array.isArray
                ? Array.isArray(argument)
                : argument instanceof Object
                    ? argument instanceof Array
                    : Object.prototype.toString.call(argument) === "[object Array]";
        }
        // 7.2.3 IsCallable(argument)
        // https://tc39.github.io/ecma262/#sec-iscallable
        function IsCallable(argument) {
            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
            return typeof argument === "function";
        }
        // 7.2.4 IsConstructor(argument)
        // https://tc39.github.io/ecma262/#sec-isconstructor
        function IsConstructor(argument) {
            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
            return typeof argument === "function";
        }
        // 7.2.7 IsPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-ispropertykey
        function IsPropertyKey(argument) {
            switch (Type(argument)) {
                case 3 /* String */: return true;
                case 4 /* Symbol */: return true;
                default: return false;
            }
        }
        // 7.3 Operations on Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-objects
        // 7.3.9 GetMethod(V, P)
        // https://tc39.github.io/ecma262/#sec-getmethod
        function GetMethod(V, P) {
            var func = V[P];
            if (func === undefined || func === null)
                return undefined;
            if (!IsCallable(func))
                throw new TypeError();
            return func;
        }
        // 7.4 Operations on Iterator Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
        function GetIterator(obj) {
            var method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method))
                throw new TypeError(); // from Call
            var iterator = method.call(obj);
            if (!IsObject(iterator))
                throw new TypeError();
            return iterator;
        }
        // 7.4.4 IteratorValue(iterResult)
        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
        function IteratorValue(iterResult) {
            return iterResult.value;
        }
        // 7.4.5 IteratorStep(iterator)
        // https://tc39.github.io/ecma262/#sec-iteratorstep
        function IteratorStep(iterator) {
            var result = iterator.next();
            return result.done ? false : result;
        }
        // 7.4.6 IteratorClose(iterator, completion)
        // https://tc39.github.io/ecma262/#sec-iteratorclose
        function IteratorClose(iterator) {
            var f = iterator["return"];
            if (f)
                f.call(iterator);
        }
        // 9.1 Ordinary Object Internal Methods and Internal Slots
        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
        function OrdinaryGetPrototypeOf(O) {
            var proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype)
                return proto;
            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
            // Try to determine the superclass constructor. Compatible implementations
            // must either set __proto__ on a subclass constructor to the superclass constructor,
            // or ensure each class has a valid `constructor` property on its prototype that
            // points back to the constructor.
            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
            // This is the case when in ES6 or when using __proto__ in a compatible browser.
            if (proto !== functionPrototype)
                return proto;
            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
            var prototype = O.prototype;
            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype)
                return proto;
            // If the constructor was not a function, then we cannot determine the heritage.
            var constructor = prototypeProto.constructor;
            if (typeof constructor !== "function")
                return proto;
            // If we have some kind of self-reference, then we cannot determine the heritage.
            if (constructor === O)
                return proto;
            // we have a pretty good guess at the heritage.
            return constructor;
        }
        // naive Map shim
        function CreateMapPolyfill() {
            var cacheSentinel = {};
            var arraySentinel = [];
            var MapIterator = /** @class */ (function () {
                function MapIterator(keys, values, selector) {
                    this._index = 0;
                    this._keys = keys;
                    this._values = values;
                    this._selector = selector;
                }
                MapIterator.prototype["@@iterator"] = function () { return this; };
                MapIterator.prototype[iteratorSymbol] = function () { return this; };
                MapIterator.prototype.next = function () {
                    var index = this._index;
                    if (index >= 0 && index < this._keys.length) {
                        var result = this._selector(this._keys[index], this._values[index]);
                        if (index + 1 >= this._keys.length) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        else {
                            this._index++;
                        }
                        return { value: result, done: false };
                    }
                    return { value: undefined, done: true };
                };
                MapIterator.prototype.throw = function (error) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    throw error;
                };
                MapIterator.prototype.return = function (value) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    return { value: value, done: true };
                };
                return MapIterator;
            }());
            return /** @class */ (function () {
                function Map() {
                    this._keys = [];
                    this._values = [];
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                Object.defineProperty(Map.prototype, "size", {
                    get: function () { return this._keys.length; },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                Map.prototype.get = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    return index >= 0 ? this._values[index] : undefined;
                };
                Map.prototype.set = function (key, value) {
                    var index = this._find(key, /*insert*/ true);
                    this._values[index] = value;
                    return this;
                };
                Map.prototype.delete = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    if (index >= 0) {
                        var size = this._keys.length;
                        for (var i = index + 1; i < size; i++) {
                            this._keys[i - 1] = this._keys[i];
                            this._values[i - 1] = this._values[i];
                        }
                        this._keys.length--;
                        this._values.length--;
                        if (key === this._cacheKey) {
                            this._cacheKey = cacheSentinel;
                            this._cacheIndex = -2;
                        }
                        return true;
                    }
                    return false;
                };
                Map.prototype.clear = function () {
                    this._keys.length = 0;
                    this._values.length = 0;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                };
                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                Map.prototype["@@iterator"] = function () { return this.entries(); };
                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                Map.prototype._find = function (key, insert) {
                    if (this._cacheKey !== key) {
                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                    }
                    if (this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length;
                        this._keys.push(key);
                        this._values.push(undefined);
                    }
                    return this._cacheIndex;
                };
                return Map;
            }());
            function getKey(key, _) {
                return key;
            }
            function getValue(_, value) {
                return value;
            }
            function getEntry(key, value) {
                return [key, value];
            }
        }
        // naive Set shim
        function CreateSetPolyfill() {
            return /** @class */ (function () {
                function Set() {
                    this._map = new _Map();
                }
                Object.defineProperty(Set.prototype, "size", {
                    get: function () { return this._map.size; },
                    enumerable: true,
                    configurable: true
                });
                Set.prototype.has = function (value) { return this._map.has(value); };
                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                Set.prototype.delete = function (value) { return this._map.delete(value); };
                Set.prototype.clear = function () { this._map.clear(); };
                Set.prototype.keys = function () { return this._map.keys(); };
                Set.prototype.values = function () { return this._map.values(); };
                Set.prototype.entries = function () { return this._map.entries(); };
                Set.prototype["@@iterator"] = function () { return this.keys(); };
                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                return Set;
            }());
        }
        // naive WeakMap shim
        function CreateWeakMapPolyfill() {
            var UUID_SIZE = 16;
            var keys = HashMap.create();
            var rootKey = CreateUniqueKey();
            return /** @class */ (function () {
                function WeakMap() {
                    this._key = CreateUniqueKey();
                }
                WeakMap.prototype.has = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.has(table, this._key) : false;
                };
                WeakMap.prototype.get = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
                };
                WeakMap.prototype.set = function (target, value) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                    table[this._key] = value;
                    return this;
                };
                WeakMap.prototype.delete = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? delete table[this._key] : false;
                };
                WeakMap.prototype.clear = function () {
                    // NOTE: not a real clear, just makes the previous data unreachable
                    this._key = CreateUniqueKey();
                };
                return WeakMap;
            }());
            function CreateUniqueKey() {
                var key;
                do
                    key = "@@WeakMap@@" + CreateUUID();
                while (HashMap.has(keys, key));
                keys[key] = true;
                return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
                if (!hasOwn.call(target, rootKey)) {
                    if (!create)
                        return undefined;
                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
                }
                return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
                for (var i = 0; i < size; ++i)
                    buffer[i] = Math.random() * 0xff | 0;
                return buffer;
            }
            function GenRandomBytes(size) {
                if (typeof Uint8Array === "function") {
                    if (typeof crypto !== "undefined")
                        return crypto.getRandomValues(new Uint8Array(size));
                    if (typeof msCrypto !== "undefined")
                        return msCrypto.getRandomValues(new Uint8Array(size));
                    return FillRandomBytes(new Uint8Array(size), size);
                }
                return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
                var data = GenRandomBytes(UUID_SIZE);
                // mark as random - RFC 4122 § 4.4
                data[6] = data[6] & 0x4f | 0x40;
                data[8] = data[8] & 0xbf | 0x80;
                var result = "";
                for (var offset = 0; offset < UUID_SIZE; ++offset) {
                    var byte = data[offset];
                    if (offset === 4 || offset === 6 || offset === 8)
                        result += "-";
                    if (byte < 16)
                        result += "0";
                    result += byte.toString(16).toLowerCase();
                }
                return result;
            }
        }
        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
        function MakeDictionary(obj) {
            obj.__ = undefined;
            delete obj.__;
            return obj;
        }
    });
})(Reflect$1 || (Reflect$1 = {}));

function getGlobal() {
    return (self || window ||
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
// DOM properties that should NOT have "px" added when numeric
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
var PROP_META_KEY = 'PROP_META_KEY';
var STATE_META_KEY = 'STATE_META_KEY';
var COMPONENT_CUSTOM_EVENT = 'COMPONENT_CUSTOM_EVENT';
var COMPONENT_WATCH = 'COMPONENT_WATCH';

/**
 * 格式化数据类型
 */
function formatValue(val, type, defaultValue) {
    var newValue = undefined;
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
                newValue = JSON.parse(val.replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?:([^\/])/g, '"$2":$4')
                    .replace(/'([\s\S]*?)'/g, '"$1"')
                    .replace(/,(\s*})/g, '$1'));
                break;
            default:
                newValue = val;
                break;
        }
    }
    else {
        newValue = defaultValue || null;
    }
    return newValue;
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
    var node = isSvg
        ? document.createElementNS('http://www.w3.org/2000/svg', nodeName)
        : document.createElement(nodeName);
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

var isObject = function (val) { return val != null && typeof val === 'object' && Array.isArray(val) === false; };
var toDotCase = function (str) {
    return str.replace(/(?!^)([A-Z])/g, ' $1')
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
typeof Promise == 'function'
    ? Promise.resolve().then.bind(Promise.resolve())
    : setTimeout;
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
var hyphenateRE = /\B([A-Z])/g;
function hyphenate(str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
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
                node.style[i] =
                    typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false
                        ? value[i] + 'px'
                        : value[i];
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
    else if (name !== 'list' &&
        name !== 'type' &&
        name !== 'css' &&
        !isSvg &&
        name in node &&
        value !== '') {
        //value !== '' fix for selected, disabled, checked with pure element
        // Attempt to set a DOM property to the given value.
        // IE & FF throw for certain property-value combinations.
        try {
            node[name] = value == null ? '' : value;
        }
        catch (e) { }
        if ((value == null || value === false) && name != 'spellcheck')
            node.pureRemoveAttribute
                ? node.pureRemoveAttribute(name)
                : node.removeAttribute(name);
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
                node.pureRemoveAttribute
                    ? node.pureRemoveAttribute(name)
                    : node.removeAttribute(name);
        }
        else if (typeof value !== 'function') {
            if (ns) {
                node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);
            }
            else {
                node.pureSetAttribute
                    ? node.pureSetAttribute(name, value)
                    : node.setAttribute(name, value);
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
    isSvgMode =
        vnodeName === 'svg'
            ? true
            : vnodeName === 'foreignObject'
                ? false
                : isSvgMode;
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
    if (!hydrating &&
        vchildren &&
        vchildren.length === 1 &&
        typeof vchildren[0] === 'string' &&
        fc != null &&
        fc.splitText !== undefined &&
        fc.nextSibling == null) {
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
            var child_1 = originalChildren[i], props = child_1[ATTR_KEY], key = vlen && props
                ? child_1._component
                    ? child_1._component.__key
                    : props.key
                : null;
            if (key != null) {
                keyedLen++;
                keyed[key] = child_1;
            }
            else if (props ||
                (child_1.splitText !== undefined
                    ? isHydrating
                        ? child_1.nodeValue.trim()
                        : true
                    : isHydrating)) {
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
                        if (children[j] !== undefined &&
                            isSameNodeType((c = children[j]), vchild, isHydrating)) {
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
        else if (name !== 'children' &&
            (!(name in old) ||
                attrs[name] !==
                    (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
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
        key: attributes == null ? undefined : attributes.key
    };
    // if a "vnode hook" is defined, pass every created VNode to it
    if (webOptions.vnode !== undefined)
        webOptions.vnode(p);
    return p;
}

/**
 * 数据响应式处理逻辑
 * @param keys
 * @param functions
 * @param customElement
 */
function injectKeys(keys, functions, customElement) {
    var onlyFunctions = [];
    var _loop_1 = function (i) {
        var current = keys.find(function (item) { return item.attr === functions[i].path; });
        if (!current) {
            onlyFunctions.push(functions[i]);
        }
    };
    for (var i = 0; i < functions.length; i++) {
        _loop_1(i);
    }
    keys.forEach(function (props) {
        var attr = "__".concat(props.attr, "__props__");
        Object.defineProperty(customElement.prototype, props.attr, {
            get: function () {
                if (this[attr] || typeof this[attr] === "boolean" || this[attr] === null) {
                    return this[attr];
                }
                return props.default || undefined;
            },
            set: function (val) {
                var _a;
                var oldValue = isObject(this[attr]) || Array.isArray(this[attr]) ? JSON.parse(JSON.stringify(this[attr])) : this[attr];
                this[attr] = formatValue(val, props.type, props.default);
                (_a = customElement.prototype) === null || _a === void 0 ? void 0 : _a.update.call(this);
                var watch = functions.find(function (item) { return item.path === props.attr; });
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
function injectWatch(functions, customElement) {
    functions.forEach(function (props) {
        var attr = "__".concat(props.path, "__watch__");
        Object.defineProperty(customElement.prototype, props.path, {
            get: function () {
                return this[attr];
            },
            set: function (val) {
                var oldValue = isObject(this[attr]) || Array.isArray(this[attr]) ? JSON.parse(JSON.stringify(this[attr])) : this[attr];
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
function injectEmit(functions, customElement) {
    functions.forEach(function (event) {
        Object.defineProperty(customElement.prototype, event.methodName, {
            get: function () {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var result = event.methodFun.call(this, args);
                    if (result) {
                        var evtName = (event.eventName) ? event.eventName : toDotCase(event.methodName);
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
function injectState(stateList, customElement) {
    stateList.forEach(function (props) {
    });
}
/**
 * 组件装饰器
 * @param options
 * @constructor
 */
function Component(options) {
    return function (target) {
        var _a, _b, _c, _d;
        var _e;
        var keys = (_a = Reflect.getMetadata(PROP_META_KEY, target.prototype)) !== null && _a !== void 0 ? _a : [];
        var functions = (_b = Reflect.getMetadata(COMPONENT_CUSTOM_EVENT, target.prototype)) !== null && _b !== void 0 ? _b : [];
        var watchs = (_c = Reflect.getMetadata(COMPONENT_WATCH, target.prototype)) !== null && _c !== void 0 ? _c : [];
        var statesList = (_d = Reflect.getMetadata(STATE_META_KEY, target.prototype)) !== null && _d !== void 0 ? _d : [];
        var keysList = keys.map(function (item) { return item.attr; });
        // 数据处理成响应式
        var customElement = (_e = /** @class */ (function (_super) {
                __extends(class_1, _super);
                function class_1() {
                    var _this = _super.call(this) || this;
                    _this._shadowRootDom = null;
                    _this.rootNode = null;
                    _this.isInstalled = false;
                    _this.willUpdate = false;
                    _this._customStyleContent = '';
                    _this.props = {};
                    _this.prevProps = {};
                    _this._customStyleElement = null;
                    _this._shadowRoot = null;
                    _this.store = {};
                    _this.__keyList__ = keys;
                    return _this;
                }
                Object.defineProperty(class_1, "observedAttributes", {
                    get: function () {
                        return [];
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * 属性移除
                 * @param key
                 */
                class_1.prototype.removeAttribute = function (key) {
                    _super.prototype.removeAttribute.call(this, key);
                    this.isInstalled && this.update();
                };
                /**
                 * 设置属性
                 * @param key
                 * @param val
                 */
                class_1.prototype.setAttribute = function (key, val) {
                    if (val && typeof val === 'object') {
                        _super.prototype.setAttribute.call(this, key, JSON.stringify(val));
                    }
                    else {
                        _super.prototype.setAttribute.call(this, key, val);
                    }
                    if (this.isInstalled) {
                        this[key] = val;
                    }
                };
                /**
                 * 属性变化
                 */
                class_1.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
                    var _a;
                    (_a = _super.prototype.attributeChangedCallback) === null || _a === void 0 ? void 0 : _a.call(this, name, oldValue, newValue);
                    this.update([], false);
                };
                /**
                 * 组件更新
                 * @param ignoreAttrs
                 * @param updateSelf
                 */
                class_1.prototype.update = function (ignoreAttrs, updateSelf) {
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
                    var rendered = this.render(this.props, this.store);
                    this.rendered();
                    this.rootNode = diff(this.rootNode, rendered, (this === null || this === void 0 ? void 0 : this.shadowRoot) || (this === null || this === void 0 ? void 0 : this._shadowRootDom) || this, this, updateSelf);
                    this.willUpdate = false;
                    this.updated();
                };
                /**
                 * 初始化影子dom
                 * @private
                 */
                class_1.prototype.initShadowRoot = function () {
                    var shadowRoot;
                    if (this.constructor.isLightDom) {
                        shadowRoot = this;
                    }
                    else {
                        shadowRoot = this.shadowRoot || this.attachShadow({ mode: 'open' });
                        var fc = void 0;
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
                };
                /***
                 * 挂载自定义组件
                 */
                class_1.prototype.connectedCallback = function () {
                    var shadowRoot = this.initShadowRoot();
                    this.attrsToProps();
                    this.beforeInstall();
                    this.install();
                    this.afterInstall();
                    this.beforeRender();
                    var rendered = this.render();
                    this.rootNode = diff(null, rendered, null, this);
                    if (Array.isArray(this.rootNode)) {
                        this.rootNode.forEach(function (item) { return shadowRoot.appendChild(item); });
                    }
                    else {
                        this.rootNode && shadowRoot.appendChild(this.rootNode);
                    }
                    this._shadowRootDom = shadowRoot;
                    this._shadowRoot = shadowRoot;
                    this.isInstalled = true;
                    this.rendered();
                    this.connected(shadowRoot);
                };
                /**
                 * 组件销毁
                 */
                class_1.prototype.disconnectedCallback = function () {
                    this.disConnected();
                };
                /**
                 * 组件挂载
                 */
                class_1.prototype.connected = function (shadowRoot) {
                    var _a;
                    (_a = _super.prototype.connected) === null || _a === void 0 ? void 0 : _a.call(this, shadowRoot);
                };
                /**
                 * 组件卸载
                 */
                class_1.prototype.disConnected = function () {
                    var _a;
                    (_a = _super.prototype.disConnected) === null || _a === void 0 ? void 0 : _a.call(this);
                };
                /**
                 * 组件更新前检查
                 */
                class_1.prototype.preBeforeUpdate = function () {
                    var _a;
                    if (_super.prototype.preBeforeUpdate) {
                        return (_a = _super.prototype.preBeforeUpdate) === null || _a === void 0 ? void 0 : _a.call(this);
                    }
                    return true;
                };
                /**
                 * 更新前
                 */
                class_1.prototype.beforeUpdate = function () {
                    var _a;
                    (_a = _super.prototype.beforeUpdate) === null || _a === void 0 ? void 0 : _a.call(this);
                };
                /**
                 * 更新完成
                 */
                class_1.prototype.updated = function () {
                    var _a;
                    (_a = _super.prototype.updated) === null || _a === void 0 ? void 0 : _a.call(this);
                };
                /**
                 * 强制刷新
                 */
                class_1.prototype.forceUpdate = function () {
                    this.update([], true);
                };
                /**
                 * 更新属性
                 * @param obj
                 */
                class_1.prototype.updateProps = function (obj) {
                    var _this = this;
                    Object.keys(obj).forEach(function (key) {
                        // @ts-ignore
                        _this.props[key] = obj[key];
                        if (_this.prevProps) {
                            // @ts-ignore
                            _this.prevProps[key] = obj[key];
                        }
                    });
                    this.forceUpdate();
                };
                /**
                 * 屬性值初始化
                 * @param ignoreAttrs
                 */
                class_1.prototype.attrsToProps = function (ignoreAttrs) {
                    var _this = this;
                    var ele = this;
                    if (!keysList)
                        return;
                    keys.forEach(function (key) {
                        var val = ele.getAttribute(hyphenate(key.attr));
                        _this[key.attr] = formatValue(val, key.type, key.default);
                    });
                };
                /**
                 * 事件
                 * @param evtName
                 * @param result
                 */
                class_1.prototype._dispatchEvent = function (evtName, result) {
                    if (this === null || this === void 0 ? void 0 : this.shadowRoot) {
                        this === null || this === void 0 ? void 0 : this.shadowRoot.dispatchEvent(new CustomEvent(evtName, {
                            detail: result || null,
                            bubbles: true,
                            composed: true // 设置为可穿透组件
                        }));
                        return;
                    }
                    if (this === null || this === void 0 ? void 0 : this._shadowRootDom) {
                        this === null || this === void 0 ? void 0 : this._shadowRootDom.dispatchEvent(new CustomEvent(evtName, {
                            detail: result || null,
                            bubbles: true,
                            composed: true // 设置为可穿透组件
                        }));
                        return;
                    }
                    this.dispatchEvent(new CustomEvent(evtName, {
                        detail: result || null,
                        bubbles: true,
                        composed: true // 设置为可穿透组件
                    }));
                };
                class_1.prototype.beforeInstall = function () {
                    var _a;
                    (_a = _super.prototype.beforeInstall) === null || _a === void 0 ? void 0 : _a.call(this);
                };
                class_1.prototype.install = function () {
                    var _a;
                    (_a = _super.prototype.install) === null || _a === void 0 ? void 0 : _a.call(this);
                };
                class_1.prototype.afterInstall = function () {
                    var _a;
                    (_a = _super.prototype.afterInstall) === null || _a === void 0 ? void 0 : _a.call(this);
                };
                /**
                 * 渲染前
                 */
                class_1.prototype.beforeRender = function () {
                    var _a;
                    (_a = _super.prototype.beforeRender) === null || _a === void 0 ? void 0 : _a.call(this);
                };
                /**
                 * 渲染结束
                 */
                class_1.prototype.rendered = function () {
                    var _a;
                    (_a = _super.prototype.rendered) === null || _a === void 0 ? void 0 : _a.call(this);
                };
                return class_1;
            }(target)),
            _e.is = 'CustomWebComponent',
            _e);
        Reflect.defineMetadata(COMPONENT_CUSTOM_EVENT, target, customElement);
        // 数据响应式处理
        injectKeys(keys, watchs, customElement);
        // 事件代理处理
        injectEmit(functions, customElement);
        injectState(statesList);
        if (!customElements.get(options.name)) {
            customElements.define(options.name, customElement, options.options || {});
        }
        return customElement;
    };
}

/**
 * 属性装饰器
 * @param options
 * @constructor
 */
function Prop(options) {
    if (options === void 0) { options = { default: undefined }; }
    return function (target, attr) {
        var _a;
        var value = options.default || options.default || undefined;
        var keys = (_a = Reflect.getMetadata(PROP_META_KEY, target)) !== null && _a !== void 0 ? _a : [];
        keys.push({ default: value, type: options.type, attr: attr });
        Reflect.defineMetadata(PROP_META_KEY, keys, target);
    };
}

function Emit(event) {
    return function (target, methodName, desc) {
        var _a;
        var functions = (_a = Reflect.getMetadata(COMPONENT_CUSTOM_EVENT, target)) !== null && _a !== void 0 ? _a : [];
        var methodFun = desc.value;
        var eventName = (event) ? event : toDotCase(methodName);
        functions.push({ methodName: methodName, methodFun: methodFun, eventName: eventName });
        Reflect.defineMetadata(COMPONENT_CUSTOM_EVENT, functions, target);
    };
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

var css_248z$3 = "@charset \"UTF-8\";\n/**********************系统级别配置*******************************/\n/**********************基本颜色***************************/\n/* Disable base\n-------------------------- */\n/* Transition\n-------------------------- */\n/* Color\n-------------------------- */\n/* 53a8ff */\n/* 66b1ff */\n/* 79bbff */\n/* 8cc5ff */\n/* a0cfff */\n/* b3d8ff */\n/* c6e2ff */\n/* d9ecff */\n/* ecf5ff */\n/**********************基本边框***************************/\n/**********************盒模型阴影*************************/\n/**********************基本字体*************************/\n/**********************Button***************************/\n/**************************Radio****************************/\n/* Input-------------------------- */\n/* BEM support Func\n -------------------------- */\n/* Scrollbar\n -------------------------- */\n/* Placeholder\n -------------------------- */\n:host {\n  display: inline-block;\n}\n\n:host([block]) {\n  display: block;\n}\n\n.wu-button {\n  display: inline-block;\n  line-height: 1;\n  white-space: nowrap;\n  cursor: pointer;\n  background: #FFFFFF;\n  border: 1px solid #C0C4CC;\n  color: #606266;\n  -webkit-appearance: none;\n  text-align: center;\n  box-sizing: border-box;\n  outline: none;\n  margin: 0;\n  transition: 0.1s;\n  font-weight: 500;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  padding: 12px 20px;\n  font-size: 14px;\n  border-radius: 4px;\n}\n.wu-button + .wu-button {\n  margin-left: 10px;\n}\n.wu-button.is-round {\n  padding: 12px 20px;\n}\n.wu-button:hover, .wu-button:focus {\n  color: #409EFF;\n  border-color: #c6e2ff;\n  background-color: #ecf5ff;\n}\n.wu-button:active {\n  color: #3a8ee6;\n  border-color: #3a8ee6;\n  outline: none;\n}\n.wu-button::-moz-focus-inner {\n  border: 0;\n}\n.wu-button [class*=wu-icon-] + span {\n  margin-left: 5px;\n}\n.wu-button.is-plain:hover, .wu-button.is-plain:focus {\n  background: #FFFFFF;\n  border-color: #409EFF;\n  color: #409EFF;\n}\n.wu-button.is-plain:active {\n  background: #FFFFFF;\n  border-color: #3a8ee6;\n  color: #3a8ee6;\n  outline: none;\n}\n\n.wu-button.is-active {\n  color: #3a8ee6;\n  border-color: #3a8ee6;\n}\n\n.wu-button.is-disabled, .wu-button.is-disabled:hover, .wu-button.is-disabled:focus {\n  color: #C0C4CC;\n  cursor: not-allowed;\n  background-image: none;\n  background-color: #FFFFFF;\n  border-color: #EBEEF5;\n}\n.wu-button.is-disabled.wu-button--text {\n  background-color: transparent;\n}\n.wu-button.is-disabled.is-plain, .wu-button.is-disabled.is-plain:hover, .wu-button.is-disabled.is-plain:focus {\n  background-color: #FFFFFF;\n  border-color: #EBEEF5;\n  color: #C0C4CC;\n}\n\n.wu-button.is-loading {\n  position: relative;\n  pointer-events: none;\n}\n.wu-button.is-loading:before {\n  pointer-events: none;\n  content: \"\";\n  position: absolute;\n  left: -1px;\n  top: -1px;\n  right: -1px;\n  bottom: -1px;\n  border-radius: inherit;\n  background-color: rgba(255, 255, 255, 0.35);\n}\n\n.wu-button.is-round {\n  border-radius: 20px;\n  padding: 12px 23px;\n}\n\n.wu-button.is-circle {\n  border-radius: 50%;\n  padding: 12px;\n}\n\n.wu-button-primary {\n  color: #FFFFFF;\n  background-color: #409EFF;\n  border-color: #409EFF;\n}\n.wu-button-primary:hover, .wu-button-primary:focus {\n  background: #66b1ff;\n  border-color: #66b1ff;\n  color: #FFFFFF;\n}\n.wu-button-primary:active {\n  background: #3a8ee6;\n  border-color: #3a8ee6;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-primary.is-active {\n  background: #3a8ee6;\n  border-color: #3a8ee6;\n  color: #FFFFFF;\n}\n.wu-button-primary.is-disabled, .wu-button-primary.is-disabled:hover, .wu-button-primary.is-disabled:focus, .wu-button-primary.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #a0cfff;\n  border-color: #a0cfff;\n}\n.wu-button-primary.is-plain {\n  color: #409EFF;\n  background: #ecf5ff;\n  border-color: #b3d8ff;\n}\n.wu-button-primary.is-plain:hover, .wu-button-primary.is-plain:focus {\n  background: #409EFF;\n  border-color: #409EFF;\n  color: #FFFFFF;\n}\n.wu-button-primary.is-plain:active {\n  background: #3a8ee6;\n  border-color: #3a8ee6;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-primary.is-plain.is-disabled, .wu-button-primary.is-plain.is-disabled:hover, .wu-button-primary.is-plain.is-disabled:focus, .wu-button-primary.is-plain.is-disabled:active {\n  color: #8cc5ff;\n  background-color: #ecf5ff;\n  border-color: #d9ecff;\n}\n\n.wu-button-success {\n  color: #FFFFFF;\n  background-color: #67C23A;\n  border-color: #67C23A;\n}\n.wu-button-success:hover, .wu-button-success:focus {\n  background: #85ce61;\n  border-color: #85ce61;\n  color: #FFFFFF;\n}\n.wu-button-success:active {\n  background: #5daf34;\n  border-color: #5daf34;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-success.is-active {\n  background: #5daf34;\n  border-color: #5daf34;\n  color: #FFFFFF;\n}\n.wu-button-success.is-disabled, .wu-button-success.is-disabled:hover, .wu-button-success.is-disabled:focus, .wu-button-success.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #b3e19d;\n  border-color: #b3e19d;\n}\n.wu-button-success.is-plain {\n  color: #67C23A;\n  background: #f0f9eb;\n  border-color: #c2e7b0;\n}\n.wu-button-success.is-plain:hover, .wu-button-success.is-plain:focus {\n  background: #67C23A;\n  border-color: #67C23A;\n  color: #FFFFFF;\n}\n.wu-button-success.is-plain:active {\n  background: #5daf34;\n  border-color: #5daf34;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-success.is-plain.is-disabled, .wu-button-success.is-plain.is-disabled:hover, .wu-button-success.is-plain.is-disabled:focus, .wu-button-success.is-plain.is-disabled:active {\n  color: #a4da89;\n  background-color: #f0f9eb;\n  border-color: #e1f3d8;\n}\n\n.wu-button-warning {\n  color: #FFFFFF;\n  background-color: #E6A23C;\n  border-color: #E6A23C;\n}\n.wu-button-warning:hover, .wu-button-warning:focus {\n  background: #ebb563;\n  border-color: #ebb563;\n  color: #FFFFFF;\n}\n.wu-button-warning:active {\n  background: #cf9236;\n  border-color: #cf9236;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-warning.is-active {\n  background: #cf9236;\n  border-color: #cf9236;\n  color: #FFFFFF;\n}\n.wu-button-warning.is-disabled, .wu-button-warning.is-disabled:hover, .wu-button-warning.is-disabled:focus, .wu-button-warning.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #f3d19e;\n  border-color: #f3d19e;\n}\n.wu-button-warning.is-plain {\n  color: #E6A23C;\n  background: #fdf6ec;\n  border-color: #f5dab1;\n}\n.wu-button-warning.is-plain:hover, .wu-button-warning.is-plain:focus {\n  background: #E6A23C;\n  border-color: #E6A23C;\n  color: #FFFFFF;\n}\n.wu-button-warning.is-plain:active {\n  background: #cf9236;\n  border-color: #cf9236;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-warning.is-plain.is-disabled, .wu-button-warning.is-plain.is-disabled:hover, .wu-button-warning.is-plain.is-disabled:focus, .wu-button-warning.is-plain.is-disabled:active {\n  color: #f0c78a;\n  background-color: #fdf6ec;\n  border-color: #faecd8;\n}\n\n.wu-button-danger {\n  color: #FFFFFF;\n  background-color: #F56C6C;\n  border-color: #F56C6C;\n}\n.wu-button-danger:hover, .wu-button-danger:focus {\n  background: #f78989;\n  border-color: #f78989;\n  color: #FFFFFF;\n}\n.wu-button-danger:active {\n  background: #dd6161;\n  border-color: #dd6161;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-danger.is-active {\n  background: #dd6161;\n  border-color: #dd6161;\n  color: #FFFFFF;\n}\n.wu-button-danger.is-disabled, .wu-button-danger.is-disabled:hover, .wu-button-danger.is-disabled:focus, .wu-button-danger.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #fab6b6;\n  border-color: #fab6b6;\n}\n.wu-button-danger.is-plain {\n  color: #F56C6C;\n  background: #fef0f0;\n  border-color: #fbc4c4;\n}\n.wu-button-danger.is-plain:hover, .wu-button-danger.is-plain:focus {\n  background: #F56C6C;\n  border-color: #F56C6C;\n  color: #FFFFFF;\n}\n.wu-button-danger.is-plain:active {\n  background: #dd6161;\n  border-color: #dd6161;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-danger.is-plain.is-disabled, .wu-button-danger.is-plain.is-disabled:hover, .wu-button-danger.is-plain.is-disabled:focus, .wu-button-danger.is-plain.is-disabled:active {\n  color: #f9a7a7;\n  background-color: #fef0f0;\n  border-color: #fde2e2;\n}\n\n.wu-button-info {\n  color: #FFFFFF;\n  background-color: #909399;\n  border-color: #909399;\n}\n.wu-button-info:hover, .wu-button-info:focus {\n  background: #a6a9ad;\n  border-color: #a6a9ad;\n  color: #FFFFFF;\n}\n.wu-button-info:active {\n  background: #82848a;\n  border-color: #82848a;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-info.is-active {\n  background: #82848a;\n  border-color: #82848a;\n  color: #FFFFFF;\n}\n.wu-button-info.is-disabled, .wu-button-info.is-disabled:hover, .wu-button-info.is-disabled:focus, .wu-button-info.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #c8c9cc;\n  border-color: #c8c9cc;\n}\n.wu-button-info.is-plain {\n  color: #909399;\n  background: #f4f4f5;\n  border-color: #d3d4d6;\n}\n.wu-button-info.is-plain:hover, .wu-button-info.is-plain:focus {\n  background: #909399;\n  border-color: #909399;\n  color: #FFFFFF;\n}\n.wu-button-info.is-plain:active {\n  background: #82848a;\n  border-color: #82848a;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-info.is-plain.is-disabled, .wu-button-info.is-plain.is-disabled:hover, .wu-button-info.is-plain.is-disabled:focus, .wu-button-info.is-plain.is-disabled:active {\n  color: #bcbec2;\n  background-color: #f4f4f5;\n  border-color: #e9e9eb;\n}\n\n.wu-button-medium {\n  padding: 10px 20px;\n  font-size: 14px;\n  border-radius: 4px;\n}\n.wu-button-medium.is-round {\n  padding: 10px 20px;\n}\n.wu-button-medium.is-circle {\n  padding: 10px;\n}\n\n.wu-button-small {\n  padding: 9px 15px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n.wu-button-small.is-round {\n  padding: 9px 15px;\n}\n.wu-button-small.is-circle {\n  padding: 9px;\n}\n\n.wu-button-mini {\n  padding: 7px 15px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n.wu-button-mini.is-round {\n  padding: 7px 15px;\n}\n.wu-button-mini.is-circle {\n  padding: 7px;\n}\n\n.wu-button-text {\n  border-color: transparent;\n  color: #409EFF;\n  background: transparent;\n  padding-left: 0;\n  padding-right: 0;\n}\n.wu-button-text:hover, .wu-button-text:focus {\n  color: #66b1ff;\n  border-color: transparent;\n  background-color: transparent;\n}\n.wu-button-text:active {\n  color: #3a8ee6;\n  border-color: transparent;\n  background-color: transparent;\n}\n.wu-button-text.is-disabled, .wu-button-text.is-disabled:hover, .wu-button-text.is-disabled:focus {\n  border-color: transparent;\n}\n\n.loading {\n  width: 1em;\n  height: 1em;\n  display: inline-block;\n  -webkit-animation: loading 1s steps(12, end) infinite;\n          animation: loading 1s steps(12, end) infinite;\n  vertical-align: -0.125em;\n}\n\n@-webkit-keyframes loading {\n  0% {\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n@keyframes loading {\n  0% {\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    transform: rotate3d(0, 0, 1, 360deg);\n  }\n}";
styleInject(css_248z$3);

/**
 * 防抖
 * @param fn
 * @param wait
 */
function debounce(fn, wait) {
    var timeout;
    return function () {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    };
}

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
/**
 * 庫歐戰屬性
 * @param props
 * @param prop
 */
function extract(props, prop) {
    var _a;
    if (typeof prop === 'string') {
        if (props.hasOwnProperty(prop)) {
            return _a = {}, _a[prop] = props[prop], _a;
        }
    }
    else {
        var res_1 = {};
        prop.forEach(function (key) {
            if (props.hasOwnProperty(key)) {
                res_1[key] = props[key];
            }
        });
        return res_1;
    }
    return {};
}

var WuButton = /** @class */ (function (_super) {
    __extends$1(WuButton, _super);
    function WuButton() {
        return _super.call(this) || this;
    }
    WuButton.prototype.render = function (_renderProps, _store) {
        var _a;
        return (h("button", __assign({ disabled: this.disabled }, extractClass({}, 'wu-button', (_a = {},
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
    WuButton = __decorate([
        Component({
            name: 'wu-plus-button',
            css: css_248z$3
        }),
        __metadata("design:paramtypes", [])
    ], WuButton);
    return WuButton;
}(HTMLElement));

var css_248z$2 = "@charset \"UTF-8\";\n/**********************系统级别配置*******************************/\n/**********************基本颜色***************************/\n/* Disable base\n-------------------------- */\n/* Transition\n-------------------------- */\n/* Color\n-------------------------- */\n/* 53a8ff */\n/* 66b1ff */\n/* 79bbff */\n/* 8cc5ff */\n/* a0cfff */\n/* b3d8ff */\n/* c6e2ff */\n/* d9ecff */\n/* ecf5ff */\n/**********************基本边框***************************/\n/**********************盒模型阴影*************************/\n/**********************基本字体*************************/\n/**********************Button***************************/\n/**************************Radio****************************/\n/* Input-------------------------- */\n/* BEM support Func\n -------------------------- */\n/* Scrollbar\n -------------------------- */\n/* Placeholder\n -------------------------- */\n@font-face {\n  font-family: \"wu-icons\";\n  src: url(\"https://qiniu.canyuegongzi.xyz/wu-icons.woff\") format(\"woff\"), url(\"https://qiniu.canyuegongzi.xyz/wu-icons.ttf\") format(\"truetype\");\n  /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/\n  font-weight: normal;\n  font-display: auto;\n  font-style: normal;\n}\n[class^=wu-icon-], [class*=\" wu-icon-\"] {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: \"wu-icons\" !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  vertical-align: baseline;\n  display: inline-block;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.wu-icon-ice-cream-round:before {\n  content: \"\\e6a0\";\n}\n\n.wu-icon-ice-cream-square:before {\n  content: \"\\e6a3\";\n}\n\n.wu-icon-lollipop:before {\n  content: \"\\e6a4\";\n}\n\n.wu-icon-potato-strips:before {\n  content: \"\\e6a5\";\n}\n\n.wu-icon-milk-tea:before {\n  content: \"\\e6a6\";\n}\n\n.wu-icon-ice-drink:before {\n  content: \"\\e6a7\";\n}\n\n.wu-icon-ice-tea:before {\n  content: \"\\e6a9\";\n}\n\n.wu-icon-coffee:before {\n  content: \"\\e6aa\";\n}\n\n.wu-icon-orange:before {\n  content: \"\\e6ab\";\n}\n\n.wu-icon-pear:before {\n  content: \"\\e6ac\";\n}\n\n.wu-icon-apple:before {\n  content: \"\\e6ad\";\n}\n\n.wu-icon-cherry:before {\n  content: \"\\e6ae\";\n}\n\n.wu-icon-watermelon:before {\n  content: \"\\e6af\";\n}\n\n.wu-icon-grape:before {\n  content: \"\\e6b0\";\n}\n\n.wu-icon-refrigerator:before {\n  content: \"\\e6b1\";\n}\n\n.wu-icon-goblet-square-full:before {\n  content: \"\\e6b2\";\n}\n\n.wu-icon-goblet-square:before {\n  content: \"\\e6b3\";\n}\n\n.wu-icon-goblet-full:before {\n  content: \"\\e6b4\";\n}\n\n.wu-icon-goblet:before {\n  content: \"\\e6b5\";\n}\n\n.wu-icon-cold-drink:before {\n  content: \"\\e6b6\";\n}\n\n.wu-icon-coffee-cup:before {\n  content: \"\\e6b8\";\n}\n\n.wu-icon-water-cup:before {\n  content: \"\\e6b9\";\n}\n\n.wu-icon-hot-water:before {\n  content: \"\\e6ba\";\n}\n\n.wu-icon-ice-cream:before {\n  content: \"\\e6bb\";\n}\n\n.wu-icon-dessert:before {\n  content: \"\\e6bc\";\n}\n\n.wu-icon-sugar:before {\n  content: \"\\e6bd\";\n}\n\n.wu-icon-tableware:before {\n  content: \"\\e6be\";\n}\n\n.wu-icon-burger:before {\n  content: \"\\e6bf\";\n}\n\n.wu-icon-knife-fork:before {\n  content: \"\\e6c1\";\n}\n\n.wu-icon-fork-spoon:before {\n  content: \"\\e6c2\";\n}\n\n.wu-icon-chicken:before {\n  content: \"\\e6c3\";\n}\n\n.wu-icon-food:before {\n  content: \"\\e6c4\";\n}\n\n.wu-icon-dish-1:before {\n  content: \"\\e6c5\";\n}\n\n.wu-icon-dish:before {\n  content: \"\\e6c6\";\n}\n\n.wu-icon-moon-night:before {\n  content: \"\\e6ee\";\n}\n\n.wu-icon-moon:before {\n  content: \"\\e6f0\";\n}\n\n.wu-icon-cloudy-and-sunny:before {\n  content: \"\\e6f1\";\n}\n\n.wu-icon-partly-cloudy:before {\n  content: \"\\e6f2\";\n}\n\n.wu-icon-cloudy:before {\n  content: \"\\e6f3\";\n}\n\n.wu-icon-sunny:before {\n  content: \"\\e6f6\";\n}\n\n.wu-icon-sunset:before {\n  content: \"\\e6f7\";\n}\n\n.wu-icon-sunrise-1:before {\n  content: \"\\e6f8\";\n}\n\n.wu-icon-sunrise:before {\n  content: \"\\e6f9\";\n}\n\n.wu-icon-heavy-rain:before {\n  content: \"\\e6fa\";\n}\n\n.wu-icon-lightning:before {\n  content: \"\\e6fb\";\n}\n\n.wu-icon-light-rain:before {\n  content: \"\\e6fc\";\n}\n\n.wu-icon-wind-power:before {\n  content: \"\\e6fd\";\n}\n\n.wu-icon-baseball:before {\n  content: \"\\e712\";\n}\n\n.wu-icon-soccer:before {\n  content: \"\\e713\";\n}\n\n.wu-icon-football:before {\n  content: \"\\e715\";\n}\n\n.wu-icon-basketball:before {\n  content: \"\\e716\";\n}\n\n.wu-icon-ship:before {\n  content: \"\\e73f\";\n}\n\n.wu-icon-truck:before {\n  content: \"\\e740\";\n}\n\n.wu-icon-bicycle:before {\n  content: \"\\e741\";\n}\n\n.wu-icon-mobile-phone:before {\n  content: \"\\e6d3\";\n}\n\n.wu-icon-service:before {\n  content: \"\\e6d4\";\n}\n\n.wu-icon-key:before {\n  content: \"\\e6e2\";\n}\n\n.wu-icon-unlock:before {\n  content: \"\\e6e4\";\n}\n\n.wu-icon-lock:before {\n  content: \"\\e6e5\";\n}\n\n.wu-icon-watch:before {\n  content: \"\\e6fe\";\n}\n\n.wu-icon-watch-1:before {\n  content: \"\\e6ff\";\n}\n\n.wu-icon-timer:before {\n  content: \"\\e702\";\n}\n\n.wu-icon-alarm-clock:before {\n  content: \"\\e703\";\n}\n\n.wu-icon-map-location:before {\n  content: \"\\e704\";\n}\n\n.wu-icon-delete-location:before {\n  content: \"\\e705\";\n}\n\n.wu-icon-add-location:before {\n  content: \"\\e706\";\n}\n\n.wu-icon-location-information:before {\n  content: \"\\e707\";\n}\n\n.wu-icon-location-outline:before {\n  content: \"\\e708\";\n}\n\n.wu-icon-location:before {\n  content: \"\\e79e\";\n}\n\n.wu-icon-place:before {\n  content: \"\\e709\";\n}\n\n.wu-icon-discover:before {\n  content: \"\\e70a\";\n}\n\n.wu-icon-first-aid-kit:before {\n  content: \"\\e70b\";\n}\n\n.wu-icon-trophy-1:before {\n  content: \"\\e70c\";\n}\n\n.wu-icon-trophy:before {\n  content: \"\\e70d\";\n}\n\n.wu-icon-medal:before {\n  content: \"\\e70e\";\n}\n\n.wu-icon-medal-1:before {\n  content: \"\\e70f\";\n}\n\n.wu-icon-stopwatch:before {\n  content: \"\\e710\";\n}\n\n.wu-icon-mic:before {\n  content: \"\\e711\";\n}\n\n.wu-icon-copy-document:before {\n  content: \"\\e718\";\n}\n\n.wu-icon-full-screen:before {\n  content: \"\\e719\";\n}\n\n.wu-icon-switch-button:before {\n  content: \"\\e71b\";\n}\n\n.wu-icon-aim:before {\n  content: \"\\e71c\";\n}\n\n.wu-icon-crop:before {\n  content: \"\\e71d\";\n}\n\n.wu-icon-odometer:before {\n  content: \"\\e71e\";\n}\n\n.wu-icon-time:before {\n  content: \"\\e71f\";\n}\n\n.wu-icon-bangzhu:before {\n  content: \"\\e724\";\n}\n\n.wu-icon-close-notification:before {\n  content: \"\\e726\";\n}\n\n.wu-icon-microphone:before {\n  content: \"\\e727\";\n}\n\n.wu-icon-turn-off-microphone:before {\n  content: \"\\e728\";\n}\n\n.wu-icon-position:before {\n  content: \"\\e729\";\n}\n\n.wu-icon-postcard:before {\n  content: \"\\e72a\";\n}\n\n.wu-icon-message:before {\n  content: \"\\e72b\";\n}\n\n.wu-icon-chat-line-square:before {\n  content: \"\\e72d\";\n}\n\n.wu-icon-chat-dot-square:before {\n  content: \"\\e72e\";\n}\n\n.wu-icon-chat-dot-round:before {\n  content: \"\\e72f\";\n}\n\n.wu-icon-chat-square:before {\n  content: \"\\e730\";\n}\n\n.wu-icon-chat-line-round:before {\n  content: \"\\e731\";\n}\n\n.wu-icon-chat-round:before {\n  content: \"\\e732\";\n}\n\n.wu-icon-set-up:before {\n  content: \"\\e733\";\n}\n\n.wu-icon-turn-off:before {\n  content: \"\\e734\";\n}\n\n.wu-icon-open:before {\n  content: \"\\e735\";\n}\n\n.wu-icon-connection:before {\n  content: \"\\e736\";\n}\n\n.wu-icon-link:before {\n  content: \"\\e737\";\n}\n\n.wu-icon-cpu:before {\n  content: \"\\e738\";\n}\n\n.wu-icon-thumb:before {\n  content: \"\\e739\";\n}\n\n.wu-icon-female:before {\n  content: \"\\e73a\";\n}\n\n.wu-icon-male:before {\n  content: \"\\e73b\";\n}\n\n.wu-icon-guide:before {\n  content: \"\\e73c\";\n}\n\n.wu-icon-news:before {\n  content: \"\\e73e\";\n}\n\n.wu-icon-price-tag:before {\n  content: \"\\e744\";\n}\n\n.wu-icon-discount:before {\n  content: \"\\e745\";\n}\n\n.wu-icon-wallet:before {\n  content: \"\\e747\";\n}\n\n.wu-icon-coin:before {\n  content: \"\\e748\";\n}\n\n.wu-icon-money:before {\n  content: \"\\e749\";\n}\n\n.wu-icon-bank-card:before {\n  content: \"\\e74a\";\n}\n\n.wu-icon-box:before {\n  content: \"\\e74b\";\n}\n\n.wu-icon-present:before {\n  content: \"\\e74c\";\n}\n\n.wu-icon-sell:before {\n  content: \"\\e6d5\";\n}\n\n.wu-icon-sold-out:before {\n  content: \"\\e6d6\";\n}\n\n.wu-icon-shopping-bag-2:before {\n  content: \"\\e74d\";\n}\n\n.wu-icon-shopping-bag-1:before {\n  content: \"\\e74e\";\n}\n\n.wu-icon-shopping-cart-2:before {\n  content: \"\\e74f\";\n}\n\n.wu-icon-shopping-cart-1:before {\n  content: \"\\e750\";\n}\n\n.wu-icon-shopping-cart-full:before {\n  content: \"\\e751\";\n}\n\n.wu-icon-smoking:before {\n  content: \"\\e752\";\n}\n\n.wu-icon-no-smoking:before {\n  content: \"\\e753\";\n}\n\n.wu-icon-house:before {\n  content: \"\\e754\";\n}\n\n.wu-icon-table-lamp:before {\n  content: \"\\e755\";\n}\n\n.wu-icon-school:before {\n  content: \"\\e756\";\n}\n\n.wu-icon-office-building:before {\n  content: \"\\e757\";\n}\n\n.wu-icon-toilet-paper:before {\n  content: \"\\e758\";\n}\n\n.wu-icon-notebook-2:before {\n  content: \"\\e759\";\n}\n\n.wu-icon-notebook-1:before {\n  content: \"\\e75a\";\n}\n\n.wu-icon-files:before {\n  content: \"\\e75b\";\n}\n\n.wu-icon-collection:before {\n  content: \"\\e75c\";\n}\n\n.wu-icon-receiving:before {\n  content: \"\\e75d\";\n}\n\n.wu-icon-suitcase-1:before {\n  content: \"\\e760\";\n}\n\n.wu-icon-suitcase:before {\n  content: \"\\e761\";\n}\n\n.wu-icon-film:before {\n  content: \"\\e763\";\n}\n\n.wu-icon-collection-tag:before {\n  content: \"\\e765\";\n}\n\n.wu-icon-data-analysis:before {\n  content: \"\\e766\";\n}\n\n.wu-icon-pie-chart:before {\n  content: \"\\e767\";\n}\n\n.wu-icon-data-board:before {\n  content: \"\\e768\";\n}\n\n.wu-icon-data-line:before {\n  content: \"\\e76d\";\n}\n\n.wu-icon-reading:before {\n  content: \"\\e769\";\n}\n\n.wu-icon-magic-stick:before {\n  content: \"\\e76a\";\n}\n\n.wu-icon-coordinate:before {\n  content: \"\\e76b\";\n}\n\n.wu-icon-mouse:before {\n  content: \"\\e76c\";\n}\n\n.wu-icon-brush:before {\n  content: \"\\e76e\";\n}\n\n.wu-icon-headset:before {\n  content: \"\\e76f\";\n}\n\n.wu-icon-umbrella:before {\n  content: \"\\e770\";\n}\n\n.wu-icon-scissors:before {\n  content: \"\\e771\";\n}\n\n.wu-icon-mobile:before {\n  content: \"\\e773\";\n}\n\n.wu-icon-attract:before {\n  content: \"\\e774\";\n}\n\n.wu-icon-monitor:before {\n  content: \"\\e775\";\n}\n\n.wu-icon-search:before {\n  content: \"\\e778\";\n}\n\n.wu-icon-takeaway-box:before {\n  content: \"\\e77a\";\n}\n\n.wu-icon-paperclip:before {\n  content: \"\\e77d\";\n}\n\n.wu-icon-printer:before {\n  content: \"\\e77e\";\n}\n\n.wu-icon-document-add:before {\n  content: \"\\e782\";\n}\n\n.wu-icon-document:before {\n  content: \"\\e785\";\n}\n\n.wu-icon-document-checked:before {\n  content: \"\\e786\";\n}\n\n.wu-icon-document-copy:before {\n  content: \"\\e787\";\n}\n\n.wu-icon-document-delete:before {\n  content: \"\\e788\";\n}\n\n.wu-icon-document-remove:before {\n  content: \"\\e789\";\n}\n\n.wu-icon-tickets:before {\n  content: \"\\e78b\";\n}\n\n.wu-icon-folder-checked:before {\n  content: \"\\e77f\";\n}\n\n.wu-icon-folder-delete:before {\n  content: \"\\e780\";\n}\n\n.wu-icon-folder-remove:before {\n  content: \"\\e781\";\n}\n\n.wu-icon-folder-add:before {\n  content: \"\\e783\";\n}\n\n.wu-icon-folder-opened:before {\n  content: \"\\e784\";\n}\n\n.wu-icon-folder:before {\n  content: \"\\e78a\";\n}\n\n.wu-icon-edit-outline:before {\n  content: \"\\e764\";\n}\n\n.wu-icon-edit:before {\n  content: \"\\e78c\";\n}\n\n.wu-icon-date:before {\n  content: \"\\e78e\";\n}\n\n.wu-icon-c-scale-to-original:before {\n  content: \"\\e7c6\";\n}\n\n.wu-icon-view:before {\n  content: \"\\e6ce\";\n}\n\n.wu-icon-loading:before {\n  content: \"\\e6cf\";\n}\n\n.wu-icon-rank:before {\n  content: \"\\e6d1\";\n}\n\n.wu-icon-sort-down:before {\n  content: \"\\e7c4\";\n}\n\n.wu-icon-sort-up:before {\n  content: \"\\e7c5\";\n}\n\n.wu-icon-sort:before {\n  content: \"\\e6d2\";\n}\n\n.wu-icon-finished:before {\n  content: \"\\e6cd\";\n}\n\n.wu-icon-refresh-left:before {\n  content: \"\\e6c7\";\n}\n\n.wu-icon-refresh-right:before {\n  content: \"\\e6c8\";\n}\n\n.wu-icon-refresh:before {\n  content: \"\\e6d0\";\n}\n\n.wu-icon-video-play:before {\n  content: \"\\e7c0\";\n}\n\n.wu-icon-video-pause:before {\n  content: \"\\e7c1\";\n}\n\n.wu-icon-d-arrow-right:before {\n  content: \"\\e6dc\";\n}\n\n.wu-icon-d-arrow-left:before {\n  content: \"\\e6dd\";\n}\n\n.wu-icon-arrow-up:before {\n  content: \"\\e6e1\";\n}\n\n.wu-icon-arrow-down:before {\n  content: \"\\e6df\";\n}\n\n.wu-icon-arrow-right:before {\n  content: \"\\e6e0\";\n}\n\n.wu-icon-arrow-left:before {\n  content: \"\\e6de\";\n}\n\n.wu-icon-top-right:before {\n  content: \"\\e6e7\";\n}\n\n.wu-icon-top-left:before {\n  content: \"\\e6e8\";\n}\n\n.wu-icon-top:before {\n  content: \"\\e6e6\";\n}\n\n.wu-icon-bottom:before {\n  content: \"\\e6eb\";\n}\n\n.wu-icon-right:before {\n  content: \"\\e6e9\";\n}\n\n.wu-icon-back:before {\n  content: \"\\e6ea\";\n}\n\n.wu-icon-bottom-right:before {\n  content: \"\\e6ec\";\n}\n\n.wu-icon-bottom-left:before {\n  content: \"\\e6ed\";\n}\n\n.wu-icon-caret-top:before {\n  content: \"\\e78f\";\n}\n\n.wu-icon-caret-bottom:before {\n  content: \"\\e790\";\n}\n\n.wu-icon-caret-right:before {\n  content: \"\\e791\";\n}\n\n.wu-icon-caret-left:before {\n  content: \"\\e792\";\n}\n\n.wu-icon-d-caret:before {\n  content: \"\\e79a\";\n}\n\n.wu-icon-share:before {\n  content: \"\\e793\";\n}\n\n.wu-icon-menu:before {\n  content: \"\\e798\";\n}\n\n.wu-icon-s-grid:before {\n  content: \"\\e7a6\";\n}\n\n.wu-icon-s-check:before {\n  content: \"\\e7a7\";\n}\n\n.wu-icon-s-data:before {\n  content: \"\\e7a8\";\n}\n\n.wu-icon-s-opportunity:before {\n  content: \"\\e7aa\";\n}\n\n.wu-icon-s-custom:before {\n  content: \"\\e7ab\";\n}\n\n.wu-icon-s-claim:before {\n  content: \"\\e7ad\";\n}\n\n.wu-icon-s-finance:before {\n  content: \"\\e7ae\";\n}\n\n.wu-icon-s-comment:before {\n  content: \"\\e7af\";\n}\n\n.wu-icon-s-flag:before {\n  content: \"\\e7b0\";\n}\n\n.wu-icon-s-marketing:before {\n  content: \"\\e7b1\";\n}\n\n.wu-icon-s-shop:before {\n  content: \"\\e7b4\";\n}\n\n.wu-icon-s-open:before {\n  content: \"\\e7b5\";\n}\n\n.wu-icon-s-management:before {\n  content: \"\\e7b6\";\n}\n\n.wu-icon-s-ticket:before {\n  content: \"\\e7b7\";\n}\n\n.wu-icon-s-release:before {\n  content: \"\\e7b8\";\n}\n\n.wu-icon-s-home:before {\n  content: \"\\e7b9\";\n}\n\n.wu-icon-s-promotion:before {\n  content: \"\\e7ba\";\n}\n\n.wu-icon-s-operation:before {\n  content: \"\\e7bb\";\n}\n\n.wu-icon-s-unfold:before {\n  content: \"\\e7bc\";\n}\n\n.wu-icon-s-fold:before {\n  content: \"\\e7a9\";\n}\n\n.wu-icon-s-platform:before {\n  content: \"\\e7bd\";\n}\n\n.wu-icon-s-order:before {\n  content: \"\\e7be\";\n}\n\n.wu-icon-s-cooperation:before {\n  content: \"\\e7bf\";\n}\n\n.wu-icon-bell:before {\n  content: \"\\e725\";\n}\n\n.wu-icon-message-solid:before {\n  content: \"\\e799\";\n}\n\n.wu-icon-video-camera:before {\n  content: \"\\e772\";\n}\n\n.wu-icon-video-camera-solid:before {\n  content: \"\\e796\";\n}\n\n.wu-icon-camera:before {\n  content: \"\\e779\";\n}\n\n.wu-icon-camera-solid:before {\n  content: \"\\e79b\";\n}\n\n.wu-icon-download:before {\n  content: \"\\e77c\";\n}\n\n.wu-icon-upload2:before {\n  content: \"\\e77b\";\n}\n\n.wu-icon-upload:before {\n  content: \"\\e7c3\";\n}\n\n.wu-icon-picture-outline-round:before {\n  content: \"\\e75f\";\n}\n\n.wu-icon-picture-outline:before {\n  content: \"\\e75e\";\n}\n\n.wu-icon-picture:before {\n  content: \"\\e79f\";\n}\n\n.wu-icon-close:before {\n  content: \"\\e6db\";\n}\n\n.wu-icon-check:before {\n  content: \"\\e6da\";\n}\n\n.wu-icon-plus:before {\n  content: \"\\e6d9\";\n}\n\n.wu-icon-minus:before {\n  content: \"\\e6d8\";\n}\n\n.wu-icon-help:before {\n  content: \"\\e73d\";\n}\n\n.wu-icon-s-help:before {\n  content: \"\\e7b3\";\n}\n\n.wu-icon-circle-close:before {\n  content: \"\\e78d\";\n}\n\n.wu-icon-circle-check:before {\n  content: \"\\e720\";\n}\n\n.wu-icon-circle-plus-outline:before {\n  content: \"\\e723\";\n}\n\n.wu-icon-remove-outline:before {\n  content: \"\\e722\";\n}\n\n.wu-icon-zoom-out:before {\n  content: \"\\e776\";\n}\n\n.wu-icon-zoom-in:before {\n  content: \"\\e777\";\n}\n\n.wu-icon-error:before {\n  content: \"\\e79d\";\n}\n\n.wu-icon-success:before {\n  content: \"\\e79c\";\n}\n\n.wu-icon-circle-plus:before {\n  content: \"\\e7a0\";\n}\n\n.wu-icon-remove:before {\n  content: \"\\e7a2\";\n}\n\n.wu-icon-info:before {\n  content: \"\\e7a1\";\n}\n\n.wu-icon-question:before {\n  content: \"\\e7a4\";\n}\n\n.wu-icon-warning-outline:before {\n  content: \"\\e6c9\";\n}\n\n.wu-icon-warning:before {\n  content: \"\\e7a3\";\n}\n\n.wu-icon-goods:before {\n  content: \"\\e7c2\";\n}\n\n.wu-icon-s-goods:before {\n  content: \"\\e7b2\";\n}\n\n.wu-icon-star-off:before {\n  content: \"\\e717\";\n}\n\n.wu-icon-star-on:before {\n  content: \"\\e797\";\n}\n\n.wu-icon-more-outline:before {\n  content: \"\\e6cc\";\n}\n\n.wu-icon-more:before {\n  content: \"\\e794\";\n}\n\n.wu-icon-phone-outline:before {\n  content: \"\\e6cb\";\n}\n\n.wu-icon-phone:before {\n  content: \"\\e795\";\n}\n\n.wu-icon-user:before {\n  content: \"\\e6e3\";\n}\n\n.wu-icon-user-solid:before {\n  content: \"\\e7a5\";\n}\n\n.wu-icon-setting:before {\n  content: \"\\e6ca\";\n}\n\n.wu-icon-s-tools:before {\n  content: \"\\e7ac\";\n}\n\n.wu-icon-delete:before {\n  content: \"\\e6d7\";\n}\n\n.wu-icon-delete-solid:before {\n  content: \"\\e7c9\";\n}\n\n.wu-icon-eleme:before {\n  content: \"\\e7c7\";\n}\n\n.wu-icon-platform-eleme:before {\n  content: \"\\e7ca\";\n}\n\n.wu-icon-loading {\n  -webkit-animation: rotating 2s linear infinite;\n          animation: rotating 2s linear infinite;\n}\n\n.wu-icon--right {\n  margin-left: 5px;\n}\n\n.wu-icon--left {\n  margin-right: 5px;\n}\n\n@-webkit-keyframes rotating {\n  0% {\n    transform: rotateZ(0deg);\n  }\n  100% {\n    transform: rotateZ(360deg);\n  }\n}\n\n@keyframes rotating {\n  0% {\n    transform: rotateZ(0deg);\n  }\n  100% {\n    transform: rotateZ(360deg);\n  }\n}";
styleInject(css_248z$2);

var WuIcon = /** @class */ (function (_super) {
    __extends$1(WuIcon, _super);
    function WuIcon() {
        return _super.call(this) || this;
    }
    WuIcon.prototype.render = function (_renderProps, _store) {
        return (h("i", { class: "wu-icon-".concat(this.name) }));
    };
    __decorate([
        Prop({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuIcon.prototype, "name", void 0);
    WuIcon = __decorate([
        Component({
            name: 'wu-plus-icon',
            css: css_248z$2
        }),
        __metadata("design:paramtypes", [])
    ], WuIcon);
    return WuIcon;
}(HTMLElement));

var css_248z$1 = "@charset \"UTF-8\";\n/**********************系统级别配置*******************************/\n/**********************基本颜色***************************/\n/* Disable base\n-------------------------- */\n/* Transition\n-------------------------- */\n/* Color\n-------------------------- */\n/* 53a8ff */\n/* 66b1ff */\n/* 79bbff */\n/* 8cc5ff */\n/* a0cfff */\n/* b3d8ff */\n/* c6e2ff */\n/* d9ecff */\n/* ecf5ff */\n/**********************基本边框***************************/\n/**********************盒模型阴影*************************/\n/**********************基本字体*************************/\n/**********************Button***************************/\n/**************************Radio****************************/\n/* Input-------------------------- */\n/* BEM support Func\n -------------------------- */\n/* Scrollbar\n -------------------------- */\n/* Placeholder\n -------------------------- */\n:host {\n  display: inline-block;\n}\n\n.wu-radio {\n  color: #606266;\n  font-weight: 500;\n  line-height: 1;\n  position: relative;\n  cursor: pointer;\n  display: inline-block;\n  white-space: nowrap;\n  outline: none;\n  font-size: 14px;\n  margin-right: 30px;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n.wu-radio.is-border {\n  padding: 12px 20px 0 10px;\n  border-radius: 4px;\n  border: 1px solid #C0C4CC;\n  box-sizing: border-box;\n  height: 40px;\n}\n.wu-radio.is-border.is-checked {\n  border-color: #409EFF;\n}\n.wu-radio.is-border.is-disabled {\n  cursor: not-allowed;\n  border-color: #EBEEF5;\n}\n.wu-radio.is-border + .wu-radio.is-border {\n  margin-left: 10px;\n}\n\n.wu-radio-medium.is-border {\n  padding: 10px 20px 0 10px;\n  border-radius: 4px;\n  height: 36px;\n}\n.wu-radio-medium.is-border .wu-radio_label {\n  font-size: 14px;\n}\n.wu-radio-medium.is-border .wu-radio_inner {\n  height: 14px;\n  width: 14px;\n}\n\n.wu-radio-small.is-border {\n  padding: 8px 15px 0 10px;\n  border-radius: 3px;\n  height: 32px;\n}\n.wu-radio-small.is-border .wu-radio_label {\n  font-size: 12px;\n}\n.wu-radio-small.is-border .wu-radio_inner {\n  height: 12px;\n  width: 12px;\n}\n\n.wu-radio-mini.is-border {\n  padding: 6px 15px 0 10px;\n  border-radius: 3px;\n  height: 28px;\n}\n.wu-radio-mini.is-border .wu-radio_label {\n  font-size: 12px;\n}\n.wu-radio-mini.is-border .wu-radio_inner {\n  height: 12px;\n  width: 12px;\n}\n\n.wu-radio:last-child {\n  margin-right: 0;\n}\n.wu-radio .wu-radio_input {\n  white-space: nowrap;\n  cursor: pointer;\n  outline: none;\n  display: inline-block;\n  line-height: 1;\n  position: relative;\n  vertical-align: middle;\n}\n.wu-radio .wu-radio_input.is-disabled .wu-radio_inner {\n  background-color: #F5F7FA;\n  border-color: #E4E7ED;\n  cursor: not-allowed;\n}\n.wu-radio .wu-radio_input.is-disabled .wu-radio_inner::after {\n  cursor: not-allowed;\n  background-color: #F5F7FA;\n}\n.wu-radio .wu-radio_input.is-disabled .wu-radio_inner + .wu-radio_label {\n  cursor: not-allowed;\n}\n.wu-radio .wu-radio_input.is-disabled.is-checked .wu-radio_inner {\n  background-color: #F5F7FA;\n  border-color: #E4E7ED;\n}\n.wu-radio .wu-radio_input.is-disabled.is-checked .wu-radio_inner::after {\n  background-color: #C0C4CC;\n}\n.wu-radio .wu-radio_input.is-disabled + span.wu-radio_label {\n  color: #C0C4CC;\n  cursor: not-allowed;\n}\n\n.wu-radio .wu-radio_input.is-checked .wu-radio_inner {\n  border-color: #409EFF;\n  background: #409EFF;\n}\n.wu-radio .wu-radio_input.is-checked .wu-radio_inner::after {\n  transform: translate(-50%, -50%) scale(1);\n}\n.wu-radio .wu-radio_input.is-checked + .wu-radio__label {\n  color: #409EFF;\n}\n\n.wu-radio .wu-radio_input.is-focus .wu-radio_inner {\n  border-color: #409EFF;\n}\n\n.wu-radio .wu-radio_inner {\n  border: 1px solid #C0C4CC;\n  border-radius: 100%;\n  width: 14px;\n  height: 14px;\n  background-color: #FFFFFF;\n  position: relative;\n  cursor: pointer;\n  display: inline-block;\n  box-sizing: border-box;\n}\n.wu-radio .wu-radio_inner:hover {\n  border-color: #409EFF;\n}\n.wu-radio .wu-radio_inner::after {\n  width: 4px;\n  height: 4px;\n  border-radius: 100%;\n  background-color: #FFFFFF;\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%) scale(0);\n  transition: transform 0.15s ease-in;\n}\n\n.wu-radio .wu-radio_original {\n  opacity: 0;\n  outline: none;\n  position: absolute;\n  z-index: -1;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n}\n\n.wu-radio:focus:not(.is-focus):not(:active):not(.is-disabled) {\n  /*获得焦点时 样式提醒*/\n}\n.wu-radio:focus:not(.is-focus):not(:active):not(.is-disabled) .wu-radio_inner {\n  box-shadow: 0 0 2px 2px #409EFF;\n}\n.wu-radio .wu-radio_label {\n  font-size: 14px;\n  padding-left: 10px;\n}";
styleInject(css_248z$1);

var WuRadio = /** @class */ (function (_super) {
    __extends$1(WuRadio, _super);
    function WuRadio() {
        return _super.call(this) || this;
    }
    WuRadio.prototype.clickHandler = function () {
        if (this.disabled)
            return;
        this.checked = !this.checked;
        this.change();
    };
    WuRadio.prototype.change = function () {
        return {
            checked: this.checked,
            value: this.value
        };
    };
    WuRadio.prototype.mounted = function () {
        return {
            checked: this.checked,
            value: this.value
        };
    };
    WuRadio.prototype.connected = function (shadowRoot) {
        this.mounted();
    };
    WuRadio.prototype.render = function (_renderProps, _store) {
        var _a;
        return (h("label", __assign({ role: "radio", tabindex: "0", onclick: debounce(this.clickHandler.bind(this), 0) }, extractClass({}, 'wu-radio', (_a = {},
            _a['wu-radio-' + this.size] = this.size,
            _a['is-disabled'] = this.disabled,
            _a['is-border'] = this.border,
            _a['is-checked'] = this.checked,
            _a)), { "aria-checked": this.checked }),
            h("span", __assign({}, extractClass({}, 'wu-radio_input', {
                'is-disabled': this.disabled,
                'is-checked': this.checked
            })),
                h("span", { class: "wu-radio_inner" }),
                h("input", __assign({ type: "radio", "aria-hidden": "true" }, extract({}, ['checked', 'value', 'disabled']), { tabindex: "-1", class: "wu-radio_original" }))),
            h("span", { class: "wu-radio_label" },
                this.label,
                h("slot", null))));
    };
    __decorate([
        Prop({ default: 'mini', type: String }),
        __metadata("design:type", String)
    ], WuRadio.prototype, "size", void 0);
    __decorate([
        Prop({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuRadio.prototype, "label", void 0);
    __decorate([
        Prop({ default: false, type: Boolean }),
        __metadata("design:type", Boolean)
    ], WuRadio.prototype, "disabled", void 0);
    __decorate([
        Prop({ default: false, type: Boolean }),
        __metadata("design:type", Boolean)
    ], WuRadio.prototype, "checked", void 0);
    __decorate([
        Prop({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuRadio.prototype, "value", void 0);
    __decorate([
        Prop({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuRadio.prototype, "name", void 0);
    __decorate([
        Prop({ default: false, type: Boolean }),
        __metadata("design:type", String)
    ], WuRadio.prototype, "border", void 0);
    __decorate([
        Emit('change'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], WuRadio.prototype, "change", null);
    __decorate([
        Emit('mounted'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], WuRadio.prototype, "mounted", null);
    WuRadio = __decorate([
        Component({
            name: 'wu-plus-radio',
            css: css_248z$1,
        }),
        __metadata("design:paramtypes", [])
    ], WuRadio);
    return WuRadio;
}(HTMLElement));

var css_248z = "@charset \"UTF-8\";\n/**********************系统级别配置*******************************/\n/**********************基本颜色***************************/\n/* Disable base\n-------------------------- */\n/* Transition\n-------------------------- */\n/* Color\n-------------------------- */\n/* 53a8ff */\n/* 66b1ff */\n/* 79bbff */\n/* 8cc5ff */\n/* a0cfff */\n/* b3d8ff */\n/* c6e2ff */\n/* d9ecff */\n/* ecf5ff */\n/**********************基本边框***************************/\n/**********************盒模型阴影*************************/\n/**********************基本字体*************************/\n/**********************Button***************************/\n/**************************Radio****************************/\n/* Input-------------------------- */\n/* BEM support Func\n -------------------------- */\n/* Scrollbar\n -------------------------- */\n/* Placeholder\n -------------------------- */\n.wu-textarea {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n  vertical-align: bottom;\n  font-size: 14px;\n}\n.wu-textarea .wu-textarea_inner {\n  display: block;\n  resize: vertical;\n  padding: 5px 15px;\n  line-height: 1.5;\n  box-sizing: border-box;\n  width: 100%;\n  font-size: inherit;\n  color: #606266;\n  background-color: #FFFFFF;\n  background-image: none;\n  border: 1px solid #C0C4CC;\n  border-radius: 4px;\n  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.wu-textarea .wu-textarea_inner::-moz-placeholder {\n  color: #C0C4CC;\n}\n.wu-textarea .wu-textarea_inner:-ms-input-placeholder {\n  color: #C0C4CC;\n}\n.wu-textarea .wu-textarea_inner::placeholder {\n  color: #C0C4CC;\n}\n.wu-textarea .wu-textarea_inner:hover {\n  border-color: #C0C4CC;\n}\n.wu-textarea .wu-textarea_inner:focus {\n  outline: none;\n  border-color: #409EFF;\n}\n\n.wu-textarea .wu-input_count {\n  color: #909399;\n  background: #FFFFFF;\n  position: absolute;\n  font-size: 12px;\n  bottom: 5px;\n  right: 10px;\n}\n.wu-textarea.is-disabled .wu-textarea_inner {\n  background-color: #F5F7FA;\n  border-color: #E4E7ED;\n  color: #C0C4CC;\n  cursor: not-allowed;\n}\n.wu-textarea.is-disabled .wu-textarea_inner::-moz-placeholder {\n  color: #C0C4CC;\n}\n.wu-textarea.is-disabled .wu-textarea_inner:-ms-input-placeholder {\n  color: #C0C4CC;\n}\n.wu-textarea.is-disabled .wu-textarea_inner::placeholder {\n  color: #C0C4CC;\n}\n\n.wu-textarea.is-exceed .wu-textarea_inner {\n  border-color: #F56C6C;\n}\n.wu-textarea.is-exceed .wu-input_count {\n  color: #F56C6C;\n}\n\n.wu-input {\n  position: relative;\n  font-size: 14px;\n  display: inline-block;\n  width: 100%;\n}\n.wu-input::-webkit-scrollbar {\n  z-index: 11;\n  width: 6px;\n}\n.wu-input::-webkit-scrollbar:horizontal {\n  height: 6px;\n}\n.wu-input::-webkit-scrollbar-thumb {\n  border-radius: 5px;\n  width: 6px;\n  background: #b4bccc;\n}\n.wu-input::-webkit-scrollbar-corner {\n  background: #fff;\n}\n.wu-input::-webkit-scrollbar-track {\n  background: #fff;\n}\n.wu-input::-webkit-scrollbar-track-piece {\n  background: #fff;\n  width: 6px;\n}\n.wu-input .wu-input_clear {\n  color: #C0C4CC;\n  font-size: 14px;\n  cursor: pointer;\n  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.wu-input .wu-input_clear:hover {\n  color: #909399;\n}\n.wu-input .wu-input_count {\n  height: 100%;\n  display: inline-flex;\n  align-items: center;\n  color: #909399;\n  font-size: 12px;\n}\n.wu-input .wu-input_count .wu-input_count-inner {\n  background: #FFFFFF;\n  line-height: initial;\n  display: inline-block;\n  padding: 0 5px;\n}\n.wu-input .wu-input_inner {\n  -webkit-appearance: none;\n  background-color: #FFFFFF;\n  background-image: none;\n  border-radius: 4px;\n  border: 1px solid #C0C4CC;\n  box-sizing: border-box;\n  color: #606266;\n  display: inline-block;\n  font-size: inherit;\n  height: 40px;\n  line-height: 40px;\n  outline: none;\n  padding: 0 15px;\n  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n  width: 100%;\n}\n.wu-input .wu-input_inner::-ms-reveal {\n  display: none;\n}\n.wu-input .wu-input_inner::-moz-placeholder {\n  color: #C0C4CC;\n}\n.wu-input .wu-input_inner:-ms-input-placeholder {\n  color: #C0C4CC;\n}\n.wu-input .wu-input_inner::placeholder {\n  color: #C0C4CC;\n}\n.wu-input .wu-input_inner:hover {\n  border-color: #C0C4CC;\n}\n.wu-input .wu-input_inner:focus {\n  outline: none;\n  border-color: #409EFF;\n}\n\n.wu-input .wu-input_suffix {\n  position: absolute;\n  height: 100%;\n  right: 5px;\n  top: 0;\n  text-align: center;\n  color: #C0C4CC;\n  transition: all 0.3s;\n  display: flex;\n  align-items: center;\n}\n\n.wu-input .wu-input_suffix-inner {\n  pointer-events: all;\n}\n\n.wu-input .wu-input_prefix {\n  position: absolute;\n  height: 100%;\n  left: 5px;\n  top: 0;\n  text-align: center;\n  color: #C0C4CC;\n  transition: all 0.3s;\n}\n\n.wu-input .wu-input_icon {\n  height: 100%;\n  width: 25px;\n  text-align: center;\n  transition: all 0.3s;\n  line-height: 40px;\n}\n.wu-input .wu-input_icon:after {\n  content: \"\";\n  height: 100%;\n  width: 0;\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.wu-input .wu-input_validateIcon {\n  pointer-events: none;\n}\n\n.wu-input.is-active .wu-input_inner {\n  outline: none;\n  border-color: #409EFF;\n}\n\n.wu-input.is-disabled .wu-input_inner {\n  background-color: #F5F7FA;\n  border-color: #E4E7ED;\n  color: #C0C4CC;\n  cursor: not-allowed;\n}\n.wu-input.is-disabled .wu-input_inner::-moz-placeholder {\n  color: #C0C4CC;\n}\n.wu-input.is-disabled .wu-input_inner:-ms-input-placeholder {\n  color: #C0C4CC;\n}\n.wu-input.is-disabled .wu-input_inner::placeholder {\n  color: #C0C4CC;\n}\n.wu-input.is-disabled .wu-input_icon {\n  cursor: not-allowed;\n}\n\n.wu-input.is-exceed .wu-input_inner {\n  border-color: #F56C6C;\n}\n.wu-input.is-exceed .wu-input_suffix .wu-input_count {\n  color: #F56C6C;\n}\n\n.wu-input-suffix .wu-input_inner {\n  padding-right: 30px;\n}\n\n.wu-input-prefix .wu-input_inner {\n  padding-left: 30px;\n}\n\n.wu-input-medium {\n  font-size: 14px;\n}\n.wu-input-medium .wu-input_inner {\n  height: 36px;\n  line-height: 36px;\n}\n\n.wu-input-medium .wu-input_icon {\n  line-height: 36px;\n}\n\n.wu-input-small {\n  font-size: 13px;\n}\n.wu-input-small .wu-input_inner {\n  height: 32px;\n  line-height: 32px;\n}\n\n.wu-input-small .wu-input_icon {\n  line-height: 32px;\n}\n\n.wu-input-mini {\n  font-size: 12px;\n}\n.wu-input-mini .wu-input_inner {\n  height: 28px;\n  line-height: 28px;\n}\n\n.wu-input-mini .wu-input_icon {\n  line-height: 28px;\n}\n\n.wu-input-group {\n  line-height: normal;\n  display: inline-table;\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n}\n.wu-input-group > .wu-input_inner {\n  vertical-align: middle;\n  display: table-cell;\n}\n.wu-input-group .wu-input-group_append, .wu-input-group .wu-input-group_prepend {\n  background-color: #F5F7FA;\n  color: #909399;\n  vertical-align: middle;\n  display: table-cell;\n  position: relative;\n  border: 1px solid #C0C4CC;\n  border-radius: 4px;\n  padding: 0 20px;\n  width: 1px;\n  white-space: nowrap;\n}\n.wu-input-group .wu-input-group_append:focus, .wu-input-group .wu-input-group_prepend:focus {\n  outline: none;\n}\n.wu-input-group .wu-input-group_append .wu-select,\n.wu-input-group .wu-input-group_append .wu-button, .wu-input-group .wu-input-group_prepend .wu-select,\n.wu-input-group .wu-input-group_prepend .wu-button {\n  display: inline-block;\n  margin: -10px -20px;\n}\n.wu-input-group .wu-input-group_append button.wu-button,\n.wu-input-group .wu-input-group_append div.wu-select .wu-input_inner,\n.wu-input-group .wu-input-group_append div.wu-select:hover .wu-input_inner, .wu-input-group .wu-input-group_prepend button.wu-button,\n.wu-input-group .wu-input-group_prepend div.wu-select .wu-input_inner,\n.wu-input-group .wu-input-group_prepend div.wu-select:hover .wu-input_inner {\n  border-color: transparent;\n  background-color: transparent;\n  color: inherit;\n  border-top: 0;\n  border-bottom: 0;\n}\n.wu-input-group .wu-input-group_append .wu-button,\n.wu-input-group .wu-input-group_append .wu-input, .wu-input-group .wu-input-group_prepend .wu-button,\n.wu-input-group .wu-input-group_prepend .wu-input {\n  font-size: inherit;\n}\n\n.wu-input-group .wu-input-group_prepend {\n  border-right: 0;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n.wu-input-group .wu-input-group_append {\n  border-left: 0;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.wu-input-group-prepend .wu-input_inner {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.wu-input-group-prepend .wu-select .wu-input.is-focus .wu-input_inner {\n  border-color: transparent;\n}\n\n.wu-input-group-append .wu-input_inner {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.wu-input-group-append .wu-select .wu-input.is-focus .wu-input_inner {\n  border-color: transparent;\n}\n\n/** disalbe default clear on IE */\n.wu-input_inner::-ms-clear {\n  display: none;\n  width: 0;\n  height: 0;\n}";
styleInject(css_248z);

var WuInput = /** @class */ (function (_super) {
    __extends$1(WuInput, _super);
    function WuInput() {
        var _this = _super.call(this) || this;
        _this.tempTagName = '';
        _this.tempInputTagName = '';
        _this.valueLength = 0;
        /**
         * 清除
         */
        _this.clearInput = function () {
            _this.value = '';
            _this.$value = '';
        };
        return _this;
    }
    /**
     * 处理数据
     */
    WuInput.prototype.install = function () {
        this.tempInputTagName = this.type === 'textarea' ? 'textarea' : 'input';
        this.$value = this.value;
    };
    /**
     * 输入框失去焦点
     * @param evt
     */
    WuInput.prototype.handleBlur = function (evt) {
        if (this.onBlur) {
            return this.onBlur(evt, this.value);
        }
        return this.value;
    };
    /**
     * 输入框聚焦
     * @param evt
     */
    WuInput.prototype.handleFocus = function (evt) {
        if (this.onFocus) {
            return this.onFocus(evt, this.value);
        }
        return this.value;
    };
    /**
     * 输入框输入值修改
     * @param evt
     */
    WuInput.prototype.handleChange = function (evt) {
        this.$value = evt.target.value;
        this.value = evt.target.value;
        if (this.onChange) {
            return this.onChange(evt.this.value);
        }
        return this.value;
    };
    /**
     * 输入框输入事件
     * @param evt
     */
    WuInput.prototype.handleInput = function (evt) {
        evt.stopPropagation();
        this.$value = evt.target.value;
        var value = evt.target.value;
        if (this.maxLength) {
            this.valueLength = evt.target.value.length;
            if (this.valueLength > this.maxLength) {
                value = value.splice(0, this.maxLength - 1);
            }
        }
        this.value = value;
        if (this.onInput) {
            return this.onInput(evt, this.value);
        }
        return this.value;
    };
    /**
     * 聚焦
     */
    // @ts-ignore
    WuInput.prototype.focus = function () {
        this.shadowRoot.querySelector('input').focus();
    };
    /**
     * 失去焦点
     */
    // @ts-ignore
    WuInput.prototype.blur = function () {
        this.shadowRoot.querySelector('input').blur();
    };
    WuInput.prototype.render = function () {
        var _a;
        this.tempTagName = 'wu-icon-' + (this.suffixIcon || this.prefixIcon);
        this.tempInputTagName = this.type === 'textarea' ? 'textarea' : 'input';
        return (h("div", __assign({}, extractClass({}, "wu-".concat(this.tempInputTagName), (_a = {},
            _a["wu-".concat(this.tempInputTagName, "-").concat(this.size)] = this.size,
            _a['is-disabled'] = this.disabled,
            _a['wu-input-suffix'] = this.suffixIcon,
            _a['wu-input-prefix'] = this.prefixIcon,
            _a['is-block'] = this.block,
            _a)), { onMouseEnter: this === null || this === void 0 ? void 0 : this.onMouseEnter.bind(this), onMouseLeave: this === null || this === void 0 ? void 0 : this.onMouseLeave.bind(this) }),
            (this.prefixIcon || this.suffixIcon) && h(this.tempTagName, __assign({ css: "svg{width: 1em }" }, extractClass({}, 'o-input_icon', {
                'is-prefix': this.prefixIcon,
                'is-suffix': this.suffixIcon
            }))),
            h(this.tempInputTagName, { type: this.type, name: this.name, form: this.form, rows: this.rows, className: "wu-".concat(this.tempInputTagName, "_inner"), autocomplete: this.autoComplete, maxLength: this.maxLength, block: this.block, onChange: this.handleChange.bind(this), onFocus: this.handleFocus.bind(this), onBlur: this.handleBlur.bind(this), onInput: this.handleInput.bind(this) }),
            (this.clearable && !this.disabled) &&
                h("div", { class: "wu-input_suffix" },
                    h("svg", { onClick: this.clearInput.bind(this), class: "wu-input_clear", fill: "currentColor", width: "1em", height: "1em", focusable: "false", viewBox: "0 0 24 24", "aria-hidden": "true" },
                        h("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }))),
            this.maxLength && h("span", { class: "wu-input_count" },
                h("span", { class: "wu-input_count-inner" },
                    this.valueLength,
                    "/",
                    this.maxLength))));
    };
    __decorate([
        Prop({ default: 'mini', type: String }),
        __metadata("design:type", String)
    ], WuInput.prototype, "size", void 0);
    __decorate([
        Prop({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuInput.prototype, "value", void 0);
    __decorate([
        Prop({ default: false, type: Boolean }),
        __metadata("design:type", Boolean)
    ], WuInput.prototype, "disabled", void 0);
    __decorate([
        Prop({ default: 'input', type: String }),
        __metadata("design:type", String)
    ], WuInput.prototype, "type", void 0);
    __decorate([
        Prop({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuInput.prototype, "placeholder", void 0);
    __decorate([
        Prop({ default: false, type: Boolean }),
        __metadata("design:type", Boolean)
    ], WuInput.prototype, "clearable", void 0);
    __decorate([
        Prop({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuInput.prototype, "suffixIcon", void 0);
    __decorate([
        Prop({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuInput.prototype, "prefixIcon", void 0);
    __decorate([
        Prop({ default: 100, type: Number }),
        __metadata("design:type", Number)
    ], WuInput.prototype, "maxLength", void 0);
    __decorate([
        Prop({ default: 0, type: Number }),
        __metadata("design:type", Number)
    ], WuInput.prototype, "minLength", void 0);
    __decorate([
        Prop({ default: false, type: Boolean }),
        __metadata("design:type", Boolean)
    ], WuInput.prototype, "autoComplete", void 0);
    __decorate([
        Prop({ default: false, type: Boolean }),
        __metadata("design:type", Boolean)
    ], WuInput.prototype, "block", void 0);
    __decorate([
        Prop({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuInput.prototype, "name", void 0);
    __decorate([
        Prop({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuInput.prototype, "form", void 0);
    __decorate([
        Prop({ default: 1, type: Number }),
        __metadata("design:type", Number)
    ], WuInput.prototype, "rows", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", Function)
    ], WuInput.prototype, "onBlur", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", Function)
    ], WuInput.prototype, "onFocus", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", Function)
    ], WuInput.prototype, "onInput", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", Function)
    ], WuInput.prototype, "onChange", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", Function)
    ], WuInput.prototype, "onMouseEnter", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", Function)
    ], WuInput.prototype, "onMouseLeave", void 0);
    __decorate([
        Emit('blur'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], WuInput.prototype, "handleBlur", null);
    __decorate([
        Emit('focus'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], WuInput.prototype, "handleFocus", null);
    __decorate([
        Emit('change'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], WuInput.prototype, "handleChange", null);
    __decorate([
        Emit('input'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], WuInput.prototype, "handleInput", null);
    WuInput = __decorate([
        Component({
            name: 'wu-plus-input',
            css: css_248z,
        }),
        __metadata("design:paramtypes", [])
    ], WuInput);
    return WuInput;
}(HTMLElement));

export { WuButton, WuIcon, WuInput, WuRadio };
