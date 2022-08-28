import { h, Component, Prop, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-header',
    css: css,
})
export class WuHeader extends WuComponent {
    constructor() {
        super();
    }

    @Prop({ default: '60px', type: String })
    public height: string;


    public override render(_renderProps = {}, _store = {}) {
        return (
            <footer class="wu-header" style={{ height: this.height }}>
                <slot class="wu-header" style={{ height: this.height }} />
            </footer>
        );
    }
}
