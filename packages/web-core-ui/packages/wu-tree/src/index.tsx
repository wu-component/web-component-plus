import { Component, Emit, h, OnConnected, Prop, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import css1 from './tree/index.scss';
import { Tree } from './tree';

interface DataOptions {
    id: string;
    label: string;
    disabled: string;
}

type TypeEnums = 'checkbox' | 'radio' | false;

@Component({
    name: 'wu-plus-tree',
    css: css + css1,
})
export class WuTree extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    private tree!: Tree;

    public override connected(shadowRoot: ShadowRoot) {
        const that = this;
        const option3 = {
            label: 'text',
            pId: false,
            selectType: this.selectType,
            canMove: this.canMove,
            defaultCheckedKeys: this.defaultCheckedKeys,
            // defaultExpandedKeys: this.defaultExpandedKeys,
            defaultExpandedKeys: [],
            checkDisabled: function (d) {
                return d[that.options.disabled] === true;
            },
            autoOpen: function (d, level) {
                return level <= 1;
               /* if (that.defaultExpandedKeys.length) {
                    return that.defaultExpandedKeys.includes(d[that.options.id]);
                } else {
                    return level <= 1;
                }*/
            },
            checkSticky: { //check关联
                on: 'pc',//p,自动勾选父，c自动勾选子，function
                off: 'pc'
            },
            hideIcon: true,//是否隐藏默认图标
            on: {
                clickNode: ($t, nodedata, nodekey) => {
                    that.nodeClick({
                        nodeData: nodedata,
                        nodeKey: nodekey
                    });
                    return true;//true则设置该节点为当前点击元素，false反之
                },
                checkChange: (checkedData) => {
                    that.checkChange(checkedData);
                },
                moveChange: (movedNode, currentData) => {
                    that.moveChange({
                        movedNode,
                        currentData
                    });
                }
            },
            ...this.options,
        };
        Promise.resolve().then(() => {
            this.tree = new Tree(shadowRoot.querySelector('#tree1'), this.data, option3);
        });

    }

    @Emit('node-click')
    public nodeClick(params: any) {
        return params;
    }

    @Emit('check-change')
    public checkChange(params) {
        return params;
    }

    @Emit('move-change')
    public moveChange(params) {
        return params;
    }

    @Prop({ default: '300px', type: String })
    public width: string;

    @Prop({ default: '450px', type: String })
    public height: string;

    @Prop({ default:{ id: 'id', label: 'label', disabled: 'disabled' }, type: Object })
    public options: DataOptions;

    @Prop({ default: 32, type: Number })
    public lineHeight: number

    @Prop({ default: false })
    public selectType: TypeEnums

    @Prop({ default: false, type: Boolean })
    public canMove: boolean;

    @Prop({ default: [], type: Object })
    public data: any;

    @Prop({ default: [], type: Array })
    public defaultCheckedKeys: any;

    @Prop({ default: [], type: Array })
    public defaultExpandedKeys: any;


    /**
     * 获取选中数据
     */
    public getChecked() {
        return this.tree.getChecked();
    }

    /**
     * 选中全部,justResult为true则仅选择当前搜索结果
     * @param justResult
     */
    public checkAll(justResult = true) {
        return this.tree.checkAll(justResult);
    }

    /**
     * 清空所选项
     */
    public clearAll(){
        return this.tree.clearAll();
    }

    /**
     * 设置选中节点，keys为选中的节点id的数组
     */
    public setCheckedKeys(keys: string[]){
        return this.tree.setCheckedKeys(keys);
    }

    /**
     * 设置选中节点，nodes为选中节点的数组
     */
    public setCheckedNodes(nodes: any[]){
        return this.tree.setCheckedNodes(nodes);
    }

    /**
     * 编辑节点
     */
    public editNode(nodes: any){
        return this.tree.editNode(nodes);
    }

    /**
     * 添加节点,id:添加到的父节点id，当添加根节点时id为null,node新节点数据
     */
    public addNode(id: string, nodes: any){
        return this.tree.addNode(id, nodes);
    }

    /**
     * 删除节点
     */
    public deleteNode(id: string){
        return this.tree.deleteNode(id);
    }

    /**
     * :获取某个节点数据
     */
    public getNodeById(id: string){
        return this.tree.getNodeById(id);
    }

    /**
     * :重新计算容器高度
     */
    public resize(){
        return this.tree.container.resize();
    }

    /**
     * :重新绘制
     */
    public refreshDom(justScroll = false, needLocate = false){
        return this.tree.refreshDom(justScroll, needLocate);
    }

    /**
     * :销毁实例，主要用于清除绑定事件
     */
    public destory(){
        return this.tree.destory();
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div id="tree1" class="wu-tree_inner" style={{ height: this.height, width: this.width }}></div>
        );
    }
}
