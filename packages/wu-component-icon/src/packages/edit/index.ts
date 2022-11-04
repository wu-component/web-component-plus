import { Icon } from './Icon';
import style from '../style.css';
import { getFontSize } from '@/share';
export default class WuIconEdit extends HTMLElement {
    icon: any
    static get observedAttributes() {
        return [ 'size', 'color' ];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <style>
                ${style}
            </style>
            <svg class="icon" id="icon" aria-hidden="true" viewBox="0 0 1024 1024">
                ${Icon}
            </svg>
        `;
        this.icon = this.shadowRoot?.getElementById('icon')  as HTMLElement;
    }

    connectedCallback() {
        this.upgradeProperty();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'color') {
            this.icon.style.color = newValue;
        } else if (name === 'size') {
            const fontSize = this.getFontSize();
            this.icon.style.fontSize = `${fontSize}`;
        }
    }

    upgradeProperty() {
        this.size = this.size;
        this.color = this.color;
    }

    getFontSize() {
        return getFontSize(this.size);
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
}

if (!customElements.get('wu-icon-edit')) {
    customElements.define('wu-icon-edit',  WuIconEdit);
}
        