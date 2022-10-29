import loader, { Monaco } from '@monaco-editor/loader';
// import * as monaco from 'monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';



/**
 * 实例化编辑器
 */
export function createEditor(editorContainer: HTMLElement, options: monaco.editor.IStandaloneEditorConstructionOptions) {
    return new Promise((resolve, reject) => {
        loader.config({ monaco });
        loader.init().then((monacoInstance) => {
            const editor = monacoInstance.editor.create(editorContainer, options);
            resolve(editor);
        }).catch(e => {
            reject(e);
        });
    });
}

/**
 * 实例化编辑器
 */
export function createEditorByLoader(editorContainer: HTMLElement, options: monaco.editor.IStandaloneEditorConstructionOptions): Promise<{ editor: monaco.editor, monacoInstance: Monaco }> {
    return new Promise((resolve, reject) => {
        loader.init().then((monacoInstance) => {
            const editor: monaco.editor = monacoInstance.editor.create(editorContainer, options);
            resolve({ editor, monacoInstance });
        }).catch(e => {
            reject(e);
        });
    });
}
