import { h, Component, Prop, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-cesium-map',
    css: css,
})
export class WuCesiumMap extends WuComponent {
    constructor() {
        super();
    }

    @Prop({ default: '', type: String })
    public name: string;

    public override render(_renderProps = {}, _store = {}) {
        return <i class={`wu-icon-${this.name}`} />;
    }
}
