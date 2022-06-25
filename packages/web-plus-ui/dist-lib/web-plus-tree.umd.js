(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@canyuegongzi/web-core-plus')) :
    typeof define === 'function' && define.amd ? define(['exports', '@canyuegongzi/web-core-plus'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.webUIPlusTree = {}, global.webCorePlus));
})(this, (function (exports, webCorePlus) { 'use strict';

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

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
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
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
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

    var css_248z$1 = "@charset \"UTF-8\";\n/**********************系统级别配置*******************************/\n/**********************基本颜色***************************/\n/* z-index\n-------------------------- */\n/* Disable base\n-------------------------- */\n/* Transition\n-------------------------- */\n/* Color\n-------------------------- */\n/* 53a8ff */\n/* 66b1ff */\n/* 79bbff */\n/* 8cc5ff */\n/* a0cfff */\n/* b3d8ff */\n/* c6e2ff */\n/* d9ecff */\n/* ecf5ff */\n/* Fill\n-------------------------- */\n/**********************基本边框***************************/\n/**********************盒模型阴影*************************/\n/**********************基本字体*************************/\n/**********************Button***************************/\n/**************************Radio****************************/\n/* Input-------------------------- */\n/* Break-point\n--------------------------*/\n/* Link\n--------------------------*/\n/* Switch\n-------------------------- */\n/* Table\n-------------------------- */\n/* Pagination\n-------------------------- */\n/* Dropdown\n-------------------------- */\n/* Checkbox\n-------------------------- */\n/* Tag\n-------------------------- */\n/* Message\n-------------------------- */\n/* Rate\n--------------------------*/\n/* Timeline\n--------------------------*/\n/* Select\n-------------------------- */\n/* Avatar\n--------------------------*/\n/* Badge\n-------------------------- */\n/* Empty\n-------------------------- */\n/* Skeleton\n--------------------------*/\n/* Svg\n--------------- */\n/* Card\n--------------------------*/\n/* Header\n  --------------------------*/\n/* Footer\n--------------------------*/\n/* Main\n--------------------------*/\n/* Alert\n-------------------------- */\n/* Pagination\n-------------------------- */\n/* Transition\n-------------------------- */\n/* Collapse\n--------------------------*/\n/* Menu\n--------------------------*/\n/* BEM support Func\n -------------------------- */\n/* Break-points\n -------------------------- */\n/* Scrollbar\n -------------------------- */\n/* Placeholder\n -------------------------- */\n:host {\n  display: block;\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content;\n  height: -webkit-fit-content;\n  height: -moz-fit-content;\n  height: fit-content;\n}\n\n.wu-tree_inner {\n  max-height: 500px;\n  overflow: auto;\n  background: #fff;\n  box-sizing: border-box;\n}\n\n.wu-tree_inner::-webkit-scrollbar {\n  /*滚动条整体样式*/\n  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/\n  height: 1px;\n}\n\n.wu-tree_inner::-webkit-scrollbar-thumb {\n  /*滚动条里面小方块*/\n  border-radius: 10px;\n  box-shadow: inset 0 0 5px rgba(144, 147, 153, 0.3);\n  background: rgba(144, 147, 153, 0.3);\n}\n\n.wu-tree_inner::-webkit-scrollbar-track {\n  /*滚动条里面轨道*/\n  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  border-radius: 10px;\n  background: #ededed;\n}";
    styleInject(css_248z$1);

    var css_248z = ":root {\n  --xntree-primary-color:#409EFF;\n  --xntree-searched-color:#0bb56e;\n  --xntree-moving-color:#f1fa8c;\n  --xntree-hover-color:#E9EBF2;\n  --xntree-on-color:#409EFF;\n}\n\n.wu-tree-icon {\n  width: 1em;\n  height: 1em;\n  vertical-align: -0.15em;\n  fill: currentColor;\n  overflow: hidden;\n}\n\n.xntree-outer {\n  position: relative;\n}\n\n.xntree-outer .xntree-cont {\n  position: absolute;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  transform-origin: left top;\n  min-width: 100%;\n}\n\n.xntree-outer .xntree-item {\n  display: flex;\n  line-height: 32px;\n  font-size: 14px;\n  /*padding-left:40px;*/\n  position: relative;\n  align-items: center;\n  height: 32px;\n}\n\n.xntree-outer .xntree-item.on {\n  background: var(--xntree-on-color);\n  color: #fff;\n}\n\n.xntree-outer .xntree-item.on .xn-tree-icons a {\n  color: #fff;\n}\n\n.xntree-outer .xn-slidedown, .xntree-outer .xn-folder {\n  /*position: absolute;*/\n  width: 15px;\n  left: 0;\n  overflow: hidden;\n}\n\n.xntree-outer .xn-slidedown:not(.down):before {\n  transform: rotateZ(-90deg);\n  position: absolute;\n}\n\n.xntree-outer .xn-folder {\n  left: 15px;\n}\n\n.xntree-outer .xn-tree-icons {\n  /*width: 30px;*/\n  /*flex: 0 0 30px;*/\n  display: flex;\n  color: #666;\n  justify-content: space-between;\n  height: 100%;\n}\n\n.xntree-outer .xn-tree-icons a {\n  flex: 1;\n  width: 15px;\n}\n\n.xntree-outer .xn-indent {\n  display: inline-block;\n  width: 15px;\n  flex: 0 0 15px;\n  line-height: inherit;\n  height: 100%;\n}\n\n.xntree-outer .xn-checkbox, .xntree-outer .xn-radio {\n  width: 14px;\n  height: 14px;\n  border: 1px solid #ccc;\n  margin: 0 4px;\n  flex: 0 0 14px;\n  cursor: pointer;\n  position: relative;\n  box-sizing: border-box;\n}\n\n.xntree-outer .xn-radio {\n  border-radius: 50%;\n}\n\n.xntree-outer .xn-checkbox.on, .xntree-outer .xn-radio.on {\n  background: var(--xntree-primary-color);\n  border-color: var(--xntree-primary-color);\n}\n\n.xntree-outer .xn-checkbox.disable, .xntree-outer .xn-radio.disable {\n  background: #efefef;\n}\n\n.xntree-outer .xn-checkbox.on:before, .xntree-outer .xn-radio.on:before {\n  position: absolute;\n  top: 0;\n  left: 0;\n  color: #fff;\n  width: 100%;\n  height: 100%;\n  font-size: 12px;\n  line-height: 11px;\n}\n\n.xntree-outer .xn-hide, .xntree-outer .xn-hide-sub {\n  display: none;\n}\n\n.xntree-outer .xntree-label {\n  white-space: nowrap;\n  cursor: pointer;\n  flex: auto;\n}\n\n.xntree-outer .xntree-move {\n  width: 100%;\n  height: 1px;\n  background: #333;\n  position: absolute;\n  left: 0;\n  /*display: none;*/\n}\n\n.xntree-outer .xntree-item {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  box-sizing: border-box;\n}\n\n.xntree-outer .xntree-item.xn-onmoving {\n  background: var(--xntree-moving-color);\n}\n\n/*.xntree-outer .xntree-item:not(.xn-onmoving,.on):hover{*/\n/*    background: var(--xntree-hover-color);*/\n/*}*/\n.xntree-outer:not(.xn-moving) .xntree-item:not(.on):hover {\n  background: var(--xntree-hover-color);\n}\n\n.xntree-outer .xn-searchedkey {\n  color: #fff;\n  background: var(--xntree-searched-color);\n}\n\n.center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  color: #FFFFFF;\n}\n\n.icon-rotate {\n  transform: rotate(90deg);\n}";
    styleInject(css_248z);

    function init(el) {
        if (typeof el == 'string') {
            this.el = this.ConvertToArray(document.querySelectorAll(el));
        }
        if (el instanceof NodeList) {
            this.el = this.ConvertToArray(el);
        }
        else if (Array.isArray(el)) {
            this.el = el;
        }
        if (el instanceof Node) {
            this.el = [el];
        }
        if (!this.el) {
            this.el = [];
        }
    }
    function XNQuery(el) {
        return new init(el);
    }
    XNQuery.prototype = init.prototype = {
        length: function () {
            return this.el.length;
        },
        extend: function () {
            var length = arguments.length;
            var options, name, src, copy, clone, target = arguments[0] || {}, // 目标对象
            i = 1, deep = false;
            // 处理深度拷贝情况（第一个参数是boolean类型且为true）
            if (typeof target === 'boolean') {
                deep = target;
                target = arguments[1] || {};
                // 跳过第一个参数（是否深度拷贝）和第二个参数（目标对象）
                i = 2;
            }
            // 如果目标不是对象或函数，则初始化为空对象
            if (typeof target !== 'object') {
                target = {};
            }
            // 如果只指定了一个参数，则使用jQuery自身作为目标对象
            if (length === i) {
                target = this;
                --i;
            }
            for (; i < length; i++) {
                // Only deal with non-null/undefined values
                if ((options = arguments[i]) != null) {
                    // Extend the base object
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        // Prevent never-ending loop
                        if (target === copy) {
                            continue;
                        }
                        // 如果对象中包含了数组或者其他对象，则使用递归进行拷贝
                        if (deep && copy && (typeof copy == 'object' || (Array.isArray(copy)))) {
                            if (Array.isArray(copy)) {
                                // 如果目标对象不存在该数组，则创建一个空数组；
                                clone = src && Array.isArray(src) ? src : [];
                            }
                            else {
                                clone = src && typeof src == 'object' ? src : {};
                            }
                            // 从不改变原始对象，只做拷贝
                            target[name] = this.extend(deep, clone, copy);
                            // 不拷贝undefined值
                        }
                        else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            // 返回已经被修改的对象
            return target;
        },
        parent: function () {
            var el = this.el[0];
            if (el && el.parentNode) {
                return XNQuery([el.parentNode]);
            }
            else {
                return XNQuery([]);
            }
        },
        parents: function (parentSelector /* optional */, container) {
            var el = this.el[0];
            if (parentSelector === undefined) {
                parentSelector = [container || document];
            }
            else {
                parentSelector = this.ConvertToArray(container ? container.querySelectorAll(parentSelector) : document.querySelectorAll(parentSelector));
            }
            var parents = [];
            if (el) {
                parentSelector.forEach(function (e) {
                    var p = el.parentNode;
                    while (p != e && p != null) {
                        p = p.parentNode;
                    }
                    if (p != null) {
                        parents.push(p);
                    }
                });
            }
            return XNQuery(parents);
            // const p = el.parentNode;
            // console.log(parentSelector,p)
            // while (p !== parentSelector && p!=null) {
            //     const o = p;
            //     console.log(o)
            //     parents.push(o);
            //     p = o.parentNode;
            // }
            // parents.push(parentSelector); // Push that parentSelector you wanted to stop at
            // console.log(parents);
            // // return parents;
            // return XNQuery(this.reverseArryToNodeList(parents))
        },
        reverseArryToNodeList: function (arry) {
            return arry;
        },
        hasClass: function (className) {
            if (this.el.length > 0) {
                return this.el[0].classList.contains(className);
            }
            else {
                return false;
            }
        },
        attr: function (attr, value) {
            if (value) {
                this.el.forEach(function (e) {
                    e.setAttribute(attr, value);
                });
                return this;
            }
            else {
                if (!this.el[0]) {
                    return null;
                }
                return this.el[0].getAttribute(attr);
            }
        },
        find: function (query) {
            var _this = this;
            if (!this.el || this.el.length <= 0) {
                return XNQuery([]);
            }
            if (typeof query != 'string') {
                var list_1 = [];
                this.el.forEach(function (e) {
                    var arry = e.querySelectorAll('*');
                    for (var i = 0; i < arry.length; i++) {
                        if (arry[i] == query) {
                            list_1.push(query);
                        }
                    }
                });
                return XNQuery(list_1);
            }
            else {
                var list_2 = [];
                this.el.forEach(function (e) {
                    list_2 = list_2.concat(_this.ConvertToArray(e.querySelectorAll(query)));
                });
                return XNQuery(list_2);
            }
        },
        children: function (query) {
            var _this = this;
            if (!this.el || this.el.length <= 0) {
                return XNQuery([]);
            }
            var queryList = [];
            if (Array.isArray(query)) {
                queryList = query;
            }
            var children = [];
            this.el.forEach(function (e) {
                children = children.concat(_this.ConvertToArray(e.children));
                if (typeof query == 'string') {
                    queryList = queryList.concat(_this.ConvertToArray(e.querySelectorAll(query)));
                }
            });
            var list = [];
            var queryListLength = queryList.length;
            for (var i = 0; i < children.length; i++) {
                var c = children[i];
                for (var j = 0; j < queryListLength; j++) {
                    if (queryList[j] == c) {
                        list.push(c);
                        break;
                    }
                }
            }
            return XNQuery(list);
        },
        each: function (callback) {
            return this.el.forEach(callback);
        },
        // @ts-ignore
        index: function (targetDom) {
            if (!targetDom) {
                var list = this.el[0].parentNode.childNodes;
                for (var i = 0; i < list.length; i++) {
                    if (list[i] === this.el[0]) {
                        return i;
                    }
                }
                return null;
            }
            else {
                for (var i = 0; i < this.el.length; i++) {
                    if (this.el[i] === targetDom) {
                        return i;
                    }
                }
            }
        },
        eq: function (index) {
            var el = this.el[index];
            if (el) {
                return XNQuery(this.reverseArryToNodeList([el]));
            }
            else {
                return XNQuery(this.reverseArryToNodeList([]));
            }
        },
        get: function (index) {
            return this.el[index];
        },
        addClass: function (classname) {
            this.el.forEach(function (e) {
                var _a;
                if (e.classList) {
                    (_a = e.classList).add.apply(_a, __spreadArray([], __read(classname.split(' ')), false));
                }
            });
        },
        nextUntil: function (query, isprev) {
            if (isprev === void 0) { isprev = false; }
            var el = this.el[0];
            var next = null;
            if (!el) {
                return XNQuery([]);
            }
            if (!query) {
                next = null;
            }
            else {
                if (typeof query == 'object' && query instanceof Node) {
                    next = query;
                }
                else {
                    next = el.parentNode.querySelector(query);
                }
            }
            var list = [];
            var func = isprev ? 'previousSibling' : 'nextSibling';
            var n = el[func];
            while (n != next && n != null) {
                list.push(n);
                n = n[func];
            }
            return XNQuery(list);
        },
        prevAll: function () {
            return this.nextUntil(null, true);
        },
        nextAll: function () {
            return this.nextUntil();
        },
        removeClass: function (classname) {
            this.el.forEach(function (e) {
                e.classList.remove(classname);
            });
            return this;
        },
        val: function (val) {
            if (!val) {
                return this.el[0].value;
            }
            else {
                this.el.forEach(function (e) {
                    e.value = val;
                });
            }
        },
        html: function (val) {
            if (!this.el || !this.el[0]) {
                return;
            }
            if (!val) {
                return this.el[0].innerHTML;
            }
            else {
                this.el.forEach(function (e) {
                    e.innerHTML = val;
                });
            }
        },
        empty: function () {
            this.el.forEach(function (e) {
                e.innerHTML = '';
            });
            return this;
        },
        parseToDOM: function (str) {
            var div = document.createElement('div');
            if (typeof str == 'string') {
                div.innerHTML = str;
            }
            return div.childNodes;
        },
        ConvertToArray: function (nodes) {
            var array = null;
            try {
                array = Array.prototype.slice.call(nodes, 0); //非ie浏览器  ie8-将NodeList实现为COM对象，不能用这种方式检测
            }
            catch (ex) {
                //ie8-
                array = [];
                for (var i = 0; i < nodes.length; i++) {
                    array.push(nodes[0]);
                }
            }
            return array;
        },
        parseDomToString: function (dom) { },
        append: function (newel) {
            var newele;
            if (typeof newel == 'string') {
                newele = this.parseToDOM(newel);
                newele = this.ConvertToArray(newele);
            }
            else {
                newele = [newel];
            }
            var _loop_1 = function (i) {
                var newe = newele[i];
                this_1.el.forEach(function (e) {
                    e.appendChild(newe);
                });
            };
            var this_1 = this;
            for (var i = 0; i < newele.length; i++) {
                _loop_1(i);
            }
        },
        remove: function () {
            this.el.forEach(function (e) {
                if (e.parentNode) {
                    e.parentNode.removeChild(e);
                }
            });
        },
        slideUp: function (time) {
            this.el.forEach(function (e) {
                e.style.display = 'none';
            });
        },
        css: function () {
            var css = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                css[_i] = arguments[_i];
            }
            if (typeof css[0] == 'object') {
                var _loop_2 = function (i) {
                    this_2.el.forEach(function (e) {
                        e.style[i] = css[0][i];
                    });
                };
                var this_2 = this;
                for (var i in css[0]) {
                    _loop_2(i);
                }
                return this;
            }
            else {
                if (css.length == 1) {
                    return this.el[0].style[css[0]];
                }
                if (css.length == 2) {
                    this.el.forEach(function (e) {
                        e.style[css[0]] = css[1];
                    });
                    return this;
                }
            }
        },
        fadeOut: function (time, callback) {
            var _this = this;
            this.el.forEach(function (e) {
                _this.animate({ opacity: 0 }, time, e, function () {
                    e.style.display = 'none';
                    if (typeof callback == 'function') {
                        callback();
                    }
                });
            });
        },
        fadeIn: function (time, callback) {
            var _this = this;
            this.el.forEach(function (e) {
                e.style.display = 'block';
                // e.style.opacity = 1;
                _this.animate({ opacity: 1 }, time, e, callback);
            });
        },
        animate: function (css, time, ele, callback) {
            if (!time) {
                time = 300;
            }
            var totalTimes = time / 50;
            var initTime = 0;
            var initCss = {};
            for (var i in css) {
                if (!isNaN(parseFloat(css[i]))) {
                    initCss[i] = { init: parseFloat(ele.style[i]) || 0, unit: String(css[i]).substring(String(parseFloat(css[i])).length) };
                }
            }
            var interval = window.setInterval(function () {
                for (var i in initCss) {
                    if (initTime >= totalTimes) {
                        ele.style[i] = css[i];
                    }
                    else {
                        ele.style[i] = ((parseFloat(css[i]) - initCss[i].init) * initTime) / totalTimes + initCss[i].init + initCss[i].unit;
                    }
                }
                if (initTime >= totalTimes) {
                    window.clearInterval(interval);
                    if (typeof callback == 'function') {
                        callback();
                    }
                }
                initTime++;
            }, 20);
        },
        outerWidth: function () {
            var el = this.el[0];
            return el.offsetWidth;
        },
        outerHeight: function () {
            var el = this.el[0];
            return el.offsetHeight;
        },
        hide: function () {
            this.el.forEach(function (e) {
                e.style.display = 'none';
            });
            return this;
        },
        show: function () {
            this.el.forEach(function (e) {
                e.style.display = 'block';
            });
            return this;
        },
        position: function () {
            return {
                top: this.el[0].offsetTop,
                left: this.el[0].offsetLeft,
            };
        },
        not: function (dom) {
            this.el = this.el.filter(function (e) {
                return e != dom;
            });
            return this;
        },
    };
    XNQuery.extend = XNQuery.prototype.extend;

    var defaultOption = {
        defaultCheckedKeys: [],
        defaultExpandedKeys: [],
        label: 'text',
        id: 'id',
        lineHeight: 32,
        dataType: 'tree',
        lazyLoad: false,
        // pId: 'parentid',
        selectType: 'checkbox',
        checkDisabled: function (d) {
            return false;
        },
        autoOpen: function (d, level) {
            return level <= 2;
        },
        checkSticky: {
            on: 'pc',
            off: 'pc'
        },
        editNode: function (d) {
            return true;
        },
        deleteNode: function (d) {
            return true;
        },
        addChildNode: function (d) {
            return true;
        }
    };
    var iconMap = {
        tick: "<svg t=\"1656142168735\" data-checkbox=\"data-checkbox\" class=\"wu-tree-icon center\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"27917\" width=\"200\" height=\"200\"><path data-checkbox=\"data-checkbox\" d=\"M800 288a47.84 47.84 0 0 0-33.936 14.064L432 636.112 257.936 462.064a48 48 0 1 0-67.872 67.872l208 208c8.688 8.688 20.688 14.064 33.936 14.064s25.248-5.376 33.936-14.064l368-368A48 48 0 0 0 800 288z\" fill=\"\" p-id=\"27918\"></path></svg>",
        up: "<svg t=\"1656144009618\" data-slide=\"data-slide\" class=\"wu-tree-icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"28056\" width=\"200\" height=\"200\"><path data-slide=\"data-slide\" d=\"M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z\" p-id=\"28057\"></path></svg>"
    };
    var Tree = /** @class */ (function () {
        function Tree(container, data, option) {
            this.container = container;
            this.container.classList.add('xntree-outer');
            this.option = XNQuery.extend(true, {}, defaultOption, option);
            if (option.dataType == 'list') {
                this.data = this.revertListToTree(data);
            }
            else {
                this.data = XNQuery.extend(true, [], data);
            }
            this.flatList = {};
            this.flatListKeys = [];
            this.totalNum = parseInt(String((this.container.clientHeight || document.body.clientHeight) / this.option.lineHeight));
            this.topIndex = 0;
            this.bottomIndex = this.totalNum + 4;
            this.slidedownHTML = {
                'up': "<a class=\"xn-slidedown\">\n                       ".concat(iconMap['up'], "\n                   </a>"),
                'down': "<a class=\"xn-slidedown icon-rotate\">\n                          ".concat(iconMap['up'], "\n                    </a>"),
            };
            this.iconHTML = {
                folder: "<a class=\"xn-folder iconfontxntree icon-xntreewenjianjia\">\n                         <svg class=\"wu-tree-icon\" aria-hidden=\"true\">\n                             <use xlink:href=\"#icon-folder\"></use>\n                         </svg>\n                     </a>",
                file: "<a class=\"xn-file iconfontxntree icon-xntreefile\">\n                         <svg class=\"wu-tree-icon\" aria-hidden=\"true\">\n                             <use xlink:href=\"#icon-file-fill\"></use>\n                         </svg>\n                    </a>"
            };
            this.selectHTML = {
                checkbox: "<div class=\"xn-checkbox\" data-checkbox=\"data-checkbox\"></div>",
                checkboxon: "<div class=\"xn-checkbox on\" data-checkbox=\"data-checkbox\">\n                            ".concat(iconMap['tick'], "\n                         </div>"),
                checkboxindeterminate: "<div class=\"xn-checkbox on\" data-checkbox=\"data-checkbox\">\n                                        <svg class=\"wu-tree-icon\" aria-hidden=\"true\">\n                                            <use xlink:href=\"#icon-line\"></use>\n                                        </svg>\n                                    </div>",
                checkboxdisable: "<div class=\"xn-checkbox disable\" data-checkbox=\"data-checkbox\"></div>",
                radio: "<div class=\"xn-radio\" data-radio=\"data-radio\"></div>",
                radioon: "<div class=\"xn-radio on\" data-radio=\"data-radio\">\n                             ".concat(iconMap['tick'], "\n                      </div>"),
                radiodisable: "<div class=\"xn-radio disable\" data-radio=\"data-radio\"></div>"
            };
            this.checked = {
                nodes: [],
                keys: []
            };
            this.clicked = null;
            this.getFlatData();
            if (option.defaultCheckedKeys && Array.isArray(option.defaultCheckedKeys) && option.defaultCheckedKeys.length) {
                var nodes = [];
                var keys = [];
                for (var i = 0; i < option.defaultCheckedKeys.length; i++) {
                    var nodeData = this.getNodeById(option.defaultCheckedKeys[i]);
                    if (nodeData) {
                        nodes.push(nodeData);
                        keys.push(option.defaultCheckedKeys[i]);
                    }
                }
                this.checked = {
                    nodes: nodes,
                    keys: keys
                };
                console.log(this.checked);
            }
            this.init();
            this.addResizeObserve();
        }
        Tree.prototype.addResizeObserve = function () {
            var _this = this;
            this.resizeObserver = new ResizeObserver(function (entries) {
                _this.totalNum = parseInt(String((_this.container.clientHeight || document.body.clientHeight) / _this.option.lineHeight));
                _this.refreshDom(true);
            });
            this.resizeObserver.observe(this.container);
        };
        Tree.prototype.init = function () {
            // console.log(this.data);
            this.rendDom();
            this.addEvent();
            if (this.checked.keys.length) {
                this.setCheckedKeys(this.checked.keys);
            }
        };
        Tree.prototype.addMoveDom = function () {
            return "\n        <div class=\"xntree-move\"></div>\n        ";
        };
        Tree.prototype.rendDom = function () {
            this.openNumber = 0;
            this.dom = '<div class="xntree-cont">';
            this.index = 0;
            this.dom += this._rendHTML(this.data, 0) + "</div>";
            var movedom = this.addMoveDom();
            var scrollDom = '<div class="xntree-scroll" style="height:' + this.openNumber * this.option.lineHeight + 'px"></div>';
            this.container.innerHTML = scrollDom + this.dom + movedom;
            this.movedom = this.container.querySelector('.xntree-move');
            this.scrollDom = this.container.querySelector('.xntree-scroll');
            this.setScrollWidth();
        };
        Tree.prototype.setScrollWidth = function () {
            var width = this.container.querySelector(".xntree-cont").clientWidth;
            this.scrollDom.style.minWidth = width + 'px';
        };
        Tree.prototype._rendHTML = function (list, level, justScroll) {
            var dom = '';
            var span = '';
            for (var i = 0; i < level; i++) {
                span += '<span class="xn-indent"></span>';
            }
            for (var i = 0; i < list.length; i++) {
                var l = list[i];
                if (l.$show) {
                    if (this.seachKeys && !this.searchKeysJson[l[this.option.id]]) {
                        continue;
                    }
                    else {
                        this.index++;
                        this.openNumber++;
                        if (this.clicked && this.clicked[this.option.id] == l.id) {
                            this.calcCurrent = false;
                        }
                        if (this.calcCurrent) {
                            this.currentNumber++;
                        }
                    }
                }
                if (this.index - 1 >= this.topIndex && this.index <= this.bottomIndex) {
                    if (l.$show) {
                        var _a = __read(this._rendOneNode(l, span, level, l.$show), 1), h = _a[0];
                        dom += h;
                    }
                }
                else if (justScroll && this.index > this.bottomIndex) {
                    return dom;
                }
                if (l.children && l.children.length > 0 && l.$show) {
                    var cDom = this._rendHTML(l.children, level + 1, justScroll);
                    dom += cDom;
                }
            }
            return dom;
        };
        Tree.prototype._rendOneNode = function (l, span, level, open) {
            var pre = '<div class="xn-tree-icons">';
            if ((l.$show && l.children && l.children[0]) || this.option.lazyLoad) {
                pre += this.slidedownHTML[(l.children && l.children[0] && l.children[0].$show) ? 'down' : 'up'];
            }
            else {
                pre += '<a></a>';
            }
            if (!this.option.hideIcon) {
                var icon = (l.children && l.children.length > 0) ? 'folder' : 'file';
                pre += this.iconHTML[icon];
            }
            pre += '</div>';
            l.$level = level;
            if (!span) {
                span = '';
                for (var i = 0; i < level; i++) {
                    span += '<span class="xn-indent"></span>';
                }
            }
            var label = '';
            if (typeof this.option.label == 'string') {
                label = l[this.option.label];
                if (this.searchKeyword) {
                    label = this.replaceKey(label, this.searchKeyword);
                }
            }
            else if (typeof this.option.label == 'function') {
                label = this.option.label(l, this, this.searchKeyword);
            }
            // let ope = `<div class="xntree-ope">`
            // if (this.option.addChildNode(l)) {
            //     ope += `<a class="xntree-add"></a>`
            // }
            // if (this.option.editNode(l)) {
            //     ope += `<a class="xntree-edit"></a>`
            // }
            // if (this.option.deleteNode(l)) {
            //     ope += `<a class="xntree-delete"></a>`
            // }
            // ope += `</div>`
            var selectDom = '';
            if (this.option.selectType) {
                selectDom = this.selectHTML[this.option.selectType + (((this.checked.nodes[l[this.option.id]]) || this.checked.nodes[l[this.option.id]]) ? 'on' : '')] || '';
                if (this.option.checkDisabled(l)) {
                    selectDom = this.selectHTML[this.option.selectType + 'disable'];
                }
            }
            var h = "<div style=\"line-height: ".concat(this.option.lineHeight, "px;height:").concat(this.option.lineHeight, "px\" class=\"xntree-item ").concat(!open ? 'xn-hide-sub' : '', " ").concat((this.clicked && this.clicked[this.option.id] == l[this.option.id]) ? 'on' : '', "\" data-level=\"").concat(level, "\" data-id=\"").concat(l[this.option.id], "\">\n                    ").concat(span, "\n                    ").concat(pre, "\n                    ").concat(selectDom, "\n                    <div class=\"xntree-label\">").concat(label, "</div>\n                    </div>");
            var dom = document.createElement('div');
            dom.innerHTML = h;
            return [h, dom.childNodes[0]];
        };
        Tree.prototype.search = function (keyword, func, containChild) {
            var _this = this;
            var that = this;
            this.seachKeys = null;
            this.searchKeyword = keyword;
            if (keyword.trim()) {
                if (!func) {
                    func = function (d) {
                        return d[that.option.label].indexOf(keyword) > -1;
                    };
                }
                var path = [], result = [];
                var results = this.treeFindPath(this.data, func, path, result, containChild);
                this.seachKeys = __spreadArray([], __read(new Set(results.flat())), false);
                this.searchKeysJson = {};
                this.seachKeys.forEach(function (e) {
                    _this.searchKeysJson[e] = 1;
                });
            }
            this.refreshDom();
        };
        Tree.prototype.treeFindPath = function (tree, func, path, result, containChild, hasP) {
            var e_1, _a;
            if (path === void 0) { path = []; }
            if (result === void 0) { result = []; }
            try {
                for (var tree_1 = __values(tree), tree_1_1 = tree_1.next(); !tree_1_1.done; tree_1_1 = tree_1.next()) {
                    var data = tree_1_1.value;
                    path.push(data[this.option.id]);
                    var has = func(data);
                    (has || (containChild && hasP)) && result.push(__spreadArray([], __read(path), false));
                    data.children && this.treeFindPath(data.children, func, path, result, containChild, (has || (containChild && hasP)));
                    path.pop();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (tree_1_1 && !tree_1_1.done && (_a = tree_1.return)) _a.call(tree_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result;
        };
        Tree.prototype.addEvent = function () {
            var _this = this;
            var startTime = new Date().getTime();
            var clickFunc = function (e) {
                var $t = XNQuery(e.target);
                if ($t.hasClass('xn-slidedown') || $t.get(0).getAttribute('data-slide')) {
                    e.stopPropagation();
                    _this.slideEvent($t);
                }
                if ($t.hasClass('xn-checkbox') || $t.get(0).getAttribute('data-checkbox')) {
                    e.stopPropagation();
                    _this.checkEvent($t);
                }
                if ($t.hasClass('xn-radio') || $t.get(0).getAttribute('data-radio')) {
                    e.stopPropagation();
                    _this.radioEvent($t);
                }
                if ($t.hasClass('xntree-label') || $t.parents('.xntree-label').get(0)) {
                    e.stopPropagation();
                    var $item = $t;
                    if ($t.parents('.xntree-label').get(0)) {
                        $item = $t.parents('.xntree-label').eq(0);
                    }
                    _this.clickLabelEvent($item, $t, e);
                }
                if (new Date().getTime() - startTime < 300) {
                    e.stopPropagation();
                    dblclickFunc(e);
                }
                startTime = new Date().getTime();
            };
            var dblclickFunc = function (e) {
                // e.stopPropagation();
                var $t = XNQuery(e.target);
                if ($t.hasClass('xntree-label') || $t.parents('.xntree-label').get(0)) {
                    var $item = $t;
                    if ($t.parents('.xntree-label').get(0)) {
                        $item = $t.parents('.xntree-label').eq(0);
                    }
                    var p = $item.parents(".xntree-item").get(0);
                    var id = p.getAttribute('data-id');
                    var node = _this.getNodeById(id);
                    if (_this.option.on && _this.option.on.dblclickNode) {
                        _this.option.on.dblclickNode($t, node, id, e);
                    }
                }
            };
            this.clickFunc = clickFunc;
            this.container.addEventListener('click', clickFunc);
            this.mouseoverFunc = function (e) {
                var $t = XNQuery(e.target);
                if ($t.hasClass('xntree-item') || $t.parents('.xntree-item').get(0)) {
                    var $item = $t;
                    if ($t.parents('.xntree-item').get(0)) {
                        $item = $t.parents('.xntree-item').eq(0);
                    }
                    var id = $item.get(0).getAttribute('data-id');
                    var node = _this.getNodeById(id);
                    if (_this.option.on.hoverNode) {
                        _this.option.on.hoverNode(node, $t, e);
                    }
                }
            };
            this.container.addEventListener('mouseover', this.mouseoverFunc);
            var down = false;
            var move = false;
            var el = {};
            var mousedownFunc = function (e) {
                var $t = XNQuery(e.target);
                if ($t.parents('.xntree-item').get(0)) {
                    down = true;
                    el.$dom = $t.parents('.xntree-item').eq(0);
                    el.id = el.$dom.attr("data-id");
                    el.startTime = new Date().getTime();
                }
            };
            this.mousedownFunc = mousedownFunc;
            this.container.addEventListener("mousedown", mousedownFunc);
            var mousemoveFunc = function (e) {
                if (!_this.option.canMove) {
                    return;
                }
                if (down && new Date().getTime() - el.startTime > 300) {
                    var $t = XNQuery(e.target);
                    _this.container.classList.add("xn-moving");
                    XNQuery(_this.container).find('.xn-onmoving').removeClass('xn-onmoving');
                    if ($t.parents('.xntree-item').get(0)) {
                        var $onDom = $t.parents('.xntree-item').eq(0);
                        el.$onDom = $onDom;
                        el.onId = $onDom.attr("data-id");
                        var _a = __read(_this.getMovePos($onDom, e), 4), dir = _a[0], x = _a[1], y = _a[2], nextLevel = _a[3];
                        el.dir = dir;
                        el.y = y;
                        el.x = x;
                        el.nextLevel = nextLevel;
                        if (el.dir == 'on') {
                            el.$onDom.addClass('xn-onmoving');
                            _this.movedom.style.display = 'none';
                        }
                        else {
                            _this.movedom.style.top = el.y + 'px';
                            _this.movedom.style.left = el.x + 'px';
                            _this.movedom.style.display = 'block';
                            _this.movedom.style.width = 'calc(100% - ' + el.x + 'px)';
                        }
                    }
                    move = true;
                }
            };
            this.mousemoveFunc = mousemoveFunc;
            document.addEventListener("mousemove", mousemoveFunc);
            var mouseupFunc = function (e) {
                if (down && move) {
                    _this.moveItem(el);
                }
                down = false;
                move = false;
                _this.container.classList.remove("xn-moving");
                _this.movedom.style.display = 'none';
            };
            this.mouseupFunc = mouseupFunc;
            document.addEventListener("mouseup", mouseupFunc);
            var scrollFunc = function (e) {
                var y = (_this.container.scrollTop);
                _this.topIndex = Math.floor(y / _this.option.lineHeight);
                _this.bottomIndex = _this.topIndex + _this.totalNum + 4;
                _this.refreshDom(true);
                _this.container.querySelector(".xntree-cont").style.transform = 'translateY(' + (_this.topIndex * _this.option.lineHeight) + 'px)';
            };
            this.scrollFunc = scrollFunc;
            this.container.addEventListener('scroll', scrollFunc);
        };
        Tree.prototype.refreshDom = function (justScroll, needLocate) {
            if (justScroll === void 0) { justScroll = false; }
            if (needLocate === void 0) { needLocate = false; }
            this.index = 0;
            this.openNumber = 0;
            this.currentNumber = 0;
            this.calcCurrent = true;
            var dom = this._rendHTML(this.data, 0, justScroll);
            this.container.querySelector(".xntree-cont").innerHTML = dom;
            if (!justScroll) {
                this.scrollDom.style.height = this.openNumber * this.option.lineHeight + 'px';
                if (needLocate) {
                    this.container.scrollTo(0, this.currentNumber * this.option.lineHeight);
                }
            }
            this.setScrollWidth();
        };
        Tree.prototype.moveItem = function (el) {
            // if(el.isNext){
            //     el.onId=
            // }
            var nextLevel = el.nextLevel;
            while (el.nextLevel) {
                el.onId = this.flatList[el.onId][this.option.pId];
                el.nextLevel--;
            }
            if (el.id == el.onId) {
                return;
            }
            if (this.option.disableMoveNode == true) {
                return;
            }
            if (typeof this.option.disableMoveNode == 'function') {
                var dontMove = this.option.disableMoveNode(this.getNodeById(el.id), this.getNodeById(el.onId), el.dir);
                if (dontMove) {
                    return;
                }
            }
            var curP = this.flatList[this.flatList[el.id][this.option.pId]];
            if (!curP) {
                curP = {
                    children: this.data
                };
            }
            for (var i = 0; i < curP.children.length; i++) {
                if (curP.children[i][this.option.id] == el.id) {
                    curP.children.splice(i, 1);
                }
            }
            var hasChild = true;
            if (!this.flatList[el.onId].children) {
                this.flatList[el.onId].children = [];
                hasChild = false;
            }
            if (el.dir == 'on' || (hasChild && el.dir == 'down' && this.flatList[el.onId].children[0] && this.flatList[el.onId].children[0].$show && !nextLevel)) { //1.在节点上，2.当节点为展开状态，鼠标在节点下方，统一做在节点上的操作
                this.flatList[el.id][this.option.pId] = el.onId;
                this.flatList[el.onId].children.unshift(this.flatList[el.id]);
                this.flatList[el.id].$show = this.flatList[el.onId].children[1] && this.flatList[el.onId].children[1].$show;
                this.refreshDom();
                if (this.option.on.moveChange) {
                    this.option.on.moveChange(this.flatList[el.id], this.data);
                }
                return;
            }
            var pNode = this.flatList[this.flatList[el.onId][this.option.pId]];
            if ((!pNode) || (this.flatList[el.onId][this.option.id] == this.flatList[el.onId][this.option.pId])) { //有的时候跟节点的id和pid是同一个值
                pNode = {
                    children: this.data
                };
            }
            var index;
            for (var i = 0; i < pNode.children.length; i++) {
                if (pNode.children[i][this.option.id] == el.onId) {
                    index = i;
                }
            }
            this.flatList[el.id][this.option.pId] = this.flatList[el.onId][this.option.pId];
            if (el.dir == 'up') {
                pNode.children.splice(index, 0, this.flatList[el.id]);
            }
            if (el.dir == 'down') {
                pNode.children.splice(index + 1, 0, this.flatList[el.id]);
            }
            this.refreshDom();
            if (this.option.on.moveChange) {
                this.option.on.moveChange(this.flatList[el.id], this.data);
            }
        };
        Tree.prototype.renderOneTree = function (treeData, level, open) {
            var dom = this._rendHTML(treeData, level, open);
            var dom1 = document.createElement('div');
            dom1.innerHTML = dom;
            return dom1.childNodes;
        };
        Tree.prototype._getItemById = function (id) {
            return this.container.querySelector('[data-id="' + id + '"]');
        };
        Tree.prototype.getMovePos = function ($dom, e) {
            var nextLevel = null;
            var dir = '';
            var pos = $dom.get(0).getBoundingClientRect();
            var pPos = this.container.getBoundingClientRect();
            // @ts-ignore
            var top = pos.top - pPos.top, top1 = pos.top + pos.height * 2 / 5, top2 = pos.top + pos.height * 3 / 5; pos.top + pos.height;
            var etop = e.clientY;
            var y, x;
            var curLevel = $dom.get(0).getAttribute('data-level');
            var siblingLevel = $dom.get(0).nextSibling ? $dom.get(0).nextSibling.getAttribute('data-level') : null;
            var isindent = e.target.classList.contains('xn-indent');
            x = pos.left - pPos.left + ($dom.children(".xn-indent").el.length) * 15 + 15;
            if (etop <= top1) {
                dir = 'up';
                y = top + this.container.scrollTop;
            }
            if (etop > top1 && etop <= top2) {
                dir = 'on';
            }
            if (etop > top2) {
                dir = 'down';
                y = top + pos.height + this.container.scrollTop;
                if (isindent && curLevel != siblingLevel) {
                    nextLevel = ($dom.children('.xn-indent').el).length - ($dom.children('.xn-indent').el).indexOf(e.target);
                    if (curLevel - nextLevel < siblingLevel) {
                        nextLevel = curLevel - siblingLevel;
                    }
                    x = x - nextLevel * 15 - 15;
                }
            }
            return [dir, x, y, nextLevel];
        };
        Tree.prototype.setNodesShow = function (node) {
            if (!node) {
                return;
            }
            var pId = node[this.option.pId];
            var pNode = this.flatList[pId];
            if (!node.$show) {
                node.$show = true;
                if (pNode) {
                    for (var i = 0; i < pNode.children.length; i++) {
                        pNode.children[i].$show = true;
                    }
                }
            }
            this.setNodesShow(pNode);
        };
        Tree.prototype.setSelectKey = function (key, triggerClick, needLocate) {
            this.clicked = this.getNodeById(key);
            this.setNodesShow(this.clicked);
            this.refreshDom(false, needLocate);
            if (triggerClick) {
                this.trigger('clickNode', this.container.querySelector('.xntree-item[data-id="' + key + '"]'), this.clicked, key);
            }
        };
        Tree.prototype.clickLabelEvent = function ($item, $t, e) {
            var p = $item.parents(".xntree-item", this.container).get(0);
            // const plevel = parseInt(p.getAttribute('data-level'));
            var id = p.getAttribute('data-id');
            var node = this.getNodeById(id);
            var setClick = true;
            if (this.option.on && this.option.on.clickNode) {
                setClick = this.option.on.clickNode($t, node, id, e);
            }
            if (setClick) {
                this.clicked = node;
                // $(this.container).find(".xntree-item.on").removeClass('on')
                // $(p).addClass('on')
            }
            this.refreshDom();
        };
        Tree.prototype.radioEvent = function ($t) {
            var p = $t.parents(".xntree-item", this.container).get(0);
            var id = p.getAttribute('data-id');
            var node = this.getNodeById(id);
            this.checked.keys = [id];
            this.checked.nodes = {};
            this.checked.nodes[id] = this.getNodeById(id);
            this.refreshDom();
            this.trigger('checkChange', node, true, this.checked);
        };
        Tree.prototype.checkEvent = function ($t) {
            var _this = this;
            var p = $t.parents(".xntree-item", this.container).get(0);
            var id = p.getAttribute('data-id');
            var node = this.getNodeById(id);
            if (this.option.checkDisabled(node)) {
                return;
            }
            var checked = this.checked.nodes[id];
            var sticky = this.option.checkSticky.on;
            if (checked) {
                sticky = this.option.checkSticky.off;
            }
            var paths = [];
            if (sticky.indexOf('p') > -1) {
                var func = function (d) {
                    return d[_this.option.id] == id;
                };
                var path = [], result = [];
                var results = this.treeFindPath(this.data, func, path, result, sticky.indexOf('c') > -1);
                paths = __spreadArray([], __read(new Set(results.flat())), false);
            }
            else if (sticky.indexOf('c') > -1) {
                this._literalFlatTree({}, [node], {}, paths, 0, true);
            }
            else {
                paths = [id];
            }
            if (checked) {
                var indexs = this.delArrayFromArray(this.checked.keys, paths);
                for (var i = indexs.length - 1; i >= 0; i--) {
                    delete this.checked.nodes[indexs[i]];
                }
            }
            else {
                for (var i = 0; i < paths.length; i++) {
                    this.checked.keys.push(paths[i]);
                    var node_1 = this.getNodeById(paths[i]);
                    this.checked.nodes[paths[i]] = node_1;
                }
            }
            this.refreshDom();
            this.trigger('checkChange', node, !checked, this.checked);
        };
        Tree.prototype.delArrayFromArray = function (fromArray, delArray) {
            var indexs = [];
            for (var j = 0; j < delArray.length; j++) {
                var v = delArray[j];
                for (var i = fromArray.length - 1; i >= 0; i--) {
                    if (fromArray[i] == v) {
                        fromArray.splice(i, 1);
                        indexs.push(v);
                    }
                }
            }
            return indexs;
        };
        Tree.prototype.setCheckedKeys = function (keys) {
            this.checked.nodes = {};
            for (var i = keys.length - 1; i >= 0; i--) {
                var id = keys[i];
                var node = this.getNodeById(id);
                if (!node) { //用于处理设置的key值不存在的情况
                    keys.splice(i, 1);
                    continue;
                }
                this.checked.nodes[id] = (node);
            }
            this.checked.keys = keys;
            this.trigger('checkChange', false, false, this.checked, true);
            this.refreshDom();
        };
        Tree.prototype.trigger = function (type, data) {
            var _a;
            var args = [].slice.call(arguments);
            args.splice(0, 1);
            if (this.option.on[type]) {
                (_a = this.option.on)[type].apply(_a, __spreadArray([], __read(args), false));
            }
        };
        Tree.prototype.setCheckedNodes = function (nodes) {
            var _this = this;
            var keys = nodes.map(function (e) {
                return e[_this.option.id];
            });
            this.setCheckedKeys(keys);
        };
        Tree.prototype.getChecked = function () {
            return this.checked;
        };
        Tree.prototype.checkAll = function (justResult) {
            var _this = this;
            var list = XNQuery.extend(true, [], this.flatListKeys);
            list = list.filter(function (e) {
                return !_this.option.checkDisabled(_this.getNodeById(e));
            });
            if (justResult && this.seachKeys) {
                list = list.filter(function (e) {
                    return (!_this.seachKeys || _this.searchKeysJson[e]);
                });
            }
            this.setCheckedKeys(list);
        };
        Tree.prototype.clearAll = function () {
            this.setCheckedKeys([], true);
        };
        Tree.prototype.editNode = function (node) {
            var oldNode = this.getNodeById(node[this.option.id]);
            XNQuery.extend(true, oldNode, node);
            this.refreshDom();
            // let [h, icon, dom] = this._rendOneNode(newNode, false, oldNode.$level, true);
            // let oldDom = this.container.querySelector('[data-id="' + oldNode[this.option.id] + '"]')
            // oldDom.innerHTML = dom.innerHTML;
        };
        Tree.prototype.addNodes = function (id, nodes, open) {
            for (var i = nodes.length - 1; i >= 0; i--) {
                this._addOneNode(id, nodes[i], open);
            }
            this.refreshDom();
        };
        Tree.prototype._addOneNode = function (id, node, open) {
            var pNode = this.getNodeById(id);
            if (!pNode) {
                node.$level = 0;
                node.$show = true;
                this.data.unshift(node);
                this.flatList[node[this.option.id]] = node;
                this.flatListKeys.push(node[this.option.id]);
                this.refreshDom();
                return;
            }
            if (!pNode.children) {
                pNode.children = [];
            }
            var $level = pNode.$level + 1;
            node.$level = $level;
            node[this.option.pId || '$pId'] = id;
            if ((pNode.children[0] && pNode.children[0].$show) || open) {
                node.$show = true;
            }
            pNode.children.unshift(node);
            this.flatList[node[this.option.id]] = node;
            this.flatListKeys.push(node[this.option.id]);
        };
        Tree.prototype.addNode = function (id, node) {
            this._addOneNode(id, node);
            this.refreshDom();
            // let [h, icon, dom] = this._rendOneNode(node, false, $level, true);
            // this.container.querySelector('[data-id="' + id + '"]').after(dom)
        };
        Tree.prototype.insertAfter = function (insert_element, target_element) {
            var parent = insert_element.parentNode;
            //最后一个子节点 lastElementChild兼容其他浏览器 lastChild  兼容ie678;
            var last_element = parent.lastElementChild || parent.lastChild;
            //兄弟节点同样也是有兼容性
            var target_sibling = target_element.nextElementSibling || target_element.nextSibling;
            if (last_element == target_element) { //先判断目标节点是不是父级的最后一个节点，如果是的话，直接给父级加子节点就好
                parent.appendChild(insert_element);
            }
            else { //不是最好后一个节点  那么插入到目标元素的下一个兄弟节点之前（就相当于目标元素的insertafter）
                parent.insertBefore(insert_element, target_sibling);
            }
        };
        Tree.prototype.deleteNode = function (id) {
            var node = this.getNodeById(id);
            var pNode = this.getNodeById(node[this.option.pId]);
            var key = null;
            if (!pNode) {
                pNode = { children: this.data };
            }
            for (var i = 0; i < pNode.children.length; i++) {
                if (pNode.children[i][this.option.id] == id) {
                    key = i;
                    break;
                }
            }
            pNode.children.splice(key, 1);
            var delKeys = [];
            this._literalFlatTree({}, [node], {}, delKeys, 0, true);
            for (var i = 0; i < delKeys.length; i++) {
                var k = delKeys[i];
                this.flatListKeys.splice(this.flatListKeys.indexOf(k), 1);
                delete this.flatList[k];
                // $(this.container).find("[data-id='" + k + "']").remove();
            }
            this.refreshDom();
        };
        Tree.prototype._deleteDomFromId = function (id) {
            var node = this.getNodeById(id);
            var delKeys = [];
            this._literalFlatTree({}, [node], {}, delKeys, 0, true);
            for (var i = 0; i < delKeys.length; i++) {
                var k = delKeys[i];
                XNQuery(this.container).find("[data-id='" + k + "']").remove();
            }
        };
        Tree.prototype.getFlatData = function () {
            var list = [];
            this._literalFlatTree({}, this.data, this.flatList, this.flatListKeys, 0, false, list);
            if (!this.option.pId) {
                this.option.pId = '$pId';
            }
        };
        Tree.prototype._literalFlatTree = function (pNode, list, arry, arrykeys, level, dontSetData, list1) {
            for (var i = 0; i < list.length; i++) {
                var l = list[i];
                if (!dontSetData) {
                    l.$level = level;
                    l.$show = l.$show || this.option.autoOpen(l, level);
                    if (!this.option.pId) {
                        l.$pId = pNode[this.option.id];
                    }
                }
                list1.push(l);
                arry[l[this.option.id]] = l;
                arrykeys.push(l[this.option.id]);
                if (l.children && l.children.length > 0) {
                    this._literalFlatTree(l, l.children, arry, arrykeys, level + 1, dontSetData, list1);
                }
            }
        };
        Tree.prototype.getNodeById = function (id) {
            return this.flatList[id];
        };
        Tree.prototype._literalGetNode = function (list, id) {
            for (var i = 0; i < list.length; i++) {
                var l = list[i];
                if (l[this.option.id] == id) {
                    return l;
                }
            }
            return false;
        };
        Tree.prototype.openChildren = function (node) {
            for (var i = 0; i < node.children.length; i++) {
                node.children[i].$show = !node.children[i].$show;
            }
            this.refreshDom();
        };
        Tree.prototype.slideEvent = function ($t) {
            return __awaiter(this, void 0, void 0, function () {
                var p, id, node, nodes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            p = $t.parents(".xntree-item", this.container).get(0);
                            id = p.getAttribute('data-id');
                            node = this.getNodeById(id);
                            if (node.children && node.children.length >= 0) {
                                node.$$loaded = true;
                            }
                            if (!(node.$$loaded || !this.option.lazyLoad)) return [3 /*break*/, 1];
                            this.openChildren(node);
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, this.option.on.loadData(node)];
                        case 2:
                            nodes = _a.sent();
                            node.$$loaded = true;
                            this.addNodes(id, nodes, true);
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        Tree.prototype.findChildren = function (p, plevel) {
            var child = XNQuery(p).nextUntil('.xntree-item[data-level="' + plevel + '"]').filter(function (i, e) {
                var level = parseInt(e.getAttribute('data-level'));
                return (level > plevel);
            });
            return child;
        };
        Tree.prototype.resetOption = function (option) {
            if (JSON.stringify(this.option) == JSON.stringify(option)) {
                return;
            }
            this.option = XNQuery.extend(true, {}, this.option, option);
            // this.refreshDom()
        };
        Tree.prototype.replaceKey = function (text, keyword) {
            if (!keyword || keyword.trim() == '') {
                return text;
            }
            text = text.replace(new RegExp('(' + keyword + ')', 'ig'), '<span class="xn-searchedkey">$1</span>');
            return text;
        };
        Tree.prototype.destory = function () {
            this.container.removeEventListener('click', this.clickFunc);
            this.container.removeEventListener('dblclick', this.dblclickFunc);
            this.container.removeEventListener('mousedown', this.mousedownFunc);
            this.container.removeEventListener('mouseover', this.mouseoverFunc);
            document.removeEventListener('mousemove', this.mousemoveFunc);
            document.removeEventListener('mouseup', this.mouseupFunc);
            this.container.removeEventListener('scroll', this.scrollFunc);
            this.data = null;
            this.flatList = null;
            this.resizeObserver.unobserve(this.container);
        };
        Tree.prototype.revertListToTree = function (data) {
            var _this = this;
            var datajson = {};
            var d = XNQuery.extend(true, [], data);
            for (var i = 0; i < d.length; i++) {
                if (!d[i].children) {
                    d[i].children = [];
                }
                datajson[d[i][this.option.id]] = d[i];
            }
            var nd = d.filter(function (item) {
                if (datajson[item[_this.option.pId]] && item[_this.option.pId] != item[_this.option.id]) {
                    datajson[item[_this.option.pId]].children.push(item);
                    return false;
                }
                return true;
            });
            return nd;
        };
        Tree.prototype.revertTreeToList = function (treedata) {
            var list = [];
            this._revertTreeToListFunc(treedata, list);
            return list;
        };
        Tree.prototype._revertTreeToListFunc = function (treedata, list) {
            for (var i = 0; i < treedata.length; i++) {
                var item = XNQuery.extend(true, {}, treedata[i]);
                delete item.children;
                list.push(item);
                if (treedata[i].children) {
                    this._revertTreeToListFunc(treedata[i].children, list);
                }
            }
        };
        Tree.prototype.getData = function () {
            return this.data;
        };
        Tree.prototype.returnFlatData = function () {
            return this.flatList;
        };
        return Tree;
    }());

    var WuTree = /** @class */ (function (_super) {
        __extends(WuTree, _super);
        function WuTree() {
            return _super.call(this) || this;
        }
        WuTree.prototype.connected = function (shadowRoot) {
            var _this = this;
            var that = this;
            var option3 = __assign({ label: 'text', pId: false, selectType: this.selectType, canMove: this.canMove, defaultCheckedKeys: this.defaultCheckedKeys, 
                // defaultExpandedKeys: this.defaultExpandedKeys,
                defaultExpandedKeys: [], checkDisabled: function (d) {
                    return d[that.options.disabled] === true;
                }, autoOpen: function (d, level) {
                    return level <= 1;
                    /* if (that.defaultExpandedKeys.length) {
                         return that.defaultExpandedKeys.includes(d[that.options.id]);
                     } else {
                         return level <= 1;
                     }*/
                }, checkSticky: {
                    on: 'pc',
                    off: 'pc'
                }, hideIcon: true, on: {
                    clickNode: function ($t, nodedata, nodekey) {
                        that.nodeClick({
                            nodeData: nodedata,
                            nodeKey: nodekey
                        });
                        return true; //true则设置该节点为当前点击元素，false反之
                    },
                    checkChange: function (checkedData) {
                        that.checkChange(checkedData);
                    },
                    moveChange: function (movedNode, currentData) {
                        that.moveChange({
                            movedNode: movedNode,
                            currentData: currentData
                        });
                    }
                } }, this.options);
            Promise.resolve().then(function () {
                _this.tree = new Tree(shadowRoot.querySelector('#tree1'), _this.data, option3);
            });
        };
        WuTree.prototype.nodeClick = function (params) {
            return params;
        };
        WuTree.prototype.checkChange = function (params) {
            return params;
        };
        WuTree.prototype.moveChange = function (params) {
            return params;
        };
        /**
         * 获取选中数据
         */
        WuTree.prototype.getChecked = function () {
            return this.tree.getChecked();
        };
        /**
         * 选中全部,justResult为true则仅选择当前搜索结果
         * @param justResult
         */
        WuTree.prototype.checkAll = function (justResult) {
            if (justResult === void 0) { justResult = true; }
            return this.tree.checkAll(justResult);
        };
        /**
         * 清空所选项
         */
        WuTree.prototype.clearAll = function () {
            return this.tree.clearAll();
        };
        /**
         * 设置选中节点，keys为选中的节点id的数组
         */
        WuTree.prototype.setCheckedKeys = function (keys) {
            return this.tree.setCheckedKeys(keys);
        };
        /**
         * 设置选中节点，nodes为选中节点的数组
         */
        WuTree.prototype.setCheckedNodes = function (nodes) {
            return this.tree.setCheckedNodes(nodes);
        };
        /**
         * 编辑节点
         */
        WuTree.prototype.editNode = function (nodes) {
            return this.tree.editNode(nodes);
        };
        /**
         * 添加节点,id:添加到的父节点id，当添加根节点时id为null,node新节点数据
         */
        WuTree.prototype.addNode = function (id, nodes) {
            return this.tree.addNode(id, nodes);
        };
        /**
         * 删除节点
         */
        WuTree.prototype.deleteNode = function (id) {
            return this.tree.deleteNode(id);
        };
        /**
         * :获取某个节点数据
         */
        WuTree.prototype.getNodeById = function (id) {
            return this.tree.getNodeById(id);
        };
        /**
         * :重新计算容器高度
         */
        WuTree.prototype.resize = function () {
            return this.tree.container.resize();
        };
        /**
         * :重新绘制
         */
        WuTree.prototype.refreshDom = function (justScroll, needLocate) {
            if (justScroll === void 0) { justScroll = false; }
            if (needLocate === void 0) { needLocate = false; }
            return this.tree.refreshDom(justScroll, needLocate);
        };
        /**
         * :销毁实例，主要用于清除绑定事件
         */
        WuTree.prototype.destory = function () {
            return this.tree.destory();
        };
        WuTree.prototype.render = function (_renderProps, _store) {
            return (webCorePlus.h("div", { id: "tree1", class: "wu-tree_inner", style: { height: this.height, width: this.width } }));
        };
        __decorate([
            webCorePlus.Emit('node-click'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], WuTree.prototype, "nodeClick", null);
        __decorate([
            webCorePlus.Emit('check-change'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], WuTree.prototype, "checkChange", null);
        __decorate([
            webCorePlus.Emit('move-change'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], WuTree.prototype, "moveChange", null);
        __decorate([
            webCorePlus.Prop({ default: '300px', type: String }),
            __metadata("design:type", String)
        ], WuTree.prototype, "width", void 0);
        __decorate([
            webCorePlus.Prop({ default: '450px', type: String }),
            __metadata("design:type", String)
        ], WuTree.prototype, "height", void 0);
        __decorate([
            webCorePlus.Prop({ default: { id: 'id', label: 'label', disabled: 'disabled' }, type: Object }),
            __metadata("design:type", Object)
        ], WuTree.prototype, "options", void 0);
        __decorate([
            webCorePlus.Prop({ default: 32, type: Number }),
            __metadata("design:type", Number)
        ], WuTree.prototype, "lineHeight", void 0);
        __decorate([
            webCorePlus.Prop({ default: false }),
            __metadata("design:type", Object)
        ], WuTree.prototype, "selectType", void 0);
        __decorate([
            webCorePlus.Prop({ default: false, type: Boolean }),
            __metadata("design:type", Boolean)
        ], WuTree.prototype, "canMove", void 0);
        __decorate([
            webCorePlus.Prop({ default: [], type: Object }),
            __metadata("design:type", Object)
        ], WuTree.prototype, "data", void 0);
        __decorate([
            webCorePlus.Prop({ default: [], type: Array }),
            __metadata("design:type", Object)
        ], WuTree.prototype, "defaultCheckedKeys", void 0);
        __decorate([
            webCorePlus.Prop({ default: [], type: Array }),
            __metadata("design:type", Object)
        ], WuTree.prototype, "defaultExpandedKeys", void 0);
        WuTree = __decorate([
            webCorePlus.Component({
                name: 'wu-plus-tree',
                css: css_248z$1 + css_248z,
            }),
            __metadata("design:paramtypes", [])
        ], WuTree);
        return WuTree;
    }(webCorePlus.WuComponent));

    exports.WuTree = WuTree;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
