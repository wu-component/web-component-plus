import { Component, h, OnConnected, Prop, WuComponent } from "@wu-component/web-core-plus";
import css from "./index.scss";
import css1 from "monaco-editor/min/vs/editor/editor.main.css";
import { createEditorByLoader, tsxCompilerOptions } from "./core";
import { updateCompilerOptions } from "./core/typescript";

@Component({
    name: 'wu-code-monaco-editor',
    css: css + css1,
})
export class WuCodeMonacoEditor extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    @Prop({ type: String, default: "" })
    public initialValue: string;

    @Prop({ type: String, default: "typescript" })
    public language: string;

    @Prop({ type: String, default: "vs-dark" })
    public theme: string;

    // private __editor: monaco.editor;
    private __editor: any;

    // public monacoInstance: monaco;
    public monacoInstance: any;

    //get editor(): monaco.editor {
    get editor() {
            return this.__editor;
    }

    // set editor(value: monaco.editor) {
    set editor(value: any) {
        if (value) {
            this.__editor = value;
        }
    }

    private formatFile(doc: string): Promise<string> {
        return new Promise((resolve) => {
            if (doc.startsWith("data:text/plain;base64")) {
                const arr = doc.split(',');
                // const mime = arr[0].match(/:(.*?);/)[1];
                // const suffix = mime.split('/')[1];
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                const file = new File([ u8arr ], `initialSrcTs.tsx`, {
                    type: "text/plain"
                });
                console.log(file);
                const reader = new FileReader();
                reader.onload = ()=> {
                    // 语句是为了显示内容换行
                    // @ts-ignore
                    /*const str = reader.result?.replace(/\n/g,"<br/>");
                    console.log(str);*/
                    console.log(reader.result);
                    resolve(reader.result as string);
                };
                reader.readAsText(file,'utf-8');
            }
            else{
                resolve(doc);
            }
        });

    }

    private async initEditor() {
        const initialValue = (this.props as any).initialValue || '';
        this.initialValue = await this.formatFile(initialValue);
        const { editor, monacoInstance } = await createEditorByLoader(this.shadowRoot.querySelector("#container"), {
            value: this.initialValue,
            language: (this.props as any).language,
            theme: (this.props as any).theme
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
