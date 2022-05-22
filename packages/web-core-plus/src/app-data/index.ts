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

export const WebUiConfig = {
    size: 'mini',
};
export const webOptions = {
    store: null,
    root: getGlobal(),
    mapping: {} as any,
    vnode: undefined,
};

// render modes

export const NO_RENDER = 0;
export const SYNC_RENDER = 1;
export const FORCE_RENDER = 2;
export const ASYNC_RENDER = 3;

export const ATTR_KEY = 'prevProps';

// DOM properties that should NOT have "px" added when numeric
export const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

export const COMPONENT_META_KEY = 'COMPONENT_META_KEY';
export const COMPONENT_EVENT_EMITTER_KEY = 'COMPONENT_EVENT_EMITTER_KEY';
export const PROP_META_KEY = 'PROP_META_KEY';
export const STATE_META_KEY = 'STATE_META_KEY';
export const COMPONENT_CUSTOM_EVENT = 'COMPONENT_CUSTOM_EVENT';
export const COMPONENT_CUSTOM_METHOD = 'COMPONENT_CUSTOM_METHOD';
export const COMPONENT_CUSTOM_INJECT = 'COMPONENT_CUSTOM_INJECT';
export const COMPONENT_CUSTOM_PROVIDE = 'COMPONENT_CUSTOM_PROVIDE';
export const COMPONENT_WATCH = 'COMPONENT_WATCH';
