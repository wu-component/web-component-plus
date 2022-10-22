import { WuComponent, OnConnected, OnDisConnected } from '@wu-component/web-core-plus';
import { AnimationItem } from "lottie-web";
export declare class WuLottie extends WuComponent implements OnConnected, OnDisConnected {
    constructor();
    lottieInstance: AnimationItem;
    lottieContainer: HTMLDivElement;
    loop: boolean;
    data: string;
    autoplay: boolean;
    renderer: 'svg' | 'canvas' | 'html';
    config: Record<string, any>;
    connected(shadowRoot: ShadowRoot): void;
    disConnected(): void;
    private init;
    dataChnage(val: string, old: string): void;
    loopChnage(val: boolean, old: boolean): void;
    lautoplayChnage(val: boolean, old: boolean): void;
    stop(): void;
    play(): void;
    render(_renderProps?: {}, _store?: {}): any;
}
