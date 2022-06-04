import { h, Component, Prop, Emit, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './index.scss';
import { extractClass } from '@/common';
export type TypeEnums = 'success' | 'warning' | 'info' | 'error';
export type PositionEnums = 'top';

@Component({
    name: 'wu-plus-message',
    css: css,
})
export class WuMessage extends WuComponent {
    constructor() {
        super();
    }

    public timer: any;

    @Prop({ type: String, default: 'top' })
    public position: string;

    @Prop({ type: String, default: '' })
    public message: string;

    @Prop({ type: String, default: 'info' })
    public type: TypeEnums;

    @Prop({ type: Number, default: 3000 })
    public duration: number;

    @Prop({ type: Number, default: 1 })
    public elId: number;

    @Prop({ type: Boolean, default: false })
    public center: boolean;

    @Prop({ type: Boolean, default: false })
    public showClose: boolean;

    @Prop({ type: String, default: '' })
    public customClass: string;

    @Prop({ type: Number, default: 20 })
    public verticalOffset: number;

    get positionStyle() {
        return {
            top: `${this.verticalOffset}px`,
        };
    }

    /**
     * 关闭
     */
    @Emit('close')
    public handleClose() {
        return true;
    }

    /**
     * 清除定时器
     */
    public clearTimer() {
        this.timer && clearTimeout(this.timer);
    }

    /**
     * 开始定时器
     */
    public startTimer() {
        if (this.duration > 0) {
            this.timer = setTimeout(() => {
                this.handleClose();
            }, this.duration);
        }
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div
                style={this.positionStyle}
                {...extractClass({}, 'wu-message', {
                    ['wu-message-' + this.type]: this.type,
                    'is-center': this.center,
                    'is-closable': !this.showClose,
                })}
                role="alert"
            >
                <p class="wu-message_content">{this.message}</p>
                {this.showClose ? (
                    <svg onClick={this.handleClose.bind(this)} class="wu-tag_close wu-icon-close wu-message_closeBtn" fill="currentColor" width="1em" height="1em" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                ) : null}
            </div>
        );
    }
}
