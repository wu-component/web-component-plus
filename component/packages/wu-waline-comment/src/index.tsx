import { h, Prop, Component, WuComponent, OnConnected, OnDisConnected } from '@wu-component/web-core-plus';
import css from "./index.scss";
import { init } from "@waline/client/dist/waline.mjs";
import type { WalineInstance } from "@waline/client/dist/waline";
import  {
    WalineEmojiInfo,
    WalineHighlighter,
    WalineImageUploader,
    WalineMeta,
    WalineSearchOptions, WalineTexRenderer,
    WalineInitOptions,
    WalineLocale
} from "@waline/client/src/typings";

@Component({
    name: 'wu-waline-comment',
    css: css,
    is: "LightDom"
})
export class WuWalineComment extends WuComponent implements OnConnected, OnDisConnected {
    private waline!: WalineInstance;
    constructor() {
        super();
    }

    /**
     * 当前 _文章页_ 路径，用于区分不同的 _文章页_ ，以保证正确读取该 _文章页_ 下的评论列表
     *
     * 你可以将其设置为 `window.location.pathname`
     *
     * Article path id. Used to distinguish different _article pages_ to ensure loading the correct comment list under the _article page_.
     *
     * You can set it to `window.location.pathname`
     *
     * @default window.location.pathname
     */
    @Prop({ default: window.location.pathname, type: String })
    public path: string;

    /**
     * 评论数统计
     *
     * Comment number support
     *
     * @default false
     */
    @Prop({ default: false, type: Boolean })
    public comment: boolean;

    /**
     * 页面访问量统计
     *
     * Pageview number support
     *
     * @default false
     */
    @Prop({ default: false, type: Boolean })
    public pageview: boolean;

    /**
     * Waline 的服务端地址
     *
     * Waline server address url
     */
    @Prop({ default: '', type: String })
    public serverurl: string;

    /**
     * 评论者相关属性
     *
     * `Meta` 可选值: `'nick'`, `'mail'`, `'link'`
     *
     * Reviewer attributes.
     *
     * Optional values for `Meta`: `'nick'`, `'mail'`, `'link'`
     *
     * @default ['nick', 'mail', 'link']
     */
    @Prop({ default: [ 'nick', 'mail', 'link' ], type: Array })
    public meta?: WalineMeta[];

    /**
     * 设置**必填项**，默认昵称为匿名
     *
     * Set required fields, default anonymous with nickname
     *
     * @default []
     */
    @Prop({ default: [], type: Array })
    public requiredMeta?: WalineMeta[];

    /**
     * 评论字数限制。填入单个数字时为最大字数限制
     *
     * @more 设置为 `0` 时无限制
     *
     * Comment word s limit. When a single number is filled in, it 's the maximum number of comment words.
     *
     * @more No limit when set to `0`.
     *
     * @default 0
     */
    @Prop({ default: 0, type: Number })
    public wordLimit?: number | [number, number];

    /**
     * 评论列表分页，每页条数
     *
     * number of pages per page
     *
     * @default 10
     */
    @Prop({ default: 10, type: Number })
    public pageSize?: number;

    /**
     * Waline 显示语言
     *
     * 可选值:
     *
     * - `'zh'`
     * - `'zh-cn'`
     * - `'zh-CN'`
     * - `'zh-tw'`
     * - `'zh-TW'`
     * - `'en'`
     * - `'en-US'`
     * - `'en-us'`
     * - `'jp'`
     * - `'jp-jp'`
     * - `'jp-JP'`
     * - `'pt-br'`
     * - `'pt-BR'`
     * - `'ru'`
     * - `'ru-ru'`
     * - `'ru-RU'`
     *
     * Display language for waline
     *
     * Optional value:
     *
     * - `'zh'`
     * - `'zh-cn'`
     * - `'zh-CN'`
     * - `'zh-tw'`
     * - `'zh-TW'`
     * - `'en'`
     * - `'en-US'`
     * - `'en-us'`
     * - `'jp'`
     * - `'jp-jp'`
     * - `'jp-JP'`
     * - `'pt-br'`
     * - `'pt-BR'`
     * - `'ru'`
     * - `'ru-ru'`
     * - `'ru-RU'`
     *
     * @default 'zh-CN'
     */
    @Prop({ default: 'zh-CN', type: String })
    public language?: string;

