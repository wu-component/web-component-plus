import { h, Component, Prop } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-mapbox-map',
    css: css,
})
export class WuMapboxMap extends HTMLElement {
    constructor() {
        super();
    }

    @Prop({ default: '', type: String })
    public name: string;

    public render(_renderProps = {}, _store = {}) {
        return <i class={`wu-icon-${this.name}`} />;
    }
}
