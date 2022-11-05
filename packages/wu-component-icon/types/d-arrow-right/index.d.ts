export default class WuIconDArrowRight extends HTMLElement {
    icon: any;
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    upgradeProperty(): void;
    getFontSize(): string;
    get size(): string;
    get color(): string;
    set size(value: string);
    set color(value: string);
}
