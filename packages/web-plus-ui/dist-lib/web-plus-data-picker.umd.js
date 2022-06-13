(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.WebUIPlus = {}));
})(this, (function (exports) { 'use strict';

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

    var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var dayjs_min = {exports: {}};

    (function (module, exports) {
    !function(t,e){module.exports=e();}(commonjsGlobal$1,function(){var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,c=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return +(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return {M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else {var i=t.name;M[i]=t,r=i;}return !n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t);}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},$.$utils=function(){return g},$.isValid=function(){return !("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return "Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])};}),v.extend=function(t,e){return t.$i||(t(e,S,v),t.$i=!0),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});
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
            var wwidth = document.documentElement.clientWidth;
            // const wheight=document.documentElement.clientHeight;
            var curcolordom = this.$targetDom.get(0);
            var top = curcolordom.getBoundingClientRect().top;
            var targetLeft = curcolordom.getBoundingClientRect().left;
            var left = targetLeft;
            var targetWidth = this.$targetDom.outerWidth();
            var targetHeight = this.$targetDom.outerHeight();
            var domwidth = this.$container.outerWidth();
            // const domheight=this.$container.outerHeight();
            top = top + targetHeight + 8;
            if (left + domwidth > wwidth) {
                left = targetWidth + targetLeft - domwidth;
            }
            this.$container.get(0).style.top = top + 'px';
            this.$container.get(0).style.left = left + 'px';
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
    !function(e,t){module.exports=t();}(commonjsGlobal$1,function(){return function(e,t){t.prototype.isSameOrBefore=function(e,t){return this.isSame(e,t)||this.isBefore(e,t)};}});
    }(isSameOrBefore$1));

    var isSameOrBefore = isSameOrBefore$1.exports;

    var isSameOrAfter$1 = {exports: {}};

    (function (module, exports) {
    !function(e,t){module.exports=t();}(commonjsGlobal$1,function(){return function(e,t){t.prototype.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)};}});
    }(isSameOrAfter$1));

    var isSameOrAfter = isSameOrAfter$1.exports;

    var isoWeeksInYear$1 = {exports: {}};

    (function (module, exports) {
    !function(e,n){module.exports=n();}(commonjsGlobal$1,function(){return function(e,n){n.prototype.isoWeeksInYear=function(){var e=this.isLeapYear(),n=this.endOf("y").day();return 4===n||e&&5===n?53:52};}});
    }(isoWeeksInYear$1));

    var isoWeeksInYear = isoWeeksInYear$1.exports;

    var weekOfYear = {exports: {}};

    (function (module, exports) {
    !function(e,t){module.exports=t();}(commonjsGlobal$1,function(){var e="week",t="year";return function(i,n,r){var f=n.prototype;f.week=function(i){if(void 0===i&&(i=null),null!==i)return this.add(7*(i-this.week()),"day");var n=this.$locale().yearStart||1;if(11===this.month()&&this.date()>25){var f=r(this).startOf(t).add(1,t).date(n),s=r(this).endOf(e);if(f.isBefore(s))return 1}var a=r(this).startOf(t).date(n).startOf(e).subtract(1,"millisecond"),d=this.diff(a,e,!0);return d<0?r(this).startOf("week").week():Math.ceil(d)},f.weeks=function(e){return void 0===e&&(e=null),this.week(e)};}});
    }(weekOfYear));

    var WeekOfYear = weekOfYear.exports;

    var isLeapYear$1 = {exports: {}};

    (function (module, exports) {
    !function(e,t){module.exports=t();}(commonjsGlobal$1,function(){return function(e,t){t.prototype.isLeapYear=function(){return this.$y%4==0&&this.$y%100!=0||this.$y%400==0};}});
    }(isLeapYear$1));

    var isLeapYear = isLeapYear$1.exports;

    var advancedFormat$1 = {exports: {}};

    (function (module, exports) {
    !function(e,t){module.exports=t();}(commonjsGlobal$1,function(){return function(e,t,r){var n=t.prototype,a=n.format;r.en.ordinal=function(e){var t=["th","st","nd","rd"],r=e%100;return "["+e+(t[(r-20)%10]||t[r]||t[0])+"]"},n.format=function(e){var t=this,r=this.$locale(),n=this.$utils(),s=(e||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(e){switch(e){case"Q":return Math.ceil((t.$M+1)/3);case"Do":return r.ordinal(t.$D);case"gggg":return t.weekYear();case"GGGG":return t.isoWeekYear();case"wo":return r.ordinal(t.week(),"W");case"w":case"ww":return n.s(t.week(),"w"===e?1:2,"0");case"W":case"WW":return n.s(t.isoWeek(),"W"===e?1:2,"0");case"k":case"kk":return n.s(String(0===t.$H?24:t.$H),"k"===e?1:2,"0");case"X":return Math.floor(t.$d.getTime()/1e3);case"x":return t.$d.getTime();case"z":return "["+t.offsetName()+"]";case"zzz":return "["+t.offsetName("long")+"]";default:return e}});return a.bind(this)(s)};}});
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
    // DOM properties that should NOT have "px" added when numeric
    var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
    var PROP_META_KEY = Symbol('PROP_META_KEY');
    var STATE_META_KEY = Symbol('STATE_META_KEY');
    var COMPONENT_CUSTOM_EVENT = Symbol('COMPONENT_CUSTOM_EVENT');
    var COMPONENT_CUSTOM_INJECT = Symbol('COMPONENT_CUSTOM_INJECT');
    var COMPONENT_CUSTOM_PROVIDE = Symbol('COMPONENT_CUSTOM_PROVIDE');
    var COMPONENT_WATCH = Symbol('COMPONENT_WATCH');

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
    var PropsReactive = /** @class */ (function () {
        function PropsReactive(vm, propsList, watchList) {
            if (propsList === void 0) { propsList = []; }
            if (watchList === void 0) { watchList = []; }
            var _a, _b;
            this.vm = vm;
            this.propsList = propsList.length ? propsList : (_a = Reflect.getMetadata(PROP_META_KEY, this.vm)) !== null && _a !== void 0 ? _a : [];
            this.watchList = watchList.length ? watchList : (_b = Reflect.getMetadata(COMPONENT_WATCH, this.vm)) !== null && _b !== void 0 ? _b : [];
            this.observerProps();
        }
        /**
         * 过滤 PROP 对应的 watch
         * @private
         */
        PropsReactive.prototype.watchCallback = function () {
            var functions = this.watchList;
            var keys = this.propsList;
            var onlyFunctions = [];
            var _loop_1 = function (i) {
                var current = keys.find(function (item) { return item.attr === functions[i].path; });
                if (current) {
                    onlyFunctions.push(functions[i]);
                }
            };
            for (var i = 0; i < functions.length; i++) {
                _loop_1(i);
            }
            return onlyFunctions;
        };
        /**
         * PROP 响应式处理
         * @private
         */
        PropsReactive.prototype.observerProps = function () {
            var propsList = this.propsList;
            var propsData = {};
            this.observe(propsData);
            var watchHandlers = this.watchCallback();
            var that = this;
            var _loop_2 = function (i) {
                propsData[propsList[i].attr] = propsList[i].default;
                var key = propsList[i].attr;
                Object.defineProperty(this_1.vm, key, {
                    get: function () {
                        return this.$props[key];
                    },
                    set: function (value) {
                        var _this = this;
                        var watchs = watchHandlers.filter(function (item) { return item.path === key; });
                        if (watchs.length) {
                            watchs.forEach(function (item) {
                                item.callback.call(that.vm, value, _this.$props[key]);
                            });
                        }
                        this.$props[key] = value;
                    }
                });
            };
            var this_1 = this;
            for (var i = 0; i < propsList.length; i++) {
                _loop_2(i);
            }
        };
        /**
         * 所有 PROP 挂载对应的 $props 中
         * @param data
         * @private
         */
        PropsReactive.prototype.observe = function (data) {
            var _this = this;
            if (data === void 0) { data = {}; }
            if (typeof data !== 'object') {
                return data;
            }
            Object.keys(data).forEach(function (key) {
                data[key] = _this.observe(data[key]);
            });
            return this.defineReactive(data);
        };
        /**
         * 多层对象递归处理成响应式
         * @param data
         * @private
         */
        PropsReactive.prototype.defineReactive = function (data) {
            if (data === void 0) { data = {}; }
            var that = this;
            this.vm.$props = new Proxy(data, {
                get: function (target, key) {
                    return Reflect.get(target, key);
                },
                set: function (target, key, value) {
                    if (target[key] === value) {
                        return Reflect.set(target, key, value);
                    }
                    var res = Reflect.set(target, key, value);
                    that.vm.update.call(that.vm, res);
                    return res;
                }
            });
            return this.vm.$props;
        };
        return PropsReactive;
    }());

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

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

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
     * 像外抛出自定义事件
     * @param event
     * @constructor
     */
    function Emit(event) {
        return function (target, methodName, desc) {
            var _a;
            var functions = (_a = Reflect.getMetadata(COMPONENT_CUSTOM_EVENT, target)) !== null && _a !== void 0 ? _a : [];
            var methodFun = desc.value;
            var eventName = event ? event : toDotCase(methodName);
            functions.push({ methodName: methodName, methodFun: methodFun, eventName: eventName });
            Reflect.defineMetadata(COMPONENT_CUSTOM_EVENT, functions, target);
        };
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
    /**
     * PROP 响应式处理
     */
    var StatesReactive = /** @class */ (function () {
        function StatesReactive(vm, statesList, watchList) {
            if (statesList === void 0) { statesList = []; }
            if (watchList === void 0) { watchList = []; }
            var _a, _b;
            this.vm = vm;
            this.statesList = statesList.length ? statesList : (_a = Reflect.getMetadata(STATE_META_KEY, this.vm)) !== null && _a !== void 0 ? _a : [];
            this.watchList = watchList.length ? watchList : (_b = Reflect.getMetadata(COMPONENT_WATCH, this.vm)) !== null && _b !== void 0 ? _b : [];
            this.observerStates();
        }
        /**
         * 过滤 PROP 对应的 watch
         * @private
         */
        StatesReactive.prototype.watchCallback = function () {
            var functions = this.watchList;
            var keys = this.statesList;
            var onlyFunctions = [];
            var _loop_1 = function (i) {
                var current = keys.find(function (item) { return item.attr === functions[i].path; });
                if (current) {
                    onlyFunctions.push(functions[i]);
                }
            };
            for (var i = 0; i < functions.length; i++) {
                _loop_1(i);
            }
            return onlyFunctions;
        };
        /**
         * PROP 响应式处理
         * @private
         */
        StatesReactive.prototype.observerStates = function () {
            var statesList = this.statesList;
            var statesData = {};
            this.observe(statesData);
            var watchHandlers = this.watchCallback();
            var that = this;
            var _loop_2 = function (i) {
                statesData[statesList[i].attr] = statesList[i].default;
                var key = statesList[i].attr;
                Object.defineProperty(this_1.vm, key, {
                    get: function () {
                        return this.$states[key];
                    },
                    set: function (value) {
                        var _this = this;
                        var watchs = watchHandlers.filter(function (item) { return item.path === key; });
                        if (watchs.length) {
                            watchs.forEach(function (item) {
                                item.callback.call(that.vm, value, _this.$states[key]);
                            });
                        }
                        this.$states[key] = value;
                    }
                });
            };
            var this_1 = this;
            for (var i = 0; i < statesList.length; i++) {
                _loop_2(i);
            }
        };
        /**
         * 所有 PROP 挂载对应的 $states 中
         * @param data
         * @private
         */
        StatesReactive.prototype.observe = function (data) {
            var _this = this;
            if (data === void 0) { data = {}; }
            if (typeof data !== 'object') {
                return data;
            }
            Object.keys(data).forEach(function (key) {
                data[key] = _this.observe(data[key]);
            });
            return this.defineReactive(data);
        };
        /**
         * 多层对象递归处理成响应式
         * @param data
         * @private
         */
        StatesReactive.prototype.defineReactive = function (data) {
            if (data === void 0) { data = {}; }
            var that = this;
            this.vm.$states = new Proxy(data, {
                get: function (target, key) {
                    return Reflect.get(target, key);
                },
                set: function (target, key, value) {
                    if (target[key] === value) {
                        return Reflect.set(target, key, value);
                    }
                    var res = Reflect.set(target, key, value);
                    that.vm.update.call(that.vm, res);
                    return res;
                }
            });
            return this.vm.$states;
        };
        return StatesReactive;
    }());

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

    function define(options, ctor) {
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
            if (val && typeof val === 'object') {
                _super.prototype.setAttribute.call(this, key, JSON.stringify(val));
            }
            else {
                _super.prototype.setAttribute.call(this, key, val);
            }
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
            if (Array.isArray(this.rootNode)) {
                this.rootNode.forEach(function (item) { return shadowRoot.appendChild(item); });
            }
            else {
                this.rootNode && shadowRoot.appendChild(this.rootNode);
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

    var css_248z$3 = ":host {\n  display: block;\n}";
    styleInject(css_248z$3);

    var css_248z$2 = ":host {\n  display: block;\n}\n\n.xndatepicker a, .xndatepicker a:hover {\n  text-decoration: none;\n}\n\n.xndatepicker a {\n  text-decoration: none;\n}\n\n.xndatepicker ol, .xndatepicker ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.xndatepicker, .xndatepicker-mobile-outer {\n  --background-color:#fff;\n  --primary-color:#409eff;\n  --border-color:#f2f2f2;\n  --disable-color:#ccc;\n  --color:#333;\n  --hover-background:#409eff;\n  --hover-color:#fff;\n  --week-color:#666;\n  --shortcut-color:#409eff;\n  --shortcut-hover-color:#409eff;\n  --title-color:#333;\n  --title-hover-color:#409eff;\n  --prev-hover-color:#409eff;\n  --range-background:rgb(233, 241, 255);\n  --range-hover-color:#333;\n}\n\n.xndatepicker.blue, .xndatepicker-mobile-outer.blue {\n  --background-color:#409eff;\n  --primary-color:#409eff;\n  --border-color:#409eff;\n  --disable-color:#838282;\n  --color:#fff;\n  --hover-background:#2979ff;\n  --hover-color:#fff;\n  --week-color:#fff;\n  --shortcut-color:#fff;\n  --shortcut-hover-color:#409eff;\n  --title-color:#fff;\n  --title-hover-color:#409eff;\n  --prev-hover-color:#409eff;\n  --range-background: rgb(24 52 101);\n  --range-hover-color:#a2bce5;\n}\n\n.xndatepicker.orange, .xndatepicker-mobile-outer.orange {\n  --background-color:#fff;\n  --primary-color:#ff7431;\n  --border-color:#f2f2f2;\n  --disable-color:#ccc;\n  --color:#333;\n  --hover-background:#f8621a;\n  --hover-color:#fff;\n  --week-color:#666;\n  --shortcut-color:#f8621a;\n  --shortcut-hover-color:#ff7431;\n  --title-color:#333;\n  --title-hover-color:#ff7431;\n  --prev-hover-color:#ff7431;\n  --range-background:rgb(255 239 232);\n  --range-hover-color:#333;\n}\n\n.xndatepicker.pink, .xndatepicker-mobile-outer.pink {\n  --background-color:#fff;\n  --primary-color:#d06396;\n  --border-color:#f2f2f2;\n  --disable-color:#ccc;\n  --color:#333;\n  --hover-background:#f48fbf;\n  --hover-color:#fff;\n  --week-color:#666;\n  --shortcut-color:#d06396;\n  --shortcut-hover-color:#f48fbf;\n  --title-color:#333;\n  --title-hover-color:#f48fbf;\n  --prev-hover-color:#f48fbf;\n  --range-background:#fef4f9;\n  --range-hover-color:#333;\n}\n\n.xndatepicker.green, .xndatepicker-mobile-outer.green {\n  --background-color:#fff;\n  --primary-color:#42a148;\n  --border-color:#f2f2f2;\n  --disable-color:#ccc;\n  --color:#333;\n  --hover-background:#73bb77;\n  --hover-color:#fff;\n  --week-color:#666;\n  --shortcut-color:#42a148;\n  --shortcut-hover-color:#73bb77;\n  --title-color:#333;\n  --title-hover-color:#73bb77;\n  --prev-hover-color:#73bb77;\n  --range-background:#ddedde;\n  --range-hover-color:#333;\n}";
    styleInject(css_248z$2);

    var css_248z$1 = ".xndatepicker-pc-input {\n  min-width: 60px;\n  display: flex;\n  align-items: center;\n}\n\n.xndatepicker-pc-input > div {\n  position: relative;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  /*width: 100%;*/\n  /*overflow: hidden;*/\n}\n\n.xndatepicker-pc-input > span {\n  padding: 0 10px;\n}\n\n.xndatepicker-pc-input .input {\n  padding: 0 10px;\n  /*width: 100%;*/\n  /*overflow: hidden;*/\n  /*text-overflow: ellipsis;*/\n}\n\n.xndatepicker-pc-input .input:empty:before {\n  content: attr(data-placeholder);\n}\n\n/*.xndatepicker-pc-input:hover .clear-btn{*/\n/*    display: block;*/\n/*}*/\n.xndatepicker-pc-input:hover > div:before {\n  display: none;\n}\n\n.xndatepicker-pc-input > div > i.clear-btn {\n  display: none;\n}\n\n.xndatepicker-pc-input > div:hover i.clear-btn {\n  display: block;\n}\n\n.xndatepicker-pc-input > div:hover i.date-icon {\n  display: none;\n}\n\n.xndatepicker {\n  font-size: 14px;\n  line-height: 26px;\n  background: var(--background-color);\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  display: none;\n  position: fixed;\n  top: 100px;\n  left: 100px;\n  border-radius: 4px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  z-index: 999;\n}\n\n.xndatepicker-input.icon-xndatepickerrili {\n  padding-right: 30px;\n}\n\n.xndatepicker-input.icon-xndatepickerrili:before {\n  position: absolute;\n  right: 10px;\n}\n\n.xndatepicker-input:empty:after {\n  content: attr(data-placeholder);\n}\n\n.xndatepicker .xn-top {\n  display: flex;\n  align-items: flex-start;\n}\n\n.xndatepicker .xn-bottom {\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  justify-content: flex-end;\n  line-height: 31px;\n  font-size: 12px;\n}\n\n.xndatepicker .xn-bottom > a {\n  padding: 0 20px;\n  cursor: pointer;\n  border-left: 1px solid var(--border-color);\n}\n\n.xndatepicker .xn-bottom > a.confirm-date {\n  background: var(--primary-color);\n  color: var(--hover-color);\n  border-radius: 0 0 4px;\n}\n\n.xndatepicker .xn-bottom > a.confirm-date:hover {\n  background: var(--hover-background);\n}\n\n.xndatepicker .shortcut {\n  padding: 10px;\n  line-height: 36px;\n  white-space: nowrap;\n  font-size: 12px;\n  padding-top: 0;\n}\n\n.xndatepicker .shortcut li {\n  cursor: pointer;\n  color: var(--shortcut-color);\n  border-bottom: 1px solid var(--border-color);\n  padding: 0 10px;\n}\n\n.xndatepicker .shortcut li:hover {\n  color: var(--shortcut-hover-color);\n}\n\n.xndatepicker .date-main {\n  border-left: 1px solid var(--border-color);\n}\n\n.xndatepicker .timepicker {\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid var(--border-color);\n  line-height: 34px;\n  font-size: 12px;\n}\n\n.xndatepicker .datepicker {\n  display: flex;\n  align-items: flex-start;\n}\n\n.xndatepicker .timepicker > div {\n  flex: 1;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 6px 0;\n}\n\n.xndatepicker .dater > span {\n  width: 36px;\n  text-align: center;\n  color: var(--disable-color);\n}\n\n.xndatepicker .dater > span.active-day {\n  color: var(--color);\n  cursor: pointer;\n}\n\n.xndatepicker .date-main .datepicker .dater > .day-item {\n  border-radius: 50%;\n  cursor: pointer;\n}\n\n.xndatepicker .dater > span.active-day.disable-day:hover {\n  cursor: not-allowed;\n  background: none;\n  color: var(--color);\n}\n\n.xndatepicker .dater > span.active-day.cur-date {\n  color: var(--hover-color);\n}\n\n.xndatepicker .cur-date {\n  border-radius: 4px 0 0 4px;\n}\n\n.xndatepicker .cur-date.right-date {\n  border-radius: 0 4px 4px 0;\n}\n\n.xndatepicker .cur-date.circle-date {\n  border-radius: 4px;\n}\n\n.xndatepicker .cur-date.circle-date.year-item, .xndatepicker .cur-date.circle-date.month-item {\n  border-radius: 4px;\n}\n\n.xndatepicker .dater > span.active-day:hover {\n  background: var(--hover-background);\n  color: var(--hover-color);\n  border-radius: 2px;\n}\n\n.xndatepicker .week {\n  display: flex;\n  align-items: center;\n  margin-bottom: 4px;\n  color: var(--week-color);\n  font-size: 12px;\n}\n\n.xndatepicker .week span {\n  width: 40px;\n  text-align: center;\n  display: inline-block;\n}\n\n.xndatepicker .year-picker {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 6px;\n  line-height: 45px;\n  border-bottom: 1px solid var(--border-color);\n  color: var(--title-color);\n}\n\n.xndatepicker .date-item {\n  border-left: 1px solid var(--border-color);\n  padding: 10px;\n  width: 280px;\n  padding-top: 0;\n}\n\n.xndatepicker .date-item:first-child {\n  border: 0;\n}\n\n.xndatepicker .year-info span {\n  cursor: pointer;\n  margin: 0 2px;\n  letter-spacing: 1px;\n  color: var(--title-color);\n}\n\n.xndatepicker .year-info span:hover {\n  color: var(--title-hover-color);\n}\n\n.xndatepicker .next > span:hover, .xndatepicker .prev > span:hover {\n  color: var(--prev-hover-color);\n  cursor: pointer;\n}\n\n.xndatepicker .next, .xndatepicker .prev {\n  color: var(--primary-color);\n}\n\n.xndatepicker .next span, .xndatepicker .prev span {\n  font-size: 12px;\n}\n\n.xndatepicker .next > span:before {\n  transform: rotate(180deg);\n  transform-origin: center;\n  display: inline-block;\n}\n\n.xndatepicker.week .dater > span.active-day:hover, .xndatepicker.week .dater > .hover, .xndatepicker .dater > .active-day.hover, .month-item.hover, .year-item.hover, .week-item.hover {\n  background: var(--range-background);\n  color: var(--range-hover-color);\n}\n\n.year-list, .month-list {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.year-list .year-item, .month-list .month-item, .weeknum-list .week-item {\n  flex: 0 0 30.3333333333%;\n  width: 30.3333333333%;\n  display: block;\n  height: 40px;\n  line-height: 40px;\n  text-align: center;\n  cursor: pointer;\n  margin-bottom: 2px;\n  margin: 9px 1%;\n  font-size: 12px;\n  position: relative;\n  color: var(--color);\n}\n\n.xndatepicker .cur-date, .xndatepicker .hover.cur-date, .xndatepicker .dater > span.cur-date.hover {\n  background: var(--primary-color);\n  color: #fff;\n}\n\n.weeknum-list .week-item {\n  flex: 0 0 30.3333333333%;\n  width: 30.3333333333%;\n  height: 34px;\n  line-height: 34px;\n  margin: 2px 1%;\n}\n\n.year-list .year-item.disable-year, .month-list .month-item.disable-month, .weeknum-list .week-item.disable-week {\n  color: #ccc;\n}\n\n.year-list .year-item.disable-year:hover, .month-list .month-item.disable-month:hover, .weeknum-list .week-item.disable-week:hover {\n  background: none;\n  color: #ccc;\n}\n\n.year-list .year-item:hover, .month-list .month-item:hover, .weeknum-list .week-item:hover {\n  background: var(--hover-background);\n  color: var(--hover-color);\n  border-radius: 4px;\n}\n\n.datepicker .weeknum-list {\n  max-height: 232px;\n  overflow: auto;\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.xndatepicker .dater {\n  font-size: 12px;\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.xndatepicker .dater > span {\n  flex: 0 0 40px;\n  width: 40px;\n  text-align: center;\n  line-height: 40px;\n  margin: 1px 0;\n  position: relative;\n  overflow: hidden;\n}\n\n.xntimepicker {\n  position: fixed;\n  background: var(--background-color);\n  padding: 10px;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 4px;\n  z-index: 9;\n  padding-bottom: 0;\n}\n\n.xntimepicker div.time-cont {\n  display: flex;\n  justify-content: space-around;\n}\n\n.xntimepicker div.time-btns {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  /*padding: 0 14px;*/\n  font-size: 12px;\n}\n\n.xntimepicker .cur-time {\n  color: var(--primary-color);\n}\n\n.xntimepicker .confirm-time {\n  color: var(--hover-color);\n  line-height: 22px;\n  padding: 0 9px;\n  background: var(--primary-color);\n  border-radius: 2px;\n}\n\n.xntimepicker .confirm-time:hover {\n  background: var(--hover-background);\n}\n\n.xntimepicker ul {\n  height: 180px;\n  overflow: hidden;\n  white-space: nowrap;\n  border-right: 1px solid var(--border-color);\n  border-bottom: 1px solid var(--border-color);\n}\n\n.xntimepicker ul:hover {\n  overflow: auto;\n  overflow: overlay;\n}\n\n.xntimepicker ul:last-child {\n  border-right: 0;\n}\n\n.xntimepicker ul li {\n  padding: 0 24px 0 14px;\n  color: var(--color);\n  line-height: 28px;\n  font-size: 12px;\n  cursor: pointer;\n}\n\n.xntimepicker ul li:hover {\n  background: var(--hover-background);\n  color: var(--hover-color);\n}\n\n.xntimepicker ul li.on {\n  background: var(--primary-color);\n  color: var(--hover-color);\n}\n\n.timeitem .timecont {\n  width: 100px;\n  flex: 0 0 100px;\n  height: 28px;\n  line-height: 28px;\n  text-align: left;\n  padding: 0 6px;\n  box-sizing: border-box;\n  cursor: pointer;\n  position: relative;\n  padding: 0 10px;\n  border-radius: 14px;\n  background: var(--background-color);\n  color: var(--color);\n  border: 1px solid var(--border-color);\n}\n\n.timeitem .timecont > span {\n  line-height: 26px;\n  position: absolute;\n  top: 0;\n}\n\n.timeitem > input {\n  outline: none;\n  line-height: 26px;\n  flex: 0 0 100px;\n  width: 100px;\n  margin-right: 10px;\n  font-size: 12px;\n  border-radius: 14px;\n  box-sizing: border-box;\n  padding: 0 10px;\n  background: var(--background-color);\n  color: var(--color);\n  border: 1px solid var(--border-color);\n}\n\n.xndatepicker .month-info:hover {\n  cursor: pointer;\n  color: var(--title-hover-color);\n}\n\n/*.xndatepicker.week .shortcut,.xndatepicker.year .shortcut,.xndatepicker.yearrange .shortcut{*/\n/*\tdisplay: none;*/\n/*}*/\n.xndatepicker .xntriangle {\n  display: block;\n  width: 12px;\n  height: 12px;\n  background: var(--background-color);\n  position: absolute;\n  border: 1px solid var(--border-color);\n  transform: rotate(45deg);\n}\n\n.xndatepicker .is-today:after {\n  content: \"\";\n  display: block;\n  width: 10px;\n  height: 3px;\n  background: #cf3824;\n  position: absolute;\n  bottom: 0;\n  left: calc(50% - 5px);\n}\n\n.xndatepicker .is-today {\n  font-weight: bold;\n}\n\n.xndatepicker.multiple .day-item {\n  border-radius: 4px !important;\n  flex: 0 0 30px;\n  width: 30px;\n  margin: 1px;\n}\n\n/*!*theme blue*!*/\n/*.xndatepicker.blue, .xndatepicker.blue .xntimepicker {*/\n/*    background: #002651;*/\n/*    color: #fff;*/\n/*    border-color: #11345b;*/\n/*}*/\n/*.xndatepicker.blue .xntriangle {*/\n/*    background: #002651;*/\n/*}*/\n/*.xndatepicker.blue .shortcut li {*/\n/*    color: #8c9fc0;*/\n/*    border-bottom: 1px solid #11345b;*/\n/*}*/\n/*.xndatepicker.blue .date-main, .xndatepicker.blue .year-picker, .xndatepicker.blue .xn-bottom, .xndatepicker.blue .xn-bottom > a, .xndatepicker.blue .xn-bottom > a.confirm-date, .xndatepicker.blue .xntriangle, .xndatepicker.blue .date-item {*/\n/*    border-color: #11345b;*/\n/*}*/\n/*.xndatepicker.blue .dater > span.active-day, .xndatepicker.blue .xntimepicker ul li {*/\n/*    color: #fff;*/\n/*}*/\n/*.xndatepicker.blue .week {*/\n/*    color: #66a6ef;*/\n/*}*/\n/*.xndatepicker.blue .timeitem .timecont, .xndatepicker.blue .timeitem > input {*/\n/*    background: #10529d;*/\n/*    border-color: #11345b;*/\n/*    color: #fff;*/\n/*}*/\n/*.xndatepicker.blue.week .dater > span.active-day:hover,*/\n/*.xndatepicker.blue.week .dater > .hover,*/\n/*.xndatepicker.blue .dater > .active-day.hover,*/\n/*.xndatepicker.blue .month-item.hover,*/\n/*.xndatepicker.blue .year-item.hover,*/\n/*.xndatepicker.blue .week-item.hover {*/\n/*    background: rgb(5 51 103);*/\n/*    color: #7daeff;*/\n/*}*/\n/*.xndatepicker.blue .cur-date, .xndatepicker.blue .hover.cur-date, .xndatepicker.blue .dater > span.cur-date.hover {*/\n/*    background: #2264d1;*/\n/*    color: #fff;*/\n/*}*/\n/*!*theme orange*!*/\n/*.xndatepicker.orange, .xndatepicker.orange .xntimepicker {*/\n/*    background: #fff;*/\n/*    !*color: #fff;*!*/\n/*    !*border-color: #fff;*!*/\n/*}*/\n/*!*.xndatepicker.orange .xntriangle {*!*/\n/*!*    background: #D32F2F;*!*/\n/*!*}*!*/\n/*.xndatepicker.orange .shortcut li {*/\n/*    color: #F44336;*/\n/*    border-bottom: 1px solid #fae2e1;*/\n/*}*/\n/*.xndatepicker.orange .date-main, .xndatepicker.orange .year-picker, .xndatepicker.orange .xn-bottom, .xndatepicker.orange .xn-bottom > a, .xndatepicker.orange .xn-bottom > a.confirm-date, .xndatepicker.orange .xntriangle, .xndatepicker.orange .date-item {*/\n/*    border-color: #fae2e1;*/\n/*}*/\n/*.xndatepicker.orange .dater > span.active-day, .xndatepicker.orange .xntimepicker ul li {*/\n/*    !*color: #fff;*!*/\n/*}*/\n/*.xndatepicker.orange .week {*/\n/*    color: #ff5300;*/\n/*}*/\n/*.xndatepicker.orange .timeitem .timecont, .xndatepicker.orange .timeitem > input {*/\n/*    !*background: #F44336;*!*/\n/*    border-color:#fae2e1;*/\n/*    color: #F44336;*/\n/*}*/\n/*.xndatepicker.orange.week .dater > span.active-day:hover,*/\n/*.xndatepicker.orange.week .dater > .hover,*/\n/*.xndatepicker.orange .dater > .active-day.hover,*/\n/*.xndatepicker.orange .month-item.hover,*/\n/*.xndatepicker.orange .year-item.hover,*/\n/*.xndatepicker.orange .week-item.hover {*/\n/*    background: #ff5300;*/\n/*    color: #FFCDD2;*/\n/*}*/\n/*.xndatepicker.orange .cur-date, .xndatepicker.orange .hover.cur-date, .xndatepicker.orange .dater > span.cur-date.hover {*/\n/*    background: #ff5300;*/\n/*    color: #fff;*/\n/*}*/\n/*.xndatepicker.orange .dater > span.active-day:hover {*/\n/*    background: #ff5300;*/\n/*}*/\n/*.xndatepicker.orange .xn-bottom > a.confirm-date {*/\n/*    background: #ff5300;*/\n/*}*/\n/*.xndatepicker.orange .next, .xndatepicker.orange .prev {*/\n/*    color: #ff5300;*/\n/*}*/\n/*.xndatepicker.orange .next > span:hover, .xndatepicker.orange .prev > span:hover {*/\n/*    color: #ff0000;*/\n/*}*/\n/*.xndatepicker.orange .year-info span:hover {*/\n/*    color: #ffdccb;*/\n/*}*/\n/*.xndatepicker.orange .year-list .year-item:hover, .xndatepicker.orange .month-list .month-item:hover, .xndatepicker.orange .weeknum-list .week-item:hover {*/\n/*    background: #ff5300;*/\n/*}*/\n.xndatepicker-animate {\n  -webkit-animation: ani 0.1s;\n          animation: ani 0.1s;\n  transform-origin: bottom;\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n}\n\n.xndatepicker-animate-out {\n  -webkit-animation: ani-out 0.1s;\n          animation: ani-out 0.1s;\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n}\n\n@-webkit-keyframes ani {\n  0% {\n    transform: scaleY(0);\n  }\n  100% {\n    transform: scaleY(1);\n  }\n}\n\n@keyframes ani {\n  0% {\n    transform: scaleY(0);\n  }\n  100% {\n    transform: scaleY(1);\n  }\n}\n@-webkit-keyframes ani-out {\n  0% {\n    transform: scaleY(1);\n  }\n  100% {\n    transform: scaleY(0);\n  }\n}\n@keyframes ani-out {\n  0% {\n    transform: scaleY(1);\n  }\n  100% {\n    transform: scaleY(0);\n  }\n}";
    styleInject(css_248z$1);

    var css_248z = "@font-face {\n  font-family: \"iconfont-xndatepicker\"; /* Project id 2213760 */\n  src: url(\"https://qiniu.canyuegongzi.xyz/iconfont.1655025754402.woff\") format(\"woff\"), url(\"https://qiniu.canyuegongzi.xyz/iconfont.1655025754402.woff\") format(\"truetype\");\n}\n.iconfont-xndatepicker {\n  font-family: \"iconfont-xndatepicker\" !important;\n  font-size: 16px;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.icon-xndatepickershanchu:before {\n  content: \"\\e609\";\n  color: #c0c4cc;\n}\n\n.icon-xndatepickerrili:before {\n  content: \"\\e673\";\n  color: #c0c4cc;\n}\n\n.icon-xndatepickerprev1:before {\n  content: \"\\e600\";\n  color: #303133;\n}\n\n.icon-xndatepickerprev:before {\n  content: \"\\e601\";\n  color: #303133;\n}";
    styleInject(css_248z);

    var WuDatePicker = /** @class */ (function (_super) {
        __extends$1(WuDatePicker, _super);
        function WuDatePicker() {
            return _super.call(this) || this;
        }
        WuDatePicker.prototype.connected = function (shadowRoot) {
            this.mountPicker();
        };
        WuDatePicker.prototype.disConnected = function () {
            console.log(this.picker);
        };
        WuDatePicker.prototype.change = function (data) {
            console.log(data);
            return data;
        };
        WuDatePicker.prototype.mountPicker = function () {
            var that = this;
            var options = this.options;
            if (Array.isArray(this.value)) {
                if (this.value.length === 2) {
                    options.startTime = this.value[0];
                    options.endTime = this.value[1];
                }
                if (this.value.length === 1) {
                    options.startTime = this.value[0];
                }
            }
            else {
                options.startTime = this.value;
            }
            this.picker = new DatePicker(this.shadowRoot.querySelector("#dataPicker"), options, function (data) {
                console.log(data);
                that.change(data);
            });
        };
        WuDatePicker.prototype.valueChange = function (newValue, oldValue) {
            var _a, _b;
            console.log(newValue);
            console.log(oldValue);
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
            return (h("div", { class: "wu-data-picker", id: "dataPicker" }));
        };
        __decorate([
            Prop({ default: '' }),
            __metadata("design:type", Object)
        ], WuDatePicker.prototype, "value", void 0);
        __decorate([
            Prop({
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
            Emit("change"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], WuDatePicker.prototype, "change", null);
        __decorate([
            Prop({ default: '60px', type: String }),
            __metadata("design:type", String)
        ], WuDatePicker.prototype, "height", void 0);
        __decorate([
            Watch("value"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object, Object]),
            __metadata("design:returntype", void 0)
        ], WuDatePicker.prototype, "valueChange", null);
        WuDatePicker = __decorate([
            Component({
                name: 'wu-plus-date-picker',
                css: css_248z$3 + css_248z$2 + css_248z$1 + css_248z
            }),
            __metadata("design:paramtypes", [])
        ], WuDatePicker);
        return WuDatePicker;
    }(WuComponent));

    exports.WuDatePicker = WuDatePicker;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
