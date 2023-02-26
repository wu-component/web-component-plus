import { Component, h, OnConnected, Prop, WuComponent } from "@wu-component/web-core-plus";
import css from "./index.scss";
import css1 from "monaco-editor/min/vs/editor/editor.main.css";
import { createEditorByLoader, createEditorMode } from "./core";
import { getEditor, setEditor, getMonaco, setMonaco } from "./core/content";
import { addModuleDeclaration } from "./core/typescript";
import { debounce } from "./utils";
import type editor from "monaco-editor";

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


    @Prop({ type: String, default: "100%" })
    public width: string;

    @Prop({ type: String, default: "100%" })
    public height: string;

    /**
     * mode 缓存
     * @private
     */
    private modes: Record<string, editor.editor.ITextModel> = {}

    /**
     * 更新语言
     * @param language
     * @param value
     */
    public updateLanguage(language: string, value: string) {
        if (language) {
            if (!this.modes[language]) {
                const mode = createEditorMode.call(this, language, value);
                this.modes[language] = mode;
            }
            this.modes[language] && this.editor.setModel(this.modes[language]);
            this.editor.focus();
        }
    }

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

    /**
     * 添加类型文件
     * @param url
     * @param name
     */
    public addTsDeclaration(url: string, name?: string) {
        return addModuleDeclaration(url, this, name);
    }

    /**
     * 格式化初始值
     * @param doc
     * @private
     */
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
                    resolve(reader.result as string);
                };
                reader.readAsText(file,'utf-8');
            }
            else{
                resolve(doc);
            }
        });

    }

    /**
     * 初始化编辑器
     * @private
     */
    private async initEditor() {
        const initialValue = this.initialValue || '';
        this.initialValue = await this.formatFile(initialValue);
        const dom: HTMLElement = this.shadowRoot.querySelector("#container");
        dom.style.width = this.width;
        dom.style.height = this.height;
        const { editor, monacoInstance } = await createEditorByLoader(this.shadowRoot.querySelector("#container"), {
            value: this.initialValue,
            language: this.language,
            theme: this.theme,
        });
        this.editor = editor;
        this.monacoInstance = monacoInstance;
        this.updateLanguage(this.language, this.initialValue);
        // this.addTsDeclaration("https://static-cdn.canyuegongzi.xyz/ts/Wu.d.ts");
        return this.editor;
    }

    /**
     * 窗口更新
     * @param e
     */
    public resizeFun(e) {
        debounce((e: any) => {
            this.editor.layout();
        }, 300);
    }

    public override connected(shadowRoot: ShadowRoot): void {
        this.initEditor().then(r => {
            this.editor.layout();
            window.addEventListener("resize", (e) => this.resizeFun(e));
        });
    }

    public override disConnected(shadowRoot: ShadowRoot): void {
        this.initEditor().then(r => {});
        window.addEventListener("resize", (e) => this.resizeFun(e));
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div id="container"></div>
        );
    }
}
