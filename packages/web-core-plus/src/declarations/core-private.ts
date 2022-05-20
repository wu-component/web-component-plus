export interface ImportData {
    tag?: string;
    encapsulation?: string;
    mode?: string;
}

export interface SerializeImportData extends ImportData {
    importeePath: string;
    importerPath?: string;
}

export interface BuildFeatures {
    // encapsulation
    style: boolean;
    mode: boolean;

    // dom
    shadowDom: boolean;
    shadowDelegatesFocus: boolean;
    scoped: boolean;

    // render
    /**
     * Every component has a render function
     */
    allRenderFn: boolean;
    /**
     * At least one component has a render function
     */
    hasRenderFn: boolean;

    // vdom
    vdomRender: boolean;
    vdomAttribute: boolean;
    vdomClass: boolean;
    vdomFunctional: boolean;
    vdomKey: boolean;
    vdomListener: boolean;
    vdomPropOrAttr: boolean;
    vdomRef: boolean;
    vdomStyle: boolean;
    vdomText: boolean;
    vdomXlink: boolean;
    slotRelocation: boolean;

    // elements
    slot: boolean;
    svg: boolean;

    // decorators
    element: boolean;
    event: boolean;
    hostListener: boolean;
    hostListenerTargetWindow: boolean;
    hostListenerTargetDocument: boolean;
    hostListenerTargetBody: boolean;
    /**
     * @deprecated Prevented from new apps, but left in for older collections
     */
    hostListenerTargetParent: boolean;
    hostListenerTarget: boolean;
    method: boolean;
    prop: boolean;
    propMutable: boolean;
    state: boolean;
    watchCallback: boolean;
    member: boolean;
    updatable: boolean;
    propBoolean: boolean;
    propNumber: boolean;
    propString: boolean;

    // lifecycle events
    lifecycle: boolean;
    cmpDidLoad: boolean;
    cmpShouldUpdate: boolean;
    cmpWillLoad: boolean;
    cmpDidUpdate: boolean;
    cmpWillUpdate: boolean;
    cmpWillRender: boolean;
    cmpDidRender: boolean;
    cmpDidUnload: boolean;
    connectedCallback: boolean;
    disconnectedCallback: boolean;
    asyncLoading: boolean;

    // attr
    observeAttribute: boolean;
    reflect: boolean;

    taskQueue: boolean;
}

export interface BuildConditionals extends Partial<BuildFeatures> {
    hotModuleReplacement?: boolean;
    isDebug?: boolean;
    isTesting?: boolean;
    isDev?: boolean;
    devTools?: boolean;
    invisiblePrehydration?: boolean;
    hydrateServerSide?: boolean;
    hydrateClientSide?: boolean;
    lifecycleDOMEvents?: boolean;
    cssAnnotations?: boolean;
    lazyLoad?: boolean;
    profile?: boolean;
    cssVarShim?: boolean;
    constructableCSS?: boolean;
    appendChildSlotFix?: boolean;
    slotChildNodesFix?: boolean;
    scopedSlotTextContentFix?: boolean;
    cloneNodeFix?: boolean;
    dynamicImportShim?: boolean;
    hydratedAttribute?: boolean;
    hydratedClass?: boolean;
    initializeNextTick?: boolean;
    safari10?: boolean;
    scriptDataOpts?: boolean;
    shadowDomShim?: boolean;
    asyncQueue?: boolean;
    transformTagName?: boolean;
    attachStyles?: boolean;
}

export type ModuleFormat = 'amd' | 'cjs' | 'es' | 'iife' | 'system' | 'umd' | 'commonjs' | 'esm' | 'module' | 'systemjs';

export interface RollupResultModule {
    id: string;
}
export interface RollupResults {
    modules: RollupResultModule[];
}

export interface CompilerBuildStatBundle {
    key: string;
    components: string[];
    bundleId: string;
    fileName: string;
    imports: string[];
    originalByteSize: number;
}

export interface BuildEntry {
    entryId: string;
    components: BuildComponent[];
    bundles: BuildBundle[];
    inputs: string[];
    modes?: string[];
    encapsulations: Encapsulation[];
}

export interface BuildBundle {
    fileName: string;
    outputs: string[];
    size?: number;
    mode?: string;
    scopedStyles?: boolean;
    target?: string;
}

export interface BuildSourceGraph {
    [filePath: string]: string[];
}

export interface BuildComponent {
    tag: string;
    dependencyOf?: string[];
    dependencies?: string[];
}

export interface BundleOutputChunk {
    code: string;
    fileName: string;
    isDynamicEntry: boolean;
    isEntry: boolean;
    map: any;
    dynamicImports: string[];
    imports: string[];
    exports: string[];
    modules: {
        [modulePath: string]: {
            renderedExports: string[];
            removedExports: string[];
            renderedLength: number;
            originalLength: number;
        };
    };
    name: string;
}

export type SourceTarget = 'es5' | 'es2017' | 'latest';

export interface BundleEntryInputs {
    [entryKey: string]: string;
}

/**
 * A note regarding Rollup types:
 * As of this writing, there is no great way to import external types for packages that are directly embedded in the
 * Stencil source. As a result, some types are duplicated here for Rollup that will be used within the codebase.
 * Updates to rollup may require these typings to be updated.
 */

export type RollupResult = RollupChunkResult | RollupAssetResult;

