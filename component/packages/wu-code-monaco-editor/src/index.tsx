import { Component, h, OnConnected, Prop, WuComponent } from "@wu-component/web-core-plus";
import css from "./index.scss";
import css1 from "monaco-editor/min/vs/editor/editor.main.css";
import { createEditorByLoader, createEditorMode } from "./core";
import { getEditor, setEditor, getMonaco, setMonaco } from "./core/content";
import { addModuleDeclaration } from "./core/typescript";

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
    // private __editor: any;

    // public monacoInstance: monaco;
    // public monacoInstance: any;

    get editor() {
        return getEditor(this);
    }

    set editor(value: any) {
        if (value) {
            setEditor(this, value);
        }
    }

    get monacoInstance() {
        return getMonaco(this);
    }

    set monacoInstance(value: any) {
        if (value) {
            setMonaco(this, value);
        }
    }

    public addTsDeclaration(url: string, name?: string) {
        console.log("fetch", url);
        // return addTsDeclaration.call(this, url, name);
        return addModuleDeclaration(url, this, name);
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
                const reader = new FileReader();
                reader.onload = ()=> {
                    // 语句是为了显示内容换行
                    // @ts-ignore
                    /*const str = reader.result?.replace(/\n/g,"<br/>");
                    console.log(str);*/
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
        const initialValue = this.initialValue || '';
        this.initialValue = await this.formatFile(initialValue);
        const { editor, monacoInstance } = await createEditorByLoader(this.shadowRoot.querySelector("#container"), {
            value: this.initialValue,
            language: (this as any).language,
            theme: (this as any).theme,
            // mode: createEditorMode.call(this, (this.props as any).language, this.initialValue)
        });
        this.editor = editor;
        this.monacoInstance = monacoInstance;
        const mode = createEditorMode.call(this, (this as any).language, this.initialValue);
        mode && editor.setModel(mode);
        // editor.restoreViewState(data[type].state);
        editor.focus();
        this.addTsDeclaration("https://static-cdn.canyuegongzi.xyz/ts/Wu.d.ts");
        // this.addTsDeclaration("https://static-cdn.canyuegongzi.xyz/ts/index.d.ts");
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
// https://registry.npmjs.org/monaco-editor/-/monaco-editor-0.34.1.tgz
