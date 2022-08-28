import { h, Component, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-main',
    css: css,
})
export class WuMain extends WuComponent {
    constructor() {
        super();
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <footer class="wu-main">
                <slot class="wu-main" />
            </footer>
        );
    }
}
