import { Component, Emit, h, OnBeforeRender, OnConnected, OnBeforeUpdate, Prop } from "@canyuegongzi/web-core-plus";
import css from './index.scss';
import { UISize } from "@/interface";
import { extractClass } from "@/common";

@Component({
    name: 'wu-checkbox',
    css: css
})
export class WuCheckbox extends HTMLElement implements OnConnected, OnBeforeRender, OnBeforeUpdate {
    constructor() {
        super();
    }

    public beforeUpdate() {
    }

    public beforeRender() {
    }

    public connected(shadowRoot: ShadowRoot) {
        if (this.indeterminate) {
            this.setAttribute('aria-controls', this.controls);
        }
        if (this.parentNode?.nodeName === "WU-CHECKBOX-GROUP") {
            this.init()
        }

    }

    /**
     * 同步数据
     */
    public init() {
        const attrDisabled = (this.parentNode as any).getAttribute("disabled");
        const attrValue = (this.parentNode as any).getAttribute("value").replace(/'/g, '"');
        this.disabled = attrDisabled === 'true' || attrDisabled === true;
        if (Array.isArray(attrValue) && attrValue.includes(this.label)) {
            this.checked = true;
        }
    }

    // @ts-ignore
    public focus = false;

    @Prop({ default: 'mini', type: String })
    public size: UISize;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Prop({ default: '' })
    public value: boolean;

    @Prop({ default: '' })
    public label: string;

    @Prop({ default: false, type: Boolean })
    public indeterminate: boolean;

    @Prop({ default: false, type: Boolean })
    public checked: boolean;

    @Prop({ default: false, type: Boolean })
    public border: boolean;

    @Prop({ default: '', type: String })
    public name: string;

    // 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系
    // @ts-ignore
    @Prop({ default: '', type: String }) public id: string;

    // 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系
    @Prop({ default: '', type: String }) public controls: string;


    public handleChange(ev: any) {
        this.checked = !this.checked;
        this.change();
    }

    @Emit('change')
    private change() {
        return {
            value: this.checked,
            name: this.name,
            label: this.label
        };
    }

    public onFocus() {
        this.focus = true;
    }

    public onBlur() {
        this.focus = false;
    }

    public render(_renderProps= {}, _store = {}) {
        return (
            <label
                {...extractClass({ }, 'wu-checkbox', {
                    ['wu-checkbox-' + this.size]: this.size && this.border,
                    'is-disabled': this.disabled,
                    'is-border': this.border,
                    'is-checked': this.checked
                })}
                id={this.id}>
                <span class="wu-checkbox_input"
                    {...extractClass({ }, 'wu-checkbox_input', {
                        'is-disabled': this.disabled,
                        'is-border': this.border,
                        'is-checked': this.checked,
                        'is-indeterminate': this.indeterminate,
                        'is-focus': this.focus,
                    })}
                    tabindex={this.indeterminate ? 0 : false}
                    role={this.indeterminate ? 'checkbox' : false}
                    aria-checked={this.indeterminate ? 'mixed' : false}>
                    <span class="wu-checkbox_inner"> </span>
                    <input
                        class="wu-checkbox_original"
                        type="checkbox"
                        aria-hidden={this.indeterminate ? 'true' : 'false'}
                        disabled={this.disabled}
                        value={this.label}
                        name={this.name}
                        onChange={this.handleChange.bind(this)}
                        onFocus={this.onFocus.bind(this)}
                        onBlur={this.onBlur.bind(this)}
                    />
                </span>
                <span class="wu-checkbox_label">
                    {this.label? this.label: null}
                    <slot />
                </span>
            </label>
        );
    }
}
