!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).WebUIPlus={})}(this,(function(t){"use strict";var e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},e(t,n)};function n(t,e,n,o){var r,i=arguments.length,s=i<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(i<3?r(s):i>3?r(e,n,s):r(e,n))||s);return i>3&&s&&Object.defineProperty(e,n,s),s}function o(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}const r=new WeakMap;function i(t,e){return r.get(t)&&r.get(t).get(e)}function s(t,e,n){if(void 0===e)throw new TypeError;const o=i(e,n);return o&&o.get(t)}function a(t,e,n,o){if(o&&!["string","symbol"].includes(typeof o))throw new TypeError;(i(n,o)||function(t,e){const n=r.get(t)||new Map;r.set(t,n);const o=n.get(e)||new Map;return n.set(e,o),o}(n,o)).set(t,e)}function l(t,e,n){return s(t,e,n)?s(t,e,n):Object.getPrototypeOf(e)?l(t,Object.getPrototypeOf(e),n):void 0}const c={decorate:function(t,e,n,o){if(!Array.isArray(t)||0===t.length)throw new TypeError;return void 0!==n?function(t,e,n,o){return t.reverse().forEach((t=>{o=t(e,n,o)||o})),o}(t,e,n,o):"function"==typeof e?function(t,e){return t.reverse().forEach((t=>{const n=t(e);n&&(e=n)})),e}(t,e):void 0},defineMetadata:function(t,e,n,o){a(t,e,n,o)},getMetadata:function(t,e,n){return l(t,e,n)},getOwnMetadata:function(t,e,n){return s(t,e,n)},hasMetadata:function(t,e,n){return!!l(t,e,n)},hasOwnMetadata:function(t,e,n){return!!s(t,e,n)},metadata:function(t,e){return function(n,o){a(t,e,n,o)}}};Object.assign(Reflect,c),function(){if(void 0!==window.Reflect&&void 0!==window.customElements&&!window.customElements.hasOwnProperty("polyfillWrapFlushCallback")){var t=HTMLElement;window.HTMLElement=function(){return Reflect.construct(t,[],this.constructor)},HTMLElement.prototype=t.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,t)}}(),"function"!=typeof window.queueMicrotask&&(window.queueMicrotask=function(t){Promise.resolve().then(t).catch((function(t){return setTimeout((function(){throw t}))}))});var u=function(t,e){return u=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},u(t,e)};function p(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}u(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}function f(t,e,n){if(n||2===arguments.length)for(var o,r=0,i=e.length;r<i;r++)!o&&r in e||(o||(o=Array.prototype.slice.call(e,0,r)),o[r]=e[r]);return t.concat(o||Array.prototype.slice.call(e))}var d={store:null,root:self||window||function(){return this}(),mapping:{},vnode:void 0},h=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,v=Symbol("PROP_META_KEY"),y=Symbol("STATE_META_KEY"),m=Symbol("COMPONENT_CUSTOM_EVENT"),b=Symbol("COMPONENT_CUSTOM_INJECT"),g=Symbol("COMPONENT_CUSTOM_PROVIDE"),w=Symbol("COMPONENT_WATCH"),_=function(){function t(){this.subs=[]}return t.prototype.addSub=function(t){this.subs.includes(t)||this.subs.push(t)},t.prototype.notify=function(){this.subs.forEach((function(t){t.update()}))},t.prototype.depend=function(){t.target&&(this.subs.includes(t.target)||this.subs.push(t.target))},t}(),x="__proto__"in{};function E(t,e,n,o){Object.defineProperty(t,e,{value:n,enumerable:!!o,writable:!0,configurable:!0})}var N=Array.prototype,O=Object.create(N);["push","pop","shift","unshift","sort","splice","reverse"].forEach((function(t){O[t]=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var o=N[t].apply(this,e),r=this.__observer__;return["push","unshift","splice"].includes(t)&&r.walk(this),r.dep.notify(),o}}));var C=function(){function t(t){this.dep=new _,E(t,"__observer__",this),Array.isArray(t)&&(x?t.__proto__=O:Object.getOwnPropertyNames(O).forEach((function(e){E(t,e,O[e])}))),this.walk(t)}return t.prototype.walk=function(t){Object.keys(t).forEach((function(e){!function(t,e,n){var o=new _,r=Object.getOwnPropertyDescriptor(t,e);if(!r||!1!==r.configurable){var i=r&&r.get,s=r&&r.set;i&&!s||2!==arguments.length||(n=t[e]);var a=j(n);Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){var e=i?i.call(t):n;return _.target&&(o.addSub(_.target),a&&a.dep.addSub(_.target)),e},set:function(e){e!==n&&(n=e,i&&!s||(s?s.call(t,e):n=e,a=j(e),o.notify()))}})}}(t,e,t[e])}))},t}();function j(t){if(t&&"object"==typeof t)return"__observer__"in t?t.__observer__:new C(t)}var P=0,T=function(){function t(t,e,n,o){var r=this;if(void 0===o&&(o={}),this.callbacks=[],this.id=P++,this.$vm=t,this.expr=e,this.deep=!!o.deep,this.getter="function"==typeof e?e:function(t){t+=".";for(var e=[],n="",o=0;o<t.length;o++){var r=t[o];if(/\[|\./.test(r))e.push(n),n="";else{if(/\W/.test(r))continue;n+=r}}return function(t){return e.reduce((function(t,e){return t[e]}),t)}}(e),this.cb=n,this.value=this.get(),"undefined"!=typeof Promise){var i=Promise.resolve();this.timerFunc=function(){i.then(r.flushCallbacks)}}}return t.prototype.get=function(){_.target=this;var t=this.getter.call(this.$vm,this.$vm);return this.deep&&function(t){var e=function(t){(function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return e.some((function(e){return Object.prototype.toString.call(t).slice(8,-1).toLowerCase()===e}))})(t,"array","object")&&Object.keys(t).forEach((function(n){var o=t[n];e(o)}))};e(t)}(t),_.target=null,t},t.prototype.update=function(){var t=this.get(),e=this.value;this.value=t,this.cb.call(this.$vm,t,e)},t.prototype.run=function(){console.log("update")},t.prototype.flushCallbacks=function(){for(var t=0;t<this.callbacks.length;t++)this.callbacks[t]();this.callbacks=[]},t}(),S=function(){function t(t){this.vm=t}return t.prototype.proxy=function(t,e,n){Object.defineProperty(t,n,{get:function(){return this[e][n]},set:function(t){this[e][n]=t}})},t}();function A(t){return void 0===t&&(t={default:void 0}),function(e,n){!function(t,e,n){var o;void 0===t&&(t={default:void 0});var r=t.default,i=null!==(o=Reflect.getMetadata(v,e))&&void 0!==o?o:[];i.push({default:r,type:t.type,attr:n}),Reflect.defineMetadata(v,i,e)}(t,e,n)}}var M=function(t){function e(e){var n,o,r=t.call(this,null==e?void 0:e.vm)||this,i=e||{},s=i.propsList,a=void 0===s?[]:s,l=i.statesList,c=void 0===l?[]:l;return r.propsList=a.length?a:null!==(n=Reflect.getMetadata(v,r.vm))&&void 0!==n?n:[],r.statesList=c.length?c:null!==(o=Reflect.getMetadata(y,r.vm))&&void 0!==o?o:[],r.observer(),r}return p(e,t),e.prototype.observer=function(){var t=this,e={},n=this.propsList,o=this.statesList;e=n.reduce((function(t,e,n){return t[e.attr]=e.default,t}),e),e=o.reduce((function(t,e,n){return t[e.attr]=e.default,t}),e||{}),this.vm.$reactive=e;for(var r=Object.keys(this.vm.$reactive),i=r.length;i--;){var s=r[i];this.proxy(this.vm,"$reactive",s)}j(this.vm.$reactive),new T(this.vm.$reactive,(function(){return t.vm.render.call(t.vm,t.vm.$reactive,null)}),(function(e,n){t.vm.update.call(t.vm,t.vm.$reactive,null)}))},e}(S),k=function(t){return t.replace(/(?!^)([A-Z])/g," $1").replace(/[_\s]+(?=[a-zA-Z])/g,".").toLowerCase()};function L(t){return t.replace(/-(\w)/g,(function(t,e){return e.toUpperCase()}))}function R(t){return t.children}function $(t,e){null!=t&&("function"==typeof t?t(e):t.current=e)}function I(t){return"[object Array]"===Object.prototype.toString.call(t)}function U(t){return t.indexOf("-")>-1?t.replace(/(\-([a-z]))/g,(function(t,e,n,o,r){return n.toUpperCase()})):t}
/**
     * @license
     * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
     */!function(){if(void 0!==window.Reflect&&void 0!==window.customElements&&!window.customElements.hasOwnProperty("polyfillWrapFlushCallback")){var t=HTMLElement;window.HTMLElement=function(){return Reflect.construct(t,[],this.constructor)},HTMLElement.prototype=t.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,t)}}(),"function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout;var H=function(){function t(t){var e;this.vm=t,this.emitList=null!==(e=Reflect.getMetadata(m,this.vm))&&void 0!==e?e:[],this.observerEmits()}return t.prototype.observerEmits=function(){var t=this,e=this;this.emitList.forEach((function(n){Object.defineProperty(t.vm,n.methodName,{get:function(){return function(){for(var t,o=[],r=0;r<arguments.length;r++)o[r]=arguments[r];var i=(t=n.methodFun).call.apply(t,f([e.vm],o,!1)),s=n.eventName?n.eventName:k(n.methodName);e.vm._dispatchEvent.call(e.vm,s,i)}}})}))},t}(),z=function(t){function e(e,n){var o;void 0===n&&(n=[]);var r=t.call(this,e)||this;return r.watchList=n.length?n:null!==(o=Reflect.getMetadata(w,r.vm))&&void 0!==o?o:[],r.observer(),r}return p(e,t),e.prototype.observer=function(){var t,e=this;t=this.watchList.reduce((function(t,n,o){return e.$watch(n.path,(function(){for(var t,o=[],r=0;r<arguments.length;r++)o[r]=arguments[r];(t=e.vm[n.callbackName]).call.apply(t,f([e.vm],o,!1))}),n),t[n.path]=n,t}),{}),this.vm.$watch=t},e.prototype.$watch=function(t,e,n){void 0===n&&(n={}),"object"==typeof e&&(e=(n=e).handler);var o=new T(this.vm.$reactive,t,e,n);return n.immediate&&e.call(this.vm,o.value),function(){}},e}(S);function D(t){return function(e){!function(t,e){void 0===t.isMountDom&&(t.isMountDom=!0),customElements.get(t.name)||(e.$options=t,customElements.define(t.name,e,t.options||{}))}(t,e)}}function V(t){var e=t.parentNode;e&&e.removeChild(t)}function W(t,e,n){return"string"==typeof e||"number"==typeof e?void 0!==t.splitText:"string"==typeof e.nodeName?!t._componentConstructor&&F(t,e.nodeName):"function"==typeof e.nodeName?d.mapping[t.nodeName.toLowerCase()]===e.nodeName:n||t._componentConstructor===e.nodeName}function F(t,e){return t.normalizedNodeName===e||t.nodeName.toLowerCase()===e.toLowerCase()}function B(t){return this._listeners[t.type](d.event&&d.event(t)||t)}var J={};function q(t,e,n,o,r,i){if("className"===e&&(e="class"),"o"==e[0]&&"-"==e[1])J[e]&&J[e](t,o,i);else if("key"===e);else if("ref"===e)$(n,null),$(o,t);else if("class"!==e||r)if("style"===e){if(o&&"string"!=typeof o&&"string"!=typeof n||(t.style.cssText=o||""),o&&"object"==typeof o){if("string"!=typeof n)for(var s in n)s in o||(t.style[s]="");for(var s in o)t.style[s]="number"==typeof o[s]&&!1===h.test(s)?o[s]+"px":o[s]}}else if("dangerouslySetInnerHTML"===e)o&&(t.innerHTML=o.__html||"");else if("o"==e[0]&&"n"==e[1])!function(t,e,n,o){var r=e!==(e=e.replace(/Capture$/,"")),i=e.toLowerCase();e=(i in t?i:e).slice(2),n?o||t.addEventListener(e,B,r):t.removeEventListener(e,B,r),(t._listeners||(t._listeners={}))[e]=n}(t,e,o,n);else if("INPUT"===t.nodeName&&"value"===e)t[e]=null==o?"":o;else if("list"!==e&&"type"!==e&&"css"!==e&&!r&&e in t&&""!==o){try{t[e]=null==o?"":o}catch(t){}null!=o&&!1!==o||"spellcheck"==e||(t.pureRemoveAttribute?t.pureRemoveAttribute(e):t.removeAttribute(e))}else{var a=r&&e!==(e=e.replace(/^xlink:?/,""));null==o||!1===o?a?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.pureRemoveAttribute?t.pureRemoveAttribute(e):t.removeAttribute(e):"function"!=typeof o&&(a?t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),o):t.pureSetAttribute?t.pureSetAttribute(e,o):t.setAttribute(e,o))}else t.className=o||""}var Y=0,Z=!1,K=!1;function G(t,e,n,o,r){var i;if(t||e)return Y++||(Z=null!=n&&void 0!==n.ownerSVGElement,K=null!=t&&!("prevProps"in t)),e&&e.nodeName===R&&(e=e.children),I(e)?n?X(n,e,K,o,r):(i=[],e.forEach((function(e,n){var s=Q(0===n?t:null,e,o,r);i.push(s)}))):(I(t)?t.forEach((function(t,n){0===n?i=Q(t,e,o,r):tt(t,!1)})):i=Q(t,e,o,r),n&&i.parentNode!==n&&n.appendChild(i)),--Y||(K=!1),i}function Q(t,e,n,o){t&&e&&t.props&&(t.props.children=e.children);var r=t,i=Z;if(null!=e&&"boolean"!=typeof e||(e=""),"string"==typeof e||"number"==typeof e)return t&&void 0!==t.splitText&&t.parentNode&&(!t._component||n)?t.nodeValue!=e&&(t.nodeValue=e):(r=document.createTextNode(e),t&&(t.parentNode&&t.parentNode.replaceChild(r,t),tt(t,!0))),r.prevProps=!0,r;var s,a,l=e.nodeName;if("function"==typeof l)for(var c in d.mapping)if(d.mapping[c]===l){l=c,e.nodeName=c;break}if(Z="svg"===l||"foreignObject"!==l&&Z,l=String(l),(!t||!F(t,l))&&(s=l,(a=Z?document.createElementNS("http://www.w3.org/2000/svg",s):document.createElement(s)).normalizedNodeName=s,r=a,t)){for(;t.firstChild;)r.appendChild(t.firstChild);t.parentNode&&t.parentNode.replaceChild(r,t),tt(t,!0)}var u=r.firstChild,p=r.prevProps,f=e.children;if(null==p){p=r.prevProps={};for(var h=r.attributes,v=h.length;v--;)p[h[v].name]=h[v].value}return!K&&f&&1===f.length&&"string"==typeof f[0]&&null!=u&&void 0!==u.splitText&&null==u.nextSibling?u.nodeValue!=f[0]&&(u.nodeValue=f[0]):(f&&f.length||null!=u)&&("CustomWebComponent"==r.constructor.is&&r.constructor.noSlot||X(r,f,K||null!=p.dangerouslySetInnerHTML,n,o)),function(t,e,n,o,r){var i,s,a=t.update;for(i in t.receiveProps&&(s=Object.assign({},n)),n)e&&null!=e[i]||null==n[i]||(q(t,i,n[i],n[i]=void 0,Z,o),a&&delete t.props[i]);for(i in e)if(a&&"object"==typeof e[i]&&"ref"!==i){"style"===i&&q(t,i,n[i],n[i]=e[i],Z,o);var l=L(i);t.props[l]=n[l]=e[i]}else"children"===i||i in n&&e[i]===("value"===i||"checked"===i?t[i]:n[i])||(q(t,i,n[i],e[i],Z,o),-1!==t.nodeName.indexOf("-")?(t.props=t.props||{},l=L(i),t.props[l]=n[l]=e[i]):n[i]=e[i]);a&&!r&&t.parentNode&&!1!==t.receiveProps(t.props,s)&&t.update()}(r,e.attributes,p,n,o),r.props&&(r.props.children=e.children),Z=i,r}function X(t,e,n,o,r){var i,s,a,l,c,u=t.childNodes,p=[],f={},d=0,h=0,v=(null==u?void 0:u.length)||0,y=0,m=e?e.length:0;if(0!==v)for(var b=0;b<v;b++){var g=u[b],w=g.prevProps;null!=(_=m&&w?g._component?g._component.__key:w.key:null)?(d++,f[_]=g):(w||(void 0!==g.splitText?!n||g.nodeValue.trim():n))&&(p[y++]=g)}if(0!==m)for(b=0;b<m;b++){var _;if(c=null,l=e[b])if(null!=(_=l.key))d&&void 0!==f[_]&&(c=f[_],f[_]=void 0,d--);else if(!c&&h<y)for(i=h;i<y;i++)if(void 0!==p[i]&&W(s=p[i],l,n)){c=s,p[i]=void 0,i===y-1&&y--,i===h&&h++;break}c=Q(c,l,o,r),a=u[b],c&&c!==t&&c!==a&&(null==a?t.appendChild(c):c===a.nextSibling?V(a):t.insertBefore(c,a))}if(d)for(var b in f)void 0!==f[b]&&tt(f[b],!1);for(;h<=y;)void 0!==(c=p[y--])&&tt(c,!1)}function tt(t,e){null!=t.prevProps&&t.prevProps.ref&&("function"==typeof t.prevProps.ref?t.prevProps.ref(null):t.prevProps.ref.current&&(t.prevProps.ref.current=null)),!1!==e&&null!=t.prevProps||V(t),function(t){for(t=t.lastChild;t;){var e=t.previousSibling;tt(t,!0),t=e}}(t)}var et=[];function nt(t,e){var n,o,r,i,s=[];for(i=arguments.length;i-- >2;)et.push(arguments[i]);for(e&&null!=e.children&&(et.length||et.push(e.children),delete e.children);et.length;)if((o=et.pop())&&void 0!==o.pop)for(i=o.length;i--;)et.push(o[i]);else"boolean"==typeof o&&(o=null),(r="function"!=typeof t)&&(null==o?o="":"number"==typeof o?o=String(o):"string"!=typeof o&&(r=!1)),r&&n?s[s.length-1]+=o:0===s.length?s=[o]:s.push(o),n=r;if(t===R)return s;var a={nodeName:t,children:s,attributes:null==e?void 0:e,key:null==e?void 0:e.key};return void 0!==d.vnode&&d.vnode(a),a}var ot=function(t){function e(){var e=t.call(this)||this;return e.rootNode=null,e.isInstalled=!1,e.willUpdate=!1,e._customStyleContent="",e.props={},e.prevProps={},e._customStyleElement=null,e.provides=[],e.$options=e.constructor.$options,e._initComponent_(),e.injection=null,e.rootNode=null,e.isInstalled=!1,e.willUpdate=!1,e._customStyleContent="",e.props={},e.prevProps={},e._customStyleElement=null,e.store=null,e.injection={},e.providesMap=e.getProvides(),e.injectsList=e.getInjects(),e}return p(e,t),e.prototype._initComponent_=function(){var t,e,n;this.elementId="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)})),this.propsList=null!==(t=Reflect.getMetadata(v,this))&&void 0!==t?t:[],this.injects=null!==(e=Reflect.getMetadata(b,this))&&void 0!==e?e:[],this.provides=null!==(n=Reflect.getMetadata(g,this))&&void 0!==n?n:[],new M({vm:this}),new z(this),new H(this)},Object.defineProperty(e,"observedAttributes",{get:function(){return[]},enumerable:!1,configurable:!0}),e.prototype.getProvides=function(){return this.provides.reduce((function(t,e){return t[e.key]=e,t}),{})},e.prototype.getInjects=function(){return this.injects},Object.defineProperty(e.prototype,"isInject",{get:function(){return Array.isArray(this.injectsList)&&this.injectsList.length>0},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isProvide",{get:function(){return Object.keys(this.providesMap).length>0},enumerable:!1,configurable:!0}),e.prototype.removeAttribute=function(e){t.prototype.removeAttribute.call(this,e),this.isInstalled&&this.update()},e.prototype.setAttribute=function(e,n){var o;o=n&&"object"==typeof n?JSON.stringify(n):n,t.prototype.setAttribute.call(this,e,o),this.isInstalled&&(this[e]=n,this.props[e]=n)},e.prototype.getAttribute=function(e){var n=this[e];return n||(n=t.prototype.getAttribute.call(this,e)),n},e.prototype.pureRemoveAttribute=function(e){t.prototype.removeAttribute.call(this,e)},e.prototype.pureSetAttribute=function(e,n){t.prototype.setAttribute.call(this,e,n)},e.prototype.attributeChangedCallback=function(t,e,n){this.update([],!1)},e.prototype.update=function(t,e){this.callUpdate(t,e)},e.prototype.callUpdate=function(t,e){if(this.isInstalled&&!this.willUpdate&&this.preBeforeUpdate()){this.willUpdate=!0,this.beforeUpdate(),this.beforeRender(),this._customStyleContent!=this.$options.css&&(this._customStyleContent=this.$options.css);var n=this.render(this.props,this.store);this.rendered(),this.rootNode=G(this.rootNode,n,(null==this?void 0:this.shadowRoot)||this,this,e),this.willUpdate=!1,this.updated()}},e.prototype.initShadowRoot=function(){var t,e,n,o;if("LightDom"===this.$options.is)e=this;else{e=this.shadowRoot||(null===(t=this.attachShadow)||void 0===t?void 0:t.call(this,{mode:"open"}));for(var r=void 0;r=e.firstChild;)e.removeChild(r)}return this.$options.css&&(this._customStyleElement=(n=this.$options.css,(o=document.createElement("style")).textContent=n,o),this._customStyleContent=this.$options.css,e.appendChild(this._customStyleElement)),e},e.prototype.updateInject=function(t){var e=this;this.isInject&&Promise.resolve().then((function(){for(var n,o,r=e.parentNode;r&&!o;)(o=r.isProvide?r.providesMap:void 0)&&(n=r),r=r.parentNode||r.host;if(o)return e.injectsList.forEach((function(t){var r=o[t.key].functionName;e[t.attr]=n[r]()})),void("function"==typeof t&&t());console.warn("The provide prop was not found on the parent node or the provide type is incorrect. please check ".concat(e.tagName))}))},e.prototype.connectedCallback=function(){var t=this;this.updateInject(this.update.bind(this));var e=this.initShadowRoot();this.attrsToProps(),this.beforeInstall(),this.install(),this.afterInstall(),this.beforeRender();var n=this.render(this.props,this.store);this.rootNode=G(null,n,null,this),!0===this.$options.isMountDom&&(Array.isArray(this.rootNode)?this.rootNode.forEach((function(t){return e.appendChild(t)})):this.rootNode&&e.appendChild(this.rootNode)),this.isInstalled=!0,this.rendered(),this.isInject?Promise.resolve().then((function(){return t.connected(e)})):this.connected(e)},e.prototype.disconnectedCallback=function(){this.disConnected()},e.prototype.connected=function(t){},e.prototype.disConnected=function(){},e.prototype.preBeforeUpdate=function(){return!0},e.prototype.beforeUpdate=function(){},e.prototype.updated=function(){},e.prototype.forceUpdate=function(){this.update([],!0)},e.prototype.updateProps=function(t){var e=this;Object.keys(t).forEach((function(n){e.props[n]=t[n],e.prevProps&&(e.prevProps[n]=t[n])})),this.forceUpdate()},e.prototype.attrsToProps=function(t){var e=this,n=this;if(this.propsList&&(!Array.isArray(this.propsList)||this.propsList.length)){var o=function(t){for(var e={},n=0,o=t.attributes.length;n<o;n++){var r=t.attributes[n].nodeName,i=t.attributes[n].nodeValue;t.attributes[n].specified&&(e[U(r)]=i)}return e}(this.shadowRoot&&this.shadowRoot.host?this.shadowRoot.host:this);this.propsList.forEach((function(t){var r=U(t.attr),i=o[r];i||(i=n.getAttribute(r));var s=function(t,e,n){var o=void 0;try{if(null!==t)switch(e){case String:o=t;break;case Number:o=Number(t);break;case Boolean:o=!("false"===t||"0"===t||!1===t);break;case Array:case Object:o="string"==typeof t?JSON.parse(t.replace(/'/g,'"')):"[object Array]"===Object.prototype.toString.call(t)||"[object Object]"===Object.prototype.toString.call(t)?t:JSON.parse(t.replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?:([^\/])/g,'"$2":$4').replace(/'([\s\S]*?)'/g,'"$1"').replace(/,(\s*})/g,"$1"));break;default:o=t}else o=n;return o}catch(e){return console.warn("formatValue file, please input element attr",e),function(t){try{return new Function("return "+t)()}catch(t){console.warn("eval fail",t)}}(t)}}(i,t.type,t.default);e[r]=s,e.props[r]=s}))}},e.prototype._dispatchEvent=function(t,e){var n=new CustomEvent(t,{detail:e||null,bubbles:!0,composed:!0});(null==this?void 0:this.shadowRoot)?null==this||this.shadowRoot.dispatchEvent(n):this.dispatchEvent(n)},e.prototype.beforeInstall=function(){},e.prototype.install=function(){},e.prototype.afterInstall=function(){},e.prototype.beforeRender=function(){},e.prototype.rendered=function(){},e.prototype.receiveProps=function(){},e.prototype.render=function(t,e){},e.is="CustomWebComponent",e}(HTMLElement);var rt=":host {\n  display: block;\n}\n\n.caption {\n  font-weight: bold;\n  color: rgb(219, 199, 237);\n  display: flex;\n  justify-content: center;\n}\n\n.container {\n  border: none;\n  box-shadow: 0 0 4px 2px #dfdfdf;\n  width: 100%;\n  position: relative;\n}\n\n.add-button {\n  position: absolute;\n  right: 0;\n  top: 50%;\n  width: 80px;\n  cursor: pointer;\n  border: none;\n  transform: translateY(-50%);\n  height: 100%;\n}\n\n.input {\n  width: 100%;\n  border: none;\n  display: block;\n  padding: 1rem 2rem;\n  outline-color: rgb(219, 199, 237);\n  font-size: 1.5rem;\n  box-sizing: border-box;\n}\n\n.input::-moz-placeholder {\n  color: #dfdfdf;\n}\n\n.input::placeholder {\n  color: #dfdfdf;\n}\n\n.list {\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n}\n\n.list li {\n  background-color: white;\n  border-top: 1px solid #dfdfdf;\n  padding: 1rem 2rem;\n  font-size: 1.5rem;\n}\n\n.list li.completed {\n  color: #aaaaaa;\n  text-decoration: line-through;\n  cursor: pointer;\n}\n\n.tips {\n  color: #aaaaaa;\n  text-align: center;\n  line-height: 48px;\n}";!function(t,e){void 0===e&&(e={});var n=e.insertAt;if(t&&"undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css","top"===n&&o.firstChild?o.insertBefore(r,o.firstChild):o.appendChild(r),r.styleSheet?r.styleSheet.cssText=t:r.appendChild(document.createTextNode(t))}}(rt);var it=function(t){function r(){var e=t.call(this)||this;return e.list=[],e.inputRef=null,e}return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}(r,t),r.prototype.submitTodo=function(t){t.preventDefault(),this.addTodo()},r.prototype.addTodo=function(){var t,e;if(null===(t=this.inputRef)||void 0===t?void 0:t.value){var n=function(t,e,n){if(n||2===arguments.length)for(var o,r=0,i=e.length;r<i;r++)!o&&r in e||(o||(o=Array.prototype.slice.call(e,0,r)),o[r]=e[r]);return t.concat(o||Array.prototype.slice.call(e))}([],this.list,!0);n.push({text:null===(e=this.inputRef)||void 0===e?void 0:e.value,status:0}),this.list=n,this.inputRef.value=""}this.forceUpdate()},r.prototype.contextmenu=function(t,e){this.list.splice(e,1),this.forceUpdate()},r.prototype.clickFun=function(t,e){var n=this.list;n[e]&&(n[e].status=1===n[e].status?0:1),this.list=n,this.forceUpdate()},r.prototype.render=function(t,e){var n,o=this;return nt("div",{class:"container"},nt("h1",{class:"caption"},"Todo List"),nt("form",{class:"container"},nt("input",{class:"input",id:"input",placeholder:"Enter your todo"}),nt("button",{class:"add-button",onClick:function(t){return o.submitTodo(t)}},"ADD")),nt("ul",{className:"list"},null===(n=this.list||[])||void 0===n?void 0:n.map((function(t,e){return nt("li",{className:1===t.status?"completed":"normal",onContextMenu:function(t){o.contextmenu(t,e)},onClick:function(t){o.clickFun(t,e)}},t.text)}))),nt("div",{class:"tips"},"鼠标左键单击切换状态、右键单击删除 "))},r.prototype.connected=function(t){this.inputRef=this.shadowRoot.querySelector("#input")},n([A({default:[],type:Array}),o("design:type",Array)],r.prototype,"list",void 0),r=n([D({name:"wu-todo-example",css:rt}),o("design:paramtypes",[])],r)}(ot);t.TestExample=it,Object.defineProperty(t,"__esModule",{value:!0})}));