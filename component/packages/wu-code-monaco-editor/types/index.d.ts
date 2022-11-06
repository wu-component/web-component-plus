import { OnConnected, WuComponent } from "@wu-component/web-core-plus";
export declare class WuCodeMonacoEditor extends WuComponent implements OnConnected {
    constructor();
    initialValue: string;
    language: string;
    theme: string;
    get editor(): any;
    set editor(value: any);
    get monacoInstance(): any;
    set monacoInstance(value: any);
    addTsDeclaration(url: string, name?: string): Promise<void>;
    private formatFile;
    private initEditor;
    connected(shadowRoot: ShadowRoot): void;
    render(_renderProps?: {}, _store?: {}): any;
}
