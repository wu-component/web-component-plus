import { OnBeforeUpdate, OnConnected, WuComponent } from '@wu-component/web-core-plus';
declare type UISize = 'medium' | 'small' | 'mini';
import '@wu-component/wu-popover';
import '@wu-component/wu-tag';
import '@wu-component/wu-select-option';
import type { WuSelectOptions } from "../types/type";
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
export {};
