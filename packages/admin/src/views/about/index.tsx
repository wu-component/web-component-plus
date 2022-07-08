import { h, Component, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './css.css'
import router from "../../router";

@Component({
    name: 'about-view',
    css: css
})
export class AboutView extends WuComponent {
    constructor() {
        super();
    }

    public toHome() {
        router.push('/home', { from: 'about', hash: '12333'})
    }
    public override render(_renderProps = {}, _store = {}) {
        return (
            <div style="height: 100%">
                {/*<wu-plus-button size="mini" type="primary" onClick={() => this.toHome()}>跳转到首页</wu-plus-button>*/}
                <div style="display: flex; align-items: center; flex-direction: column; padding: 16px">
                    <wu-plus-progress style="width: 350px" percentage="70"></wu-plus-progress>
                    <span style="height: 16px"></span>
                    <wu-plus-progress style="width: 350px" percentage="60" color="red"></wu-plus-progress>
                    <span style="height: 16px"></span>
                    <wu-plus-progress style="width: 350px" percentage="50" color="yellow"></wu-plus-progress>
                </div>
            </div>
        );
    }
}
