import loader from '@monaco-editor/loader';
import { createTSXModel } from "./typescript";
import { getMonaco } from "./content";
import { commonOptions } from "./options";
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

/**
 * 创建编辑器语言 CONTENT
 * @param type
 * @param value
 */
export function createEditorMode(type: string, value: string) {
    try {
        const monaco = getMonaco(this);
        /* const modes = monaco.editor.getModels();
         let currentMode = null;
         if (modes.length) {
             currentMode = modes.find(item => item._languageId === type);
         }
         if (currentMode) {
             return currentMode;
         }*/
        const model =
            type === "typescript"
                ? createTSXModel(value, this)
                : monaco.editor.createModel(value, type);
        model.updateOptions(commonOptions);
        return model;
    }catch (e) {
        console.warn(e);
        return  null;
    }

}