    /**
     * 自定义 waline 语言显示
     *
     * @see [自定义语言](https://waline.js.org/client/i18n.html)
     *
     * Custom display language in waline
     *
     * @see [I18n](https://waline.js.org/en/client/i18n.html)
     */
    @Prop({ default: {}, type: Object })
    public locale?: Partial<WalineLocale>;

    /**
     * 是否启用暗黑模式适配
     *
     * @more 设置 `'auto'` 会根据设备暗黑模式自适应。填入 CSS 选择器会在对应选择器生效时启用夜间模式。
     *
     * Whether to enable darkmode support
     *
     * @more Setting `'auto'` will display darkmode due to device settings. Filling in CSS selector will enable darkmode only when the selector match waline ancestor nodes.
     */
    @Prop({ default: 'auto', type: String })
    public dark?: string;

    /**
     * 设置表情包
     *
     * Set Emojis
     *
     * @default ['//unpkg.com/@waline/emojis@1.1.0/weibo']
     */
    @Prop({ default: [ '//unpkg.com/@waline/emojis@1.1.0/weibo' ], type: Array })
    public emoji?: (string | WalineEmojiInfo)[] | false;

    /**
     * 设置搜索功能
     *
     * Customize Search feature
     */
    @Prop({ default: false, type: Object })
    public search?: WalineSearchOptions | false;

    /**
     * 代码高亮
     *
     * Code highlighting
     */
    @Prop({ default: false, type: Object })
    public highlighter?: WalineHighlighter | false;

    /**
     * 自定义图片上传方法，方便更好的存储图片
     *
     * 方法执行时会将图片对象传入。
     *
     * Custom image upload callback to manage picture by yourself.
     *
     * We will pass a picture file object when execute it.
     */

    @Prop({ default: false, type: Function })
    public imageUploader?: WalineImageUploader | false;

    /**
     * 自定义数学公式处理方法，用于预览。
     *
     * Custom math formula parse callback for preview.
     */
    @Prop({ default: false, type: Function })
    public texRenderer?: WalineTexRenderer | false;

    /**
     *
     * 登录模式状态，可选值:
     *
     * - `'enable'`: 启用登录 (默认)
     * - `'disable'`: 禁用登录，用户只能填写信息评论
     * - `'force'`: 强制登录，用户必须注册并登录才可发布评论
     *
     * Login mode status, optional values:
     *
     * - `'enable'`: enable login (default)
     * - `'disable'`: Login is disabled, users should fill in infomation to comment
     * - `'force'`: Forced login, users must login to comment
     *
     * @default 'enable'
     */
    @Prop({ default: 'enable', type: String })
    public login?: 'enable' | 'disable' | 'force';

    /**
     * 是否在页脚展示版权信息
     *
     * 为了支持 Waline，我们强烈建议你开启它
     *
     * Whether show copyright in footer
     *
     * We strongly recommended you to keep it on to support waline
     *
     * @default true
     */
    @Prop({ default: true, type: Boolean })
    public copyright?: boolean;

    /**
     * recaptcha v3 client key
     */
    @Prop({ default: '', type: String })
    public recaptchaV3Key?: string;

    /**
     * reaction
     */
    @Prop({ default: [], type: Array })
    public reaction?: string[] | boolean;


    public override connected(shadowRoot: ShadowRoot) {
        // @ts-ignore
        console.log(this.$reactive);
        // @ts-ignore
        console.log(this.$optiopns);
        // @ts-ignore
        const el: HTMLElement = this.$options.is === 'CustomWebComponent'? this.shadowRoot.querySelector('#waline-container'): this.querySelector('#waline-container');
        this.waline = init({
            el: el,
            // @ts-ignore
            ...this.$reactive || {},
            serverURL: this.serverurl,
            lang: this.language,
            emoji: [ 'https://unpkg.com/@waline/emojis@1.1.0/bilibili' ]
        });
    }

