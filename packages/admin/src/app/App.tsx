import { h, Component, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './css.css'

@Component({
    name: 'app-view',
    css: css
})
export class App extends WuComponent {
    constructor() {
        super();
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="app-container">
                <wu-plus-router-view></wu-plus-router-view>
            </div>
        );
    }
}
