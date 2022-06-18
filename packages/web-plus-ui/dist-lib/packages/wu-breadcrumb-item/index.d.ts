import { OnConnected, WuComponent } from '@canyuegongzi/web-core-plus';
export declare class WuBreadcrumbItem extends WuComponent implements OnConnected {
    private separator;
    private separatorClass;
    constructor();
    wuBreadcrumb: any;
    to: string;
    render(_renderProps?: {}, _store?: {}): any;
    connected(shadowRoot: ShadowRoot): any;
}
