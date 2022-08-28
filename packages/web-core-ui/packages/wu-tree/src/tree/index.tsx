/**
 * 树组件
 */
import $ from '@wu-component/common/dist/jquery';
export const defaultOption = {
    defaultCheckedKeys: [],
    defaultExpandedKeys: [],
    label: 'text',
    id: 'id',
    lineHeight: 32,
    dataType: 'tree',
    lazyLoad: false,
    // pId: 'parentid',
    selectType: 'checkbox', //radio,null
    checkDisabled: function(d) {
        return false;
    },
    autoOpen: function(d, level) {
        return level <= 2;
    },
    checkSticky: {
        //check关联
        on: 'pc', //p,自动勾选父，c自动勾选子，function
        off: 'pc',
    },
    editNode: function(d) {
        return true;
    },
    deleteNode: function(d) {
        return true;
    },
    addChildNode: function(d) {
        return true;
    },
};

const iconMap = {
    tick: `<svg t="1656142168735" data-checkbox="data-checkbox" class="wu-tree-icon center" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27917" width="200" height="200"><path data-checkbox="data-checkbox" d="M800 288a47.84 47.84 0 0 0-33.936 14.064L432 636.112 257.936 462.064a48 48 0 1 0-67.872 67.872l208 208c8.688 8.688 20.688 14.064 33.936 14.064s25.248-5.376 33.936-14.064l368-368A48 48 0 0 0 800 288z" fill="" p-id="27918"></path></svg>`,
    up: `<svg t="1656144009618" data-slide="data-slide" class="wu-tree-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28056" width="200" height="200"><path data-slide="data-slide" d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z" p-id="28057"></path></svg>`,
};
export class Tree {
    public readonly container: any;
    private option: any;
    private data: any;
    private flatList: {};
    private totalNum: number;
    private readonly flatListKeys: any[];
    private topIndex: number;
    private bottomIndex: number;
    private readonly slidedownHTML: { up: string; down: string };
    private readonly iconHTML: { folder: string; file: string };
    private readonly selectHTML: Record<string, string>;
    private clicked: null;
    private readonly checked: { nodes: any; keys: any };
    private resizeObserver: ResizeObserver;
    private index: number;
    private searchKeyword: any;
    private scrollDom: any;
    private openNumber: number;
    private seachKeys: any[];
    private dom: string;
    private movedom: any;
    private calcCurrent: boolean;
    private searchKeysJson: {};
    private currentNumber: number;
    private clickFunc: (e) => void;
    private mouseoverFunc: (e) => void;
    private mousedownFunc: (e) => void;
    private mousemoveFunc: (e) => void;
    private scrollFunc: (e) => void;
    private mouseupFunc: (e) => void;
    private dblclickFunc: (e) => void;
    constructor(container, data, option) {
        this.container = container;
        this.container.classList.add('xntree-outer');
        this.option = $.extend(true, {}, defaultOption, option);
        if (option.dataType == 'list') {
            this.data = this.revertListToTree(data);
        } else {
            this.data = $.extend(true, [], data);
        }
        this.flatList = {};
        this.flatListKeys = [];

        this.totalNum = parseInt(String((this.container.clientHeight || document.body.clientHeight) / this.option.lineHeight));
        this.topIndex = 0;
        this.bottomIndex = this.totalNum + 4;
        this.slidedownHTML = {
            up: `<a class="xn-slidedown">
                       ${iconMap['up']}
                   </a>`,
            down: `<a class="xn-slidedown icon-rotate">
                          ${iconMap['up']}
                    </a>`,
        };
        this.iconHTML = {
            folder: `<a class="xn-folder iconfontxntree icon-xntreewenjianjia">
                         <svg class="wu-tree-icon" aria-hidden="true">
                             <use xlink:href="#icon-folder"></use>
                         </svg>
                     </a>`,
            file: `<a class="xn-file iconfontxntree icon-xntreefile">
                         <svg class="wu-tree-icon" aria-hidden="true">
                             <use xlink:href="#icon-file-fill"></use>
                         </svg>
                    </a>`,
        };
        this.selectHTML = {
            checkbox: `<div class="xn-checkbox" data-checkbox="data-checkbox"></div>`,
            checkboxon: `<div class="xn-checkbox on" data-checkbox="data-checkbox">
                            ${iconMap['tick']}
                         </div>`,
            checkboxindeterminate: `<div class="xn-checkbox on" data-checkbox="data-checkbox">
                                        <svg class="wu-tree-icon" aria-hidden="true">
                                            <use xlink:href="#icon-line"></use>
                                        </svg>
                                    </div>`,
            checkboxdisable: `<div class="xn-checkbox disable" data-checkbox="data-checkbox"></div>`,
            radio: `<div class="xn-radio" data-radio="data-radio"></div>`,
            radioon: `<div class="xn-radio on" data-radio="data-radio">
                             ${iconMap['tick']}
                      </div>`,
            radiodisable: `<div class="xn-radio disable" data-radio="data-radio"></div>`,
        };
        this.checked = {
            nodes: [],
            keys: [],
        };
        this.clicked = null;
        this.getFlatData();

        if (option.defaultCheckedKeys && Array.isArray(option.defaultCheckedKeys) && option.defaultCheckedKeys.length) {
            const nodes = [];
            const keys = [];
            for (let i = 0; i < option.defaultCheckedKeys.length; i++) {
                const nodeData = this.getNodeById(option.defaultCheckedKeys[i]);
                if (nodeData) {
                    nodes.push(nodeData);
                    keys.push(option.defaultCheckedKeys[i]);
                }
            }
            this.checked = {
                nodes: nodes,
                keys: keys,
            };
            console.log(this.checked);
        }
        this.init();
        this.addResizeObserve();
    }

