import { h, Component, Prop, Watch, OnConnected, Emit, Inject, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import { extractClass } from '@wu-component/common';
@Component({
    name: 'wu-plus-switch',
    css: css,
})
export class WuSwitch extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    @Inject('wuFormRef')
    public wuForm;

    @Inject('wuFormItemRef')
    public wuFormItem;

    public inputRef: HTMLInputElement;

    public coreRef: HTMLElement;

    public override connected(shadowRoot: ShadowRoot) {
        this.inputRef = shadowRoot.querySelector('.wu-switch_input');
        this.coreRef = shadowRoot.querySelector('.wu-switch_core');
        this.width = this.width || 40;
        this.inputRef.checked = this.value.toString() === this.activeValue.toString();
    }

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Prop({ default: false, type: Boolean })
    public value: boolean;

    @Prop({ default: true })
    public activeValue: boolean;

    @Prop({ default: '#409EFF', type: String })
    public activeColor: string;

    @Prop({ default: '#C0CCDA', type: String })
    public inactiveColor: string;

    @Prop({ default: '', type: String })
    public name: string;

    @Prop({ default: false })
    public inactiveValue: boolean;

    @Prop({ default: 40, type: Number })
    public width: number;

    @Prop({ default: true, type: Boolean })
    public validateEvent: boolean;

    @Watch('checked', { immediate: true })
    public checkedChange(val: any, oldVal: any) {}

    public handleChange() {
        // @ts-ignore
        this.value = this.value.toString() === this.activeValue.toString() ? this.inactiveValue :this.activeValue;
        this.changeEmit();
        this.inputEmit();
        setTimeout(() => {
            this.inputRef.checked = this.value.toString() === this.activeValue.toString();
        }, 0);
    }

    public switchValue() {
        !this.disabled && this.handleChange();
    }

    @Emit('input')
    public inputEmit() {
        return { value: this.value.toString() === this.activeValue.toString() };
    }

    @Emit('change')
    public changeEmit() {
        return { value: this.value.toString() === this.activeValue.toString() };
    }

    public override render(_renderProps = {}, _store = {}) {
        const checked = this.value.toString() === this.activeValue.toString();
        return (
            <div
                {...extractClass({}, 'wu-switch', {
                    'is-disabled': this.disabled,
                    'is-checked': checked,
                })}
                role="switch"
                aria-checked={checked}
                aria-disabled={this.disabled}
                onClick={this.switchValue.bind(this)}
            >
                {/*@ts-ignore*/}
                <input class="wu-switch_input" type="checkbox" onChange={this.handleChange.bind(this)} id={this.id} name={this.name} true-value={this.activeValue} false-value={this.inactiveValue} disabled={this.disabled} onkeydown={this.switchValue.bind(this)} />
                <span
                    class="wu-switch_core"
                    style={{
                        width: this.width + 'px',
                        borderColor: checked ? this.activeColor : this.inactiveColor,
                        backgroundColor: checked ? this.activeColor : this.inactiveColor,
                    }}
                />
                <span></span>
            </div>
        );
    }
}
