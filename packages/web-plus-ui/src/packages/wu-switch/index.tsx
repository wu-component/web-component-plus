import {h, Component, Prop, Watch, OnConnected, Emit} from "@canyuegongzi/web-core-plus";
import css from './index.scss';
import {extractClass} from "../../common";
@Component({
    name: 'wu-plus-switch',
    css: css
})
export class WuSwitch extends HTMLElement implements OnConnected {
    constructor() {
        super();
    }

    public inputRef: HTMLInputElement;

    public coreRef: HTMLElement;

    public connected(shadowRoot: ShadowRoot) {
        this.inputRef = shadowRoot.querySelector('.wu-switch_input');
        this.coreRef = shadowRoot.querySelector('.wu-switch_core');
        this.width = this.width || 40;
        this.inputRef.checked = this.checked();
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

    public checked = () => {
        return this.value === this.activeValue;
    }

    @Watch('checked')
    public checkedChange(val: any, oldVal: any) {}

    public handleChange() {
        this.value = this.checked() ? this.inactiveValue : this.activeValue;
        this.changeEmit();
        this.inputEmit();
        setTimeout(() => {
            this.inputRef.checked = this.checked()
        }, 0)
    }

    public switchValue() {
        !this.disabled && this.handleChange();
    }

    @Emit('input')
    public inputEmit() {
        return this.checked();
    }

    @Emit('change')
    public changeEmit() {
        return this.checked();
    }

    public render(_renderProps= {}, _store = {}) {
        return (
            <div
                {...extractClass({}, 'wu-switch', {
                    'is-disabled': this.disabled,
                    'is-checked': this.checked(),
                })}
                role="switch"
                aria-checked={this.checked()}
                aria-disabled={this.disabled}
                onClick={this.switchValue.bind(this)}
            >
                <input
                    class="wu-switch_input"
                    type="checkbox"
                    onChange={this.handleChange.bind(this)}
                    id={this.id}
                    name={this.name}
                    true-value={this.activeValue}
                    false-value={this.inactiveValue}
                    disabled={this.disabled}
                    onkeydown={this.switchValue.bind(this)}
            />
                <span class="wu-switch_core" style={{
                    width: this.width + 'px',
                    borderColor: this.checked() ? this.activeColor : this.inactiveColor,
                    backgroundColor: this.checked() ? this.activeColor : this.inactiveColor,
                }} />
                <span></span>
            </div>
        );
    }
}
