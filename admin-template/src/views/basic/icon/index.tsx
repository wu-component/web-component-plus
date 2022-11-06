import { h, Component, WuComponent } from '@wu-component/web-core-plus';
import css from './css.css'

@Component({
    name: 'icon-page-view',
    css: css
})
export class HomeView extends WuComponent {
    constructor() {
        super();
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="container">
                <h3>基本样式</h3>
                <div className="button-container">

                </div>
                <h3>不同尺寸</h3>
                <div className="button-container">

                </div>
                <h3>禁用状态</h3>
                <div className="button-container">

                </div>
                <h3>加载中</h3>
                <div className="button-container">

                </div>
            </div>
        );
    }
}
