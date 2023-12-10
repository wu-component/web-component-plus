import { h, WuComponent } from '@wu-component/web-core-plus';
type ShapeEnums = 'circle' | 'square';
type FitEnums = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
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
    renderAvatar(): h.JSX.Element;
    render(_renderProps?: {}, _store?: {}): h.JSX.Element;
}
export {};
