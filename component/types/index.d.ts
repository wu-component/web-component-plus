import { WuComponent, OnConnected, OnBeforeUpdate, OnBeforeRender, OnInstall, OnDisConnected } from "@wu-component/web-core-plus";
declare type TypeEnums = 'success' | 'warning' | 'info' | 'error';
// 大小
declare type UISize = 'medium' | 'small' | 'mini';
declare type ShadowEnums = 'always' | 'hover' | 'never';
export declare class WuAlert extends WuComponent {
    constructor();
    visible: boolean;
    tip: string;
    description: string;
    type: TypeEnums;
    closable: boolean;
    closeText: string;
    showIcon: boolean;
    center: boolean;
    effect: string;
    confirm(): this;
    cancel(): this;
    close(): this;
    get typeClass(): string;
    get iconClass(): any;
    get isBoldTitle(): "" | "is-bold";
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuAside extends WuComponent {
    constructor();
    width: string;
    render(_renderProps?: {}, _store?: {}): any;
}

declare type ShapeEnums = 'circle' | 'square';
declare type FitEnums = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
export declare class WuAvatar extends WuComponent {
    constructor();
    size: number;
    shape: ShapeEnums;
    icon: string;
    src: string;
    alt: string;
    srcSet: string;
    fit: FitEnums;
    isImageExist: boolean;
    get avatarClass(): string;
    handleError(event: Event): Event;
    renderAvatar(): any;
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuBadge extends WuComponent implements OnConnected, OnBeforeUpdate {
    constructor();
    beforeUpdate(): void;
    connected(shadowRoot: ShadowRoot): void;
    private initIsFixed;
    value: string;
    max: number;
    dot: boolean;
    hide: boolean;
    type: TypeEnums;
    isFixed: boolean;
    get content(): any;
    handleError(event: Event): Event;
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuBreadcrumb extends WuComponent implements OnConnected {
    constructor();
    separator: string;
    separatorClass: string;
    provideWuBreadcrumb(): this;
    /**
     * 面包屑点击
     * @param args
     */
    breadcrumbClick(...args: any[]): void;
    change(...args: any[]): {
        [x: number]: any;
        length: number;
        toString(): string;
        toLocaleString(): string;
        pop(): any;
        push(...items: any[]): number;
        concat(...items: ConcatArray<any>[]): any[];
        concat(...items: any[]): any[];
        join(separator?: string): string;
        reverse(): any[];
        shift(): any;
        slice(start?: number, end?: number): any[];
        sort(compareFn?: (a: any, b: any) => number): any[];
        splice(start: number, deleteCount?: number): any[];
        splice(start: number, deleteCount: number, ...items: any[]): any[];
        unshift(...items: any[]): number;
        indexOf(searchElement: any, fromIndex?: number): number;
        lastIndexOf(searchElement: any, fromIndex?: number): number;
        every<S extends any>(predicate: (value: any, index: number, array: any[]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: any, index: number, array: any[]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: any, index: number, array: any[]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: any, index: number, array: any[]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: any, index: number, array: any[]) => U, thisArg?: any): U[];
        filter<S_1 extends any>(predicate: (value: any, index: number, array: any[]) => value is S_1, thisArg?: any): S_1[];
        filter(predicate: (value: any, index: number, array: any[]) => unknown, thisArg?: any): any[];
        reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any): any;
        reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any, initialValue: any): any;
        reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: any, currentIndex: number, array: any[]) => U_1, initialValue: U_1): U_1;
        reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any): any;
        reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any, initialValue: any): any;
        reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: any, currentIndex: number, array: any[]) => U_2, initialValue: U_2): U_2;
        find<S_2 extends any>(predicate: (this: void, value: any, index: number, obj: any[]) => value is S_2, thisArg?: any): S_2;
        find(predicate: (value: any, index: number, obj: any[]) => unknown, thisArg?: any): any;
        findIndex(predicate: (value: any, index: number, obj: any[]) => unknown, thisArg?: any): number;
        fill(value: any, start?: number, end?: number): any[];
        copyWithin(target: number, start: number, end?: number): any[];
        entries(): IterableIterator<[number, any]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<any>;
        includes(searchElement: any, fromIndex?: number): boolean;
        at(index: number): any;
        [Symbol.iterator](): IterableIterator<any>;
        [Symbol.unscopables](): {
            copyWithin: boolean;
            entries: boolean;
            fill: boolean;
            find: boolean;
            findIndex: boolean;
            keys: boolean;
            values: boolean;
        };
    };
    connected(shadowRoot: ShadowRoot): any;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuBreadcrumbItem extends WuComponent implements OnConnected {
    private separator;
    private separatorClass;
    constructor();
    wuBreadcrumb: any;
    to: string;
    render(_renderProps?: {}, _store?: {}): any;
    connected(shadowRoot: ShadowRoot): any;
}