export interface RollupAssetResult {
    type: 'asset';
    fileName: string;
    content: string;
}

export interface RollupChunkResult {
    type: 'chunk';
    entryKey: string;
    fileName: string;
    code: string;
    isEntry: boolean;
    isComponent: boolean;
    isCore: boolean;
    isIndex: boolean;
    isBrowserLoader: boolean;
    imports: string[];
    moduleFormat: ModuleFormat;
    map?: RollupSourceMap;
}

export interface RollupSourceMap {
    file: string;
    mappings: string;
    names: string[];
    sources: string[];
    sourcesContent: string[];
    version: number;
    toString(): string;
    toUrl(): string;
}

export interface BundleModuleOutput {
    bundleId: string;
    fileName: string;
    code: string;
}

export interface Cache {
    get(key: string): Promise<string>;
    put(key: string, value: string): Promise<boolean>;
    has(key: string): Promise<boolean>;
    createKey(domain: string, ...args: any[]): Promise<string>;
    commit(): Promise<void>;
    clear(): void;
    clearDiskCache(): Promise<void>;
    getMemoryStats(): string;
    initCacheDir(): Promise<void>;
}

export interface CollectionCompilerMeta {
    collectionName?: string;
    moduleId?: string;
    moduleDir?: string;
    moduleFiles?: Module[];
    global?: Module;
    compiler?: CollectionCompilerVersion;
    isInitialized?: boolean;
    hasExports?: boolean;
    dependencies?: string[];
    bundles?: {
        components: string[];
    }[];
}

export interface CollectionCompilerVersion {
    name: string;
    version: string;
    typescriptVersion?: string;
}

export interface CollectionManifest {
    entries?: CollectionComponentEntryPath[];
    collections?: CollectionDependencyManifest[];
    global?: string;
    compiler?: CollectionCompilerVersion;
    bundles?: CollectionBundleManifest[];
}

export type CollectionComponentEntryPath = string;

export interface CollectionBundleManifest {
    components: string[];
}

export interface CollectionDependencyManifest {
    name: string;
    tags: string[];
}

/** OLD WAY */
export interface Collection {
    collectionName?: string;
    moduleDir?: string;
    moduleFiles?: any[];
    global?: any;
    compiler?: CollectionCompiler;
    isInitialized?: boolean;
    hasExports?: boolean;
    dependencies?: string[];
    bundles?: {
        components: string[];
    }[];
}

export interface CollectionCompiler {
    name: string;
    version: string;
    typescriptVersion?: string;
}

export interface AppRegistry {
    namespace?: string;
    fsNamespace?: string;
    loader?: string;
    core?: string;
    corePolyfilled?: string;
    global?: string;
    components?: AppRegistryComponents;
}

export interface AppRegistryComponents {
    [tagName: string]: {
        bundleIds: ModeBundleIds;
        encapsulation?: 'shadow' | 'scoped';
    };
}

/** OLD WAY */
export interface ModuleFile {
    sourceFilePath: string;
    jsFilePath?: string;
    dtsFilePath?: string;
    cmpMeta?: any;
    isCollectionDependency?: boolean;
    excludeFromCollection?: boolean;
    originalCollectionComponentPath?: string;
    externalImports?: string[];
    localImports?: string[];
    potentialCmpRefs?: string[];
    hasSlot?: boolean;
    hasSvg?: boolean;
}

export interface ModuleBundles {
    [bundleId: string]: string;
}

// this maps the json data to our internal data structure
// so that the internal data structure "could" change,
// but the external user data will always use the same api
// consider these property values to be locked in as is
// there should be a VERY good reason to have to rename them
// DO NOT UPDATE PROPERTY KEYS COMING FROM THE EXTERNAL DATA!!
// DO NOT UPDATE PROPERTY KEYS COMING FROM THE EXTERNAL DATA!!
// DO NOT UPDATE PROPERTY KEYS COMING FROM THE EXTERNAL DATA!!

export interface CollectionData {
    components?: ComponentData[];
    collections?: CollectionDependencyData[];
    global?: string;
    modules?: string[];
    compiler?: {
        name: string;
        version: string;
        typescriptVersion?: string;
    };
    bundles?: CollectionBundle[];
}

export interface CollectionBundle {
    components: string[];
}

export interface CollectionDependencyData {
    name: string;
    tags: string[];
}

export interface ComponentData {
    tag?: string;
    componentPath?: string;
    componentClass?: string;
    dependencies?: string[];
    styles?: StylesData;
    props?: PropData[];
    states?: StateData[];
    listeners?: ListenerData[];
    methods?: MethodData[];
    events?: EventData[];
    connect?: ConnectData[];
    context?: ContextData[];
    hostElement?: HostElementData;
    host?: any;
    assetPaths?: string[];
    slot?: 'hasSlots' | 'hasNamedSlots';
    shadow?: boolean;
    scoped?: boolean;
    priority?: 'low';
}

export interface StylesData {
    [modeName: string]: StyleData;
}

export interface StyleData {
    stylePaths?: string[];
    style?: string;
}

export interface PropData {
    name?: string;
    type?: 'Boolean' | 'Number' | 'String' | 'Any';
    mutable?: boolean;
    attr?: string;
    reflectToAttr?: boolean;
    watch?: string[];
}

export interface StateData {
    name: string;
}

