import { getReferencePaths, resolvePath } from "../utils";
// import { monaco } from "./monaco";
import { tsxCompilerOptions } from "./options";
// const typescriptDefaults = () =>  monaco.languages.typescript.typescriptDefaults;
export const addExtraLib = (content: string, filePath?: string) => {
    const monaco = window.monaco;
    monaco.languages.typescript.typescriptDefaults.addExtraLib(content, filePath);
};


export const compileTS = async (uri: InstanceType<typeof monaco.Uri>) => {
    console.log(uri);
    // const tsWorker = await monaco.languages.typescript.getTypeScriptWorker();
    const monaco = window.monaco;
    const tsWorker = await monaco.languages.typescript.getTypeScriptWorker();
    const client = await tsWorker(uri);
    const result = await client.getEmitOutput(uri.toString());
    const files = result.outputFiles[0];
    return files.text;
};

export const updateCompilerOptions = (options: Parameters<typeof monaco.languages.typescript.typescriptDefaults.setCompilerOptions>[0]) => {
    const monaco = window.monaco;
    const CompilerOptions = monaco.languages.typescript.typescriptDefaults.getCompilerOptions();
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        ...CompilerOptions,
        ...options
    });
};

export const createTSXModel = (content: string) => {
    const monaco = window.monaco;
    updateCompilerOptions(tsxCompilerOptions());
    return monaco.editor.createModel(
        content,
        "typescript",
        monaco.Uri.file("input.tsx")
    );
};

const ExtraLibs = {};
export const addModuleDeclaration = async (url: string, moduleName?: string) => {
    console.log(url, moduleName);
    const key = url;
    if (key in ExtraLibs) {
      return ExtraLibs[key];
    }

    const text = await fetch(url).then(res => res.text());
    console.log(text);

    const paths = getReferencePaths(text);
    console.log(paths);
    await Promise.all(paths.map(path => addModuleDeclaration(resolvePath(url, path))));

    const wrapped = moduleName ? `declare module "${moduleName}" { ${text} }` : text;
    const lib = addExtraLib(wrapped, moduleName);
    ExtraLibs[key] = lib;
};
