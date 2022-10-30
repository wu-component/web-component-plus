export declare const addExtraLib: (content: string, filePath?: string) => void;
export declare const compileTS: (uri: import("monaco-editor").Uri) => Promise<string>;
export declare const updateCompilerOptions: (options: import("monaco-editor").languages.typescript.CompilerOptions) => void;
export declare const createTSXModel: (content: string) => import("monaco-editor").editor.ITextModel;
export declare const addModuleDeclaration: (url: string, moduleName?: string) => Promise<any>;
