import { h, Component, WuComponent } from '@wu-component/web-core-plus';
import "@wu-component/wu-code-monaco-editor";
import css from './index.css'

@Component({
    name: 'code-editor-page-view',
    css: css
})
export class CodeEditorPageView extends WuComponent {
    constructor() {
        super();
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div style="height: calc(100vh - 60px)">
                <div style="width: 100%; height: 100%">
                    <wu-code-monaco-editor theme="vs-dark" initial-value="console.log('test code')"  style="width: 100%;height: 100%"></wu-code-monaco-editor>
                </div>
            </div>
        );
    }
}
