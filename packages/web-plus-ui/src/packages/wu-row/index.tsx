import { h, Component, Prop, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './index.scss';
import { extractClass } from '@/common';

type JustifyEnums = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
type TypeEnums = 'flex' | '' | undefined;
type AlignEnums = 'top' | 'middle' | 'bottom';
@Component({
    name: 'wu-plus-row',
    css: css,
})
export class WuRow extends WuComponent {
    constructor() {
        super();
    }

    @Prop({ default: '', type: String })
    public name: string;

    @Prop({ default: 0, type: Number })
    public gutter: number;

    @Prop({ default: '', type: String })
    public type: TypeEnums;

    @Prop({ default: 'start', type: String })
    public justify: JustifyEnums;

    @Prop({ default: '', type: String })
    public align: AlignEnums;

    @Prop({ default: 'div', type: String })
    public tag: string;

    public tempInputTagName = '';

    get currentStyle() {
        const ret: any = {};
        if (this.gutter) {
            ret.marginLeft = `-${this.gutter / 2}px`;
            ret.marginRight = ret.marginLeft;
        }
        return ret;
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <this.tag
                {...extractClass({}, `wu-row`, {
                    [`is-justify-${this.justify}`]: this.justify !== 'start',
                    [`is-align-${this.align}`]: this.align,
                    ['wu-row-flex']: this.type === 'flex',
                })}
            >
                <slot />
            </this.tag>
        );
    }
}
