(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("WuCodeSandbox", [], factory);
	else if(typeof exports === 'object')
		exports["WuCodeSandbox"] = factory();
	else
		root["WuCodeSandbox"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 776:
/***/ ((module) => {

module.exports = "/******/ (() => { // webpackBootstrap\n/******/ \t\"use strict\";\nvar __webpack_exports__ = {};\n\n// UNUSED EXPORTS: default\n\n;// CONCATENATED MODULE: ./src/core/connection.ts\nvar __assign = (undefined && undefined.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __read = (undefined && undefined.__read) || function (o, n) {\r\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\r\n    if (!m) return o;\r\n    var i = m.call(o), r, ar = [], e;\r\n    try {\r\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\r\n    }\r\n    catch (error) { e = { error: error }; }\r\n    finally {\r\n        try {\r\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\r\n        }\r\n        finally { if (e) throw e.error; }\r\n    }\r\n    return ar;\r\n};\r\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\r\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\r\n        if (ar || !(i in from)) {\r\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\r\n            ar[i] = from[i];\r\n        }\r\n    }\r\n    return to.concat(ar || Array.prototype.slice.call(from));\r\n};\r\nvar TYPE_MESSAGE = 'message';\r\nvar TYPE_RESPONSE = 'response';\r\nvar TYPE_SET_INTERFACE = 'set-interface';\r\nvar TYPE_SERVICE_MESSAGE = 'service-message';\r\n// @ts-expect-error this is IE11 obsolete check. It is not typed\r\nvar isIE11 = !!window.MSInputMethodContext && !!document.documentMode;\r\nvar defaultOptions = {\r\n    //Will not affect IE11 because there sandboxed iframe has not 'null' origin\r\n    //but base URL of iframe's src\r\n    allowedSenderOrigin: undefined\r\n};\r\nvar Connection = /** @class */ (function () {\r\n    function Connection(postMessage, registerOnMessageListener, options) {\r\n        if (options === void 0) { options = {}; }\r\n        var _this = this;\r\n        this.remote = {};\r\n        this.serviceMethods = {};\r\n        this.localApi = {};\r\n        this.callbacks = {};\r\n        this._resolveRemoteMethodsPromise = null;\r\n        this.options = __assign(__assign({}, defaultOptions), options);\r\n        //Random number between 0 and 100000\r\n        this.incrementalID = Math.floor(Math.random() * 100000);\r\n        this.postMessage = postMessage;\r\n        this.remoteMethodsWaitPromise = new Promise(function (resolve) {\r\n            _this._resolveRemoteMethodsPromise = resolve;\r\n        });\r\n        registerOnMessageListener(function (e) { return _this.onMessageListener(e); });\r\n    }\r\n    /**\r\n     * Listens to remote messages. Calls local method if it is called outside or call stored callback if it is response.\r\n     * @param e - onMessage event\r\n     */\r\n    Connection.prototype.onMessageListener = function (e) {\r\n        var _this = this;\r\n        var data = e.data;\r\n        var allowedSenderOrigin = this.options.allowedSenderOrigin;\r\n        if (allowedSenderOrigin && e.origin !== allowedSenderOrigin && !isIE11) {\r\n            return;\r\n        }\r\n        if (data.type === TYPE_RESPONSE) {\r\n            this.popCallback(data.callId, data.success, data.result);\r\n        }\r\n        else if (data.type === TYPE_MESSAGE) {\r\n            this\r\n                .callLocalApi(data.methodName, data.arguments)\r\n                .then(function (res) { return _this.responseOtherSide(data.callId, res); })\r\n                .catch(function (err) { return _this.responseOtherSide(data.callId, err, false); });\r\n        }\r\n        else if (data.type === TYPE_SET_INTERFACE) {\r\n            this.setInterface(data.apiMethods);\r\n            this.responseOtherSide(data.callId);\r\n        }\r\n        else if (data.type === TYPE_SERVICE_MESSAGE) {\r\n            this\r\n                .callLocalServiceMethod(data.methodName, data.arguments)\r\n                .then(function (res) { return _this.responseOtherSide(data.callId, res); })\r\n                .catch(function (err) { return _this.responseOtherSide(data.callId, err, false); });\r\n        }\r\n    };\r\n    Connection.prototype.postMessageToOtherSide = function (dataToPost) {\r\n        this.postMessage(dataToPost, '*');\r\n    };\r\n    /**\r\n     * Sets remote interface methods\r\n     * @param remote - hash with keys of remote API methods. Values is ignored\r\n     */\r\n    Connection.prototype.setInterface = function (remoteMethods) {\r\n        var _this = this;\r\n        var _a;\r\n        this.remote = {};\r\n        remoteMethods.forEach(function (key) { return _this.remote[key] = _this.createMethodWrapper(key); });\r\n        (_a = this._resolveRemoteMethodsPromise) === null || _a === void 0 ? void 0 : _a.call(this);\r\n    };\r\n    Connection.prototype.setLocalApi = function (api) {\r\n        var _this = this;\r\n        return new Promise(function (resolve, reject) {\r\n            var id = _this.registerCallback(resolve, reject);\r\n            _this.postMessageToOtherSide({\r\n                callId: id,\r\n                apiMethods: Object.keys(api),\r\n                type: TYPE_SET_INTERFACE\r\n            });\r\n        }).then(function () { return _this.localApi = api; });\r\n    };\r\n    Connection.prototype.setServiceMethods = function (api) {\r\n        this.serviceMethods = api;\r\n    };\r\n    /**\r\n     * Calls local method\r\n     * @param methodName\r\n     * @param args\r\n     * @returns {Promise.<*>|string}\r\n     */\r\n    Connection.prototype.callLocalApi = function (methodName, args) {\r\n        var _a;\r\n        return Promise.resolve((_a = this.localApi)[methodName].apply(_a, __spreadArray([], __read(args), false)));\r\n    };\r\n    /**\r\n     * Calls local method registered as \"service method\"\r\n     * @param methodName\r\n     * @param args\r\n     * @returns {Promise.<*>}\r\n     */\r\n    Connection.prototype.callLocalServiceMethod = function (methodName, args) {\r\n        var _a;\r\n        if (!this.serviceMethods[methodName]) {\r\n            throw new Error(\"Serivce method \".concat(methodName, \" is not registered\"));\r\n        }\r\n        return Promise.resolve((_a = this.serviceMethods)[methodName].apply(_a, __spreadArray([], __read(args), false)));\r\n    };\r\n    /**\r\n     * Wraps remote method with callback storing code\r\n     * @param methodName - method to wrap\r\n     * @returns {Function} - function to call as remote API interface\r\n     */\r\n    Connection.prototype.createMethodWrapper = function (methodName) {\r\n        var _this = this;\r\n        return function () {\r\n            var args = [];\r\n            for (var _i = 0; _i < arguments.length; _i++) {\r\n                args[_i] = arguments[_i];\r\n            }\r\n            return _this.callRemoteMethod.apply(_this, __spreadArray([methodName], __read(args), false));\r\n        };\r\n    };\r\n    /**\r\n     * Calls other side with arguments provided\r\n     * @param id\r\n     * @param methodName\r\n     * @param args\r\n     */\r\n    Connection.prototype.callRemoteMethod = function (methodName) {\r\n        var _this = this;\r\n        var args = [];\r\n        for (var _i = 1; _i < arguments.length; _i++) {\r\n            args[_i - 1] = arguments[_i];\r\n        }\r\n        return new Promise(function (resolve, reject) {\r\n            var id = _this.registerCallback(resolve, reject);\r\n            _this.postMessageToOtherSide({\r\n                callId: id,\r\n                methodName: methodName,\r\n                type: TYPE_MESSAGE,\r\n                arguments: args\r\n            });\r\n        });\r\n    };\r\n    /**\r\n     * Calls remote service method\r\n     * @param methodName\r\n     * @param args\r\n     * @returns {*}\r\n     */\r\n    Connection.prototype.callRemoteServiceMethod = function (methodName) {\r\n        var _this = this;\r\n        var args = [];\r\n        for (var _i = 1; _i < arguments.length; _i++) {\r\n            args[_i - 1] = arguments[_i];\r\n        }\r\n        return new Promise(function (resolve, reject) {\r\n            var id = _this.registerCallback(resolve, reject);\r\n            _this.postMessageToOtherSide({\r\n                callId: id,\r\n                methodName: methodName,\r\n                type: TYPE_SERVICE_MESSAGE,\r\n                arguments: args\r\n            });\r\n        });\r\n    };\r\n    /**\r\n     * Respond to remote call\r\n     * @param id - remote call ID\r\n     * @param result - result to pass to calling function\r\n     */\r\n    Connection.prototype.responseOtherSide = function (id, result, success) {\r\n        var _this = this;\r\n        if (success === void 0) { success = true; }\r\n        if (result instanceof Error) {\r\n            // Error could be non-serializable, so we copy properties manually\r\n            result = __spreadArray(__spreadArray([], __read(Object.keys(result)), false), ['message'], false).reduce(function (acc, it) {\r\n                acc[it] = result[it];\r\n                return acc;\r\n            }, {});\r\n        }\r\n        var doPost = function () {\r\n            return _this.postMessage({\r\n                callId: id,\r\n                type: TYPE_RESPONSE,\r\n                success: success,\r\n                result: result\r\n            }, '*');\r\n        };\r\n        try {\r\n            doPost();\r\n        }\r\n        catch (err) {\r\n            console.error('Failed to post response, recovering...', err); // eslint-disable-line no-console\r\n            if (err instanceof DOMException) {\r\n                result = JSON.parse(JSON.stringify(result));\r\n                doPost();\r\n            }\r\n        }\r\n    };\r\n    /*\r\n       * Stores callbacks to call later when remote call will be answered\r\n       */\r\n    Connection.prototype.registerCallback = function (successCallback, failureCallback) {\r\n        var id = (++this.incrementalID).toString();\r\n        this.callbacks[id] = { successCallback: successCallback, failureCallback: failureCallback };\r\n        return id;\r\n    };\r\n    /**\r\n     * Calls and delete stored callback\r\n     * @param id - call id\r\n     * @param success - was call successful\r\n     * @param result - result of remote call\r\n     */\r\n    Connection.prototype.popCallback = function (id, success, result) {\r\n        if (success) {\r\n            this.callbacks[id].successCallback(result);\r\n        }\r\n        else {\r\n            this.callbacks[id].failureCallback(result);\r\n        }\r\n        delete this.callbacks[id];\r\n    };\r\n    return Connection;\r\n}());\r\n/* harmony default export */ const connection = (Connection);\r\n\n;// CONCATENATED MODULE: ../../node_modules/.pnpm/ts-loader@9.4.2_hhrrucqyg4eysmfpujvov2ym5u/node_modules/ts-loader/index.js!./src/core/frame.ts\n\r\nvar Frame = /** @class */ (function () {\r\n    function Frame() {\r\n        var _this = this;\r\n        this.connection = new connection(window.parent.postMessage.bind(window.parent), function (listener) {\r\n            window.addEventListener('message', listener);\r\n        });\r\n        this.connection.setServiceMethods({\r\n            runCode: function (code) { return _this.runCode(code); },\r\n            importScript: function (path) { return _this.importScript(path); },\r\n            injectStyle: function (style) { return _this.injectStyle(style); },\r\n            importStyle: function (path) { return _this.importStyle(path); }\r\n        });\r\n        this.connection.callRemoteServiceMethod('iframeInitialized');\r\n    }\r\n    /**\r\n     * Creates script tag with passed code and attaches it. Runs synchronous\r\n     * @param code\r\n     * @param type\r\n     */\r\n    Frame.prototype.runCode = function (code, type) {\r\n        var scriptTag = document.createElement('script');\r\n        scriptTag.type = 'module';\r\n        scriptTag.innerHTML = code;\r\n        document.getElementsByTagName('head')[0].appendChild(scriptTag);\r\n    };\r\n    Frame.prototype.importScript = function (scriptUrl) {\r\n        var scriptTag = document.createElement('script');\r\n        scriptTag.src = scriptUrl;\r\n        document.getElementsByTagName('head')[0].appendChild(scriptTag);\r\n        return new Promise(function (resolve) { return scriptTag.onload = function () { return resolve(); }; });\r\n    };\r\n    Frame.prototype.injectStyle = function (style) {\r\n        var styleTag = document.createElement('style');\r\n        styleTag.innerHTML = style;\r\n        document.getElementsByTagName('head')[0].appendChild(styleTag);\r\n    };\r\n    Frame.prototype.importStyle = function (styleUrl) {\r\n        var linkTag = document.createElement('link');\r\n        linkTag.rel = 'stylesheet';\r\n        linkTag.href = styleUrl;\r\n        document.getElementsByTagName('head')[0].appendChild(linkTag);\r\n    };\r\n    return Frame;\r\n}());\r\nvar Websandbox = new Frame();\r\n// @ts-expect-error we explicitly export library to global namespace because\r\n// Webpack won't do it for us when this file is loaded via code-loader\r\nwindow.Websandbox = Websandbox;\r\n/* harmony default export */ const core_frame = ((/* unused pure expression or super */ null && (Websandbox)));\r\n\n/******/ })()\n;"

/***/ }),

/***/ 360:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_75_0_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(703);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_75_0_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_75_0_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_75_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(414);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_75_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_75_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_7_3_webpack_5_75_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_75_0_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".containerViewer{width:100%;height:100%}.iframe__container{position:relative;height:400px}.simple__iframe{width:100%;height:100%}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 414:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 703:
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// UNUSED EXPORTS: WuCodeSandbox

;// CONCATENATED MODULE: ../../node_modules/.pnpm/@wu-component+web-core-plus@2.0.0/node_modules/@wu-component/web-core-plus/dist/index.mjs
var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};function e(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}var n=function(){return n=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},n.apply(this,arguments)};function o(t,e,n){if(n||2===arguments.length)for(var o,r=0,i=e.length;r<i;r++)!o&&r in e||(o||(o=Array.prototype.slice.call(e,0,r)),o[r]=e[r]);return t.concat(o||Array.prototype.slice.call(e))}!function(){if(void 0!==window.Reflect&&void 0!==window.customElements&&!window.customElements.hasOwnProperty("polyfillWrapFlushCallback")){var t=HTMLElement;window.HTMLElement=function(){return Reflect.construct(t,[],this.constructor)},HTMLElement.prototype=t.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,t)}}(),"function"!=typeof window.queueMicrotask&&(window.queueMicrotask=function(t){Promise.resolve().then(t).catch((function(t){return setTimeout((function(){throw t}))}))});var r=function(t){return t.replace(/(?!^)([A-Z])/g," $1").replace(/[_\s]+(?=[a-zA-Z])/g,".").toLowerCase()};
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */function i(t){var e=document.createElement("style");return e.textContent=t,e}!function(){if(void 0!==window.Reflect&&void 0!==window.customElements&&!window.customElements.hasOwnProperty("polyfillWrapFlushCallback")){var t=HTMLElement;window.HTMLElement=function(){return Reflect.construct(t,[],this.constructor)},HTMLElement.prototype=t.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,t)}}(),"function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout;var l=function(t){return!(t||!1===t||0===t)};function c(t){if(!t||"object"!=typeof t)return t;if("function"==typeof t){var e=t.bind(null);return e.prototype=c(t.prototype),e}switch(Object.prototype.toString.call(t)){case"[object String]":return t.toString();case"[object Number]":return Number(t.toString());case"[object Boolean]":return new Boolean(t.toString());case"[object Date]":return new Date(t.getTime());case"[object Array]":for(var n=[],o=0;o<t.length;o++)n[o]=c(t[o]);return n;case"[object Object]":var r={};for(var i in t)r[i]=c(t[i]);return r;case"[object RegExp]":return new RegExp(t);default:return t}}function u(t){return t.replace(/[A-Z]/g,(function(t){return"-"+t.toLowerCase()}))}var s=function(){function t(){this.map=new Map}return t.prototype.get=function(t,e){var n=this.map.get(t);if(n)return n.get(e)},t.prototype.set=function(t,e,n){var o=this.map.get(t);o||(o=new Map,this.map.set(t,o)),null==o||o.set(e,n)},t.prototype.getProperty=function(t){return this.map.get(t)},t.prototype.forEach=function(t){this.map.forEach((function(e,n){e.forEach((function(e,o){t(e,n,o)}))}))},t.prototype.delete=function(t){this.map.delete(t)},t.prototype.deleteAll=function(){var t=this;this.map.forEach((function(e,n){t.map.delete(n)}))},t}(),a=new s,p=new s,_=new s,f=new s,h=new s,d={observed:!0,type:String,converter:function(t,e){try{var n=t;switch(e){case String:n=l(t)?t:String(t);break;case Number:n=l(t)?t:Number(t);break;case Boolean:n=!([null,"false",!1,void 0].indexOf(t)>-1);break;case Array:case Object:if("string"==typeof t)try{n=JSON.parse(t)}catch(e){n=JSON.parse(t.replace(/'/g,'"'))}else n="[object Array]"===Object.prototype.toString.call(t)||"[object Object]"===Object.prototype.toString.call(t)?t:JSON.parse(t.replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?:([^\/])/g,'"$2":$4').replace(/'([\s\S]*?)'/g,'"$1"').replace(/,(\s*})/g,"$1"))}return n}catch(e){return console.warn("formatValue file, please input element attr",e,t),function(t){try{return new Function("return "+t)()}catch(e){console.warn("eval fail",e,t)}}(t)}}};function y(t,n){void 0===n.isMountDom&&(n.isMountDom=!0),t.$options=n;var o=function(o){function r(){var e,r,i=o.call(this)||this,l="";"string"==typeof n.css&&(l=n.css),"[object Array]"===Object.prototype.toString.call(n.css)&&(l=n.css[0][1]),l&&(i.getStyles=function(){return l});var c="LightDom"!==n.is?i.shadowRoot||i.attachShadow({mode:"open"}):i;if(c&&"function"==typeof i.getStyles){var u=document.createElement("style");u.innerHTML=i.getStyles(),c.append(u)}p.forEach((function(e,n,o){n===t&&Object.defineProperty(i,o,e(i[o]))})),i.$watchMap=_.getProperty(t);var s=[];null===(e=h.getProperty(t)||new Map)||void 0===e||e.forEach((function(t,e,n){s.push(t)})),i.$injectsList=s;var a=[];return null===(r=f.getProperty(t)||new Map)||void 0===r||r.forEach((function(t,e,n){a.push(t)})),i.$providesMap=a.reduce((function(t,e){return t[e.key]=e,t}),{}),i}return e(r,o),Object.defineProperty(r,"observedAttributes",{get:function(){var e=["css"];return a.forEach((function(n,o,r){o===t&&n.observed&&e.push(r)})),e},enumerable:!1,configurable:!0}),r.isBooleanProperty=function(e){var n=!1;return a.forEach((function(o,r,i){if(r===t&&o.type===Boolean&&e===i)return n=!0})),n},r}(t);customElements.get(n.name)||customElements.define(n.name,o,n.options||{})}var v=function(t){return void 0===t&&(t={}),function(e,n){var o=Object.assign({},d,t);return e[n]=o.converter(o.default,o.type),e.constructor.createProperty(n,o)}},m=function(t){return function(e,n){return e.constructor.createState(n,t)}},b=function(t){return function(e,i,l){var c=l.value;return n(n({},l),{value:function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var l=c.call.apply(c,o([this],e,!1)),u=t||r(i);this.customDispatchEvent.call(this,u,l)}})}};function g(t,e){return function(o,r,i){o.constructor.createWatch(t,n(n({},e),{path:(null==e?void 0:e.path)||t,callbackName:r,callback:i,options:e}))}}function w(t,e){return void 0===e&&(e={}),function(n,o){n.constructor.creatProvide(t,{key:t,functionName:o,config:e})}}function k(t,e){return void 0===e&&(e={}),function(o,r){o.constructor.createInject(t,n(n({},e),{attr:r,key:t}))}}function S(t){return function(e){y(e,t)}}var E,P,C,j,A,M,O,L=0,D=function(t){function n(){var e=t.call(this)||this;return e.isInstalled=!1,e.willUpdate=!1,e.customStyleContent="",e.customStyleElement=null,e.elementId=0,e.$watchMap=new Map,e.rootPatch=function(t){e.rooDom&&ut(t,e.rooDom)},e.elementId=L++,e.$options=e.constructor.$options,e.initComponent(),e}return e(n,t),n.createProperty=function(t,e){a.set(this,t,e),p.set(this,t,this.getPropertyDescriptor(t,e))},n.getPropertyDescriptor=function(t,e){return function(n){var o=n,r=u(t);return{get:function(){var t=this.pureGetAttribute(r);return e.type===Boolean?t?e.converter(t,e.type):e.converter(o,e.type):l(n)||!l(t)||e.type===Boolean&&""===t?("function"==typeof e.converter&&(t=e.converter(t,e.type)),t):n},set:function(n){var i,l=n;"function"==typeof e.converter&&(l=e.converter(n,e.type));try{this.watchChange.call(this,t,l,c(o))}catch(t){console.warn(t)}i=l&&"object"==typeof l?JSON.stringify(l):l,l?"boolean"==typeof l?this.pureSetAttribute(r,l):this.pureSetAttribute(r,i):this.removeAttribute(r),o=l,e.type===Boolean&&!1===o&&this.update.call(this)},configurable:!0,enumerable:!0}}},n.createState=function(t,e){p.set(this,t,this.getStateDescriptor(t,e))},n.createWatch=function(t,e){_.set(this,t,e)},n.creatProvide=function(t,e){f.set(this,t,e)},n.createInject=function(t,e){h.set(this,t,e)},n.getStateDescriptor=function(t,e){return function(n){var o=n||e.default;return{get:function(){return o},set:function(e){try{this.watchChange.call(this,t,e,c(o))}catch(t){console.warn(t)}o=e,this._render()},configurable:!0,enumerable:!0}}},n.prototype.initComponent=function(){this.elementId=L++},Object.defineProperty(n.prototype,"inlineCss",{get:function(){return t.prototype.getAttribute.call(this,"css")},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"isInject",{get:function(){return Array.isArray(this.$injectsList)&&this.$injectsList.length>0},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"isProvide",{get:function(){return Object.keys(this.$providesMap).length>0},enumerable:!1,configurable:!0}),n.prototype.attributeChangedCallback=function(t,e,n){var o=this;Promise.resolve().finally((function(){var r=o[t]||n;o.preBeforeUpdate(t,e,r)&&(o._render(),o.updated(t,e,r),n!==e&&o._updateBooleanProperty(t))}))},n.prototype._updateBooleanProperty=function(t){this.constructor.isBooleanProperty(t)&&(this[t]||(this[t]=this[t]))},n.prototype.setAttribute=function(e,n){var o;o=n&&"object"==typeof n?JSON.stringify(n):n,t.prototype.setAttribute.call(this,u(e),o)},n.prototype.getAttribute=function(t){var e=t.replace(/-([a-z])/g,(function(t,e){return e.toUpperCase()})),n=this[e];return l(n)&&(n=this.pureGetAttribute(e)),n},n.prototype.pureRemoveAttribute=function(e){t.prototype.removeAttribute.call(this,e)},n.prototype.pureSetAttribute=function(e,n){t.prototype.setAttribute.call(this,e,n)},n.prototype.pureGetAttribute=function(e){return t.prototype.getAttribute.call(this,e)},n.prototype.update=function(t,e){this.isInstalled&&!this.willUpdate&&(this.willUpdate=!0,this.updateLineCss(),this.beforeUpdate(),this.beforeRender(),this._render(),this.willUpdate=!1,this.updated())},n.prototype.forceUpdate=function(){this.update([],!0)},n.prototype.watchChange=function(t,e,n){var o,r;if(null===(o=this.$watchMap)||void 0===o?void 0:o.has(t)){var i=this.$watchMap.get(t);(this.isInstalled||(null===(r=null==i?void 0:i.options)||void 0===r?void 0:r.immediate))&&this[i.callbackName].call(this,e,n)}},n.prototype.initShadowRoot=function(){this.css&&this.rooDom.appendChild(i("function"==typeof this.css?this.css():this.css));var t=this.inlineCss;return t&&(this.customStyleElement=i(t),this.customStyleContent=t,this.rooDom.appendChild(this.customStyleElement)),this.rooDom},n.prototype.updateInject=function(t){var e=this;this.isInject&&Promise.resolve().then((function(){for(var n,o,r=e.parentNode;r&&!o;)(o=r.isProvide?r.$providesMap:void 0)&&(n=r),r=r.parentNode||r.host;if(o)return e.$injectsList.forEach((function(t){var r=o[t.key].functionName;e[t.attr]=n[r]()})),void("function"==typeof t&&t());console.warn("The provide prop was not found on the parent node or the provide type is incorrect. please check ".concat(e.tagName))}))},n.prototype.connectedCallback=function(){var t=this;this.updateInject(this.update.bind(this));var e=this.initShadowRoot();this.beforeInstall(),this.install(),this.afterInstall(),this.beforeRender(),this._render(),this.isInstalled=!0,this.rendered(),this.isInject?Promise.resolve().then((function(){return t.connected(e)})):this.connected(e)},n.prototype.disconnectedCallback=function(){this.disConnected(this.rooDom),this.rootPatch(null)},n.prototype.connected=function(t){},n.prototype.disConnected=function(t){},n.prototype.preBeforeUpdate=function(t,e,n){return(null!==n||"true"!==e)&&e!==n},n.prototype.beforeUpdate=function(){},n.prototype.updated=function(t,e,n){},n.prototype.customDispatchEvent=function(t,e){var n=new CustomEvent(t,{detail:e||null,bubbles:!0,composed:!0,cancelable:!1});(null==this?void 0:this.shadowRoot)?null==this||this.shadowRoot.dispatchEvent(n):this.dispatchEvent(n)},n.prototype.beforeInstall=function(){},n.prototype.install=function(){},n.prototype.afterInstall=function(){},n.prototype.beforeRender=function(){},n.prototype.rendered=function(){},n.prototype.receiveProps=function(){},n.prototype.render=function(t,e){},n.prototype._render=function(){var t=this.render(this,this.store);if(t)return this.updateLineCss(),this.rootPatch(t)},Object.defineProperty(n.prototype,"rooDom",{get:function(){return this.shadowRoot||this},enumerable:!1,configurable:!0}),n.prototype.getStyles=function(){return""},n.prototype.updateLineCss=function(){var t=this;this.customStyleContent!=this.inlineCss&&this.inlineCss&&Promise.resolve().then((function(){var e;t.customStyleContent=t.inlineCss,t.customStyleElement?t.customStyleElement.textContent=t.customStyleContent:(t.customStyleElement=i(t.inlineCss),null===(e=t.rooDom)||void 0===e||e.appendChild(t.customStyleElement))}))},n.is="CustomWebComponent",n}(HTMLElement),T={},x=[],N=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function I(t,e){for(var n in e)t[n]=e[n];return t}function $(t){var e=t.parentNode;e&&e.removeChild(t)}function R(t,e,n){var o,r,i,l={};for(i in e)"key"==i?o=e[i]:"ref"==i?r=e[i]:l[i]=e[i];if(arguments.length>2&&(l.children=arguments.length>3?E.call(arguments,2):n),"function"==typeof t&&null!=t.defaultProps)for(i in t.defaultProps)void 0===l[i]&&(l[i]=t.defaultProps[i]);return U(t,l,o,r,null)}function U(t,e,n,o,r){var i={type:t,props:e,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==r?++C:r};return null==r&&null!=P.vnode&&P.vnode(i),i}function H(){return{current:null}}function B(t){return t.children}function W(t,e,n){"-"===e[0]?t.setProperty(e,null==n?"":n):t[e]=null==n?"":"number"!=typeof n||N.test(e)?n:n+"px"}function F(t,e,n,o,r){var i;t:if("style"===e)if("string"==typeof n)t.style.cssText=n;else{if("string"==typeof o&&(t.style.cssText=o=""),o)for(e in o)n&&e in n||W(t.style,e,"");if(n)for(e in n)o&&n[e]===o[e]||W(t.style,e,n[e])}else if("o"===e[0]&&"n"===e[1])i=e!==(e=e.replace(/Capture$/,"")),e=e.toLowerCase()in t?e.toLowerCase().slice(2):e.slice(2),t.l||(t.l={}),t.l[e+i]=n,n?o||t.addEventListener(e,i?J:G,i):t.removeEventListener(e,i?J:G,i);else if("dangerouslySetInnerHTML"!==e){if(r)e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!==e&&"height"!==e&&"href"!==e&&"list"!==e&&"form"!==e&&"tabIndex"!==e&&"download"!==e&&e in t)try{t[e]=null==n?"":n;break t}catch(t){}"function"==typeof n||(null==n||!1===n&&-1==e.indexOf("-")?t.removeAttribute(e):t.setAttribute(e,n))}}function G(t){j=!0;try{return this.l[t.type+!1](P.event?P.event(t):t)}finally{j=!1}}function J(t){j=!0;try{return this.l[t.type+!0](P.event?P.event(t):t)}finally{j=!1}}function z(t,e){this.props=t,this.context=e}function Z(t,e){if(null==e)return t.__?Z(t.__,t.__.__k.indexOf(t)+1):null;for(var n;e<t.__k.length;e++)if(null!=(n=t.__k[e])&&null!=n.__e)return n.__e;return"function"==typeof t.type?Z(t):null}function V(t){var e,n;if(null!=(t=t.__)&&null!=t.__c){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if(null!=(n=t.__k[e])&&null!=n.__e){t.__e=t.__c.base=n.__e;break}return V(t)}}function q(t){j?setTimeout(t):O(t)}function K(t){(!t.__d&&(t.__d=!0)&&A.push(t)&&!Q.__r++||M!==P.debounceRendering)&&((M=P.debounceRendering)||q)(Q)}function Q(){var t,e,n,o,r,i,l,c;for(A.sort((function(t,e){return t.__v.__b-e.__v.__b}));t=A.shift();)t.__d&&(e=A.length,o=void 0,r=void 0,l=(i=(n=t).__v).__e,(c=n.__P)&&(o=[],(r=I({},i)).__v=i.__v+1,nt(c,i,r,n.__n,void 0!==c.ownerSVGElement,null!=i.__h?[l]:null,o,null==l?Z(i):l,i.__h),ot(o,i),i.__e!=l&&V(i)),A.length>e&&A.sort((function(t,e){return t.__v.__b-e.__v.__b})));Q.__r=0}function X(t,e,n,o,r,i,l,c,u,s){var a,p,_,f,h,d,y,v=o&&o.__k||x,m=v.length;for(n.__k=[],a=0;a<e.length;a++)if(null!=(f=n.__k[a]=null==(f=e[a])||"boolean"==typeof f?null:"string"==typeof f||"number"==typeof f||"bigint"==typeof f?U(null,f,null,null,f):Array.isArray(f)?U(B,{children:f},null,null,null):f.__b>0?U(f.type,f.props,f.key,f.ref?f.ref:null,f.__v):f)){if(f.__=n,f.__b=n.__b+1,null===(_=v[a])||_&&f.key==_.key&&f.type===_.type)v[a]=void 0;else for(p=0;p<m;p++){if((_=v[p])&&f.key==_.key&&f.type===_.type){v[p]=void 0;break}_=null}nt(t,f,_=_||T,r,i,l,c,u,s),h=f.__e,(p=f.ref)&&_.ref!=p&&(y||(y=[]),_.ref&&y.push(_.ref,null,f),y.push(p,f.__c||h,f)),null!=h?(null==d&&(d=h),"function"==typeof f.type&&f.__k===_.__k?f.__d=u=Y(f,u,t):u=tt(t,f,_,v,h,u),"function"==typeof n.type&&(n.__d=u)):u&&_.__e==u&&u.parentNode!=t&&(u=Z(_))}for(n.__e=d,a=m;a--;)null!=v[a]&&("function"==typeof n.type&&null!=v[a].__e&&v[a].__e==n.__d&&(n.__d=et(o).nextSibling),lt(v[a],v[a]));if(y)for(a=0;a<y.length;a++)it(y[a],y[++a],y[++a])}function Y(t,e,n){for(var o,r=t.__k,i=0;r&&i<r.length;i++)(o=r[i])&&(o.__=t,e="function"==typeof o.type?Y(o,e,n):tt(n,o,o,r,o.__e,e));return e}function tt(t,e,n,o,r,i){var l,c,u;if(void 0!==e.__d)l=e.__d,e.__d=void 0;else if(null==n||r!=i||null==r.parentNode)t:if(null==i||i.parentNode!==t)t.appendChild(r),l=null;else{for(c=i,u=0;(c=c.nextSibling)&&u<o.length;u+=1)if(c==r)break t;t.insertBefore(r,i),l=i}return void 0!==l?l:r.nextSibling}function et(t){var e,n,o;if(null==t.type||"string"==typeof t.type)return t.__e;if(t.__k)for(e=t.__k.length-1;e>=0;e--)if((n=t.__k[e])&&(o=et(n)))return o;return null}function nt(t,e,n,o,r,i,l,c,u){var s,a,p,_,f,h,d,y,v,m,b,g,w,k,S,E=e.type;if(void 0!==e.constructor)return null;null!=n.__h&&(u=n.__h,c=e.__e=n.__e,e.__h=null,i=[c]),(s=P.__b)&&s(e);try{t:if("function"==typeof E){if(y=e.props,v=(s=E.contextType)&&o[s.__c],m=s?v?v.props.value:s.__:o,n.__c?d=(a=e.__c=n.__c).__=a.__E:("prototype"in E&&E.prototype.render?e.__c=a=new E(y,m):(e.__c=a=new z(y,m),a.constructor=E,a.render=ct),v&&v.sub(a),a.props=y,a.state||(a.state={}),a.context=m,a.__n=o,p=a.__d=!0,a.__h=[],a._sb=[]),null==a.__s&&(a.__s=a.state),null!=E.getDerivedStateFromProps&&(a.__s==a.state&&(a.__s=I({},a.__s)),I(a.__s,E.getDerivedStateFromProps(y,a.__s))),_=a.props,f=a.state,a.__v=e,p)null==E.getDerivedStateFromProps&&null!=a.componentWillMount&&a.componentWillMount(),null!=a.componentDidMount&&a.__h.push(a.componentDidMount);else{if(null==E.getDerivedStateFromProps&&y!==_&&null!=a.componentWillReceiveProps&&a.componentWillReceiveProps(y,m),!a.__e&&null!=a.shouldComponentUpdate&&!1===a.shouldComponentUpdate(y,a.__s,m)||e.__v===n.__v){for(e.__v!==n.__v&&(a.props=y,a.state=a.__s,a.__d=!1),e.__e=n.__e,e.__k=n.__k,e.__k.forEach((function(t){t&&(t.__=e)})),b=0;b<a._sb.length;b++)a.__h.push(a._sb[b]);a._sb=[],a.__h.length&&l.push(a);break t}null!=a.componentWillUpdate&&a.componentWillUpdate(y,a.__s,m),null!=a.componentDidUpdate&&a.__h.push((function(){a.componentDidUpdate(_,f,h)}))}if(a.context=m,a.props=y,a.__P=t,g=P.__r,w=0,"prototype"in E&&E.prototype.render){for(a.state=a.__s,a.__d=!1,g&&g(e),s=a.render(a.props,a.state,a.context),k=0;k<a._sb.length;k++)a.__h.push(a._sb[k]);a._sb=[]}else do{a.__d=!1,g&&g(e),s=a.render(a.props,a.state,a.context),a.state=a.__s}while(a.__d&&++w<25);a.state=a.__s,null!=a.getChildContext&&(o=I(I({},o),a.getChildContext())),p||null==a.getSnapshotBeforeUpdate||(h=a.getSnapshotBeforeUpdate(_,f)),S=null!=s&&s.type===B&&null==s.key?s.props.children:s,X(t,Array.isArray(S)?S:[S],e,n,o,r,i,l,c,u),a.base=e.__e,e.__h=null,a.__h.length&&l.push(a),d&&(a.__E=a.__=null),a.__e=!1}else null==i&&e.__v===n.__v?(e.__k=n.__k,e.__e=n.__e):e.__e=rt(n.__e,e,n,o,r,i,l,u);(s=P.diffed)&&s(e)}catch(t){e.__v=null,(u||null!=i)&&(e.__e=c,e.__h=!!u,i[i.indexOf(c)]=null),P.__e(t,e,n)}}function ot(t,e){P.__c&&P.__c(e,t),t.some((function(e){try{t=e.__h,e.__h=[],t.some((function(t){t.call(e)}))}catch(t){P.__e(t,e.__v)}}))}function rt(t,e,n,o,r,i,l,c){var u,s,a,p=n.props,_=e.props,f=e.type,h=0;if("svg"===f&&(r=!0),null!=i)for(;h<i.length;h++)if((u=i[h])&&"setAttribute"in u==!!f&&(f?u.localName===f:3===u.nodeType)){t=u,i[h]=null;break}if(null==t){if(null===f)return document.createTextNode(_);t=r?document.createElementNS("http://www.w3.org/2000/svg",f):document.createElement(f,_.is&&_),i=null,c=!1}if(null===f)p===_||c&&t.data===_||(t.data=_);else{if(i=i&&E.call(t.childNodes),s=(p=n.props||T).dangerouslySetInnerHTML,a=_.dangerouslySetInnerHTML,!c){if(null!=i)for(p={},h=0;h<t.attributes.length;h++)p[t.attributes[h].name]=t.attributes[h].value;(a||s)&&(a&&(s&&a.__html==s.__html||a.__html===t.innerHTML)||(t.innerHTML=a&&a.__html||""))}if(function(t,e,n,o,r){var i;for(i in n)"children"===i||"key"===i||i in e||F(t,i,null,n[i],o);for(i in e)r&&"function"!=typeof e[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===e[i]||F(t,i,e[i],n[i],o)}(t,_,p,r,c),a)e.__k=[];else if(h=e.props.children,X(t,Array.isArray(h)?h:[h],e,n,o,r&&"foreignObject"!==f,i,l,i?i[0]:n.__k&&Z(n,0),c),null!=i)for(h=i.length;h--;)null!=i[h]&&$(i[h]);c||("value"in _&&void 0!==(h=_.value)&&(h!==t.value||"progress"===f&&!h||"option"===f&&h!==p.value)&&F(t,"value",h,p.value,!1),"checked"in _&&void 0!==(h=_.checked)&&h!==t.checked&&F(t,"checked",h,p.checked,!1))}return t}function it(t,e,n){try{"function"==typeof t?t(e):t.current=e}catch(t){P.__e(t,n)}}function lt(t,e,n){var o,r;if(P.unmount&&P.unmount(t),(o=t.ref)&&(o.current&&o.current!==t.__e||it(o,null,e)),null!=(o=t.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(t){P.__e(t,e)}o.base=o.__P=null,t.__c=void 0}if(o=t.__k)for(r=0;r<o.length;r++)o[r]&&lt(o[r],e,n||"function"!=typeof t.type);n||null==t.__e||$(t.__e),t.__=t.__e=t.__d=void 0}function ct(t,e,n){return this.constructor(t,n)}function ut(t,e,n){var o,r,i;P.__&&P.__(t,e),r=(o="function"==typeof n)?null:n&&n.__k||e.__k,i=[],nt(e,t=(!o&&n||e).__k=R(B,null,[t]),r||T,T,void 0!==e.ownerSVGElement,!o&&n?[n]:r?null:e.firstChild?E.call(e.childNodes):null,i,!o&&n?n:r?r.__e:e.firstChild,o),ot(i,t)}E=x.slice,P={__e:function(t,e,n,o){for(var r,i,l;e=e.__;)if((r=e.__c)&&!r.__)try{if((i=r.constructor)&&null!=i.getDerivedStateFromError&&(r.setState(i.getDerivedStateFromError(t)),l=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(t,o||{}),l=r.__d),l)return r.__E=r}catch(e){t=e}throw t}},C=0,j=!1,z.prototype.setState=function(t,e){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=I({},this.state),"function"==typeof t&&(t=t(I({},n),this.props)),t&&I(n,t),null!=t&&this.__v&&(e&&this._sb.push(e),K(this))},z.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),K(this))},z.prototype.render=B,A=[],O="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Q.__r=0;

