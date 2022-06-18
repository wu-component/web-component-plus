import { WuComponent } from '@canyuegongzi/web-core-plus';
declare type ShapeEnums = 'circle' | 'square';
declare type FitEnums = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
export declare class WuAvatar extends WuComponent {
    constructor();
    size: number;
    shape: ShapeEnums;
    icon: string;
    src: string;
    alt: string;
    srcSet: string;
    fit: FitEnums;
    isImageExist: boolean;
    get avatarClass(): string;
    handleError(event: Event): Event;
    renderAvatar(): any;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
