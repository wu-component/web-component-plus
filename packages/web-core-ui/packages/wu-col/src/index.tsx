import { h, Component, Prop, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import { extractClass } from '@wu-component/common';

@Component({
    name: 'wu-plus-col',
    css: css,
})
export class WuCol extends WuComponent {
    constructor() {
        super();
    }

    @Prop({ default: 'div', type: String })
    public tag: string;

    @Prop({ default: 24, type: Number })
    public span: number;

    @Prop({ default: '', type: Number })
    public offset: number;

    @Prop({ default: '', type: Number })
    public pull: number;

    @Prop({ default: '', type: Number })
    public push: number;

    public override render(_renderProps = {}, _store = {}) {
        const classList: string[] = [];
        const classListMap: Record<string, boolean> = {};
        const style: Record<string, string> = {};
        [ 'span', 'offset', 'pull', 'push' ].forEach(prop => {
            if (this[prop] || this[prop] === 0) {
                const name = prop !== 'span' ? `wu-col-${prop}-${this[prop]}` : `wu-col-${this[prop]}`;
                classList.push(name);
                classListMap[name] = true;
            }
        });
        return (
            <this.tag
                style={{ ...style }}
                {...extractClass({}, `wu-col`, {
                    ...classListMap,
                })}
            >
                <slot />
            </this.tag>
        );
    }
}
