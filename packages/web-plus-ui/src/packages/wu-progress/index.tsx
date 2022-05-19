import { Component, Emit, h, Prop } from "@canyuegongzi/web-core-plus";
import css from './index.scss';
import { extractClass } from "../../common";
type TypeEnums = "line" | "circle" | "dashboard";  // line
type StatusEnums = "success" | "exception" | "warning";  //
type StrokeLinecapEnums = "butt" | "round" | "square";  // round

@Component({
    name: 'wu-plus-progress',
    css: css
})
export class WuProgress extends HTMLElement {
    constructor() {
        super();
    }

    public props!: any;

    @Prop({ type: String, default: "line" })
    public type: TypeEnums;

    @Prop({ type: Number, default: 0 })
    public percentage: number;

    @Prop({ type: String, default: "" })
    public status: StatusEnums;

    @Prop({ type: Number, default: 6 })
    public strokeWidth: number;

    @Prop({ type: String, default: 'round' })
    public strokeLinecap: StrokeLinecapEnums;

    @Prop({ type: Boolean, default: false })
    public textInside: boolean;

    @Prop({ type: Number, default: 126 })
    public width: number;

    @Prop({ type: Boolean, default: true })
    public showText: boolean;

    @Prop({ type: String, default: '' })
    public color: string;

    @Emit("close")
    public handleClose(event: Event) {
        event = Array.isArray(event) && event.length ? event[0] : event;
        event.stopPropagation();
        return {
            event
        }
    }

    @Emit("click")
    public handleClick(event) {
        event = Array.isArray(event) && event.length ? event[0] : event;
        return {
            event
        }
    }

    /**
     * 获取颜色
     * @param percentage
     */
    private getCurrentColor(percentage: number) {
        if (typeof this.color === 'string') {
            return this.color;
        }
        return this.color;
    }

    /**
     * 内容
     */
    get content() {
        return `${this.props.percentage}%`;
    }

    /**
     * 进度条大小
     */
    get progressTextSize() {
        const { type, strokeWidth, width } = this.props;
        return type === 'line'
            ? 12 + strokeWidth * 0.4
            : width * 0.111111 + 2;
    }

    /**
     * 图标类名
     */
    get iconClass() {
        const { status, type } = this.props;
        if (status === 'warning') {
            return 'el-icon-warning';
        }
        if (type === 'line') {
            return status === 'success' ? 'el-icon-circle-check' : 'el-icon-circle-close';
        } else {
            return status === 'success' ? 'el-icon-check' : 'el-icon-close';
        }
    }

    /**
     * 颜色
     */
    get stroke() {
        const { color, percentage, status } = this.props;
        let ret;
        if (color) {
            ret = this.getCurrentColor(percentage);
        } else {
            switch (status) {
                case 'success':
                    ret = '#13ce66';
                    break;
                case 'exception':
                    ret = '#ff4949';
                    break;
                case 'warning':
                    ret = '#e6a23c';
                    break;
                default:
                    ret = '#20a0ff';
            }
        }
        return ret;
    }

    get barStyle() {
        const { percentage } = this.props
        const style: Record<any, any> = {};
        style.width = percentage + '%';
        style.backgroundColor = this.getCurrentColor(percentage);
        return style;
    }

    get relativeStrokeWidth() {
        const { strokeWidth, width } = this.props;
        return (strokeWidth / width * 100).toFixed(1);
    }

    get radius() {
        const { type } = this.props;
        if (type === 'circle' || type === 'dashboard') {
            return parseInt(String(50 - parseFloat(this.relativeStrokeWidth) / 2), 10);
        } else {
            return 0;
        }
    }

    get trackPath() {
        const radius = this.radius;
        const { type } = this.props;
        const isDashboard = type === 'dashboard';
        return `
          M 50 50
          m 0 ${isDashboard ? '' : '-'}${radius}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '-' : ''}${radius * 2}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '' : '-'}${radius * 2}
          `;
    }

    get perimeter() {
        return 2 * Math.PI * this.radius;
    }

    get rate() {
        const { type } = this.props;
        return type === 'dashboard' ? 0.75 : 1;
    }

    get strokeDashoffset() {
        const offset = -1 * this.perimeter * (1 - this.rate) / 2;
        return `${offset}px`;
    }

    get trailPathStyle() {
        return {
            strokeDasharray: `${(this.perimeter * this.rate)}px, ${this.perimeter}px`,
            strokeDashoffset: this.strokeDashoffset
        };
    }

    get circlePathStyle() {
        return {
            strokeDasharray: `${this.perimeter * this.rate * (this.percentage / 100)}px, ${this.perimeter}px`,
            strokeDashoffset: this.strokeDashoffset,
            transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
        };
    }

    public render(_renderProps = {}, _store = {}) {
        console.log("props", this.props);
        console.log("showText", this.showText);
        console.log("textInside", this.textInside);
        return (
            <div
                class="wu-progress"
                role="progressbar"
                aria-valuenow={this.percentage}
                aria-valuemin="0"
                aria-valuemax="100"

                {...extractClass({}, 'wu-progress', {
                    ['wu-progress-' + this.type]: this.type,
                    ['wu-progress-' + this.status]: this.status,
                    'wu-progress-without-text': !this.showText,
                    'wu-progress-text-inside': this.textInside,
                })}
            >
                {
                    this.type === "line" ? (
                            <div class="wu-progress-bar">
                                <div class="wu-progress-bar_outer" style={{ height: this.strokeWidth + 'px' }}>
                                    <div class="wu-progress-bar_inner" style={this.barStyle}>
                                        {
                                            this.showText && this.textInside ? (
                                                <div class="wu-progress-bar_innerText">
                                                    {this.content}
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </div>
                        ) :
                        (
                            <div class="wu-progress-circle"
                                 style={{ height: this.width + 'px', width: this.width + 'px' }}>
                                <svg viewBox="0 0 100 100">
                                    <path
                                        class="wu-progress-circle_track"
                                        stroke="#e5e9f2"
                                        fill="none"
                                        d={this.trackPath}
                                        stroke-width={this.relativeStrokeWidth}
                                        style={this.trailPathStyle}
                                    />
                                    <path
                                        class="wu-progress-circle_path"
                                        fill="none"
                                        d={this.trackPath}
                                        stroke={this.stroke}
                                        stroke-linecap={this.strokeLinecap}
                                        stroke-width={this.percentage ? this.relativeStrokeWidth : 0}
                                        style={this.circlePathStyle}
                                    />
                                </svg>
                            </div>
                        )
                }
                {
                    this.showText && !this.textInside? (
                        <div class="wu-progress_text" style={{fontSize: this.progressTextSize + 'px'}}>
                            {
                                !this.status? this.content: <i class={this.iconClass}/>
                            }
                        </div>
                    ): null
                }
            </div>
        )
    }

}
