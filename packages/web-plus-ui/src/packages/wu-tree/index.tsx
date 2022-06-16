import { Component, h, Prop, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './index.scss';
import css1 from './tree/index.scss';
import { UISize } from '@/interface';

@Component({
    name: 'wu-plus-tree',
    css: css + css1,
})
export class WuTree extends WuComponent {
    constructor() {
        super();
    }

    @Prop({ default: '', type: String })
    public size: UISize;

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div>
                <span>文案</span>
            </div>
        );
    }
}
