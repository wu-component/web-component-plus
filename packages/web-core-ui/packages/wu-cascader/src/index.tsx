import { Component, Emit, h, OnConnected, Prop, WuComponent } from '@wu-component/web-core-plus';
import '@wu-component/wu-popover/src/index';
import '@wu-component/wu-input/src/index';
import css from './index.scss';
import type { WuInput, WuPopover } from "../types/type";
type UISize = 'medium' | 'small' | 'mini';
interface CascaderOption {
    value: string
    label: string
    disabled?: boolean
    children?: CascaderOption[]
}

export interface CascaderProps {
    /**
     * 当前值（从父到子应当是一个数组）
     */
    value: string[]
    /**
     * 选项列表
     */
    options: CascaderOption[]
    /**
     * 尺寸 Todo
     */
    size?: 'default' | 'medium' | 'small' | 'mini'
    /**
     * 是否禁用
     */
    disabled?: boolean
    /**
     * 选项被点击后的回调函数
     */
    onOptionClick?: (item: any, index: any, evt: any) => void
}

@Component({
    name: 'wu-plus-cascader',
    css: css,
})
export class WuCascader extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    private popoverRef!: WuPopover;

    private inputRef!: WuInput;

    @Prop({ default: [], type: Array })
    public value: string[] = []

    @Prop({ default: [], type: Array })
    public options: CascaderOption[] = []

    @Prop({ default: 'mini', type: String })
    public size: UISize;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;


    public override connected(shadowRoot: ShadowRoot) {
        const inputDom = this.inputRef.shadowRoot?.querySelector('.wu-input input');
        inputDom.style.cursor =  this.disabled ? 'not-allowed' : 'pointer';
        inputDom.style.color =  this.disabled ? '' : '#606266';
        inputDom.style.backgroundColor =  this.disabled ? '' : 'white';

        window.addEventListener('click', (e) => {
            // admin 系统里 e.target.localName 直接输出 my-app 了
            // if (e.target.localName === 'wu-cascader') return
            if (this.popoverRef.isShow) {
                this.popoverRef.isShow = false;
                // this.popoverRef.update();
            }
        });
    }

    /**
     * 根据当前 value 获取 label 值
     * @param value
     */
    public getLabelsByValue(value: string[]): string {
        const labels: string[] = [];
        let curOptions = this.options;
        value.forEach((val) => {
            if (!curOptions) return;
            const curOption = curOptions.find((item) => item.value === val);
            if (curOption) {
                labels.push(curOption.label);
                curOptions = curOption.children;
            }
        });

        return labels.join(' / ');
    }

    @Emit('item-click')
    public itemClick(...args: any[]) {
        return {
            item: args[0][0],
            index: args[0][1],
            event: args[0][2],
            value: this.value
        };
    }

    public itemClickCallback = (item: any, index: number, evt: MouseEvent) => {
        this.itemClick(item, index, evt);
    }

    public override render(_renderProps = {}, _store = {}): any {
        const classes = [
            'wu-cascader',
            this.size ? 'wu-cascader-' + this.size : '',
            this.disabled ? 'disabled' : ''
        ].join(' ');

        /**
         * 展示右侧面板
         * @param options
         * @param index 层级
         */
        const showRightPanel = (options: CascaderOption[], index: number) => {
            if (!this.value || !this.value.length) return;
            const curOption = options.find(
                (item) => item.value === this.value[index]
            );
            return (
                curOption &&
                curOption.children && (
                    <div class="wu-cascader-dropdown-right_wrap">
                        <ul class="wu-cascader-dropdown_menu">
                            {curOption.children.map((option) =>
                                CascaderOptionItem(option, index + 1)
                            )}
                            {showRightPanel(curOption.children, index + 1)}
                        </ul>
                    </div>
                )
            );
        };

        const CascaderOptionItem = (item: CascaderOption, index: number) => {
            return (
                <li
                    class={[
                        'wu-cascader-dropdown_item',
                        this.value[index] === item.value ? 'selected' : '',
                        item.disabled ? 'disabled' : ''
                    ].join(' ')}
                    onClick={(evt) => {
                        if (item.disabled) return;
                        const temp = this.value.slice(0, index);
                        temp.push(item.value);
                        this.value = temp;
                        this.itemClickCallback(item, index, evt);
                    }}
                >
                    <span>{item.label}</span>
                    <span class="wu-cascader-dropdown_item-suffix">
                        {item.children && (
                            <svg width="24" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="40" height="40" fill="white" fill-opacity="0.01"/>
                                <path d="M19 12L31 24L19 36" stroke="#606266" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        )}
                    </span>
                </li>
            );
        };
        return (
            <div class={classes} onclick={(e) => e.stopPropagation()}>
                <wu-plus-popover
                    ref={(e) => (this.popoverRef = e)}
                    trigger="manual"
                    position="bottom"
                >
                    <wu-plus-input
                        class="wu-cascader-input"
                        ref={(e) => (this.inputRef = e)}
                        value={this.getLabelsByValue(this.value)}
                        suffix-icon="keyboard-arrow-down"
                        disabled
                        size={this.size}
                        onClick={(e) => {
                            if (this.disabled) return;
                            this.popoverRef.onEnter(e);
                        }}
                        style={{
                            cursor: this.disabled ? 'not-allowed' : 'pointer',
                            color: this.disabled ? '' : '#606266',
                            // border: 'transparent',
                            backgroundColor: this.disabled ? '' : 'white',
                            borderRadius: 5
                        }}
                        />

                    <div slot="popover" class="wu-cascader-dropdown_wrap">
                        <ul class="wu-cascader-dropdown_menu">
                            {this.options.map((item) => CascaderOptionItem(item, 0))}
                        </ul>
                        {showRightPanel(this.options, 0)}
                    </div>
                </wu-plus-popover>
            </div>
        );
    }
}
