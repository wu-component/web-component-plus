import { h, Component, Prop, Provide } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-timeline',
    css: css,
})
export class WuTimeLine extends HTMLElement {
    constructor() {
        super();
    }

    @Prop({ default: false, type: Boolean })
    public reverse: boolean;

    @Provide('timelineRef')
    public timelineRef() {
        return this;
    }

    public render(_renderProps = {}, _store = {}) {
        const reverse = this.reverse;
        return (
            <ul class={`wu-timeline ${reverse ? reverse : 'is-reverse'}`}>
                <slot />
            </ul>
        );
    }
}
