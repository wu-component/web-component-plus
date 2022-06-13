function init(el) {
    if (typeof el == 'string') {
        this.el = this.ConvertToArray(document.querySelectorAll(el));
    }
    if (el instanceof NodeList) {
        this.el = this.ConvertToArray(el);
    } else if (Array.isArray(el)) {
        this.el = el;
    }
    if (el instanceof Node) {
        this.el = [ el ];
    }
    if (!this.el) {
        this.el = [];
    }
}

function XNQuery(el) {
    return new init(el);
}

XNQuery.prototype = init.prototype = {
    length() {
        return this.el.length;
    },
    extend() {
        const length = arguments.length;
        // @ts-ignore
        let copyIsArray;
        let options,
            name,
            src,
            copy,
            clone,
            target = arguments[0] || {}, // 目标对象
            i = 1,
            deep = false;
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
                    if (deep && copy && (typeof copy == 'object' || (copyIsArray = Array.isArray(copy)))) {
                        if (Array.isArray(copy)) {
                            // 处理数组
                            copyIsArray = false;
                            // 如果目标对象不存在该数组，则创建一个空数组；
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && typeof src == 'object' ? src : {};
                        }
                        // 从不改变原始对象，只做拷贝
                        target[name] = this.extend(deep, clone, copy);
                        // 不拷贝undefined值
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        // 返回已经被修改的对象
        return target;
    },
    parent() {
        const el = this.el[0];
        if (el && el.parentNode) {
            return XNQuery([ el.parentNode ]);
        } else {
            return XNQuery([]);
        }
    },
    parents(parentSelector /* optional */) {
        const el = this.el[0];
        if (parentSelector === undefined) {
            parentSelector = [ document ];
        } else {
            parentSelector = this.ConvertToArray(document.querySelectorAll(parentSelector));
        }
        const parents = [];
        if (el) {
            parentSelector.forEach(e => {
                let p = el.parentNode;
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
    reverseArryToNodeList(arry) {
        return arry;
        // @ts-ignore
        const div = document.createElement('div');
        for (let i = 0; i < arry.length; i++) {
            div.appendChild(arry[i]);
        }
        return div.childNodes;
    },
    hasClass(className) {
        if (this.el.length > 0) {
            return this.el[0].classList.contains(className);
        } else {
            return false;
        }
    },
    attr(attr, value) {
        if (value) {
            this.el.forEach(e => {
                e.setAttribute(attr, value);
            });
            return this;
        } else {
            if (!this.el[0]) {
                return null;
            }
            return this.el[0].getAttribute(attr);
        }
    },
    find(query) {
        if (!this.el || this.el.length <= 0) {
            return XNQuery([]);
        }
        if (typeof query != 'string') {
            const list = [];
            this.el.forEach(e => {
                const arry = e.querySelectorAll('*');
                for (let i = 0; i < arry.length; i++) {
                    if (arry[i] == query) {
                        list.push(query);
                    }
                }
            });
            return XNQuery(list);
        } else {
            let list = [];
            this.el.forEach(e => {
                list = list.concat(this.ConvertToArray(e.querySelectorAll(query)));
            });
            return XNQuery(list);
        }
    },
    children(query) {
        if (!this.el || this.el.length <= 0) {
            return XNQuery([]);
        }
        let queryList = [];
        if (Array.isArray(query)) {
            queryList = query;
        }
        let children = [];
        this.el.forEach(e => {
            children = children.concat(this.ConvertToArray(e.children));
            if (typeof query == 'string') {
                queryList = queryList.concat(this.ConvertToArray(e.querySelectorAll(query)));
            }
        });
        const list = [];
        const queryListLength = queryList.length;
        for (let i = 0; i < children.length; i++) {
            const c = children[i];
            for (let j = 0; j < queryListLength; j++) {
                if (queryList[j] == c) {
                    list.push(c);
                    break;
                }
            }
        }
        return XNQuery(list);
    },
    each(callback) {
        return this.el.forEach(callback);
    },
    // @ts-ignore
    index(targetDom) {
        if (!targetDom) {
            const list = this.el[0].parentNode.childNodes;
            for (let i = 0; i < list.length; i++) {
                if (list[i] === this.el[0]) {
                    return i;
                }
            }
            return null;
        } else {
            for (let i = 0; i < this.el.length; i++) {
                if (this.el[i] === targetDom) {
                    return i;
                }
            }
        }
    },
    eq(index) {
        const el = this.el[index];
        if (el) {
            return XNQuery(this.reverseArryToNodeList([ el ]));
        } else {
            return XNQuery(this.reverseArryToNodeList([]));
        }
    },
    get(index) {
        return this.el[index];
    },
    addClass(classname) {
        this.el.forEach(e => {
            if (e.classList) {
                e.classList.add(...classname.split(' '));
            }
        });
    },
    nextUntil(query, isprev = false) {
        const el = this.el[0];
        let next = null;
        if (!el) {
            return XNQuery([]);
        }
        if (!query) {
            next = null;
        } else {
            if (typeof query == 'object' && query instanceof Node) {
                next = query;
            } else {
                next = el.parentNode.querySelector(query);
            }
        }
        const list = [];
        const func = isprev ? 'previousSibling' : 'nextSibling';
        let n = el[func];
        while (n != next && n != null) {
            list.push(n);
            n = n[func];
        }
        return XNQuery(list);
    },
    prevAll() {
        return this.nextUntil(null, true);
    },
    nextAll() {
        return this.nextUntil();
    },
    removeClass(classname) {
        this.el.forEach(e => {
            e.classList.remove(classname);
        });
        return this;
    },
    val(val) {
        if (!val) {
            return this.el[0].value;
        } else {
            this.el.forEach(e => {
                e.value = val;
            });
        }
    },
    html(val) {
        if (!this.el || !this.el[0]) {
            return;
        }
        if (!val) {
            return this.el[0].innerHTML;
        } else {
            this.el.forEach(e => {
                e.innerHTML = val;
            });
        }
    },
    empty() {
        this.el.forEach(e => {
            e.innerHTML = '';
        });
        return this;
    },
    parseToDOM(str) {
        const div = document.createElement('div');
        if (typeof str == 'string') {
            div.innerHTML = str;
        }
        return div.childNodes;
    },
    ConvertToArray(nodes) {
        let array = null;
        try {
            array = Array.prototype.slice.call(nodes, 0); //非ie浏览器  ie8-将NodeList实现为COM对象，不能用这种方式检测
        } catch (ex) {
            //ie8-
            array = [];
            for (let i = 0; i < nodes.length; i++) {
                array.push(nodes[0]);
            }
        }
        return array;
    },
    parseDomToString(dom) {},
    append(newel) {
        let newele;
        if (typeof newel == 'string') {
            newele = this.parseToDOM(newel);
            newele = this.ConvertToArray(newele);
        } else {
            newele = [ newel ];
        }
        for (let i = 0; i < newele.length; i++) {
            const newe = newele[i];
            this.el.forEach(e => {
                e.appendChild(newe);
            });
        }
    },
    remove() {
        this.el.forEach(e => {
            if (e.parentNode) {
                e.parentNode.removeChild(e);
            }
        });
    },
    slideUp(time) {
        this.el.forEach(e => {
            e.style.display = 'none';
        });
    },
    css(...css) {
        if (typeof css[0] == 'object') {
            for (const i in css[0]) {
                this.el.forEach(e => {
                    e.style[i] = css[0][i];
                });
            }
            return this;
        } else {
            if (css.length == 1) {
                return this.el[0].style[css[0]];
            }
            if (css.length == 2) {
                this.el.forEach(e => {
                    e.style[css[0]] = css[1];
                });
                return this;
            }
        }
    },
    fadeOut(time, callback) {
        this.el.forEach(e => {
            this.animate({ opacity: 0 }, time, e, () => {
                e.style.display = 'none';
                if (typeof callback == 'function') {
                    callback();
                }
            });
        });
    },
    fadeIn(time, callback) {
        this.el.forEach(e => {
            e.style.display = 'block';
            // e.style.opacity = 1;
            this.animate({ opacity: 1 }, time, e, callback);
        });
    },
    animate(css, time, ele, callback) {
        if (!time) {
            time = 300;
        }
        const totalTimes = time / 50;
        let initTime = 0;
        const initCss = {};
        for (const i in css) {
            if (!isNaN(parseFloat(css[i]))) {
                initCss[i] = { init: parseFloat(ele.style[i]) || 0, unit: String(css[i]).substring(String(parseFloat(css[i])).length) };
            }
        }
        const interval = window.setInterval(() => {
            for (const i in initCss) {
                if (initTime >= totalTimes) {
                    ele.style[i] = css[i];
                } else {
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
    outerWidth() {
        const el = this.el[0];
        return el.offsetWidth;
    },
    outerHeight() {
        const el = this.el[0];
        return el.offsetHeight;
    },
    hide() {
        this.el.forEach(e => {
            e.style.display = 'none';
        });
        return this;
    },
    show() {
        this.el.forEach(e => {
            e.style.display = 'block';
        });
        return this;
    },
    position() {
        return {
            top: this.el[0].offsetTop,
            left: this.el[0].offsetLeft,
        };
    },
    not(dom) {
        this.el = this.el.filter(e => {
            return e != dom;
        });
        return this;
    },
};
XNQuery.extend = XNQuery.prototype.extend;
export default XNQuery;
