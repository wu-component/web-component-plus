import { h, Component, WuComponent } from '@wu-component/web-core-plus';
import "@wu-component/wu-code-monaco-editor";
import css from './index.css'
import { initialCode } from "./const";

@Component({
    name: 'code-editor-page-view',
    css: css
})
export class CodeEditorPageView extends WuComponent {
    constructor() {
        super();
    }

    private initialCode: string = initialCode;

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="container">
                <div style="width: 100%; height: 100%">
                    <wu-code-monaco-editor language="typescript" theme="vs-dark" initial-value={this.initialCode}  style="width: 100%;height: 100%"></wu-code-monaco-editor>
                </div>
            </div>
        );
    }
}
