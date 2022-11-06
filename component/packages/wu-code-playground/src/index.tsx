import { Component, h, OnConnected, WuComponent, Prop } from '@wu-component/web-core-plus';
import css from './index.scss';
import { compileTS } from "./core/typescript";
import "@wu-component/wu-code-monaco-editor";
import "@wu-component/wu-code-sandbox";
import "@wu-component/wu-lottie";
import type { WuCodeMonacoEditor } from "../../wu-code-monaco-editor/types";
import type { WuMonacoEditorPreview } from "../../wu-code-sandbox/types";
import srcdoc from './srcdoc.html';
import initialSrcTs from './initialSrcTs.txt';
import { debounce } from "./utils";

@Component({
    name: 'wu-code-playground',
    css: css,
})
export class WuCodePlayground extends WuComponent implements OnConnected {
    constructor() {
        super();
    }


    @Prop({ type: Boolean, default: true })
    public isLoading: boolean;

    public editorContainer: WuCodeMonacoEditor = null;

    public previewContainer: WuMonacoEditorPreview = null;

    public initialEvalSuccess = false;

    public override connected(shadowRoot: ShadowRoot): void {
        this.editorContainer = shadowRoot.querySelector("#editor");
        this.previewContainer = shadowRoot.querySelector("#preview");
        if (!this.initialEvalSuccess) {
            // @ts-ignore
            this.editorContainer?.addTsDeclaration("https://static-cdn.canyuegongzi.xyz/ts/Wu.d.ts");
            setTimeout(() => {
                this.runCode();
                this.initialEvalSuccess = true;
                this.isLoading = false;
            }, 1000);
        }
        const that = this;
        window.addEventListener("resize", (res) => {
            debounce(() => {
                that.editorContainer.editor.layout();
            }, 100, "editReSize");
        });
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
    //
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
                    <div className="loadingContainer" style={{ display: this.isLoading ? "flex": "none" }}>
                        <div className="lottie">
                            <wu-plus-lottie
                                data="https://static-cdn.canyuegongzi.xyz/lf20/lf20_qD2Qe90HNO.json"></wu-plus-lottie>
                        </div>
                    </div>
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
