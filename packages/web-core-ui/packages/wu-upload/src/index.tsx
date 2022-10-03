import { Component, Emit, h, Prop, State, Watch, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import { extractClass } from "@wu-component/common";
import ajax from './lib/ajax';
import "../../../packages/wu-progress/src/index.tsx";
export const documentIcon = () => {
    return (
        <svg t="1662962104388"  className="icon wu-icon-document" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="1793" width="14" height="14">
            <path
                d="M873.8 360.2c-2.8-3.5-6.1-6.6-10-8.9L552 74.8H236c-50.4 0-91.3 41-91.3 91.3v689.3c0 50.4 41 91.3 91.3 91.3h554c50.4 0 91.3-41 91.3-91.3V366.9l-7.5-6.7zM561 179l188.5 167.2H580.4c-10.5 0-19.3-8.9-19.3-19.3V179z m229 695.8H236c-10.5 0-19.3-8.9-19.3-19.3V166.1c0-10.5 8.9-19.3 19.3-19.3h253v180.1c0 50.4 41 91.3 91.3 91.3h229v437.2c0.1 10.5-8.8 19.4-19.3 19.4z"
                p-id="1794"></path>
            <path
                d="M332.8 398.2h86.1c19.9 0 36-16.1 36-36s-16.1-36-36-36h-86.1c-19.9 0-36 16.1-36 36s16.1 36 36 36zM661.2 501.9H332.8c-19.9 0-36 16.1-36 36s16.1 36 36 36h328.3c19.9 0 36-16.1 36-36s-16.1-36-35.9-36zM661.2 677.6H332.8c-19.9 0-36 16.1-36 36s16.1 36 36 36h328.3c19.9 0 36-16.1 36-36s-16.1-36-35.9-36z"
                p-id="1795"></path>
        </svg>
    );
};

export const closeIcon = () => {
    return (
        <svg t="1662965190602" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="2844" width="14" height="14">
            <path
                d="M556.8 512l272-272c12.8-12.8 12.8-33.6 0-44.8-12.8-12.8-33.6-12.8-44.8 0l-272 272-272-272c-12.8-12.8-33.6-12.8-44.8 0-12.8 12.8-12.8 33.6 0 44.8l272 272-272 272c-12.8 12.8-12.8 33.6 0 44.8 12.8 12.8 33.6 12.8 44.8 0l272-272 272 272c12.8 12.8 33.6 12.8 44.8 0 12.8-12.8 12.8-33.6 0-44.8l-272-272z"
                p-id="2845"></path>
        </svg>
    );
};

export const circleIcon = () => {
    return (
        <svg t="1662977626201" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="3363" width="14" height="14">
            <path
                d="M512 896c108.672-2.688 199.168-40.192 271.488-112.512C855.808 711.168 893.312 620.672 896 512c-2.688-108.672-40.192-199.168-112.512-271.488C711.168 168.192 620.672 130.688 512 128c-108.672 2.688-199.168 40.192-271.488 112.512C168.192 312.874667 130.688 403.370667 128 512c2.688 108.672 40.192 199.168 112.512 271.488C312.874667 855.808 403.370667 893.312 512 896z m0 64c-126.677333-3.328-232.192-47.146667-316.501333-131.498667C111.146667 744.192 67.328 638.72 64 512c3.328-126.677333 47.146667-232.192 131.498667-316.501333C279.808 111.146667 385.28 67.328 512 64c126.677333 3.328 232.192 47.146667 316.501333 131.498667C912.853333 279.808 956.672 385.28 960 512c-3.328 126.677333-47.146667 232.192-131.498667 316.501333C744.192 912.853333 638.72 956.672 512 960z m232.96-599.04a33.450667 33.450667 0 0 1 23.04-8.96 30.72 30.72 0 0 1 22.485333 9.514667 30.72 30.72 0 0 1 9.514667 22.485333c0 8.661333-2.986667 16.341333-8.96 23.04l-288 288a33.450667 33.450667 0 0 1-23.04 8.96 33.450667 33.450667 0 0 1-23.04-8.96l-160-160a33.450667 33.450667 0 0 1-8.96-23.04c0-8.661333 3.157333-16.170667 9.514667-22.485333a30.762667 30.762667 0 0 1 22.485333-9.514667c8.661333 0 16.341333 2.986667 23.04 8.96l136.96 138.026667 264.96-265.984z"
                p-id="3364"></path>
        </svg>
    );
};

export const checkIcon  =() => {
    return (
        <svg t="1662977758229" className="icon wu-icon-check" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="4288" width="18" height="18">
            <path
                d="M887.904 298.208c-12.864-12.064-33.152-11.488-45.216 1.408L415.936 753.984l-233.12-229.696C170.208 511.872 149.952 512 137.536 524.608c-12.416 12.576-12.256 32.864 0.352 45.248l256.48 252.672c0.096 0.096 0.224 0.128 0.32 0.224 0.096 0.096 0.128 0.224 0.224 0.32 2.016 1.92 4.448 3.008 6.784 4.288 1.152 0.672 2.144 1.664 3.36 2.144 3.776 1.472 7.776 2.24 11.744 2.24 4.192 0 8.384-0.832 12.288-2.496 1.312-0.544 2.336-1.664 3.552-2.368 2.4-1.408 4.896-2.592 6.944-4.672 0.096-0.096 0.128-0.256 0.224-0.352 0.064-0.096 0.192-0.128 0.288-0.224l449.184-478.208C901.44 330.592 900.768 310.336 887.904 298.208z"
                p-id="4289"></path>
        </svg>
    );
};

export const deleteIcon = () => {
    return (
        <svg t="1662983095297" className="icon delete-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="5214" width="24" height="24">
            <path
                d="M656 288h144a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16h-48v496a16 16 0 0 1-16 16H288a16 16 0 0 1-16-16V336h-48a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h144v-80a16 16 0 0 1 16-16h256a16 16 0 0 1 16 16v80z m-48 0v-48H416v48h192z m32 48H320v464h384V336h-64z m-208 112h16a16 16 0 0 1 16 16v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V464a16 16 0 0 1 16-16z m144 0h16a16 16 0 0 1 16 16v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V464a16 16 0 0 1 16-16z"
                p-id="5215"></path>
        </svg>
    );
};

type ListTypeEnum = 'text' | 'picture' | 'picture-card'


@Component({
    name: 'wu-plus-upload',
    css: css,
})
export class WuUpload extends WuComponent {

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Prop({ default: false, type: Boolean })
    public multiple: boolean;

    @Prop({ default: '', type: String })
    public action: string;

    @Prop({ default: 'file', type: String })
    public name: string;

    @Prop({ default: false, type: Boolean })
    public drag: boolean;

    @Prop({ default: '', type: String })
    public type: string;

    @Prop({ default: {}, type: Object })
    public data: Record<any, any>;

    @Prop({ default: {}, type: Object })
    public headers: Record<any, any>;

    @Prop({ default: false, type: Boolean })
    public withCredentials: boolean;

    @Prop({ default: '', type: String })
    public accept: string;

    @Prop({ default: false, type: Boolean })
    public autoUpload: boolean;

    @Prop({ default: '', type: String })
    public listType: ListTypeEnum;

    @Prop({ default: 5, type: Number })
    public limit: Number;

    @Prop({ type: Function })
    public beforeUpload: Function;

    @Prop({ default: [], type: Array })
    public fileList: File[] = [];

    public uploadFiles: File[] = [];

    // @State({ default: false, type: Boolean })
    private dragover: any;

    private reqs: any = {};

    public draging = false;

    @State({ default: false, type: Boolean })
    public focusing = false;

    public tempIndex = 1

    constructor() {
        super();
        this.tempIndex = 1;
    }

    @Emit("file")
    public emitFile(files: File[]) {
        this.uploadFilesFun(files);
        return {
            files
        };
    }

    @Emit("change")
    public onChange(params: Record<any, any>) {
        this.update();
        return {
            ...params
        };
    }

    @Emit("progress")
    public onProgress(params: Record<any, any>) {
        return {
            ...params
        };
    }

    @Emit("success")
    public onSuccess(params: Record<any, any>) {
        return {
            ...params
        };
    }

    @Emit("error")
    public onError(params: Record<any, any>) {
        return {
            ...params
        };
    }

    @Emit("preview")
    public onPreview(params: Record<any, any>) {
        return {
            ...params
        };
    }
    @Emit("remove")
    public onRemove(params: Record<any, any>) {
        return {
            ...params
        };
    }

    @Watch("fileList")
    public fileListChange(fileList: File[]) {
        this.uploadFiles = fileList.map((item: any) => {
            item.uid = item.uid || (Date.now() + this.tempIndex++);
            item.status = item.status || 'success';

            return item;
        });
    }

    public submit() {
        const files = this.uploadFiles;
        if (this.limit && files.length > this.limit) {
            this.onExceedFun && this.onExceedFun(files, files);
            return;
        }
        let postFiles = Array.prototype.slice.call(files);
        if (!this.multiple) { postFiles = postFiles.slice(0, 1); }

        if (postFiles.length === 0) { return; }
        postFiles
            .filter(file => file.status === 'ready')
            .forEach(rawFile => {
            this.upload(rawFile.raw);
        });
    }

    /**
     * 拖动中
     * @param e
     */
    public dropHandlerFun(e: any) {
        e.preventDefault();
        if (this.disabled) return;
        const accept = this.accept;
        this.dragover = false;
        if (!accept) {
            this.emitFile((e.dataTransfer.files) as File[]);
            return;
        }
        const files: File[] = [].slice.call(e.dataTransfer.files).filter(file => {
            const { type, name } = file;
            const extension = name.indexOf('.') > -1
                ? `.${ name.split('.').pop() }`
                : '';
            const baseType = type.replace(/\/.*$/, '');
            return accept.split(',')
                .map(type => type.trim())
                .filter(type => type)
                .some(acceptedType => {
                    if (/\..+$/.test(acceptedType)) {
                        return extension === acceptedType;
                    }
                    if (/\/\*$/.test(acceptedType)) {
                        return baseType === acceptedType.replace(/\/\*$/, '');
                    }
                    if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
                        return type === acceptedType;
                    }
                    return false;
                });
        });
        this.emitFile(files);

    }

    /**
     * 开始拖动
     * @param e
     */
    public dropOverHandlerFun(e: MouseEvent) {
        e.preventDefault();
        if (!this.disabled) {
            this.dragover = true;
            this.update();
        }
    }

    /**
     * 结束拖动
     * @param e
     */
    public dropLeaveHandlerFun(e: MouseEvent) {
        e.preventDefault();
        this.dragover = false;
        this.update();
    }

    /**
     * 拖拽
     */
    public renderUploadDrag() {
        return (
            <div
                {...extractClass({}, 'wu-upload-dragger', {
                    ['is-dragover']: this.dragover,
                })}
                ondrop={(e) => this.dropHandlerFun(e)}
                ondragover={(e) => this.dropOverHandlerFun(e)}
                ondragleave={(e) => this.dropLeaveHandlerFun(e)}
            >
                <slot></slot>
            </div>
        );
    }

    /**
     * 文件修改
     */
    public handleChange(ev: MouseEvent) {
        const files: File[] = (ev.target as any)?.files as File[];
        if (!files) return;
        this.uploadFilesFun(files);
    }

    public onExceedFun(files: File[], files2: File[]) {
        // onExceed
    }

    public onStartFun(rawFile: File) {
        // onStart
        (rawFile as any).uid = Date.now() + this.tempIndex++;
        const file = {
            status: 'ready',
            name: rawFile.name,
            size: rawFile.size,
            percentage: 0,
            uid: (rawFile as any).uid,
            raw: rawFile
        } as any;

        if (this.listType === 'picture-card' || this.listType === 'picture') {
            try {
                file.url = URL.createObjectURL(rawFile);
            } catch (err) {
                console.error('[Element Error][Upload]', err);
                return;
            }
        }

        this.uploadFiles.push(file);
        this.onChange({ file, fileList: this.uploadFiles });
    }

    /**
     * 文件上传
     * @param files
     * @param flag
     */
    public uploadFilesFun(files: File[], flag = false) {
        if (flag === true) {
            if (this.limit && files.length > this.limit) {
                this.onExceedFun && this.onExceedFun(files, this.uploadFiles);
                return;
            }
        }else {
            if (this.limit && this.uploadFiles.length + files.length > this.limit) {
                this.onExceedFun && this.onExceedFun(files, this.uploadFiles);
                return;
            }
        }

        let postFiles = Array.prototype.slice.call(files);
        if (!this.multiple) { postFiles = postFiles.slice(0, 1); }

        if (postFiles.length === 0) { return; }
        postFiles.forEach(rawFile => {
            this.onStartFun(rawFile);
            if (this.autoUpload) this.upload(rawFile);
        });
    }

    public beforeUploadFun(file: File): any {
        return new Promise(resolve => {
            if (typeof this.beforeUpload === 'function') {
                const before = this.beforeUpload();
                if (before && before.then) {
                    before.then((res) => {
                        resolve(res);
                    });
                }else {
                    resolve(before);
                }
            }
            if (!this.beforeUpload) {
                resolve(true);
            }
        });

    }

    public abort(file: any) {

    }

    public onRemoveFun(file: any, raw: File) {
        if (raw) {
            file = this.getFile(raw);
        }
        const doRemove = () => {
            this.abort(file);
            const fileList = this.uploadFiles;
            fileList.splice(fileList.indexOf(file), 1);
            this.onRemove({ file, fileList: fileList });
        };
        doRemove();
        this.update();
    }

    public upload(rawFile: File) {
        // this.$refs.input.value = null;
        const input = this.shadowRoot.querySelector("#uploadInput");
        if (input) {
            input.value = null;
        }
        const before = this.beforeUploadFun(rawFile);
        if (before && before.then) {
            before.then(processedFile => {
                const fileType = Object.prototype.toString.call(processedFile);

                if (fileType === '[object File]' || fileType === '[object Blob]') {
                    if (fileType === '[object Blob]') {
                        processedFile = new File([ processedFile ], rawFile.name, {
                            type: rawFile.type
                        });
                    }
                    for (const p in rawFile) {
                        if (rawFile.hasOwnProperty(p)) {
                            processedFile[p] = rawFile[p];
                        }
                    }
                    this.post(processedFile);
                } else {
                    this.post(rawFile);
                }
            }, () => {
                this.onRemoveFun(null, rawFile);
            });
        } else if (before !== false) {
            this.post(rawFile);
        } else {
            this.onRemoveFun(null, rawFile);
        }
    }

    private httpRequest(options: any) {
        return ajax(options);
    }

    public onProgressFun(ev: MouseEvent, rawFile: File) {
        //onProgress
        const file = this.getFile(rawFile);
        this.onProgress({ file, fileList: this.uploadFiles, event: ev });
        file.status = 'uploading';
        file.percentage = (ev as any).percent || 0;
    }

    public onSuccessFun(res: any, rawFile: File) {
        const file = this.getFile(rawFile);
        if (file) {
            file.status = 'success';
            file.response = res;
            this.onSuccess({ response: res, file, fileList: this.uploadFiles });
            this.onChange({ file, fileList: this.uploadFiles });
        }
    }

    public onErrorFun(err: any, rawFile: File) {
        const file = this.getFile(rawFile);
        const fileList = this.uploadFiles;
        file.status = 'fail';
        fileList.splice(fileList.indexOf(file), 1);
        this.onError({ err, file, fileList: this.uploadFiles });
        this.onChange({ file, fileList: this.uploadFiles });
    }

    public getFile(rawFile: any): any {
        const fileList = this.uploadFiles;
        let target;
        fileList.every(item => {
            target = rawFile.uid === (item as any).uid ? item : null;
            return !target;
        });
        return target;
    }

    public post(rawFile: File) {
        const { uid } = rawFile as any;
        const options = {
            headers: this.headers,
            withCredentials: this.withCredentials,
            file: rawFile,
            data: this.data,
            filename: this.name,
            action: this.action,
            onProgress: e => {
                this.onProgressFun(e, rawFile);
            },
            onSuccess: res => {
                this.onSuccessFun(res, rawFile);
                delete this.reqs[uid];
            },
            onError: err => {
                this.onErrorFun(err, rawFile);
                delete this.reqs[uid];
            }
        };
        const req: any = this.httpRequest(options);
        this.reqs[uid] = req;
        if (req && req.then) {
            req.then(options.onSuccess, options.onError);
        }
    }

    public handleClick() {
        if (!this.disabled) {
            const input = this.shadowRoot.querySelector("#uploadInput");
            if (input) {
                input.value = null;
                input.click();
            }
        }
    }

    public handleKeydown(e) {
        if (e.target !== e.currentTarget) return;
        if (e.keyCode === 13 || e.keyCode === 32) {
            this.handleClick();
        }
    }

    /**
     * 文件上传
     */
    public renderUpload() {
        return (
            <div
                {...extractClass({}, 'wu-upload', {
                    ['wu-upload-'+this.listType]: true,
                })}
                onclick={() => this.handleClick()}
                onkeydown={(e) => this.handleKeydown(e)}
                tabIndex="0">
                {
                    this.drag ? this.renderUploadDrag() : <slot></slot>
                }
                <input
                    class="wu-upload_input"
                    type="file"
                    id="uploadInput"
                    name={this.name}
                    onchange={(e) => this.handleChange(e)}
                    multiple={this.multiple}
                    accept={this.accept}
                ></input>
            </div>
        );

    }

    /**
     * 文件列表删除
     * @param e
     * @param file
     * @param index
     */
    public fileListKeydownDelete(e: MouseEvent, file: File, index: number) {
        e.stopPropagation();
        if (this.disabled) {
            return;
        }
        this.onRemoveFun(null, file);
        // $emit('remove', file)
    }

    public fileListFocus(e: MouseEvent, file: File, index: number) {
        //this.focusing = true;
    }

    public fileListBlur(e: MouseEvent, file: File, index: number) {
        //this.focusing = false;
    }

    public fileListClick(e: MouseEvent, file: File, index: number) {
        //this.focusing = false;
    }

    public fileListItemClick(e: MouseEvent, file: File, index: number) {
        e.stopPropagation();
        // focusing = false
    }

    public renderFileList() {
        return (
            <ul tag="ul"
                {...extractClass({}, 'wu-upload-list', {
                    ['wu-upload-list-'+this.listType]: !!this.listType,
                    ['is-disabled']: !this.disabled,
                })}
            >
                {
                    this.uploadFiles.map((file: any, index: number) => {
                        return (
                            <li
                                {...extractClass({}, 'wu-upload-list_item', {
                                    ['wu-upload-list-'+this.listType]: !!this.listType,
                                    ['is-' + file.status]: file.status,
                                    ['focusing']: this.focusing,
                                })}
                                tabindex="0"
                                onkeydown={(e) => this.fileListKeydownDelete(e, file, index)}
                               /* onfocus={(e) => this.fileListFocus(e, file, index)}
                                onblur={(e) => this.fileListBlur(e, file, index)}*/
                                onclick={(e) => this.fileListClick(e, file, index)}
                            >
                                {
                                    file.status !== 'uploading' && [ 'picture-card', 'picture' ].indexOf(this.listType) > -1? (
                                        <img
                                            class="wu-upload-list_item-thumbnail"
                                            src={file.url} alt=""
                                        ></img>
                                    ):null
                                }

                                <a class="wu-upload-list_item-name" onclick={(e) => this.fileListItemClick(e, file, index)}>
                                    {/*<i class="el-icon-document"></i>{file.name}*/}
                                    {documentIcon()}{file.name}
                                </a>

                                <label class="wu-upload-list_item-status-label">
                                    <i
                                     {...extractClass({}, '', {
                                         ['wu-icon-upload-success']: true,
                                         ['wu-icon-circle-check']: this.listType === 'text',
                                         ['wu-icon-check']: [ 'picture-card', 'picture' ].indexOf(this.listType) > -1
                                     })}>
                                        {this.listType === 'text' ? circleIcon(): null}
                                        {[ 'picture-card', 'picture' ].indexOf(this.listType) > -1 ? checkIcon(): null}
                                    </i>
                                </label>
                                {
                                    ///*<i class="wu-icon-close" onclick={(e) => this.fileListKeydownDelete(e, file, index)}></i>*/
                                    !this.disabled && [ 'picture-card' ].indexOf(this.listType) < 0? (
                                        <i class="wu-icon-close" onclick={(e) => this.fileListKeydownDelete(e, file, index)}>
                                            {closeIcon()}
                                        </i>
                                    ): null
                                }
                                {
                                    !this.disabled? (
                                        <i class="wu-icon-close-tip"></i>
                                    ): null
                                }
                                {
                                    file.status === 'uploading'? (
                                        <wu-plus-progress
                                            id={"progress"+index}
                                            type={this.listType === 'picture-card' ? 'circle' : 'line'}
                                            stroke-width={this.listType === 'picture-card' ? 6 : 2}
                                            percentage={this.parsePercentage(file.percentage)}
                                        ></wu-plus-progress>
                                    ): null
                                }
                                {
                                     this.listType === 'picture-card'? (
                                         <span class="wu-upload-list_item-actions">
                                             {
                                                 this.listType === 'picture-card'? (
                                                     <span
                                                         class="wu-upload-list_item-preview"
                                                         onclick={(e) => this.onPreview({ e, file, index })}>
                                                        <i class="wu-icon-zoom-in"></i>
                                                    </span>
                                                 ): null
                                             }
                                             {
                                                 !this.disabled? (
                                                     <span
                                                         class="wu-upload-list_item-delete"
                                                         onclick={(e) => this.fileListKeydownDelete(e, file, index)}>
                                                        <i class="wu-icon-delete">
                                                            {
                                                                deleteIcon()
                                                            }
                                                        </i>
                                                     </span>
                                                 ): null
                                             }

                                         </span>
                                     ): null
                                }
                            </li>
                        );
                    })
                }
            </ul>
        );
    }

    public parsePercentage(val) {
        return parseInt(val, 10);
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div>
                {this.listType && this.listType === 'picture-card'? this.renderFileList(): null}
                {this.renderUpload()}
                <slot name="tip"></slot>
                { this.listType && this.listType !== 'picture-card' ? this.renderFileList() : ''}
            </div>
        );
    }
}
