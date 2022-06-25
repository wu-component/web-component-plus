declare const bigdata: {
    text: string;
    id: number;
    parentid: any;
    children: {
        text: string;
        id: number;
        parentid: number;
    }[];
}[];
declare const listdata: ({
    id: string;
    text: string;
    state: any;
    checked: boolean;
    attributes: {
        stopflag: number;
        objectcode: string;
        parents: string;
        showTitle?: undefined;
    };
    parentid: string;
    hasParent: boolean;
    hasChildren: boolean;
    icon: any;
    $level: number;
    $show: boolean;
    children?: undefined;
    $pId?: undefined;
} | {
    id: string;
    text: string;
    state: any;
    checked: boolean;
    attributes: {
        stopflag: number;
        objectcode: string;
        showTitle: string;
        parents: string;
    };
    children: any;
    parentid: string;
    hasParent: boolean;
    hasChildren: boolean;
    icon: any;
    $level: number;
    $show: boolean;
    $pId: string;
} | {
    id: string;
    text: string;
    state: any;
    checked: boolean;
    attributes: {
        stopflag: number;
        objectcode: string;
        showTitle: string;
        parents: string;
    };
    parentid: string;
    hasParent: boolean;
    hasChildren: boolean;
    icon: any;
    $level: number;
    $show: boolean;
    $pId: string;
    children?: undefined;
})[];
export { bigdata, listdata };
