import { h, Component, WuComponent } from '@wu-component/web-core-plus';
import css from './css.css'

@Component({
    name: 'message-view',
    css: css
})
export class MessageView extends WuComponent {
    constructor() {
        super();
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div style="height: 100%">
                <div style="display: flex; align-items: center;justify-content: center;padding: 16px">
                    <wu-plus-collapse style="width: 100%;"  id="testCollapse">
                        <wu-plus-collapse-item tip="一致性 Consistency" name="1">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </wu-plus-collapse-item>
                        <wu-plus-collapse-item tip="反馈 Feedback" name="2">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </wu-plus-collapse-item>
                    </wu-plus-collapse>
                </div>
            </div>
        );
    }
}