// EXTERNAL MODULE: ./src/index.scss
var src = __webpack_require__(360);
;// CONCATENATED MODULE: ./src/core/connection.ts
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TYPE_MESSAGE = 'message';
var TYPE_RESPONSE = 'response';
var TYPE_SET_INTERFACE = 'set-interface';
var TYPE_SERVICE_MESSAGE = 'service-message';
// @ts-expect-error this is IE11 obsolete check. It is not typed
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
var defaultOptions = {
    //Will not affect IE11 because there sandboxed iframe has not 'null' origin
    //but base URL of iframe's src
    allowedSenderOrigin: undefined
};
var Connection = /** @class */ (function () {
    function Connection(postMessage, registerOnMessageListener, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.remote = {};
        this.serviceMethods = {};
        this.localApi = {};
        this.callbacks = {};
        this._resolveRemoteMethodsPromise = null;
        this.options = __assign(__assign({}, defaultOptions), options);
        //Random number between 0 and 100000
        this.incrementalID = Math.floor(Math.random() * 100000);
        this.postMessage = postMessage;
        this.remoteMethodsWaitPromise = new Promise(function (resolve) {
            _this._resolveRemoteMethodsPromise = resolve;
        });
        registerOnMessageListener(function (e) { return _this.onMessageListener(e); });
    }
    /**
     * Listens to remote messages. Calls local method if it is called outside or call stored callback if it is response.
     * @param e - onMessage event
     */
    Connection.prototype.onMessageListener = function (e) {
        var _this = this;
        var data = e.data;
        var allowedSenderOrigin = this.options.allowedSenderOrigin;
        if (allowedSenderOrigin && e.origin !== allowedSenderOrigin && !isIE11) {
            return;
        }
        if (data.type === TYPE_RESPONSE) {
            this.popCallback(data.callId, data.success, data.result);
        }
        else if (data.type === TYPE_MESSAGE) {
            this
                .callLocalApi(data.methodName, data.arguments)
                .then(function (res) { return _this.responseOtherSide(data.callId, res); })
                .catch(function (err) { return _this.responseOtherSide(data.callId, err, false); });
        }
        else if (data.type === TYPE_SET_INTERFACE) {
            this.setInterface(data.apiMethods);
            this.responseOtherSide(data.callId);
        }
        else if (data.type === TYPE_SERVICE_MESSAGE) {
            this
                .callLocalServiceMethod(data.methodName, data.arguments)
                .then(function (res) { return _this.responseOtherSide(data.callId, res); })
                .catch(function (err) { return _this.responseOtherSide(data.callId, err, false); });
        }
    };
    Connection.prototype.postMessageToOtherSide = function (dataToPost) {
        this.postMessage(dataToPost, '*');
    };
    /**
     * Sets remote interface methods
     * @param remote - hash with keys of remote API methods. Values is ignored
     */
    Connection.prototype.setInterface = function (remoteMethods) {
        var _this = this;
        var _a;
        this.remote = {};
        remoteMethods.forEach(function (key) { return _this.remote[key] = _this.createMethodWrapper(key); });
        (_a = this._resolveRemoteMethodsPromise) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    Connection.prototype.setLocalApi = function (api) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var id = _this.registerCallback(resolve, reject);
            _this.postMessageToOtherSide({
                callId: id,
                apiMethods: Object.keys(api),
                type: TYPE_SET_INTERFACE
            });
        }).then(function () { return _this.localApi = api; });
    };
    Connection.prototype.setServiceMethods = function (api) {
        this.serviceMethods = api;
    };
    /**
     * Calls local method
     * @param methodName
     * @param args
     * @returns {Promise.<*>|string}
     */
    Connection.prototype.callLocalApi = function (methodName, args) {
        var _a;
        return Promise.resolve((_a = this.localApi)[methodName].apply(_a, __spreadArray([], __read(args), false)));
    };
    /**
     * Calls local method registered as "service method"
     * @param methodName
     * @param args
     * @returns {Promise.<*>}
     */
    Connection.prototype.callLocalServiceMethod = function (methodName, args) {
        var _a;
        if (!this.serviceMethods[methodName]) {
            throw new Error("Serivce method ".concat(methodName, " is not registered"));
        }
        return Promise.resolve((_a = this.serviceMethods)[methodName].apply(_a, __spreadArray([], __read(args), false)));
    };
    /**
     * Wraps remote method with callback storing code
     * @param methodName - method to wrap
     * @returns {Function} - function to call as remote API interface
     */
    Connection.prototype.createMethodWrapper = function (methodName) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.callRemoteMethod.apply(_this, __spreadArray([methodName], __read(args), false));
        };
    };
    /**
     * Calls other side with arguments provided
     * @param id
     * @param methodName
     * @param args
     */
    Connection.prototype.callRemoteMethod = function (methodName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var id = _this.registerCallback(resolve, reject);
            _this.postMessageToOtherSide({
                callId: id,
                methodName: methodName,
                type: TYPE_MESSAGE,
                arguments: args
            });
        });
    };
    /**
     * Calls remote service method
     * @param methodName
     * @param args
     * @returns {*}
     */
    Connection.prototype.callRemoteServiceMethod = function (methodName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var id = _this.registerCallback(resolve, reject);
            _this.postMessageToOtherSide({
                callId: id,
                methodName: methodName,
                type: TYPE_SERVICE_MESSAGE,
                arguments: args
            });
        });
    };
    /**
     * Respond to remote call
     * @param id - remote call ID
     * @param result - result to pass to calling function
     */
    Connection.prototype.responseOtherSide = function (id, result, success) {
        var _this = this;
        if (success === void 0) { success = true; }
        if (result instanceof Error) {
            // Error could be non-serializable, so we copy properties manually
            result = __spreadArray(__spreadArray([], __read(Object.keys(result)), false), ['message'], false).reduce(function (acc, it) {
                acc[it] = result[it];
                return acc;
            }, {});
        }
        var doPost = function () {
            return _this.postMessage({
                callId: id,
                type: TYPE_RESPONSE,
                success: success,
                result: result
            }, '*');
        };
        try {
            doPost();
        }
        catch (err) {
            console.error('Failed to post response, recovering...', err); // eslint-disable-line no-console
            if (err instanceof DOMException) {
                result = JSON.parse(JSON.stringify(result));
                doPost();
            }
        }
    };
    /*
       * Stores callbacks to call later when remote call will be answered
       */
    Connection.prototype.registerCallback = function (successCallback, failureCallback) {
        var id = (++this.incrementalID).toString();
        this.callbacks[id] = { successCallback: successCallback, failureCallback: failureCallback };
        return id;
    };
    /**
     * Calls and delete stored callback
     * @param id - call id
     * @param success - was call successful
     * @param result - result of remote call
     */
    Connection.prototype.popCallback = function (id, success, result) {
        if (success) {
            this.callbacks[id].successCallback(result);
        }
        else {
            this.callbacks[id].failureCallback(result);
        }
        delete this.callbacks[id];
    };
    return Connection;
}());
/* harmony default export */ const connection = (Connection);

