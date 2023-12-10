import { h, OnConnected, WuComponent } from '@wu-component/web-core-plus';
export declare class WuBreadcrumbItem extends WuComponent implements OnConnected {
    private separator;
    private separatorClass;
    constructor();
    wuBreadcrumb: any;
    to: string;
    render(_renderProps?: {}, _store?: {}): h.JSX.Element;
    connected(shadowRoot: ShadowRoot): any;
}