export interface ListenerData {
    event: string;
    method: string;
    capture?: boolean;
    passive?: boolean;
    enabled?: boolean;
}

export interface MethodData {
    name: string;
}

export interface EventData {
    event: string;
    method?: string;
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
}

export interface ConnectData {
    name: string;
    tag?: string;
}

export interface ContextData {
    name: string;
    id?: string;
}

export interface HostElementData {
    name: string;
}

export interface BuildOutputFile {
    name: string;
    content: string;
}

// export type OnCallback = (buildStart: CompilerBuildStart) => void;
export type RemoveCallback = () => boolean;

export interface CompilerCtx {
    version: number;
    activeBuildId: number;
    activeDirsAdded: string[];
    activeDirsDeleted: string[];
    activeFilesAdded: string[];
    activeFilesDeleted: string[];
    activeFilesUpdated: string[];
    addWatchDir: (path: string, recursive: boolean) => void;
    addWatchFile: (path: string) => void;
    cache: Cache;
    cssModuleImports: Map<string, string[]>;
    cachedGlobalStyle: string;
    collections: CollectionCompilerMeta[];
    compilerOptions: any;
    // events: BuildEvents;
    fs: InMemoryFileSystem;
    hasSuccessfulBuild: boolean;
    isActivelyBuilding: boolean;
    // lastBuildResults: CompilerBuildResults;
    moduleMap: ModuleMap;
    nodeMap: NodeMap;
    resolvedCollections: Set<string>;
    rollupCacheHydrate: any;
    rollupCacheLazy: any;
    rollupCacheNative: any;
    styleModeNames: Set<string>;
    changedModules: Set<string>;
    changedFiles: Set<string>;
    worker?: CompilerWorkerContext;

    rollupCache: Map<string, any>;

    reset(): void;
}

export type NodeMap = WeakMap<any, ComponentCompilerMeta>;

/** Must be serializable to JSON!! */
export interface ComponentCompilerFeatures {
    hasAttribute: boolean;
    hasAttributeChangedCallbackFn: boolean;
    hasComponentWillLoadFn: boolean;
    hasComponentDidLoadFn: boolean;
    hasComponentShouldUpdateFn: boolean;
    hasComponentWillUpdateFn: boolean;
    hasComponentDidUpdateFn: boolean;
    hasComponentWillRenderFn: boolean;
    hasComponentDidRenderFn: boolean;
    hasComponentDidUnloadFn: boolean;
    hasConnectedCallbackFn: boolean;
    hasDisconnectedCallbackFn: boolean;
    hasElement: boolean;
    hasEvent: boolean;
    hasLifecycle: boolean;
    hasListener: boolean;
    hasListenerTarget: boolean;
    hasListenerTargetWindow: boolean;
    hasListenerTargetDocument: boolean;
    hasListenerTargetBody: boolean;
    /**
     * @deprecated Prevented from new apps, but left in for older collections
     */
    hasListenerTargetParent: boolean;
    hasMember: boolean;
    hasMethod: boolean;
    hasMode: boolean;
    hasProp: boolean;
    hasPropBoolean: boolean;
    hasPropNumber: boolean;
    hasPropString: boolean;
    hasPropMutable: boolean;
    hasReflect: boolean;
    hasRenderFn: boolean;
    hasState: boolean;
    hasStyle: boolean;
    hasVdomAttribute: boolean;
    hasVdomClass: boolean;
    hasVdomFunctional: boolean;
    hasVdomKey: boolean;
    hasVdomListener: boolean;
    hasVdomPropOrAttr: boolean;
    hasVdomRef: boolean;
    hasVdomRender: boolean;
    hasVdomStyle: boolean;
    hasVdomText: boolean;
    hasVdomXlink: boolean;
    hasWatchCallback: boolean;
    htmlAttrNames: string[];
    htmlTagNames: string[];
    htmlParts: string[];
    isUpdateable: boolean;
    isPlain: boolean;
    potentialCmpRefs: string[];
}

/** Must be serializable to JSON!! */
export interface ComponentCompilerMeta extends ComponentCompilerFeatures {
    assetsDirs: CompilerAssetDir[];
    componentClassName: string;
    elementRef: string;
    encapsulation: Encapsulation;
    shadowDelegatesFocus: boolean;
    excludeFromCollection: boolean;
    isCollectionDependency: boolean;
    docs: CompilerJsDoc;
    jsFilePath: string;
    sourceMapPath: string;
    listeners: ComponentCompilerListener[];
    events: ComponentCompilerEvent[];
    methods: ComponentCompilerMethod[];
    virtualProperties: ComponentCompilerVirtualProperty[];
    properties: ComponentCompilerProperty[];
    watchers: ComponentCompilerWatch[];
    sourceFilePath: string;
    states: ComponentCompilerState[];
    styleDocs: CompilerStyleDoc[];
    styles: StyleCompiler[];
    tagName: string;
    internal: boolean;
    legacyConnect: ComponentCompilerLegacyConnect[];
    legacyContext: ComponentCompilerLegacyContext[];

    dependencies?: string[];
    dependents?: string[];
    directDependencies?: string[];
    directDependents?: string[];
}

export interface ComponentCompilerLegacyConnect {
    name: string;
    connect: string;
}

export interface ComponentCompilerLegacyContext {
    name: string;
    context: string;
}

export type Encapsulation = 'shadow' | 'scoped' | 'none';

