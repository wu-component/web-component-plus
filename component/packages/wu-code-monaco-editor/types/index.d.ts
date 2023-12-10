import { h, OnConnected, WuComponent } from "@wu-component/web-core-plus";
export declare class WuCodeMonacoEditor extends WuComponent implements OnConnected {
    constructor();
    initialValue: string;
    language: string;
    theme: string;
    width: string;
    height: string;
    /**
     * mode 缓存
     * @private
     */
    private modes;
    /**
     * 更新语言
     * @param language
     * @param value
     */
    updateLanguage(language: string, value: string): void;
    get editor(): any;
    set editor(value: any);
    get monacoInstance(): any;
    set monacoInstance(value: any);
    /**
     * 添加类型文件
     * @param url
     * @param name
     */
    addTsDeclaration(url: string, name?: string): Promise<void>;
    /**
     * 格式化初始值
     * @param doc
     * @private
     */
    private formatFile;
    /**
     * 初始化编辑器
     * @private
     */
    private initEditor;
    /**
     * 窗口更新
     * @param e
     */
    resizeFun(e: any): void;
    connected(shadowRoot: ShadowRoot): void;
    disConnected(shadowRoot: ShadowRoot): void;
    render(_renderProps?: {}, _store?: {}): h.JSX.Element;
}
