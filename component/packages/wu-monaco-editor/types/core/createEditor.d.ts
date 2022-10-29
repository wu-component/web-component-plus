import { Monaco } from '@monaco-editor/loader';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
/**
 * 实例化编辑器
 */
export declare function createEditor(editorContainer: HTMLElement, options: monaco.editor.IStandaloneEditorConstructionOptions): Promise<unknown>;
/**
 * 实例化编辑器
 */
export declare function createEditorByLoader(editorContainer: HTMLElement, options: monaco.editor.IStandaloneEditorConstructionOptions): Promise<{
    editor: monaco.editor;
    monacoInstance: Monaco;
}>;
