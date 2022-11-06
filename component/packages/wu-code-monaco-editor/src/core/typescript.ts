import { getReferencePaths, resolvePath } from "../utils";
// import { monaco } from "./monaco";
import { tsxCompilerOptions } from "./options";
import { getMonaco } from "./content";
// const typescriptDefaults = () =>  monaco.languages.typescript.typescriptDefaults;
export const addExtraLib = (content: string, that: any, filePath?: string): any => {
    const monaco = getMonaco(that);
    monaco?.languages?.typescript.typescriptDefaults.addExtraLib(content, filePath);
};


export const compileTS = async (uri: InstanceType<typeof monaco.Uri>, that: any) => {
    // const tsWorker = await monaco.languages.typescript.getTypeScriptWorker();
    const monaco = getMonaco(that);
    const tsWorker = await monaco.languages.typescript.getTypeScriptWorker();
    const client = await tsWorker(uri);
    const result = await client.getEmitOutput(uri.toString());
    const files = result.outputFiles[0];
    return files.text;
};

// export const updateCompilerOptions = (options: Parameters<typeof monaco.languages.typescript.typescriptDefaults.setCompilerOptions>[0]) => {
export const updateCompilerOptions = (options: any, that: any) => {
    const monaco = getMonaco(that);
    const CompilerOptions = monaco.languages.typescript.typescriptDefaults.getCompilerOptions();
    // @ts-ignore
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({ ...CompilerOptions, ...options });
};

export const createTSXModel = (content: string, that: any) => {
    const monaco = getMonaco(that);
    const codeModel =  monaco.editor.createModel(
        content,
        "typescript",
        monaco.Uri.file("index.tsx")
    );
    updateCompilerOptions(tsxCompilerOptions(that), that);
    return codeModel;
};

const ExtraLibs: Record<any, any> = {};
export const addModuleDeclaration = async (url: string, content: any, moduleName?: string) => {


    const text = await fetch(url).then(res => res.text());

    const paths = getReferencePaths(text);
    await Promise.all(paths.map(path => addModuleDeclaration(resolvePath(url, path), content)));

    // const wrapped = moduleName ? `declare module "${moduleName}" { ${text} }` : text;
    const wrapped = text;
    addExtraLib(wrapped, content, moduleName );
};

/**
 * 添加类型
 * @param url
 * @param moduleName
 */
export async function addTsDeclaration(url, moduleName?){
    const key = url;
    if (key in ExtraLibs) {
        return ExtraLibs[key];
    }
    const text = await fetch(url).then(res => res.text());
    const wrapped = moduleName
        ? `declare module "${moduleName}" { ${text} }`
        : text;
    ExtraLibs[key] = addExtraLib(wrapped, this, moduleName );
};
