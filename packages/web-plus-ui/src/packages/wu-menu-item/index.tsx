import { h, Component, Prop, OnConnected, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './index.scss';
type ShadowEnums = 'always' | 'hover' | 'never';

@Component({
    name: 'wu-plus-menu-item',
    css: css,
})
export class WuMenuItem extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    public override connected(shadowRoot: ShadowRoot) {}

    @Prop({ default: '' })
    public header: string;

    @Prop({ default: { padding: '20px' } })
    public bodyStyle: Record<any, any>;

    @Prop({ default: 'always', type: String })
    public shadow: ShadowEnums;

    @Prop({ default: true, type: Boolean })
    public headerShow: boolean;


    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class={this.shadow ? 'is-' + this.shadow + '-shadow wu-card' : 'is-always-shadow wu-card'}>
                {this.headerShow ? (
                    <div class="wu-card_header">
                        <slot name="header" id="slotHeader">{this.header || ''}</slot>
                    </div>) : null
                }
                <div class="wu-card_body" style={this.bodyStyle}>
                    <slot />
                </div>
            </div>
        );
    }
}
