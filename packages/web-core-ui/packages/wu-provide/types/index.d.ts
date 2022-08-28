import { OnConnected, WuComponent } from '@wu-component/web-core-plus';
export declare class WuProvide extends WuComponent implements OnConnected {
    provide: string;
    provideParentDescTitle(): {
        parentDescTitle: string;
    };
    /**
     * 获取
     * @private
     */
    getProvide(): string;
    render(_renderProps?: {}, _store?: {}): any;
    connected(shadowRoot: ShadowRoot): any;
}
