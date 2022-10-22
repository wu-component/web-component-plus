import { Component, h, Prop, Provide, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import { extractClass } from '@wu-component/common';
import "./step/index.tsx";


type Direction = 'vertical' | 'horizontal'
type ProcessStatus = 'wait' | 'process' | 'finish' | 'error' | 'success'
type FinishStatus = 'wait' | 'process' | 'finish' | 'error' | 'success'

interface StepItem {
    title: string;
    description: string;
    status: ProcessStatus;
    icon: any;
}
@Component({
    name: 'wu-plus-steps',
    css: css,
})
export class WuSteps extends WuComponent {
    constructor() {
        super();
    }
    public ss = 1;

    @Prop({ default: [], type: Array })
    public data: StepItem[];

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

    @Provide('wuStepsRef')
    public provideSteps() {
        return this;
    }

    public stepOffset = 0;

    get steps() {
        const stepsChildren = this.childNodes;
        return Array.from(stepsChildren).filter(it => {
            return it.nodeName === "WU-PLUS-STEP";
        });
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div
            >
                <slot {...extractClass({}, 'wu-steps', {
                    ['wu-steps-' + this.direction]: !this.simple,
                    'wu-steps-simple': this.simple
                })}></slot>
            </div>
        );
    }
}
