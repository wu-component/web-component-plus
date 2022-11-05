import { Component, Emit, h, OnConnected, State, Prop, WuComponent, Watch } from '@wu-component/web-core-plus';
import '@wu-component/wu-checkbox';
import css from './index.scss';
import { Node } from './model/Node';
import { extractClass } from "@wu-component/common";
import { TreeStore } from "./model/TreeStore";
import { getNodeKey } from './model/util';

@Component({
    name: 'wu-plus-tree-v2',
    css: css,
})
export class WuTreeV2 extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    public renderCaret = () => {
        return (
            <svg t="1662282298321" className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="2355" width="12" height="12">
                <path
                    d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"
                    p-id="2356"></path>
            </svg>
        );
    }

    @State({ type: Boolean, default: true })
    public isTree;

    @State({ type: Boolean, default: false })
    public childNodeRendered;

    @Prop({ type: Boolean, default: false })
    public override draggable;

    @Prop({ type: String, default: '' })
    public iconclass;

    @Prop({ type: Boolean, default: false })
    public showCheckbox = false

    @Prop({ type: Boolean, default: true })
    public renderAfterExpand = true

    @Prop({ type: Boolean, default: true })
    public expandOnClickNode = true

    @Prop({ type: Boolean, default: false })
    public checkDescendants = false

    @Prop({ type: Boolean, default: true })
    public autoExpandParent = true

    @Prop({ type: Boolean, default: true })
    public highlightCurrent = true

    @Prop({ type: Boolean, default: false })
    public checkStrictly = false

    @Prop({ type: Boolean, default: false })
    public defaultExpandAll = false

    @Prop({ type: Boolean, default: false })
    public checkOnClickNode = false

    @Prop({ type: Array, default: [] })
    public defaultCheckedKeys = []

    @Prop({ type: Function })
    public allowDrag

    @Prop({ type: Function })
    public allowDrop

    @Prop({ type: Function })
    public lazy

    @Prop({ type: Function })
    public load

    @Prop({ type: Function })
    public filterNodeMethod

    @Prop({ type: Function })
    public renderContent

    @Prop({ type: Array, default: [] })
    public defaultExpandedKeys = []

    @Prop({ default: '' })
    public currentNodeKey = ''

    @Prop({ type: Object, default: { children: 'children', label: 'label', disabled: 'disabled' } })
    public options = { children: 'children', label: 'label', disabled: 'disabled' }

    @Prop({ type: Number, default: 18 })
    public indent = 18

    @Prop({ type: Array, default: [] })
    public data = []

    @Prop({ type: String, default: '' })
    public emptyText = ''

    @Prop({ type: String, default: '' })
    public nodeKey = ''

    public treeStore = null

    @State({ type: Object })
    public treeRoot = null
    public currentNode =  null
    public treeItems: null
    public checkboxItems: []
    public dragState: {
        showDropIndicator: false,
        draggingNode: null,
        dropNode: null,
        allowDrop: true,
        dropType: ""
    }

    public setData(data: any) {
        if (typeof data === 'string') {
            this.data = JSON.parse(data);
        } else {
            this.data = data;
        }
        console.log(this.data);
        this.init();
    }

    @Watch("data")
    public dataChange(val: any) {
        const data = typeof val === 'string'? JSON.parse(val): val;
        if (this.store) {
            this.store.setData(data);
        }else {
            this.init();
        }
    }

    private init() {
        this.isTree = true;
        // this.data = data;

        this.store = new TreeStore({
            key: this.nodeKey,
            data: this.data,
            lazy: this.lazy,
            props: this.props,
            load: this.load,
            currentNodeKey: this.currentNodeKey,
            checkStrictly: this.checkStrictly,
            checkDescendants: this.checkDescendants,
            defaultCheckedKeys: this.defaultCheckedKeys,
            defaultExpandedKeys: this.defaultExpandedKeys,
            autoExpandParent: this.autoExpandParent,
            defaultExpandAll: this.defaultExpandAll,
            filterNodeMethod: this.filterNodeMethod
        });

        this.treeRoot = this.store.root;
        console.log(this.showCheckbox);

        // const dragState = this.dragState;
        // this.update();
    }

    public override connected(shadowRoot: ShadowRoot) {
        this.init();
    }

    @Emit('node-click')
    public nodeClick(params: any) {
        return {};
    }

    @Emit('check-change')
    public checkChange(params) {
        return {};
    }

    @Emit('move-change')
    public moveChange(params) {
        return {};
    }
    get childrenNode() {
        // @ts-ignore
        return this.data;
    }

    set childrenNode(value: Node[]) {
        // @ts-ignore
        this.data = value;
    }

    get treeItemArray() {
        return Array.prototype.slice.call(this.treeItems);
    }

    get isEmpty() {
        const { childNodes } = this.treeRoot || {};
        return !childNodes || childNodes?.length === 0 || childNodes?.every(({ visible }) => !visible);
    }

    public filter(value) {
        if (!this.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter');
        this.store.filter(value);
    }
    public getNodeKey(node) {
        return getNodeKey(this.nodeKey, node.data);
    }
    public getNodePath(data) {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getNodePath');
        const node = this.store.getNode(data);
        if (!node) return [];
        const path = [ node.data ];
        let parent = node.parent;
        while (parent && parent !== this.treeRoot) {
            path.push(parent.data);
            parent = parent.parent;
        }
        return path.reverse();
    }
    public getCheckedNodes(leafOnly, includeHalfChecked) {
        return this.store.getCheckedNodes(leafOnly, includeHalfChecked);
    }
    public getCheckedKeys(leafOnly) {
        return this.store.getCheckedKeys(leafOnly);
    }
    public getCurrentNode() {
        const currentNode = this.store.getCurrentNode();
        return currentNode ? currentNode.data : null;
    }
    public getCurrentKey() {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getCurrentKey');
        const currentNode = this.getCurrentNode();
        return currentNode ? currentNode[this.nodeKey] : null;
    }
    public setCheckedNodes(nodes, leafOnly) {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
        this.store.setCheckedNodes(nodes, leafOnly);
    }
    public setCheckedKeys(keys, leafOnly) {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedKeys');
        this.store.setCheckedKeys(keys, leafOnly);
    }
    public setChecked(data, checked, deep) {
        this.store.setChecked(data, checked, deep);
    }
    public getHalfCheckedNodes() {
        return this.store.getHalfCheckedNodes();
    }
    public getHalfCheckedKeys() {
        return this.store.getHalfCheckedKeys();
    }
    public setCurrentNode(node) {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentNode');
        this.store.setUserCurrentNode(node);
    }
    public setCurrentKey(key) {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentKey');
        this.store.setCurrentNodeKey(key);
    }
    public getNode(data) {
        return this.store.getNode(data);
    }
    public removeNode(data) {
        this.store.remove(data);
    }
    public appendNode(data, parentNode) {
        this.store.append(data, parentNode);
    }
    public insertNodeBefore(data, refNode) {
        this.store.insertBefore(data, refNode);
    }
    public insertNodeAfter(data, refNode) {
        this.store.insertAfter(data, refNode);
    }
    public handleNodeExpand(nodeData, node, instance) {
        // this.broadcast('ElTreeNode', 'tree-node-expand', node);
        // this.$emit('node-expand', nodeData, node, instance);
    }
    public updateKeyChildren(key, data) {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in updateKeyChild');
        this.store.updateChildren(key, data);
    }
    public initTabIndex() {
        this.treeItems  = this.shadowRoot.querySelectorAll('.is-focusable[role=treeitem]');
        this.checkboxItems = this.shadowRoot.querySelectorAll('input[type=checkbox]');
        const checkedItem = this.shadowRoot.querySelectorAll('.is-checked[role=treeitem]');
        if (checkedItem.length) {
            checkedItem[0].setAttribute('tabindex', 0);
            return;
        }
        if (this.treeItems && this.treeItems[0]) {
            // @ts-ignore
            this.treeItems[0] && this.treeItems[0]?.setAttribute('tabindex', 0);
        }
    }
    public handleKeydown(ev) {
        const currentItem = ev.target;
        if (currentItem.className.indexOf('el-tree-node') === -1) return;
        const keyCode = ev.keyCode;
        this.treeItems = this.shadowRoot.querySelectorAll('.is-focusable[role=treeitem]');
        const currentIndex = this.treeItemArray.indexOf(currentItem);
        let nextIndex;
        if ([ 38, 40 ].indexOf(keyCode) > -1) { // up、down
            ev.preventDefault();
            if (keyCode === 38) { // up
                nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
            } else {
                nextIndex = (currentIndex < this.treeItemArray.length - 1) ? currentIndex + 1 : 0;
            }
            this.treeItemArray[nextIndex].focus(); // 选中
        }
        if ([ 37, 39 ].indexOf(keyCode) > -1) { // left、right 展开
            ev.preventDefault();
            currentItem.click(); // 选中
        }
        const hasInput = currentItem.querySelector('[type="checkbox"]');
        if ([ 13, 32 ].indexOf(keyCode) > -1 && hasInput) { // space enter选中checkbox
            ev.preventDefault();
            hasInput.click();
        }
    }

    @Emit("current-change")
    public treeNodeCurrentChange() {
        const store = this.treeRoot.store;
        return {
            currentNode: store?.currentNode || null,
            data: store?.currentNode?.data || null,
        };

    }
    @Emit("node-click")
    public treeNodeNodeClick(node: Node) {
        return {
            node
        };
    }

    @Emit("node-collapse")
    public treeNodeNodeCollapse(node: Node) {
        return {
            node
        };
    }

    @Emit("node-expand")
    public treeNodeNodeExpand(node: Node) {
        return {
            node
        };
    }

    @Emit("check")
    public treeNodeNodeCheck(node: Node) {
        const store = this.treeRoot.store;
        return {
            data: node.data,
            checkedNodes: store.getCheckedNodes(),
            checkedKeys: store.getCheckedKeys(),
            halfCheckedNodes: store.getHalfCheckedNodes(),
            halfCheckedKeys: store.getHalfCheckedKeys(),
        };
    }




    /****************************************树节点***********************************************/
    public handleClick(e: MouseEvent, node: Node) {
        e.stopPropagation();
        const store = this.treeRoot.store;
        store.setCurrentNode(node);
        this.treeNodeCurrentChange();
        this.treeRoot.currentNode = node;
        if (this.expandOnClickNode) {
            this.handleExpandIconClick(e, node);
        }
        if (this.checkOnClickNode && !node.disabled) {
            this.handleCheckChange(node, {
                detail: { value: !node.checked }
            }, e);
        }
        Promise.resolve().then(() =>{
            this.update();
        });
        this.treeNodeNodeClick(node);
    }

    public handleDragStart(e: MouseEvent) {
        e.stopPropagation();
    }

    public handleDragOver(e: MouseEvent) {
        e.stopPropagation();
    }

    public handleDragEnd(e: MouseEvent) {
        e.stopPropagation();
    }

    public handleDrop(e: MouseEvent) {
        e.stopPropagation();
    }

    public handleExpandIconClick(e: MouseEvent, node: Node) {
        e.stopPropagation();
        if (node.isLeaf) return;
        if (node.expanded) {
            node.collapse();
            this.treeNodeNodeCollapse(node);
        } else {
            node.expand();
            this.treeNodeNodeExpand(node);
        }
        Promise.resolve().then(() =>{
            this.update();
        });

    }

    public handleCheckChange(node: Node, value: any, e: MouseEvent) {

        node.setChecked(value.detail.value, !this.treeRoot.checkStrictly);
        setTimeout(() => {
            this.treeNodeNodeCheck(node);
            this.update();
        }, 0);
    }

    public renderNodeContent(node: Node) {
        return (
            <span className="wu-tree-node_label">{node.label}</span>
        );
    }

    private renderTreeNode(treeNode: Node) {
        if (!treeNode?.visible) {
            return null;
        }
        treeNode.childNodeRendered = true;
        return (
            <div
                {...extractClass({}, 'wu-tree-node', {
                    ['is-expanded']: treeNode.expanded,
                    ['is-current']: treeNode.isCurrent,
                    ['is-hidden']: !treeNode.visible,
                    ['is-focusable']: !treeNode.disabled,
                    ['is-checked']: !treeNode.disabled && treeNode.checked,
                })}
                role="treeitem"
                tabindex="-1"
                aria-expanded={treeNode.expanded}
                aria-disabled={treeNode.disabled}
                aria-checked={treeNode.checked}
                draggable={this.draggable}
                onclick={(e) => this.handleClick(e, treeNode)}
                ondragstart={(e) => this.handleDragStart(e)}
                ondragover={(e) => this.handleDragOver(e)}
                ondragend={(e) => this.handleDragEnd(e)}
                ondrop={(e) => this.handleDrop(e)}
            >
                <div
                    class="wu-tree-node_content"
                    style={{ 'padding-left': (treeNode.level - 1) * this.indent + 'px' } }
                >
                    <span
                        onclick={(e) => this.handleExpandIconClick(e, treeNode)}
                        {...extractClass({}, 'wu-tree-node_expand-icon', {
                            ['is-leaf']: treeNode?.isLeaf,
                            ['expanded']: !treeNode.isLeaf && treeNode.expanded,
                            [this.iconclass]: this.iconclass,
                            ['wu-icon-caret-right']: !this.iconclass,
                        })}
                    >
                        {
                            !this.iconclass && !treeNode.isLeaf? this.renderCaret(): null
                        }
                    </span>

                    {
                        this.showCheckbox? (
                            <wu-plus-checkbox
                                checked={treeNode.checked}
                                indeterminate={treeNode.indeterminate}
                                disabled={!!treeNode.disabled}
                                onchange={(e) => this.handleCheckChange(treeNode, e, e)}
                            >
                            </wu-plus-checkbox>
                        ): null
                    }
                    {
                        treeNode.loading? (
                            <span
                                className="wu-tree-node_loading-icon wu-icon-loading">
                            </span>
                        ): null
                    }
                    {this.renderNodeContent(treeNode)}
                </div>
                {
                    (!this.renderAfterExpand || treeNode.childNodeRendered) && treeNode.expanded? (
                        <div
                            role="group"
                            aria-expanded={treeNode.expanded}
                        >
                            {
                                treeNode?.childNodes.map(child => {
                                    return this.renderTreeNode(child);
                                })
                            }
                        </div>
                    ): null
                }
            </div>
        );
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div
                {...extractClass({}, 'wu-tree', {
                    'wu-tree-highlight-current': this.highlightCurrent,
                    'is-dragging': !!this.dragState?.draggingNode,
                    'is-drop-not-allow': !this.dragState?.allowDrop,
                    'is-drop-inner': this.dragState?.dropType && this.dragState.dropType === 'inner'
                })}
                role="tree"
            >
                {
                    this.treeRoot?.childNodes.map(child => {
                        return this.renderTreeNode(child);
                    })
                }
                {
                    this.isEmpty? (
                        <div className="wu-tree_empty-block">
                            <span className="wu-tree_empty-text">{this.emptyText}</span>
                        </div>
                    ): null
                }
                {
                    this.dragState?.showDropIndicator? (
                        <div
                            className="wu-tree_drop-indicator"
                            ref="dropIndicator">
                        </div>
                    ): null
                }
            </div>
        );
    }
}
