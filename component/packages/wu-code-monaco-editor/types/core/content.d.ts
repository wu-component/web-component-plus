declare const MONACO_CONTENT: WeakMap<object, any>;
declare const EDITOR_CONTENT: WeakMap<object, any>;
declare const getMonaco: (content: any) => any;
declare const setMonaco: (content: any, value: any) => WeakMap<object, any>;
declare const getEditor: (content: any) => any;
declare const setEditor: (content: any, value: any) => WeakMap<object, any>;
export { MONACO_CONTENT, EDITOR_CONTENT, getMonaco, setMonaco, getEditor, setEditor };
