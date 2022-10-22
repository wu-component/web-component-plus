import { Component, Emit, h, Inject, OnBeforeRender, OnConnected, OnInstall, Prop, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-rate',
    css: css,
})
export class WuRate extends WuComponent implements OnConnected, OnBeforeRender, OnInstall {
    constructor() {
        super();
    }

    public override beforeInstall(): any {}

    public override beforeRender() {}

    public checkoutProps() {
        if (this.max !== this.rateList.length) {
            console.warn(`web-plus-ui::max:${this.max} !== rateList.length:${this.rateList.length}`);
        }
        if ((this.showText || this.showScore) && this.max !== this.texts.length) {
            console.warn(`web-plus-ui::max:${this.max} !== texts.length:${this.texts.length}`);
        }
    }

    public override connected(shadowRoot: ShadowRoot) {
        this.checkoutProps();
        const list = [];
        const max = this.max;
        for (let i = 0; i < max; i++) {
            list.push(i + 1);
        }
        this.valueList = list;
        this.update();
    }

    public pointerAtLeftHalf = true;

    public currentValue = -1;

    public hoverIndex = -1;

    public valueList = [ 1, 2, 3, 4, 5 ];

    public allowUpdate = false;

    public timeout = null;

    @Inject('wuFormRef')
    public wuForm;

    @Inject('wuFormItemRef')
    public wuFormItem;

    @Prop({ default: -1, type: Number })
    public value: number;

    @Prop({ default: 2, type: Number })
    public lowThreshold: number;

    @Prop({ default: 4, type: Number })
    public highThreshold: number;

    @Prop({ default: 5, type: Number })
    public max: number;

    @Prop({ default: [ '#F7BA2A', '#F7BA2A', '#F7BA2A', '#F7BA2A', '#F7BA2A' ], type: Array })
    public colors: string[];

    @Prop({ default: '#C6D1DE', type: String })
    public voidColor: number;

    @Prop({ default: '#EFF2F7', type: String })
    public disabledVoidColor: number;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Prop({ default: false, type: Boolean })
    public allowHalf: boolean;

    @Prop({ default: false, type: Boolean })
    public showText: boolean;

    @Prop({ default: false, type: Boolean })
    public showScore: boolean;

    @Prop({ default: '#1f2d3d', type: String })
    public textColor: boolean;

    @Prop({ default: [ '极差', '失望', '一般', '满意', '惊喜' ], type: Array })
    public texts: string[];

    @Prop({ default: [ '★', '★', '★', '★', '★' ], type: Array })
    public rateList: string[];

    get text() {
        return this.texts[this.value] || null;
    }

    get rateDisabled() {
        return this.disabled || (this.wuForm || {}).disabled;
    }

    public getIconStyle(index: number) {
        const voidColor = this.rateDisabled ? this.disabledVoidColor : this.voidColor;
        return {
            color: index <= this.value ? this.colors[index] : voidColor,
        };
    }

    /**
     * 获取图标渲染
     * @param index
     */
    public getRateRender(index: number) {
        return this.rateList[index] || null;
    }

    /**
     * 设置值
     * @param item
     * @param event
     */
    public setCurrentValue(item: number, event: MouseEvent) {
        if (this.rateDisabled) {
            return;
        }
        const target: HTMLElement = event.target as HTMLElement;
        const value = Number(target.dataset['rate']);
        if (this.allowHalf) {
            this.pointerAtLeftHalf = event.offsetX * 2 <= target.clientWidth;
            this.value = this.pointerAtLeftHalf ? value - 0.5 : value;
        }
        this.setRateValue(value);
        this.currentValue = value;
        this.hoverIndex = value;
    }

    /**
     * 重置
     */
    public resetCurrentValue() {
        if (this.rateDisabled) {
            return;
        }
        if (this.allowHalf) {
            this.pointerAtLeftHalf = this.value !== Math.floor(this.value);
        }
        this.currentValue = this.value;
        this.hoverIndex = -1;
    }

    @Emit('input')
    public input(value: number) {
        return {
            value: this.value,
        };
    }
    @Emit('change')
    public change(value: number) {
        return {
            value: this.value,
        };
    }

    /**
     * 选择
     * @param item
     * @param event
     */
    public selectValue(item: number, event: Event) {
        if (this.rateDisabled) {
            return;
        }
        if (this.allowHalf && this.pointerAtLeftHalf) {
            this.input(this.currentValue);
            this.change(this.currentValue);
        } else {
            this.input(this.value);
            this.change(this.value);
        }
    }

    /**
     * 设置值
     * @param value
     */
    public setRateValue(value: number) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            this.value = value;
        }, 100);
    }

    /**
     * 键盘操作
     * @param e
     */
    public handleKey(e: MouseEvent) {
        if (this.rateDisabled) {
            return;
        }
        let currentValue = this.currentValue;
        const keyCode = (e as any).keyCode;
        if (keyCode === 38 || keyCode === 39) {
            // left / down
            if (this.allowHalf) {
                currentValue += 0.5;
            } else {
                currentValue += 1;
            }
            e.stopPropagation();
            e.preventDefault();
        } else if (keyCode === 37 || keyCode === 40) {
            if (this.allowHalf) {
                currentValue -= 0.5;
            } else {
                currentValue -= 1;
            }
            e.stopPropagation();
            e.preventDefault();
        }
        currentValue = currentValue < 0 ? 0 : currentValue;
        currentValue = currentValue > this.max ? this.max : currentValue;
        this.input(currentValue);
        this.change(currentValue);
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="wu-rate" onKeydown={event => this.handleKey(event)} role="slider" aria-valuenow={this.currentValue} aria-valuetext={this.text} aria-valuemin="0" aria-valuemax={this.max} tabindex="0" id="rate">
                {this?.valueList?.map((itemValue, item) => {
                    return (
                        <span data-rate={item} class="wu-rate_item" onMousemove={event => this.setCurrentValue(item, event)} onMouseleave={event => this.resetCurrentValue()} onClick={event => this.selectValue(item, event)} style={{ cursor: this.rateDisabled ? 'auto' : 'pointer' }} key={item}>
                            <i data-rate={item} class={`wu-rate_icon ${this.hoverIndex === item ? 'hover' : ''}`} style={this.getIconStyle(item)}>
                                {/*直接传入html集合*/}
                                {this.getRateRender(item)}
                            </i>
                        </span>
                    );
                })}
                {this.showText || this.showScore ? (
                    <span class="wu-rate_text" style={{ color: this.textColor }}>
                        {this.text}
                    </span>
                ) : null}
            </div>
        );
    }
}
