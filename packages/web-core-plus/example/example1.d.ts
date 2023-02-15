import { WuComponent, OnConnected } from "./";
export declare class TestComponent1 extends WuComponent implements OnConnected {
    attr: string;
    count: string;
    updateCount(): void;
    updateAttr(): void;
    testFun(): {
        value: string;
    };
    connected(shadowRoot: ShadowRoot): void;
    attrWatchChange(val: string, old: string): void;
    childUpdate(attr: string): string;
    render(): any;
}
