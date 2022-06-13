import { WuComponent } from '@canyuegongzi/web-core-plus';
import "./ImgEmpty";
export declare class WuEmpty extends WuComponent {
    constructor();
    image: string;
    description: string;
    size: number;
    get emptyDescription(): string;
    get imageStyle(): {
        width: string;
    };
    render(_renderProps?: {}, _store?: {}): any;
}
