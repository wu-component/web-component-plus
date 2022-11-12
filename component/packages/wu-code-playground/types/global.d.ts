import { editor } from "monaco-editor";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
type IMonaco = typeof import("monaco-editor")

export {};
declare global {
    interface Window {
        monaco: IMonaco;
        editor: IStandaloneCodeEditor,
        __DOC_VERSION__: any
    }
}
