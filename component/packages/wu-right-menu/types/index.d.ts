import { Menu, RightMenuCore } from "./core/RightMenu";
declare class WuRightMenu extends HTMLElement {
    icon: any;
    private menu;
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    disconnectedCallback(): void;
    upgradeProperty(): void;
    get list(): any;
    set list(value: any);
}
export { Menu, RightMenuCore, WuRightMenu };
