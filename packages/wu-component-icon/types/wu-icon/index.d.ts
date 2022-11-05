export default class WuIcon extends HTMLElement {
    icon: any;
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    upgradeProperty(): void;
    getFontSize(): string;
    getContent(): string;
    get size(): string;
    get color(): string;
    set size(value: string);
    set color(value: string);
    set path(value: string);
    get path(): string;
    set img(value: string);
    get img(): string;
}
