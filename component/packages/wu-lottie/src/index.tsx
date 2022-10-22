import { extractClass } from '@wu-component/common';
import { h, Component, WuComponent, Prop, OnConnected, OnDisConnected, Watch } from '@wu-component/web-core-plus';
import lottie, { AnimationItem } from "lottie-web";
import css from './index.scss';

@Component({
    name: 'wu-plus-lottie',
    css: css,
})
export class WuLottie extends WuComponent implements OnConnected, OnDisConnected {
    constructor() {
        super();
    }

    public lottieInstance!: AnimationItem;

    public lottieContainer!: HTMLDivElement;

    @Prop({ type: Boolean, default: true })
    public loop: boolean;

    @Prop({ type: String, default: undefined })
    public data: string;

    @Prop({ type: Boolean, default: true })
    public autoplay: boolean;

    @Prop({ type: String, default: 'svg' })
    public renderer: 'svg' | 'canvas' | 'html'

    @Prop({ type: Object, default: {} })
    public config: Record<string, any>;

    public override connected(shadowRoot: ShadowRoot): void {
        this.init();
    }

    public override disConnected(): void {

    }

    private init(){
        this.lottieContainer = this.shadowRoot.querySelector('.lottieWrapper');
        if (!this.lottieContainer) return;
        this.lottieInstance = lottie.loadAnimation({
            // @ts-ignore
            ...this.$reactive || {},
            path: typeof this.data === 'string' ? this.data : undefined,
            animationData: typeof this.data === 'object' ? this.data : undefined,
            container: this.shadowRoot.querySelector('.lottieWrapper'),
        });
    }

    @Watch('data')
    public dataChnage(val: string, old: string) {
        this.init();
    }

    @Watch('loop')
    public loopChnage(val: boolean, old: boolean) {
        if (!this.lottieInstance) return;
        this.lottieInstance.loop = val;

        if (val && this.lottieInstance.isPaused) {
            this.lottieInstance.play();
        }
    }

    @Watch('autoplay')
    public lautoplayChnage(val: boolean, old: boolean) {
        if (!this.lottieInstance) return;
        this.lottieInstance.autoplay = val;
    }

    public stop() {
        return this.lottieInstance && this.lottieInstance.stop();
    }

    public play() {
        return this.lottieInstance && this.lottieInstance.play();
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div {...extractClass({}, 'lottieWrapper', {})}> </div>
        );
    }
}
