import { Component, Emit, h, Prop, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-page-header',
    css: css,
})
export class WuPageHeader extends WuComponent {
    constructor() {
        super();
    }

    @Prop({ default: '返回', type: String })
    public header: string;

    @Prop({ default: '', type: String })
    public content: string;

    @Emit('back')
    public back() {}

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="wu-page-header">
                <div class="wu-page-header_left">
                    <svg onClick={this.back.bind(this)} t="1653067479511" class="wu-icon-back icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3196" width="200" height="200">
                        <path
                            d="M156.608 487.8592c1.156267-1.137067 2.648533-1.6224 3.918933-2.558933l306.666667-301.569067c13.195733-12.970667 34.586667-12.970667 47.781333 0 13.194667 12.978133 13.194667 34.013867 0 46.987733L263.3024 478.210133l579.2032 0c18.978133 0 34.362667 15.128533 34.362667 33.789867 0 18.6624-15.384533 33.793067-34.362667 33.793067L263.3024 545.793067l251.671467 247.486933c13.194667 12.971733 13.194667 34.010667 0 46.984533-13.194667 12.974933-34.586667 12.974933-47.781333 0l-306.666667-301.5616c-1.269333-0.939733-2.762667-1.421867-3.918933-2.562133-6.334933-6.2304-9.240533-14.340267-9.477333-22.5024C147.367467 502.200533 150.273067 494.090667 156.608 487.8592L156.608 487.8592zM156.608 487.8592"
                            p-id="3197"
                        />
                    </svg>
                    <div class="wu-page-header_title">{this.header ? this.header : <slot name="header" />}</div>
                </div>
                <div class="wu-page-header_content">{this.content ? this.content : <slot name="content" />}</div>
            </div>
        );
    }
}
