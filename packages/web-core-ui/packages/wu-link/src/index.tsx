import { h, Component, Prop, Emit, OnConnected, WuComponent, OnBeforeRender } from '@wu-component/web-core-plus';
import css from './index.scss';
import { extractClass } from '@wu-component/common';
import { getAttrMap } from '@wu-component/common';

type WuLinkType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
@Component({
    name: 'wu-plus-link',
    css: css,
})
export class WuLink extends WuComponent implements OnConnected, OnBeforeRender {
    constructor() {
        super();
    }

    public override beforeRender() {
        this.eleAttrsMap = getAttrMap(this.shadowRoot.host);
    }

    private eleAttrsMap: Record<string, any> = {};

    public override connected(shadowRoot: ShadowRoot) {
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

    public override render(_renderProps = {}, _store = {}) {
        return (
            <a
                {...extractClass({}, 'wu-link', {
                    ['wu-link-' + this.type]: this.type,
                    'is-disabled': this.disabled,
                    'is-underline': !this.disabled && this.underline,
                })}
                {...this.eleAttrsMap}
                href={this.disabled ? null : this.href}
                onClick={this.handleClick.bind(this)}
            >
                <slot name="prefix" />
                <slot />
                <slot name="suffix" />
            </a>
        );
    }
}
