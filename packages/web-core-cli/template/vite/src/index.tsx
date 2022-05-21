import { Component, h, Prop } from '@canyuegongzi/web-core-plus';
import css from "./index.scss";

@Component({
    name: 'wu-test-example',
    css: css,
})
export class TestExample extends HTMLElement {
    constructor() {
        super();
    }

    @Prop({ default: '', type: String })
    public text: string;

    public render(_renderProps = {}, _store = {}) {
        return (
            <div class="container">
                <span>sss</span>
            </div>
        );
    }
}
