import { h, Component, WuComponent } from '@wu-component/web-core-plus';
import css from './index.css'

@Component({
    name: 'lottie-page-view',
    css: css
})
export class CodeEditorPageView extends WuComponent {
    constructor() {
        super();
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div style="height: 100%">
                lottie 动画
            </div>
        );
    }
}