    public addResizeObserve() {
        this.resizeObserver = new ResizeObserver(entries => {
            this.totalNum = parseInt(String((this.container.clientHeight || document.body.clientHeight) / this.option.lineHeight));
            this.refreshDom(true);
        });
        this.resizeObserver.observe(this.container);
    }

    public init() {
        // console.log(this.data);
        this.rendDom();
        this.addEvent();
        if (this.checked.keys.length) {
            this.setCheckedKeys(this.checked.keys);
        }
    }

    public addMoveDom() {
        return `
        <div class="xntree-move"></div>
        `;
    }

    public rendDom() {
        this.openNumber = 0;
        this.dom = '<div class="xntree-cont">';
        this.index = 0;
        this.dom += this._rendHTML(this.data, 0) + '</div>';
        const movedom = this.addMoveDom();
        const scrollDom = '<div class="xntree-scroll" style="height:' + this.openNumber * this.option.lineHeight + 'px"></div>';
        this.container.innerHTML = scrollDom + this.dom + movedom;
        this.movedom = this.container.querySelector('.xntree-move');
        this.scrollDom = this.container.querySelector('.xntree-scroll');
        this.setScrollWidth();
    }

    public setScrollWidth() {
        const width = this.container.querySelector('.xntree-cont').clientWidth;
        this.scrollDom.style.minWidth = width + 'px';
    }

    private _rendHTML(list, level, justScroll?) {
        let dom = '';
        let span = '';
        for (let i = 0; i < level; i++) {
            span += '<span class="xn-indent"></span>';
        }
        for (let i = 0; i < list.length; i++) {
            const l = list[i];
            if (l.$show) {
                if (this.seachKeys && !this.searchKeysJson[l[this.option.id]]) {
                    continue;
                } else {
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
                    const [ h ] = this._rendOneNode(l, span, level, l.$show);
                    dom += h;
                }
            } else if (justScroll && this.index > this.bottomIndex) {
                return dom;
            }
            if (l.children && l.children.length > 0 && l.$show) {
                const cDom = this._rendHTML(l.children, level + 1, justScroll);
                dom += cDom;
            }
        }
        return dom;
    }