export interface ComponentCompilerStaticProperty {
    mutable: boolean;
    optional: boolean;
    required: boolean;
    type: ComponentCompilerPropertyType;
    complexType: ComponentCompilerPropertyComplexType;
    attribute?: string;
    reflect?: boolean;
    docs: CompilerJsDoc;
    defaultValue?: string;
}

export interface ComponentCompilerProperty extends ComponentCompilerStaticProperty {
    name: string;
    internal: boolean;
}

export interface ComponentCompilerVirtualProperty {
    name: string;
    type: string;
    docs: string;
}

export type ComponentCompilerPropertyType = 'any' | 'string' | 'boolean' | 'number' | 'unknown';

export interface ComponentCompilerPropertyComplexType {
    original: string;
    resolved: string;
    references: ComponentCompilerTypeReferences;
}

export interface ComponentCompilerTypeReferences {
    [key: string]: ComponentCompilerTypeReference;
}

export interface ComponentCompilerTypeReference {
    location: 'local' | 'global' | 'import';
    path?: string;
}

export interface ComponentCompilerStaticEvent {
    name: string;
    method: string;
    bubbles: boolean;
    cancelable: boolean;
    composed: boolean;
    docs: CompilerJsDoc;
    complexType: ComponentCompilerEventComplexType;
}

export interface ComponentCompilerEvent extends ComponentCompilerStaticEvent {
    internal: boolean;
}

export interface ComponentCompilerEventComplexType {
    original: string;
    resolved: string;
    references: ComponentCompilerTypeReferences;
}

export interface ComponentCompilerListener {
    name: string;
    method: string;
    capture: boolean;
    passive: boolean;
    // target: ListenTargetOptions | undefined;
}

export interface ComponentCompilerStaticMethod {
    docs: CompilerJsDoc;
    complexType: ComponentCompilerMethodComplexType;
}

export interface ComponentCompilerMethodComplexType {
    signature: string;
    parameters: CompilerJsDoc[];
    references: ComponentCompilerTypeReferences;
    return: string;
}

export interface ComponentCompilerWatch {
    propName: string;
    methodName: string;
}

export interface ComponentCompilerMethod extends ComponentCompilerStaticMethod {
    name: string;
    internal: boolean;
}

export interface ComponentCompilerState {
    name: string;
}

export interface CompilerJsDoc {
    text: string;
    tags: CompilerJsDocTagInfo[];
}

export interface CompilerJsDocTagInfo {
    name: string;
    text?: string;
}

export interface CompilerStyleDoc {
    name: string;
    docs: string;
    annotation: 'prop';
}

export interface CompilerAssetDir {
    absolutePath?: string;
    cmpRelativePath?: string;
    originalComponentPath?: string;
}

export interface ComponentCompilerData {
    exportLine: string;
    filePath: string;
    cmp: ComponentCompilerMeta;
    uniqueComponentClassName?: string;
    importLine?: string;
}

export interface ComponentConstructor {
    is?: string;
    properties?: ComponentConstructorProperties;
    watchers?: ComponentConstructorWatchers;
    events?: ComponentConstructorEvent[];
    listeners?: ComponentConstructorListener[];
    style?: string;
    styleId?: string;
    encapsulation?: ComponentConstructorEncapsulation;
    observedAttributes?: string[];
    cmpMeta?: ComponentRuntimeMeta;
    isProxied?: boolean;
    isStyleRegistered?: boolean;
}

export interface ComponentConstructorWatchers {
    [propName: string]: string[];
}

export interface ComponentTestingConstructor extends ComponentConstructor {
    COMPILER_META: ComponentCompilerMeta;
    prototype?: {
        componentWillLoad?: Function;
        componentWillUpdate?: Function;
        componentWillRender?: Function;
        __componentWillLoad?: Function;
        __componentWillUpdate?: Function;
        __componentWillRender?: Function;
    };
}

export interface ComponentNativeConstructor extends ComponentConstructor {
    cmpMeta: ComponentRuntimeMeta;
}

export type ComponentConstructorEncapsulation = 'shadow' | 'scoped' | 'none';

export interface ComponentConstructorProperties {
    [propName: string]: ComponentConstructorProperty;
}

export interface ComponentConstructorProperty {
    attribute?: string;
    elementRef?: boolean;
    method?: boolean;
    mutable?: boolean;
    reflect?: boolean;
    state?: boolean;
    type?: ComponentConstructorPropertyType;
    watchCallbacks?: string[];
}

export type ComponentConstructorPropertyType = StringConstructor | BooleanConstructor | NumberConstructor | 'string' | 'boolean' | 'number';

export interface ComponentConstructorEvent {
    name: string;
    method: string;
    bubbles: boolean;
    cancelable: boolean;
    composed: boolean;
}

export interface ComponentConstructorListener {
    name: string;
    method: string;
    capture?: boolean;
    passive?: boolean;
}

export interface HostConfig {
    hosting?: {
        rules?: HostRule[];
    };
}

export interface HostRule {
    include: string;
    headers: HostRuleHeader[];
}

export interface HostRuleHeader {
    name?: string;
    value?: string;
}

export interface CssVarShim {
    i(): Promise<any>;
    addLink(linkEl: HTMLLinkElement): Promise<any>;
    addGlobalStyle(styleEl: HTMLStyleElement): void;

