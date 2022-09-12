import { Component, h, Prop, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import { extractClass } from '@wu-component/common';


type Direction = 'vertical' | 'horizontal'
type ProcessStatus = 'wait' | 'process' | 'finish' | 'error' | 'success'
type FinishStatus = 'wait' | 'process' | 'finish' | 'error' | 'success'
@Component({
    name: 'wu-plus-steps',
    css: css,
})
export class WuSteps extends WuComponent {
    constructor() {
        super();
    }

    @Prop({ default: '', type: String })
    public space: string;

    @Prop({ default: 'horizontal', type: String })
    public direction: Direction = 'horizontal';

    @Prop({ default: 0, type: Number })
    public active = 0;

    @Prop({ default: 'process', type: String })
    public processStatus: ProcessStatus = 'process';

    @Prop({ default: 'finish', type: String })
    public finishStatus: FinishStatus = 'finish';

    @Prop({ default: false, type: Boolean })
    public alignCenter = false;

    @Prop({ default: false, type: Boolean })
    public simple = false;

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div
                {...extractClass({}, 'wu-steps', {
                    ['wu-steps-' + this.direction]: !this.simple,
                    'wu-steps-simple': this.simple
                })}
            >
                <slot></slot>
            </div>
        );
    }
}
