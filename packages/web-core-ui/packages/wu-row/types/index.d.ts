import { WuComponent } from '@wu-component/web-core-plus';
declare type JustifyEnums = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
declare type TypeEnums = 'flex' | '' | undefined;
declare type AlignEnums = 'top' | 'middle' | 'bottom';
export declare class WuRow extends WuComponent {
    constructor();
    name: string;
    gutter: number;
    type: TypeEnums;
    justify: JustifyEnums;
    align: AlignEnums;
    tag: string;
    tempInputTagName: string;
    get currentStyle(): any;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
