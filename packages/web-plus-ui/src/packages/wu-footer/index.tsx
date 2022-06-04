import { h, Component, Prop, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-footer',
    css: css,
})
export class WuFooter extends WuComponent {
    constructor() {
        super();
    }

    @Prop({ default: '60px', type: String })
    public height: string;


    public override render(_renderProps = {}, _store = {}) {
        return (
            <footer class="wu-footer" style={{ height: this.height }}>
                <slot class="wu-footer" style={{ height: this.height }} />
            </footer>
        );
    }
}
