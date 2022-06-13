import { OnConnected, WuComponent } from '@canyuegongzi/web-core-plus';
export declare class WuExample extends WuComponent implements OnConnected {
    constructor();
    connected(shadowRoot: ShadowRoot): void;
    nameChange(old: string, newVal: string): void;
    name: string;
    getValue(): string;
    render(_renderProps?: {}, _store?: {}): any;
}
