import { h, OnConnected, OnBeforeUpdate, WuComponent } from '@wu-component/web-core-plus';
type DirectionEnums = 'vertical' | 'horizontal' | any;
export declare class WuContainer extends WuComponent implements OnConnected, OnBeforeUpdate {
    constructor();
    isVertical: boolean;
    beforeUpdate(): void;
    connected(shadowRoot: ShadowRoot): void;
    private initIsVertical;
    direction: DirectionEnums;
    render(_renderProps?: {}, _store?: {}): h.JSX.Element;
}
export {};
