import { h, Component, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './css.css'
import router from '../../router';

@Component({
    name: 'home-view',
    css: css
})
export class HomeView extends WuComponent {
    constructor() {
        super();
    }

    public toMy() {
        router.push('/my', { order: 23})
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div style="height: 100%">
                {/*<wu-plus-button size="mini" type="primary" onClick={() => this.toMy()}>跳转到我的页面</wu-plus-button>*/}
                <div className="button-container"
                     style="display: flex; flex-wrap: wrap; align-items: center;justify-content: space-around;padding: 16px">
                    <wu-plus-button size="mini" type="primary">primary</wu-plus-button>
                    <wu-plus-button size="mini" type="success">success</wu-plus-button>
                    <wu-plus-button size="mini" type="warning">warning</wu-plus-button>
                    <wu-plus-button size="mini" type="danger">danger</wu-plus-button>
                    <wu-plus-button size="mini" type="info">info</wu-plus-button>
                    <wu-plus-button size="mini" type="text">text</wu-plus-button>
                </div>
            </div>
        );
    }
}
