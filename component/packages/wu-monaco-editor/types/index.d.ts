import { OnConnected, WuComponent } from '@wu-component/web-core-plus';
import type { WuMonacoEditor } from "./editor";
import type { WuMonacoEditorPreview } from "./preview";
export declare class WuCodePlayground extends WuComponent implements OnConnected {
    constructor();
    name: string;
    editorContainer: WuMonacoEditor;
    previewContainer: WuMonacoEditorPreview;
    initialEvalSuccess: boolean;
    connected(shadowRoot: ShadowRoot): void;
    /**
     * 开始执行代码
     */
    runCode(): Promise<void>;
    /**
     * 加载依赖
     */
    loadDependencies(): void;
    render(_renderProps?: {}, _store?: {}): any;
}
