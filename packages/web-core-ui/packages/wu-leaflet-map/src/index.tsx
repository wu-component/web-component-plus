import { h, Component, Prop, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-leaflet-map',
    css: css,
})
export class WuLeafletMap extends WuComponent {
    constructor() {
        super();
    }

    @Prop({ default: '', type: String })
    public name: string;

    public override render(_renderProps = {}, _store = {}) {
        return <i class={`wu-icon-${this.name}`} />;
    }
}
