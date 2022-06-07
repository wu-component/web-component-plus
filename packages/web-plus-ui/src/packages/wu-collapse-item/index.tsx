import { h, Component, WuComponent, State, Inject, Prop } from '@canyuegongzi/web-core-plus';
import css from './index.scss';
import { extractClass, generateId } from "@/common";
import { WuCollapse } from "@/packages/wu-collapse";

@Component({
    name: 'wu-plus-collapse-item',
    css: css,
})
export class WuCollapseItem extends WuComponent {
    constructor() {
        super();
    }

    @State({ default: '', type: String })
    public uId = generateId();

    @Inject('wuCollapseRef')
    public wuCollapseRef: WuCollapse

    @State({ default: { height: 'auto', display: 'block' }, type: Object })
    public contentWrapStyle: Record<string, string> = {
        height: 'auto',
        display: 'block'
    }

    @State({ default: 0, type: Number })
    public contentHeight: number

    @State({ default: false, type: Boolean })
    public focusing: boolean;

    @Prop({ default: false, type: Boolean })
    public isClick: boolean

    @Prop({ default: '', type: String })
    public name: string = this.uId;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean

    @Prop({ default: '', type: String })
    public tip: string

    get isActive() {
        return this.wuCollapseRef?.activeNames.indexOf(this.name) > -1 || false;
    }

    public handleFocus() {
        setTimeout(() => {
            if (!this.isClick) {
                this.focusing = true;
            } else {
                this.isClick = false;
            }
        }, 50);
    }

    public handleHeaderClick() {
        if (this.disabled) return;
        this.wuCollapseRef.handleItemClick(this);
        this.focusing = false;
        this.isClick = true;
    }

    public handleEnterClick() {
        this.wuCollapseRef.handleItemClick(this);
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div
                class="wu-collapse-item"
                {...extractClass({}, 'wu-collapse-item', {
                    'is-disabled': this.disabled,
                    'is-active': this.isActive,
                })}>
                <div
                    role="tab"
                    aria-expanded={this.isActive}
                    aria-controls={`wu-collapse-content-${this.uId}`}
                    aria-describedby={`wu-collapse-content-${this.uId}`}>
                    <div
                        class="wu-collapse-item_header"
                        onClick={this.handleHeaderClick.bind(this)}
                        role="button"
                        id={`wu-collapse-head-${this.uId}`}
                        tabindex={this.disabled ? undefined : 0}
                        {...extractClass({}, 'wu-collapse-item_header', {
                            'focusing': this.focusing,
                            'is-active': this.isActive,
                        })}
                        onFocus={this.handleFocus.bind(this)}
                        onBlur={() => this.focusing = false}>
                        {this.tip ? this.tip : <slot name="title"/>}
                        <i {...extractClass({}, 'wu-collapse-item_arrow', { 'is-active': this.isActive })}>
                            <svg width="24" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="40" height="40" fill="white" fill-opacity="0.01"/>
                                <path d="M19 12L31 24L19 36" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </i>
                    </div>
                </div>
                {
                    this.isActive? (
                        <div
                            class="wu-collapse-item_wrap"
                            role="tabpanel"
                            aria-hidden={!this.isActive}
                            aria-labelledby={`wu-collapse-head-${this.uId}`}
                            id={`wu-collapse-content-${this.uId}`}>
                            <div class="wu-collapse-item_content">
                                <slot />
                            </div>
                        </div>
                    ): null
                }
            </div>
        );
    }
}
