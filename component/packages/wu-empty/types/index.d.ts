import { WuComponent } from '@wu-component/web-core-plus';
import "./ImgEmpty.tsx";
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
