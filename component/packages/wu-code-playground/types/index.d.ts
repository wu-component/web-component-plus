import { OnConnected, WuComponent } from '@wu-component/web-core-plus';
import "@wu-component/wu-code-monaco-editor";
import "@wu-component/wu-code-sandbox";
import "@wu-component/wu-lottie";
import type { WuCodeMonacoEditor } from "../../wu-code-monaco-editor/types";
import type { WuMonacoEditorPreview } from "../../wu-code-sandbox/types";
export declare class WuCodePlayground extends WuComponent implements OnConnected {
    constructor();
    isLoading: boolean;
    editorContainer: WuCodeMonacoEditor;
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
