import { WuComponent } from '@wu-component/web-core-plus';
import "@wu-component/wu-progress/src/index.tsx";
export declare const documentIcon: () => any;
export declare const closeIcon: () => any;
export declare const circleIcon: () => any;
export declare const checkIcon: () => any;
export declare const deleteIcon: () => any;
declare type ListTypeEnum = 'text' | 'picture' | 'picture-card';
export declare class WuUpload extends WuComponent {
    disabled: boolean;
    multiple: boolean;
    action: string;
    name: string;
    drag: boolean;
    type: string;
    data: Record<any, any>;
    headers: Record<any, any>;
    withCredentials: boolean;
    accept: string;
    autoUpload: boolean;
    listType: ListTypeEnum;
    limit: Number;
    beforeUpload: Function;
    fileList: File[];
    uploadFiles: File[];
    private dragover;
    private reqs;
    draging: boolean;
    focusing: boolean;
    tempIndex: number;
    constructor();
    emitFile(files: File[]): {
        files: File[];
    };
    onChange(params: Record<any, any>): {
        [x: string]: any;
    };
    onProgress(params: Record<any, any>): {
        [x: string]: any;
    };
    onSuccess(params: Record<any, any>): {
        [x: string]: any;
    };
    onError(params: Record<any, any>): {
        [x: string]: any;
    };
    onPreview(params: Record<any, any>): {
        [x: string]: any;
    };
    onRemove(params: Record<any, any>): {
        [x: string]: any;
    };
    fileListChange(fileList: File[]): void;
    submit(): void;
    /**
     * 拖动中
     * @param e
     */
    dropHandlerFun(e: any): void;
    /**
     * 开始拖动
     * @param e
     */
    dropOverHandlerFun(e: MouseEvent): void;
    /**
     * 结束拖动
     * @param e
     */
    dropLeaveHandlerFun(e: MouseEvent): void;
    /**
     * 拖拽
     */
    renderUploadDrag(): any;
    /**
     * 文件修改
     */
    handleChange(ev: MouseEvent): void;
    onExceedFun(files: File[], files2: File[]): void;
    onStartFun(rawFile: File): void;
    /**
     * 文件上传
     * @param files
     * @param flag
     */
    uploadFilesFun(files: File[], flag?: boolean): void;
    beforeUploadFun(file: File): any;
    abort(file: any): void;
    onRemoveFun(file: any, raw: File): void;
    upload(rawFile: File): void;
    private httpRequest;
    onProgressFun(ev: MouseEvent, rawFile: File): void;
    onSuccessFun(res: any, rawFile: File): void;
    onErrorFun(err: any, rawFile: File): void;
    getFile(rawFile: any): any;
    post(rawFile: File): void;
    handleClick(): void;
    handleKeydown(e: any): void;
    /**
     * 文件上传
     */
    renderUpload(): any;
    /**
     * 文件列表删除
     * @param e
     * @param file
     * @param index
     */
    fileListKeydownDelete(e: MouseEvent, file: File, index: number): void;
    fileListFocus(e: MouseEvent, file: File, index: number): void;
    fileListBlur(e: MouseEvent, file: File, index: number): void;
    fileListClick(e: MouseEvent, file: File, index: number): void;
    fileListItemClick(e: MouseEvent, file: File, index: number): void;
    renderFileList(): any;
    parsePercentage(val: any): number;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