    public updateConfig(options: WalineInitOptions) {}

    public override disConnected() {
        this.waline?.destroy?.();
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div id="waline-container"></div>
        );
    }
}


@Component({
    name: 'wu-waline-comment-shadow',
    css: css,
    is: 'CustomWebComponent'
})
export class WuWalineCommentShadow extends WuComponent implements OnConnected, OnDisConnected {
    private waline!: WalineInstance;
    constructor() {
        super();
    }

    /**
     * 当前 _文章页_ 路径，用于区分不同的 _文章页_ ，以保证正确读取该 _文章页_ 下的评论列表
     *
     * 你可以将其设置为 `window.location.pathname`
     *
     * Article path id. Used to distinguish different _article pages_ to ensure loading the correct comment list under the _article page_.
     *
     * You can set it to `window.location.pathname`
     *
     * @default window.location.pathname
     */
    @Prop({ default: window.location.pathname, type: String })
    public path: string;

    /**
     * 评论数统计
     *
     * Comment number support
     *
     * @default false
     */
    @Prop({ default: false, type: Boolean })
    public comment: boolean;

    /**
     * 页面访问量统计
     *
     * Pageview number support
     *
     * @default false
     */
    @Prop({ default: false, type: Boolean })
    public pageview: boolean;

    /**
     * Waline 的服务端地址
     *
     * Waline server address url
     */
    @Prop({ default: '', type: String })
    public serverurl: string;

    /**
     * 评论者相关属性
     *
     * `Meta` 可选值: `'nick'`, `'mail'`, `'link'`
     *
     * Reviewer attributes.
     *
     * Optional values for `Meta`: `'nick'`, `'mail'`, `'link'`
     *
     * @default ['nick', 'mail', 'link']
     */
    @Prop({ default: [ 'nick', 'mail', 'link' ], type: Array })
    public meta?: WalineMeta[];

    /**
     * 设置**必填项**，默认昵称为匿名
     *
     * Set required fields, default anonymous with nickname
     *
     * @default []
     */
    @Prop({ default: [], type: Array })
    public requiredMeta?: WalineMeta[];

    /**
     * 评论字数限制。填入单个数字时为最大字数限制
     *
     * @more 设置为 `0` 时无限制
     *
     * Comment word s limit. When a single number is filled in, it 's the maximum number of comment words.
     *
     * @more No limit when set to `0`.
     *
     * @default 0
     */
    @Prop({ default: 0, type: Number })
    public wordLimit?: number | [number, number];

    /**
     * 评论列表分页，每页条数
     *
     * number of pages per page
     *
     * @default 10
     */
    @Prop({ default: 10, type: Number })
    public pageSize?: number;

    /**
     * Waline 显示语言
     *
     * 可选值:
     *
     * - `'zh'`
     * - `'zh-cn'`
     * - `'zh-CN'`
     * - `'zh-tw'`
     * - `'zh-TW'`
     * - `'en'`
     * - `'en-US'`
     * - `'en-us'`
     * - `'jp'`
     * - `'jp-jp'`
     * - `'jp-JP'`
     * - `'pt-br'`
     * - `'pt-BR'`
     * - `'ru'`
     * - `'ru-ru'`
     * - `'ru-RU'`
     *
     * Display language for waline
     *
     * Optional value:
     *
     * - `'zh'`
     * - `'zh-cn'`
     * - `'zh-CN'`
     * - `'zh-tw'`
     * - `'zh-TW'`
     * - `'en'`
     * - `'en-US'`
     * - `'en-us'`
     * - `'jp'`
     * - `'jp-jp'`
     * - `'jp-JP'`
     * - `'pt-br'`
     * - `'pt-BR'`
     * - `'ru'`
     * - `'ru-ru'`
     * - `'ru-RU'`
     *
     * @default 'zh-CN'
     */
    @Prop({ default: 'zh-CN', type: String })
    public language?: string;

