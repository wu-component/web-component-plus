import { WuComponent, OnConnected } from "./";
import "./example1.tsx";
export declare class TestComponent extends WuComponent implements OnConnected {
    attr: string;
    count: string;
    updateCount(): void;
    updateAttr(): void;
    testFun(): {
        value: string;
    };
    connected(shadowRoot: ShadowRoot): void;
    attrWatchChange(val: string, old: string): void;
    countChange(val: string, old: string): void;
    ssCss: string;
    render(): any;
}
