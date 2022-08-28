import { Component, Emit, h, Inject, OnBeforeUpdate, OnConnected, Prop, Provide, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
type UISize = 'medium' | 'small' | 'mini';
import { extractClass } from '@wu-component/common';
import '@wu-component/wu-popover';
import '@wu-component/wu-tag';
import '@wu-component/wu-select-option';
import type { WuSelectOptions } from "../types/type";

@Component({
    name: 'wu-plus-select',
    css: css,
})
export class WuSelect extends WuComponent implements OnConnected, OnBeforeUpdate {
    constructor() {
        super();
    }

    public override beforeUpdate() {
        this.initOptions();
    }

    private initOptions() {
        const slotDom = this.shadowRoot.getElementById('defaultSlot') as HTMLSlotElement;
        this.options = slotDom.assignedNodes().filter(item => (item as any).tagName === 'WU-PLUS-SELECT-OPTION') as unknown as WuSelectOptions[];
    }

    public override connected(shadowRoot: ShadowRoot) {
        this.initOptions();
        const selectItems: WuSelectOptions[] = [];
        for (let i = 0; i < this.options.length; i ++) {
            if (this.value.includes(this.options[i].value)) {
                selectItems.push(this.options[i]);
            }
        }
        if (Array.isArray(this.value)) {
            this.multiple = true;
        }
        if (selectItems.length && !this.multiple) {
            this.label = selectItems[0].label;
        }
        this.selectedItems = selectItems;
        Promise.resolve().then(() => {
            (this as any).update();
            this.updateSelectList();
        });
    }

    /**
     * 多选tag大小
     */
    get collapseTagSize() {
        return [ 'small', 'mini' ].indexOf(this.size) > -1 ? 'mini' : 'small';
    }

    get currentDisabled() {
        return this.disabled;
    }

    get selectSize() {
        return this.size;
    }

    @Inject('wuFormRef')
    public wuForm;

    @Inject('wuFormItemRef')
    public wuFormItem;

    public hoverIndex = -1;

    @Prop({ default: '' })
    public label = '';

    public options: WuSelectOptions[] = [];

    public popover = null;

    public tagsRef = null;

    public _refInput = null;

    public inputWidth: 0;

    public inputHeight: 0;

    public selectedItems = [];

    public previousQuery = '';

    public timeout = null;

    @Prop({ default: '', type: String })
    public text: string;

    @Prop({ default: '' })
    public value: any;

    @Prop({ default: 'mini', type: String })
    public size: UISize;

    @Prop({ default: false, type: Boolean })
    public multiple: boolean;

    @Prop({ default: false, type: Boolean })
    public clearable: boolean;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Prop({ default: false, type: Boolean })
    public collapseTags: boolean;

    @Prop({ default: false, type: Boolean })
    public isFocus: boolean;

    @Prop({ default: false, type: Boolean })
    public active: boolean;

    @Prop({ default: false, type: Boolean })
    public filterable: boolean;

    @Prop({ default: '', type: String })
    public placeholder: string;

    @Prop({ default: false, type: Boolean })
    public autoComplete: boolean;

    @Emit('close')
    public handleClose(event: Event) {
        event = Array.isArray(event) && event.length ? event[0] : event;
        event.stopPropagation();
        return {
            event,
        };
    }

    @Provide('selectRef')
    public provideSelectRef() {
        return this;
    }

    /**
     * item 点击
     */
    public itemClick(item: WuSelectOptions) {
        if (this.multiple) {
            const index: number = this.selectedItems.findIndex(item1 => item === item1);
            if (index >= 0) {
                this.selectedItems.splice(index, 1);
            } else {
                this.selectedItems.push(item);
            }
        } else {
            this.selectedItems = [ item ];
        }
        this.label = item.label;
        (this as any).update();
        this.updateSelectList();
        if (this.selectedItems.length) {
            this.selectItemClick();
        }
        if (!this.multiple) {
            Promise.resolve().then(() => {
                this.popover?.leave?.();
            });
        }
    }

    /**
     * 更新子项数据
     */
    public updateSelectList() {
        for (let i = 0; i < this.options.length; i++) {
            this.options[i].updateSelect();
        }
    }

    /**
     * 输入框点击
     */
    public onInputClick() {
        this.active = true;
    }

    /**
     * 输入框失去焦点
     */
    public onInputBlur() {
        this.active = false;
        this.previousQuery = '';
    }

    /**
     * 输入框鼠标移入
     */
    public onMouseenter() {
        this.active = true;
    }

    /**
     * 鼠标离开
     */
    public onMouseleave() {
        this.active = false;
    }

    /**
     * 输入框聚焦
     */
    public handleFocus() {
        this.filter();
    }

    /**
     * 输入框值修改
     * @param e
     */
    public debouncedQueryChange(e: any) {
        if (this.disabled) return;
        this.previousQuery = e.target.value.replace(/(^\s*)|(\s*$)/g, '');
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            this.filter();
        }, 200);
    }

    public filter() {
        if (!this.previousQuery.length) {
            for (let i = 0; i < this.options.length; i++) {
                this.options[i].setVisible(true);
            }
            return;
        }
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].label.indexOf(this.previousQuery) === -1) {
                this.options[i].setVisible(false);
            } else {
                this.options[i].setVisible(true);
            }
        }
    }

    /**
     * 关闭标签
     * @param value
     */
    public closeTag(value: CustomEvent) {
        if (this.disabled) return;
        const index = this.selectedItems.findIndex(item => item.value === value.detail.value);
        this.selectedItems.splice(index, 1);
        (this as any).update();
        this.updateSelectList();
    }

    /**
     * 清空数据
     */
    public clearSelect(event: any) {
        if (this.disabled) return;
        event = Array.isArray(event) && event.length ? event[0] : event;
        event.stopPropagation();
        this.selectedItems = [];
        this.value = Array.isArray(this.value) ? [] : "";
        this.label = '';
        this.previousQuery = "";
        (this as any).update();
        this.updateSelectList();
        this.clear(event);
    }

    @Emit('change')
    public selectItemClick() {
        if (this.multiple) {
            return { value: this.selectedItems.map(item => item.value) };
        }
        return { value: this.selectedItems[0].value };
    }

    /**
     * 抛出事件
     * @param event
     */
    @Emit("clear")
    public clear(event: Event) {
        return event;
    }

    public override render(_renderProps = {}, _store = {}) {
        const commonAttr: any = {};
        if (!this.filterable) {
            commonAttr.readonly = 'readonly';
        }
        return (
            <div
                {...extractClass({}, 'wu-select', {
                    ['wu-select-' + this.size]: this.size,
                    'is-disabled': this.disabled,
                })}
                onMouseenter={this.onMouseenter.bind(this)}
                onMouseleave={this.onMouseleave.bind(this)}
            >
                <wu-plus-popover ref={e => (this.popover = e)} position="bottom" disabled={this.disabled}>
                    <div>
                        {this.multiple ? (
                            <div class="wu-select_tags" ref={e => (this.tagsRef = e)} style={{ 'max-width': this.inputWidth - 32 + 'px', width: '100%' }}>
                                {Array.isArray(this.selectedItems) && this.collapseTags && this.selectedItems.length ? (
                                    <span>
                                        <wu-plus-tag style="padding: 0 8px;" size={this.size} type="text" closable={false} value={this.selectedItems[0].value}>
                                            <span class="wu-select_tags-text">{this.selectedItems[0].label}</span>
                                        </wu-plus-tag>
                                        {this.selectedItems.length > 1 ? (
                                            <wu-plus-tag size={this.size} type="text" closable={false}>
                                                <span class="wu-select_tags-text">+{this.selectedItems.length - 1}</span>
                                            </wu-plus-tag>
                                        ) : null}
                                    </span>
                                ) : null}
                                {Array.isArray(this.selectedItems) && !this.collapseTags && this.selectedItems.length
                                    ? this.selectedItems.map(item => {
                                          return (
                                              <wu-plus-tag style="padding: 0 8px;" size={this.size} type="text" closable={true} onClose={this.closeTag.bind(this)} value={item.value}>
                                                  <span class="wu-select_tags-text">{item.label}</span>
                                              </wu-plus-tag>
                                          );
                                      })
                                    : null}
                                <input
                                    type="text"
                                    autocomplete="off"
                                    class={this.selectSize ? `is-${this.selectSize} wu-select_input` : 'wu-select_input'}
                                    disabled={this.currentDisabled}
                                    {...commonAttr}
                                    style={{
                                        flexGrow: 1,
                                        width: '0.0961538%',
                                        maxWidth: this.inputWidth - 32 + 'px',
                                    }}
                                />
                            </div>
                        ) : null}
                        <div
                            {...extractClass({}, 'wu-input wu-input-suffix', {
                                ['wu-input-' + this.size]: this.size,
                                'is-focus': this.isFocus,
                                'is-disabled': this.disabled,
                            })}>
                            <input
                                style={{ height: this.inputHeight + 'px' }}
                                type="text"
                                ref={e => (this._refInput = e)}
                                onClick={this.onInputClick.bind(this)}
                                onBlur={this.onInputBlur.bind(this)}
                                onFocus={this.handleFocus.bind(this)}
                                onInput={this.debouncedQueryChange.bind(this)}
                                {...commonAttr}
                                autocomplete="off"
                                value={this.multiple ? '' : this.label}
                                placeholder={this.placeholder}
                                class="wu-input_inner"
                            />

                            {this.clearable && !this.disabled && this.active ? (
                                <div class="wu-input_suffix-clearable">
                                    <svg onClick={this.clearSelect.bind(this)} class="wu-input_clear" fill="currentColor" width="1em" height="1em" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                    </svg>
                                </div>
                            ) : (
                                <div>
                                    <span class="wu-input_suffix">
                                        <span class="wu-input_suffix-inner">
                                            <i class="wu-select_caret wu-input_icon wu-icon-arrow-up is-reverse" />
                                        </span>
                                    </span>

                                    <svg viewBox="0 0 24 24" class="arrow" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
                                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                    <div slot="popover" class="wu-select-dropdown_wrap">
                        <slot id="defaultSlot" />
                    </div>

                </wu-plus-popover>
            </div>
        );
    }
}
