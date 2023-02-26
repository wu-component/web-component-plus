import { Component, h, Prop, WuComponent, Emit, OnBeforeRender } from '@wu-component/web-core-plus';
import css from './index.scss';
import { extractClass } from "@wu-component/common";

@Component({
    name: 'wu-plus-pagination',
    css: css,
})
export class WuPagination extends WuComponent implements OnBeforeRender{
    constructor() {
        super();
    }
    @Prop({ default: 0, type: Number })
    public total = 0;

    @Prop({ default: 10, type: Number })
    public pageSize = 10;

    @Prop({ default: 5, type: Number })
    public numDisplay = 5;

    @Prop({ default: 0, type: Number })
    public currentPage = 0;

    @Prop({ default: 3, type: Number })
    public numEdge = 3;

    @Prop({ default: '#', type: String })
    public linkTo =  '#';

    @Prop({ default: 'Prev', type: String })
    public prevText = 'Prev';

    @Prop({ default: 'Next', type: String })
    public nextText = 'Next';

    @Prop({ default: '...', type: String })
    public ellipseText =  '...';

    @Prop({ default: true, type: Boolean })
    public prevShow = true;

    @Prop({ default: true, type: Boolean })
    public nextShow = true;

    public pageNum = 0;

    public override beforeRender() {
        this.pageNum = Math.ceil(this.total / this.pageSize);
    }

    @Emit('change')
    public change(index: number) {
        return {
            currentPage: this.currentPage + 1,
            pageSize: this.pageSize,
            total: this.total
        };
    }

    private goto(index: number) {
        this.currentPage = index;
        this.update();
        this.change(index);
    }

    private getInterval() {
        const neHalf = Math.ceil(this.numDisplay / 2);
        const upperLimit = this.pageNum - this.numDisplay;
        const start =
            this.currentPage > neHalf
                ? Math.max(Math.min(this.currentPage - neHalf, upperLimit), 0)
                : 0;
        const end =
            this.currentPage > neHalf
                ? Math.min(this.currentPage + neHalf, this.pageNum)
                : Math.min(this.numDisplay, this.pageNum);
        return [ start, end ];
    }

    private getPrev() {
        if (this.currentPage === 0) {
            return (
                <button type="button" class="btn-prev" disabled={true}>
                    <svg
                        viewBox="64 64 896 896"
                        class=""
                        data-icon="left"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
                    </svg>
                </button>
            );
        }

        return (
            <button
                type="button"
                class="btn-prev"
                // @ts-ignore
                onclick={e => {
                    this.goto(this.currentPage - 1);
                }}
            >
                <svg
                    viewBox="64 64 896 896"
                    class=""
                    data-icon="left"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
                </svg>
            </button>
        );
    }

    private getNext() {
        if (this.currentPage === this.pageNum - 1) {
            return (
                <button type="button" class="btn-next" disabled={true}>
                    <svg
                        viewBox="64 64 896 896"
                        class=""
                        data-icon="right"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" />
                    </svg>
                </button>
            );
        }

        return (
            <button
                type="button"
                class="btn-next"
                // @ts-ignore
                onclick={e => {
                    this.goto(this.currentPage + 1);
                }}
            >
                <svg
                    viewBox="64 64 896 896"
                    class=""
                    data-icon="right"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" />
                </svg>
            </button>
        );
    }

    private getItem(pageIndex, text) {
        if (this.currentPage === pageIndex) {
            return <li class="number active"><button>{text}</button></li>;
        }
        return (
            <li
                class="number"
                // @ts-ignore
                onclick={e => {
                    this.goto(pageIndex);
                }}
            >
                <button  >{text}</button>
            </li>
        );
    }

    public override render(_renderProps = {}, _store = {}) {
        const arr = [],
            interval = this.getInterval();
        if (interval[0] > 0 && this.numEdge > 0) {
            const end = Math.min(this.numEdge, interval[0]);
            for (let i = 0; i < end; i++) {
                arr.push(this.getItem(i, i + 1));
            }
            if (this.numEdge < interval[0] && this.ellipseText) {
                arr.push(<li class="wu-icon more btn-quicknext wu-icon-more" />);
            }
        }

        for (let i = interval[0]; i < interval[1]; i++) {
            arr.push(this.getItem(i, i + 1));
        }

        if (interval[1] < this.pageNum && this.numEdge > 0) {
            if (this.pageNum - this.numEdge > interval[1] && this.ellipseText) {
                arr.push(<li class="wu-icon more btn-quicknext wu-icon-more" />);
            }
            const begin = Math.max(this.pageNum - this.numEdge, interval[1]);
            for (let i = begin; i < this.pageNum; i++) {
                arr.push(this.getItem(i, i + 1));
            }
        }
        return (
            <div {...extractClass(this, 'wu-pagination is-background', {})}>
                <ul class="wu-pager">
                    <li key="prev"> {this.prevShow && this.getPrev()}{' '}</li>
                    {arr.map(p => {
                        return p;
                    })}
                    <li key="next"> {this.nextShow && this.getNext()}</li>
                </ul>{' '}

            </div>
        );
    }
}
