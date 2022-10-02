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
export const PROP_META_KEY = Symbol('PROP_META_KEY');
export const STATE_META_KEY = Symbol('STATE_META_KEY');
export const COMPONENT_CUSTOM_EVENT = Symbol('COMPONENT_CUSTOM_EVENT');
export const COMPONENT_CUSTOM_METHOD = Symbol('COMPONENT_CUSTOM_METHOD');
export const COMPONENT_CUSTOM_INJECT = Symbol('COMPONENT_CUSTOM_INJECT');
export const COMPONENT_CUSTOM_PROVIDE = Symbol('COMPONENT_CUSTOM_PROVIDE');
export const COMPONENT_WATCH = Symbol('COMPONENT_WATCH');
