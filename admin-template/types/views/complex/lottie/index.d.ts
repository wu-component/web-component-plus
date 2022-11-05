import { WuComponent } from '@wu-component/web-core-plus';
import "@wu-component/wu-lottie";
import type { WuLottie } from "@wu-component/wu-lottie";
export declare class CodeEditorPageView extends WuComponent {
    constructor();
    ref1: WuLottie;
    ref2: WuLottie;
    private currentSpeed;
    private isPlay;
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
    onStart(): void;
    /**
     * 结束动画
     */
    onStop(): void;
    /**
     * 加速动画
     */
    onSpeedUp(): void;
    /**
     * 减速动画
     */
    onSpeedCut(): void;
    render(_renderProps?: {}, _store?: {}): any;
}
