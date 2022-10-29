import { Component, h, OnConnected, Prop, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import { compileTS } from "./core/typescript";
import type { WuMonacoEditor } from "./editor";
import type { WuMonacoEditorPreview } from "./preview";
import srcdoc from './srcdoc.txt';
import initialSrcTs from './initialSrcTs.txt';

@Component({
    name: 'wu-code-playground',
    css: css,
})
export class WuCodePlayground extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    @Prop({ default: '', type: String })
    public name: string;

    public editorContainer: WuMonacoEditor = null;
    public previewContainer: WuMonacoEditorPreview = null;

    public initialEvalSuccess = false;

    public override connected(shadowRoot: ShadowRoot): void {
        this.editorContainer = shadowRoot.querySelector("#editor");
        this.previewContainer = shadowRoot.querySelector("#preview");
        // this.editorContainer.setAttribute("theme", "vs-dark");
        // this.editorContainer.setAttribute("theme", "vs-dark");
        if (!this.initialEvalSuccess) {
            setTimeout(() => {
                this.runCode();
                this.initialEvalSuccess = true;
            }, 1000);
        }
    }

    /**
     * 开始执行代码
     */
    public async runCode() {
        const editor = this.editorContainer.editor;
        const tsJs: string = await compileTS(editor.getModel("typescript").uri);
        this.previewContainer.runCode('ts', tsJs);

    }

    /**
     * 加载依赖
     */
    public loadDependencies() {
        this.previewContainer.loadDependencies({
                "name": "o(*≧▽≦)ツ┏━┓",
                "dependencies": {
                    "react": "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"

                },
                "types": {
                    "react": "https://cdn.jsdelivr.net/npm/@types/react/index.d.ts"
                }
            }
        ).then(r => {});
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="playgroundContainer">
                <div class="toolsNav">
                    <div class="runCode" onClick={() => this.runCode()}>
                        run
                    </div>
                    {/*<div class="loadDepend" onClick={() => this.loadDependencies()}>
                        loadDepend
                    </div>*/}
                </div>
                <div class="content">
                    <div className="editorContainer">
                        <wu-code-monaco-editor
                            className="editorContainer"
                            id="editor"
                            initial-value={initialSrcTs}
                            theme="vs-dark"
                            language="typescript"
                        ></wu-code-monaco-editor>
                    </div>
                    <div className="codeViewerContainer">
                        <wu-code-sandbox id="preview" isBeforeRefresh={true} initial-src-doc={srcdoc}></wu-code-sandbox>
                    </div>
                </div>
            </div>
        );
    }
}