    /**
     * 自定义 waline 语言显示
     *
     * @see [自定义语言](https://waline.js.org/client/i18n.html)
     *
     * Custom display language in waline
     *
     * @see [I18n](https://waline.js.org/en/client/i18n.html)
     */
    @Prop({ default: {}, type: Object })
    public locale?: Partial<WalineLocale>;

    /**
     * 是否启用暗黑模式适配
     *
     * @more 设置 `'auto'` 会根据设备暗黑模式自适应。填入 CSS 选择器会在对应选择器生效时启用夜间模式。
     *
     * Whether to enable darkmode support
     *
     * @more Setting `'auto'` will display darkmode due to device settings. Filling in CSS selector will enable darkmode only when the selector match waline ancestor nodes.
     */
    @Prop({ default: 'auto', type: String })
    public dark?: string;

    /**
     * 设置表情包
     *
     * Set Emojis
     *
     * @default ['//unpkg.com/@waline/emojis@1.1.0/weibo']
     */
    @Prop({ default: [ '//unpkg.com/@waline/emojis@1.1.0/weibo' ], type: Array })
    public emoji?: (string | WalineEmojiInfo)[] | false;

    /**
     * 设置搜索功能
     *
     * Customize Search feature
     */
    @Prop({ default: false, type: Object })
    public search?: WalineSearchOptions | false;

    /**
     * 代码高亮
     *
     * Code highlighting
     */
    @Prop({ default: false, type: Object })
    public highlighter?: WalineHighlighter | false;

    /**
     * 自定义图片上传方法，方便更好的存储图片
     *
     * 方法执行时会将图片对象传入。
     *
     * Custom image upload callback to manage picture by yourself.
     *
     * We will pass a picture file object when execute it.
     */

    @Prop({ default: false, type: Function })
    public imageUploader?: WalineImageUploader | false;

    /**
     * 自定义数学公式处理方法，用于预览。
     *
     * Custom math formula parse callback for preview.
     */
    @Prop({ default: false, type: Function })
    public texRenderer?: WalineTexRenderer | false;

    /**
     *
     * 登录模式状态，可选值:
     *
     * - `'enable'`: 启用登录 (默认)
     * - `'disable'`: 禁用登录，用户只能填写信息评论
     * - `'force'`: 强制登录，用户必须注册并登录才可发布评论
     *
     * Login mode status, optional values:
     *
     * - `'enable'`: enable login (default)
     * - `'disable'`: Login is disabled, users should fill in infomation to comment
     * - `'force'`: Forced login, users must login to comment
     *
     * @default 'enable'
     */
    @Prop({ default: 'enable', type: String })
    public login?: 'enable' | 'disable' | 'force';

    /**
     * 是否在页脚展示版权信息
     *
     * 为了支持 Waline，我们强烈建议你开启它
     *
     * Whether show copyright in footer
     *
     * We strongly recommended you to keep it on to support waline
     *
     * @default true
     */
    @Prop({ default: true, type: Boolean })
    public copyright?: boolean;

    /**
     * recaptcha v3 client key
     */
    @Prop({ default: '', type: String })
    public recaptchaV3Key?: string;

    /**
     * reaction
     */
    @Prop({ default: [], type: Array })
    public reaction?: string[] | boolean;


    public override connected(shadowRoot: ShadowRoot) {
        // @ts-ignore
        const el: HTMLElement = this.$options.is === 'CustomWebComponent'? this.shadowRoot.querySelector('#waline-container'): this.querySelector('#waline-container');
        this.waline = init({
            el: el,
            // @ts-ignore
            ...this.$reactive || {},
            serverURL: this.serverurl,
            lang: this.language,
            emoji: [ 'https://unpkg.com/@waline/emojis@1.1.0/bilibili' ]
        });
    }

    public updateConfig(options: WalineInitOptions) {}

    public override disConnected() {
        this.waline?.destroy?.();
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div id="waline-container"></div>
        );
    }
}


