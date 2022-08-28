import { h, Component, Prop, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-aside',
    css: css,
})
export class WuAside extends WuComponent {
    constructor() {
        super();
    }

    @Prop({ default: '300px', type: String })
    public width: string;


    public override render(_renderProps = {}, _store = {}) {
        return (
            <footer class="wu-aside" style={{ width: this.width }}>
                <slot class="wu-aside" style={{ width: this.width }} />
            </footer>
        );
    }
}
