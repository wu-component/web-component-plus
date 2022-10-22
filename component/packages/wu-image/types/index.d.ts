import { OnConnected, OnDisConnected, WuComponent } from '@wu-component/web-core-plus';
import Viewer from './viewer/viewer.esm.js';
declare type TypeEnums = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | '';
export declare class WuImage extends WuComponent implements OnConnected, OnDisConnected {
    constructor();
    viewer: Viewer;
    imageWidth: number;
    imageHeight: number;
    showViewer: boolean;
    text: string;
    src: string;
    fit: TypeEnums;
    lazy: boolean;
    previewSrcList: string[];
    zIndex: number;
    alt: string;
    loading: boolean;
    error: boolean;
    show: boolean;
    get imageStyle(): {
        width?: undefined;
        height?: undefined;
    } | {
        width: string;
        height: string;
    } | {
        width: string;
        height?: undefined;
    } | {
        height: string;
        width?: undefined;
    } | {
        'object-fit': "fill" | "contain" | "cover" | "none" | "scale-down";
    };
    get alignCenter(): boolean;
    get preview(): boolean;
    get imageIndex(): number;
    /**
     * 图片加载完成
     * @param e
     * @param img
     */
    handleLoad(e: any, img: ImageData): void;
    /**
     * 加载错误
     * @param e
     */
    handleError(e: any): {
        err: any;
    };
    /**
     * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
     */
    getImageStyle(fit: any): {
        width?: undefined;
        height?: undefined;
    } | {
        width: string;
        height: string;
    } | {
        width: string;
        height?: undefined;
    } | {
        height: string;
        width?: undefined;
    };
    /**
     * 加载图片
     */
    loadImage(): void;
    /**
     * 图片点击
     */
    clickHandler(): void;
    /**
     * 关闭图片查看器
     */
    closeViewer(): void;
    connected(shadowRoot: ShadowRoot): void;
    disConnected(): void;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
