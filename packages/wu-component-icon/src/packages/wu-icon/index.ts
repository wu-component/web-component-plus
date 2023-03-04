import { getFontSize } from '@/share';
export default class WuIcon extends HTMLElement {
    icon: any;
    static get observedAttributes() {
        return ['size', 'color', 'path', 'img'];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <style>
                :host {
                    font-size: inherit;
                    display: inline-block;
                    transition: 0.3s;
                }

                :host .icon {
                    display: block;
                    width: 1em;
                    height: 1em;
                    margin: auto;
                    fill: currentColor;
                    overflow: hidden;
                }
                .icon {
                    display: inline-block;
                }
                .img {
                    width: 100%;
                    display: block;
                    height: 100%;
                }
            </style>
            <div class="icon" id="icon" aria-hidden="true">
                ${this.getContent()}
            </div>

        `;
        this.icon = this.shadowRoot?.getElementById('icon') as HTMLElement;
    }

    connectedCallback() {
        this.upgradeProperty();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'color') {
            this.icon.style.color = newValue;
            this.icon.style.fill = newValue;
        }
        if (name === 'size') {
            const fontSize = this.getFontSize();
            this.icon.style.fontSize = `${fontSize}`;
            this.icon.style.width = `${fontSize}`;
        }
        if (name === 'path' || name === 'img') {
            this.icon.innerHTML = this.getContent();
        }
    }

    upgradeProperty() {
        this.size = this.size;
        this.color = this.color;
        this.path = this.path;
        this.img = this.img;
    }

    getFontSize() {
        return getFontSize(this.size);
    }

    public getContent() {
        if (this.path && this.path !== 'null') {
            return `
                <svg class="icon" id="icon" aria-hidden="true" viewBox="0 0 1024 1024">
                    ${this.path}
                </svg>
            `;
        }
        if (this.img && this.img !== 'null') {
            return `
                <img class="img" src="${this.img}" style="width: ${this.size};" />
            `;
        }
        return '';
    }

    get size() {
        return this.getAttribute('size') as string;
    }

    get color() {
        return this.getAttribute('color') as string;
    }

    set size(value: string) {
        this.setAttribute('size', value);
    }

    set color(value: string) {
        this.setAttribute('color', value);
    }

    set path(value: string) {
        this.setAttribute('path', value);
    }

    get path() {
        return this.getAttribute('path') as string;
    }

    set img(value: string) {
        this.setAttribute('img', value);
    }

    get img() {
        return this.getAttribute('img') as string;
    }
}

if (!customElements.get('wu-icon')) {
    customElements.define('wu-icon', WuIcon);
}
