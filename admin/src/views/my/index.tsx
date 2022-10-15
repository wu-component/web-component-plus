import { h, Component, WuComponent } from '@wu-component/web-core-plus';
import css from './css.css'
import router from "../../router";

@Component({
    name: 'my-view',
    css: css
})
export class MyView extends WuComponent {
    constructor() {
        super();
    }

    public toAbout() {
        router.push('/about', { about: 22222})
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div style="height: 100%">
                {/*<wu-plus-button size="mini" type="primary" onClick={() => this.toAbout()}>跳转到关于的页面</wu-plus-button>*/}
                <div style="display: flex; flex-wrap: wrap; align-items: center;justify-content: space-around;padding: 16px">
                    <div style="display: flex;flex-direction: column">
                        <span>fill</span>
                        <wu-plus-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fill"></wu-plus-image>
                    </div>
                    <div style="display: flex;flex-direction: column">
                        <span>contain</span>
                        <wu-plus-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="contain"></wu-plus-image>
                    </div>
                    <div style="display: flex;flex-direction: column">
                        <span>cover</span>
                        <wu-plus-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></wu-plus-image>
                    </div>
                    <div style="display: flex;flex-direction: column">
                        <span>none</span>
                        <wu-plus-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="none"></wu-plus-image>
                    </div>
                    <div style="display: flex;flex-direction: column">
                        <span>scale-down</span>
                        <wu-plus-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="scale-down"></wu-plus-image>
                    </div>
                </div>
            </div>
        );
    }
}
