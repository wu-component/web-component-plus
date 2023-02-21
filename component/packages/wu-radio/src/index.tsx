import { h, Component, Prop, Emit, OnConnected, Inject, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
type UISize = 'medium' | 'small' | 'mini';
import { extractClass, extract, debounce } from '@wu-component/common';

@Component({
    name: 'wu-plus-radio',
    css: css,
})
export class WuRadio extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    @Inject('wuFormRef')
    public wuForm;

    @Inject('wuFormItemRef')
    public wuFormItem;

    @Prop({ default: 'mini', type: String })
    public size: UISize;

    @Prop({ default: '', type: String })
    public label: string;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Prop({ default: false, type: Boolean })
    public checked: boolean;

    @Prop({ default: '', type: String })
    public value: string;

    @Prop({ default: '', type: String })
    public name: string;

    @Prop({ default: false, type: Boolean })
    public border: string;

    private clickHandler() {
        if (this.disabled) return;
        this.checked = !this.checked;
        this.change();
    }

    @Emit('change')
    private change() {
        return {
            checked: this.checked,
            value: this.value,
        };
    }

    @Emit('mounted')
    private mounted() {
        return {
            checked: this.checked,
            value: this.value,
        };
    }

    public override connected(shadowRoot: ShadowRoot) {
        this.mounted();
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <label
                role="radio"
                // @ts-ignore
                tabindex="0"
                onclick={debounce(this.clickHandler.bind(this), 0)}
                {...extractClass({}, 'wu-radio', {
                    ['wu-radio-' + this.size]: this.size,
                    'is-disabled': this.disabled,
                    'is-border': this.border,
                    'is-checked': this.checked,
                })}
                aria-checked={this.checked}
            >
                <span
                    {...extractClass({}, 'wu-radio_input', {
                        'is-disabled': this.disabled,
                        'is-checked': this.checked,
                    })}
                >
                    <span class="wu-radio_inner" />
                    {/*@ts-ignore*/}
                    <input type="radio" aria-hidden="true" {...extract({}, [ 'checked', 'value', 'disabled' ])} tabindex="-1" class="wu-radio_original" />
                </span>
                <span class="wu-radio_label">
                    {this.label}
                    <slot />
                </span>
            </label>
        );
    }
}
