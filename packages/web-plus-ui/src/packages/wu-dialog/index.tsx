import { h, Component, Emit, Prop, WuComponent, Watch } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-dialog',
    css: css,
})
export class WuDialog extends WuComponent {
    constructor() {
        super();
    }

    // 是否显示
    @Prop({ default: false, type: Boolean })
    public visible = false;

    // 点击 mask 是否关闭
    @Prop({ type: Boolean, default: true })
    public closeOnClickModal = true

    // 是否显示关闭按钮
    @Prop({ type: Boolean, default: true })
    public showClose = true;

    // 是否在 Dialog 出现时将 body 滚动锁定
    @Prop({ type: Boolean, default: true })
    public lockScroll = true;

    // 弹框标题
    @Prop({ default: '', type: String })
    public override title = '';

    // 宽度
    @Prop({ default: '50%', type: String })
    public width = '50%';

    @Watch('visible')
    public visibleChange(val: boolean) {
        if (val) {
            if (this.lockScroll) {
                this.disableScroll();
            }
        }
    }

    /**
     * 弹框打开
     */
    @Emit('open')
    public open() {
        this.rootNode.childNodes[0].enter();
        this.rootNode.childNodes[1].enter();
        this.visible = true;
    }

    /**
     * 遮罩点击
     */
    @Emit('mask-click')
    public handleMaskClick(){
        if (this.closeOnClickModal) {
            this.close();
        }
    }

    /**
     * 主体点击
     */
    public contentTap(e: MouseEvent) {
        e.stopPropagation();
    }

    /**
     * 弹框关闭
     */
    @Emit('close')
    public close() {
        this.rootNode.childNodes[0].leave();
        this.rootNode.childNodes[1].leave();
        this.enableScroll();
    }

    /**
     * 动画结束
     */
    public onAfterLeave() {
        this.visible = false;
    }

    /**
     * 禁止滚动
     */
    public disableScroll() {
        document.getElementsByTagName('body')[0].style.setProperty("overflow", "hidden");
    }

    /**
     * 开启滚动
     */
    public enableScroll() {
        document.getElementsByTagName('body')[0].style.removeProperty("overflow");
    }

    public override render(_renderProps = {}, _store = {}) {
        if(!this.visible) {
            return null;
        }
        return (
            <div class="wu-dialog_wrapper">
                <wu-plus-transition onafter-leave={this.onAfterLeave.bind(this)} appear name="dialog-zoom">
                    <div class="wu-dialog_wrapper content">

                        <div role="dialog" aria-modal="true" aria-label={this.title} class="wu-dialog" style={{ width: this.width }} >
                            <div class="wu-dialog_header">
                                <span class="wu-dialog_title">{this.title}</span>
                                {
                                    this.showClose ? (
                                        <button type="button" aria-label="Close" class="wu-dialog_headerbtn">
                                            <svg onClick={this.close.bind(this)} class="wu-dialog_close wu-icon wu-icon-close" fill="currentColor" width="1em" height="1em" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                        </button>
                                    ) : null
                                }
                            </div>
                            <div class="wu-dialog_body">
                                <slot />
                            </div>
                            <div class="wu-dialog_footer">
                                <slot name="footer" />
                            </div>
                        </div>
                    </div>
                </wu-plus-transition>

                <wu-plus-transition appear name="mask">
                    <div class="mask" onClick={() => this.handleMaskClick()} />
                </wu-plus-transition>
            </div>
        );
    }
}
