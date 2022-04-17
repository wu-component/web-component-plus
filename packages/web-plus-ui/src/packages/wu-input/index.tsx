import { h, Component, Prop, OnInstall, Emit } from "@canyuegongzi/web-core-plus";
import css from './index.scss';
import { UISize } from "@/interface";
import { extractClass } from "@/common";

type TypeEnums = 'textarea' | 'input';

@Component({
    name: 'wu-plus-input',
    css: css,
})
export class WuInput extends HTMLElement implements OnInstall{

    @Prop({ default: 'mini', type: String })
    public size: UISize;

    @Prop({ default: '', type: String })
    public value: string;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Prop({ default: 'input', type: String })
    public type: TypeEnums;

    @Prop({ default: '', type: String })
    public placeholder: string;

    @Prop({ default: false, type: Boolean })
    public clearable: boolean;

    @Prop({ default: '', type: String })
    public suffixIcon: string;

    @Prop({ default: '', type: String })
    public prefixIcon: string;

    @Prop({ default: 0, type: Number })
    public maxLength: number;

    @Prop({ default: 0, type: Number })
    public minLength: number;

    @Prop({ default: false, type: Boolean })
    public autoComplete: boolean;

    @Prop({ default: false, type: Boolean })
    public block: boolean;

    @Prop({ default: '', type: String })
    public name: string;

    @Prop({ default: '', type: String })
    public form: string;

    @Prop({ default: 1, type: Number })
    public rows: number;

    @Prop()
    public onBlur: Function;

    @Prop()
    public onFocus: Function;

    @Prop()
    public onInput: Function;

    @Prop()
    public onChange: Function;

    @Prop()
    public onMouseEnter: Function;

    @Prop()
    public onMouseLeave: Function;

    public $value: string | undefined;

    public tempTagName = '';

    public tempInputTagName = '';

    public valueLength = 0;

    /**
     * 处理数据
     */
    public install() {
        this.tempInputTagName = this.type === 'textarea' ? 'textarea' : 'input';
        this.$value = this.value;
    }

    /**
     * 渲染前
     */
    public beforeInstall() {}

    constructor() {
        super();
    }

    /**
     * 输入框失去焦点
     * @param e
     */
    @Emit('blur')
    public handleBlur(e){
        const evt = Array.isArray(e) && e.length? e[0]: e;
        if (this.onBlur) {
            return this.onBlur(evt, this.value);
        }
        return this.value;
    }

    /**
     * 输入框聚焦
     * @param e
     */
    @Emit('focus')
    public handleFocus(e) {
        const evt = Array.isArray(e) && e.length? e[0]: e;
        if (this.onFocus) {
            return this.onFocus(evt, this.value);
        }
        return this.value;
    }

    /**
     * 输入框输入值修改
     * @param e
     */
    @Emit('change')
    public handleChange(e){
        if (this.disabled) {
            return;
        }
        const evt = Array.isArray(e) && e.length? e[0]: e;
        this.$value = evt.target.value;
        this.value = evt.target.value;

        if (this.onChange) {
            return this.onChange(evt. this.value);
        }
        return this.value;
    }

    /**
     * 输入框输入事件
     * @param e
     */
    @Emit('input')
    public handleInput(e) {
        if (this.disabled) {
            return;
        }
        const evt = Array.isArray(e) && e.length? e[0]: e;
        evt.stopPropagation();
        this.$value = evt.target.value;
        let value = evt.target.value;

        if (this.maxLength) {
            this.valueLength = evt.target.value.length;
            if (this.valueLength > this.maxLength) {
                value = value.splice(0, this.maxLength - 1);
            }
        }
        this.value = value;
        if (this.onInput) {
            return this.onInput(evt, this.value);
        }
        return this.value;
    }

    /**
     * 聚焦
     */
    // @ts-ignore
    public focus() {
        this.shadowRoot.querySelector('input').focus();
    }

    /**
     * 失去焦点
     */
    // @ts-ignore
    public blur() {
        this.shadowRoot.querySelector('input').blur();
    }

    /**
     * 清除
     */
    public clearInput() {
        this.value = '';
        this.$value = '';
    }

    public render() {
        this.tempTagName = 'wu-icon-' + (this.suffixIcon || this.prefixIcon);
        this.tempInputTagName = this.type === 'textarea' ? 'textarea' : 'input';
        return (
            <div {
                     ...extractClass({}, `wu-${this.tempInputTagName}`,
                         {
                             [`wu-${this.tempInputTagName}-${this.size}`]: this.size,
                             'is-disabled': this.disabled,
                             'wu-input-suffix':this.suffixIcon,
                             'wu-input-prefix':this.prefixIcon,
                             'is-block': this.block
                         }
                     )
                 } onMouseEnter={this.onMouseEnter?.bind(this)} onMouseLeave={this?.onMouseLeave?.bind(this)}>


                {
                    (this.prefixIcon || this.suffixIcon) && <this.tempTagName css={`svg{width: 1em }`}
                                                                    {
                                                                        ...extractClass({}, 'o-input_icon',
                                                                            {
                                                                                'is-prefix': this.prefixIcon,
                                                                                'is-suffix': this.suffixIcon
                                                                            }
                                                                        )
                                                                    }
                    />
                }

                <this.tempInputTagName  type={this.type}
                                        name={this.name}
                                        disabled={this.disabled}
                                        form={this.form}
                                        value={this.value}
                                        rows={this.rows}
                                        className={`wu-${this.tempInputTagName}_inner`}
                                        autocomplete={this.autoComplete}
                                        maxLength={this.maxLength}
                                        block={this.block}
                                        onchange={this.handleChange.bind(this)}
                                        onfocus={this.handleFocus.bind(this)}
                                        onblur={this.handleBlur.bind(this)}
                                        oninput={this.handleInput.bind(this)}
                />
                {
                    (this.clearable && !this.disabled) &&
                    <div class="wu-input_suffix">
                        <svg onClick={this.clearInput.bind(this)} class="wu-input_clear" fill="currentColor" width="1em" height="1em"
                             focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </div>
                }
                {
                    this.maxLength && this.type === 'textarea'  && <div class="wu-input_count">
                        <span class="wu-input_count-inner">
                            {this.valueLength}/{this.maxLength}
                        </span>
                    </div>
                }
                {
                    this.maxLength && this.type === 'input'  && (
                        <div class="wu-input_suffix">
                            <div class="wu-input_count">
                                <span class="wu-input_count-inner">
                                    {this.valueLength}/{this.maxLength}
                                </span>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }

}

