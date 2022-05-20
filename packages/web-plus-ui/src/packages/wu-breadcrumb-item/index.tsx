import { Component, Emit, h, Prop } from '@canyuegongzi/web-core-plus';
import css from './index.scss';
import { UISize } from '@/interface';
import { extractClass } from '@/common';
type EffectEnums = 'dark' | 'light' | 'plain';
type TypeEnums = 'success' | 'info' | 'warning' | 'danger';

@Component({
    name: 'wu-plus-breadcrumb-item',
    css: css,
})
export class WuBreadcrumbItem extends HTMLElement {
    constructor() {
        super();
    }

    @Prop({ default: '', type: String })
    public text: string;

    @Prop({ default: '', type: String })
    public color: string;

    @Prop({ default: false, type: Boolean })
    public closable: boolean;

    @Prop({ default: '', type: String })
    public type: TypeEnums;

    @Prop({ default: false, type: Boolean })
    public hit: boolean;

    @Prop({ default: false, type: Boolean })
    public disableTransitions: boolean;

    @Prop({ default: '', type: String })
    public size: UISize;

    @Prop({ default: 'light', type: String })
    public effect: EffectEnums;

    @Emit('close')
    public handleClose(event: Event) {
        event = Array.isArray(event) && event.length ? event[0] : event;
        event.stopPropagation();
        return {
            event,
        };
    }

    @Emit('click')
    public handleClick(event) {
        event = Array.isArray(event) && event.length ? event[0] : event;
        return {
            event,
        };
    }

    public render(_renderProps = {}, _store = {}) {
        return (
            <span
                {...extractClass({}, 'wu-tag', {
                    ['wu-tag-' + this.type]: this.type,
                    ['wu-tag-' + this.size]: this.size,
                    ['wu-tag-' + this.effect]: this.effect,
                    'is-hit': this.hit,
                })}
            >
                <slot />
                {this.closable ? (
                    <svg onClick={this.handleClose.bind(this)} class="wu-tag_close wu-icon-close" fill="currentColor" width="1em" height="1em" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                ) : null}
            </span>
        );
    }
}