    createHostStyle(hostEl: HTMLElement, templateName: string, cssText: string, isScoped: boolean): HTMLStyleElement;

    removeHost(hostEl: HTMLElement): void;
    updateHost(hostEl: HTMLElement): void;
    updateGlobal(): void;
}

export interface DevClientWindow extends Window {
    ['s-dev-server']: boolean;
    ['s-initial-load']: boolean;
    ['s-build-id']: number;
    WebSocket: new (socketUrl: string, protos: string[]) => WebSocket;
    devServerConfig?: DevClientConfig;
}

export interface DevClientConfig {
    basePath: string;
    // editors: DevServerEditor[];
    // reloadStrategy: PageReloadStrategy;
    socketUrl?: string;
}

export interface HttpRequest {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS';
    acceptHeader: string;
    url: URL;
    searchParams: URLSearchParams;
    pathname?: string;
    filePath?: string;
    // stats?: CompilerFsStats;
    headers?: { [name: string]: string };
    host?: string;
}

export interface DevServerMessage {
    // startServer?: DevServerConfig;
    closeServer?: boolean;
    // serverStarted?: DevServerConfig;
    serverClosed?: boolean;
    buildStart?: boolean;
    // buildLog?: BuildLog;
    // buildResults?: CompilerBuildResults;
    requestBuildResults?: boolean;
    error?: { message?: string; type?: string; stack?: any };
    isActivelyBuilding?: boolean;
    compilerRequestPath?: string;
    // compilerRequestResults?: CompilerRequestResponse;
    requestLog?: {
        method: string;
        url: string;
        status: number;
    };
}

export interface EntryModule {
    entryKey: string;
    cmps: ComponentCompilerMeta[];
}

export interface EventListenerCallback {
    (ev?: any): void;
}

export interface EventEmitterData<T = any> {
    detail?: T;
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
}

export interface FsReadOptions {
    useCache?: boolean;
    setHash?: boolean;
}

export interface FsReaddirOptions {
    inMemoryOnly?: boolean;
    recursive?: boolean;
    /**
     * Directory names to exclude. Just the basename,
     * not the entire path. Basically for "node_moduels".
     */
    excludeDirNames?: string[];
    /**
     * Extensions we know we can avoid. Each extension
     * should include the `.` so that we can test for both
     * `.d.ts.` and `.ts`. If `excludeExtensions` isn't provided it
     * doesn't try to exclude anything. This only checks against
     * the filename, not directory names when recursive.
     */
    excludeExtensions?: string[];
}

export interface FsReaddirItem {
    absPath: string;
    relPath: string;
    isDirectory: boolean;
    isFile: boolean;
}

export interface FsWriteResults {
    changedContent: boolean;
    queuedWrite: boolean;
    ignored: boolean;
}

export type FsItems = Map<string, FsItem>;

export interface FsItem {
    fileText: string;
    isFile: boolean;
    isDirectory: boolean;
    size: number;
    mtimeMs: number;
    exists: boolean;
    queueCopyFileToDest: string;
    queueWriteToDisk: boolean;
    queueDeleteFromDisk?: boolean;
    useCache: boolean;
}

export interface HostElement extends HTMLElement {
    // web component APIs
    connectedCallback?: () => void;
    attributeChangedCallback?: (attribName: string, oldVal: string, newVal: string, namespace: string) => void;
    disconnectedCallback?: () => void;
    host?: Element;
    forceUpdate?: () => void;

    // "s-" prefixed properties should not be property renamed
    // and should be common between all versions of stencil

    /**
     * Unique stencil id for this element
     */
    ['s-id']?: string;

    /**
     * Content Reference:
     * Reference to the HTML Comment that's placed inside of the
     * host element's original content. This comment is used to
     * always represent where host element's light dom is.
     */
    ['s-cr']?: RenderNode;

    /**
     * Lifecycle ready
     */
    ['s-lr']?: boolean;

    /**
     * On Render Callbacks:
     * Array of callbacks to fire off after it has rendered.
     */
    ['s-rc']?: (() => void)[];

    /**
     * Scope Id
     * The scope id of this component when using scoped css encapsulation
     * or using shadow dom but the browser doesn't support it
     */
    ['s-sc']?: string;

    /**
     * Hot Module Replacement, dev mode only
     */
    ['s-hmr']?: (versionId: string) => void;

    /**
     * Callback method for when HMR finishes
     */
    ['s-hmr-load']?: () => void;

    ['s-p']?: Promise<void>[];

    componentOnReady?: () => Promise<this>;
}

export interface InMemoryFileSystem {
    /* new compiler */
    // sys?: CompilerSystem;

