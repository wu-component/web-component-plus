import { Component, h, OnConnected, Prop, WuComponent } from "@wu-component/web-core-plus";
import css from "./index.scss";
import css1 from "monaco-editor/min/vs/editor/editor.main.css";
import { createEditorByLoader, tsxCompilerOptions } from "../core";
import { updateCompilerOptions } from "../core/typescript";
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';

@Component({
    name: 'wu-monaco-editor',
    css: css + css1,
})
export class WuMonacoEditor extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    @Prop({ type: String, default: "" })
    public initialValue: string;

    @Prop({ type: String, default: "typescript" })
    public language: string;

    @Prop({ type: String, default: "vs-dark" })
    public theme: string;

    private __editor: monaco.editor;

    public monacoInstance: monaco;

    get editor(): monaco.editor {
            return this.__editor;
    }

    set editor(value: monaco.editor) {
        if (value) {
            this.__editor = value;
        }
    }

    private async initEditor() {
        const { editor, monacoInstance } = await createEditorByLoader(this.shadowRoot.querySelector("#container"), {
            value: this.initialValue,
            language: this.language,
            theme: this.theme
        });
        this.editor = editor;
        this.monacoInstance = monacoInstance;
        window.monaco = monacoInstance;
        window.editor = editor;
        // updateCompilerOptions({ moduleResolution: 2 });
        updateCompilerOptions(tsxCompilerOptions());
        // await addModuleDeclaration("https://unpkg.com/@wu-component/web-core-plus@0.3.3/dist/index.es.js", "@wu-component/web-core-plus");
        return this.editor;
    }

    public override connected(shadowRoot: ShadowRoot): void {
        this.initEditor().then(r => {});
        this.addEventListener("resize", (e: MouseEvent) => {
            console.log(e);
        });
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div id="container"></div>
        );
    }
}
