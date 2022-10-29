import { OnConnected, WuComponent } from "@wu-component/web-core-plus";
export declare class WuCodeMonacoEditor extends WuComponent implements OnConnected {
    constructor();
    initialValue: string;
    language: string;
    theme: string;
    private __editor;
    monacoInstance: any;
    get editor(): any;
    set editor(value: any);
    private formatFile;
    private initEditor;
    connected(shadowRoot: ShadowRoot): void;
    render(_renderProps?: {}, _store?: {}): any;
}
