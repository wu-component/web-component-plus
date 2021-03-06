import { h, Component, WuComponent, OnConnected } from '@canyuegongzi/web-core-plus';
import css from './css.css'
import router from "../router";

@Component({
    name: 'app-view',
    css: css
})
export class App extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    public override connected() {
        router.push('/home')
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="app-container">
                <wu-plus-container style="width: 100%;height: 100%;    display: block;">
                    <wu-plus-aside width="200px" style="height: 100%;display: block;background-color: rgb(84, 92, 100);">
                        <app-nav-menu></app-nav-menu>
                    </wu-plus-aside>
                    <wu-plus-container style="width:100%">
                        <wu-plus-header style="background-color: rgb(84, 92, 100);padding-left: -1px">Header</wu-plus-header>
                        <wu-plus-main>
                            <wu-plus-router-view></wu-plus-router-view>
                        </wu-plus-main>
                        <wu-plus-footer>Footer</wu-plus-footer>
                    </wu-plus-container>
                </wu-plus-container>
            </div>
        );
    }
}
