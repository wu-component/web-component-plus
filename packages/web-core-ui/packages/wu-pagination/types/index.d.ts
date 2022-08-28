import { WuComponent, OnBeforeRender } from '@wu-component/web-core-plus';
export declare class WuPagination extends WuComponent implements OnBeforeRender {
    constructor();
    total: number;
    pageSize: number;
    numDisplay: number;
    currentPage: number;
    numEdge: number;
    linkTo: string;
    prevText: string;
    nextText: string;
    ellipseText: string;
    prevShow: boolean;
    nextShow: boolean;
    pageNum: number;
    beforeRender(): void;
    change(index: number): {
        currentPage: number;
    };
    private goto;
    private getInterval;
    private getPrev;
    private getNext;
    private getItem;
    render(_renderProps?: {}, _store?: {}): any;
}
