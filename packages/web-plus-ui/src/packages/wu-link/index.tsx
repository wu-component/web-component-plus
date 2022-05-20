import { h, Component, Prop, Emit, OnConnected, OnBeforeRender } from "@canyuegongzi/web-core-plus";
import css from './index.scss';
import { extractClass } from "../../common";
import { getAttrMap } from "../../common";

type WuLinkType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
@Component({
    name: 'wu-plus-link',
    css: css
})
export class WuLink extends HTMLElement implements OnConnected, OnBeforeRender {
    constructor() {
        super();
    }

    public beforeRender() {
        this.eleAttrsMap = getAttrMap(this.shadowRoot.host);
    }

    private eleAttrsMap: Record<string, any> = {};

    public connected(shadowRoot: ShadowRoot) {
        this.eleAttrsMap = getAttrMap(shadowRoot.host);
    }

    @Prop({ default: 'primary', type: String })
    public type: WuLinkType;

    @Prop({ default: '', type: String })
    public name: string;

    @Prop({ default: false, type: Boolean })
    public underline: boolean;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Prop({ default: null, type: String })
    public href: string;

    @Emit('click')
    public handleClick(e: Event) {
        return e;
    }

    public render(_renderProps= {}, _store = {}) {
        return (
            <a
                {...extractClass({}, 'wu-link', {
                    ['wu-link-' + this.type]: this.type,
                    'is-disabled': this.disabled,
                    'is-underline': !this.disabled && this.underline
                })}
                {
                    ...this.eleAttrsMap
                }
                href={this.disabled? null: this.href}
                onClick={this.handleClick.bind(this)}
            >
                    <slot name="prefix" />
                    <slot />
                    <slot name="suffix" />
            </a>
        );
    }
}
