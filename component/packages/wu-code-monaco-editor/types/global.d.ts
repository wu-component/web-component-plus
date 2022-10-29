/*import { editor } from "monaco-editor";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
type IMonaco = typeof import("monaco-editor")*/

export {};
declare global {
    interface Window {
        monaco: any;
        editor: any
    }
}
