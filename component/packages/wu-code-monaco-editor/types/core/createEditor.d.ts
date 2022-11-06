/**
 * 实例化编辑器
 */
export declare function createEditorByLoader(editorContainer: HTMLElement, options: any): Promise<{
    editor: any;
    monacoInstance: any;
}>;
/**
 * 创建编辑器语言 CONTENT
 * @param type
 * @param value
 */
export declare function createEditorMode(type: string, value: string): any;
