export declare const addExtraLib: (content: string, that: any, filePath?: string) => any;
export declare const compileTS: (uri: any, that: any) => Promise<any>;
export declare const updateCompilerOptions: (options: any, that: any) => void;
export declare const createTSXModel: (content: string, that: any) => any;
export declare const addModuleDeclaration: (url: string, content: any, moduleName?: string) => Promise<void>;
/**
 * 添加类型
 * @param url
 * @param moduleName
 */
export declare function addTsDeclaration(url: any, moduleName?: any): Promise<any>;
