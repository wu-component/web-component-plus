import { Component, Emit, h, Inject, Prop } from '@canyuegongzi/web-core-plus';
import css from './index.scss';
import { UISize } from '@/interface';
import { extractClass } from '@/common';

@Component({
    name: 'wu-plus-select-option',
    css: css,
})
export class WuSelectOptions extends HTMLElement {
    constructor() {
        super();
    }

    @Inject('selectRef')
    public selectRef: any;

    @Prop({ default: '', type: String })
    public label: string;

    @Prop({ default: false, type: Boolean })
    public disabled: string;

    @Prop({ default: true, type: Boolean })
    public visible: boolean;

    @Prop({ default: '' })
    public value: string;

    @Prop({ default: 'mini', type: String })
    public size: UISize;

    @Prop({ default: false, type: Boolean })
    public selected = false;

    @Emit('close')
    public handleClose(event: Event) {
        event = Array.isArray(event) && event.length ? event[0] : event;
        event.stopPropagation();
        return {
            event,
        };
    }

    @Emit('click')
    public handleClick(event) {
        event = Array.isArray(event) && event.length ? event[0] : event;
        return {
            event,
        };
    }

    /**
     * 设置勾选
     * @param val
     */
    public setSelect(val: boolean) {
        this.selected = val;
    }

    /**
     * 更新是否显示
     * @param val
     */
    public setVisible(val: boolean) {
        this.visible = val;
    }

    get hover() {
        return true;
    }

    @Emit('itemClick')
    public selectOptionClick() {
        return this;
    }

    public clickItem(event: MouseEvent) {
        event = Array.isArray(event) && event.length ? event[0] : event;
        event.stopPropagation();
        this.selectOptionClick();
        this.selectRef?.itemClick?.(this);
    }

    public hoverItem() {
        if (this.disabled || !this.selectRef) return;
        this.selectRef.hoverIndex = this.selectRef?.selectedItems.indexOf(this);
    }

    /**
     * 更新是否选择
     */
    public updateSelect() {
        const selectOptions: WuSelectOptions[] = this.selectRef?.selectedItems;
        this.setSelect(selectOptions.includes(this));
    }

    public render(_renderProps = {}, _store = {}) {
        return (
            <div
                {...extractClass({}, '', {
                    selected: this.selected,
                    'is-disabled': this.disabled,
                    'wu-select-dropdown_item': true,
                })}
                style={{ visibility: !this.visible ? 'hidden' : 'visible', height: !this.visible ? 0 : 'auto' }}
                onclick={this.clickItem.bind(this)}
                onMouseenter={this.hoverItem.bind(this)}
            >
                <span class={this.selected ? 'selected' : ''}>{this.label}</span>
                {this.selected ? (
                    <svg class="a3 a2" focusable="false" viewBox="0 0 24 24" aria-hidden="true" tabindex="-1" title="Check" curr>
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                ) : null}
            </div>
        );
    }
}
