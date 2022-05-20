import { Component, h, Inject, OnConnected, Prop } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-breadcrumb-item',
    css: css,
})
export class WuBreadcrumbItem extends HTMLElement implements OnConnected {
    private separator: string = '';
    private separatorClass: string = '';

    public update!: () => void;

    constructor() {
        super();
    }

    @Inject("wuBreadcrumbRef")
    public wuBreadcrumb;

    @Prop({ default: '', type: String })
    public to: string;

    public render(_renderProps = {}, _store = {}) {
        return (
            <span class="wu-breadcrumb_item">
                <span class={`wu-breadcrumb_inner ${this.to? "is-link": ""}`}  id="link" role="link">
                    <slot />
                </span>
                {
                    this.separatorClass ? <i class={`wu-breadcrumb_separator ${this.separatorClass}`} /> :
                    <span class="wu-breadcrumb_separator" role="presentation">{this.separator}</span>
                }
            </span>
        );
    }

    public connected(shadowRoot: ShadowRoot): any {
        this.separator = this.wuBreadcrumb.separator;
        this.separatorClass = this.wuBreadcrumb.separatorClass;
        const link: HTMLElement = this.shadowRoot.querySelector("#link");
        link.addEventListener("click", (e: Event) => {
            this.wuBreadcrumb.breadcrumbClick(this.to, e);
        })
        this.update();
    }
}
