function getGlobal() {
    return (
        self ||
        window ||
        (function() {
            // @ts-ignore
            return this;
        })()
    );
}
export const webOptions = {
    store: null,
    root: getGlobal(),
    mapping: {} as any,
    vnode: undefined,
};
export const ATTR_KEY = 'prevProps';
export const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
