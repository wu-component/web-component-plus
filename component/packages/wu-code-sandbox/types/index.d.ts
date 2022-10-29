import { OnConnected, WuComponent } from "@wu-component/web-core-plus";
import { LoadDependencies } from "./sandbox";
import { Store } from "./Store";
export declare class WuMonacoEditorPreview extends WuComponent implements OnConnected {
    constructor();
    initialSrcDoc: string;
    isBeforeRefresh: boolean;
    private container;
    private proxy;
    previewStore: Store;
    private formatFile;
    connected(shadowRoot: ShadowRoot): Promise<void>;
    /**
     * 沙箱执行code
     * @param type
     * @param code
     */
    runCode(type: string, code: string): void;
    loadDependencies(options: LoadDependencies): Promise<unknown>;
    render(_renderProps?: {}, _store?: {}): any;
}
