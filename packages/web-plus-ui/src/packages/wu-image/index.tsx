import { Component, Emit, h, OnConnected, OnDisConnected, Prop, State, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './index.scss';
import css1 from './viewer/viewer.css';
import { extractClass } from "@/common";
import Viewer from './viewer/viewer.esm.js';

type TypeEnums = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | '';


const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined;

const ObjectFit = {
    NONE: 'none',
    CONTAIN: 'contain',
    COVER: 'cover',
    FILL: 'fill',
    SCALE_DOWN: 'scale-down'
};

@Component({
    name: 'wu-plus-image',
    css: css + css1,
})
export class WuImage extends WuComponent implements OnConnected, OnDisConnected {
    constructor() {
        super();
    }

    public viewer!: Viewer;

    public imageWidth = 0;

    public imageHeight = 0;

    public showViewer: boolean

    @Prop({ default: '', type: String })
    public text: string;

    @Prop({ default: '', type: String })
    public src = ''

    @Prop({ default: '', type: String })
    public fit: TypeEnums = '';

    @Prop({ default: false, type: Boolean })
    public lazy: boolean;

    @Prop({ default: [], type: Array })
    public previewSrcList: string[] = []

    @Prop({ default: 2000, type: Number })
    public zIndex = 2000;

    @Prop({ default: '', type: String })
    public alt = '';

    @State({ default: true, type: Boolean })
    public loading = true;

    @State({ default: false, type: Boolean })
    public error = false;

    @State({ default: true, type: Boolean })
    public show = true;

    get imageStyle() {
        const { fit } = this;
        if (fit) {
            return isSupportObjectFit()
                ? { 'object-fit': fit }
                : this.getImageStyle(fit);
        }
        return {};
    }

    get alignCenter() {
        return !isSupportObjectFit() && this.fit !== ObjectFit.FILL;
    }

    get preview() {
        const { previewSrcList } = this;
        return Array.isArray(previewSrcList) && previewSrcList.length > 0;
    }

    get imageIndex() {
        let previewIndex = 0;
        const srcIndex = this.previewSrcList.indexOf(this.src);
        if (srcIndex >= 0) {
            previewIndex = srcIndex;
        }
        return previewIndex;
    }

    /**
     * 图片加载完成
     * @param e
     * @param img
     */
    public handleLoad(e: any, img: ImageData) {
        this.imageWidth = img.width;
        this.imageHeight = img.height;
        this.loading = false;
        this.error = false;
    }

    /**
     * 加载错误
     * @param e
     */
    @Emit('error')
    public handleError(e) {
        this.loading = false;
        this.error = true;
        return { err: e };
    }

    /**
     * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
     */
    public getImageStyle(fit: any) {
        const { imageWidth, imageHeight } = this;
        const { clientWidth: containerWidth, clientHeight: containerHeight } = this.rootNode;

        if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {};

        const imageAspectRatio = imageWidth / imageHeight;
        const containerAspectRatio = containerWidth / containerHeight;

        if (fit === ObjectFit.SCALE_DOWN) {
            const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight;
            fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
        }

        switch (fit) {
            case ObjectFit.NONE:
                return { width: 'auto', height: 'auto' };
            case ObjectFit.CONTAIN:
                return (imageAspectRatio < containerAspectRatio) ? { width: 'auto' } : { height: 'auto' };
            case ObjectFit.COVER:
                return (imageAspectRatio < containerAspectRatio) ? { height: 'auto' } : { width: 'auto' };
            default:
                return {};
        }
    }

    /**
     * 加载图片
     */
    public loadImage() {
        this.loading = true;
        this.error = false;
        const img = new Image();
        img.onload = e => this.handleLoad(e, img as any);
        img.onerror = this.handleError.bind(this);
        img.src = this.src;
    }

    /**
     * 图片点击
     */
    public clickHandler() {
        if (!this.preview) {
            return;
        }
        this.showViewer = true;
        Promise.resolve().then(() => {
            this.viewer = new Viewer(this.shadowRoot.querySelector('.wu-image'), {
                container: this.shadowRoot.querySelector('.wu-image')
            });
        });
    }

    /**
     * 关闭图片查看器
     */
    public closeViewer() {
        this.showViewer = false;
    }

    public override connected(shadowRoot: ShadowRoot) {
        this.loadImage();
    }

    public override disConnected() {
        this.viewer?.destroy?.();
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="wu-image">
                {
                    this.loading ? (
                        <slot name="placeholder">
                            <div class="wu-image_placeholder" />
                        </slot>
                    ) : null
                }
                {
                    this.error ? (
                        <slot name="error">
                            <div class="wu-image_error">ERROR</div>
                        </slot>
                    ) : null
                }
                {
                    !this.error && !this.loading ? (
                        <img
                            v-on="$listeners"
                            onClick={this.clickHandler.bind(this)}
                            src={this.src}
                            id="__imageTag__"
                            style={this.imageStyle}
                            {...extractClass({}, '', {
                                'wu-image_inner': true,
                                'wu-image_inner-center': this.alignCenter,
                                'wu-image_preview': this.preview,
                            })}
                         alt={this.alt}/>
                    ) : null
                }
            </div>
        );
    }
}