    accessData(
        filePath: string,
    ): Promise<{
        exists: boolean;
        isDirectory: boolean;
        isFile: boolean;
    }>;
    access(filePath: string): Promise<boolean>;
    /**
     * Synchronous!!! Do not use!!!
     * (Only typescript transpiling is allowed to use)
     * @param filePath
     */
    accessSync(filePath: string): boolean;
    copyFile(srcFile: string, dest: string): Promise<void>;
    emptyDirs(dirPaths: string[]): Promise<void>;
    readdir(dirPath: string, opts?: FsReaddirOptions): Promise<FsReaddirItem[]>;
    readFile(filePath: string, opts?: FsReadOptions): Promise<string>;
    /**
     * Synchronous!!! Do not use!!!
     * (Only typescript transpiling is allowed to use)
     * @param filePath
     */
    readFileSync(filePath: string, opts?: FsReadOptions): string;
    remove(itemPath: string): Promise<void>;
    stat(
        itemPath: string,
    ): Promise<{
        isFile: boolean;
        isDirectory: boolean;
    }>;
    /**
     * Synchronous!!! Do not use!!!
     * (Only typescript transpiling is allowed to use)
     * @param itemPath
     */
    statSync(
        itemPath: string,
    ): {
        exists: boolean;
        isFile: boolean;
        isDirectory: boolean;
    };
    // writeFile(filePath: string, content: string, opts?: FsWriteOptions): Promise<FsWriteResults>;
    writeFiles(
        files:
            | {
                  [filePath: string]: string;
              }
            | Map<string, String>,
    ): // opts?: FsWriteOptions
    Promise<FsWriteResults[]>;
    commit(): Promise<{
        filesWritten: string[];
        filesDeleted: string[];
        filesCopied: string[][];
        dirsDeleted: string[];
        dirsAdded: string[];
    }>;
    cancelDeleteFilesFromDisk(filePaths: string[]): void;
    cancelDeleteDirectoriesFromDisk(filePaths: string[]): void;
    clearDirCache(dirPath: string): void;
    clearFileCache(filePath: string): void;
    getItem(itemPath: string): FsItem;
    // getBuildOutputs(): BuildOutput[];
    clearCache(): void;
    keys(): string[];
    getMemoryStats(): string;
}

export interface HydrateElement {
    [attrName: string]: string | undefined;
}

export interface HydrateAnchorElement extends HydrateElement {
    href?: string;
    target?: string;
}

export interface HydrateImgElement extends HydrateElement {
    src?: string;
}

export interface HydrateScriptElement extends HydrateElement {
    src?: string;
    type?: string;
}

export interface HydrateStyleElement extends HydrateElement {
    href?: string;
}

export interface HydrateStaticData {
    id: string;
    type: string;
    content: string;
}

export interface JSDocTagInfo {
    name: string;
    text?: string;
}

export interface MinifyJsResult {
    code: string;
    sourceMap: any;
    error: {
        message: string;
        filename: string;
        line: number;
        col: number;
        pos: number;
    };
}

export type ModuleMap = Map<string, Module>;

/**
 * Module gets serialized/parsed as JSON
 * cannot use Map or Set
 */
export interface Module {
    cmps: ComponentCompilerMeta[];
    coreRuntimeApis: string[];
    collectionName: string;
    dtsFilePath: string;
    excludeFromCollection: boolean;
    externalImports: string[];
    htmlAttrNames: string[];
    htmlTagNames: string[];
    htmlParts: string[];
    isCollectionDependency: boolean;
    isLegacy: boolean;
    jsFilePath: string;
    localImports: string[];
    originalImports: string[];
    originalCollectionComponentPath: string;
    potentialCmpRefs: string[];
    sourceFilePath: string;
    staticSourceFile: any;
    staticSourceFileText: string;
    sourceMapPath: string;
    sourceMapFileText: string;

    // build features
    hasVdomAttribute: boolean;
    hasVdomClass: boolean;
    hasVdomFunctional: boolean;
    hasVdomKey: boolean;
    hasVdomListener: boolean;
    hasVdomPropOrAttr: boolean;
    hasVdomRef: boolean;
    hasVdomRender: boolean;
    hasVdomStyle: boolean;
    hasVdomText: boolean;
    hasVdomXlink: boolean;
}

export interface PrerenderUrlResults {
    anchorUrls: string[];
    // diagnostics: Diagnostic[];
    filePath: string;
}

export interface PrerenderUrlRequest {
    appDir: string;
    buildId: string;
    baseUrl: string;
    componentGraphPath: string;
    devServerHostUrl: string;
    hydrateAppFilePath: string;
    isDebug: boolean;
    prerenderConfigPath: string;
    staticSite: boolean;
    templateId: string;
    url: string;
    writeToFilePath: string;
}

/**
 * Generic node that represents all of the
 * different types of nodes we'd see when rendering
 */
export interface RenderNode extends HostElement {
    /**
     * Shadow root's host
     */
    host?: Element;

    /**
     * Is Content Reference Node:
     * This node is a content reference node.
     */
    ['s-cn']?: boolean;

    /**
     * Is a slot reference node:
     * This is a node that represents where a slot
     * was originally located.
     */
    ['s-sr']?: boolean;

    /**
     * Slot name
     */
    ['s-sn']?: string;

    /**
     * Host element tag name:
     * The tag name of the host element that this
     * node was created in.
     */
    ['s-hn']?: string;

    /**
     * Original Location Reference:
     * A reference pointing to the comment
     * which represents the original location
     * before it was moved to its slot.
     */
    ['s-ol']?: RenderNode;

    /**
     * Node reference:
     * This is a reference for a original location node
     * back to the node that's been moved around.
     */
    ['s-nr']?: RenderNode;

    /**
     * Scope Id
     */
    ['s-si']?: string;

    /**
     * Host Id (hydrate only)
     */
    ['s-host-id']?: number;

    /**
     * Node Id (hydrate only)
     */
    ['s-node-id']?: number;

    /**
     * Used to know the components encapsulation.
     * empty "" for shadow, "c" from scoped
     */
    ['s-en']?: '' | /*shadow*/ 'c' /*scoped*/;
}

