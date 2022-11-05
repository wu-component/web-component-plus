import {h, Component, WuComponent, State} from '@wu-component/web-core-plus';
import "@wu-component/wu-lottie"
import { Message } from "@wu-component/wu-message";
import type { WuLottie } from "@wu-component/wu-lottie"
import css from './index.css'

@Component({
    name: 'lottie-page-view',
    css: css
})
export class CodeEditorPageView extends WuComponent {
    constructor() {
        super();
    }

    public ref1!: WuLottie;

    public ref2!: WuLottie;

    @State({ type: Number, default: 1 })
    private currentSpeed = 1;

    @State({ type: Boolean, default: true })
    private isPlay = true;

    /**
     * https://qiniu.canyuegongzi.xyz/lf20_z4k0ruoz.json
     * https://qiniu.canyuegongzi.xyz/lf20_qynqmsel.json
     * https://qiniu.canyuegongzi.xyz/lf20_fCKkXdwO3V.json
     * https://qiniu.canyuegongzi.xyz/lf20_aorkkcxr.json
     * https://qiniu.canyuegongzi.xyz/lf20_2udfm2de.json
     */

    /**
     * 开始动画
     */
    public onStart() {
        this.ref1.lottieInstance.play();
        this.isPlay = true;
    }

    /**
     * 结束动画
     */
    public onStop() {
        this.ref1.lottieInstance.stop();
        this.isPlay = false;
    }

    /**
     * 加速动画
     */
    public onSpeedUp() {
        if (this.currentSpeed === 10) {
            Message.setOption({
                type: "warning",
                message: "It's already fast, oh, it can't go any faster"
            })
            return;
        }
        this.ref2.lottieInstance.setSpeed(this.currentSpeed ++);
    }

    /**
     * 减速动画
     */
    public onSpeedCut() {
        if (this.currentSpeed === 1) {
            Message.setOption({
                type: "warning",
                message: "It's already too slow, oh, it can't be any slower"
            })
            return;
        }
        this.ref2.lottieInstance.setSpeed(this.currentSpeed --);
    }


    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="container">
                <h3>基本使用</h3>
                <div class="itemList">
                    <div className="item">
                        <wu-plus-lottie data="https://cdn.canyuegongzi.xyz/wu-component-static/lf20_r6blppzq.json"></wu-plus-lottie>
                    </div>
                    <div className="item">
                        <wu-plus-lottie data="https://qiniu.canyuegongzi.xyz/lf20_z4k0ruoz.json"></wu-plus-lottie>
                    </div>
                    <div className="item">
                        <wu-plus-lottie data="https://qiniu.canyuegongzi.xyz/lf20_fCKkXdwO3V.json"></wu-plus-lottie>
                    </div>
                </div>
                <h3>动画控制</h3>
                <div className="itemList">
                    <div className="itemContainer">
                        <div className="item">
                            <wu-plus-lottie data="https://qiniu.canyuegongzi.xyz/lf20_qynqmsel.json" ref={(ref) => this.ref1 = ref}></wu-plus-lottie>
                        </div>
                        <div className="controlButton">
                            <wu-plus-button type="primary" onClick={() => this.onStart()}>开始</wu-plus-button>
                            <span className="currentSpeedText">动画中?{this.isPlay.toString()}</span>
                            <wu-plus-button type="danger" onClick={() => this.onStop()}>停止</wu-plus-button>
                        </div>
                    </div>

                    <div className="itemContainer">
                        <div className="item">
                            <wu-plus-lottie data="https://qiniu.canyuegongzi.xyz/lf20_2udfm2de.json" ref={(ref) => this.ref2 = ref}></wu-plus-lottie>
                        </div>
                        <div className="controlButton">
                            <wu-plus-button type="primary" onClick={() => this.onSpeedUp()}>加速</wu-plus-button>
                            <span class="currentSpeedText">当前速度{this.currentSpeed}</span>
                            <wu-plus-button type="danger" onClick={() => this.onSpeedCut()}>减速</wu-plus-button>
                        </div>
                    </div>

                    <div class="item">
                        <wu-plus-lottie data="https://qiniu.canyuegongzi.xyz/lf20_z4k0ruoz.json" ></wu-plus-lottie>
                    </div>

                </div>

            </div>
        );
    }
}
