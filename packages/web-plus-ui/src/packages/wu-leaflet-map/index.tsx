import { h, Component, Prop } from "@canyuegongzi/web-core-plus";
import css from './index.scss';

@Component({
    name: 'wu-leaflet-map',
    css: css
})
export class WuLeafletMap extends HTMLElement {
    constructor() {
        super();
    }

    @Prop({ default: '', type: String })
    public name: string;

    public render(_renderProps= {}, _store = {}) {
        return (
            <i class={`wu-icon-${this.name}`} />
        );
    }
}
