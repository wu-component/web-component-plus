import { Node } from './model/Node';
/**
 * 单个树节点参数
 */
export interface TreeNodeProps {
    node: Node;
    props: Record<string, string>;
    renderContent: Function;
    renderAfterExpand: boolean;
    showCheckbox: boolean;
}
