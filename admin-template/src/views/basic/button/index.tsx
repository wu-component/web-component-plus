import { h, Component, WuComponent } from '@wu-component/web-core-plus';
import css from './css.css'

@Component({
    name: 'button-page-view',
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
                    <wu-plus-button size="mini" type="primary">primary</wu-plus-button>
                    <wu-plus-button size="mini" type="success">success</wu-plus-button>
                    <wu-plus-button size="mini" type="warning">warning</wu-plus-button>
                    <wu-plus-button size="mini" type="danger">danger</wu-plus-button>
                    <wu-plus-button size="mini" type="info">info</wu-plus-button>
                    <wu-plus-button size="mini" type="text">text</wu-plus-button>
                </div>
                <h3>不同尺寸</h3>
                <div className="button-container">
                    <wu-plus-button type="primary" size="mini">mini</wu-plus-button>
                    <wu-plus-button type="primary" size="small">small</wu-plus-button>
                    <wu-plus-button type="primary" size="medium">medium</wu-plus-button>
                </div>
                <h3>禁用状态</h3>
                <div className="button-container">
                    <wu-plus-button size="mini" type="primary" disabled="true">disabled</wu-plus-button>
                </div>
                <h3>加载中</h3>
                <div className="button-container">
                    <wu-plus-button size="mini" type="primary" disabled="true">disabled</wu-plus-button>
                </div>
            </div>
        );
    }
}
