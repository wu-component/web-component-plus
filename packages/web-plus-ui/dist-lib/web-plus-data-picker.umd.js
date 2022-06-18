(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@canyuegongzi/web-core-plus')) :
    typeof define === 'function' && define.amd ? define(['exports', '@canyuegongzi/web-core-plus'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.webUIPlusDatePicker = {}, global.webCorePlus));
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
        parents: function (parentSelector /* optional */) {
            var el = this.el[0];
            if (parentSelector === undefined) {
                parentSelector = [document];
            }
            else {
                parentSelector = this.ConvertToArray(document.querySelectorAll(parentSelector));
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
                    (_a = e.classList).add.apply(_a, classname.split(' '));
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

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var dayjs_min = {exports: {}};

    (function (module, exports) {
    !function(t,e){module.exports=e();}(commonjsGlobal,function(){var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,c=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return +(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return {M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else {var i=t.name;M[i]=t,r=i;}return !n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t);}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},$.$utils=function(){return g},$.isValid=function(){return !("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return "Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])};}),v.extend=function(t,e){return t.$i||(t(e,S,v),t.$i=!0),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});
    }(dayjs_min));

    var dayjs = dayjs_min.exports;

    var format = {
        week: 'YYYY-MM-DD',
        date: 'YYYY-MM-DD',
        daterange: 'YYYY-MM-DD',
        datetime: 'YYYY-MM-DD HH:mm:ss',
        datetimerange: 'YYYY-MM-DD HH:mm:ss',
        month: 'YYYY-MM',
        monthrange: 'YYYY-MM',
        year: 'YYYY',
        yearrange: 'YYYY',
        multiple: 'YYYY-MM-DD',
        weeknum: 'YYYY第w周',
        weeknumrange: 'YYYY第w周',
    };
    var shortList = {
        multiple: [],
        week: [
            { name: '最近一周', value: { startTime: dayjs().startOf('week'), endTime: dayjs().endOf('week') } },
            {
                name: '本月第一周',
                value: {
                    startTime: dayjs()
                        .startOf('month')
                        .startOf('week'),
                    endTime: dayjs()
                        .startOf('month')
                        .endOf('week'),
                },
            },
            {
                name: '本年第一周',
                value: {
                    startTime: dayjs()
                        .startOf('year')
                        .startOf('week'),
                    endTime: dayjs()
                        .startOf('year')
                        .endOf('week'),
                },
            },
        ],
        date: [
            { name: '今天', value: { startTime: dayjs().startOf('day') } },
            {
                name: '昨天',
                value: {
                    startTime: dayjs()
                        .subtract(1, 'days')
                        .startOf('day'),
                },
            },
            {
                name: '本周第一天',
                value: {
                    startTime: dayjs()
                        .startOf('week')
                        .startOf('day'),
                },
            },
            {
                name: '本月第一天',
                value: {
                    startTime: dayjs()
                        .startOf('month')
                        .startOf('day'),
                },
            },
            {
                name: '本年第一天',
                value: {
                    startTime: dayjs()
                        .startOf('year')
                        .startOf('day'),
                },
            },
        ],
        datetime: [
            { name: '现在', value: { startTime: dayjs() } },
            { name: '今天', value: { startTime: dayjs().startOf('day') } },
            {
                name: '昨天',
                value: {
                    startTime: dayjs()
                        .subtract(1, 'days')
                        .startOf('day'),
                },
            },
            {
                name: '本周第一天',
                value: {
                    startTime: dayjs()
                        .startOf('week')
                        .startOf('day'),
                },
            },
            {
                name: '本月第一天',
                value: {
                    startTime: dayjs()
                        .startOf('month')
                        .startOf('day'),
                },
            },
            {
                name: '本年第一天',
                value: {
                    startTime: dayjs()
                        .startOf('year')
                        .startOf('day'),
                },
            },
        ],
        daterange: [
            { name: '最近一天', value: { startTime: dayjs().subtract(1, 'days'), endTime: dayjs() } },
            {
                name: '最近三天',
                value: {
                    startTime: dayjs()
                        .subtract(3, 'days')
                        .startOf('day'),
                    endTime: dayjs(),
                },
            },
            {
                name: '最近一周',
                value: {
                    startTime: dayjs()
                        .subtract(7, 'days')
                        .startOf('day'),
                    endTime: dayjs(),
                },
            },
            {
                name: '最近一月',
                value: {
                    startTime: dayjs()
                        .subtract(1, 'months')
                        .startOf('day'),
                    endTime: dayjs(),
                },
            },
            {
                name: '最近一年',
                value: {
                    startTime: dayjs()
                        .subtract(1, 'years')
                        .startOf('day'),
                    endTime: dayjs(),
                },
            },
            {
                name: '本月',
                value: {
                    startTime: dayjs()
                        .startOf('month')
                        .startOf('day'),
                    endTime: dayjs(),
                },
            },
            {
                name: '本年',
                value: {
                    startTime: dayjs()
                        .startOf('year')
                        .startOf('day'),
                    endTime: dayjs(),
                },
            },
        ],
        datetimerange: [
            { name: '今天', value: { startTime: dayjs().startOf('day'), endTime: dayjs() } },
            { name: '最近一天', value: { startTime: dayjs().subtract(1, 'days'), endTime: dayjs() } },
            { name: '最近三天', value: { startTime: dayjs().subtract(3, 'days'), endTime: dayjs() } },
            { name: '最近一周', value: { startTime: dayjs().subtract(7, 'days'), endTime: dayjs() } },
            { name: '最近一月', value: { startTime: dayjs().subtract(1, 'months'), endTime: dayjs() } },
            { name: '最近一年', value: { startTime: dayjs().subtract(1, 'years'), endTime: dayjs() } },
            { name: '本月', value: { startTime: dayjs().startOf('month'), endTime: dayjs() } },
            { name: '本年', value: { startTime: dayjs().startOf('year'), endTime: dayjs() } },
        ],
        month: [
            { name: '本月', value: { startTime: dayjs().startOf('month'), endTime: dayjs() } },
            {
                name: '上月',
                value: {
                    startTime: dayjs()
                        .subtract(1, 'month')
                        .startOf('month'),
                    endTime: dayjs(),
                },
            },
            {
                name: '本年一月',
                value: {
                    startTime: dayjs()
                        .startOf('year')
                        .startOf('month'),
                    endTime: dayjs(),
                },
            },
        ],
        monthrange: [
            {
                name: '最近一月',
                value: {
                    startTime: dayjs()
                        .subtract(1, 'months')
                        .startOf('month'),
                    endTime: dayjs(),
                },
            },
            {
                name: '最近两月',
                value: {
                    startTime: dayjs()
                        .subtract(2, 'months')
                        .startOf('month'),
                    endTime: dayjs(),
                },
            },
            {
                name: '最近三月',
                value: {
                    startTime: dayjs()
                        .subtract(3, 'months')
                        .startOf('month'),
                    endTime: dayjs(),
                },
            },
            {
                name: '最近一年',
                value: {
                    startTime: dayjs()
                        .subtract(1, 'years')
                        .startOf('month'),
                    endTime: dayjs(),
                },
            },
            {
                name: '本年',
                value: {
                    startTime: dayjs()
                        .startOf('year')
                        .startOf('month'),
                    endTime: dayjs(),
                },
            },
        ],
        year: [
            { name: '本年', value: { startTime: dayjs().startOf('year') } },
            {
                name: '去年',
                value: {
                    startTime: dayjs()
                        .subtract(1, 'years')
                        .startOf('year'),
                },
            },
            {
                name: '三年前',
                value: {
                    startTime: dayjs()
                        .subtract(3, 'years')
                        .startOf('year'),
                },
            },
            {
                name: '五年前',
                value: {
                    startTime: dayjs()
                        .subtract(5, 'years')
                        .startOf('year'),
                },
            },
        ],
        yearrange: [
            { name: '最近一年', value: { startTime: dayjs().startOf('year'), endTime: dayjs() } },
            {
                name: '最近两年',
                value: {
                    startTime: dayjs()
                        .subtract(2, 'years')
                        .startOf('year'),
                    endTime: dayjs(),
                },
            },
            {
                name: '最近三年',
                value: {
                    startTime: dayjs()
                        .subtract(3, 'years')
                        .startOf('year'),
                    endTime: dayjs(),
                },
            },
            {
                name: '最近五年',
                value: {
                    startTime: dayjs()
                        .subtract(5, 'years')
                        .startOf('year'),
                    endTime: dayjs(),
                },
            },
            {
                name: '最近十年',
                value: {
                    startTime: dayjs()
                        .subtract(10, 'years')
                        .startOf('year'),
                    endTime: dayjs(),
                },
            },
        ],
        weeknum: [
            { name: '本周', value: { startTime: dayjs().startOf('week') } },
            {
                name: '上周',
                value: {
                    startTime: dayjs()
                        .subtract(1, 'weeks')
                        .startOf('week'),
                },
            },
            { name: '本月第一周', value: { startTime: dayjs().startOf('month') } },
            { name: '本年第一周', value: { startTime: dayjs().startOf('year') } },
        ],
        weeknumrange: [
            { name: '当前周', value: { startTime: dayjs().startOf('week'), endTime: dayjs().startOf('week') } },
            {
                name: '最近两周',
                value: {
                    startTime: dayjs()
                        .subtract(2, 'weeks')
                        .startOf('week'),
                    endTime: dayjs().startOf('week'),
                },
            },
            {
                name: '最近三周',
                value: {
                    startTime: dayjs()
                        .subtract(3, 'weeks')
                        .startOf('week'),
                    endTime: dayjs().startOf('week'),
                },
            },
            {
                name: '最近五周',
                value: {
                    startTime: dayjs()
                        .subtract(5, 'weeks')
                        .startOf('week'),
                    endTime: dayjs().startOf('week'),
                },
            },
            {
                name: '最近十周',
                value: {
                    startTime: dayjs()
                        .subtract(10, 'weeks')
                        .startOf('week'),
                    endTime: dayjs().startOf('week'),
                },
            },
        ],
    };
    var option = {
        showWeek: true,
        placeholder: { startTime: '开始时间', endTime: '结束时间' },
        shortList: [],
        locale: {
            month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            monthHead: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            week: ['日', '一', '二', '三', '四', '五', '六'],
            clear: '清空',
            confirm: '确定',
            yearHeadSuffix: function (year) {
                return year + '年';
            },
            weekNum: function (weeknum) {
                return '第' + weeknum + '周';
            },
        },
        confirmFirst: true,
        separator: ' 到 ',
        showType: 'modal',
        linkPanels: false,
        showClear: true,
        autoConfirm: true,
        showShortKeys: true,
        autoFillDate: true,
        firstDayOfWeek: 7,
        theme: 'default',
        multipleDates: [],
        startTime: '',
        endTime: '',
        minDate: '',
        maxDate: '',
        showBottomButton: true,
        disableDate: function (date, dayjs) {
            return false; //date为当前日期,如果当前日期为不可选日期，返回true
        }, //不可选择日期
    };

    var TimePicker = /** @class */ (function () {
        function TimePicker(targetDom, options) {
            this.$targetDom = XNQuery(targetDom.get(0));
            this.option = XNQuery.extend({}, option, options);
            this.id = this.getRandomString();
            this.show = false;
            this.eventList = {};
            this.init();
            this.addPosEvent();
            this.addTargetEvent();
        }
        TimePicker.prototype.init = function () {
            this.rendtime();
            this.setPosition();
            this.addEvent();
            this.initCallback();
            this.initCurTime();
        };
        TimePicker.prototype.updateCurrentTime = function (time) {
            var hour = dayjs(time).format('HH');
            var minute = dayjs(time).format('mm');
            var second = dayjs(time).format('ss');
            var time1 = hour + ':' + minute + ':' + second;
            this.trigger('confirm', { str: time1, value: { hour: hour, minute: minute, second: second } });
        };
        TimePicker.prototype.initCurTime = function () {
            this.updateCurrentTime(this.option.time);
        };
        TimePicker.prototype.initCallback = function () {
            this.on('confirm', this.option.onConfirm);
        };
        TimePicker.prototype.addTargetEvent = function () {
            var _this = this;
            document.addEventListener('click', function (e) {
                if (e.target == _this.$targetDom.get(0) ||
                    (_this.$targetDom.find(e.target).get(0) &&
                        !XNQuery(e.target)
                            .parents('.xntimepicker')
                            .get(0))) {
                    _this.changeShowStatus();
                }
                else if (!XNQuery(e.target)
                    .parents('.xntimepicker')
                    .get(0) ||
                    XNQuery(e.target)
                        .parents('.xntimepicker')
                        .get(0).id != _this.id) {
                    _this.changeShowStatus(true);
                }
            }, true); //捕获阶段
        };
        TimePicker.prototype.changeShowStatus = function (hide) {
            if (this.show || hide) {
                this.show = true;
                this.$container.hide();
            }
            else {
                this.$container.show();
                this.setPosition();
            }
            this.show = !this.show;
        };
        TimePicker.prototype.addPosEvent = function () {
            var that = this;
            window.addEventListener('scroll', function () {
                that.setPosition();
            });
            window.addEventListener('resize', function () {
                that.setPosition();
            });
        };
        TimePicker.prototype.setPosition = function () {
            if (!this.$container.get(0)) {
                return;
            }
            document.documentElement.clientWidth;
            // const wheight=document.documentElement.clientHeight;
            var curcolordom = this.$targetDom.get(0);
            curcolordom.getBoundingClientRect().top;
            curcolordom.getBoundingClientRect().left;
            this.$targetDom.outerWidth();
            this.$targetDom.outerHeight();
            this.$container.outerWidth();
            // this.$container.get(0).style.top = top + 'px';
            // this.$container.get(0).style.left = left + 'px';
        };
        TimePicker.prototype.rendtime = function () {
            if (!this.option.format) {
                this.option.format = 'HH:mm:ss';
            }
            var html = "\n          <div class=\"xntimepicker\" id=\"".concat(this.id, "\">");
            var hours = '<ul class="hours">', minutes = '<ul class="minutes">', seconds = '<ul class="seconds">';
            // const hourlist = [], minutelist = [], secondlist = [];
            for (var i = 0; i < 60; i++) {
                var n = i < 10 ? '0' + i : i;
                if (i < 24) {
                    hours += '<li data-i="' + n + '">' + n + '时</li>';
                }
                minutes += '<li data-i="' + n + '">' + n + '分</li>';
                seconds += '<li data-i="' + n + '">' + n + '秒</li>';
            }
            var option = "\n        <div><div class=\"time-cont\">";
            option += hours + '</ul>';
            if (this.option.format.indexOf('mm') > -1) {
                option += minutes + '</ul>';
            }
            if (this.option.format.indexOf('ss') > -1) {
                option += seconds + '</ul>';
            }
            option += "</div><div class=\"time-btns\"><span class=\"cur-time\">\u5F53\u524D\u65F6\u95F4</span><a class=\"confirm-time\">\u786E\u5B9A</a></div></div>";
            html +=
                " <div class=\"time-picker\">" +
                    option +
                    "</div>\n         </div>\n      ";
            this.$targetDom.append(html);
            this.$container = XNQuery('#' + this.id);
            this.changeShowStatus(true);
        };
        TimePicker.prototype.addEvent = function () {
            var _this = this;
            this.$targetDom.get(0).addEventListener('click', function (e) {
                var $t = XNQuery(e.target);
                _this.selectTime($t.parents('.timecont').eq(0), $t);
            });
            this.$container.get(0).addEventListener('click', function (e) {
                var $t = XNQuery(e.target);
                // if ($t.parents(".timecont")[0]) {
                //     this.selectTime($t.parents(".timecont").eq(0), $t);
                // }
                if ($t.hasClass('confirm-time')) {
                    _this.confirm();
                }
                if ($t.hasClass('cur-time')) {
                    var hour = dayjs().format('HH');
                    var minute = dayjs().format('mm');
                    var second = dayjs().format('ss');
                    var time = hour + ':' + minute + ':' + second;
                    _this.trigger('confirm', { str: time, value: { hour: hour, minute: minute, second: second } });
                    _this.changeShowStatus(true);
                }
            });
        };
        TimePicker.prototype.selectTime = function ($ele, $target) {
            // const that = this;
            if ($target.parent().hasClass('timecont')) {
                // $ele.children("div").toggle();
                if ($ele.children('div').get(0).style.display == 'none') {
                    return;
                }
                var curTime = $ele
                    .children('span')
                    .get(0)
                    .innerHTML.split(':');
                var hour = curTime[0];
                var minute = curTime[1];
                var second = curTime[2];
                $ele.find('.on').removeClass('on');
                $ele.find(".hours li[data-i='" + hour + "']").addClass('on');
                $ele.find(".minutes li[data-i='" + minute + "']").addClass('on');
                $ele.find(".seconds li[data-i='" + second + "']").addClass('on');
                $ele.find('.on').each(function (ele, i) {
                    var top = XNQuery(ele).position().top - 20;
                    XNQuery(ele)
                        .parent()
                        .get(0)
                        .scrollBy(0, top);
                });
                return;
            }
            if ($target.get(0).nodeName == 'LI') {
                $target
                    .parent()
                    .find('li')
                    .removeClass('on');
                $target.addClass('on');
                return;
            }
        };
        TimePicker.prototype.confirm = function () {
            var hour = this.$container.find('.hours .on').attr('data-i') || '00';
            var minute = this.$container.find('.minutes .on').attr('data-i') || '00';
            var second = this.$container.find('.seconds .on').attr('data-i') || '00';
            var time = dayjs('1900-08-08 ' + hour + ':' + minute + ':' + second).format(this.format || 'HH:mm:ss');
            this.trigger('confirm', { str: time, value: { hour: hour, minute: minute, second: second } });
            this.changeShowStatus(true);
        };
        TimePicker.prototype.trigger = function (type, data) {
            if (this.eventList[type]) {
                for (var i = 0; i < this.eventList[type].func.length; i++) {
                    this.eventList[type].func[i](data);
                }
            }
        };
        TimePicker.prototype.on = function (type, func) {
            if (!this.eventList[type]) {
                this.eventList[type] = {
                    func: [func],
                };
            }
            else {
                this.eventList[type].func.push(func);
            }
        };
        TimePicker.prototype.getRandomString = function (len) {
            if (len === void 0) { len = 8; }
            len = len || 8;
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
            /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            var maxPos = $chars.length;
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        };
        return TimePicker;
    }());

    var isSameOrBefore$1 = {exports: {}};

    (function (module, exports) {
    !function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e,t){t.prototype.isSameOrBefore=function(e,t){return this.isSame(e,t)||this.isBefore(e,t)};}});
    }(isSameOrBefore$1));

    var isSameOrBefore = isSameOrBefore$1.exports;

    var isSameOrAfter$1 = {exports: {}};

    (function (module, exports) {
    !function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e,t){t.prototype.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)};}});
    }(isSameOrAfter$1));

    var isSameOrAfter = isSameOrAfter$1.exports;

    var isoWeeksInYear$1 = {exports: {}};

    (function (module, exports) {
    !function(e,n){module.exports=n();}(commonjsGlobal,function(){return function(e,n){n.prototype.isoWeeksInYear=function(){var e=this.isLeapYear(),n=this.endOf("y").day();return 4===n||e&&5===n?53:52};}});
    }(isoWeeksInYear$1));

    var isoWeeksInYear = isoWeeksInYear$1.exports;

    var weekOfYear = {exports: {}};

    (function (module, exports) {
    !function(e,t){module.exports=t();}(commonjsGlobal,function(){var e="week",t="year";return function(i,n,r){var f=n.prototype;f.week=function(i){if(void 0===i&&(i=null),null!==i)return this.add(7*(i-this.week()),"day");var n=this.$locale().yearStart||1;if(11===this.month()&&this.date()>25){var f=r(this).startOf(t).add(1,t).date(n),s=r(this).endOf(e);if(f.isBefore(s))return 1}var a=r(this).startOf(t).date(n).startOf(e).subtract(1,"millisecond"),d=this.diff(a,e,!0);return d<0?r(this).startOf("week").week():Math.ceil(d)},f.weeks=function(e){return void 0===e&&(e=null),this.week(e)};}});
    }(weekOfYear));

    var WeekOfYear = weekOfYear.exports;

    var isLeapYear$1 = {exports: {}};

    (function (module, exports) {
    !function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e,t){t.prototype.isLeapYear=function(){return this.$y%4==0&&this.$y%100!=0||this.$y%400==0};}});
    }(isLeapYear$1));

    var isLeapYear = isLeapYear$1.exports;

    var advancedFormat$1 = {exports: {}};

    (function (module, exports) {
    !function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e,t,r){var n=t.prototype,a=n.format;r.en.ordinal=function(e){var t=["th","st","nd","rd"],r=e%100;return "["+e+(t[(r-20)%10]||t[r]||t[0])+"]"},n.format=function(e){var t=this,r=this.$locale(),n=this.$utils(),s=(e||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(e){switch(e){case"Q":return Math.ceil((t.$M+1)/3);case"Do":return r.ordinal(t.$D);case"gggg":return t.weekYear();case"GGGG":return t.isoWeekYear();case"wo":return r.ordinal(t.week(),"W");case"w":case"ww":return n.s(t.week(),"w"===e?1:2,"0");case"W":case"WW":return n.s(t.isoWeek(),"W"===e?1:2,"0");case"k":case"kk":return n.s(String(0===t.$H?24:t.$H),"k"===e?1:2,"0");case"X":return Math.floor(t.$d.getTime()/1e3);case"x":return t.$d.getTime();case"z":return "["+t.offsetName()+"]";case"zzz":return "["+t.offsetName("long")+"]";default:return e}});return a.bind(this)(s)};}});
    }(advancedFormat$1));

    var advancedFormat = advancedFormat$1.exports;

    dayjs.extend(isSameOrBefore);
    dayjs.extend(isoWeeksInYear);
    dayjs.extend(isSameOrAfter);
    dayjs.extend(isLeapYear);
    dayjs.extend(WeekOfYear);
    dayjs.extend(advancedFormat);
    var DatePicker = /** @class */ (function () {
        function DatePicker(targetDom, options, onConfirm) {
            // this.$targetDom = $(targetDom);
            this.option = {};
            this.option = XNQuery.extend(true, {}, option, options);
            this.type = this.option.type;
            // @ts-ignore
            this.format = this.type.indexOf('year') > -1 ? 'YYYY' : (this.type.indexOf('month') > -1 ? 'YYYY-MM' : (this.type.indexOf('time') > -1 ? 'YYYY-MM-DD' : 'YYYY-MM-DD'));
            if (typeof this.option.placeholder == 'string') {
                this.placeholder = {
                    startTime: this.option.placeholder,
                    endTime: this.option.placeholder
                };
            }
            if (typeof this.option.placeholder == 'object') {
                this.placeholder = {
                    startTime: this.option.placeholder.startTime,
                    endTime: this.option.placeholder.endTime
                };
            }
            this.initTargetDom(targetDom);
            this.option.startTime && (this.option.startTime = dayjs(this.option.startTime));
            this.option.endTime && (this.option.endTime = dayjs(this.option.endTime));
            this.option.minDate && (this.option.minDate = dayjs(this.option.minDate));
            this.option.maxDate && (this.option.maxDate = dayjs(this.option.maxDate));
            this.disableDate = this.option.disableDate || function (date, dayjs, calcType) {
                return false;
            };
            this.onConfirm = onConfirm;
            this.selectedDate = {}; //已确认的时间
            this.date1 = this.option.startTime ? (this.option.startTime.clone()) : dayjs(); //当前选择的起始时间
            this.date2 = this.option.endTime ? (this.option.endTime.clone()) : dayjs(); //当前选择的起始时间
            this.tempdate1 = ''; //左侧选择器的时间
            this.tempdate2 = ''; //右侧选择器的时间
            this.multipleDates = XNQuery.extend(true, [], this.option.multipleDates || []);
            if (!options.shortList) {
                this.option.shortList = shortList[this.type];
            }
            if (!options.format) {
                this.option.format = format[this.type];
            }
            this.id = this.getRandomString();
            this.show = false;
            this.eventList = {};
            this.init();
            this.addPosEvent();
            this.addTargetEvent();
        }
        DatePicker.prototype.init = function () {
            this.setCurrentTime({ startTime: this.option.startTime, endTime: this.option.endTime });
            this.rendPicker();
            this.initCallback();
            this.confirm(false, true);
        };
        DatePicker.prototype.initTargetDom = function (targetDom) {
            this.$t = XNQuery(targetDom);
            this.targetDom = targetDom;
            this.$t.addClass('xndatepicker-pc-input');
            var num = ['startTime'];
            if ((this.type.indexOf('range') > -1) || this.type == 'week') {
                num.push('endTime');
            }
            for (var i = 0; i < num.length; i++) {
                var classname = num[i];
                var dateinput = document.createElement('div');
                dateinput.classList.add(classname);
                this.$t.append(dateinput);
                if (i == 0 && num.length == 2) {
                    var span = document.createElement('span');
                    span.innerHTML = this.option.separator;
                    this.$t.append(span);
                }
                var innerHtml = "\n            <div class=\"input\" data-type=\"".concat(classname, "\" data-placeholder=\"").concat(this.placeholder[classname], "\"></div>");
                if (this.option.showClear) {
                    innerHtml += "<i class=\"icon-xndatepickershanchu iconfont-xndatepicker clear-btn\"></i><i class=\"icon-xndatepickerrili iconfont-xndatepicker date-icon\"></i>";
                }
                dateinput.innerHTML = innerHtml;
            }
        };
        DatePicker.prototype.resetDate = function (startTime, endTime) {
            var start = startTime ? dayjs(startTime) : null;
            var end = endTime ? dayjs(endTime) : null;
            this.setCurrentTime({ startTime: start, endTime: end });
            this.confirm(false);
        };
        DatePicker.prototype.rendPicker = function () {
            this.setCurrentTime({ startTime: this.selectedDate[0], endTime: this.selectedDate[1] });
            this.rendDatePicker();
            this.setPosition();
            this.addEvent();
            this.initTimePicker();
            this.rendHoverStyle();
            this.setDate();
        };
        DatePicker.prototype.resetCurrentTime = function (startTime, endTime) {
            if (startTime === void 0) { startTime = ''; }
            if (endTime === void 0) { endTime = ''; }
            if (this.type == 'multiple') {
                this.multipleDates = XNQuery.extend(true, [], this.selectedMultiple || []);
            }
            if (!this.selectedDate[0]) {
                this.selectedDate[0] = dayjs();
            }
            if (!this.selectedDate[1] && (this.type == 'week' || this.type.indexOf('range') > -1)) {
                this.selectedDate[1] = dayjs();
            }
            if (startTime) {
                this.selectedDate[0] = dayjs(startTime);
            }
            if (endTime) {
                this.selectedDate[1] = dayjs(endTime);
            }
            this.setCurrentTime({ startTime: this.selectedDate[0], endTime: this.selectedDate[1] });
            this.setCurrentDay();
            this.updateCurrentTime(1);
            this.updateCurrentTime(2);
            this.setPosition();
        };
        DatePicker.prototype.updateCurrentTime = function (num) {
            if (this['timepicker' + num]) {
                var date = dayjs(this.selectedDate[num - 1]).format('YYYY-MM-DD HH:mm:ss');
                this['timepicker' + num].updateCurrentTime(date);
            }
        };
        DatePicker.prototype.initTimePicker = function () {
            var that = this;
            if (this.type == 'datetime' || this.type == 'datetimerange') {
                this.timepicker1 = new TimePicker(this.$container.find('.time1 .timecont'), {
                    time: that.selectedDate[0],
                    onConfirm: function (res) {
                        var currentTime = dayjs(that.selectedDate[0]);
                        currentTime = currentTime.hour(res.value.hour);
                        currentTime = currentTime.minute(res.value.minute);
                        currentTime = currentTime.second(res.value.second);
                        that.date1 = currentTime;
                        that.$container.find('.time1 .timecont>span').html(res.str);
                    }
                });
            }
            if (this.type == 'datetimerange') {
                this.timepicker2 = new TimePicker(this.$container.find('.time2 .timecont'), {
                    time: that.selectedDate[1],
                    onConfirm: function (res) {
                        var currentTime = dayjs(that.selectedDate[1]);
                        currentTime = currentTime.hour(res.value.hour);
                        currentTime = currentTime.minute(res.value.minute);
                        currentTime = currentTime.second(res.value.second);
                        that.date2 = currentTime;
                        that.$container.find('.time2 .timecont>span').html(res.str);
                    }
                });
            }
        };
        DatePicker.prototype.initCallback = function () {
            this.on('confirm', this.onConfirm);
        };
        DatePicker.prototype.addTargetEvent = function () {
            var _this = this;
            // var clickFunc = (e) => {
            //     if (e.target == this.$targetDom.get(0)) {
            //         this.changeShowStatus();
            //     } else if (!$(e.target).parents('.xndatepicker').get(0) || ($(e.target).parents('.xndatepicker').get(0).id != this.id)) {
            //
            //         this.changeShowStatus(true);
            //     }
            // }
            var clickFunc = function (e) {
                if (e.target == _this.targetDom) {
                    _this.changeShowStatus();
                }
                else if (!XNQuery(e.target).parents('.xndatepicker').get(0) || (XNQuery(e.target).parents('.xndatepicker').get(0).id != _this.id)) {
                    _this.changeShowStatus(true);
                }
            };
            this.removeClickEvent = function () {
                document.removeEventListener('click', clickFunc, true); //捕获阶段
            };
            document.addEventListener('click', clickFunc, true); //捕获阶段
            this.targetDom.addEventListener('click', function (e) {
                var $t = XNQuery(e.target);
                if ($t.hasClass('clear-btn')) {
                    var type = 'endTime';
                    if ($t.parent().hasClass('startTime')) {
                        type = 'startTime';
                    }
                    _this.cleardate(type);
                    // this.clear(type);
                }
                else if ($t.hasClass('input')) {
                    _this.changeShowStatus();
                }
            });
        };
        DatePicker.prototype.changeShowStatus = function (hide) {
            var _this = this;
            if (hide === void 0) { hide = false; }
            if (this.show || hide) {
                if (this.$container) {
                    this.$container.removeClass("xndatepicker-animate");
                    this.$container.addClass("xndatepicker-animate-out");
                    setTimeout(function () {
                        if (_this.$container) {
                            _this.$container.remove();
                            _this.$container = null;
                        }
                    }, 300);
                    // this.$container.fadeOut(100, () => {
                    //     if (this.$container) {
                    //         this.$container.remove();
                    //         this.$container = null
                    //     }
                    // });
                }
                this.show = false;
            }
            else {
                if (!this.$container) {
                    this.rendPicker();
                }
                this.$container.css({ display: 'block' });
                // this.$container.css({display: 'block', opacity: '0'})
                this.resetCurrentTime();
                this.$container.addClass("xndatepicker-animate");
                // this.$container.fadeIn(200);
                this.show = true;
            }
            // this.show = !this.show;
        };
        DatePicker.prototype.addPosEvent = function () {
            var that = this;
            window.addEventListener("scroll", function () {
                that.setPosition();
            });
            window.addEventListener("resize", function () {
                that.setPosition();
            });
        };
        DatePicker.prototype.setPosition = function () {
            if (!this.$container || !this.$container.get(0)) {
                return;
            }
            var wwidth = document.documentElement.clientWidth;
            var wheight = document.documentElement.clientHeight;
            var curcolordom = this.targetDom;
            var targetTop = curcolordom.getBoundingClientRect().top;
            var top = targetTop;
            var targetLeft = curcolordom.getBoundingClientRect().left;
            var left = targetLeft;
            var targetWidth = this.targetDom.offsetWidth;
            var targetHeight = this.targetDom.offsetHeight;
            var domwidth = this.$container.outerWidth();
            var domheight = this.$container.outerHeight();
            top = top + targetHeight + 10;
            var trangletop = -6;
            var trangleleft = 20;
            var borderWidth = "1px 0 0 1px";
            this.$container.css("transform-origin", "top");
            if (top + domheight > wheight) {
                top = targetTop - domheight - 10;
                trangletop = domheight - 7;
                borderWidth = "0 1px 1px 0";
                this.$container.css("transform-origin", "bottom");
            }
            if (top < 0) {
                top = 0;
            }
            if (left + domwidth > wwidth) {
                left = targetLeft + targetWidth - domwidth;
                trangleleft = domwidth - 60;
            }
            if (left < 0) {
                left = 0;
            }
            this.$container.get(0).style.top = top + "px";
            this.$container.get(0).style.left = left + "px";
            this.$container.find('.xntriangle').get(0).style.left = trangleleft + "px";
            this.$container.find('.xntriangle').get(0).style.top = trangletop + "px";
            this.$container.find('.xntriangle').get(0).style.borderWidth = borderWidth;
        };
        DatePicker.prototype.rendHoverStyle = function ($t) {
            if ($t === void 0) { $t = null; }
            //判断$t是干啥来着？
            if ($t && $t.get(0) && ((this.type.indexOf('year') < 0 && $t.hasClass('year-item')) || (this.type.indexOf('date') >= 0 && !$t.hasClass('day-item')))) {
                return;
            }
            var format = 'YYYY-MM';
            // let curFormat = 'YYYY-MM-DD';
            var date1, date2;
            if (this.type.indexOf('month') > -1) {
                format = 'YYYY-MM';
            }
            if (this.type.indexOf('month') > -1) {
                format = 'YYYY';
            }
            if (this.type.indexOf('month') > -1 || this.type.indexOf('year') > -1 || this.type.indexOf('week') > -1) {
                format = 'YYYY';
            }
            if (this.type == 'week') {
                if ($t) {
                    var date = $t.attr('data-date');
                    date1 = dayjs(date).subtract((parseInt(this.option.firstDayOfWeek)) % 7, 'days').startOf('week').add((parseInt(this.option.firstDayOfWeek)) % 7, 'days').format('YYYY-MM-DD');
                    date2 = dayjs(date).subtract((parseInt(this.option.firstDayOfWeek)) % 7, 'days').endOf('week').add((parseInt(this.option.firstDayOfWeek)) % 7, 'days').format('YYYY-MM-DD');
                    if (this.option.minDate && dayjs(date2).isBefore(this.option.minDate)) {
                        return;
                    }
                    if (this.option.maxDate && dayjs(date1).isAfter(this.option.maxDate)) {
                        return;
                    }
                    if (this.option.minDate && dayjs(date1).isBefore(this.option.minDate)) {
                        date1 = dayjs(this.option.minDate).format('YYYY-MM-DD');
                    }
                    if (this.option.maxDate && dayjs(date2).isAfter(this.option.maxDate)) {
                        date2 = dayjs(this.option.maxDate).format('YYYY-MM-DD');
                    }
                    this.$container.find(".hover").removeClass("hover");
                    this.$container.find("[data-date='" + date1 + "']").addClass('hover');
                    this.$container.find("[data-date='" + date2 + "']").addClass('hover');
                    this.$container.find("[data-date='" + date1 + "']").nextUntil(this.$container.find("[data-date='" + date2 + "']").get(0)).addClass('hover');
                }
                else {
                    this.$container.find(".hover").removeClass("hover");
                }
                this.$container.find(".cur-date").eq(0).nextUntil(this.$container.find(".cur-date").get(1)).addClass('hover');
                this.$container.find(".cur-date").eq(1).addClass('right-date');
                return;
            }
            if ($t && !$t.hasClass('active-day')) {
                return;
            }
            if (this.type.indexOf('range') < 0) {
                this.$container.find(".cur-date").addClass('circle-date');
                return;
            }
            var inSame = undefined;
            this.$container.find(".hover").removeClass("hover");
            if ($t && !this.$container.find(".cur-date").get(1) && (!this.date2)) {
                date1 = this.$container.find(".cur-date").eq(0).attr('data-date');
                date2 = $t.attr('data-date');
                XNQuery('.circle-date').removeClass('circle-date');
                XNQuery('.right-date').removeClass('right-date');
                var isBefore = dayjs(date1).isBefore(date2);
                if (this.type.indexOf('year') > -1) {
                    inSame = (date1 - date1 % 12) == (date2 - date2 % 12);
                }
                else {
                    inSame = dayjs(date1).format(format) == dayjs(date2).format(format);
                }
                if (date1 != date2) {
                    if (inSame) {
                        if (isBefore) {
                            this.$container.find(".cur-date").eq(0).nextUntil($t.get(0)).addClass("hover");
                        }
                        else {
                            this.$container.find(".cur-date").eq(0).addClass('right-date');
                            $t.nextUntil(this.$container.find(".cur-date").get(0)).addClass("hover");
                        }
                    }
                    else {
                        if (isBefore) {
                            this.$container.find(".cur-date").eq(0).nextAll('span').addClass("hover");
                            $t.prevAll('span').addClass("hover");
                        }
                        else {
                            this.$container.find(".cur-date").eq(0).addClass('right-date');
                            this.$container.find(".cur-date").eq(0).prevAll('span').addClass("hover");
                            $t.nextAll('span').addClass("hover");
                        }
                    }
                }
            }
            else {
                date1 = this.$container.find(".cur-date").eq(0).attr('data-date');
                date2 = this.$container.find(".cur-date").eq(1).attr('data-date');
                if (this.$container.find(".cur-date").eq(0).hasClass('circle-date')) {
                    date2 = date1;
                }
                XNQuery('.circle-date').removeClass('circle-date');
                XNQuery('.right-date').removeClass('right-date');
                var isBefore = dayjs(date1, 'YYYY-MM-DD').isBefore(dayjs(date2, 'YYYY-MM-DD'));
                if (this.type.indexOf('year') > -1) {
                    inSame = (date1 - date1 % 12) == (date2 - date2 % 12);
                }
                else {
                    inSame = dayjs(date1).format(format) == dayjs(date2).format(format);
                }
                if (date1 != date2) {
                    if (inSame) {
                        if (isBefore) {
                            this.$container.find(".cur-date").eq(0).nextUntil(this.$container.find(".cur-date").get(1)).addClass("hover");
                        }
                        else {
                            this.$container.find(".cur-date").eq(1).nextUntil(this.$container.find(".cur-date").get(0)).addClass("hover");
                        }
                    }
                    else {
                        this.$container.find(".cur-date").eq(0).nextAll('span').addClass("hover");
                        this.$container.find(".cur-date").eq(1).prevAll('span').addClass("hover");
                    }
                }
            }
            if (date1 == date2) {
                this.$container.find(".cur-date").eq(0).addClass('circle-date');
            }
            else {
                this.$container.find(".cur-date").eq(1).addClass('right-date');
            }
        };
        DatePicker.prototype.setDate = function () {
            var _this = this;
            var date = {};
            this.$container.find(".cur-date").each(function (ele, i) {
                // @ts-ignore
                XNQuery(ele).parents(".date-item").attr("data-id");
                var day = dayjs(XNQuery(ele).attr('data-date'), 'YYYY-MM-DD').format('YYYY-MM-DD');
                var time = '';
                if (_this.type.indexOf('time')) {
                    time = ' ' + _this.$container.find(".time" + (i + 1) + " .timecont>span").html();
                }
                date[i] = dayjs(day + time, 'YYYY-MM-DD HH:mm:ss');
                _this.$container.find(".time" + (i + 1) + ">input").val(day);
                if (_this.$container.find(".circle-date").get(0) == ele) {
                    var j = 1;
                    date[j] = dayjs(day + time, 'YYYY-MM-DD HH:mm:ss');
                    _this.$container.find(".time" + (j + 1) + ">input").val(day);
                }
            });
            this.date1 = date[0];
            this.date2 = date[1];
        };
        DatePicker.prototype.rendOtherDateList = function (otherdatenum) {
            if (this.type.indexOf('range') < 0) {
                return;
            }
            var datenum = otherdatenum == 1 ? 2 : 1;
            if (otherdatenum < datenum) {
                if (this.type.indexOf('date') > -1 || this.type == 'week') {
                    // @ts-ignore
                    if ((dayjs(this['tempdate' + otherdatenum].format('YYYY-MM')).isSameOrAfter(this['tempdate' + datenum].format('YYYY-MM'))) || this.option.linkPanels) {
                        this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().add(1, 'months');
                        this.geneDateList(this["tempdate" + datenum], this.$container.find(".dater" + datenum));
                    }
                }
                if ((this.type.indexOf('month') > -1)) {
                    if ((this['tempdate' + otherdatenum].isSameOrAfter(this['tempdate' + datenum], 'year')) || this.option.linkPanels) {
                        this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().add(1, 'years');
                    }
                    this.rendMonth(datenum);
                }
                if ((this.type.indexOf('weeknum') > -1)) {
                    if ((this['tempdate' + otherdatenum].isSameOrAfter(this['tempdate' + datenum], 'year')) || this.option.linkPanels) {
                        this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().add(1, 'years');
                    }
                    this.rendWeekNum(datenum);
                }
                if ((this.type.indexOf('year') > -1)) {
                    var year1 = this['tempdate' + otherdatenum].format('YYYY');
                    var year2 = this['tempdate' + datenum].format('YYYY');
                    var year1P = year1 - year1 % 12;
                    var year2P = year2 - year2 % 12;
                    if ((year1P >= year2P) || this.option.linkPanels) {
                        this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().add(12, 'years');
                    }
                    this.rendYears(datenum);
                }
            }
            else {
                if ((this.type.indexOf('date') > -1 || this.type == 'week')) {
                    // @ts-ignore
                    if ((dayjs(this['tempdate' + otherdatenum].format('YYYY-MM')).isSameOrBefore(this['tempdate' + datenum].format('YYYY-MM'))) || this.option.linkPanels) {
                        this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().subtract(1, 'months');
                        this.geneDateList(this["tempdate" + datenum], this.$container.find(".dater" + datenum));
                    }
                }
                if ((this.type.indexOf('month') > -1)) {
                    if ((this['tempdate' + otherdatenum].isSameOrBefore(this['tempdate' + datenum], 'year')) || this.option.linkPanels) {
                        this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().subtract(1, 'years');
                    }
                    this.rendMonth(datenum);
                }
                if ((this.type.indexOf('weeknum') > -1)) {
                    if ((this['tempdate' + otherdatenum].isSameOrBefore(this['tempdate' + datenum], 'year')) || this.option.linkPanels) {
                        this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().subtract(1, 'years');
                        this.rendWeekNum(datenum);
                    }
                }
                if ((this.type.indexOf('year') > -1)) {
                    // eslint-disable-next-line no-var
                    var year1 = this['tempdate' + otherdatenum].format('YYYY');
                    var year2 = this['tempdate' + datenum].format('YYYY');
                    var year1P = year1 - year1 % 12;
                    var year2P = year2 - year2 % 12;
                    if ((year1P <= year2P) || this.option.linkPanels) {
                        this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().subtract(12, 'years');
                    }
                    this.rendYears(datenum);
                }
            }
            // console.log(this["tempdate" + otherdatenum].format('YYYY-MM-DD'))
        };
        DatePicker.prototype.addEvent = function () {
            var _this = this;
            var mouseMoveFunc = function (e) {
                var $t = XNQuery(e.target);
                if (!_this.$container) {
                    return;
                }
                if ($t.parents('.xndatepicker').get(0) == _this.$container.get(0)) {
                    if ($t.hasClass("day-item") || $t.hasClass("month-item") || $t.hasClass("year-item") || $t.hasClass("week-item")) {
                        _this.rendHoverStyle($t);
                    }
                }
            };
            this.removeMoveEvent = function () {
                document.removeEventListener('mousemove', mouseMoveFunc); //捕获阶段
            };
            //
            document.addEventListener("mousemove", mouseMoveFunc);
            this.$container.get(0).addEventListener("click", function (e) {
                var $t = XNQuery(e.target);
                var datenum = $t.parents(".dater1").get(0) ? 1 : 2;
                if ($t.hasClass("skip-date")) {
                    var func = $t.attr('data-func');
                    var unit = $t.attr('data-unit');
                    var newdate = dayjs(_this["tempdate" + datenum]).clone();
                    newdate = newdate[func](1, unit + 's').startOf(unit);
                    if (_this.checkDisable(newdate, unit, _this.type, unit)) {
                        return;
                    }
                    _this["tempdate" + datenum] = _this["tempdate" + datenum][func](1, unit + 's');
                    if (unit == 'year') {
                        if (_this.option.minDate && _this["tempdate" + datenum].isBefore(_this.option.minDate)) {
                            _this["tempdate" + datenum] = dayjs(_this.option.minDate);
                        }
                        if (_this.option.maxDate && _this["tempdate" + datenum].isAfter(_this.option.maxDate)) {
                            _this["tempdate" + datenum] = dayjs(_this.option.maxDate);
                        }
                    }
                    _this.geneDateList(_this["tempdate" + datenum], _this.$container.find(".dater" + datenum));
                    _this.rendOtherDateList(datenum);
                }
                if ($t.hasClass("month-prev-year")) {
                    _this.rendMonth(datenum);
                }
                if ($t.hasClass("month-next-year")) {
                    _this.rendMonth(datenum);
                }
                if ($t.hasClass("week-prev-year")) {
                    _this.rendWeekNum(datenum);
                }
                if ($t.hasClass("week-next-year")) {
                    _this.rendWeekNum(datenum);
                }
                if ($t.hasClass("year-next-year")) {
                    var newdate_1 = XNQuery.extend(true, {}, dayjs(_this["tempdate" + datenum]));
                    newdate_1 = newdate_1['add'](12, 'years').startOf('year');
                    if (_this.checkDisable(newdate_1, 1, 'year')) {
                        return;
                    }
                    _this["tempdate" + datenum] = _this["tempdate" + datenum].add(12, 'years');
                    _this.rendYears(datenum);
                    _this.rendOtherDateList(datenum);
                }
                if ($t.hasClass("year-prev-year")) {
                    var newdate_2 = XNQuery.extend(true, {}, dayjs(_this["tempdate" + datenum]));
                    newdate_2 = newdate_2.startOf('year');
                    if (_this.checkDisable(newdate_2, -1, 'year')) {
                        return;
                    }
                    _this["tempdate" + datenum] = _this["tempdate" + datenum].subtract(12, 'years');
                    _this.rendYears(datenum);
                    _this.rendOtherDateList(datenum);
                }
                if ((_this.type.indexOf('date') > -1 && $t.hasClass("active-day")) || ($t.hasClass("day-item") && _this.type == 'week')) {
                    _this["date" + datenum] = _this["tempdate" + datenum].date($t.html()).clone();
                    _this.setCurClass($t);
                    _this.setDate();
                    if ((_this.type.indexOf('date') > -1 || _this.type == 'week') && $t.hasClass('day-item')) {
                        _this.autoConfirm($t);
                    }
                }
                if ((_this.type.indexOf('multiple') > -1 && $t.hasClass("day-item") && !$t.hasClass("disable-day"))) {
                    var date = $t.attr('data-date');
                    var key = _this.multipleDates.indexOf(date);
                    if (key > -1) {
                        _this.multipleDates.splice(key, 1);
                        $t.removeClass('cur-date');
                    }
                    else {
                        _this.multipleDates.push(date);
                        $t.addClass('cur-date');
                    }
                }
                if ($t.hasClass("confirm-date")) {
                    _this.confirm();
                }
                if ($t.hasClass("current-date")) {
                    _this.currentdate();
                }
                if ($t.hasClass("clear-date")) {
                    _this.cleardate();
                }
                if ($t.hasClass("year") || $t.hasClass('month-info')) {
                    _this.rendYears(datenum);
                }
                if ($t.hasClass("month")) {
                    _this.rendMonth(datenum);
                }
                if ($t.hasClass("year-item") && !$t.hasClass("disable-year")) {
                    if (_this.type.indexOf('year') > -1) {
                        _this["date" + datenum] = dayjs($t.html());
                        _this.setCurClass($t);
                        _this.setDate();
                        _this.autoConfirm($t);
                    }
                    else if (_this.type.indexOf('weeknum') > -1) {
                        _this["tempdate" + datenum] = _this["tempdate" + datenum].year($t.html());
                        _this.rendWeekNum(datenum);
                        _this.rendOtherDateList(datenum);
                    }
                    else {
                        _this["tempdate" + datenum] = _this["tempdate" + datenum].year($t.html());
                        _this.rendMonth(datenum);
                        _this.rendOtherDateList(datenum);
                    }
                }
                if ($t.hasClass("month-item") && !$t.hasClass("disable-month")) {
                    if (_this.type.indexOf('month') > -1) {
                        _this["date" + datenum] = dayjs($t.attr('data-date'));
                        _this.setCurClass($t);
                        _this.setDate();
                        _this.autoConfirm($t);
                    }
                    else {
                        _this["tempdate" + datenum] = dayjs($t.attr('data-date'));
                        // this['date'+datenum]=null;
                        _this.geneDateList(_this["tempdate" + datenum], _this.$container.find(".dater" + datenum));
                        _this.rendOtherDateList(datenum);
                    }
                }
                if ($t.hasClass("week-item") && !$t.hasClass("disable-week")) {
                    _this["date" + datenum] = dayjs($t.attr("data-date"));
                    if (_this.type.indexOf('weeknum') > -1) {
                        _this.setCurClass($t);
                        _this.setDate();
                        _this.autoConfirm($t);
                    }
                }
                if ($t.get(0).nodeName == 'LI' && $t.parents('.shortcut').get(0)) {
                    var index = $t.parent().find("LI").index($t.get(0));
                    if (_this.type == 'multiple') {
                        var startTime = Array.isArray(_this.option.shortList[index].value.startTime) ? _this.option.shortList[index].value.startTime : [_this.option.shortList[index].value.startTime];
                        _this.multipleDates = startTime;
                    }
                    else {
                        _this.setCurrentTime(_this.option.shortList[index].value);
                    }
                    _this.setCurrentDay();
                    _this.updateCurrentTime(1);
                    _this.updateCurrentTime(2);
                    _this.autoConfirm();
                }
                _this.rendHoverStyle();
                // this.rendOtherDateList(datenum);
            });
        };
        DatePicker.prototype.autoConfirm = function (el) {
            if (!this.option.autoConfirm) {
                return;
            }
            if ((this.type.indexOf('range') < 0 && this.type.indexOf('time') < 0) || this.type == 'week') {
                this.confirm();
            }
            else if (this.type.indexOf('range') > -1 && this.date2 && this.date1 && this.type.indexOf('time') < 0) {
                this.confirm();
            }
        };
        DatePicker.prototype.setCurClass = function ($t) {
            if (this.type == 'week') {
                var date = $t.attr('data-date');
                var date1 = dayjs(date).clone().subtract((parseInt(this.option.firstDayOfWeek)) % 7, 'days').startOf('week').add((parseInt(this.option.firstDayOfWeek)) % 7, 'days').format('YYYY-MM-DD');
                // var date1 = dayjs(date).clone().startOf('week').format('YYYY-MM-DD')
                var date2 = dayjs(date).clone().subtract((parseInt(this.option.firstDayOfWeek)) % 7, 'days').endOf('week').add((parseInt(this.option.firstDayOfWeek)) % 7, 'days').format('YYYY-MM-DD');
                if ((this.option.minDate && dayjs(date1).isBefore(this.option.minDate))) {
                    date1 = dayjs(this.option.minDate).format('YYYY-MM-DD');
                }
                if ((this.option.maxDate && dayjs(date2).isAfter(this.option.maxDate))) {
                    date2 = dayjs(this.option.maxDate).format('YYYY-MM-DD');
                }
                XNQuery(".cur-date").removeClass('cur-date');
                this.date1 = dayjs(date1);
                this.date2 = dayjs(date2);
                this.$container.find('[data-date="' + this.date1.format('YYYY-MM-DD') + '"]').addClass('cur-date');
                this.$container.find('[data-date="' + this.date2.format('YYYY-MM-DD') + '"]').addClass('cur-date');
            }
            else {
                if (this.type.indexOf('range') > -1) {
                    if (this.$container.find(".cur-date").length() > 1 || this.$container.find(".circle-date").get(0)) {
                        this.$container.find(".cur-date").removeClass('cur-date');
                    }
                    else {
                        if (this.$container.find(".cur-date").eq(0).attr('data-date') == $t.attr('data-date')) {
                            $t.addClass("circle-date");
                        }
                    }
                }
                else {
                    XNQuery(".cur-date").removeClass('cur-date');
                }
                $t.addClass("cur-date");
            }
        };
        DatePicker.prototype.correctDate = function (date1) {
            //修正当前时间与最大最小值
            if (date1.startTime && (this.option.maxDate && dayjs(date1.startTime).isAfter(this.option.maxDate))) {
                date1.startTime = dayjs(this.option.maxDate).clone();
            }
            if (date1.endTime && (this.option.minDate && dayjs(date1.endTime).isBefore(this.option.minDate))) {
                date1.endTime = dayjs(this.option.minDate).clone();
            }
            if (date1.startTime && (this.option.minDate && dayjs(date1.startTime).isBefore(this.option.minDate))) {
                date1.startTime = dayjs(this.option.minDate).clone();
            }
            if (date1.endTime && (this.option.maxDate && dayjs(date1.endTime).isAfter(this.option.maxDate))) {
                date1.endTime = dayjs(this.option.maxDate).clone();
            }
            return date1;
        };
        DatePicker.prototype.setCurrentTime = function (date2, _isinit) {
            var date1 = XNQuery.extend(true, {}, date2);
            date1.startTime = date2.startTime ? date2.startTime.clone() : dayjs();
            date1.endTime = date2.endTime ? date2.endTime.clone() : dayjs();
            date1 = this.correctDate(date1);
            var date = XNQuery.extend(true, {}, date1);
            date1.startTime && (date.startTime = date1.startTime.clone());
            date1.endTime && (date.endTime = date1.endTime.clone());
            this.selectedDate[0] = date1.startTime;
            this.selectedDate[1] = date1.endTime;
            var startTime = date.startTime;
            if (this.type.indexOf('range') > -1) { //双日历时
                if (this.type.indexOf('year') > -1) {
                    var endTime = date.endTime;
                    var endTime1 = endTime.format('YYYY');
                    var startTime1 = startTime.format('YYYY');
                    var endYearP = endTime1 - endTime1 % 12;
                    var startYearP = startTime1 - startTime1 % 12;
                    if (startYearP + 12 >= endYearP) {
                        this.tempdate2 = endTime;
                        this.tempdate1 = endTime.clone().subtract('12', 'years');
                    }
                    else {
                        this.tempdate1 = startTime;
                        this.tempdate2 = endTime;
                    }
                }
                else if (this.type.indexOf('date') > -1) {
                    var endTime = date.endTime;
                    if (startTime.format('YYYY-MM') == endTime.format('YYYY-MM')) {
                        this.tempdate1 = dayjs(endTime).subtract(1, 'months');
                        this.tempdate2 = endTime;
                    }
                    else {
                        this.tempdate1 = startTime;
                        this.tempdate2 = endTime;
                    }
                }
                else if (this.type.indexOf('month') > -1 || this.type.indexOf('weeknum') > -1) {
                    var endTime = date.endTime;
                    if (startTime.format('YYYY') == endTime.format('YYYY')) {
                        this.tempdate2 = endTime;
                        this.tempdate1 = dayjs(endTime).clone().subtract(1, 'years');
                    }
                    else {
                        this.tempdate1 = startTime;
                        this.tempdate2 = endTime;
                    }
                }
            }
            else if (this.type != 'week') { //单日历时
                this.date1 = startTime;
                this.date2 = date.endTime;
                this.tempdate1 = this.date1.clone();
                delete this.selectedDate[1];
            }
            else { //周日历时
                var date1_1 = dayjs(startTime).clone().subtract((parseInt(this.option.firstDayOfWeek)) % 7, 'days').startOf('week').add((parseInt(this.option.firstDayOfWeek)) % 7, 'days');
                // var date1 = dayjs(startTime).startOf('week');
                var date2_1 = date1_1.clone().add(6, 'days');
                if ((this.option.minDate && dayjs(date1_1).isBefore(this.option.minDate))) {
                    date1_1 = dayjs(this.option.minDate.clone());
                }
                if ((this.option.maxDate && dayjs(date2_1).isAfter(this.option.maxDate))) {
                    date2_1 = dayjs(this.option.maxDate.clone());
                }
                this.tempdate1 = date1_1;
                this.tempdate2 = date2_1;
                this.selectedDate[0] = date1_1.clone();
                this.selectedDate[1] = date2_1.clone();
            }
            this.date1 = this.selectedDate[0].clone();
            this.selectedDate[1] && (this.date2 = this.selectedDate[1].clone());
        };
        DatePicker.prototype.setCurrentDay = function () {
            if (this.type.indexOf('range') < 0) {
                this.$container.find(".dater2").remove();
                this.$container.find(".time2").remove();
            }
            if (this.type.indexOf('time') < 0) {
                this.$container.find(".timepicker").remove();
            }
            if (this.type.indexOf('year') > -1) {
                this.rendYears(1);
                this.rendYears(2);
            }
            else if (this.type.indexOf('month') > -1) {
                this.rendMonth(1);
                this.rendMonth(2);
            }
            else if (this.type.indexOf('weeknum') > -1) {
                this.rendWeekNum(1);
                this.rendWeekNum(2);
            }
            else {
                this.geneDateList(this.tempdate1, this.$container.find(".dater1"));
                this.geneDateList(this.tempdate2, this.$container.find(".dater2"));
            }
            if (this.type != 'multiple') {
                for (var i in this.selectedDate) {
                    var yearmonth = this.selectedDate[i].format('YYYY-MM');
                    var date = this.selectedDate[i].format('DD');
                    //const time = this.selectedDate[i].format('HH:mm:ss');
                    this.$container.find(".active-day[data-date='" + yearmonth + '-' + date + "']").addClass("cur-date");
                }
                this.setCurrentClass();
            }
        };
        DatePicker.prototype.setCurrentClass = function () {
            if (this.selectedDate[0]) {
                var date1 = this.selectedDate[0].format(this.format);
                this.$container.find('.active-day[data-date="' + date1 + '"]').addClass('cur-date');
            }
            if (this.selectedDate[1]) {
                var date2 = this.selectedDate[1].format(this.format);
                this.$container.find('.active-day[data-date="' + date2 + '"]').addClass('cur-date');
                if (this.type == 'week') {
                    this.$container.find('.day-item[data-date="' + date2 + '"]').addClass('cur-date');
                }
                if (this.selectedDate[0].format(this.format) == this.selectedDate[1].format(this.format)) {
                    this.$container.find('.active-day[data-date="' + date2 + '"]').addClass('circle-date');
                }
            }
            this.rendHoverStyle();
        };
        DatePicker.prototype.cleardate = function (type) {
            if (type === void 0) { type = ''; }
            if (type == 'endTime') {
                this.date2 = '';
                this.selectedDate[1] = '';
            }
            else if (type == 'startTime') {
                this.date1 = '';
                this.selectedDate[0] = '';
                this.selectedMultiple = [];
            }
            else {
                this.date1 = '';
                this.date2 = '';
                this.selectedDate[0] = '';
                this.selectedDate[1] = '';
                this.selectedMultiple = [];
            }
            this.confirm();
        };
        DatePicker.prototype.currentdate = function () {
            this.date1 = dayjs();
            this.date2 = dayjs();
            this.confirm();
        };
        DatePicker.prototype.confirm = function (clear, isFirst) {
            var _this = this;
            if (clear === void 0) { clear = false; }
            if (isFirst === void 0) { isFirst = false; }
            var canconfirm = false;
            var showstrStart = '';
            var showstrEnd = '';
            if (this.type == 'multiple') {
                if (clear) {
                    if ((isFirst && this.option.confirmFirst) || !isFirst) {
                        this.trigger("confirm", { startTime: this.selectedMultiple, dayjs: dayjs });
                    }
                    showstrStart = '';
                    canconfirm = true;
                }
                else {
                    this.multipleDates = this.multipleDates.map(function (e) {
                        return dayjs(e).format(_this.option.format);
                    });
                    this.selectedMultiple = this.multipleDates;
                    if ((isFirst && this.option.confirmFirst) || !isFirst) {
                        this.trigger("confirm", { startTime: this.selectedMultiple, dayjs: dayjs });
                    }
                    showstrStart = this.multipleDates.join(',');
                    canconfirm = true;
                }
            }
            else {
                var startTime = void 0, endTime = void 0;
                if (isFirst) {
                    var date1 = this.correctDate(this.option);
                    startTime = date1.startTime ? dayjs(date1.startTime) : '';
                    endTime = date1.endTime ? dayjs(date1.endTime) : '';
                    if ((this.type.indexOf('range') > -1) || this.type == 'week') {
                        if (this.option.confirmFirst) {
                            this.trigger("confirm", { startTime: startTime, endTime: endTime, dayjs: dayjs });
                        }
                        showstrStart = (startTime ? startTime.format(this.option.format) : this.placeholder.startTime);
                        showstrEnd = (endTime ? endTime.format(this.option.format) : this.placeholder.endTime);
                    }
                    else if (this.type.indexOf('range') < 0) {
                        if (this.option.confirmFirst) {
                            this.trigger("confirm", { startTime: startTime, dayjs: dayjs });
                        }
                        showstrStart = (startTime ? startTime.format(this.option.format) : this.placeholder.startTime);
                    }
                    canconfirm = true;
                }
                else {
                    this.date1 && (this.selectedDate[0] = this.date1.clone());
                    this.date2 && (this.selectedDate[1] = this.date2.clone());
                    if (clear) {
                        if ((isFirst && this.option.confirmFirst) || !isFirst) {
                            this.trigger("confirm", { startTime: this.selectedDate[0], endTime: this.selectedDate[1] });
                        }
                        showstrStart = '';
                        canconfirm = true;
                    }
                    if ((this.type.indexOf('range') > -1) || this.type == 'week') {
                        if ((isFirst && this.option.confirmFirst) || !isFirst) {
                            this.trigger("confirm", {
                                startTime: this.selectedDate[0],
                                endTime: this.selectedDate[1],
                                dayjs: dayjs
                            });
                        }
                        try {
                            showstrStart = this.selectedDate[0] ? this.selectedDate[0].format(this.option.format) : '';
                            showstrEnd = this.selectedDate[1] ? this.selectedDate[1].format(this.option.format) : '';
                        }
                        catch (e) {
                            showstrStart = '';
                            showstrEnd = '';
                        }
                        canconfirm = true;
                    }
                    else if (this.type.indexOf('range') < 0) {
                        if ((isFirst && this.option.confirmFirst) || !isFirst) {
                            this.trigger("confirm", { startTime: this.selectedDate[0], dayjs: dayjs });
                        }
                        try {
                            showstrStart = this.selectedDate[0].format(this.option.format);
                        }
                        catch (e) {
                            showstrStart = '';
                        }
                        canconfirm = true;
                    }
                }
            }
            if (!canconfirm) {
                return;
            }
            this.changeShowStatus(true);
            this.fillInput(showstrStart, showstrEnd);
        };
        DatePicker.prototype.fillInput = function (showstrStart, showstrEnd) {
            if (!this.option.autoFillDate) {
                return;
            }
            this.targetDom.querySelector('.' + 'startTime' + ' .input').innerHTML = showstrStart;
            this.targetDom.querySelector('.' + 'endTime' + ' .input') && (this.targetDom.querySelector('.' + 'endTime' + ' .input').innerHTML = showstrEnd);
            // if (this.targetDom.nodeName == 'INPUT') {
            //     this.targetDom.value = showstr;
            // } else {
            //     this.targetDom.innerHTML = showstr;
            // }
            // // this.$targetDom.addClass('iconfont-xndatepicker icon-xndatepickerrili xndatepicker-input')
            // this.targetDom.setAttribute('data-placeholder', this.placeholder.startTime)
        };
        DatePicker.prototype.rendWeekNum = function (datenum) {
            if (!this.$container.find('.dater' + datenum).get(0)) {
                return;
            }
            var html = "\n                <div class=\"year-picker\">\n                    <div class=\"prev\">\n                        <span class=\"iconfont-xndatepicker icon-xndatepickerprev1 week-prev-year skip-date\" data-unit=\"year\" data-func=\"subtract\"></span>\n                    </div>\n                    <div class=\"month-info\"></div>\n                    <div class=\"next\">\n                        <span class=\"iconfont-xndatepicker icon-xndatepickerprev1 week-prev-year skip-date\" data-unit=\"year\" data-func=\"add\"></span>\n                    </div>\n                </div>\n                <div class=\"weeknum-list\"></div>\n            ";
            this.$container.find('.dater' + datenum).empty().append(html);
            var weeklist = this.getWeekNumList(datenum);
            this.$container.find('.dater' + datenum).find(".weeknum-list").append(weeklist);
            this.setTodayDot('week');
        };
        DatePicker.prototype.getWeekNumList = function (datenum) {
            var curYear = dayjs(this['tempdate' + datenum]).format('YYYY');
            this.$container.find(".dater" + datenum + " .month-info").get(0).innerHTML = curYear;
            var html = '';
            var date;
            var weeknums = dayjs((curYear + '/01/01')).isoWeeksInYear();
            for (var i = 0; i < weeknums; i++) {
                date = dayjs(curYear + '01/01').week(i + 1).startOf('week');
                if (date.format('YYYY') != curYear) {
                    date = dayjs(curYear + '01/01').format('YYYY-MM-DD');
                }
                else {
                    date = date.format('YYYY-MM-DD');
                }
                var disable = (!(((this.option.minDate && dayjs(this.option.minDate).startOf('week').isSameOrBefore(date)) || !this.option.minDate) && ((this.option.maxDate && dayjs(this.option.maxDate).endOf('week').isSameOrAfter(dayjs(date).endOf('week'))) || !this.option.maxDate))) || this.disableDate(date, dayjs, 'weeknum');
                html += "<span class=\"week-item ".concat(disable ? 'disable-week' : 'active-day', "\" data-date=\"").concat(date, "\">") + this.option.locale.weekNum(i + 1) + "</span>";
            }
            return html;
        };
        DatePicker.prototype.rendMonth = function (datenum) {
            if (!this.$container.find('.dater' + datenum).get(0)) {
                return;
            }
            var html = "\n                <div class=\"year-picker\">\n                    <div class=\"prev\">\n                    <span class=\"iconfont-xndatepicker icon-xndatepickerprev1 month-prev-year skip-date\" data-unit=\"year\" data-func=\"subtract\"></span>\n</div>\n                    <div class=\"month-info\"></div>\n                    <div class=\"next\">\n                    <span class=\"iconfont-xndatepicker icon-xndatepickerprev1 month-next-year skip-date\" data-unit=\"year\" data-func=\"add\"></span>\n</div>\n                </div>\n                <div class=\"month-list\">\n\n</div>\n            ";
            this.$container.find('.dater' + datenum).empty().append(html);
            var monthlist = this.getMonthList(datenum);
            this.$container.find('.dater' + datenum).find(".month-list").append(monthlist);
            this.setTodayDot('month');
        };
        DatePicker.prototype.getMonthList = function (datenum) {
            var curYear = dayjs(this['tempdate' + datenum]).format('YYYY');
            this.$container.find(".dater" + datenum + " .month-info").get(0).innerHTML = curYear;
            var html = '';
            for (var i = 0; i < 12; i++) {
                // @ts-ignore
                var disable = (!(((this.option.minDate && dayjs(this.option.minDate).startOf('month').isSameOrBefore((curYear + '/' + (i + 1) + '/01'))) || !this.option.minDate) && ((this.option.maxDate && dayjs(this.option.maxDate).startOf('month').isSameOrAfter((curYear + '/' + (i + 1) + '/01'))) || !this.option.maxDate))) || this.disableDate(dayjs(curYear + '/' + (i + 1), 'YYYY/MM'), dayjs, 'month');
                html += "<span class=\"month-item ".concat(disable ? 'disable-month' : 'active-day', "\" data-date=\"").concat(dayjs(curYear + '/' + (i + 1), 'YYYY/MM').format('YYYY-MM'), "\">") + this.option.locale.month[i] + "</span>";
            }
            return html;
        };
        DatePicker.prototype.rendYears = function (datenum) {
            if (!this.$container.find('.dater' + datenum).get(0)) {
                return;
            }
            var html = ("\n                <div class=\"year-picker\">\n                    <div class=\"prev\">\n                    <span class=\"iconfont-xndatepicker icon-xndatepickerprev1 year-prev-year\"></span>\n</div>\n                    <div class=\"year-info\"></div>\n                    <div class=\"next\">\n                    <span class=\"iconfont-xndatepicker icon-xndatepickerprev1 year-next-year\"></span>\n</div>\n                </div>\n                <div class=\"year-list\">\n\n</div>\n            ");
            this.$container.find('.dater' + datenum).empty().append(html);
            var yearlist = this.getYearList(datenum);
            this.$container.find('.dater' + datenum).find(".year-list").append(yearlist);
            this.setTodayDot('year');
        };
        DatePicker.prototype.getYearList = function (datenum) {
            var chooseYear = dayjs(this['tempdate' + datenum]).format('YYYY');
            var curYear = (chooseYear - chooseYear % 12);
            this.$container.find(".dater" + datenum + " .year-info").html(curYear + '-' + (parseInt(String(curYear)) + 11));
            var html = '';
            for (var i = 0; i < 12; i++) {
                // @ts-ignore
                var disable = (!(((this.option.minDate && dayjs(this.option.minDate).startOf('year').isSameOrBefore(((parseInt(curYear) + i) + '/01/01'))) || !this.option.minDate) && ((this.option.maxDate && dayjs(this.option.maxDate).startOf('year').isSameOrAfter(((parseInt(curYear) + i) + '/01/01'))) || !this.option.maxDate))) || this.disableDate(dayjs((parseInt(curYear) + i) + '/01/01'), dayjs, 'year');
                html += "<span class=\"year-item ".concat(disable ? 'disable-year' : 'active-day', "\" data-date=\"").concat((parseInt(String(curYear)) + i), "\">") + (parseInt(String(curYear)) + i) + "</span>";
            }
            return html;
        };
        DatePicker.prototype.getDateCont = function () {
            var html = "<div class=\"year-picker\">\n                            <div class=\"prev\">\n                            <span class=\"iconfont-xndatepicker icon-xndatepickerprev prev-year skip-date\" data-unit=\"year\" data-func=\"subtract\"></span>\n                            <span class=\"iconfont-xndatepicker icon-xndatepickerprev1 prev-month skip-date\" data-unit=\"month\" data-func=\"subtract\"></span>\n</div>\n                            <div class=\"year-info\"></div>\n                            <div class=\"next\">\n                            <span class=\"iconfont-xndatepicker icon-xndatepickerprev1 next-month skip-date\" data-unit=\"month\" data-func=\"add\"></span>\n                            <span class=\"iconfont-xndatepicker icon-xndatepickerprev next-year skip-date\" data-unit=\"year\" data-func=\"add\"></span>\n</div>\n                        </div>";
            if (this.option.showWeek) {
                html += "<div class=\"week\">";
                for (var i = parseInt(this.option.firstDayOfWeek); i < parseInt(this.option.firstDayOfWeek) + 7; i++) {
                    html += "<span>".concat(this.option.locale.week[i % 7], "</span>");
                }
                html += "</div>";
            }
            html += "<div class=\"dater\">\n                        </div>";
            return html;
        };
        DatePicker.prototype.rendDatePicker = function () {
            var div = document.createElement("div");
            div.classList.add("xndatepicker", this.type, this.option.theme);
            div.id = this.id;
            var bottomStr = this.option.showBottomButton ? "\n                <div class=\"xn-bottom\">\n<!--            <a  class=\"xn-btn current-date\">\u73B0\u5728</a>-->\n            <a  class=\"xn-btn clear-date\">".concat(this.option.locale.clear, "</a>\n            <a class=\"xn-btn confirm-date\">").concat(this.option.locale.confirm, "</a>\n        </div>") : '';
            var html = "\n        <div class=\"xn-top\">\n            <div class=\"shortcut\">\n\n            </div>\n            <div class=\"date-main\">\n                <div class=\"timepicker\">\n                    <div class=\"timeitem time1\">\n                        <input>\n                        <div class=\"timecont\">\n                        <span></span>\n</div>\n                    </div>\n                    <div class=\"timeitem time2\">\n                        <input>\n                        <div class=\"timecont\">\n                        <span></span>\n</div>\n                    </div>\n                </div>\n                <div class=\"datepicker\">\n                    <div class=\"date-item dater1\" data-id=\"1\">\n                        " + this.getDateCont() + "\n                    </div>\n                    <div class=\"date-item dater2\" data-id=\"2\">\n                        " + this.getDateCont() + "\n                    </div>\n                </div>\n            </div>\n        </div>\n        ".concat(bottomStr, "\n\n        <div class=\"xntriangle\"></div>");
            div.innerHTML = html;
            document.body.appendChild(div);
            this.$container = XNQuery("#" + this.id);
            // this.changeShowStatus(true)
            this.setCurrentDay();
            this.geneShortList();
            if (this.type.indexOf('range') < 0 && this.type.indexOf('time') < 0 && this.type != 'multiple' && this.option.autoConfirm) {
                this.$container.find('.confirm-date').remove();
            }
            else {
                if (!this.option.showClear && this.option.autoConfirm && this.type != 'multiple') {
                    this.$container.find('.xn-bottom').remove();
                }
            }
            if (!this.option.showClear) {
                this.$container.find('.clear-date').remove();
            }
            if (!this.option.showShortKeys || this.option.shortList.length < 1) {
                this.$container.find('.shortcut').remove();
            }
        };
        DatePicker.prototype.geneShortList = function () {
            var ul = '<ul>';
            for (var i = 0; i < this.option.shortList.length; i++) {
                ul += '<li>' + this.option.shortList[i].name + '</li>';
            }
            ul += '</ul>';
            this.$container.find('.shortcut').empty().append(ul);
        };
        DatePicker.prototype._getDaysNum = function (date) {
            var ynow = date.year();
            var mnow = date.month();
            var m_days = [31, 28 + this.is_leap(ynow), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //每个月的天数
            return m_days[mnow];
        };
        DatePicker.prototype.geneDateList = function (curdate, $cont) {
            if (!$cont || !curdate || (this.type.indexOf('date') < 0 && this.type != 'week' && this.type != 'multiple')) {
                return;
            }
            var date = curdate.clone();
            $cont.empty().html(this.getDateCont());
            var ynow = date.year();
            var mnow = date.month() + 1;
            var firstday = dayjs(date).startOf('month').day() - parseInt(this.option.firstDayOfWeek);
            if (firstday < 0) {
                firstday += 7;
            }
            var m_days = this._getDaysNum(date);
            var l_days = this._getDaysNum(dayjs(date).subtract(1, 'months'));
            var ldates = [];
            for (var i = firstday - 1; i >= 0; i--) {
                ldates.push({ day: l_days - i });
            }
            for (var i = 0; i < m_days; i++) {
                var disable = this.checkDisable(dayjs(ynow + '/' + mnow + '/' + (i + 1), 'YYYY/MM/DD'), 0, this.type, 'date') || this.disableDate(dayjs(ynow + '/' + mnow + '/' + (i + 1), 'YYYY/MM/DD'), dayjs, 'date');
                ldates.push({
                    iscur: true,
                    disable: disable,
                    day: i + 1
                });
            }
            var l = ldates.length;
            for (var i = 0; i < 42 - l; i++) {
                ldates.push({ day: i + 1, isnext: true });
            }
            this._rendDayHtml(ldates, $cont, ynow + '/' + mnow);
            this._rendYearHtml(date, $cont);
            if (this.type == 'multiple') {
                for (var i = 0; i < this.multipleDates.length; i++) {
                    var date_1 = this.multipleDates[i];
                    if (typeof date_1 == 'object') {
                        date_1 = date_1.format('YYYY-MM-DD');
                    }
                    else {
                        date_1 = dayjs(date_1).format('YYYY-MM-DD');
                    }
                    this.$container.find('span[data-date="' + date_1 + '"]').addClass('cur-date');
                }
            }
        };
        DatePicker.prototype.checkDisable = function (date, dir, type, unit) {
            if (unit === void 0) { unit = ''; }
            var disable = true;
            if (!this.option.minDate && !this.option.maxDate) {
                return false;
            }
            if (this.type.indexOf('year') > -1 || type == 'year') {
                var year = date.format('YYYY');
                var min = (this.option.minDate ? (dayjs(this.option.minDate).format('YYYY')) : 0);
                var max = this.option.maxDate ? (dayjs(this.option.maxDate).format('YYYY')) : year;
                var yearP = year - year % 12 - 12;
                var minP = min - min % 12;
                var maxP = max - max % 12;
                if ((dir > 0 || minP <= yearP) && (dir < 0 || maxP >= yearP + 12)) {
                    disable = false;
                }
            }
            else {
                var format_1 = 'YYYY-MM';
                if (unit == 'year') {
                    format_1 = 'YYYY';
                }
                if (unit == 'date') {
                    format_1 = 'YYYY-MM-DD';
                }
                if ((!this.option.minDate || (this.option.minDate && this.option.minDate.format(format_1) <= date.format(format_1))) && (!this.option.maxDate || (this.option.maxDate && this.option.maxDate.format(format_1) >= date.format(format_1)))) {
                    disable = false;
                }
            }
            return disable;
        };
        DatePicker.prototype._rendYearHtml = function (date, $cont) {
            var ynow = date.year();
            var mnow = date.month() + 1;
            $cont.find(".year-info").html("<span class='year'>" + this.option.locale.yearHeadSuffix(ynow) + "<\/span><span class='month'>" + this.option.locale.monthHead[mnow - 1] + "<\/span>");
        };
        DatePicker.prototype._rendDayHtml = function (datelist, $cont, year) {
            var $c = $cont.find(".dater");
            if ($c.length() < 1) {
                $cont.append('<div class="dater"></div>');
            }
            $c.empty();
            for (var i = 0; i < 6; i++) {
                // let ul = document.createElement("ul")
                for (var j = i * 7; j < i * 7 + 7; j++) {
                    /*const span = document.createElement("span");*/
                    var li = document.createElement("span");
                    li.classList.add("day-item");
                    if (datelist[j].iscur) {
                        if (!datelist[j].disable) {
                            li.classList.add("active-day");
                        }
                        li.setAttribute("data-date", dayjs(year + '/' + datelist[j].day, 'YYYY/MM/DD').format('YYYY-MM-DD'));
                    }
                    else {
                        if (datelist[j].isnext) {
                            li.setAttribute("data-date", dayjs(year + '/' + datelist[j].day, 'YYYY/MM/DD').add(1, 'months').format('YYYY-MM-DD'));
                        }
                        else {
                            li.setAttribute("data-date", dayjs(year, 'YYYY/MM').subtract(1, 'months').date(datelist[j].day).format('YYYY-MM-DD'));
                        }
                    }
                    if (datelist[j].disable) {
                        li.classList.add("disable-day");
                    }
                    li.innerHTML = (datelist[j].day);
                    $c.append(li);
                    // ul.append(li)
                }
                // $c.append(ul)
            }
            this.setTodayDot('day');
        };
        DatePicker.prototype.is_leap = function (year) {
            return (year % 100 == 0 ? (year % 400 == 0 ? 1 : 0) : (year % 4 == 0 ? 1 : 0));
        };
        DatePicker.prototype.trigger = function (type, data) {
            if (this.eventList[type]) {
                for (var i = 0; i < this.eventList[type].func.length; i++) {
                    if (typeof this.eventList[type].func[i] == 'function')
                        this.eventList[type].func[i](data);
                }
            }
        };
        DatePicker.prototype.on = function (type, func) {
            if (!this.eventList[type]) {
                this.eventList[type] = {
                    func: [func]
                };
            }
            else {
                this.eventList[type].func.push(func);
            }
        };
        DatePicker.prototype.getRandomString = function (len) {
            len = len || 8;
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
            /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            var maxPos = $chars.length;
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        };
        DatePicker.prototype._setData = function (_key, $watch) {
            var _this = this;
            Object.defineProperty(this, _key, {
                get: function () {
                    return _this[_key];
                },
                set: function (val) {
                    var oldVal = _this[_key];
                    _this[_key] = val;
                    $watch(val, oldVal);
                    return val;
                },
            });
        };
        DatePicker.prototype.watch = function (key, callback) {
            this._setData(key, callback);
        };
        DatePicker.prototype.setTodayDot = function (type) {
            var date = dayjs().format('YYYY-MM-DD');
            if (type == 'year') {
                date = dayjs().format('YYYY');
            }
            if (type == 'month') {
                date = dayjs().format('YYYY-MM');
            }
            this.$container.find('.' + type + '-item[data-date="' + date + '"]').addClass('is-today');
        };
        DatePicker.prototype.destroy = function () {
            this.removeMoveEvent();
            this.removeClickEvent();
            this.$container && (this.$container.remove());
        };
        DatePicker.prototype.format = function (date, format) {
            return dayjs(date).format(format);
        };
        return DatePicker;
    }());

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

    var css_248z$3 = "@charset \"UTF-8\";\n/**********************系统级别配置*******************************/\n/**********************基本颜色***************************/\n/* z-index\n-------------------------- */\n/* Disable base\n-------------------------- */\n/* Transition\n-------------------------- */\n/* Color\n-------------------------- */\n/* 53a8ff */\n/* 66b1ff */\n/* 79bbff */\n/* 8cc5ff */\n/* a0cfff */\n/* b3d8ff */\n/* c6e2ff */\n/* d9ecff */\n/* ecf5ff */\n/* Fill\n-------------------------- */\n/**********************基本边框***************************/\n/**********************盒模型阴影*************************/\n/**********************基本字体*************************/\n/**********************Button***************************/\n/**************************Radio****************************/\n/* Input-------------------------- */\n/* Break-point\n--------------------------*/\n/* Link\n--------------------------*/\n/* Switch\n-------------------------- */\n/* Table\n-------------------------- */\n/* Pagination\n-------------------------- */\n/* Dropdown\n-------------------------- */\n/* Checkbox\n-------------------------- */\n/* Tag\n-------------------------- */\n/* Message\n-------------------------- */\n/* Rate\n--------------------------*/\n/* Timeline\n--------------------------*/\n/* Select\n-------------------------- */\n/* Avatar\n--------------------------*/\n/* Badge\n-------------------------- */\n/* Empty\n-------------------------- */\n/* Skeleton\n--------------------------*/\n/* Svg\n--------------- */\n/* Card\n--------------------------*/\n/* Header\n  --------------------------*/\n/* Footer\n--------------------------*/\n/* Main\n--------------------------*/\n/* Alert\n-------------------------- */\n/* Pagination\n-------------------------- */\n/* Transition\n-------------------------- */\n/* Collapse\n--------------------------*/\n/* BEM support Func\n -------------------------- */\n/* Break-points\n -------------------------- */\n/* Scrollbar\n -------------------------- */\n/* Placeholder\n -------------------------- */\n:host {\n  display: inline-block;\n}\n\n:host([disabled]) {\n  cursor: not-allowed;\n  pointer-events: none;\n}\n\n:host([disabled=true]) {\n  cursor: not-allowed;\n  pointer-events: none;\n}\n\n.wu-data-picker {\n  border: 1px solid #dcdfe6;\n}\n\n.wu-data-picker {\n  position: relative;\n  font-size: 14px;\n  -webkit-appearance: none;\n  background-color: #FFFFFF;\n  background-image: none;\n  border-radius: 4px;\n  border: 1px solid #C0C4CC;\n  box-sizing: border-box;\n  color: #606266;\n  display: inline-block;\n  height: 40px;\n  line-height: 40px;\n  outline: none;\n  padding: 0 15px;\n  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.wu-data-picker::-webkit-scrollbar {\n  z-index: 11;\n  width: 6px;\n}\n.wu-data-picker::-webkit-scrollbar:horizontal {\n  height: 6px;\n}\n.wu-data-picker::-webkit-scrollbar-thumb {\n  border-radius: 5px;\n  width: 6px;\n  background: #b4bccc;\n}\n.wu-data-picker::-webkit-scrollbar-corner {\n  background: #fff;\n}\n.wu-data-picker::-webkit-scrollbar-track {\n  background: #fff;\n}\n.wu-data-picker::-webkit-scrollbar-track-piece {\n  background: #fff;\n  width: 6px;\n}\n.wu-data-picker.is-active {\n  outline: none;\n  border-color: #409EFF;\n}\n\n.wu-data-picker.is-disabled {\n  background-color: #F5F7FA;\n  border-color: #E4E7ED;\n  color: #C0C4CC;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.wu-data-picker.is-disabled .iconfont-xndatepicker {\n  cursor: not-allowed;\n}\n\n.wu-data-picker.is-exceed {\n  border-color: #F56C6C;\n}\n\n.wu-data-picker-suffix {\n  padding-right: 30px;\n}\n\n.wu-data-picker-prefix {\n  padding-left: 30px;\n}\n\n.wu-data-picker-medium {\n  font-size: 14px;\n  height: 36px;\n  line-height: 36px;\n}\n.wu-data-picker-medium .iconfont-xndatepicker {\n  line-height: 36px;\n}\n\n.wu-data-picker-small {\n  font-size: 13px;\n  height: 32px;\n  line-height: 32px;\n}\n.wu-data-picker-small .iconfont-xndatepicker {\n  line-height: 32px;\n}\n\n.wu-data-picker-mini {\n  font-size: 12px;\n  height: 28px;\n  line-height: 28px;\n}\n.wu-data-picker-mini .iconfont-xndatepicker {\n  line-height: 28px;\n}";
    styleInject(css_248z$3);

    var css_248z$2 = ".xndatepicker a, .xndatepicker a:hover {\n  text-decoration: none;\n}\n\n.xndatepicker a {\n  text-decoration: none;\n}\n\n.xndatepicker ol, .xndatepicker ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.xndatepicker, .xndatepicker-mobile-outer {\n  --background-color:#fff;\n  --primary-color:#409eff;\n  --border-color:#f2f2f2;\n  --disable-color:#ccc;\n  --color:#333;\n  --hover-background:#409eff;\n  --hover-color:#fff;\n  --week-color:#666;\n  --shortcut-color:#409eff;\n  --shortcut-hover-color:#409eff;\n  --title-color:#333;\n  --title-hover-color:#409eff;\n  --prev-hover-color:#409eff;\n  --range-background:rgb(233, 241, 255);\n  --range-hover-color:#333;\n}\n\n.xndatepicker.blue, .xndatepicker-mobile-outer.blue {\n  --background-color:#409eff;\n  --primary-color:#409eff;\n  --border-color:#409eff;\n  --disable-color:#838282;\n  --color:#fff;\n  --hover-background:#2979ff;\n  --hover-color:#fff;\n  --week-color:#fff;\n  --shortcut-color:#fff;\n  --shortcut-hover-color:#409eff;\n  --title-color:#fff;\n  --title-hover-color:#409eff;\n  --prev-hover-color:#409eff;\n  --range-background: rgb(24 52 101);\n  --range-hover-color:#a2bce5;\n}\n\n.xndatepicker.orange, .xndatepicker-mobile-outer.orange {\n  --background-color:#fff;\n  --primary-color:#ff7431;\n  --border-color:#f2f2f2;\n  --disable-color:#ccc;\n  --color:#333;\n  --hover-background:#f8621a;\n  --hover-color:#fff;\n  --week-color:#666;\n  --shortcut-color:#f8621a;\n  --shortcut-hover-color:#ff7431;\n  --title-color:#333;\n  --title-hover-color:#ff7431;\n  --prev-hover-color:#ff7431;\n  --range-background:rgb(255 239 232);\n  --range-hover-color:#333;\n}\n\n.xndatepicker.pink, .xndatepicker-mobile-outer.pink {\n  --background-color:#fff;\n  --primary-color:#d06396;\n  --border-color:#f2f2f2;\n  --disable-color:#ccc;\n  --color:#333;\n  --hover-background:#f48fbf;\n  --hover-color:#fff;\n  --week-color:#666;\n  --shortcut-color:#d06396;\n  --shortcut-hover-color:#f48fbf;\n  --title-color:#333;\n  --title-hover-color:#f48fbf;\n  --prev-hover-color:#f48fbf;\n  --range-background:#fef4f9;\n  --range-hover-color:#333;\n}\n\n.xndatepicker.green, .xndatepicker-mobile-outer.green {\n  --background-color:#fff;\n  --primary-color:#42a148;\n  --border-color:#f2f2f2;\n  --disable-color:#ccc;\n  --color:#333;\n  --hover-background:#73bb77;\n  --hover-color:#fff;\n  --week-color:#666;\n  --shortcut-color:#42a148;\n  --shortcut-hover-color:#73bb77;\n  --title-color:#333;\n  --title-hover-color:#73bb77;\n  --prev-hover-color:#73bb77;\n  --range-background:#ddedde;\n  --range-hover-color:#333;\n}";
    styleInject(css_248z$2);

    var css_248z$1 = "@charset \"UTF-8\";\n.xndatepicker-pc-input {\n  min-width: 60px;\n  display: flex;\n  align-items: center;\n}\n\n.xndatepicker-pc-input > div {\n  position: relative;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  /*width: 100%;*/\n  /*overflow: hidden;*/\n}\n\n.xndatepicker-pc-input > span {\n  padding: 0 10px;\n}\n\n.xndatepicker-pc-input .input {\n  padding: 0 10px;\n  /*width: 100%;*/\n  /*overflow: hidden;*/\n  /*text-overflow: ellipsis;*/\n}\n\n.xndatepicker-pc-input .input:empty:before {\n  content: attr(data-placeholder);\n}\n\n/*.xndatepicker-pc-input:hover .clear-btn{*/\n/*    display: block;*/\n/*}*/\n.xndatepicker-pc-input:hover > div:before {\n  display: none;\n}\n\n.xndatepicker-pc-input > div > i.clear-btn {\n  display: none;\n}\n\n.xndatepicker-pc-input > div:hover i.clear-btn {\n  display: block;\n}\n\n.xndatepicker-pc-input > div:hover i.date-icon {\n  display: none;\n}\n\n.xndatepicker {\n  font-size: 14px;\n  line-height: 26px;\n  background: var(--background-color);\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  display: none;\n  position: fixed;\n  top: 100px;\n  left: 100px;\n  border-radius: 4px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  z-index: 999;\n  box-sizing: initial;\n}\n\n.xndatepicker,\n.xndatepicker::before,\n.xndatepicker::after {\n  box-sizing: content-box;\n}\n\n.xndatepicker-input.icon-xndatepickerrili {\n  padding-right: 30px;\n}\n\n.xndatepicker-input.icon-xndatepickerrili:before {\n  position: absolute;\n  right: 10px;\n}\n\n.xndatepicker-input:empty:after {\n  content: attr(data-placeholder);\n}\n\n.xndatepicker .xn-top {\n  display: flex;\n  align-items: flex-start;\n}\n\n.xndatepicker .xn-bottom {\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  justify-content: flex-end;\n  line-height: 31px;\n  font-size: 12px;\n}\n\n.xndatepicker .xn-bottom > a {\n  padding: 0 20px;\n  cursor: pointer;\n  border-left: 1px solid var(--border-color);\n}\n\n.xndatepicker .xn-bottom > a.confirm-date {\n  background: var(--primary-color);\n  color: var(--hover-color);\n  border-radius: 0 0 4px;\n}\n\n.xndatepicker .xn-bottom > a.confirm-date:hover {\n  background: var(--hover-background);\n}\n\n.xndatepicker .shortcut {\n  padding: 10px;\n  line-height: 36px;\n  white-space: nowrap;\n  font-size: 12px;\n  padding-top: 0;\n}\n\n.xndatepicker .shortcut li {\n  cursor: pointer;\n  color: var(--shortcut-color);\n  border-bottom: 1px solid var(--border-color);\n  padding: 0 10px;\n}\n\n.xndatepicker .shortcut li:hover {\n  color: var(--shortcut-hover-color);\n}\n\n.xndatepicker .date-main {\n  border-left: 1px solid var(--border-color);\n}\n\n.xndatepicker .timepicker {\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid var(--border-color);\n  line-height: 34px;\n  font-size: 12px;\n}\n\n.xndatepicker .datepicker {\n  display: flex;\n  align-items: flex-start;\n}\n\n.xndatepicker .timepicker > div {\n  flex: 1;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 6px 0;\n}\n\n.xndatepicker .dater > span {\n  width: 36px;\n  text-align: center;\n  color: var(--disable-color);\n}\n\n.xndatepicker .dater > span.active-day {\n  color: var(--color);\n  cursor: pointer;\n}\n\n.xndatepicker .date-main .datepicker .dater > .day-item {\n  border-radius: 50%;\n  cursor: pointer;\n}\n\n.xndatepicker .dater > span.active-day.disable-day:hover {\n  cursor: not-allowed;\n  background: none;\n  color: var(--color);\n}\n\n.xndatepicker .dater > span.active-day.cur-date {\n  color: var(--hover-color);\n}\n\n.xndatepicker .cur-date {\n  border-radius: 4px 0 0 4px;\n}\n\n.xndatepicker .cur-date.right-date {\n  border-radius: 0 4px 4px 0;\n}\n\n.xndatepicker .cur-date.circle-date {\n  border-radius: 4px;\n}\n\n.xndatepicker .cur-date.circle-date.year-item, .xndatepicker .cur-date.circle-date.month-item {\n  border-radius: 4px;\n}\n\n.xndatepicker .dater > span.active-day:hover {\n  background: var(--hover-background);\n  color: var(--hover-color);\n  border-radius: 2px;\n}\n\n.xndatepicker .week {\n  display: flex;\n  align-items: center;\n  margin-bottom: 4px;\n  color: var(--week-color);\n  font-size: 12px;\n}\n\n.xndatepicker .week span {\n  width: 40px;\n  text-align: center;\n  display: inline-block;\n}\n\n.xndatepicker .year-picker {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 6px;\n  line-height: 45px;\n  border-bottom: 1px solid var(--border-color);\n  color: var(--title-color);\n}\n\n.xndatepicker .date-item {\n  border-left: 1px solid var(--border-color);\n  padding: 10px;\n  width: 292px;\n  padding-top: 0;\n}\n\n.xndatepicker .date-item:first-child {\n  border: 0;\n}\n\n.xndatepicker .year-info span {\n  cursor: pointer;\n  margin: 0 2px;\n  letter-spacing: 1px;\n  color: var(--title-color);\n}\n\n.xndatepicker .year-info span:hover {\n  color: var(--title-hover-color);\n}\n\n.xndatepicker .next > span:hover, .xndatepicker .prev > span:hover {\n  color: var(--prev-hover-color);\n  cursor: pointer;\n}\n\n.xndatepicker .next, .xndatepicker .prev {\n  color: var(--primary-color);\n}\n\n.xndatepicker .next span, .xndatepicker .prev span {\n  font-size: 12px;\n}\n\n.xndatepicker .next > span:before {\n  transform: rotate(180deg);\n  transform-origin: center;\n  display: inline-block;\n}\n\n.xndatepicker.week .dater > span.active-day:hover, .xndatepicker.week .dater > .hover, .xndatepicker .dater > .active-day.hover, .month-item.hover, .year-item.hover, .week-item.hover {\n  background: var(--range-background);\n  color: var(--range-hover-color);\n}\n\n.year-list, .month-list {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.year-list .year-item, .month-list .month-item, .weeknum-list .week-item {\n  flex: 0 0 30.3333333333%;\n  width: 30.3333333333%;\n  display: block;\n  height: 40px;\n  line-height: 40px;\n  text-align: center;\n  cursor: pointer;\n  margin-bottom: 2px;\n  margin: 9px 1%;\n  font-size: 12px;\n  position: relative;\n  color: var(--color);\n}\n\n.xndatepicker .cur-date, .xndatepicker .hover.cur-date, .xndatepicker .dater > span.cur-date.hover {\n  background: var(--primary-color);\n  color: #fff;\n}\n\n.weeknum-list .week-item {\n  flex: 0 0 30.3333333333%;\n  width: 30.3333333333%;\n  height: 34px;\n  line-height: 34px;\n  margin: 2px 1%;\n}\n\n.year-list .year-item.disable-year, .month-list .month-item.disable-month, .weeknum-list .week-item.disable-week {\n  color: #ccc;\n}\n\n.year-list .year-item.disable-year:hover, .month-list .month-item.disable-month:hover, .weeknum-list .week-item.disable-week:hover {\n  background: none;\n  color: #ccc;\n}\n\n.year-list .year-item:hover, .month-list .month-item:hover, .weeknum-list .week-item:hover {\n  background: var(--hover-background);\n  color: var(--hover-color);\n  border-radius: 4px;\n}\n\n.datepicker .weeknum-list {\n  max-height: 232px;\n  overflow: auto;\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.xndatepicker .dater {\n  font-size: 12px;\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.xndatepicker .dater > span {\n  flex: 0 0 40px;\n  width: 40px;\n  text-align: center;\n  line-height: 40px;\n  margin: 1px 0;\n  position: relative;\n  overflow: hidden;\n}\n\n.xntimepicker {\n  position: absolute;\n  background: var(--background-color);\n  padding: 10px;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 4px;\n  z-index: 9;\n  top: 32px;\n  padding-bottom: 0;\n}\n\n.xntimepicker div.time-cont {\n  display: flex;\n  justify-content: space-around;\n}\n\n.xntimepicker div.time-btns {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  /*padding: 0 14px;*/\n  font-size: 12px;\n}\n\n.xntimepicker .cur-time {\n  color: var(--primary-color);\n}\n\n.xntimepicker .confirm-time {\n  color: var(--hover-color);\n  line-height: 22px;\n  padding: 0 9px;\n  background: var(--primary-color);\n  border-radius: 2px;\n}\n\n.xntimepicker .confirm-time:hover {\n  background: var(--hover-background);\n}\n\n.xntimepicker ul {\n  height: 180px;\n  overflow: hidden;\n  white-space: nowrap;\n  border-right: 1px solid var(--border-color);\n  border-bottom: 1px solid var(--border-color);\n}\n\n.xntimepicker ul:hover {\n  overflow: auto;\n  overflow: overlay;\n}\n\n.xntimepicker ul:last-child {\n  border-right: 0;\n}\n\n.xntimepicker ul li {\n  padding: 0 24px 0 14px;\n  color: var(--color);\n  line-height: 28px;\n  font-size: 12px;\n  cursor: pointer;\n}\n\n.xntimepicker ul li:hover {\n  background: var(--hover-background);\n  color: var(--hover-color);\n}\n\n.xntimepicker ul li.on {\n  background: var(--primary-color);\n  color: var(--hover-color);\n}\n\n.timeitem {\n  position: relative;\n}\n\n.timeitem .timecont {\n  width: 100px;\n  flex: 0 0 100px;\n  height: 28px;\n  line-height: 28px;\n  text-align: left;\n  padding: 0 6px;\n  box-sizing: border-box;\n  cursor: pointer;\n  position: relative;\n  padding: 0 10px;\n  border-radius: 14px;\n  background: var(--background-color);\n  color: var(--color);\n  border: 1px solid var(--border-color);\n}\n\n.timeitem .timecont > span {\n  line-height: 26px;\n  position: absolute;\n  top: 0;\n}\n\n.timeitem > input {\n  outline: none;\n  line-height: 26px;\n  flex: 0 0 100px;\n  width: 100px;\n  margin-right: 10px;\n  font-size: 12px;\n  border-radius: 14px;\n  box-sizing: border-box;\n  padding: 0 10px;\n  background: var(--background-color);\n  color: var(--color);\n  border: 1px solid var(--border-color);\n}\n\n.xndatepicker .month-info:hover {\n  cursor: pointer;\n  color: var(--title-hover-color);\n}\n\n/*.xndatepicker.week .shortcut,.xndatepicker.year .shortcut,.xndatepicker.yearrange .shortcut{*/\n/*\tdisplay: none;*/\n/*}*/\n.xndatepicker .xntriangle {\n  display: block;\n  width: 12px;\n  height: 12px;\n  background: var(--background-color);\n  position: absolute;\n  border: 1px solid var(--border-color);\n  transform: rotate(45deg);\n}\n\n.xndatepicker .is-today:after {\n  content: \"\";\n  display: block;\n  width: 10px;\n  height: 3px;\n  background: #cf3824;\n  position: absolute;\n  bottom: 0;\n  left: calc(50% - 5px);\n}\n\n.xndatepicker .is-today {\n  font-weight: bold;\n}\n\n.xndatepicker.multiple .day-item {\n  border-radius: 4px !important;\n  flex: 0 0 30px;\n  width: 30px;\n  margin: 1px;\n}\n\n/*!*theme blue*!*/\n/*.xndatepicker.blue, .xndatepicker.blue .xntimepicker {*/\n/*    background: #002651;*/\n/*    color: #fff;*/\n/*    border-color: #11345b;*/\n/*}*/\n/*.xndatepicker.blue .xntriangle {*/\n/*    background: #002651;*/\n/*}*/\n/*.xndatepicker.blue .shortcut li {*/\n/*    color: #8c9fc0;*/\n/*    border-bottom: 1px solid #11345b;*/\n/*}*/\n/*.xndatepicker.blue .date-main, .xndatepicker.blue .year-picker, .xndatepicker.blue .xn-bottom, .xndatepicker.blue .xn-bottom > a, .xndatepicker.blue .xn-bottom > a.confirm-date, .xndatepicker.blue .xntriangle, .xndatepicker.blue .date-item {*/\n/*    border-color: #11345b;*/\n/*}*/\n/*.xndatepicker.blue .dater > span.active-day, .xndatepicker.blue .xntimepicker ul li {*/\n/*    color: #fff;*/\n/*}*/\n/*.xndatepicker.blue .week {*/\n/*    color: #66a6ef;*/\n/*}*/\n/*.xndatepicker.blue .timeitem .timecont, .xndatepicker.blue .timeitem > input {*/\n/*    background: #10529d;*/\n/*    border-color: #11345b;*/\n/*    color: #fff;*/\n/*}*/\n/*.xndatepicker.blue.week .dater > span.active-day:hover,*/\n/*.xndatepicker.blue.week .dater > .hover,*/\n/*.xndatepicker.blue .dater > .active-day.hover,*/\n/*.xndatepicker.blue .month-item.hover,*/\n/*.xndatepicker.blue .year-item.hover,*/\n/*.xndatepicker.blue .week-item.hover {*/\n/*    background: rgb(5 51 103);*/\n/*    color: #7daeff;*/\n/*}*/\n/*.xndatepicker.blue .cur-date, .xndatepicker.blue .hover.cur-date, .xndatepicker.blue .dater > span.cur-date.hover {*/\n/*    background: #2264d1;*/\n/*    color: #fff;*/\n/*}*/\n/*!*theme orange*!*/\n/*.xndatepicker.orange, .xndatepicker.orange .xntimepicker {*/\n/*    background: #fff;*/\n/*    !*color: #fff;*!*/\n/*    !*border-color: #fff;*!*/\n/*}*/\n/*!*.xndatepicker.orange .xntriangle {*!*/\n/*!*    background: #D32F2F;*!*/\n/*!*}*!*/\n/*.xndatepicker.orange .shortcut li {*/\n/*    color: #F44336;*/\n/*    border-bottom: 1px solid #fae2e1;*/\n/*}*/\n/*.xndatepicker.orange .date-main, .xndatepicker.orange .year-picker, .xndatepicker.orange .xn-bottom, .xndatepicker.orange .xn-bottom > a, .xndatepicker.orange .xn-bottom > a.confirm-date, .xndatepicker.orange .xntriangle, .xndatepicker.orange .date-item {*/\n/*    border-color: #fae2e1;*/\n/*}*/\n/*.xndatepicker.orange .dater > span.active-day, .xndatepicker.orange .xntimepicker ul li {*/\n/*    !*color: #fff;*!*/\n/*}*/\n/*.xndatepicker.orange .week {*/\n/*    color: #ff5300;*/\n/*}*/\n/*.xndatepicker.orange .timeitem .timecont, .xndatepicker.orange .timeitem > input {*/\n/*    !*background: #F44336;*!*/\n/*    border-color:#fae2e1;*/\n/*    color: #F44336;*/\n/*}*/\n/*.xndatepicker.orange.week .dater > span.active-day:hover,*/\n/*.xndatepicker.orange.week .dater > .hover,*/\n/*.xndatepicker.orange .dater > .active-day.hover,*/\n/*.xndatepicker.orange .month-item.hover,*/\n/*.xndatepicker.orange .year-item.hover,*/\n/*.xndatepicker.orange .week-item.hover {*/\n/*    background: #ff5300;*/\n/*    color: #FFCDD2;*/\n/*}*/\n/*.xndatepicker.orange .cur-date, .xndatepicker.orange .hover.cur-date, .xndatepicker.orange .dater > span.cur-date.hover {*/\n/*    background: #ff5300;*/\n/*    color: #fff;*/\n/*}*/\n/*.xndatepicker.orange .dater > span.active-day:hover {*/\n/*    background: #ff5300;*/\n/*}*/\n/*.xndatepicker.orange .xn-bottom > a.confirm-date {*/\n/*    background: #ff5300;*/\n/*}*/\n/*.xndatepicker.orange .next, .xndatepicker.orange .prev {*/\n/*    color: #ff5300;*/\n/*}*/\n/*.xndatepicker.orange .next > span:hover, .xndatepicker.orange .prev > span:hover {*/\n/*    color: #ff0000;*/\n/*}*/\n/*.xndatepicker.orange .year-info span:hover {*/\n/*    color: #ffdccb;*/\n/*}*/\n/*.xndatepicker.orange .year-list .year-item:hover, .xndatepicker.orange .month-list .month-item:hover, .xndatepicker.orange .weeknum-list .week-item:hover {*/\n/*    background: #ff5300;*/\n/*}*/\n.xndatepicker-animate {\n  -webkit-animation: ani 0.1s;\n          animation: ani 0.1s;\n  transform-origin: bottom;\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n}\n\n.xndatepicker-animate-out {\n  -webkit-animation: ani-out 0.1s;\n          animation: ani-out 0.1s;\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n}\n\n@-webkit-keyframes ani {\n  0% {\n    transform: scaleY(0);\n  }\n  100% {\n    transform: scaleY(1);\n  }\n}\n\n@keyframes ani {\n  0% {\n    transform: scaleY(0);\n  }\n  100% {\n    transform: scaleY(1);\n  }\n}\n@-webkit-keyframes ani-out {\n  0% {\n    transform: scaleY(1);\n  }\n  100% {\n    transform: scaleY(0);\n  }\n}\n@keyframes ani-out {\n  0% {\n    transform: scaleY(1);\n  }\n  100% {\n    transform: scaleY(0);\n  }\n}\n.weeknum-list::-webkit-scrollbar {\n  /*滚动条整体样式*/\n  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/\n  height: 1px;\n}\n\n.weeknum-list::-webkit-scrollbar-thumb {\n  /*滚动条里面小方块*/\n  border-radius: 10px;\n  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: #535353;\n}\n\n.weeknum-list::-webkit-scrollbar-track {\n  /*滚动条里面轨道*/\n  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  border-radius: 10px;\n  background: #ededed;\n}\n\n.xntimepicker .time-picker .time-cont ul::-webkit-scrollbar {\n  /*滚动条整体样式*/\n  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/\n  height: 1px;\n}\n\n.xntimepicker .time-picker .time-cont ul::-webkit-scrollbar-thumb {\n  /*滚动条里面小方块*/\n  border-radius: 10px;\n  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: #535353;\n}\n\n.xntimepicker .time-picker .time-cont ul::-webkit-scrollbar-track {\n  /*滚动条里面轨道*/\n  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  border-radius: 10px;\n  background: #ededed;\n}";
    styleInject(css_248z$1);

    var css_248z = "@font-face {\n  font-family: \"iconfont-xndatepicker\"; /* Project id 2213760 */\n  src: url(\"https://qiniu.canyuegongzi.xyz/iconfont.1655025754402.woff\") format(\"woff\"), url(\"https://qiniu.canyuegongzi.xyz/iconfont.1655025754402.woff\") format(\"truetype\");\n}\n.iconfont-xndatepicker {\n  font-family: \"iconfont-xndatepicker\" !important;\n  font-size: 16px;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.icon-xndatepickershanchu:before {\n  content: \"\\e609\";\n  color: #c0c4cc;\n}\n\n.icon-xndatepickerrili:before {\n  content: \"\\e673\";\n  color: #c0c4cc;\n}\n\n.icon-xndatepickerprev1:before {\n  content: \"\\e600\";\n  color: #303133;\n}\n\n.icon-xndatepickerprev:before {\n  content: \"\\e601\";\n  color: #303133;\n}";
    styleInject(css_248z);

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

    function newEval(fn) {
        var Fn = Function;
        return new Fn('return ' + fn)();
    }

    var readyCallbacks = [];
    document.addEventListener('DOMContentLoaded', function () {
        readyCallbacks.forEach(function (callback) {
            callback();
        });
    });

    var WuDatePicker = /** @class */ (function (_super) {
        __extends(WuDatePicker, _super);
        function WuDatePicker() {
            return _super.call(this) || this;
        }
        WuDatePicker.prototype.connected = function (shadowRoot) {
            this.mountPicker();
        };
        WuDatePicker.prototype.disConnected = function () {
            var _a;
            (_a = this.picker) === null || _a === void 0 ? void 0 : _a.destroy();
        };
        WuDatePicker.prototype.change = function (data) {
            return data;
        };
        WuDatePicker.prototype.mountPicker = function () {
            var that = this;
            var options = this.options;
            // 数据降级处理
            if (typeof this.options === 'string' && this.default.indexOf('{') > -1 && this.default.indexOf('}') > -1) {
                try {
                    this.options = JSON.parse(this.options);
                }
                catch (e) {
                    // @ts-ignore
                    this.options = newEval(this.options);
                }
            }
            options.type = this.type || options.type;
            if (typeof this.default === "string" && this.default.indexOf('[') > -1 && this.default.indexOf(']') > -1) {
                this.default = newEval(this.default);
            }
            if (Array.isArray(this.default)) {
                if (this.default.length === 2) {
                    options.startTime = this.default[0];
                    options.endTime = this.default[1];
                }
                if (this.default.length === 1) {
                    options.startTime = this.default[0];
                }
            }
            else {
                options.startTime = this.default;
            }
            // 處理日期选择的
            if (options.type === 'datetime' || options.type === 'datetimerange') {
                options.showBottomButton = true;
            }
            this.picker = new DatePicker(this.shadowRoot.querySelector("#dataPicker"), options, function (data) {
                that.change(data);
            });
        };
        WuDatePicker.prototype.disabledChange = function (val, old) { };
        WuDatePicker.prototype.valueChange = function (newValue, oldValue) {
            var _a, _b;
            var startTime, endTime;
            if (Array.isArray(newValue)) {
                if (newValue.length === 2) {
                    startTime = newValue[0];
                    endTime = newValue[1];
                }
                if (newValue.length === 1) {
                    startTime = newValue[0];
                    endTime = '';
                }
            }
            else {
                startTime = newValue;
                endTime = '';
            }
            (_b = (_a = this.picker) === null || _a === void 0 ? void 0 : _a.resetDate) === null || _b === void 0 ? void 0 : _b.call(_a, startTime, endTime);
        };
        WuDatePicker.prototype.render = function (_renderProps, _store) {
            var _a;
            return (webCorePlus.h("div", __assign({ class: "wu-data-picker", id: "dataPicker" }, extractClass({}, 'wu-data-picker', (_a = {},
                _a['wu-data-picker-' + this.size] = this.size,
                _a['is-disabled'] = this.disabled,
                _a)))));
        };
        __decorate([
            webCorePlus.Prop({ default: '' }),
            __metadata("design:type", Object)
        ], WuDatePicker.prototype, "default", void 0);
        __decorate([
            webCorePlus.Prop({ default: 'date', type: String }),
            __metadata("design:type", String)
        ], WuDatePicker.prototype, "type", void 0);
        __decorate([
            webCorePlus.Prop({ default: 'mini', type: String }),
            __metadata("design:type", String)
        ], WuDatePicker.prototype, "size", void 0);
        __decorate([
            webCorePlus.Prop({ default: false, type: Boolean }),
            __metadata("design:type", Boolean)
        ], WuDatePicker.prototype, "disabled", void 0);
        __decorate([
            webCorePlus.Prop({
                default: {
                    type: 'date',
                    multipleDates: [],
                    startTime: dayjs().format('YYYY-MM-DD'),
                    endTime: dayjs().format('YYYY-MM-DD'),
                    maxDate: '',
                    separator: ' 到 ',
                    showType: 'modal',
                    linkPanels: false,
                    showClear: true,
                    autoConfirm: true,
                    showShortKeys: false,
                    shortList: [],
                    showBottomButton: false,
                    autoFillDate: true,
                    disableDate: function (date, dayjs, calcType) {
                        return false;
                    },
                },
                type: Object
            }),
            __metadata("design:type", Object)
        ], WuDatePicker.prototype, "options", void 0);
        __decorate([
            webCorePlus.Emit("change"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], WuDatePicker.prototype, "change", null);
        __decorate([
            webCorePlus.Prop({ default: '60px', type: String }),
            __metadata("design:type", String)
        ], WuDatePicker.prototype, "height", void 0);
        __decorate([
            webCorePlus.Watch("disabled"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Boolean, Boolean]),
            __metadata("design:returntype", void 0)
        ], WuDatePicker.prototype, "disabledChange", null);
        __decorate([
            webCorePlus.Watch("value"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object, Object]),
            __metadata("design:returntype", void 0)
        ], WuDatePicker.prototype, "valueChange", null);
        WuDatePicker = __decorate([
            webCorePlus.Component({
                name: 'wu-plus-date-picker',
                css: css_248z$3 + css_248z$2 + css_248z$1 + css_248z
            }),
            __metadata("design:paramtypes", [])
        ], WuDatePicker);
        return WuDatePicker;
    }(webCorePlus.WuComponent));

    exports.WuDatePicker = WuDatePicker;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
