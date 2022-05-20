import { BuildConditionals } from '../declarations';

export const BUILD: BuildConditionals = {
    allRenderFn: false,
    cmpDidLoad: true,
    cmpDidUnload: false,
    cmpDidUpdate: true,
    cmpDidRender: true,
    cmpWillLoad: true,
    cmpWillUpdate: true,
    cmpWillRender: true,
    connectedCallback: true,
    disconnectedCallback: true,
    element: true,
    event: true,
    hasRenderFn: true,
    lifecycle: true,
    hostListener: true,
    hostListenerTargetWindow: true,
    hostListenerTargetDocument: true,
    hostListenerTargetBody: true,
    hostListenerTargetParent: false,
    hostListenerTarget: true,
    member: true,
    method: true,
    mode: true,
    observeAttribute: true,
    prop: true,
    propMutable: true,
    reflect: true,
    scoped: true,
    shadowDom: true,
    slot: true,
    cssAnnotations: true,
    state: true,
    style: true,
    svg: true,
    updatable: true,
    vdomAttribute: true,
    vdomXlink: true,
    vdomClass: true,
    vdomFunctional: true,
    vdomKey: true,
    vdomListener: true,
    vdomRef: true,
    vdomPropOrAttr: true,
    vdomRender: true,
    vdomStyle: true,
    vdomText: true,
    watchCallback: true,
    taskQueue: true,
    hotModuleReplacement: false,
    isDebug: false,
    isDev: false,
    isTesting: false,
    hydrateServerSide: false,
    hydrateClientSide: false,
    lifecycleDOMEvents: false,
    lazyLoad: false,
    profile: false,
    slotRelocation: true,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    hydratedAttribute: false,
    hydratedClass: true,
    safari10: false,
    scriptDataOpts: false,
    scopedSlotTextContentFix: false,
    shadowDomShim: false,
    slotChildNodesFix: false,
    invisiblePrehydration: true,
    propBoolean: true,
    propNumber: true,
    propString: true,
    cssVarShim: false,
    constructableCSS: true,
    cmpShouldUpdate: true,
    devTools: false,
    dynamicImportShim: false,
    shadowDelegatesFocus: true,
    initializeNextTick: false,
    asyncLoading: false,
    asyncQueue: false,
    transformTagName: false,
    attachStyles: true,
};

export const Env = {};

export const NAMESPACE = /* default */ 'app' as string;

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
