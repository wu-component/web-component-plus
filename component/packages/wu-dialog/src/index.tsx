import { h, Component, Emit, Prop, State, WuComponent, Watch, Fragment } from '@wu-component/web-core-plus';
import css from './index.scss';
import "@wu-component/wu-transition";

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

    // 是否显示
    @State({ default: false, type: Boolean })
    public show = false;

    // 点击 mask 是否关闭
    @Prop({ type: Boolean, default: true })
    public closeOnClickModal = true

    // 是否显示关闭按钮
    @Prop({ type: Boolean, default: true })
    public showClose = true;

    // 是否在 Dialog 出现时将 body 滚动锁定
    @Prop({ type: Boolean, default: true })
    public lockScroll = true;

    // 是否在 Dialog 出现时将 body 滚动锁定
    @Prop({ type: Number, default: 500 })
    public zIndex = 500;

    // 弹框标题 title 无法重写
    @Prop({ default: '', type: String })
    public caption = '';

    // 宽度
    @Prop({ default: '50%', type: String })
    public width = '50%';

    public transitionRef: any = null;

    @Watch('visible', { immediate: true })
    public visibleChange(val: boolean, old: boolean) {
        if (val === old){
            return;
        }
        if (val) {
            this.lockScroll && this.disableScroll();
            this.show = true;
            setTimeout(() => {
                const dom: any = this.shadowRoot.querySelector("wu-plus-transition");
                dom.enter?.();
            }, 0);
        } else {
            const dom: any = this.shadowRoot.querySelector("wu-plus-transition");
            dom.leave?.();
            this.lockScroll && this.enableScroll();
        }
    }

    /**
     * 弹框打开
     */
    @Emit('open')
    public open() {
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
     * 遮罩点击
     */
    @Emit('mask-click')
    public handleMaskClickContent(e){
        for (let i = 0 ; i < e?.path.length; i ++) {
            if (e.path[i]?.classList?.contains("wu-dialog")) {
                return;
            }
        }
        if (this.closeOnClickModal && e?.target?.tagName !== "WU-PLUS-DIALOG") {
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
        this.visible = false;
    }

    /**
     * 动画结束
     */
    public onAfterLeave() {
        this.show = false;
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
        if(!this.show) {
            return <Fragment />;
        }
        return (
            <div className="wu-dialog_wrapper">
                {/*@ts-ignore*/}
                <wu-plus-transition onafter-leave={this.onAfterLeave.bind(this)} ref={(ref) => this.transitionRef = ref} appear name="dialog-zoom">
                    <div className="wu-dialog_wrapper content" onClick={(event) => this.handleMaskClickContent(event)}>

                        <div role="dialog" aria-modal="true" aria-label={this.title} className="wu-dialog"
                             style={{ width: this.width, zIndex: this.zIndex }}>
                            <div className="wu-dialog_header">
                                <span className="wu-dialog_title">{this.title}</span>
                                {
                                    this.showClose ? (
                                        <button type="button" aria-label="Close"
                                                className="wu-dialog_headerbtn">
                                            <svg onClick={this.close.bind(this)}
                                                 className="wu-dialog_close wu-icon wu-icon-close"
                                                 fill="currentColor" width="1em" height="1em"
                                                 focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                <path
                                                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                                            </svg>
                                        </button>
                                    ) : null
                                }
                            </div>
                            <div className="wu-dialog_body">
                                <slot/>
                            </div>
                            <div className="wu-dialog_footer">
                                <slot name="footer"/>
                            </div>
                        </div>
                    </div>
                    {/*@ts-ignore*/}
                </wu-plus-transition>
                <div className="mask" style={{}} onClick={() => {}}/>
            </div>
        );
    }
}
