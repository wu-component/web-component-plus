import { OnConnected, WuComponent } from "@wu-component/web-core-plus";
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
export declare class WuMonacoEditor extends WuComponent implements OnConnected {
    constructor();
    initialValue: string;
    language: string;
    theme: string;
    private __editor;
    monacoInstance: monaco;
    get editor(): monaco.editor;
    set editor(value: monaco.editor);
    private initEditor;
    connected(shadowRoot: ShadowRoot): void;
    render(_renderProps?: {}, _store?: {}): any;
}
