import { Component, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-transition',
    css: css,
})
export class WuTransition extends WuComponent {
    constructor() {
        super();
    }

    public override render(_renderProps = {}, _store = {}): any {
        return null;
    }
}
