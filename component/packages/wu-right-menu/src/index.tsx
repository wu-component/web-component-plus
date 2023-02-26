import "@wu-component/web-core-plus/dist/polyfill";
import { Menu, RightMenuCore } from "./core/RightMenu";
class WuRightMenu extends HTMLElement {
    icon: any
    private menu: RightMenuCore;
    static get observedAttributes() {
        return [ 'list' ];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <style>
                :host {

                }

                .menu {
                display: none;
                position: fixed;
                padding: 0;
                margin: 0;
                color: #444;
                background-color: #fff;
                border: 1px solid #eee;
                border-radius: 2px;
                list-style: none;
                font-size: 12px;
                cursor: default;
                user-select: none;
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                -o-user-select: none;
            }

            .menu li {
                position: relative;
                padding: 10px;
                min-width: 80px;
            }

            .menu li:hover {
                background-color: #efefef;
            }

            .menu li>ul {
                display: none;
                position: absolute;
                width: max-content;
                top: 0;
                left: 100%;
            }

            .menu li:hover>ul {
                display: inline-block;
            }

            .menu img {
                position: absolute;
                right: 10px;
                top: 9px;
                width: 20px;
                height: 20px;
            }
            </style>
            <slot></slot>
        `;
    }

    public connectedCallback() {
        this.upgradeProperty();
        this.menu = new RightMenuCore({
            el: this,
            menu: JSON.parse(this.list)
        });
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === "list" && oldValue !== newValue) {
            this.list = newValue;
        }
    }

    public disconnectedCallback() {
        this.menu.destroy();
    }

    public upgradeProperty() {
        this.list = this.list;
    }


    get list() {
        return this.getAttribute('list') || "[]";
    }

    set list(value: any) {
        this.setAttribute('list', typeof value !== "string"? JSON.stringify(value): value);
    }
}

if (!customElements.get('wu-right-menu')) {
    customElements.define('wu-right-menu',  WuRightMenu);
}
export { Menu, RightMenuCore, WuRightMenu };
