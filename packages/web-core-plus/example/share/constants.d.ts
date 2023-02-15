export declare const enum MEMBER_FLAGS {
    String = 1,
    Number = 2,
    Boolean = 4,
    Any = 8,
    Unknown = 16,
    State = 32,
    Method = 64,
    Event = 128,
    Element = 256,
    ReflectAttr = 512,
    Mutable = 1024,
    Prop = 31,
    HasAttribute = 15,
    PropLike = 63
}
export declare const enum EVENT_FLAGS {
    Cancellable = 1,
    Composed = 2,
    Bubbles = 4
}
export declare const enum LISTENER_FLAGS {
    Passive = 1,
    Capture = 2,
    TargetDocument = 4,
    TargetWindow = 8,
    TargetBody = 16,
    /**
     * @deprecated Prevented from new apps, but left in for older collections
     */
    TargetParent = 32
}
export declare const enum HOST_FLAGS {
    hasConnected = 1,
    hasRendered = 2,
    isWaitingForChildren = 4,
    isConstructingInstance = 8,
    isQueuedForUpdate = 16,
    hasInitializedComponent = 32,
    hasLoadedComponent = 64,
    isWatchReady = 128,
    isListenReady = 256,
    needsRerender = 512,
    devOnRender = 1024,
    devOnDidLoad = 2048
}
export declare const enum CMP_FLAGS {
    shadowDomEncapsulation = 1,
    scopedCssEncapsulation = 2,
    hasSlotRelocation = 4,
    needsShadowDomShim = 8,
    shadowDelegatesFocus = 16,
    hasMode = 32,
    needsScopedEncapsulation = 10
}
/**
 * Default style mode id
 */
export declare const DEFAULT_STYLE_MODE = "$";
/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */
export declare const EMPTY_OBJ: any;
/**
 * Namespaces
 */
export declare const SVG_NS = "http://www.w3.org/2000/svg";
export declare const HTML_NS = "http://www.w3.org/1999/xhtml";
export declare const XLINK_NS = "http://www.w3.org/1999/xlink";
export declare const XML_NS = "http://www.w3.org/XML/1998/namespace";
/**
 * File names and value
 */
export declare const COLLECTION_MANIFEST_FILE_NAME = "collection-manifest.json";
