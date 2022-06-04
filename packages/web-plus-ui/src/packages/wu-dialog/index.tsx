import { Component, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-cascader',
    css: css,
})
export class WuCascader extends WuComponent {
    constructor() {
        super();
    }

    public override render(_renderProps = {}, _store = {}): any {
        return null;
    }
}