// EXTERNAL MODULE: ../../node_modules/.pnpm/compile-code-loader@1.0.0/node_modules/compile-code-loader/index.js!./src/core/frame.ts
var core_frame = __webpack_require__(776);
var frame_default = /*#__PURE__*/__webpack_require__.n(core_frame);
;// CONCATENATED MODULE: ./src/core/websandbox.ts
var websandbox_assign = (undefined && undefined.__assign) || function () {
    websandbox_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return websandbox_assign.apply(this, arguments);
};

// @ts-ignore

var BaseOptions = {
    frameContainer: 'body',
    frameClassName: 'websandbox__frame',
    frameSrc: null,
    frameContent: "\n<!DOCTYPE html>\n<html>\n<head><meta charset=\"UTF-8\"></head>\n<body></body>\n</html>\n  ",
    codeToRunBeforeInit: null,
    initialStyles: null,
    baseUrl: null,
    allowPointerLock: false,
    allowFullScreen: false,
    sandboxAdditionalAttributes: ''
};
var Websandbox = /** @class */ (function () {
    /**
     * {Constructor}
     * @param localApi
     * @param options
     */
    function Websandbox(localApi, options) {
        var _this = this;
        this.connection = null;
        this.removeMessageListener = function () { };
        this.validateOptions(options);
        this.options = websandbox_assign(websandbox_assign({}, BaseOptions), options);
        this.iframe = this.createIframe();
        this.promise = new Promise(function (resolve) {
            _this.connection = new connection(_this.iframe.contentWindow.postMessage.bind(_this.iframe.contentWindow), function (listener) {
                var sourceCheckListener = function (event) {
                    if (event.source !== _this.iframe.contentWindow) {
                        return;
                    }
                    return listener(event);
                };
                window.addEventListener('message', sourceCheckListener);
                _this.removeMessageListener = function () { return window.removeEventListener('message', sourceCheckListener); };
            }, { allowedSenderOrigin: 'null' });
            _this.connection.setServiceMethods({
                iframeInitialized: function () {
                    return _this.connection
                        .setLocalApi(localApi)
                        .then(function () { return resolve(_this); });
                }
            });
        });
    }
    /**
     * Creates sandbox instancea
     * @param localApi Api of this side. Will be available for sandboxed code as remoteApi
     * @param options Options of created sandbox
     */
    Websandbox.create = function (localApi, options) {
        if (options === void 0) { options = {}; }
        return new Websandbox(localApi, options);
    };
    Websandbox.prototype.validateOptions = function (options) {
        var _a;
        if (options.frameSrc && (options.frameContent || options.initialStyles || options.baseUrl || options.codeToRunBeforeInit)) {
            throw new Error('You can not set both "frameSrc" and any of frameContent,initialStyles,baseUrl,codeToRunBeforeInit options');
        }
        if ('frameContent' in options && !((_a = options.frameContent) === null || _a === void 0 ? void 0 : _a.includes('<head>'))) {
            throw new Error('Websandbox: iFrame content must have "<head>" tag.');
        }
    };
    Websandbox.prototype._prepareFrameContent = function (options) {
        var _a, _b;
        var frameContent = (_b = (_a = options.frameContent) === null || _a === void 0 ? void 0 : _a.replace('<head>', "<head>\n<script>".concat((frame_default()), "</script>"))) !== null && _b !== void 0 ? _b : '';
        if (options.initialStyles) {
            frameContent = frameContent
                .replace('</head>', "<style>".concat(options.initialStyles, "</style>\n</head>"));
        }
        if (options.baseUrl) {
            frameContent = frameContent
                .replace('<head>', "<head>\n<base href=\"".concat(options.baseUrl, "\"/>"));
        }
        if (options.codeToRunBeforeInit) {
            frameContent = frameContent
                .replace('</head>', "<script>".concat(options.codeToRunBeforeInit, "</script>\n</head>"));
        }
        return frameContent;
    };
    Websandbox.prototype.createIframe = function () {
        var _a;
        var domContainer = this.options.domContainer || document;
        var containerSelector = this.options.frameContainer;
        var container = typeof containerSelector === 'string'
            ? domContainer.querySelector(containerSelector)
            : containerSelector;
        if (!container) {
            throw new Error('Websandbox: Cannot find container for sandbox ' + container);
        }
        var frame = document.createElement('iframe');
        frame.sandbox = "allow-scripts ".concat(this.options.sandboxAdditionalAttributes);
        frame.allow = "".concat(this.options.allowAdditionalAttributes);
        frame.className = (_a = this.options.frameClassName) !== null && _a !== void 0 ? _a : '';
        frame.frameBorder = '0';
        if (this.options.allowFullScreen) {
            frame.allowFullscreen = true;
        }
        if (this.options.frameSrc) {
            frame.src = this.options.frameSrc;
            container.appendChild(frame);
            return frame;
        }
        frame.setAttribute('srcdoc', this._prepareFrameContent(this.options));
        container.appendChild(frame);
        return frame;
    };
    Websandbox.prototype.destroy = function () {
        this.iframe.remove();
        this.removeMessageListener();
    };
    Websandbox.prototype._runCode = function (code) {
        return this.connection.callRemoteServiceMethod('runCode', code);
    };
    Websandbox.prototype._runFunction = function (fn) {
        return this._runCode("(".concat(fn.toString(), ")()"));
    };
    Websandbox.prototype.run = function (codeOrFunction) {
        if (codeOrFunction.name) {
            return this._runFunction(codeOrFunction);
        }
        return this._runCode(codeOrFunction);
    };
    Websandbox.prototype.importScript = function (path) {
        return this.connection.callRemoteServiceMethod('importScript', path);
    };
    Websandbox.prototype.injectStyle = function (style) {
        return this.connection.callRemoteServiceMethod('injectStyle', style);
    };
    return Websandbox;
}());
/* harmony default export */ const websandbox = (Websandbox);

