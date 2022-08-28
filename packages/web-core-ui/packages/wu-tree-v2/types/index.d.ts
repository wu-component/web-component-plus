import { OnConnected, WuComponent } from '@wu-component/web-core-plus';
import './treeNode';
export declare class WuTree extends WuComponent implements OnConnected {
    constructor();
    connected(shadowRoot: ShadowRoot): void;
    nodeClick(params: any): any;
    checkChange(params: any): any;
    moveChange(params: any): any;
    render(_renderProps?: {}, _store?: {}): any;
}
