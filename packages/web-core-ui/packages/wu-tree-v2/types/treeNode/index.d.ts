import { OnConnected, WuComponent } from '@wu-component/web-core-plus';
import { Node } from '../model/Node';
export declare class WuTreeNode extends WuComponent implements OnConnected {
    constructor();
    node: Node;
    prop: Record<string, string>;
    connected(shadowRoot: ShadowRoot): void;
    nodeClick(params: any): any;
    checkChange(params: any): any;
    moveChange(params: any): any;
    render(_renderProps?: {}, _store?: {}): any;
}