    private _rendOneNode(l, span, level, open) {
        let pre = '<div class="xn-tree-icons">';
        if ((l.$show && l.children && l.children[0]) || this.option.lazyLoad) {
            pre += this.slidedownHTML[l.children && l.children[0] && l.children[0].$show ? 'down' : 'up'];
        } else {
            pre += '<a></a>';
        }
        if (!this.option.hideIcon) {
            const icon = l.children && l.children.length > 0 ? 'folder' : 'file';
            pre += this.iconHTML[icon];
        }
        pre += '</div>';
        l.$level = level;
        if (!span) {
            span = '';
            for (let i = 0; i < level; i++) {
                span += '<span class="xn-indent"></span>';
            }
        }
        let label = '';
        if (typeof this.option.label == 'string') {
            label = l[this.option.label];
            if (this.searchKeyword) {
                label = this.replaceKey(label, this.searchKeyword);
            }
        } else if (typeof this.option.label == 'function') {
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
        let selectDom = '';
        if (this.option.selectType) {
            selectDom = this.selectHTML[this.option.selectType + (this.checked.nodes[l[this.option.id]] || this.checked.nodes[l[this.option.id]] ? 'on' : '')] || '';
            if (this.option.checkDisabled(l)) {
                selectDom = this.selectHTML[this.option.selectType + 'disable'];
            }
        }
        const h = `<div style="line-height: ${this.option.lineHeight}px;height:${this.option.lineHeight}px" class="xntree-item ${!open ? 'xn-hide-sub' : ''} ${this.clicked && this.clicked[this.option.id] == l[this.option.id] ? 'on' : ''}" data-level="${level}" data-id="${l[this.option.id]}">
                    ${span}
                    ${pre}
                    ${selectDom}
                    <div class="xntree-label">${label}</div>
                    </div>`;
        const dom = document.createElement('div');
        dom.innerHTML = h;
        return [ h, dom.childNodes[0] ];
    }

    public search(keyword, func, containChild) {
        const that = this;
        this.seachKeys = null;
        this.searchKeyword = keyword;
        if (keyword.trim()) {
            if (!func) {
                func = d => {
                    return d[that.option.label].indexOf(keyword) > -1;
                };
            }
            const path = [],
                result = [];
            const results = this.treeFindPath(this.data, func, path, result, containChild);
            // @ts-ignore
            this.seachKeys = [ ...new Set(results.flat()) ];
            this.searchKeysJson = {};
            this.seachKeys.forEach(e => {
                this.searchKeysJson[e] = 1;
            });
        }
        this.refreshDom();
    }

    public treeFindPath(tree, func, path = [], result = [], containChild, hasP?) {
        for (const data of tree) {
            path.push(data[this.option.id]);
            const has = func(data);
            (has || (containChild && hasP)) && result.push([ ...path ]);
            data.children && this.treeFindPath(data.children, func, path, result, containChild, has || (containChild && hasP));
            path.pop();
        }
        return result;
    }

    public addEvent() {
        let startTime = new Date().getTime();
        const clickFunc = e => {
            const $t = $(e.target);
            if ($t.hasClass('xn-slidedown') || $t.get(0).getAttribute('data-slide')) {
                e.stopPropagation();
                this.slideEvent($t);
            }
            if ($t.hasClass('xn-checkbox') || $t.get(0).getAttribute('data-checkbox')) {
                e.stopPropagation();
                this.checkEvent($t);
            }
            if ($t.hasClass('xn-radio') || $t.get(0).getAttribute('data-radio')) {
                e.stopPropagation();
                this.radioEvent($t);
            }
            if ($t.hasClass('xntree-label') || $t.parents('.xntree-label').get(0)) {
                e.stopPropagation();
                let $item = $t;
                if ($t.parents('.xntree-label').get(0)) {
                    $item = $t.parents('.xntree-label').eq(0);
                }
                this.clickLabelEvent($item, $t, e);
            }
            if (new Date().getTime() - startTime < 300) {
                e.stopPropagation();
                dblclickFunc(e);
            }
            startTime = new Date().getTime();
        };
        const dblclickFunc = e => {
            // e.stopPropagation();
            const $t = $(e.target);
            if ($t.hasClass('xntree-label') || $t.parents('.xntree-label').get(0)) {
                let $item = $t;
                if ($t.parents('.xntree-label').get(0)) {
                    $item = $t.parents('.xntree-label').eq(0);
                }
                const p = $item.parents('.xntree-item').get(0);
                const id = p.getAttribute('data-id');
                const node = this.getNodeById(id);
                if (this.option.on && this.option.on.dblclickNode) {
                    this.option.on.dblclickNode($t, node, id, e);
                }
            }
        };
        this.clickFunc = clickFunc;
        this.container.addEventListener('click', clickFunc);

        this.mouseoverFunc = e => {
            const $t = $(e.target);
            if ($t.hasClass('xntree-item') || $t.parents('.xntree-item').get(0)) {
                let $item = $t;
                if ($t.parents('.xntree-item').get(0)) {
                    $item = $t.parents('.xntree-item').eq(0);
                }
                const id = $item.get(0).getAttribute('data-id');
                const node = this.getNodeById(id);
                if (this.option.on.hoverNode) {
                    this.option.on.hoverNode(node, $t, e);
                }
            }
        };
        this.container.addEventListener('mouseover', this.mouseoverFunc);

        let down = false;
        let move = false;
        const el: any = {};
        const mousedownFunc = e => {
            const $t = $(e.target);
            if ($t.parents('.xntree-item').get(0)) {
                down = true;
                el.$dom = $t.parents('.xntree-item').eq(0);
                el.id = el.$dom.attr('data-id');
                el.startTime = new Date().getTime();
            }
        };
        this.mousedownFunc = mousedownFunc;
        this.container.addEventListener('mousedown', mousedownFunc);

        const mousemoveFunc = e => {
            if (!this.option.canMove) {
                return;
            }
            if (down && new Date().getTime() - el.startTime > 300) {
                const $t = $(e.target);
                this.container.classList.add('xn-moving');
                $(this.container)
                    .find('.xn-onmoving')
                    .removeClass('xn-onmoving');
                if ($t.parents('.xntree-item').get(0)) {
                    const $onDom = $t.parents('.xntree-item').eq(0);
                    el.$onDom = $onDom;
                    el.onId = $onDom.attr('data-id');
                    const [ dir, x, y, nextLevel ] = this.getMovePos($onDom, e);
                    el.dir = dir;
                    el.y = y;
                    el.x = x;
                    el.nextLevel = nextLevel;
                    if (el.dir == 'on') {
                        el.$onDom.addClass('xn-onmoving');
                        this.movedom.style.display = 'none';
                    } else {
                        this.movedom.style.top = el.y + 'px';
                        this.movedom.style.left = el.x + 'px';
                        this.movedom.style.display = 'block';
                        this.movedom.style.width = 'calc(100% - ' + el.x + 'px)';
                    }
                }
                move = true;
            }
        };
        this.mousemoveFunc = mousemoveFunc;
        document.addEventListener('mousemove', mousemoveFunc);

        const mouseupFunc = e => {
            if (down && move) {
                this.moveItem(el);
            }
            down = false;
            move = false;
            this.container.classList.remove('xn-moving');
            this.movedom.style.display = 'none';
        };
        this.mouseupFunc = mouseupFunc;
        document.addEventListener('mouseup', mouseupFunc);

        const scrollFunc = e => {
            const y = this.container.scrollTop;
            this.topIndex = Math.floor(y / this.option.lineHeight);
            this.bottomIndex = this.topIndex + this.totalNum + 4;
            this.refreshDom(true);
            this.container.querySelector('.xntree-cont').style.transform = 'translateY(' + this.topIndex * this.option.lineHeight + 'px)';
        };
        this.scrollFunc = scrollFunc;
        this.container.addEventListener('scroll', scrollFunc);
    }

    public refreshDom(justScroll = false, needLocate = false) {
        this.index = 0;
        this.openNumber = 0;
        this.currentNumber = 0;
        this.calcCurrent = true;
        const dom = this._rendHTML(this.data, 0, justScroll);
        this.container.querySelector('.xntree-cont').innerHTML = dom;
        if (!justScroll) {
            this.scrollDom.style.height = this.openNumber * this.option.lineHeight + 'px';
            if (needLocate) {
                this.container.scrollTo(0, this.currentNumber * this.option.lineHeight);
            }
        }
        this.setScrollWidth();
    }

    public moveItem(el) {
        // if(el.isNext){
        //     el.onId=
        // }
        const nextLevel = el.nextLevel;
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
            const dontMove = this.option.disableMoveNode(this.getNodeById(el.id), this.getNodeById(el.onId), el.dir);
            if (dontMove) {
                return;
            }
        }
        let curP = this.flatList[this.flatList[el.id][this.option.pId]];
        if (!curP) {
            curP = {
                children: this.data,
            };
        }
        for (let i = 0; i < curP.children.length; i++) {
            if (curP.children[i][this.option.id] == el.id) {
                curP.children.splice(i, 1);
            }
        }
        let hasChild = true;
        if (!this.flatList[el.onId].children) {
            this.flatList[el.onId].children = [];
            hasChild = false;
        }
        if (el.dir == 'on' || (hasChild && el.dir == 'down' && this.flatList[el.onId].children[0] && this.flatList[el.onId].children[0].$show && !nextLevel)) {
            //1.在节点上，2.当节点为展开状态，鼠标在节点下方，统一做在节点上的操作
            this.flatList[el.id][this.option.pId] = el.onId;
            this.flatList[el.onId].children.unshift(this.flatList[el.id]);
            this.flatList[el.id].$show = this.flatList[el.onId].children[1] && this.flatList[el.onId].children[1].$show;
            this.refreshDom();
            if (this.option.on.moveChange) {
                this.option.on.moveChange(this.flatList[el.id], this.data);
            }
            return;
        }
        let pNode = this.flatList[this.flatList[el.onId][this.option.pId]];
        if (!pNode || this.flatList[el.onId][this.option.id] == this.flatList[el.onId][this.option.pId]) {
            //有的时候跟节点的id和pid是同一个值
            pNode = {
                children: this.data,
            };
        }
        let index;
        for (let i = 0; i < pNode.children.length; i++) {
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
    }

    public renderOneTree(treeData, level, open) {
        const dom = this._rendHTML(treeData, level, open);
        const dom1 = document.createElement('div');
        dom1.innerHTML = dom;
        return dom1.childNodes;
    }

    public _getItemById(id) {
        return this.container.querySelector('[data-id="' + id + '"]');
    }

    public getMovePos($dom, e) {
        // @ts-ignore
        const isNext = false;
        let nextLevel = null;
        let dir = '';
        const pos = $dom.get(0).getBoundingClientRect();
        const pPos = this.container.getBoundingClientRect();
        // @ts-ignore
        const top = pos.top - pPos.top,
            top1 = pos.top + (pos.height * 2) / 5,
            top2 = pos.top + (pos.height * 3) / 5;
            // top4 = pos.top + pos.height;
        const etop = e.clientY;
        let y, x;
        const curLevel = $dom.get(0).getAttribute('data-level');
        const siblingLevel = $dom.get(0).nextSibling ? $dom.get(0).nextSibling.getAttribute('data-level') : null;
        const isindent = e.target.classList.contains('xn-indent');

        x = pos.left - pPos.left + $dom.children('.xn-indent').el.length * 15 + 15;
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
                nextLevel = $dom.children('.xn-indent').el.length - $dom.children('.xn-indent').el.indexOf(e.target);
                if (curLevel - nextLevel < siblingLevel) {
                    nextLevel = curLevel - siblingLevel;
                }
                x = x - nextLevel * 15 - 15;
            }
        }
        return [ dir, x, y, nextLevel ];
    }

    public setNodesShow(node) {
        if (!node) {
            return;
        }
        const pId = node[this.option.pId];
        const pNode = this.flatList[pId];
        if (!node.$show) {
            node.$show = true;
            if (pNode) {
                for (let i = 0; i < pNode.children.length; i++) {
                    pNode.children[i].$show = true;
                }
            }
        }
        this.setNodesShow(pNode);
    }

    public setSelectKey(key, triggerClick, needLocate) {
        this.clicked = this.getNodeById(key);
        this.setNodesShow(this.clicked);
        this.refreshDom(false, needLocate);
        if (triggerClick) {
            this.trigger('clickNode', this.container.querySelector('.xntree-item[data-id="' + key + '"]'), this.clicked, key);
        }
    }

    public clickLabelEvent($item, $t, e) {
        const p = $item.parents('.xntree-item', this.container).get(0);
        // const plevel = parseInt(p.getAttribute('data-level'));
        const id = p.getAttribute('data-id');
        const node = this.getNodeById(id);
        let setClick = true;
        if (this.option.on && this.option.on.clickNode) {
            setClick = this.option.on.clickNode($t, node, id, e);
        }
        if (setClick) {
            this.clicked = node;
            // $(this.container).find(".xntree-item.on").removeClass('on')
            // $(p).addClass('on')
        }
        this.refreshDom();
    }

    public radioEvent($t) {
        const p = $t.parents('.xntree-item', this.container).get(0);
        const id = p.getAttribute('data-id');
        const node = this.getNodeById(id);
        this.checked.keys = [ id ];
        this.checked.nodes = {};
        this.checked.nodes[id] = this.getNodeById(id);
        this.refreshDom();
        this.trigger('checkChange', node, true, this.checked);
    }

    public checkEvent($t) {
        const p = $t.parents('.xntree-item', this.container).get(0);
        const id = p.getAttribute('data-id');
        const node = this.getNodeById(id);
        if (this.option.checkDisabled(node)) {
            return;
        }
        const checked = this.checked.nodes[id];
        let sticky = this.option.checkSticky.on;
        if (checked) {
            sticky = this.option.checkSticky.off;
        }
        let paths = [];
        if (sticky.indexOf('p') > -1) {
            const func = d => {
                return d[this.option.id] == id;
            };
            const path = [],
                result = [];
            const results = this.treeFindPath(this.data, func, path, result, sticky.indexOf('c') > -1);
            // @ts-ignore
            paths = [ ...new Set(results.flat()) ];
        } else if (sticky.indexOf('c') > -1) {
            this._literalFlatTree({}, [ node ], {}, paths, 0, true);
        } else {
            paths = [ id ];
        }
        if (checked) {
            const indexs = this.delArrayFromArray(this.checked.keys, paths);
            for (let i = indexs.length - 1; i >= 0; i--) {
                delete this.checked.nodes[indexs[i]];
            }
        } else {
            for (let i = 0; i < paths.length; i++) {
                this.checked.keys.push(paths[i]);
                const node = this.getNodeById(paths[i]);
                this.checked.nodes[paths[i]] = node;
            }
        }
        this.refreshDom();
        this.trigger('checkChange', node, !checked, this.checked);
    }

    public delArrayFromArray(fromArray, delArray) {
        const indexs = [];
        for (let j = 0; j < delArray.length; j++) {
            const v = delArray[j];
            for (let i = fromArray.length - 1; i >= 0; i--) {
                if (fromArray[i] == v) {
                    fromArray.splice(i, 1);
                    indexs.push(v);
                }
            }
        }
        return indexs;
    }

    public setCheckedKeys(keys, ...args) {
        this.checked.nodes = {};
        for (let i = keys.length - 1; i >= 0; i--) {
            const id = keys[i];
            const node = this.getNodeById(id);
            if (!node) {
                //用于处理设置的key值不存在的情况
                keys.splice(i, 1);
                continue;
            }
            this.checked.nodes[id] = node;
        }
        this.checked.keys = keys;
        this.trigger('checkChange', false, false, this.checked, true);
        this.refreshDom();
    }

    public trigger(type, data, ...arg) {
        const args = [].slice.call(arguments);
        args.splice(0, 1);
        if (this.option.on[type]) {
            this.option.on[type](...args);
        }
    }

    public setCheckedNodes(nodes) {
        const keys = nodes.map(e => {
            return e[this.option.id];
        });
        this.setCheckedKeys(keys);
    }

    public getChecked() {
        return this.checked;
    }

    public checkAll(justResult) {
        //justResult,仅选择当前搜索结果
        let list = $.extend(true, [], this.flatListKeys);
        list = list.filter(e => {
            return !this.option.checkDisabled(this.getNodeById(e));
        });
        if (justResult && this.seachKeys) {
            list = list.filter(e => {
                return !this.seachKeys || this.searchKeysJson[e];
            });
        }
        this.setCheckedKeys(list);
    }

    public clearAll() {
        this.setCheckedKeys([], true);
    }

    public editNode(node) {
        const oldNode = this.getNodeById(node[this.option.id]);
        $.extend(true, oldNode, node);
        this.refreshDom();
        // let [h, icon, dom] = this._rendOneNode(newNode, false, oldNode.$level, true);
        // let oldDom = this.container.querySelector('[data-id="' + oldNode[this.option.id] + '"]')
        // oldDom.innerHTML = dom.innerHTML;
    }

    public addNodes(id, nodes, open) {
        for (let i = nodes.length - 1; i >= 0; i--) {
            this._addOneNode(id, nodes[i], open);
        }
        this.refreshDom();
    }

    public _addOneNode(id, node, open?) {
        const pNode = this.getNodeById(id);
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
        const $level = pNode.$level + 1;
        node.$level = $level;
        node[this.option.pId || '$pId'] = id;
        if ((pNode.children[0] && pNode.children[0].$show) || open) {
            node.$show = true;
        }
        pNode.children.unshift(node);
        this.flatList[node[this.option.id]] = node;
        this.flatListKeys.push(node[this.option.id]);
    }
    public addNode(id, node) {
        //新增节点
        this._addOneNode(id, node);
        this.refreshDom();
        // let [h, icon, dom] = this._rendOneNode(node, false, $level, true);
        // this.container.querySelector('[data-id="' + id + '"]').after(dom)
    }

    public insertAfter(insert_element, target_element) {
        var parent = insert_element.parentNode;
        //最后一个子节点 lastElementChild兼容其他浏览器 lastChild  兼容ie678;
        var last_element = parent.lastElementChild || parent.lastChild;
        //兄弟节点同样也是有兼容性
        var target_sibling = target_element.nextElementSibling || target_element.nextSibling;
        if (last_element == target_element) {
            //先判断目标节点是不是父级的最后一个节点，如果是的话，直接给父级加子节点就好
            parent.appendChild(insert_element);
        } else {
            //不是最好后一个节点  那么插入到目标元素的下一个兄弟节点之前（就相当于目标元素的insertafter）
            parent.insertBefore(insert_element, target_sibling);
        }
    }

    public deleteNode(id) {
        //删除节点
        const node = this.getNodeById(id);
        let pNode = this.getNodeById(node[this.option.pId]);
        let key = null;
        if (!pNode) {
            pNode = { children: this.data };
        }
        for (let i = 0; i < pNode.children.length; i++) {
            if (pNode.children[i][this.option.id] == id) {
                key = i;
                break;
            }
        }
        pNode.children.splice(key, 1);
        const delKeys = [];
        this._literalFlatTree({}, [ node ], {}, delKeys, 0, true);
        for (let i = 0; i < delKeys.length; i++) {
            const k = delKeys[i];
            this.flatListKeys.splice(this.flatListKeys.indexOf(k), 1);
            delete this.flatList[k];
            // $(this.container).find("[data-id='" + k + "']").remove();
        }
        this.refreshDom();
    }

    public _deleteDomFromId(id) {
        const node = this.getNodeById(id);
        const delKeys = [];
        this._literalFlatTree({}, [ node ], {}, delKeys, 0, true);
        for (let i = 0; i < delKeys.length; i++) {
            const k = delKeys[i];
            $(this.container)
                .find("[data-id='" + k + "']")
                .remove();
        }
    }

    public getFlatData() {
        const list = [];
        this._literalFlatTree({}, this.data, this.flatList, this.flatListKeys, 0, false, list);
        if (!this.option.pId) {
            this.option.pId = '$pId';
        }
    }

    public _literalFlatTree(pNode, list, arry, arrykeys, level, dontSetData, list1?) {
        for (let i = 0; i < list.length; i++) {
            const l = list[i];
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
    }

    public getNodeById(id) {
        return this.flatList[id];
    }

    public _literalGetNode(list, id) {
        for (let i = 0; i < list.length; i++) {
            const l = list[i];
            if (l[this.option.id] == id) {
                return l;
            }
        }
        return false;
    }

    public openChildren(node) {
        for (let i = 0; i < node.children.length; i++) {
            node.children[i].$show = !node.children[i].$show;
        }
        this.refreshDom();
    }

    public async slideEvent($t) {
        const p = $t.parents('.xntree-item', this.container).get(0);
        const id = p.getAttribute('data-id');
        const node = this.getNodeById(id);
        if (node.children && node.children.length >= 0) {
            node.$$loaded = true;
        }
        if (node.$$loaded || !this.option.lazyLoad) {
            this.openChildren(node);
        } else {
            const nodes = await this.option.on.loadData(node);
            node.$$loaded = true;
            this.addNodes(id, nodes, true);
        }
    }

    public findChildren(p, plevel) {
        const child = $(p)
            .nextUntil('.xntree-item[data-level="' + plevel + '"]')
            .filter((i, e) => {
                const level = parseInt(e.getAttribute('data-level'));
                return level > plevel;
            });
        return child;
    }

    public resetOption(option) {
        if (JSON.stringify(this.option) == JSON.stringify(option)) {
            return;
        }
        this.option = $.extend(true, {}, this.option, option);
        // this.refreshDom()
    }

    public replaceKey(text, keyword) {
        if (!keyword || keyword.trim() == '') {
            return text;
        }
        text = text.replace(new RegExp('(' + keyword + ')', 'ig'), '<span class="xn-searchedkey">$1</span>');
        return text;
    }

    public destory() {
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
    }

    public revertListToTree(data) {
        const datajson = {};
        const d = $.extend(true, [], data);
        for (let i = 0; i < d.length; i++) {
            if (!d[i].children) {
                d[i].children = [];
            }
            datajson[d[i][this.option.id]] = d[i];
        }
        const nd = d.filter(item => {
            if (datajson[item[this.option.pId]] && item[this.option.pId] != item[this.option.id]) {
                datajson[item[this.option.pId]].children.push(item);
                return false;
            }
            return true;
        });
        return nd;
    }

    public revertTreeToList(treedata) {
        const list = [];
        this._revertTreeToListFunc(treedata, list);
        return list;
    }

    public _revertTreeToListFunc(treedata, list) {
        for (let i = 0; i < treedata.length; i++) {
            const item = $.extend(true, {}, treedata[i]);
            delete item.children;
            list.push(item);
            if (treedata[i].children) {
                this._revertTreeToListFunc(treedata[i].children, list);
            }
        }
    }

    public getData() {
        return this.data;
    }

    public returnFlatData() {
        return this.flatList;
    }
}
