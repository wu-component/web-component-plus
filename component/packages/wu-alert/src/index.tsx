import { h, Component, Prop, Emit, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';

type TypeEnums = 'success' | 'warning' | 'info' | 'error';
const TYPE_CLASSES_MAP = {
    'success': 'el-icon-success',
    'warning': 'el-icon-warning',
    'error': 'el-icon-error'
};
@Component({
    name: 'wu-plus-alert',
    css: css,
})
export class WuAlert extends WuComponent {
    constructor() {
        super();
    }

    // 是否显示
    @Prop({ default: true, type: Boolean })
    public visible: boolean;

    @Prop({ default: '', type: String })
    public tip: string;

    @Prop({ default: '', type: String })
    public description: string;

    @Prop({ default: 'info', type: String })
    public type: TypeEnums;

    @Prop({ default: true, type: Boolean })
    public closable: boolean;

    @Prop({ default: '', type: String })
    public closeText: string;

    @Prop({ default: false, type: Boolean })
    public showIcon: boolean;

    @Prop({ default: false, type: Boolean })
    public center: boolean;

    @Prop({ default: 'light', type: String })
    public effect: string;

    @Emit("confirm")
    public confirm() {
        this.visible = false;
    }

    @Emit("cancel")
    public cancel() {
        this.visible = false;
    }

    @Emit("close")
    public close() {
        this.visible = false;
    }

    get typeClass() {
        return `wu-alert-${ this.type }`;
    }

    get iconClass() {
        return TYPE_CLASSES_MAP[this.type] || 'wu-icon-info';
    }

    get isBoldTitle() {
        return this.description ? 'is-bold' : '';
    }

    public override render(_renderProps = {}, _store = {}) {
        if (!this.visible) {
            return null;
        }
        return (
            <div class={`wu-alert ${this.typeClass} ${this.center ? "is-center" : ''} ${'is-' + this.effect}`} role="alert">
                {
                    this.showIcon ? (
                        <slot name="icon" />
                    ) : null
                }
                <div class="wu-alert_content">
                    <span class={`wu-alert_title ${this.isBoldTitle} `}>
                        {this.tip ? this.tip : <slot name="title" />}
                    </span>
                    <p class="wu-alert_description">
                        {this.description ? this.description : <slot name="description" />}
                    </p>
                    {
                        this.closable && !this.closeText ? (
                            <svg onClick={this.close.bind(this)} class="wu-tag_close wu-icon-close wu-alert_closebtn" fill="currentColor" width="1em" height="1em" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            </svg>
                        ) : null
                    }
                    {
                        this.closable && this.closeText ? (
                            <i class="wu-alert_closebtn is-customed" onClick={this.close.bind(this)}>{this.closeText}</i>
                        ) : null
                    }
                </div>
           </div>
        );
    }
}
