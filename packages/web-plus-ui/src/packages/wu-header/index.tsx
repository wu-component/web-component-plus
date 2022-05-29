import { h, Component, Prop } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-header',
    css: css,
})
export class WuHeader extends HTMLElement {
    constructor() {
        super();
    }

    @Prop({ default: '60px', type: String })
    public height: string;


    public render(_renderProps = {}, _store = {}) {
        return (
            <footer class="wu-header" style={{ height: this.height }}>
                <slot class="wu-header" style={{ height: this.height }} />
            </footer>
        );
    }
}
