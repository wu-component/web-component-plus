!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((n="undefined"!=typeof globalThis?globalThis:n||self).WebUIPlus={})}(this,(function(n){"use strict";var t=function(n,e){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])},t(n,e)};function e(n,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function o(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}var o=function(){return o=Object.assign||function(n){for(var t,e=1,o=arguments.length;e<o;e++)for(var r in t=arguments[e])Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n},o.apply(this,arguments)};function r(n,t,e,o){var r,i=arguments.length,s=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,e):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(n,t,e,o);else for(var a=n.length-1;a>=0;a--)(r=n[a])&&(s=(i<3?r(s):i>3?r(t,e,s):r(t,e))||s);return i>3&&s&&Object.defineProperty(t,e,s),s}function i(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}function s(n,t,e){if(e||2===arguments.length)for(var o,r=0,i=t.length;r<i;r++)!o&&r in t||(o||(o=Array.prototype.slice.call(t,0,r)),o[r]=t[r]);return n.concat(o||Array.prototype.slice.call(t))}const a=new WeakMap;function u(n,t){return a.get(n)&&a.get(n).get(t)}function c(n,t,e){if(void 0===t)throw new TypeError;const o=u(t,e);return o&&o.get(n)}function l(n,t,e,o){if(o&&!["string","symbol"].includes(typeof o))throw new TypeError;(u(e,o)||function(n,t){const e=a.get(n)||new Map;a.set(n,e);const o=e.get(t)||new Map;return e.set(t,o),o}(e,o)).set(n,t)}function d(n,t,e){return c(n,t,e)?c(n,t,e):Object.getPrototypeOf(t)?d(n,Object.getPrototypeOf(t),e):void 0}const p={decorate:function(n,t,e,o){if(!Array.isArray(n)||0===n.length)throw new TypeError;return void 0!==e?function(n,t,e,o){return n.reverse().forEach((n=>{o=n(t,e,o)||o})),o}(n,t,e,o):"function"==typeof t?function(n,t){return n.reverse().forEach((n=>{const e=n(t);e&&(t=e)})),t}(n,t):void 0},defineMetadata:function(n,t,e,o){l(n,t,e,o)},getMetadata:function(n,t,e){return d(n,t,e)},getOwnMetadata:function(n,t,e){return c(n,t,e)},hasMetadata:function(n,t,e){return!!d(n,t,e)},hasOwnMetadata:function(n,t,e){return!!c(n,t,e)},metadata:function(n,t){return function(e,o){l(n,t,e,o)}}};Object.assign(Reflect,p),function(){if(void 0!==window.Reflect&&void 0!==window.customElements&&!window.customElements.hasOwnProperty("polyfillWrapFlushCallback")){var n=HTMLElement;window.HTMLElement=function(){return Reflect.construct(n,[],this.constructor)},HTMLElement.prototype=n.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,n)}}(),"function"!=typeof window.queueMicrotask&&(window.queueMicrotask=function(n){Promise.resolve().then(n).catch((function(n){return setTimeout((function(){throw n}))}))});var f={store:null,root:self||window||function(){return this}(),mapping:{},vnode:void 0},b="prevProps",h=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,v=Symbol("PROP_META_KEY"),g=Symbol("STATE_META_KEY"),y=Symbol("COMPONENT_CUSTOM_EVENT"),m=Symbol("COMPONENT_CUSTOM_INJECT"),F=Symbol("COMPONENT_CUSTOM_PROVIDE"),w=Symbol("COMPONENT_WATCH"),k=function(){function n(){this.subs=[]}return n.prototype.addSub=function(n){this.subs.includes(n)||this.subs.push(n)},n.prototype.notify=function(){this.subs.forEach((function(n){n.update()}))},n.prototype.depend=function(){n.target&&(this.subs.includes(n.target)||this.subs.push(n.target))},n}(),x="__proto__"in{};function C(n,t,e,o){Object.defineProperty(n,t,{value:e,enumerable:!!o,writable:!0,configurable:!0})}function E(n){var t=function(n){(function(n){for(var t=[],e=1;e<arguments.length;e++)t[e-1]=arguments[e];return t.some((function(t){return Object.prototype.toString.call(n).slice(8,-1).toLowerCase()===t}))})(n,"array","object")&&Object.keys(n).forEach((function(e){var o=n[e];t(o)}))};t(n)}var _=Array.prototype,N=Object.create(_);["push","pop","shift","unshift","sort","splice","reverse"].forEach((function(n){N[n]=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var o=_[n].apply(this,t),r=this.__luckyOb__;return["push","unshift","splice"].includes(n)&&r.walk(this),r.dep.notify(),o}}));var O=function(){function n(n){this.dep=new k,C(n,"__observer__",this),Array.isArray(n)&&(x?n.__proto__=N:Object.getOwnPropertyNames(N).forEach((function(t){C(n,t,N[t])}))),this.walk(n)}return n.prototype.walk=function(n){Object.keys(n).forEach((function(t){!function(n,t,e){var o=Object.getOwnPropertyDescriptor(n,t);if(o&&!1===o.configurable)return;var r=o&&o.get,i=o&&o.set;r&&!i||2!==arguments.length||(e=n[t]);S(e),Object.defineProperty(n,t,{enumerable:!0,configurable:!0,get:function(){var t,o=r?r.call(n):e,i=this.__observer__;return null===(t=null==i?void 0:i.dep)||void 0===t||t.depend(),o},set:function(n){var t;if(n!==e){e=n,S(n);var o=this.__observer__;null===(t=null==o?void 0:o.dep)||void 0===t||t.notify()}}})}(n,t,n[t])}))},n}();function S(n){if(n&&"object"==typeof n)return"__observer__"in n?n.__observer__:new O(n)}var j=0,P=function(){function n(n,t,e,o){void 0===o&&(o={}),this.id=j++,this.$vm=n,this.expr=t,this.deep=!!o.deep,this.getter="function"==typeof t?t:function(n){n+=".";for(var t=[],e="",o=0;o<n.length;o++){var r=n[o];if(/\[|\./.test(r))t.push(e),e="";else{if(/\W/.test(r))continue;e+=r}}return function(n){return t.reduce((function(n,t){return n[t]}),n)}}(t),this.cb=e,this.value=this.get()}return n.prototype.get=function(){k.target=this;var n=this.getter.call(this.$vm,this.$vm);return this.deep&&E(n),k.target=null,n},n.prototype.update=function(){var n=this.get(),t=this.value;this.value=n,this.cb.call(this.$vm,n,t)},n}(),A=function(){function n(n){this.vm=n}return n.prototype.proxy=function(n,t,e){Object.defineProperty(n,e,{get:function(){return this[t][e]},set:function(n){this[t][e]=n}})},n}();function M(n){return void 0===n&&(n={default:void 0}),function(t,e){!function(n,t,e){var o;void 0===n&&(n={default:void 0});var r=n.default,i=null!==(o=Reflect.getMetadata(v,t))&&void 0!==o?o:[];i.push({default:r,type:n.type,attr:e}),Reflect.defineMetadata(v,i,t)}(n,t,e)}}var T=function(n){function t(t,e,o){var r;void 0===e&&(e=[]);var i=n.call(this,t)||this;return i.propsList=e.length?e:null!==(r=Reflect.getMetadata(v,i.vm))&&void 0!==r?r:[],i.observerProps(),i}return e(t,n),t.prototype.observerProps=function(){var n,t=this;n=this.propsList.reduce((function(n,t,e){return n[t.attr]=t.default,n}),{}),this.vm.$props=n;for(var e=Object.keys(this.vm.$props),o=e.length;o--;){var r=e[o];this.proxy(this.vm,"$props",r)}S(this.vm.$props),new P(this.vm.$props,(function(){return t.vm.render.call(t.vm,t.vm.$props,null)}),(function(n,e){t.vm.update.call(t.vm,t.vm.$props,null)}))},t}(A),L=function(n){return n.replace(/(?!^)([A-Z])/g," $1").replace(/[_\s]+(?=[a-zA-Z])/g,".").toLowerCase()};function R(n){return n.replace(/-(\w)/g,(function(n,t){return t.toUpperCase()}))}function $(n){return n.children}function I(n,t){null!=n&&("function"==typeof n?n(t):n.current=t)}function B(n){return"[object Array]"===Object.prototype.toString.call(n)}function U(n){return n.indexOf("-")>-1?n.replace(/(\-([a-z]))/g,(function(n,t,e,o,r){return e.toUpperCase()})):n}
/**
     * @license
     * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
     */
!function(){if(void 0!==window.Reflect&&void 0!==window.customElements&&!window.customElements.hasOwnProperty("polyfillWrapFlushCallback")){var n=HTMLElement;window.HTMLElement=function(){return Reflect.construct(n,[],this.constructor)},HTMLElement.prototype=n.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,n)}}(),"function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout;var H=function(){function n(n){var t;this.vm=n,this.emitList=null!==(t=Reflect.getMetadata(y,this.vm))&&void 0!==t?t:[],this.observerEmits()}return n.prototype.observerEmits=function(){var n=this,t=this;this.emitList.forEach((function(e){Object.defineProperty(n.vm,e.methodName,{get:function(){return function(){for(var n,o=[],r=0;r<arguments.length;r++)o[r]=arguments[r];var i=(n=e.methodFun).call.apply(n,s([t.vm],o,!1)),a=e.eventName?e.eventName:L(e.methodName);t.vm._dispatchEvent.call(t.vm,a,i)}}})}))},n}();function z(n){return void 0===n&&(n={default:void 0}),function(t,e){!function(n,t,e){var o;void 0===n&&(n={default:void 0});var r=n.default,i=null!==(o=Reflect.getMetadata(g,t))&&void 0!==o?o:[];i.push({default:r,type:n.type,attr:e}),Reflect.defineMetadata(g,i,t)}(n,t,e)}}var V=function(n){function t(t,e){var o;void 0===e&&(e=[]);var r=n.call(this,t)||this;return r.statesList=e.length?e:null!==(o=Reflect.getMetadata(g,r.vm))&&void 0!==o?o:[],r.observerStates(),r}return e(t,n),t.prototype.observerStates=function(){var n,t=this;n=this.statesList.reduce((function(n,t,e){return n[t.attr]=t.default,n}),{}),this.vm.$states=n;for(var e=Object.keys(this.vm.$states),o=e.length;o--;){var r=e[o];this.proxy(this.vm,"$states",r)}S(this.vm.$states),new P(this.vm.$states,(function(){return t.vm.render.call(t.vm,t.vm.$states,null)}),(function(n,e){t.vm.update.call(t.vm,t.vm.$states,null)}))},t}(A);var W=function(n){function t(t,e){var o;void 0===e&&(e=[]);var r=n.call(this,t)||this;return r.watchList=e.length?e:null!==(o=Reflect.getMetadata(w,r.vm))&&void 0!==o?o:[],r.observer(),r}return e(t,n),t.prototype.observer=function(){var n,t=this;n=this.watchList.reduce((function(n,e,o){return t.$watch(e.path,t.vm[e.callbackName],e),n[e.path]=e,n}),{}),this.vm.$watch=n},t.prototype.$watch=function(n,t,e){void 0===e&&(e={}),"object"==typeof t&&(t=(e=t).handler);var o=new P(this.vm,n,t,e);return e.immediate&&t.call(this.vm,o.value),function(){}},t}(A);function D(n){return function(t){!function(n,t){void 0===n.isMountDom&&(n.isMountDom=!0),customElements.get(n.name)||(t.$options=n,customElements.define(n.name,t,n.options||{}))}(n,t)}}function J(n,t,e){var o=void 0;try{if(null!==n)switch(t){case String:o=n;break;case Number:o=Number(n);break;case Boolean:o=!("false"===n||"0"===n||!1===n);break;case Array:case Object:o="string"==typeof n?JSON.parse(n.replace(/'/g,'"')):"[object Array]"===Object.prototype.toString.call(n)||"[object Object]"===Object.prototype.toString.call(n)?n:JSON.parse(n.replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?:([^\/])/g,'"$2":$4').replace(/'([\s\S]*?)'/g,'"$1"').replace(/,(\s*})/g,"$1"));break;default:o=n}else o=e;return o}catch(t){return console.warn("formatValue file, please input element attr",t),function(n){try{return new Function("return "+n)()}catch(n){console.warn("eval fail",n)}}(n)}}function Z(n){var t=n.parentNode;t&&t.removeChild(n)}function q(n,t,e){return"string"==typeof t||"number"==typeof t?void 0!==n.splitText:"string"==typeof t.nodeName?!n._componentConstructor&&K(n,t.nodeName):"function"==typeof t.nodeName?f.mapping[n.nodeName.toLowerCase()]===t.nodeName:e||n._componentConstructor===t.nodeName}function K(n,t){return n.normalizedNodeName===t||n.nodeName.toLowerCase()===t.toLowerCase()}function Y(n){return this._listeners[n.type](f.event&&f.event(n)||n)}var G={};function Q(n,t,e,o,r,i){if("className"===t&&(t="class"),"o"==t[0]&&"-"==t[1])G[t]&&G[t](n,o,i);else if("key"===t);else if("ref"===t)I(e,null),I(o,n);else if("class"!==t||r)if("style"===t){if(o&&"string"!=typeof o&&"string"!=typeof e||(n.style.cssText=o||""),o&&"object"==typeof o){if("string"!=typeof e)for(var s in e)s in o||(n.style[s]="");for(var s in o)n.style[s]="number"==typeof o[s]&&!1===h.test(s)?o[s]+"px":o[s]}}else if("dangerouslySetInnerHTML"===t)o&&(n.innerHTML=o.__html||"");else if("o"==t[0]&&"n"==t[1])!function(n,t,e,o){var r=t!==(t=t.replace(/Capture$/,"")),i=t.toLowerCase();t=(i in n?i:t).slice(2),e?o||n.addEventListener(t,Y,r):n.removeEventListener(t,Y,r),(n._listeners||(n._listeners={}))[t]=e}(n,t,o,e);else if("INPUT"===n.nodeName&&"value"===t)n[t]=null==o?"":o;else if("list"!==t&&"type"!==t&&"css"!==t&&!r&&t in n&&""!==o){try{n[t]=null==o?"":o}catch(n){}null!=o&&!1!==o||"spellcheck"==t||(n.pureRemoveAttribute?n.pureRemoveAttribute(t):n.removeAttribute(t))}else{var a=r&&t!==(t=t.replace(/^xlink:?/,""));null==o||!1===o?a?n.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):n.pureRemoveAttribute?n.pureRemoveAttribute(t):n.removeAttribute(t):"function"!=typeof o&&(a?n.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),o):n.pureSetAttribute?n.pureSetAttribute(t,o):n.setAttribute(t,o))}else n.className=o||""}var X=0,nn=!1,tn=!1;function en(n,t,e,o,r){var i;if(n||t)return X++||(nn=null!=e&&void 0!==e.ownerSVGElement,tn=null!=n&&!(b in n)),t&&t.nodeName===$&&(t=t.children),B(t)?e?rn(e,t,tn,o,r):(i=[],t.forEach((function(t,e){var s=on(0===e?n:null,t,o,r);i.push(s)}))):(B(n)?n.forEach((function(n,e){0===e?i=on(n,t,o,r):sn(n,!1)})):i=on(n,t,o,r),e&&i.parentNode!==e&&e.appendChild(i)),--X||(tn=!1),i}function on(n,t,e,o){n&&t&&n.props&&(n.props.children=t.children);var r=n,i=nn;if(null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t)return n&&void 0!==n.splitText&&n.parentNode&&(!n._component||e)?n.nodeValue!=t&&(n.nodeValue=t):(r=document.createTextNode(t),n&&(n.parentNode&&n.parentNode.replaceChild(r,n),sn(n,!0))),r.prevProps=!0,r;var s,a,u=t.nodeName;if("function"==typeof u)for(var c in f.mapping)if(f.mapping[c]===u){u=c,t.nodeName=c;break}if(nn="svg"===u||"foreignObject"!==u&&nn,u=String(u),(!n||!K(n,u))&&(s=u,(a=nn?document.createElementNS("http://www.w3.org/2000/svg",s):document.createElement(s)).normalizedNodeName=s,r=a,n)){for(;n.firstChild;)r.appendChild(n.firstChild);n.parentNode&&n.parentNode.replaceChild(r,n),sn(n,!0)}var l=r.firstChild,d=r.prevProps,p=t.children;if(null==d){d=r.prevProps={};for(var b=r.attributes,h=b.length;h--;)d[b[h].name]=b[h].value}return!tn&&p&&1===p.length&&"string"==typeof p[0]&&null!=l&&void 0!==l.splitText&&null==l.nextSibling?l.nodeValue!=p[0]&&(l.nodeValue=p[0]):(p&&p.length||null!=l)&&("CustomWebComponent"==r.constructor.is&&r.constructor.noSlot||rn(r,p,tn||null!=d.dangerouslySetInnerHTML,e,o)),function(n,t,e,o,r){var i,s,a=n.update;n.receiveProps&&(s=Object.assign({},e));for(i in e)t&&null!=t[i]||null==e[i]||(Q(n,i,e[i],e[i]=void 0,nn,o),a&&delete n.props[i]);for(i in t)if(a&&"object"==typeof t[i]&&"ref"!==i){"style"===i&&Q(n,i,e[i],e[i]=t[i],nn,o);var u=R(i);n.props[u]=e[u]=t[i]}else if("children"!==i&&(!(i in e)||t[i]!==("value"===i||"checked"===i?n[i]:e[i])))if(Q(n,i,e[i],t[i],nn,o),-1!==n.nodeName.indexOf("-")){n.props=n.props||{};u=R(i);n.props[u]=e[u]=t[i]}else e[i]=t[i];a&&!r&&n.parentNode&&!1!==n.receiveProps(n.props,s)&&n.update()}(r,t.attributes,d,e,o),r.props&&(r.props.children=t.children),nn=i,r}function rn(n,t,e,o,r){var i,s,a,u,c,l=n.childNodes,d=[],p={},f=0,b=0,h=(null==l?void 0:l.length)||0,v=0,g=t?t.length:0;if(0!==h)for(var y=0;y<h;y++){var m=l[y],F=m.prevProps;null!=(w=g&&F?m._component?m._component.__key:F.key:null)?(f++,p[w]=m):(F||(void 0!==m.splitText?!e||m.nodeValue.trim():e))&&(d[v++]=m)}if(0!==g)for(y=0;y<g;y++){var w;if(c=null,u=t[y])if(null!=(w=u.key))f&&void 0!==p[w]&&(c=p[w],p[w]=void 0,f--);else if(!c&&b<v)for(i=b;i<v;i++)if(void 0!==d[i]&&q(s=d[i],u,e)){c=s,d[i]=void 0,i===v-1&&v--,i===b&&b++;break}c=on(c,u,o,r),a=l[y],c&&c!==n&&c!==a&&(null==a?n.appendChild(c):c===a.nextSibling?Z(a):n.insertBefore(c,a))}if(f)for(var y in p)void 0!==p[y]&&sn(p[y],!1);for(;b<=v;)void 0!==(c=d[v--])&&sn(c,!1)}function sn(n,t){null!=n.prevProps&&n.prevProps.ref&&("function"==typeof n.prevProps.ref?n.prevProps.ref(null):n.prevProps.ref.current&&(n.prevProps.ref.current=null)),!1!==t&&null!=n.prevProps||Z(n),function(n){n=n.lastChild;for(;n;){var t=n.previousSibling;sn(n,!0),n=t}}(n)}var an=[];function un(n,t){var e,o,r,i,s=[];for(i=arguments.length;i-- >2;)an.push(arguments[i]);for(t&&null!=t.children&&(an.length||an.push(t.children),delete t.children);an.length;)if((o=an.pop())&&void 0!==o.pop)for(i=o.length;i--;)an.push(o[i]);else"boolean"==typeof o&&(o=null),(r="function"!=typeof n)&&(null==o?o="":"number"==typeof o?o=String(o):"string"!=typeof o&&(r=!1)),r&&e?s[s.length-1]+=o:0===s.length?s=[o]:s.push(o),e=r;if(n===$)return s;var a={nodeName:n,children:s,attributes:null==t?void 0:t,key:null==t?void 0:t.key};return void 0!==f.vnode&&f.vnode(a),a}var cn=function(n){function t(){var t=n.call(this)||this;return t.rootNode=null,t.isInstalled=!1,t.willUpdate=!1,t._customStyleContent="",t.props={},t.prevProps={},t._customStyleElement=null,t.provides=[],t.$options=t.constructor.$options,t._initComponent_(),t.injection=null,t.rootNode=null,t.isInstalled=!1,t.willUpdate=!1,t._customStyleContent="",t.props={},t.prevProps={},t._customStyleElement=null,t.store=null,t.injection={},t.providesMap=t.getProvides(),t.injectsList=t.getInjects(),t}return e(t,n),t.prototype._initComponent_=function(){var n,t,e;this.elementId="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(n){var t=16*Math.random()|0;return("x"==n?t:3&t|8).toString(16)})),this.propsList=null!==(n=Reflect.getMetadata(v,this))&&void 0!==n?n:[],this.injects=null!==(t=Reflect.getMetadata(m,this))&&void 0!==t?t:[],this.provides=null!==(e=Reflect.getMetadata(F,this))&&void 0!==e?e:[],new T(this),new W(this),new V(this),new H(this)},Object.defineProperty(t,"observedAttributes",{get:function(){return[]},enumerable:!1,configurable:!0}),t.prototype.getProvides=function(){return this.provides.reduce((function(n,t){return n[t.key]=t,n}),{})},t.prototype.getInjects=function(){return this.injects},Object.defineProperty(t.prototype,"isInject",{get:function(){return Array.isArray(this.injectsList)&&this.injectsList.length>0},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"isProvide",{get:function(){return Object.keys(this.providesMap).length>0},enumerable:!1,configurable:!0}),t.prototype.removeAttribute=function(t){n.prototype.removeAttribute.call(this,t),this.isInstalled&&this.update()},t.prototype.setAttribute=function(t,e){var o;o=e&&"object"==typeof e?JSON.stringify(e):e,n.prototype.setAttribute.call(this,t,o),this.isInstalled&&(this[t]=e,this.props[t]=e)},t.prototype.getAttribute=function(t){var e=this[t];return e||(e=n.prototype.getAttribute.call(this,t)),e},t.prototype.pureRemoveAttribute=function(t){n.prototype.removeAttribute.call(this,t)},t.prototype.pureSetAttribute=function(t,e){n.prototype.setAttribute.call(this,t,e)},t.prototype.attributeChangedCallback=function(n,t,e){this.update([],!1)},t.prototype.update=function(n,t){this.callUpdate(n,t)},t.prototype.callUpdate=function(n,t){if(this.isInstalled&&!this.willUpdate&&this.preBeforeUpdate()){this.willUpdate=!0,this.beforeUpdate(),this.beforeRender(),this._customStyleContent!=this.$options.css&&(this._customStyleContent=this.$options.css);var e=this.render(this.props,this.store);this.rendered(),this.rootNode=en(this.rootNode,e,(null==this?void 0:this.shadowRoot)||this,this,t),this.willUpdate=!1,this.updated()}},t.prototype.initShadowRoot=function(){var n,t,e,o;if("LightDom"===this.$options.is)t=this;else{t=this.shadowRoot||(null===(n=this.attachShadow)||void 0===n?void 0:n.call(this,{mode:"open"}));for(var r=void 0;r=t.firstChild;)t.removeChild(r)}return this.$options.css&&(this._customStyleElement=(e=this.$options.css,(o=document.createElement("style")).textContent=e,o),this._customStyleContent=this.$options.css,t.appendChild(this._customStyleElement)),t},t.prototype.updateInject=function(n){var t=this;this.isInject&&Promise.resolve().then((function(){for(var e,o,r=t.parentNode;r&&!o;)(o=r.isProvide?r.providesMap:void 0)&&(e=r),r=r.parentNode||r.host;if(o)return t.injectsList.forEach((function(n){var r=o[n.key].functionName;t[n.attr]=e[r]()})),void("function"==typeof n&&n());console.warn("The provide prop was not found on the parent node or the provide type is incorrect. please check ".concat(t.tagName))}))},t.prototype.connectedCallback=function(){var n=this;this.updateInject(this.update.bind(this));var t=this.initShadowRoot();this.attrsToProps(),this.beforeInstall(),this.install(),this.afterInstall(),this.beforeRender();var e=this.render(this.props,this.store);this.rootNode=en(null,e,null,this),!0===this.$options.isMountDom&&(Array.isArray(this.rootNode)?this.rootNode.forEach((function(n){return t.appendChild(n)})):this.rootNode&&t.appendChild(this.rootNode)),this.isInstalled=!0,this.rendered(),this.isInject?Promise.resolve().then((function(){return n.connected(t)})):this.connected(t)},t.prototype.disconnectedCallback=function(){this.disConnected()},t.prototype.connected=function(n){},t.prototype.disConnected=function(){},t.prototype.preBeforeUpdate=function(){return!0},t.prototype.beforeUpdate=function(){},t.prototype.updated=function(){},t.prototype.forceUpdate=function(){this.update([],!0)},t.prototype.updateProps=function(n){var t=this;Object.keys(n).forEach((function(e){t.props[e]=n[e],t.prevProps&&(t.prevProps[e]=n[e])})),this.forceUpdate()},t.prototype.attrsToProps=function(n){var t=this,e=this;if(this.propsList&&(!Array.isArray(this.propsList)||this.propsList.length)){var o=function(n){for(var t={},e=0,o=n.attributes.length;e<o;e++){var r=n.attributes[e].nodeName,i=n.attributes[e].nodeValue;n.attributes[e].specified&&(t[U(r)]=i)}return t}(this.shadowRoot&&this.shadowRoot.host?this.shadowRoot.host:this);this.propsList.forEach((function(n){var r=U(n.attr),i=o[r];i||(i=e.getAttribute(r));var s=J(i,n.type,n.default);t[r]=s,t.props[r]=s}))}},t.prototype._dispatchEvent=function(n,t){var e=new CustomEvent(n,{detail:t||null,bubbles:!0,composed:!0});(null==this?void 0:this.shadowRoot)?null==this||this.shadowRoot.dispatchEvent(e):this.dispatchEvent(e)},t.prototype.beforeInstall=function(){},t.prototype.install=function(){},t.prototype.afterInstall=function(){},t.prototype.beforeRender=function(){},t.prototype.rendered=function(){},t.prototype.receiveProps=function(){},t.prototype.render=function(n,t){},t.is="CustomWebComponent",t}(HTMLElement),ln={}.hasOwnProperty;function dn(){for(var n=[],t=0;t<arguments.length;t++){var e=arguments[t];if(e){var o=typeof e;if("string"===o||"number"===o)n.push(e);else if(Array.isArray(e)&&e.length){var r=dn.apply(null,e);r&&n.push(r)}else if("object"===o)for(var i in e)ln.call(e,i)&&e[i]&&n.push(i)}}return n.join(" ")}var pn='/* 53a8ff */\n/* 66b1ff */\n/* 79bbff */\n/* 8cc5ff */\n/* a0cfff */\n/* b3d8ff */\n/* c6e2ff */\n/* d9ecff */\n/* ecf5ff */\n/**************************Radio****************************/\n/* Input-------------------------- */\n/* Break-point\n--------------------------*/\n/* Link\n--------------------------*/\n/* Switch\n-------------------------- */\n/* Table\n-------------------------- */\n/* Pagination\n-------------------------- */\n/* Dropdown\n-------------------------- */\n/* Checkbox\n-------------------------- */\n/* Tag\n-------------------------- */\n/* Message\n-------------------------- */\n/* Rate\n--------------------------*/\n/* Timeline\n--------------------------*/\n/* Select\n-------------------------- */\n/* Avatar\n--------------------------*/\n/* Badge\n-------------------------- */\n/* Empty\n-------------------------- */\n/* Skeleton\n--------------------------*/\n/* Svg\n--------------- */\n/* Card\n--------------------------*/\n/* Header\n  --------------------------*/\n/* Footer\n--------------------------*/\n/* Main\n--------------------------*/\n/* Alert\n-------------------------- */\n/* Pagination\n-------------------------- */\n/* Transition\n-------------------------- */\n/* Collapse\n--------------------------*/\n/* Menu\n--------------------------*/\n/* Tree\n-------------------------- */\n/* BEM support Func\n -------------------------- */\n/* Break-points\n -------------------------- */\n/* Scrollbar\n -------------------------- */\n/* Placeholder\n -------------------------- */\n:host {\n  display: inline-block;\n}\n\n:host([block]) {\n  display: block;\n}\n\n.wu-button {\n  display: inline-block;\n  line-height: 1;\n  white-space: nowrap;\n  cursor: pointer;\n  background: #FFFFFF;\n  border: 1px solid #C0C4CC;\n  color: #606266;\n  -webkit-appearance: none;\n  text-align: center;\n  box-sizing: border-box;\n  outline: none;\n  margin: 0;\n  transition: 0.1s;\n  font-weight: 500;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  padding: 12px 20px;\n  font-size: 14px;\n  border-radius: 4px;\n}\n.wu-button + .wu-button {\n  margin-left: 10px;\n}\n.wu-button.is-round {\n  padding: 12px 20px;\n}\n.wu-button:hover, .wu-button:focus {\n  color: #409EFF;\n  border-color: #c6e2ff;\n  background-color: #ecf5ff;\n}\n.wu-button:active {\n  color: #3a8ee6;\n  border-color: #3a8ee6;\n  outline: none;\n}\n.wu-button::-moz-focus-inner {\n  border: 0;\n}\n.wu-button [class*=wu-icon-] + span {\n  margin-left: 5px;\n}\n.wu-button.is-plain:hover, .wu-button.is-plain:focus {\n  background: #FFFFFF;\n  border-color: #409EFF;\n  color: #409EFF;\n}\n.wu-button.is-plain:active {\n  background: #FFFFFF;\n  border-color: #3a8ee6;\n  color: #3a8ee6;\n  outline: none;\n}\n\n.wu-button.is-active {\n  color: #3a8ee6;\n  border-color: #3a8ee6;\n}\n\n.wu-button.is-disabled, .wu-button.is-disabled:hover, .wu-button.is-disabled:focus {\n  color: #C0C4CC;\n  cursor: not-allowed;\n  background-image: none;\n  background-color: #FFFFFF;\n  border-color: #EBEEF5;\n}\n.wu-button.is-disabled.wu-button--text {\n  background-color: transparent;\n}\n.wu-button.is-disabled.is-plain, .wu-button.is-disabled.is-plain:hover, .wu-button.is-disabled.is-plain:focus {\n  background-color: #FFFFFF;\n  border-color: #EBEEF5;\n  color: #C0C4CC;\n}\n\n.wu-button.is-loading {\n  position: relative;\n  pointer-events: none;\n}\n.wu-button.is-loading:before {\n  pointer-events: none;\n  content: "";\n  position: absolute;\n  left: -1px;\n  top: -1px;\n  right: -1px;\n  bottom: -1px;\n  border-radius: inherit;\n  background-color: rgba(255, 255, 255, 0.35);\n}\n\n.wu-button.is-round {\n  border-radius: 20px;\n  padding: 12px 23px;\n}\n\n.wu-button.is-circle {\n  border-radius: 50%;\n  padding: 12px;\n}\n\n.wu-button-primary {\n  color: #FFFFFF;\n  background-color: #409EFF;\n  border-color: #409EFF;\n}\n.wu-button-primary:hover, .wu-button-primary:focus {\n  background: #66b1ff;\n  border-color: #66b1ff;\n  color: #FFFFFF;\n}\n.wu-button-primary:active {\n  background: #3a8ee6;\n  border-color: #3a8ee6;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-primary.is-active {\n  background: #3a8ee6;\n  border-color: #3a8ee6;\n  color: #FFFFFF;\n}\n.wu-button-primary.is-disabled, .wu-button-primary.is-disabled:hover, .wu-button-primary.is-disabled:focus, .wu-button-primary.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #a0cfff;\n  border-color: #a0cfff;\n}\n.wu-button-primary.is-plain {\n  color: #409EFF;\n  background: #ecf5ff;\n  border-color: #b3d8ff;\n}\n.wu-button-primary.is-plain:hover, .wu-button-primary.is-plain:focus {\n  background: #409EFF;\n  border-color: #409EFF;\n  color: #FFFFFF;\n}\n.wu-button-primary.is-plain:active {\n  background: #3a8ee6;\n  border-color: #3a8ee6;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-primary.is-plain.is-disabled, .wu-button-primary.is-plain.is-disabled:hover, .wu-button-primary.is-plain.is-disabled:focus, .wu-button-primary.is-plain.is-disabled:active {\n  color: #8cc5ff;\n  background-color: #ecf5ff;\n  border-color: #d9ecff;\n}\n\n.wu-button-success {\n  color: #FFFFFF;\n  background-color: #67C23A;\n  border-color: #67C23A;\n}\n.wu-button-success:hover, .wu-button-success:focus {\n  background: #85ce61;\n  border-color: #85ce61;\n  color: #FFFFFF;\n}\n.wu-button-success:active {\n  background: #5daf34;\n  border-color: #5daf34;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-success.is-active {\n  background: #5daf34;\n  border-color: #5daf34;\n  color: #FFFFFF;\n}\n.wu-button-success.is-disabled, .wu-button-success.is-disabled:hover, .wu-button-success.is-disabled:focus, .wu-button-success.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #b3e19d;\n  border-color: #b3e19d;\n}\n.wu-button-success.is-plain {\n  color: #67C23A;\n  background: #f0f9eb;\n  border-color: #c2e7b0;\n}\n.wu-button-success.is-plain:hover, .wu-button-success.is-plain:focus {\n  background: #67C23A;\n  border-color: #67C23A;\n  color: #FFFFFF;\n}\n.wu-button-success.is-plain:active {\n  background: #5daf34;\n  border-color: #5daf34;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-success.is-plain.is-disabled, .wu-button-success.is-plain.is-disabled:hover, .wu-button-success.is-plain.is-disabled:focus, .wu-button-success.is-plain.is-disabled:active {\n  color: #a4da89;\n  background-color: #f0f9eb;\n  border-color: #e1f3d8;\n}\n\n.wu-button-warning {\n  color: #FFFFFF;\n  background-color: #E6A23C;\n  border-color: #E6A23C;\n}\n.wu-button-warning:hover, .wu-button-warning:focus {\n  background: #ebb563;\n  border-color: #ebb563;\n  color: #FFFFFF;\n}\n.wu-button-warning:active {\n  background: #cf9236;\n  border-color: #cf9236;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-warning.is-active {\n  background: #cf9236;\n  border-color: #cf9236;\n  color: #FFFFFF;\n}\n.wu-button-warning.is-disabled, .wu-button-warning.is-disabled:hover, .wu-button-warning.is-disabled:focus, .wu-button-warning.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #f3d19e;\n  border-color: #f3d19e;\n}\n.wu-button-warning.is-plain {\n  color: #E6A23C;\n  background: #fdf6ec;\n  border-color: #f5dab1;\n}\n.wu-button-warning.is-plain:hover, .wu-button-warning.is-plain:focus {\n  background: #E6A23C;\n  border-color: #E6A23C;\n  color: #FFFFFF;\n}\n.wu-button-warning.is-plain:active {\n  background: #cf9236;\n  border-color: #cf9236;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-warning.is-plain.is-disabled, .wu-button-warning.is-plain.is-disabled:hover, .wu-button-warning.is-plain.is-disabled:focus, .wu-button-warning.is-plain.is-disabled:active {\n  color: #f0c78a;\n  background-color: #fdf6ec;\n  border-color: #faecd8;\n}\n\n.wu-button-danger {\n  color: #FFFFFF;\n  background-color: #F56C6C;\n  border-color: #F56C6C;\n}\n.wu-button-danger:hover, .wu-button-danger:focus {\n  background: #f78989;\n  border-color: #f78989;\n  color: #FFFFFF;\n}\n.wu-button-danger:active {\n  background: #dd6161;\n  border-color: #dd6161;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-danger.is-active {\n  background: #dd6161;\n  border-color: #dd6161;\n  color: #FFFFFF;\n}\n.wu-button-danger.is-disabled, .wu-button-danger.is-disabled:hover, .wu-button-danger.is-disabled:focus, .wu-button-danger.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #fab6b6;\n  border-color: #fab6b6;\n}\n.wu-button-danger.is-plain {\n  color: #F56C6C;\n  background: #fef0f0;\n  border-color: #fbc4c4;\n}\n.wu-button-danger.is-plain:hover, .wu-button-danger.is-plain:focus {\n  background: #F56C6C;\n  border-color: #F56C6C;\n  color: #FFFFFF;\n}\n.wu-button-danger.is-plain:active {\n  background: #dd6161;\n  border-color: #dd6161;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-danger.is-plain.is-disabled, .wu-button-danger.is-plain.is-disabled:hover, .wu-button-danger.is-plain.is-disabled:focus, .wu-button-danger.is-plain.is-disabled:active {\n  color: #f9a7a7;\n  background-color: #fef0f0;\n  border-color: #fde2e2;\n}\n\n.wu-button-info {\n  color: #FFFFFF;\n  background-color: #909399;\n  border-color: #909399;\n}\n.wu-button-info:hover, .wu-button-info:focus {\n  background: #a6a9ad;\n  border-color: #a6a9ad;\n  color: #FFFFFF;\n}\n.wu-button-info:active {\n  background: #82848a;\n  border-color: #82848a;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-info.is-active {\n  background: #82848a;\n  border-color: #82848a;\n  color: #FFFFFF;\n}\n.wu-button-info.is-disabled, .wu-button-info.is-disabled:hover, .wu-button-info.is-disabled:focus, .wu-button-info.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #c8c9cc;\n  border-color: #c8c9cc;\n}\n.wu-button-info.is-plain {\n  color: #909399;\n  background: #f4f4f5;\n  border-color: #d3d4d6;\n}\n.wu-button-info.is-plain:hover, .wu-button-info.is-plain:focus {\n  background: #909399;\n  border-color: #909399;\n  color: #FFFFFF;\n}\n.wu-button-info.is-plain:active {\n  background: #82848a;\n  border-color: #82848a;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-info.is-plain.is-disabled, .wu-button-info.is-plain.is-disabled:hover, .wu-button-info.is-plain.is-disabled:focus, .wu-button-info.is-plain.is-disabled:active {\n  color: #bcbec2;\n  background-color: #f4f4f5;\n  border-color: #e9e9eb;\n}\n\n.wu-button-medium {\n  padding: 10px 20px;\n  font-size: 14px;\n  border-radius: 4px;\n}\n.wu-button-medium.is-round {\n  padding: 10px 20px;\n}\n.wu-button-medium.is-circle {\n  padding: 10px;\n}\n\n.wu-button-small {\n  padding: 9px 15px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n.wu-button-small.is-round {\n  padding: 9px 15px;\n}\n.wu-button-small.is-circle {\n  padding: 9px;\n}\n\n.wu-button-mini {\n  padding: 7px 15px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n.wu-button-mini.is-round {\n  padding: 7px 15px;\n}\n.wu-button-mini.is-circle {\n  padding: 7px;\n}\n\n.wu-button-text {\n  border-color: transparent;\n  color: #409EFF;\n  background: transparent;\n  padding-left: 0;\n  padding-right: 0;\n}\n.wu-button-text:hover, .wu-button-text:focus {\n  color: #66b1ff;\n  border-color: transparent;\n  background-color: transparent;\n}\n.wu-button-text:active {\n  color: #3a8ee6;\n  border-color: transparent;\n  background-color: transparent;\n}\n.wu-button-text.is-disabled, .wu-button-text.is-disabled:hover, .wu-button-text.is-disabled:focus {\n  border-color: transparent;\n}\n\n.loading {\n  width: 1em;\n  height: 1em;\n  display: inline-block;\n  animation: loading 1s steps(12, end) infinite;\n  vertical-align: -0.125em;\n}\n\n@-webkit-keyframes loading {\n  0% {\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n@keyframes loading {\n  0% {\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    transform: rotate3d(0, 0, 1, 360deg);\n  }\n}';!function(n,t){void 0===t&&(t={});var e=t.insertAt;if(n&&"undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css","top"===e&&o.firstChild?o.insertBefore(r,o.firstChild):o.appendChild(r),r.styleSheet?r.styleSheet.cssText=n:r.appendChild(document.createTextNode(n))}}(pn);var fn=function(n){function t(){return n.call(this)||this}var s,a;return e(t,n),t.prototype.typeChange=function(n,t){console.log(n,t)},t.prototype.render=function(n,t){var e,r=this;return un("button",o({onclick:function(){var n=Math.floor(4*Math.random());r.type=["success","primary","warning","danger"][n]},disabled:this.disabled},function(n,t,e){var o=Array.prototype.slice.call(arguments,0),r=o[0],i=o.slice(1);return r.class?(i.unshift(r.class),delete r.class):r.className&&(i.unshift(r.className),delete r.className),i.length>0?{class:dn.apply(null,i)}:{class:""}}({},"wu-button",((e={})["wu-button-"+this.type]=this.type,e["wu-button-"+this.size]=this.size,e["is-plain"]=this.plain,e["is-round"]=this.round,e["is-circle"]=this.circle,e["is-disabled"]=this.disabled,e)),{type:this.nativeType}),this.loading&&[un("svg",{class:"loading",viewBox:"0 0 1024 1024",focusable:"false","data-icon":"loading",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},un("path",{d:"M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"}))," "],this.text,un("slot",null))},r([M({default:"primary",type:String}),i("design:type",String)],t.prototype,"type",void 0),r([M({default:"mini",type:String}),i("design:type",String)],t.prototype,"size",void 0),r([M({default:!1,type:Boolean}),i("design:type",Boolean)],t.prototype,"plain",void 0),r([M({default:!1,type:Boolean}),i("design:type",Boolean)],t.prototype,"round",void 0),r([M({default:!1,type:Boolean}),i("design:type",Boolean)],t.prototype,"circle",void 0),r([M({default:!1,type:Boolean}),i("design:type",Boolean)],t.prototype,"loading",void 0),r([M({default:!1,type:Boolean}),i("design:type",Boolean)],t.prototype,"disabled",void 0),r([M({default:"",type:String}),i("design:type",String)],t.prototype,"icon",void 0),r([M({default:"button",type:String}),i("design:type",String)],t.prototype,"nativeType",void 0),r([M({default:"",type:String}),i("design:type",String)],t.prototype,"text",void 0),r([z({default:"",type:String}),i("design:type",String)],t.prototype,"text1",void 0),r([(s="type",function(n,t,e){var o,r=null!==(o=Reflect.getMetadata(w,n))&&void 0!==o?o:[],i=e.value;r.push({callback:i,options:a||{},callbackName:t,path:s}),Reflect.defineMetadata(w,r,n)}),i("design:type",Function),i("design:paramtypes",[Object,Object]),i("design:returntype",void 0)],t.prototype,"typeChange",null),t=r([D({name:"test-com-new1",css:pn}),i("design:paramtypes",[])],t)}(cn);n.WuButton=fn,Object.defineProperty(n,"__esModule",{value:!0})}));
