

export const commonOptions = {
  tabSize: 2,
};

export const tsxCompilerOptions = () => {
    const monaco = window.monaco;
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
        // downlevelIteration: true,
        moduleResolution: 2,
        removeComments: true,
        noImplicitAny: true,
        strictNullChecks: true,
        strictFunctionTypes: true,
        strictPropertyInitialization: true,
        noImplicitThis: true,
        noImplicitReturns: true,

        alwaysStrict: true,
        allowUnreachableCode: false,
        allowUnusedLabels: false,

        downlevelIteration: false,
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

        lib: [ 'dom', 'dom.iterable', 'esnext' ],
    };

};