;// CONCATENATED MODULE: ./src/index.tsx
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var src_assign = (undefined && undefined.__assign) || function () {
    src_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return src_assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var WuCodeSandbox = /** @class */ (function (_super) {
    __extends(WuCodeSandbox, _super);
    function WuCodeSandbox() {
        var _this = _super.call(this) || this;
        _this.code = '';
        _this.options = {};
        _this.isSandboxInit = false;
        return _this;
    }
    Object.defineProperty(WuCodeSandbox.prototype, "sandbox", {
        get: function () {
            if (this._sandbox) {
                return this._sandbox;
            }
            this._sandbox = this.initSandbox();
            return this._sandbox;
        },
        set: function (value) {
            this._sandbox = value;
        },
        enumerable: false,
        configurable: true
    });
    WuCodeSandbox.prototype.formatFile = function (doc) {
        return new Promise(function (resolve) {
            if (doc.startsWith("data:")) {
                var arr = doc.split(',');
                // const mime = arr[0].match(/:(.*?);/)[1];
                // const suffix = mime.split('/')[1];
                var bstr = atob(arr[1]);
                var n = bstr.length;
                var u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                var file = new File([u8arr], "srcdoc.html", {
                    type: "text/html"
                });
                var reader_1 = new FileReader();
                reader_1.onload = function () {
                    // 语句是为了显示内容换行
                    // @ts-ignore
                    /*const str = reader.result?.replace(/\n/g,"<br/>");
                    console.log(str);*/
                    resolve(reader_1.result);
                };
                reader_1.readAsText(file, 'utf-8');
            }
            else {
                resolve(doc);
            }
        });
    };
    WuCodeSandbox.prototype.connected = function (shadowRoot) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.sandbox = this.initSandbox();
                return [2 /*return*/];
            });
        });
    };
    /**
     * 初始化沙箱
     */
    WuCodeSandbox.prototype.initSandbox = function () {
        var _this = this;
        this.localApi = {};
        var sandbox = websandbox.create(this.localApi, src_assign({ frameContainer: '.iframe__container', frameClassName: 'simple__iframe', domContainer: this.shadowRoot, codeToRunBeforeInit: this.code || '', allowFullScreen: false }, this.options));
        sandbox.promise
            .then(function () {
            return sandbox.run("\n                    Websandbox.connection.setLocalApi({\n                        getWebsandboxConnectionInstance: function(message) {\n                            return Websandbox.connection;\n                        }\n                    });\n                    ");
        }).then(function () {
            _this.isSandboxInit = true;
            // 沙箱初始化成功
            _this.emitEvent(sandbox);
            console.log("2222222");
            _this.emitSuccessEvent();
        });
        return sandbox;
    };
    /**
     * 执行code
     * @param code
     * @param callback
     */
    WuCodeSandbox.prototype.runCode = function (code, callback) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sandbox = _this.sandbox;
            return sandbox.promise
                .then(function (res) { return sandbox.run(code); })
                .then(function (res) {
                callback === null || callback === void 0 ? void 0 : callback(true);
                resolve(res);
            });
        });
    };
    /**
     * 更新配置
     */
    WuCodeSandbox.prototype.updateConfig = function (options) {
        this.update();
        this.initSandbox();
    };
    /**
     * 调用iframe沙箱内部方法
     * @param name
     * @param params
     * @param callback
     */
    WuCodeSandbox.prototype.callSandboxFunction = function (name, params, callback) {
        var _this = this;
        var sandbox = this.sandbox;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, sandbox.promise
                        .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        var api, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    api = sandbox.connection.remote[name];
                                    if (!api) {
                                        reject("sandbox.connection.remote.".concat(name, " not found, before that call Websandbox.connection.setLocalApi inside the sandbox "));
                                    }
                                    if (!(typeof api === 'function')) return [3 /*break*/, 2];
                                    return [4 /*yield*/, api(params)];
                                case 1:
                                    result = _a.sent();
                                    callback === null || callback === void 0 ? void 0 : callback(result, res);
                                    resolve(result);
                                    return [3 /*break*/, 3];
                                case 2:
                                    callback === null || callback === void 0 ? void 0 : callback(api, res);
                                    resolve(api);
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        }); });
    };
    /**
     * Sandbox 注入数据
     * @param name
     * @param value
     * @param callback
     */
    WuCodeSandbox.prototype.injectSandboxLocalApi = function (name, value, callback) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sandbox = _this.sandbox;
            var functionValue = '';
            if (typeof value === 'function') {
                functionValue = value.toString().replace(/\n/g, "");
            }
            else {
                functionValue = value;
            }
            var code = "Websandbox.connection.setLocalApi({\n                ".concat(name, ": ").concat(functionValue, "\n            }); ");
            return sandbox.promise
                .then(function (res) { return sandbox.run(code); })
                .then(function (res) {
                callback === null || callback === void 0 ? void 0 : callback(res);
                resolve(res);
            });
        });
    };
    WuCodeSandbox.prototype.emitEvent = function (data) {
        console.log("data", data);
        return data || {};
    };
    WuCodeSandbox.prototype.emitSuccessEvent = function () {
        return true;
    };
    WuCodeSandbox.prototype.render = function (_renderProps, _store) {
        if (_renderProps === void 0) { _renderProps = {}; }
        if (_store === void 0) { _store = {}; }
        /*const sandbox = () => [ 'allow-forms', 'allow-modals', 'allow-pointer-lock', 'allow-popups',  'allow-same-origin', 'allow-scripts', 'allow-top-navigation-by-user-activation' ].join(' ');*/
        return (R(B, null,
            R("div", { class: "iframe__container", style: { height: this.height, width: this.width } })));
    };
    __decorate([
        v({ type: String, default: '' }),
        __metadata("design:type", Object)
    ], WuCodeSandbox.prototype, "code", void 0);
    __decorate([
        v({ type: Object, default: {} }),
        __metadata("design:type", Object)
    ], WuCodeSandbox.prototype, "options", void 0);
    __decorate([
        v({ type: String, default: "100%" }),
        __metadata("design:type", String)
    ], WuCodeSandbox.prototype, "width", void 0);
    __decorate([
        v({ type: String, default: "400px" }),
        __metadata("design:type", String)
    ], WuCodeSandbox.prototype, "height", void 0);
    __decorate([
        b("message"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], WuCodeSandbox.prototype, "emitEvent", null);
    __decorate([
        b("success"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], WuCodeSandbox.prototype, "emitSuccessEvent", null);
    WuCodeSandbox = __decorate([
        S({
            name: 'wu-code-sandbox',
            css: src/* default */.Z,
        }),
        __metadata("design:paramtypes", [])
    ], WuCodeSandbox);
    return WuCodeSandbox;
}(D));


})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});