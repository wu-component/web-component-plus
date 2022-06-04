import { Component, Emit, OnConnected, Prop, State, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './index.scss';
import domReady from "@/common/dready";

@Component({
    name: 'wu-plus-transition',
    css: css,
    is: 'LightDom'
})
export class WuTransition extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    @Prop({ default: 'fade', type: String })
    public name = 'fade';

    @Prop({ default: 0, type: Number })
    public leavingTime = 0;

    @Prop({ default: false, type: Boolean })
    public autoRemove = false;

    @Prop({ default: false, type: Boolean })
    public appear = false;

    @Prop({ default: false, type: Boolean })
    public disappear = false;

    @Prop({ default: 0, type: Number })
    public delay = 0;

    @State({ default: false, type: Boolean })
    public _show = true;

    public async toggle() {
        this._show = !this._show;
        if (this._show)
            return await this.enter();
        else
            return await this.leave();
    }

    private callback: () => void

    @Emit('before-enter')
    private beforeEnter() {}

    @Emit('after-enter')
    public afterEnter() {}

    @Emit('enter')
    public enterEvent() {}

    @Emit('leave')
    public leaveEvent() {}

    @Emit('before-leave')
    public beforeLeave() {}

    @Emit('after-leave')
    public afterLeave() {}

    public override connected(shadowRoot: ShadowRoot) {
        domReady(() => {
            if (this.appear) {
                this.enter();
            }
            if (this.leavingTime) {
                setTimeout(() => {
                    this.leave();
                }, this.leavingTime);
            }
        });
    }

    public override receiveProps() {
        if (this.appear) {
            this.enter();
        }
        if (this.disappear) {
            this.leave();
        }

    }

    /**
     * dom 加载
     * @private
     */
    public enter() {
        return new Promise((resolve) => {
            const el = this.children[0];
            if (el) {
                this.beforeEnter();
                el.classList.remove(this.name + '-leave-active');
                el.classList.remove(this.name + '-leave-to');
                el.classList.add(this.name + '-enter');
                el.classList.add(this.name + '-enter-active');

                this.callback = function () {
                    el.classList.remove(this.props.name + '-enter-active');
                    this.afterEnter();
                    this._show = true;
                    resolve(0);
                }.bind(this);
                this.once('transitionend', this.callback);
                this.once('animationend', this.callback);

                window.setTimeout(function () {
                    el.classList.remove(this.name + '-enter');
                    el.classList.add(this.name + '-enter-to');
                    this.enterEvent();
                }.bind(this), this.delay);
            }
        });
    }

    /**
     * dom 离开
     * @private
     */
    public async leave() {
        return new Promise((resolve) => {
            const el = this.children[0];
            if (el) {
                this.beforeLeave();
                el.classList.remove(this.name + '-enter-active');
                el.classList.remove(this.name + '-enter-to');
                el.classList.add(this.name + '-leave');
                el.classList.add(this.name + '-leave-active');
                this.callback = function (e) {
                    el.classList.remove(this.props.name + '-leave-active');
                    this.afterLeave();
                    this._show = false;
                    if (this.props.autoRemove && this.parentNode) {
                        this.parentNode.removeChild(this);
                    }
                    resolve(0);
                }.bind(this);
                this.once('transitionend', this.callback);
                this.once('animationend', this.callback);

                window.setTimeout(function () {
                    el.classList.remove(this.props.name + '-leave');
                    el.classList.add(this.props.name + '-leave-to');
                    this.leaveEvent();
                }.bind(this), this.delay);
            }
        });
    }

    /**
     * 绑定一次事件
     * @param name
     * @param callback
     * @private
     */
    private once(name, callback) {
        const wrapCall = function () {
            this.removeEventListener(name, wrapCall);
            callback();
        }.bind(this);
        this.addEventListener(name, wrapCall);
    }

    public override render(_renderProps = {}, _store = {}): any {
        return;
    }
}
