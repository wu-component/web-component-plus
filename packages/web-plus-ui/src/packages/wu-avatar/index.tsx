import { h, Component, Prop, Emit, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

type ShapeEnums = 'circle' | 'square'
type FitEnums = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

@Component({
    name: 'wu-plus-avatar',
    css: css,
})
export class WuAvatar extends WuComponent {
    constructor() {
        super();
    }

    @Prop({ default: '48', type: Number })
    public size: number;

    @Prop({ default: 'circle', type: String })
    public shape: ShapeEnums;

    @Prop({ default: '', type: String })
    public icon: string;

    @Prop({ default: '', type: String })
    public src: string;

    @Prop({ default: '', type: String })
    public alt: string;

    @Prop({ default: '', type: String })
    public srcSet: string;

    @Prop({ default: 'cover', type: String })
    public fit: FitEnums;

    public isImageExist = true;

    get avatarClass() {
        const { size, icon, shape } = this;
        const classList: string[] = [ 'wu-avatar' ];
        if (size && typeof size === 'string') {
            classList.push(`wu-avatar-${size}`);
        }

        if (icon) {
            classList.push('wu-avatar-icon');
        }

        if (shape) {
            classList.push(`wu-avatar-${shape}`);
        }

        return classList.join(' ');
    }

    @Emit("error")
    public handleError(event: Event) {
        event = Array.isArray(event) && event.length ? event[0] : event;
        event.stopPropagation();
        return event;
    }

    public renderAvatar() {
        const { icon, src, alt, isImageExist, srcSet, fit } = this;

        if (isImageExist && src) {
            return (
                <img
                    src={src}
                    onError={this.handleError.bind(this)}
                    alt={alt}
                    srcSet={srcSet}
                    style={{ 'object-fit': fit }}/>
            );
        }

        if (icon) {
            return (<i class={icon} />);
        }

        return <slot />;
    }

    public override render(_renderProps = {}, _store = {}) {
        const sizeStyle: Record<any, any> = typeof this.size === 'number' ? {
            height: `${this.size}px`,
            width: `${this.size}px`,
            lineHeight: `${this.size}px`
        } : {};
        return (
            <span class={ this.avatarClass } style={ sizeStyle }>
                {this.renderAvatar()}
             </span>
        );
    }
}
