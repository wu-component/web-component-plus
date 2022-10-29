import loader from '@monaco-editor/loader';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';

/**
 * 实例化编辑器
 */
// export function createEditorByLoader(editorContainer: HTMLElement, options: Monaco.editor.IStandaloneEditorConstructionOptions): Promise<{ editor: monaco.editor, monacoInstance: Monaco }> {
export function createEditorByLoader(editorContainer: HTMLElement, options: any): Promise<{ editor: any, monacoInstance: any }> {
    return new Promise((resolve, reject) => {
        loader.init().then((monacoInstance) => {
            // @ts-ignore
            const editor: monaco.editor = monacoInstance.editor.create(editorContainer, options);
            resolve({ editor, monacoInstance });
        }).catch(e => {
            reject(e);
        });
    });
}
