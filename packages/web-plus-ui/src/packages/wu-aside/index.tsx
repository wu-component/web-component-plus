import { h, Component, Prop } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-aside',
    css: css,
})
export class WuAside extends HTMLElement {
    constructor() {
        super();
    }

    @Prop({ default: '300px', type: String })
    public width: string;


    public render(_renderProps = {}, _store = {}) {
        return (
            <footer class="wu-aside" style={{ width: this.width }}>
                <slot class="wu-aside" style={{ width: this.width }} />
            </footer>
        );
    }
}
