import { Component, h, Inject, OnConnected, Prop, State, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import { extractClass } from '@wu-component/common';
interface WuSteps {
    [key:string]: any
}

type ProcessStatus = 'wait' | 'process' | 'finish' | 'error' | 'success'
@Component({
    name: 'wu-plus-step',
    css: css,
})
export class WuStep extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    public override connected(shadowRoot: ShadowRoot){
        console.log(this.$parent);
        console.log([ this ][0].shadowRoot);
        console.log(this.updateComponent());
        this.update();
    }

    @Prop({ default: '', type: String })
    public tip: string;

    @Prop({ default: '', type: String })
    public icon: string

    @Prop({ default: '', type: String })
    public description: string

    @Prop({ default: '', type: String })
    public status: ProcessStatus

    @State({ default: -1, type: Number })
    public index = -1;

    public lineStyle = {};

    public internalStatus = '';

    @Inject('wuStepsRef')
    public $parent: WuSteps

    get currentStatus() {
        return this.status || this.internalStatus;
    }
    get prevStatus() {
        const prevStep: WuStep = this.$parent?.steps[this.index - 1] as WuStep;
        return prevStep ? prevStep.currentStatus : 'wait';
    }
    get isCenter() {
        return this.$parent?.alignCenter;
    }
    get isVertical() {
        return this.$parent?.direction === 'vertical';
    }
    get isSimple() {
        return this.$parent?.simple;
    }
    get isLast() {
        const parent = this.$parent;
        return parent?.steps[parent.steps.length - 1] === this;
    }
    get stepsCount() {
        return this.$parent?.steps.length;
    }
    get space() {
        const { isSimple, $parent } = this;
        return isSimple ? '' : ($parent?.space || '') ;
    }

    get currentStyle() {
        const style:Record<string, any> = {};
        const parent = this.$parent;
        const len = parent?.steps.length;

        style.flexBasis = (typeof this.space === 'number'
            ? this.space + 'px'
            : this.space
                ? this.space
                : 100 / (len - (this.isCenter ? 0 : 1)) + '%');
        if (this.isVertical) return style;
        if (this.isLast) {
            style.maxWidth = 100 / this.stepsCount + '%';
        } else {
            style.marginRight = -this.$parent?.stepOffset + 'px';
        }
        return style;
    }

    public updateStatus(val) {
        const prevChild = this.$parent?.steps[this.index - 1] as WuStep;

        if (val > this.index) {
            this.internalStatus = this.$parent.finishStatus;
        } else if (val === this.index && this.prevStatus !== 'error') {
            this.internalStatus = this.$parent.processStatus;
        } else {
            this.internalStatus = 'wait';
        }

        if (prevChild) prevChild.calcProgress(this.internalStatus);
    }

    public calcProgress(status) {
        let step = 100;
        const style: Record<string, any> = {};

        style.transitionDelay = 150 * this.index + 'ms';
        if (status === this.$parent?.processStatus) {
            step = this.currentStatus !== 'error' ? 0 : 0;
        } else if (status === 'wait') {
            step = 0;
            style.transitionDelay = (-150 * this.index) + 'ms';
        }

        style.borderWidth = step && !this.isSimple ? '1px' : 0;
        this.$parent?.direction === 'vertical'
            ? style.height = step + '%'
            : style.width = step + '%';
        this.lineStyle = style;
    }

    public updateComponent() {}

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div
                {...extractClass({}, 'wu-step', {
                    [`is-${this.$parent?.direction}`]: !this.isSimple,
                    'is-simple': this.isSimple,
                    'is-flex': this.isLast && !this.space && !this.isCenter,
                    'is-center': this.isCenter && !this.isVertical && !this.isSimple
                })}
                style={this.currentStyle}
            >
                <div
                    {...extractClass({}, 'wu-step_head', {
                        [`is-${this.currentStatus}`]: this.currentStatus
                    })}
                >
                    <div
                        class="wu-step_line"
                        style={this.isLast ? '' : { marginRight: this.$parent?.stepOffset + 'px' }}
                    >
                        <i class="el-step__line-inner" style={this.lineStyle}></i>
                    </div>
                    <div
                        {...extractClass({}, 'wu-step_icon', {
                            [`is-${this.icon ? 'icon' : 'text'}`]: true
                        })}
                    >
                        {
                            this.currentStatus !== 'success' && this.currentStatus !== 'error'?(
                                <slot name="icon">
                                    {
                                        !this.isSimple? (
                                            <div class="wu-step_icon-inner">{ this.index + 1 }</div>
                                        ): null
                                    }

                                </slot>
                            ) : (
                                <i
                                    {...extractClass({}, 'wu-step_icon-inner', {
                                        [`is-${this.icon ? 'icon' : 'text'}`]: true,
                                        ['el-icon-' + (this.currentStatus === 'success' ? 'check' : 'close')]: true,
                                        "is-status": true,
                                    })}
                                >
                                </i>
                            )
                        }

                    </div>

                </div>
                <div className="wu-step_main">
                    <div {...extractClass({}, 'wu-step_title', { ['is-' + this.currentStatus]: true })}>
                        <slot name="title">{ this.tip }</slot>
                    </div>
                    {
                        this.isSimple? (
                            <div class="wu-step_arrow"></div>
                        ): (
                            <div
                                {...extractClass({}, 'wu-step_description', {
                                    ['is-' + this.currentStatus]: true,
                                })}>
                            <slot name="description">{this.description}</slot>
                        </div>
                        )
                    }
                </div>
            </div>
        );
    }
}