declare type WuButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
declare type NativeType = 'button' | 'submit' | 'reset';
export declare class WuButton extends WuComponent {
    constructor();
    type: WuButtonType;
    size: UISize;
    plain: boolean;
    round: boolean;
    circle: boolean;
    loading: boolean;
    disabled: boolean;
    icon: string;
    nativeType: NativeType;
    text: string;
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuCard extends WuComponent implements OnConnected {
    constructor();
    connected(shadowRoot: ShadowRoot): void;
    header: string;
    bodyStyle: Record<any, any>;
    shadow: ShadowEnums;
    headerShow: boolean;
    render(_renderProps?: {}, _store?: {}): any;
}


interface CascaderOption {
    value: string;
    label: string;
    disabled?: boolean;
    children?: CascaderOption[];
}
export interface CascaderProps {
    /**
     * 当前值（从父到子应当是一个数组）
     */
    value: string[];
    /**
     * 选项列表
     */
    options: CascaderOption[];
    /**
     * 尺寸 Todo
     */
    size?: 'default' | 'medium' | 'small' | 'mini';
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 选项被点击后的回调函数
     */
    onOptionClick?: (item: any, index: any, evt: any) => void;
}
export declare class WuCascader extends WuComponent implements OnConnected {
    constructor();
    private popoverRef;
    private inputRef;
    value: string[];
    options: CascaderOption[];
    size: UISize;
    disabled: boolean;
    connected(shadowRoot: ShadowRoot): void;
    /**
     * 根据当前 value 获取 label 值
     * @param value
     */
    getLabelsByValue(value: string[]): string;
    itemClick(...args: any[]): {
        item: any;
        index: any;
        event: any;
        value: string[];
    };
    itemClickCallback: (item: any, index: number, evt: MouseEvent) => void;
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuCesiumMap extends WuComponent {
    constructor();
    name: string;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuCheckbox extends WuComponent implements OnConnected, OnBeforeUpdate {
    isGroup: boolean;
    props: any;
    constructor();
    groupRef: any;
    beforeUpdate(): void;
    get newDisabled(): any;
    get newSize(): any;
    get newValue(): any;
    initProps(): void;
    connected(shadowRoot: ShadowRoot): void;
    focus: boolean;
    size: UISize;
    disabled: boolean;
    value: boolean;
    label: string;
    indeterminate: boolean;
    checked: boolean;
    border: boolean;
    name: string;
    id: string;
    controls: string;
    handleChange(ev: any): void;
    private change;
    private checkChange;
    onFocus(): void;
    onBlur(): void;
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuCheckboxButton extends WuComponent implements OnConnected, OnBeforeRender {
    constructor();
    beforeRender(): void;
    connected(shadowRoot: ShadowRoot): void;
    disabled: boolean;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuCheckboxGroup extends WuComponent implements OnConnected, OnBeforeRender, OnBeforeUpdate {
    constructor();
    slotRef: HTMLSlotElement;
    groupRef(): this;
    size: UISize;
    disabled: boolean;
    value: string[];
    beforeRender(): void;
    private change;
    /**
     * 值修改
     * @param vale
     */
    handleChange(vale: CustomEvent): void;
    connected(shadowRoot: ShadowRoot): void;
    beforeUpdate(): any;
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuCodeMonacoEditor extends WuComponent implements OnConnected {
    constructor();
    initialValue: string;
    language: string;
    theme: string;
    get editor(): any;
    set editor(value: any);
    get monacoInstance(): any;
    set monacoInstance(value: any);
    addTsDeclaration(url: string, name?: string): Promise<void>;
    private formatFile;
    private initEditor;
    connected(shadowRoot: ShadowRoot): void;
    render(_renderProps?: {}, _store?: {}): any;
}

import "@wu-component/wu-code-monaco-editor";
import "@wu-component/wu-code-sandbox";
import "@wu-component/wu-alert";
import type { WuCodeMonacoEditor } from "@wu-component/wu-code-monaco-editor/types";
import type { WuMonacoEditorPreview } from "@wu-component/wu-code-sandbox/types";
interface NoticeItem {
    close: boolean;
    text: string;
    id: string;
}
interface NoticeContentItem extends NoticeItem {
    show: boolean;
}
export declare class WuCodePlayground extends WuComponent implements OnConnected {
    constructor();
    isLoading: boolean;
    noticeList: NoticeContentItem[];
    editorContainer: WuCodeMonacoEditor;
    previewContainer: WuMonacoEditorPreview;
    initialEvalSuccess: boolean;
    connected(shadowRoot: ShadowRoot): void;
    /**
     * 开始执行代码
     */
    runCode(): Promise<void>;
    /**
     * 加载依赖
     */
    loadDependencies(): void;
    /**
     * 加载通告
     * @private
     */
    private fetchNoticeList;
    getIp(): void;
    private sandboxSuccess;
    /**
     * 消息关闭
     * @param item
     * @private
     */
    private noticeClose;
    renderLoading(): any;
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuMonacoEditorPreview extends WuComponent implements OnConnected {
    constructor();
    initialSrcDoc: string;
    isBeforeRefresh: boolean;
    private container;
    private isLoad;
    private proxy;
    previewStore: Store;
    private formatFile;
    connected(shadowRoot: ShadowRoot): Promise<void>;
    /**
     * 沙箱执行code
     * @param type
     * @param code
     */
    runCode(type: string, code: string): void;
    /**
     * 沙箱加载依赖
     * @param options
     */
    loadDependencies(options: LoadDependencies): Promise<unknown>;
    emitEvent(data: any): any;
    emitSuccessEvent(): boolean;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuCol extends WuComponent {
    constructor();
    tag: string;
    span: number;
    offset: number;
    pull: number;
    push: number;
    render(_renderProps?: {}, _store?: {}): any;
}

import "@wu-component/wu-collapse-item";
export declare class WuCollapse extends WuComponent {
    constructor();
    accordion: boolean;
    value: string[];
    activeNames: string[];
    valueChange(value: string[], old: string[]): void;
    inputChange(val: any): {
        value: any;
    };
    change(val: any): {
        value: any;
    };
    wuCollapseRef(): this;
    /**
     * 设置激活的item
     * @param activeNames
     */
    setActiveNames(activeNames: string[]): void;
    handleItemClick(item: any): void;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuCollapseItem extends WuComponent {
    constructor();
    uId: string;
    wuCollapseRef: WuCollapse;
    contentWrapStyle: Record<string, string>;
    contentHeight: number;
    focusing: boolean;
    isClick: boolean;
    name: string;
    disabled: boolean;
    tip: string;
    get isActive(): boolean;
    handleFocus(): void;
    handleHeaderClick(): void;
    handleEnterClick(): void;
    render(_renderProps?: {}, _store?: {}): any;
}

import './color-pane/index.tsx';
export declare class WuColorPicker extends WuComponent implements OnConnected {
    popover: any;
    popoverRef: any;
    popcon: any;
    colorPane: WuColorPane;
    nativeclick: boolean;
    constructor();
    size: UISize;
    defaultvalue: string;
    disabled: boolean;
    val: string;
    $value: any;
    connected(shadowRoot: ShadowRoot): void;
    /**
     * 确认颜色
     */
    okCallback(): void;
    /**
     * 确认颜色
     */
    cancleCallback(): void;
    /**
     * 打开选择器
     */
    openPicker(): void;
    valueChange(value: string, old: string): void;
    changeEvent(): {
        value: any;
        color: string | {
            h: number;
            s: number;
            v: number;
            a: number;
            toHSVA(): number[];
            toHSLA(): any[];
            toRGBA(): number[];
            toCMYK(): number[];
            toHEXA(): string[];
            clone: () => any;
        };
    };
    get color(): {
        h: number;
        s: number;
        v: number;
        a: number;
        toHSVA(): number[];
        toHSLA(): any[];
        toRGBA(): number[];
        toCMYK(): number[];
        toHEXA(): string[];
        clone: () => any;
    } | "";
    get value(): any;
    render(_renderProps?: {}, _store?: {}): any;
}


declare type DirectionEnums = 'vertical' | 'horizontal' | any;
export declare class WuContainer extends WuComponent implements OnConnected, OnBeforeUpdate {
    constructor();
    isVertical: boolean;
    beforeUpdate(): void;
    connected(shadowRoot: ShadowRoot): void;
    private initIsVertical;
    direction: DirectionEnums;
    render(_renderProps?: {}, _store?: {}): any;
}


declare type PickerType = 'year' | 'month' | 'date' | 'multiple' | 'week' | 'datetime' | 'datetimerange' | 'daterange' | 'monthrange' | 'yearrange';
export interface LocaleOptions {
    /****************************PC端***********************************/
    month?: string[];
    monthHead?: string[];
    week?: string[];
    clear?: string;
    cancel?: string;
    confirm?: string;
    yearHeadSuffix?: (year: string) => string;
    weekNum?: (weeknum: string) => string;
    /****************************PC端***********************************/
    /****************************移动端***********************************/
    dateSuffix: string;
    hourSuffix: string;
    minuteSuffix: string;
    secondSuffix: string;
}
export interface PickerOptions {
    type: PickerType;
    showWeek?: boolean;
    placeholder?: {
        startTime: string;
        endTime: string;
    };
    linkPanels?: boolean;
    firstDayOfWeek?: number;
    showClear?: boolean;
    autoConfirm?: boolean;
    showShortKeys?: boolean;
    autoFillDate?: boolean;
    separator?: string;
    startTime?: string;
    endTime?: string;
    minDate?: string;
    maxDate?: string;
    locale?: LocaleOptions;
    shortList?: {
        name: string;
        value: {
            startTime: any;
            endTime: any;
        };
    }[];
    confirmFirst: boolean;
    showType: 'modal';
    showBottomButton: boolean;
    disableDate: (date: any, dayjs: any) => boolean;
}
export declare class WuDatePicker extends WuComponent implements OnConnected, OnDisConnected {
    private picker;
    constructor();
    default: string[] | string;
    type: PickerType;
    size: UISize;
    disabled: boolean;
    options: PickerOptions;
    connected(shadowRoot: ShadowRoot): void;
    disConnected(): void;
    change(data: any): any;
    mountPicker(): void;
    height: string;
    disabledChange(val: boolean, old: boolean): void;
    valueChange(newValue: any, oldValue: any): void;
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuDialog extends WuComponent {
    constructor();
    visible: boolean;
    closeOnClickModal: boolean;
    showClose: boolean;
    lockScroll: boolean;
    zIndex: number;
    title: string;
    width: string;
    visibleChange(val: boolean): void;
    /**
     * 弹框打开
     */
    open(): void;
    /**
     * 遮罩点击
     */
    handleMaskClick(): void;
    /**
     * 遮罩点击
     */
    handleMaskClickContent(e: any): void;
    /**
     * 主体点击
     */
    contentTap(e: MouseEvent): void;
    /**
     * 弹框关闭
     */
    close(): void;
    /**
     * 动画结束
     */
    onAfterLeave(): void;
    /**
     * 禁止滚动
     */
    disableScroll(): void;
    /**
     * 开启滚动
     */
    enableScroll(): void;
    render(_renderProps?: {}, _store?: {}): any;
}

import "./ImgEmpty";
export declare class WuEmpty extends WuComponent {
    constructor();
    image: string;
    description: string;
    size: number;
    get emptyDescription(): string;
    get imageStyle(): {
        width: string;
    };
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuFooter extends WuComponent {
    constructor();
    height: string;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuFrom extends WuComponent implements OnConnected {
    private form;
    private elements;
    private submitBtn;
    private resetBtn;
    constructor();
    disabled: boolean;
    invalid: boolean;
    method: string;
    novalidate: boolean;
    action: string;
    name: string;
    type: string;
    get validity(): boolean;
    get formdata(): FormData;
    connected(shadowRoot: ShadowRoot): void;
    render(_renderProps?: {}, _store?: {}): any;
    submit(): Promise<void>;
    checkValidity(): boolean;
    reset(): void;
}

export declare class WuFromItem extends WuComponent {
    constructor();
    plain: boolean;
    novalidate: boolean;
    method(): void;
    action(): void;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuFormLabelWrap extends WuComponent implements OnConnected, OnUpdated, OnDisConnected {
    computedWidth: number;
    childDomList: Node[];
    slotDom: HTMLSlotElement;
    constructor();
    wuFormItem: any;
    wuForm: any;
    isAutoWidth: boolean;
    updateAll: boolean;
    connected(shadowRoot: ShadowRoot): void;
    updated(): void;
    disConnected(): void;
    getLabelWidth(): number;
    updateLabelWidth(action?: string): void;
    computedWidthChange(val: string, oldVal: string): void;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuFrom1 extends WuComponent implements OnConnected {
    private form;
    private elements;
    private submitBtn;
    private resetBtn;
    constructor();
    disabled: boolean;
    invalid: boolean;
    method: string;
    novalidate: boolean;
    action: string;
    name: string;
    type: string;
    get validity(): boolean;
    get formdata(): FormData;
    connected(shadowRoot: ShadowRoot): void;
    render(_renderProps?: {}, _store?: {}): any;
    submit(): Promise<void>;
    checkValidity(): boolean;
    reset(): void;
}

export declare class WuHeader extends WuComponent {
    constructor();
    height: string;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuIcon extends WuComponent {
    constructor();
    name: string;
    render(_renderProps?: {}, _store?: {}): any;
}

import Viewer from './viewer/viewer.esm.js';
export declare class WuImage extends WuComponent implements OnConnected, OnDisConnected {
    constructor();
    viewer: Viewer;
    imageWidth: number;
    imageHeight: number;
    showViewer: boolean;
    text: string;
    src: string;
    fit: TypeEnums;
    lazy: boolean;
    previewSrcList: string[];
    zIndex: number;
    alt: string;
    loading: boolean;
    error: boolean;
    show: boolean;
    get imageStyle(): {
        width?: undefined;
        height?: undefined;
    } | {
        width: string;
        height: string;
    } | {
        width: string;
        height?: undefined;
    } | {
        height: string;
        width?: undefined;
    } | {
        'object-fit': "fill" | "contain" | "cover" | "none" | "scale-down";
    };
    get alignCenter(): boolean;
    get preview(): boolean;
    get imageIndex(): number;
    /**
     * 图片加载完成
     * @param e
     * @param img
     */
    handleLoad(e: any, img: ImageData): void;
    /**
     * 加载错误
     * @param e
     */
    handleError(e: any): {
        err: any;
    };
    /**
     * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
     */
    getImageStyle(fit: any): {
        width?: undefined;
        height?: undefined;
    } | {
        width: string;
        height: string;
    } | {
        width: string;
        height?: undefined;
    } | {
        height: string;
        width?: undefined;
    };
    /**
     * 加载图片
     */
    loadImage(): void;
    /**
     * 图片点击
     */
    clickHandler(): void;
    /**
     * 关闭图片查看器
     */
    closeViewer(): void;
    connected(shadowRoot: ShadowRoot): void;
    disConnected(): void;
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuInject extends WuComponent implements OnConnected {
    injectionName: any;
    connected(shadowRoot: ShadowRoot): void;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuInput extends WuComponent implements OnInstall {
    wuForm: any;
    wuFormItem: any;
    size: UISize;
    value: string;
    disabled: boolean;
    type: TypeEnums;
    placeholder: string;
    clearable: boolean;
    suffixIcon: string;
    prefixIcon: string;
    maxLength: number;
    minLength: number;
    autoComplete: boolean;
    block: boolean;
    name: string;
    form: string;
    rows: number;
    onBlur: Function;
    onFocus: Function;
    onInput: Function;
    onChange: Function;
    onMouseEnter: Function;
    onMouseLeave: Function;
    $value: string | undefined;
    tempTagName: string;
    tempInputTagName: string;
    valueLength: number;
    /**
     * 处理数据
     */
    install(): void;
    /**
     * 渲染前
     */
    beforeInstall(): void;
    constructor();
    /**
     * 输入框失去焦点
     * @param e
     */
    handleBlur(e: any): any;
    /**
     * 输入框聚焦
     * @param e
     */
    handleFocus(e: any): any;
    /**
     * 输入框输入值修改
     * @param e
     */
    handleChange(e: any): any;
    /**
     * 输入框输入事件
     * @param e
     */
    handleInput(e: any): any;
    /**
     * 聚焦
     */
    focus(): void;
    /**
     * 失去焦点
     */
    blur(): void;
    /**
     * 清除
     */
    clearInput(): string;
    render(): any;
}


export declare class WuInputNumber extends WuComponent implements OnInstall {
    wuForm: any;
    wuFormItem: any;
    size: UISize;
    value: string;
    disabled: boolean;
    type: TypeEnums;
    placeholder: string;
    clearable: boolean;
    suffixIcon: string;
    prefixIcon: string;
    maxLength: number;
    minLength: number;
    autoComplete: boolean;
    block: boolean;
    name: string;
    form: string;
    rows: number;
    onBlur: Function;
    onFocus: Function;
    onInput: Function;
    onChange: Function;
    onMouseEnter: Function;
    onMouseLeave: Function;
    $value: string | undefined;
    tempTagName: string;
    tempInputTagName: string;
    valueLength: number;
    /**
     * 处理数据
     */
    install(): void;
    /**
     * 渲染前
     */
    beforeInstall(): void;
    constructor();
    /**
     * 输入框失去焦点
     * @param e
     */
    handleBlur(e: any): any;
    /**
     * 输入框聚焦
     * @param e
     */
    handleFocus(e: any): any;
    /**
     * 输入框输入值修改
     * @param e
     */
    handleChange(e: any): any;
    /**
     * 输入框输入事件
     * @param e
     */
    handleInput(e: any): any;
    /**
     * 聚焦
     */
    focus(): void;
    /**
     * 失去焦点
     */
    blur(): void;
    /**
     * 清除
     */
    clearInput(): string;
    render(): any;
}


export declare class WuLeafletMap extends WuComponent {
    constructor();
    name: string;
    render(_renderProps?: {}, _store?: {}): any;
}

declare type WuLinkType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export declare class WuLink extends WuComponent implements OnConnected, OnBeforeRender {
    constructor();
    beforeRender(): void;
    private eleAttrsMap;
    connected(shadowRoot: ShadowRoot): void;
    type: WuLinkType;
    name: string;
    underline: boolean;
    disabled: boolean;
    href: string;
    handleClick(e: Event): Event;
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuLottie extends WuComponent implements OnConnected, OnDisConnected {
    constructor();
    lottieInstance: AnimationItem;
    lottieContainer: HTMLDivElement;
    loop: boolean;
    data: string;
    autoplay: boolean;
    renderer: 'svg' | 'canvas' | 'html';
    config: Record<string, any>;
    connected(shadowRoot: ShadowRoot): void;
    disConnected(): void;
    private init;
    dataChnage(val: string, old: string): void;
    loopChnage(val: boolean, old: boolean): void;
    lautoplayChnage(val: boolean, old: boolean): void;
    stop(): void;
    play(): void;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuMain extends WuComponent {
    constructor();
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuMapboxMap extends WuComponent {
    constructor();
    name: string;
    render(_renderProps?: {}, _store?: {}): any;
}

declare type ModeEnums = 'horizontal' | 'vertical';
declare type MenuTriggerEnums = 'hover' | 'click';
export declare class WuMenu extends WuComponent implements OnConnected {
    constructor();
    activeIndex: string;
    openedMenus: any[];
    items: any;
    submenus: any;
    connected(shadowRoot: ShadowRoot): void;
    mode: ModeEnums;
    collapse: boolean;
    backgroundColor: string;
    textColor: string;
    activeTextColor: string;
    defaultActive: string;
    defaultOpeneds: string[];
    uniqueOpened: boolean;
    menuTrigger: MenuTriggerEnums;
    collapseTransition: boolean;
    provideWuMenu(): this;
    defaultActiveChange(value: any): void;
    defaultOpenedsChange(value: any): void;
    collapseChange(value: any): void;
    get hoverBackground(): string;
    get isMenuPopup(): boolean;
    mixColor(color: any, percent: any): string;
    getColorChannels(color: any): {
        red: number;
        green: number;
        blue: number;
    };
    updateActiveIndex(val: any): void;
    getMigratingConfig(): {
        props: {
            theme: string;
        };
    };
    initOpenedMenu(): void;
    routeToItem(item: any, onError: any): void;
    open(index: any): void;
    close(index: any): void;
    addItem(item: any): void;
    removeItem(item: any): void;
    addSubmenu(item: any): void;
    removeSubmenu(item: any): void;
    openMenu(index: any, indexPath: any): void;
    closeMenu(index: any): void;
    handleSubmenuClick: (submenu: WuSubMenu) => void;
    handleItemClick(item: WuMenuItem): void;
    private updateSlotContent;
    select(item: WuMenuItem): {
        index: string;
        indexPath: string[];
        item: WuMenuItem;
    };
    openChange(item: WuSubMenu): {
        index: string;
        indexPath: string[];
        item: WuSubMenu;
    };
    closeChange(item: WuSubMenu): {
        index: string;
        indexPath: string[];
        item: WuSubMenu;
    };
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuMenuItem extends WuComponent implements OnConnected, OnDisConnected {
    constructor();
    connected(shadowRoot: ShadowRoot): void;
    disConnected(): void;
    index: string;
    disabled: boolean;
    wuMenuRef: WuMenu;
    handleClick(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    get paddingStyle(): {
        paddingLeft?: undefined;
    } | {
        paddingLeft: string;
    };
    get active(): boolean;
    get hoverBackground(): string;
    get backgroundColor(): string;
    get activeTextColor(): string;
    get textColor(): string;
    get mode(): "horizontal" | "vertical";
    get itemStyle(): Record<any, any>;
    get isNested(): boolean;
    get parentMenu(): any;
    get isSlotTitle(): boolean;
    get indexPath(): string[];
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuMenuItemGroup extends WuComponent implements OnConnected {
    constructor();
    connected(shadowRoot: ShadowRoot): void;
    header: string;
    bodyStyle: Record<any, any>;
    shadow: ShadowEnums;
    headerShow: boolean;
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuSubMenu extends WuComponent implements OnConnected, OnDisConnected {
    private currentPlacement;
    constructor();
    connected(shadowRoot: ShadowRoot): void;
    disConnected(): void;
    index: string;
    showTimeout: string;
    hideTimeout: string;
    popperClass: string;
    disabled: boolean;
    popperAppendToBody: boolean;
    wuMenuRef: WuMenu;
    timeout: any;
    items: {};
    submenus: {};
    mouseInChild: boolean;
    /**
     * 点击
     */
    handleClick(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    addItem(item: any): void;
    get paddingStyle(): {
        paddingLeft?: undefined;
    } | {
        paddingLeft: string;
    };
    get itemStyle(): Record<any, any>;
    get parentMenu(): any;
    get isSlotTitle(): boolean;
    get isNested(): boolean;
    handleMouseenter(event: any, time: number): void;
    handleMouseleave(flg: any): void;
    handleTitleMouseenter(): void;
    handleTitleMouseleave(): void;
    updatePlacement(): void;
    get appendToBody(): boolean;
    get menuTransitionName(): "el-zoom-in-left" | "el-zoom-in-top";
    get opened(): boolean;
    get active(): boolean;
    get hoverBackground(): string;
    get backgroundColor(): string;
    get activeTextColor(): string;
    get textColor(): string;
    get mode(): "horizontal" | "vertical";
    get isMenuPopup(): boolean;
    get titleStyle(): {
        color: string;
        borderBottomColor?: undefined;
    } | {
        borderBottomColor: string;
        color: string;
    };
    get isFirstLevel(): boolean;
    get indexPath(): string[];
    RenderPopupMenu(): any;
    RenderInlineMenu(): any;
    RenderSubmenuTitleIcon(): any;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare type PositionEnums = 'top';
export declare class WuMessage extends WuComponent {
    constructor();
    timer: any;
    position: string;
    message: string;
    type: TypeEnums;
    duration: number;
    elId: number;
    center: boolean;
    showClose: boolean;
    customClass: string;
    verticalOffset: number;
    get positionStyle(): {
        top: string;
    };
    /**
     * 关闭
     */
    handleClose(): boolean;
    /**
     * 清除定时器
     */
    clearTimer(): void;
    /**
     * 开始定时器
     */
    startTimer(): void;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuPageHeader extends WuComponent {
    constructor();
    header: string;
    content: string;
    back(): void;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuPagination extends WuComponent implements OnBeforeRender {
    constructor();
    total: number;
    pageSize: number;
    numDisplay: number;
    currentPage: number;
    numEdge: number;
    linkTo: string;
    prevText: string;
    nextText: string;
    ellipseText: string;
    prevShow: boolean;
    nextShow: boolean;
    pageNum: number;
    beforeRender(): void;
    change(index: number): {
        currentPage: number;
    };
    private goto;
    private getInterval;
    private getPrev;
    private getNext;
    private getItem;
    render(_renderProps?: {}, _store?: {}): any;
}

import "@wu-component/wu-popover";
import "@wu-component/wu-button";
export declare class WuPopconfirm extends WuComponent {
    constructor();
    private popoverRef;
    content: string;
    confirmButtonText: string;
    cancelButtonText: string;
    confirmButtonType: string;
    cancelButtonType: string;
    icon: any;
    iconColor: string;
    hideIcon: string;
    visible: boolean;
    get displayConfirmButtonText(): string;
    get displayCancelButtonText(): string;
    confirm(): void;
    cancel(): void;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuPopover extends WuComponent implements OnConnected {
    constructor();
    connected(shadowRoot: ShadowRoot): void;
    position: Placement;
    effect: string;
    trigger: string;
    block: boolean;
    content: string;
    private timeout;
    isShow: boolean;
    private appear;
    disappear: boolean;
    disabled: boolean;
    private popper;
    closeEmit(): {
        value: boolean;
    };
    onEnter: (evt: any) => void;
    onEnterPopover: (evt: any) => void;
    updatePosition(): void;
    leave(): void;
    onLeavePopover: () => void;
    onLeave: () => void;
    render(_renderProps?: {}, _store?: {}): any;
}

declare type StatusEnums = 'success' | 'exception' | 'warning';
declare type StrokeLinecapEnums = 'butt' | 'round' | 'square';
export declare class WuProgress extends WuComponent {
    constructor();
    props: any;
    type: TypeEnums;
    percentage: number;
    status: StatusEnums;
    strokeWidth: number;
    strokeLinecap: StrokeLinecapEnums;
    textInside: boolean;
    width: number;
    showText: boolean;
    color: string;
    handleClose(event: Event): {
        event: Event;
    };
    handleClick(event: any): {
        event: any;
    };
    /**
     * 获取颜色
     * @param percentage
     */
    private getCurrentColor;
    /**
     * 内容
     */
    get content(): string;
    /**
     * 进度条大小
     */
    get progressTextSize(): number;
    /**
     * 图标类名
     */
    get iconClass(): "el-icon-warning" | "el-icon-circle-check" | "el-icon-circle-close" | "el-icon-check" | "el-icon-close";
    /**
     * 颜色
     */
    get stroke(): any;
    get barStyle(): Record<any, any>;
    get relativeStrokeWidth(): string;
    get radius(): number;
    get trackPath(): string;
    get perimeter(): number;
    get rate(): 1 | 0.75;
    get strokeDashoffset(): string;
    get trailPathStyle(): {
        strokeDasharray: string;
        strokeDashoffset: string;
    };
    get circlePathStyle(): {
        strokeDasharray: string;
        strokeDashoffset: string;
        transition: string;
    };
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuProvide extends WuComponent implements OnConnected {
    provide: string;
    provideParentDescTitle(): {
        parentDescTitle: string;
    };
    /**
     * 获取
     * @private
     */
    getProvide(): string;
    render(_renderProps?: {}, _store?: {}): any;
    connected(shadowRoot: ShadowRoot): any;
}

export declare class WuRadio extends WuComponent implements OnConnected {
    constructor();
    wuForm: any;
    wuFormItem: any;
    size: UISize;
    label: string;
    disabled: boolean;
    checked: boolean;
    value: string;
    name: string;
    border: string;
    private clickHandler;
    private change;
    private mounted;
    connected(shadowRoot: ShadowRoot): void;
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuRate extends WuComponent implements OnConnected, OnBeforeRender, OnInstall {
    constructor();
    beforeInstall(): any;
    beforeRender(): void;
    checkoutProps(): void;
    connected(shadowRoot: ShadowRoot): void;
    pointerAtLeftHalf: boolean;
    currentValue: number;
    hoverIndex: number;
    valueList: number[];
    allowUpdate: boolean;
    timeout: any;
    wuForm: any;
    wuFormItem: any;
    value: number;
    lowThreshold: number;
    highThreshold: number;
    max: number;
    colors: string[];
    voidColor: number;
    disabledVoidColor: number;
    disabled: boolean;
    allowHalf: boolean;
    showText: boolean;
    showScore: boolean;
    textColor: boolean;
    texts: string[];
    rateList: string[];
    get text(): string;
    get rateDisabled(): any;
    getIconStyle(index: number): {
        color: string | number;
    };
    /**
     * 获取图标渲染
     * @param index
     */
    getRateRender(index: number): string;
    /**
     * 设置值
     * @param item
     * @param event
     */
    setCurrentValue(item: number, event: MouseEvent): void;
    /**
     * 重置
     */
    resetCurrentValue(): void;
    input(value: number): {
        value: number;
    };
    change(value: number): {
        value: number;
    };
    /**
     * 选择
     * @param item
     * @param event
     */
    selectValue(item: number, event: Event): void;
    /**
     * 设置值
     * @param value
     */
    setRateValue(value: number): void;
    /**
     * 键盘操作
     * @param e
     */
    handleKey(e: MouseEvent): void;
    render(_renderProps?: {}, _store?: {}): any;
}

declare class WuRightMenu extends HTMLElement {
    icon: any;
    private menu;
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    disconnectedCallback(): void;
    upgradeProperty(): void;
    get list(): any;
    set list(value: any);
}
export { Menu, RightMenuCore, WuRightMenu };

declare type JustifyEnums = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
declare type AlignEnums = 'top' | 'middle' | 'bottom';
export declare class WuRow extends WuComponent {
    constructor();
    name: string;
    gutter: number;
    type: TypeEnums;
    justify: JustifyEnums;
    align: AlignEnums;
    tag: string;
    tempInputTagName: string;
    get currentStyle(): any;
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuSelect extends WuComponent implements OnConnected, OnBeforeUpdate {
    constructor();
    beforeUpdate(): void;
    private initOptions;
    connected(shadowRoot: ShadowRoot): void;
    /**
     * 多选tag大小
     */
    get collapseTagSize(): "small" | "mini";
    get currentDisabled(): boolean;
    get selectSize(): UISize;
    wuForm: any;
    wuFormItem: any;
    hoverIndex: number;
    label: string;
    options: WuSelectOptions[];
    popover: any;
    tagsRef: any;
    _refInput: any;
    inputWidth: 0;
    inputHeight: 0;
    selectedItems: any[];
    previousQuery: string;
    timeout: any;
    text: string;
    value: any;
    size: UISize;
    multiple: boolean;
    clearable: boolean;
    disabled: boolean;
    collapseTags: boolean;
    isFocus: boolean;
    active: boolean;
    filterable: boolean;
    placeholder: string;
    autoComplete: boolean;
    handleClose(event: Event): {
        event: Event;
    };
    provideSelectRef(): this;
    /**
     * item 点击
     */
    itemClick(item: WuSelectOptions): void;
    /**
     * 更新子项数据
     */
    updateSelectList(): void;
    /**
     * 输入框点击
     */
    onInputClick(): void;
    /**
     * 输入框失去焦点
     */
    onInputBlur(): void;
    /**
     * 输入框鼠标移入
     */
    onMouseenter(): void;
    /**
     * 鼠标离开
     */
    onMouseleave(): void;
    /**
     * 输入框聚焦
     */
    handleFocus(): void;
    /**
     * 输入框值修改
     * @param e
     */
    debouncedQueryChange(e: any): void;
    filter(): void;
    /**
     * 关闭标签
     * @param value
     */
    closeTag(value: CustomEvent): void;
    /**
     * 清空数据
     */
    clearSelect(event: any): void;
    selectItemClick(): {
        value: any;
    };
    /**
     * 抛出事件
     * @param event
     */
    clear(event: Event): Event;
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuSelectOptions extends WuComponent {
    constructor();
    selectRef: any;
    label: string;
    disabled: string;
    visible: boolean;
    value: string;
    size: UISize;
    selected: boolean;
    handleClose(event: Event): {
        event: Event;
    };
    handleClick(event: any): {
        event: any;
    };
    /**
     * 设置勾选
     * @param val
     */
    setSelect(val: boolean): void;
    /**
     * 更新是否显示
     * @param val
     */
    setVisible(val: boolean): void;
    get hover(): boolean;
    selectOptionClick(): this;
    clickItem(event: MouseEvent): void;
    hoverItem(): void;
    /**
     * 更新是否选择
     */
    updateSelect(): void;
    render(_renderProps?: {}, _store?: {}): any;
}


import "./step/index.tsx";
declare type Direction = 'vertical' | 'horizontal';
declare type ProcessStatus = 'wait' | 'process' | 'finish' | 'error' | 'success';
declare type FinishStatus = 'wait' | 'process' | 'finish' | 'error' | 'success';
interface StepItem {
    title: string;
    description: string;
    status: ProcessStatus;
    icon: any;
}
export declare class WuSteps extends WuComponent {
    constructor();
    ss: number;
    data: StepItem[];
    space: string;
    direction: Direction;
    active: number;
    processStatus: ProcessStatus;
    finishStatus: FinishStatus;
    alignCenter: boolean;
    simple: boolean;
    provideSteps(): this;
    stepOffset: number;
    get steps(): ChildNode[];
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuSwitch extends WuComponent implements OnConnected {
    constructor();
    wuForm: any;
    wuFormItem: any;
    inputRef: HTMLInputElement;
    coreRef: HTMLElement;
    connected(shadowRoot: ShadowRoot): void;
    disabled: boolean;
    value: boolean;
    activeValue: boolean;
    activeColor: string;
    inactiveColor: string;
    name: string;
    inactiveValue: boolean;
    width: number;
    validateEvent: boolean;
    checkedChange(val: any, oldVal: any): void;
    handleChange(): void;
    switchValue(): void;
    inputEmit(): boolean;
    changeEmit(): boolean;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuTable extends WuComponent implements OnConnected, OnBeforeRender {
    constructor();
    editingInput: any;
    beforeRender(): void;
    connected(shadowRoot: ShadowRoot): void;
    /**
     * 设置左侧固定
     * @private
     */
    private setFixedLeft;
    /**
     * 设置右侧固定
     * @private
     */
    private setFixedRight;
    data: any[];
    columns: any[];
    border: boolean;
    stripe: boolean;
    compact: boolean;
    width: string;
    height: string;
    fixedTop: boolean;
    fixedRight: boolean;
    fixedLeftCount: number;
    get checkbox(): boolean;
    get currentCheckList(): any[];
    /**
     * 获取选中状态
     */
    getCheckedState: () => {
        checked: boolean;
        indeterminate: boolean;
    };
    /**
     * 复选选中
     * @param event
     * @param columns
     * @param options
     */
    changeHandlerTh(event: any, columns: any, options: {
        isAllSelect: boolean;
    }): void;
    /**
     *
     * 单元格点击
     * @param event
     * @param item
     * @param options
     */
    changeHandlerTd(event: any, item: any, options: {
        isAllSelect: boolean;
    }): void;
    /**
     * 单元格点击
     */
    onTdClick(item: any, column: any, index: number, event: MouseEvent): void;
    /**
     * 输入框数据修改
     * @param evt
     * @param item
     * @param column
     */
    onChange: (evt: any, item: any, column: any) => void;
    selectionChange(value: any): any;
    /**
     * 当用户手动勾选全选 Checkbox 时触发的事件
     * @param selection
     */
    selectionAllChange(selection: any): any;
    /**
     * 单元格点击事件
     * @param row
     * @param column
     * @param index
     */
    cellClick(row: any, column: any, index: number): {
        row: any;
        column: any;
        index: number;
    };
    render(_renderProps?: {}, _store?: {}): any;
}

declare type EffectEnums = 'dark' | 'light' | 'plain';
export declare class WuTag extends WuComponent {
    constructor();
    text: string;
    value: string;
    color: string;
    closable: boolean;
    type: TypeEnums;
    hit: boolean;
    disableTransitions: boolean;
    size: UISize;
    effect: EffectEnums;
    handleClose(event: Event): {
        event: Event;
    };
    handleClick(event: any): {
        event: any;
        value: string;
        text: string;
    };
    render(_renderProps?: {}, _store?: {}): any;
}


import "@wu-component/wu-time-line-item";
export declare class WuTimeLine extends WuComponent {
    constructor();
    reverse: boolean;
    timelineRef(): this;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuTimeLineItem extends WuComponent implements OnConnected, OnBeforeUpdate {
    constructor();
    beforeUpdate(): void;
    connected(shadowRoot: ShadowRoot): void;
    private updateStyle;
    name: string;
    timestamp: string;
    hideTimestamp: boolean;
    isRenderDot: boolean;
    placement: string;
    type: string;
    color: string;
    size: string;
    icon: string;
    timelineRef: HTMLElement;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuTooltip extends WuComponent implements OnConnected {
    constructor();
    connected(shadowRoot: ShadowRoot): void;
    content: string;
    effect: string;
    position: Placement;
    isShow: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    render(_renderProps?: {}, _store?: {}): any;
}

export declare class WuTransition extends WuComponent implements OnConnected {
    constructor();
    name: string;
    leavingTime: number;
    autoRemove: boolean;
    appear: boolean;
    disappear: boolean;
    delay: number;
    _show: boolean;
    toggle(): Promise<unknown>;
    private callback;
    private beforeEnter;
    afterEnter(): void;
    enterEvent(): void;
    leaveEvent(): void;
    beforeLeave(): void;
    afterLeave(): void;
    connected(shadowRoot: ShadowRoot): void;
    receiveProps(): void;
    /**
     * dom 加载
     * @private
     */
    enter(): Promise<unknown>;
    /**
     * dom 离开
     * @private
     */
    leave(): Promise<unknown>;
    /**
     * 绑定一次事件
     * @param name
     * @param callback
     * @private
     */
    private once;
    render(_renderProps?: {}, _store?: {}): any;
}

interface DataOptions {
    id: string;
    label: string;
    disabled: string;
}
export declare class WuTree extends WuComponent implements OnConnected {
    constructor();
    private tree;
    connected(shadowRoot: ShadowRoot): void;
    nodeClick(params: any): any;
    checkChange(params: any): any;
    moveChange(params: any): any;
    width: string;
    height: string;
    options: DataOptions;
    lineHeight: number;
    selectType: TypeEnums;
    canMove: boolean;
    data: any;
    defaultCheckedKeys: any;
    defaultExpandedKeys: any;
    /**
     * 获取选中数据
     */
    getChecked(): {
        nodes: any;
        keys: any;
    };
    /**
     * 选中全部,justResult为true则仅选择当前搜索结果
     * @param justResult
     */
    checkAll(justResult?: boolean): void;
    /**
     * 清空所选项
     */
    clearAll(): void;
    /**
     * 设置选中节点，keys为选中的节点id的数组
     */
    setCheckedKeys(keys: string[]): void;
    /**
     * 设置选中节点，nodes为选中节点的数组
     */
    setCheckedNodes(nodes: any[]): void;
    /**
     * 编辑节点
     */
    editNode(nodes: any): void;
    /**
     * 添加节点,id:添加到的父节点id，当添加根节点时id为null,node新节点数据
     */
    addNode(id: string, nodes: any): void;
    /**
     * 删除节点
     */
    deleteNode(id: string): void;
    /**
     * :获取某个节点数据
     */
    getNodeById(id: string): any;
    /**
     * :重新计算容器高度
     */
    resize(): any;
    /**
     * :重新绘制
     */
    refreshDom(justScroll?: boolean, needLocate?: boolean): void;
    /**
     * :销毁实例，主要用于清除绑定事件
     */
    destory(): void;
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuTreeV2 extends WuComponent implements OnConnected {
    constructor();
    renderCaret: () => any;
    isTree: any;
    childNodeRendered: any;
    draggable: any;
    iconclass: any;
    showCheckbox: boolean;
    renderAfterExpand: boolean;
    expandOnClickNode: boolean;
    checkDescendants: boolean;
    autoExpandParent: boolean;
    highlightCurrent: boolean;
    checkStrictly: boolean;
    defaultExpandAll: boolean;
    checkOnClickNode: boolean;
    defaultCheckedKeys: any[];
    allowDrag: any;
    allowDrop: any;
    lazy: any;
    load: any;
    filterNodeMethod: any;
    renderContent: any;
    defaultExpandedKeys: any[];
    currentNodeKey: string;
    options: {
        children: string;
        label: string;
        disabled: string;
    };
    indent: number;
    data: any[];
    emptyText: string;
    nodeKey: string;
    treeStore: any;
    currentNode: any;
    treeItems: null;
    checkboxItems: [];
    dragState: {
        showDropIndicator: false;
        draggingNode: null;
        dropNode: null;
        allowDrop: true;
        dropType: "";
    };
    /**
     * 序列化数据
     * @param val
     * @private
     */
    private formatData;
    setData(data: any): void;
    dataChange(val: any): void;
    private init;
    get treeRoot(): any;
    connected(shadowRoot: ShadowRoot): void;
    checkChange(node: any): {
        data: any;
        checkedNodes: any;
        checkedKeys: any;
        halfCheckedNodes: any;
        halfCheckedKeys: any;
    };
    moveChange(params: any): {};
    get childrenNode(): Node[];
    set childrenNode(value: Node[]);
    get treeItemArray(): any;
    get isEmpty(): any;
    filter(value: any): void;
    getNodeKey(node: any): any;
    getNodePath(data: any): any[];
    getCheckedNodes(leafOnly: any, includeHalfChecked: any): any;
    getCheckedKeys(leafOnly: any): any;
    getCurrentNode(): any;
    getCurrentKey(): any;
    setCheckedNodes(nodes: any, leafOnly: any): void;
    setCheckedKeys(keys: any, leafOnly: any): void;
    setChecked(data: any, checked: any, deep: any): void;
    getHalfCheckedNodes(): any;
    getHalfCheckedKeys(): any;
    setCurrentNode(node: any): void;
    setCurrentKey(key: any): void;
    getNode(data: any): any;
    removeNode(data: any): void;
    appendNode(data: any, parentNode: any): void;
    insertNodeBefore(data: any, refNode: any): void;
    insertNodeAfter(data: any, refNode: any): void;
    handleNodeExpand(nodeData: any, node: any, instance: any): void;
    updateKeyChildren(key: any, data: any): void;
    initTabIndex(): void;
    handleKeydown(ev: any): void;
    treeNodeCurrentChange(): {
        currentNode: any;
        data: any;
    };
    treeNodeNodeClick(node: Node): {
        node: Node;
    };
    treeNodeNodeCollapse(node: Node): {
        node: Node;
    };
    treeNodeNodeExpand(node: Node): {
        node: Node;
    };
    treeNodeNodeCheck(node: Node): {
        data: any[];
        checkedNodes: any;
        checkedKeys: any;
        halfCheckedNodes: any;
        halfCheckedKeys: any;
    };
    /****************************************树节点***********************************************/
    handleClick(e: MouseEvent, node: Node): void;
    handleDragStart(e: MouseEvent): void;
    handleDragOver(e: MouseEvent): void;
    handleDragEnd(e: MouseEvent): void;
    handleDrop(e: MouseEvent): void;
    handleExpandIconClick(e: MouseEvent, node: Node): void;
    handleCheckChange(node: Node, value: any, e: MouseEvent): void;
    renderNodeContent(node: Node): any;
    private renderTreeNode;
    render(_renderProps?: {}, _store?: {}): any;
}

import "@wu-component/wu-progress";
export declare const documentIcon: () => any;
export declare const closeIcon: () => any;
export declare const circleIcon: () => any;
export declare const checkIcon: () => any;
export declare const deleteIcon: () => any;
declare type ListTypeEnum = 'text' | 'picture' | 'picture-card';
export declare class WuUpload extends WuComponent {
    disabled: boolean;
    multiple: boolean;
    action: string;
    name: string;
    drag: boolean;
    type: string;
    data: Record<any, any>;
    headers: Record<any, any>;
    withCredentials: boolean;
    accept: string;
    autoUpload: boolean;
    listType: ListTypeEnum;
    limit: Number;
    beforeUpload: Function;
    fileList: File[];
    uploadFiles: File[];
    private dragover;
    private reqs;
    draging: boolean;
    focusing: boolean;
    tempIndex: number;
    constructor();
    emitFile(files: File[]): {
        files: File[];
    };
    onChange(params: Record<any, any>): {
        [x: string]: any;
    };
    onProgress(params: Record<any, any>): {
        [x: string]: any;
    };
    onSuccess(params: Record<any, any>): {
        [x: string]: any;
    };
    onError(params: Record<any, any>): {
        [x: string]: any;
    };
    onPreview(params: Record<any, any>): {
        [x: string]: any;
    };
    onRemove(params: Record<any, any>): {
        [x: string]: any;
    };
    fileListChange(fileList: File[]): void;
    submit(): void;
    /**
     * 拖动中
     * @param e
     */
    dropHandlerFun(e: any): void;
    /**
     * 开始拖动
     * @param e
     */
    dropOverHandlerFun(e: MouseEvent): void;
    /**
     * 结束拖动
     * @param e
     */
    dropLeaveHandlerFun(e: MouseEvent): void;
    /**
     * 拖拽
     */
    renderUploadDrag(): any;
    /**
     * 文件修改
     */
    handleChange(ev: MouseEvent): void;
    onExceedFun(files: File[], files2: File[]): void;
    onStartFun(rawFile: File): void;
    /**
     * 文件上传
     * @param files
     * @param flag
     */
    uploadFilesFun(files: File[], flag?: boolean): void;
    beforeUploadFun(file: File): any;
    abort(file: any): void;
    onRemoveFun(file: any, raw: File): void;
    upload(rawFile: File): void;
    private httpRequest;
    onProgressFun(ev: MouseEvent, rawFile: File): void;
    onSuccessFun(res: any, rawFile: File): void;
    onErrorFun(err: any, rawFile: File): void;
    getFile(rawFile: any): any;
    post(rawFile: File): void;
    handleClick(): void;
    handleKeydown(e: any): void;
    /**
     * 文件上传
     */
    renderUpload(): any;
    /**
     * 文件列表删除
     * @param e
     * @param file
     * @param index
     */
    fileListKeydownDelete(e: MouseEvent, file: File, index: number): void;
    fileListFocus(e: MouseEvent, file: File, index: number): void;
    fileListBlur(e: MouseEvent, file: File, index: number): void;
    fileListClick(e: MouseEvent, file: File, index: number): void;
    fileListItemClick(e: MouseEvent, file: File, index: number): void;
    renderFileList(): any;
    parsePercentage(val: any): number;
    render(_renderProps?: {}, _store?: {}): any;
}


export declare class WuWalineComment extends WuComponent implements OnConnected, OnDisConnected {
    private waline;
    constructor();
    /**
     * 当前 _文章页_ 路径，用于区分不同的 _文章页_ ，以保证正确读取该 _文章页_ 下的评论列表
     *
     * 你可以将其设置为 `window.location.pathname`
     *
     * Article path id. Used to distinguish different _article pages_ to ensure loading the correct comment list under the _article page_.
     *
     * You can set it to `window.location.pathname`
     *
     * @default window.location.pathname
     */
    path: string;
    /**
     * 评论数统计
     *
     * Comment number support
     *
     * @default false
     */
    comment: boolean;
    /**
     * 页面访问量统计
     *
     * Pageview number support
     *
     * @default false
     */
    pageview: boolean;
    /**
     * Waline 的服务端地址
     *
     * Waline server address url
     */
    serverurl: string;
    /**
     * 评论者相关属性
     *
     * `Meta` 可选值: `'nick'`, `'mail'`, `'link'`
     *
     * Reviewer attributes.
     *
     * Optional values for `Meta`: `'nick'`, `'mail'`, `'link'`
     *
     * @default ['nick', 'mail', 'link']
     */
    meta?: WalineMeta[];
    /**
     * 设置**必填项**，默认昵称为匿名
     *
     * Set required fields, default anonymous with nickname
     *
     * @default []
     */
    requiredMeta?: WalineMeta[];
    /**
     * 评论字数限制。填入单个数字时为最大字数限制
     *
     * @more 设置为 `0` 时无限制
     *
     * Comment word s limit. When a single number is filled in, it 's the maximum number of comment words.
     *
     * @more No limit when set to `0`.
     *
     * @default 0
     */
    wordLimit?: number | [number, number];
    /**
     * 评论列表分页，每页条数
     *
     * number of pages per page
     *
     * @default 10
     */
    pageSize?: number;
    /**
     * Waline 显示语言
     *
     * 可选值:
     *
     * - `'zh'`
     * - `'zh-cn'`
     * - `'zh-CN'`
     * - `'zh-tw'`
     * - `'zh-TW'`
     * - `'en'`
     * - `'en-US'`
     * - `'en-us'`
     * - `'jp'`
     * - `'jp-jp'`
     * - `'jp-JP'`
     * - `'pt-br'`
     * - `'pt-BR'`
     * - `'ru'`
     * - `'ru-ru'`
     * - `'ru-RU'`
     *
     * Display language for waline
     *
     * Optional value:
     *
     * - `'zh'`
     * - `'zh-cn'`
     * - `'zh-CN'`
     * - `'zh-tw'`
     * - `'zh-TW'`
     * - `'en'`
     * - `'en-US'`
     * - `'en-us'`
     * - `'jp'`
     * - `'jp-jp'`
     * - `'jp-JP'`
     * - `'pt-br'`
     * - `'pt-BR'`
     * - `'ru'`
     * - `'ru-ru'`
     * - `'ru-RU'`
     *
     * @default 'zh-CN'
     */
    language?: string;
    /**
     * 自定义 waline 语言显示
     *
     * @see [自定义语言](https://waline.js.org/client/i18n.html)
     *
     * Custom display language in waline
     *
     * @see [I18n](https://waline.js.org/en/client/i18n.html)
     */
    locale?: Partial<WalineLocale>;
    /**
     * 是否启用暗黑模式适配
     *
     * @more 设置 `'auto'` 会根据设备暗黑模式自适应。填入 CSS 选择器会在对应选择器生效时启用夜间模式。
     *
     * Whether to enable darkmode support
     *
     * @more Setting `'auto'` will display darkmode due to device settings. Filling in CSS selector will enable darkmode only when the selector match waline ancestor nodes.
     */
    dark?: string;
    /**
     * 设置表情包
     *
     * Set Emojis
     *
     * @default ['//unpkg.com/@waline/emojis@1.1.0/weibo']
     */
    emoji?: (string | WalineEmojiInfo)[] | false;
    /**
     * 设置搜索功能
     *
     * Customize Search feature
     */
    search?: WalineSearchOptions | false;
    /**
     * 代码高亮
     *
     * Code highlighting
     */
    highlighter?: WalineHighlighter | false;
    /**
     * 自定义图片上传方法，方便更好的存储图片
     *
     * 方法执行时会将图片对象传入。
     *
     * Custom image upload callback to manage picture by yourself.
     *
     * We will pass a picture file object when execute it.
     */
    imageUploader?: WalineImageUploader | false;
    /**
     * 自定义数学公式处理方法，用于预览。
     *
     * Custom math formula parse callback for preview.
     */
    texRenderer?: WalineTexRenderer | false;
    /**
     *
     * 登录模式状态，可选值:
     *
     * - `'enable'`: 启用登录 (默认)
     * - `'disable'`: 禁用登录，用户只能填写信息评论
     * - `'force'`: 强制登录，用户必须注册并登录才可发布评论
     *
     * Login mode status, optional values:
     *
     * - `'enable'`: enable login (default)
     * - `'disable'`: Login is disabled, users should fill in infomation to comment
     * - `'force'`: Forced login, users must login to comment
     *
     * @default 'enable'
     */
    login?: 'enable' | 'disable' | 'force';
    /**
     * 是否在页脚展示版权信息
     *
     * 为了支持 Waline，我们强烈建议你开启它
     *
     * Whether show copyright in footer
     *
     * We strongly recommended you to keep it on to support waline
     *
     * @default true
     */
    copyright?: boolean;
    /**
     * recaptcha v3 client key
     */
    recaptchaV3Key?: string;
    /**
     * reaction
     */
    reaction?: string[] | boolean;
    connected(shadowRoot: ShadowRoot): void;
    updateConfig(options: WalineInitOptions): void;
    disConnected(): void;
    render(_renderProps?: {}, _store?: {}): any;
}
export declare class WuWalineCommentShadow extends WuComponent implements OnConnected, OnDisConnected {
    private waline;
    constructor();
    /**
     * 当前 _文章页_ 路径，用于区分不同的 _文章页_ ，以保证正确读取该 _文章页_ 下的评论列表
     *
     * 你可以将其设置为 `window.location.pathname`
     *
     * Article path id. Used to distinguish different _article pages_ to ensure loading the correct comment list under the _article page_.
     *
     * You can set it to `window.location.pathname`
     *
     * @default window.location.pathname
     */
    path: string;
    /**
     * 评论数统计
     *
     * Comment number support
     *
     * @default false
     */
    comment: boolean;
    /**
     * 页面访问量统计
     *
     * Pageview number support
     *
     * @default false
     */
    pageview: boolean;
    /**
     * Waline 的服务端地址
     *
     * Waline server address url
     */
    serverurl: string;
    /**
     * 评论者相关属性
     *
     * `Meta` 可选值: `'nick'`, `'mail'`, `'link'`
     *
     * Reviewer attributes.
     *
     * Optional values for `Meta`: `'nick'`, `'mail'`, `'link'`
     *
     * @default ['nick', 'mail', 'link']
     */
    meta?: WalineMeta[];
    /**
     * 设置**必填项**，默认昵称为匿名
     *
     * Set required fields, default anonymous with nickname
     *
     * @default []
     */
    requiredMeta?: WalineMeta[];
    /**
     * 评论字数限制。填入单个数字时为最大字数限制
     *
     * @more 设置为 `0` 时无限制
     *
     * Comment word s limit. When a single number is filled in, it 's the maximum number of comment words.
     *
     * @more No limit when set to `0`.
     *
     * @default 0
     */
    wordLimit?: number | [number, number];
    /**
     * 评论列表分页，每页条数
     *
     * number of pages per page
     *
     * @default 10
     */
    pageSize?: number;
    /**
     * Waline 显示语言
     *
     * 可选值:
     *
     * - `'zh'`
     * - `'zh-cn'`
     * - `'zh-CN'`
     * - `'zh-tw'`
     * - `'zh-TW'`
     * - `'en'`
     * - `'en-US'`
     * - `'en-us'`
     * - `'jp'`
     * - `'jp-jp'`
     * - `'jp-JP'`
     * - `'pt-br'`
     * - `'pt-BR'`
     * - `'ru'`
     * - `'ru-ru'`
     * - `'ru-RU'`
     *
     * Display language for waline
     *
     * Optional value:
     *
     * - `'zh'`
     * - `'zh-cn'`
     * - `'zh-CN'`
     * - `'zh-tw'`
     * - `'zh-TW'`
     * - `'en'`
     * - `'en-US'`
     * - `'en-us'`
     * - `'jp'`
     * - `'jp-jp'`
     * - `'jp-JP'`
     * - `'pt-br'`
     * - `'pt-BR'`
     * - `'ru'`
     * - `'ru-ru'`
     * - `'ru-RU'`
     *
     * @default 'zh-CN'
     */
    language?: string;
    /**
     * 自定义 waline 语言显示
     *
     * @see [自定义语言](https://waline.js.org/client/i18n.html)
     *
     * Custom display language in waline
     *
     * @see [I18n](https://waline.js.org/en/client/i18n.html)
     */
    locale?: Partial<WalineLocale>;
    /**
     * 是否启用暗黑模式适配
     *
     * @more 设置 `'auto'` 会根据设备暗黑模式自适应。填入 CSS 选择器会在对应选择器生效时启用夜间模式。
     *
     * Whether to enable darkmode support
     *
     * @more Setting `'auto'` will display darkmode due to device settings. Filling in CSS selector will enable darkmode only when the selector match waline ancestor nodes.
     */
    dark?: string;
    /**
     * 设置表情包
     *
     * Set Emojis
     *
     * @default ['//unpkg.com/@waline/emojis@1.1.0/weibo']
     */
    emoji?: (string | WalineEmojiInfo)[] | false;
    /**
     * 设置搜索功能
     *
     * Customize Search feature
     */
    search?: WalineSearchOptions | false;
    /**
     * 代码高亮
     *
     * Code highlighting
     */
    highlighter?: WalineHighlighter | false;
    /**
     * 自定义图片上传方法，方便更好的存储图片
     *
     * 方法执行时会将图片对象传入。
     *
     * Custom image upload callback to manage picture by yourself.
     *
     * We will pass a picture file object when execute it.
     */
    imageUploader?: WalineImageUploader | false;
    /**
     * 自定义数学公式处理方法，用于预览。
     *
     * Custom math formula parse callback for preview.
     */
    texRenderer?: WalineTexRenderer | false;
    /**
     *
     * 登录模式状态，可选值:
     *
     * - `'enable'`: 启用登录 (默认)
     * - `'disable'`: 禁用登录，用户只能填写信息评论
     * - `'force'`: 强制登录，用户必须注册并登录才可发布评论
     *
     * Login mode status, optional values:
     *
     * - `'enable'`: enable login (default)
     * - `'disable'`: Login is disabled, users should fill in infomation to comment
     * - `'force'`: Forced login, users must login to comment
     *
     * @default 'enable'
     */
    login?: 'enable' | 'disable' | 'force';
    /**
     * 是否在页脚展示版权信息
     *
     * 为了支持 Waline，我们强烈建议你开启它
     *
     * Whether show copyright in footer
     *
     * We strongly recommended you to keep it on to support waline
     *
     * @default true
     */
    copyright?: boolean;
    /**
     * recaptcha v3 client key
     */
    recaptchaV3Key?: string;
    /**
     * reaction
     */
    reaction?: string[] | boolean;
    connected(shadowRoot: ShadowRoot): void;
    updateConfig(options: WalineInitOptions): void;
    disConnected(): void;
    render(_renderProps?: {}, _store?: {}): any;
}

