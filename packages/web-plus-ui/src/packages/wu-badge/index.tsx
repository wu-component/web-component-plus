import { h, Component, Prop, OnConnected, Emit, OnBeforeUpdate } from '@canyuegongzi/web-core-plus';
import css from './index.scss';
import { extractClass } from "@/common";

type TypeEnums = 'primary' | 'success' | 'warning' | 'info' | 'danger'

@Component({
    name: 'wu-plus-badge',
    css: css,
})
export class WuBadge extends HTMLElement implements OnConnected, OnBeforeUpdate {
    constructor() {
        super();
    }

    public beforeUpdate() {
        this.initIsFixed();
    }

    public connected(shadowRoot: ShadowRoot) {
        this.initIsFixed();
    }

    private initIsFixed() {
        const slotDom: any = this.shadowRoot.getElementById('defaultSlot');
        this.isFixed = !!slotDom.assignedNodes().length;
        (this as any).update();
    }

    @Prop({ default: '' })
    public value: string;

    @Prop({ default: 100, type: Number })
    public max: number;

    @Prop({ default: false, type: Boolean })
    public dot: boolean;

    @Prop({ default: false, type: Boolean })
    public hide: boolean;

    @Prop({ default: 'info', type: String })
    public type: TypeEnums;

    @Prop({ default: false, type: Boolean })
    public isFixed = false;

    get content(): any {
        if (this.dot) {
            return null;
        }
        const value = this.value;
        const max = this.max;

        if (typeof value === 'number' && typeof max === 'number') {
            return max < value ? `${max}+` : value;
        }
        return value;
    }

    @Emit("error")
    public handleError(event: Event) {
        event = Array.isArray(event) && event.length ? event[0] : event;
        event.stopPropagation();
        return event;
    }

    public render(_renderProps = {}, _store = {}) {
        return (
            <div class="wu-badge">
                <slot id="defaultSlot"/>
                {
                    !this.hide && (this.content || this.content === 0 || this.dot) ? (
                        <sup
                            {...extractClass({}, '', {
                                    ['wu-badge_content-' + this.type]: this.type,
                                    'is-fixed': this.isFixed,
                                    'is-dot': this.dot,
                                    'wu-badge_content': true
                                }
                            )}>
                            {this.content}
                        </sup>
                    ) : null
                }
            </div>
        );
    }
}
