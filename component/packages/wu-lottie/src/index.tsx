import { h, Component, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-lottie',
    css: css,
})
export class WuLottie extends WuComponent {
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