export type LazyBundlesRuntimeData = LazyBundleRuntimeData[];

export type LazyBundleRuntimeData = [
    /** bundleIds */
    string,
    ComponentRuntimeMetaCompact[],
];

export type ComponentRuntimeMetaCompact = [
    /** flags */
    number,

    /** tagname */
    string,

    /** members */
    { [memberName: string]: ComponentRuntimeMember }?,

    /** listeners */
    ComponentRuntimeHostListener[]?,
];

export interface ComponentRuntimeMeta {
    $flags$: number;
    $tagName$: string;
    $members$?: ComponentRuntimeMembers;
    $listeners$?: ComponentRuntimeHostListener[];
    $attrsToReflect$?: [string, string][];
    $watchers$?: ComponentConstructorWatchers;
    $lazyBundleId$?: string;
}

export interface ComponentRuntimeMembers {
    [memberName: string]: ComponentRuntimeMember;
}

export type ComponentRuntimeMember = [
    /**
     * flags data
     */
    number,

    /**
     * attribute name to observe
     */
    string?,
];

export type ComponentRuntimeHostListener = [
    /**
     * event flags
     */
    number,

    /**
     * event name,
     */
    string,

    /**
     * event method,
     */
    string,
];

export interface ModeBundleIds {
    [modeName: string]: string;
}

/**
 * Interface used to track an Element, it's virtual Node (`VNode`), and other data
 */
export interface HostRef {
    $ancestorComponent$?: HostElement;
    $flags$: number;
    $cmpMeta$: ComponentRuntimeMeta;
    $hostElement$?: HostElement;
    $instanceValues$?: Map<string, any>;
    $onReadyPromise$?: Promise<any>;
    $onReadyResolve$?: (elm: any) => void;
    $onInstancePromise$?: Promise<any>;
    $onInstanceResolve$?: (elm: any) => void;
    $onRenderResolve$?: () => void;
    $queuedListeners$?: [string, any][];
    $rmListeners$?: (() => void)[];
    $modeName$?: string;
    $renderCount$?: number;
}

export interface PlatformRuntime {
    $cssShim$?: CssVarShim;
    $flags$: number;
    $orgLocNodes$?: Map<string, RenderNode>;
    $resourcesUrl$: string;
    jmp: (c: Function) => any;
    raf: (c: FrameRequestCallback) => number;
    ael: (el: EventTarget, eventName: string, listener: EventListenerOrEventListenerObject, options: boolean | AddEventListenerOptions) => void;
    rel: (el: EventTarget, eventName: string, listener: EventListenerOrEventListenerObject, options: boolean | AddEventListenerOptions) => void;
    ce: (eventName: string, opts?: any) => CustomEvent;
}

export interface ScreenshotBuildResults {
    appNamespace: string;
    masterBuild: ScreenshotBuild;
    currentBuild: ScreenshotBuild;
    compare: ScreenshotCompareResults;
}

export interface ScreenshotCompareResults {
    id: string;
    a: {
        id: string;
        message: string;
        author: string;
        url: string;
        previewUrl: string;
    };
    b: {
        id: string;
        message: string;
        author: string;
        url: string;
        previewUrl: string;
    };
    timestamp: number;
    url: string;
    appNamespace: string;
    diffs: ScreenshotDiff[];
}

export interface ScreenshotConnectorOptions {
    buildId: string;
    buildMessage: string;
    buildAuthor?: string;
    buildUrl?: string;
    previewUrl?: string;
    appNamespace: string;
    buildTimestamp: number;
    // logger: Logger;
    rootDir: string;
    cacheDir: string;
    packageDir: string;
    screenshotDirName?: string;
    imagesDirName?: string;
    buildsDirName?: string;
    currentBuildDir?: string;
    updateMaster?: boolean;
    allowableMismatchedPixels?: number;
    allowableMismatchedRatio?: number;
    pixelmatchThreshold?: number;
    waitBeforeScreenshot?: number;
    pixelmatchModulePath?: string;
}

export interface ScreenshotBuild {
    id: string;
    message: string;
    author?: string;
    url?: string;
    previewUrl?: string;
    appNamespace: string;
    timestamp: number;
    screenshots: Screenshot[];
}

export interface ScreenshotCache {
    timestamp?: number;
    lastBuildId?: string;
    size?: number;
    items?: {
        /**
         * Cache key
         */
        key: string;

        /**
         * Timestamp used to remove the oldest data
         */
        ts: number;

        /**
         * Mismatched pixels
         */
        mp: number;
    }[];
}

export interface Screenshot {
    id: string;
    desc?: string;
    image: string;
    device?: string;
    userAgent?: string;
    width?: number;
    height?: number;
    deviceScaleFactor?: number;
    hasTouch?: boolean;
    isLandscape?: boolean;
    isMobile?: boolean;
    testPath?: string;
    diff?: ScreenshotDiff;
}

export interface ScreenshotDiff {
    mismatchedPixels: number;
    id?: string;
    desc?: string;
    imageA?: string;
    imageB?: string;
    device?: string;
    userAgent?: string;
    width?: number;
    height?: number;
    deviceScaleFactor?: number;
    hasTouch?: boolean;
    isLandscape?: boolean;
    isMobile?: boolean;
    allowableMismatchedPixels: number;
    allowableMismatchedRatio: number;
    testPath?: string;
    cacheKey?: string;
}

