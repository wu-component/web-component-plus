const MONACO_CONTENT = new WeakMap();
const EDITOR_CONTENT = new WeakMap();


const getMonaco = (content) => {
    return MONACO_CONTENT.get(content);
};

const setMonaco = (content, value) => {
    return MONACO_CONTENT.set(content, value);
};

const getEditor = (content) => {
    return EDITOR_CONTENT.get(content);
};

const setEditor = (content, value) => {
    return EDITOR_CONTENT.set(content, value);
};


export { MONACO_CONTENT, EDITOR_CONTENT, getMonaco, setMonaco, getEditor, setEditor };
