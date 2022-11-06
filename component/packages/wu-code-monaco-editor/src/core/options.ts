import { getMonaco } from "./content";


export const commonOptions = {
  tabSize: 2,
};

export const tsxCompilerOptions = (content) => {
    const monaco = getMonaco(content);
    return {
        jsx: monaco.languages.typescript.JsxEmit['React'],
        jsxFactory: "h",
        jsxFragmentFactory: "Fragment",
        // jsx: monaco.languages.typescript.JsxEmit['React'],
        target: monaco.languages.typescript.ScriptTarget['ES5'],
        module: monaco.languages.typescript.ModuleKind.ES2015,
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        allowJs: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        downlevelIteration: true,
        removeComments: true,
        lib: [ 'dom', 'dom.iterable', 'esnext' ],
        noImplicitAny: false,


        // downlevelIteration: true,
        moduleResolution: 2,
        strictNullChecks: true,
        strictFunctionTypes: true,
        strictPropertyInitialization: false,
        noImplicitThis: true,
        noImplicitReturns: true,

        alwaysStrict: true,
        allowUnreachableCode: false,
        allowUnusedLabels: false,

        noEmitHelpers: false,
        noLib: false,
        noStrictGenericChecks: false,
        noUnusedLocals: false,
        noUnusedParameters: false,

        // esModuleInterop: false,
        preserveConstEnums: false,
        // removeComments: false,
        skipLibCheck: false,

        // experimentalDecorators: false,
        // emitDecoratorMetadata: false,

        noSemanticValidation: false,
        noSyntaxValidation: false,

    };

};