export interface ScreenshotBoundingBox {
    /**
     * The x-coordinate of top-left corner.
     */
    x: number;

    /**
     * The y-coordinate of top-left corner.
     */
    y: number;

    /**
     * The width in pixels.
     */
    width: number;

    /**
     * The height in pixels.
     */
    height: number;
}

export interface ServerConfigInput {
    app: ExpressApp;
    configPath?: string;
}
export interface ExpressApp {
    use?: Function;
}
export interface StyleCompiler {
    modeName: string;
    styleId: string;
    styleStr: string;
    styleIdentifier: string;
    externalStyles: ExternalStyleCompiler[];
}

export interface ExternalStyleCompiler {
    absolutePath: string;
    relativePath: string;
    originalComponentPath: string;
}

export interface TransformCssToEsmInput {
    input: string;
    module?: 'cjs' | 'esm' | string;
    file?: string;
    tag?: string;
    encapsulation?: string;
    mode?: string;
    commentOriginalSelector?: boolean;
    sourceMap?: boolean;
    minify?: boolean;
    docs?: boolean;
    autoprefixer?: any;
    styleImportData?: string;
}

export interface TransformCssToEsmOutput {
    styleText: string;
    output: string;
    map: any;
    //diagnostics: Diagnostic[];
    defaultVarName: string;
    //styleDocs: StyleDoc[];
    imports: { varName: string; importPath: string }[];
}

declare global {
    namespace jest {
        /*interface Matchers<R, T> {
      /!**
       * Compares HTML, but first normalizes the HTML so all
       * whitespace, attribute order and css class order are
       * the same. When given an element, it will compare
       * the element's `outerHTML`. When given a Document Fragment,
       * such as a Shadow Root, it'll compare its `innerHTML`.
       * Otherwise it'll compare two strings representing HTML.
       *!/
      toEqualHtml(expectHtml: string): void;

      /!**
       * Compares HTML light DOKM only, but first normalizes the HTML so all
       * whitespace, attribute order and css class order are
       * the same. When given an element, it will compare
       * the element's `outerHTML`. When given a Document Fragment,
       * such as a Shadow Root, it'll compare its `innerHTML`.
       * Otherwise it'll compare two strings representing HTML.
       *!/
      toEqualLightHtml(expectLightHtml: string): void;

      /!**
       * When given an element, it'll compare the element's
       * `textContent`. Otherwise it'll compare two strings. This
       * matcher will also `trim()` each string before comparing.
       *!/
      toEqualText(expectTextContent: string): void;

      /!**
       * Checks if an element simply has the attribute. It does
       * not check any values of the attribute
       *!/
      toHaveAttribute(expectAttrName: string): void;

      /!**
       * Checks if an element's attribute value equals the expect value.
       *!/
      toEqualAttribute(expectAttrName: string, expectAttrValue: any): void;

      /!**
       * Checks if an element's has each of the expected attribute
       * names and values.
       *!/
      toEqualAttributes(expectAttrs: { [attrName: string]: any }): void;

      /!**
       * Checks if an element has the expected css class.
       *!/
      toHaveClass(expectClassName: string): void;

      /!**
       * Checks if an element has each of the expected css classes
       * in the array.
       *!/
      toHaveClasses(expectClassNames: string[]): void;

      /!**
       * Checks if an element has the exact same css classes
       * as the expected array of css classes.
       *!/
      toMatchClasses(expectClassNames: string[]): void;

      /!**
       * When given an EventSpy, checks if the event has been
       * received or not.
       *!/
      toHaveReceivedEvent(): void;

      /!**
       * When given an EventSpy, checks how many times the
       * event has been received.
       *!/
      toHaveReceivedEventTimes(count: number): void;

      /!**
       * When given an EventSpy, checks the event has
       * received the correct custom event `detail` data.
       *!/
      toHaveReceivedEventDetail(eventDetail: any): void;

      /!**
       * When given an EventSpy, checks the first event has
       * received the correct custom event `detail` data.
       *!/
      toHaveFirstReceivedEventDetail(eventDetail: any): void;

      /!**
       * When given an EventSpy, checks the event at an index
       * has received the correct custom event `detail` data.
       *!/
      toHaveNthReceivedEventDetail(index: number, eventDetail: any): void;

      /!**
       * Used to evaluate the results of `compareScreenshot()`, such as
       * `expect(compare).toMatchScreenshot()`. The `allowableMismatchedRatio`
       * value from the testing config is used by default if
       * `MatchScreenshotOptions` were not provided.
       *!/
      toMatchScreenshot(opts?: MatchScreenshotOptions): void;
    }*/
    }
}
export interface CompilerWorkerContext {
    //optimizeCss(inputOpts: OptimizeCssInput): Promise<OptimizeCssOutput>;
    prepareModule(input: string, minifyOpts: any, transpile: boolean, inlineHelpers: boolean): Promise<{ output: string; diagnostics: any[]; sourceMap?: any }>;
    prerenderWorker(prerenderRequest: PrerenderUrlRequest): Promise<PrerenderUrlResults>;
    transformCssToEsm(input: TransformCssToEsmInput): Promise<TransformCssToEsmOutput>;
}

export interface MsgToWorker {
    stencilId: number;
    args: any[];
}
export declare type PropTyp = Object | String | Boolean | Function | Array<any>;
