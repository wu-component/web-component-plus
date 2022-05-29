import { h, Component } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-main',
    css: css,
})
export class WuMain extends HTMLElement {
    constructor() {
        super();
    }

    public render(_renderProps = {}, _store = {}) {
        return (
            <footer class="wu-main">
                <slot class="wu-main" />
            </footer>
        );
    }
}
