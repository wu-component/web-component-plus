import { WuComponent, OnConnected, OnDisConnected } from '@wu-component/web-core-plus';
import "@wu-component/wu-code-sandbox";
export declare class WuWalineCommentSandbox extends WuComponent implements OnConnected, OnDisConnected {
    constructor();
    corepath: string;
    compath: string;
    path: string;
    serverurl: string;
    private sandboxDom;
    messageFun(e: any): void;
    render(_renderProps?: {}, _store?: {}): any;
}
