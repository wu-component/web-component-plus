import { OnConnected, WuComponent } from '@wu-component/web-core-plus';
interface DataOptions {
    id: string;
    label: string;
    disabled: string;
}
declare type TypeEnums = 'checkbox' | 'radio' | false;
export declare class WuTree extends WuComponent implements OnConnected {
    constructor();
    private tree;
    connected(shadowRoot: ShadowRoot): void;
    nodeClick(params: any): any;
    checkChange(params: any): any;
    moveChange(params: any): any;
    width: string;
    height: string;
    options: DataOptions;
    lineHeight: number;
    selectType: TypeEnums;
    canMove: boolean;
    data: any;
    defaultCheckedKeys: any;
    defaultExpandedKeys: any;
    /**
     * 获取选中数据
     */
    getChecked(): {
        nodes: any;
        keys: any;
    };
    /**
     * 选中全部,justResult为true则仅选择当前搜索结果
     * @param justResult
     */
    checkAll(justResult?: boolean): void;
    /**
     * 清空所选项
     */
    clearAll(): void;
    /**
     * 设置选中节点，keys为选中的节点id的数组
     */
    setCheckedKeys(keys: string[]): void;
    /**
     * 设置选中节点，nodes为选中节点的数组
     */
    setCheckedNodes(nodes: any[]): void;
    /**
     * 编辑节点
     */
    editNode(nodes: any): void;
    /**
     * 添加节点,id:添加到的父节点id，当添加根节点时id为null,node新节点数据
     */
    addNode(id: string, nodes: any): void;
    /**
     * 删除节点
     */
    deleteNode(id: string): void;
    /**
     * :获取某个节点数据
     */
    getNodeById(id: string): any;
    /**
     * :重新计算容器高度
     */
    resize(): any;
    /**
     * :重新绘制
     */
    refreshDom(justScroll?: boolean, needLocate?: boolean): void;
    /**
     * :销毁实例，主要用于清除绑定事件
     */
    destory(): void;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
