## Comment 评论组件

该组件是基于 Waline 的一款评论组件，抹平了各框架的差异性，可如同 HTML 标签般直接使用。

详见 [Waline详见](https://waline.js.org/)

### 基础用法(未使用沙箱)

vue 中使用非 shadow 时出现了无法渲染的问题，所以使用时可以考虑使用 sandbox 渲染。

::: demo
```html
<template>
    <div style="width:90%; margin: 0 auto; ">
        <wu-code-sandbox @success="messageFun" id="codeSandbox" height="450px" is-before-refresh="false" style="width: 70%;height: 450px;overflow: scroll;"></wu-code-sandbox>
    </div>
</template>
<script>
    export default {
        mounted() {
            
        },
        methods: {
            messageFun() {
                // <!--<wu-waline-comment path="/component-plus/Complex/Comment.html" serverurl="https://whl47bsd.api.lncldglobal.com" style="&#45;&#45;waline-theme-color:red" dark="body.theme-dark" language="zh-CN" comment="true" pageview="true" emoji="['//unpkg.com/@waline/emojis@1.0.1/weibo', '//unpkg.com/@waline/emojis@1.0.1/bilibili']"></wu-waline-comment>-->
                this.$nextTick(() => {
                    const sandboxDom = document.querySelector("#codeSandbox");
                    const code = `
                    console.log(webCorePlus);
                    var div = document.createElement('div');
                    div.innerHTML = "<wu-waline-comment path='/component-plus/Complex/Comment.html' serverurl='https://whl47bsd.api.lncldglobal.com' style='waline-theme-color:red' dark='body.theme-dark' language='zh-CN' comment='true' pageview='true'></wu-waline-comment>"
                    document.body.appendChild(div);
                    `;
                    sandboxDom.sandbox.importScript("/js/core/index.iife.min.js").then((res) => {
                        console.log(res);
                        sandboxDom.sandbox.importScript("/js/comment/index.umd.js").then((res1) => {
                            console.log(res1);
                            sandboxDom.runCode(code, () => {
                                console.log("init success")
                            })
                        })
                    })
                })
            }
        }
    }
</script>
```
:::


### 基础用法(使用沙箱)

<a-alert message="沙箱模式下，有些问题，无法唤起表情选择器" type="error" show-icon />

::: demo
```html
<template>
    <div style="width:90%; margin: 0 auto; ">
        <wu-waline-comment-shadow path="/component-plus/Complex/Comment.html" serverurl="https://whl47bsd.api.lncldglobal.com" style="--waline-theme-color:red" dark="body.theme-dark" language="zh-CN" comment="true" pageview="true" emoji="['//unpkg.com/@waline/emojis@1.0.1/weibo', '//unpkg.com/@waline/emojis@1.0.1/bilibili']"></wu-waline-comment-shadow>
    </div>
</template>
<script>
</script>
```
:::

### Attributes
* serverurl 属性与 Waline 的 serverURL 稍有区别，需注意；
* 属性 key 不得采用驼峰命名； 
* 使用时属性传递必须使用字符类型(数组、对象均需要先序列化成字符)；

```ts
class Props {
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
    @Prop({default: window.location.pathname, type: String})
    public path: string;

    /**
     * 评论数统计
     *
     * Comment number support
     *
     * @default false
     */
    @Prop({default: false, type: Boolean})
    public comment: boolean;

    /**
     * 页面访问量统计
     *
     * Pageview number support
     *
     * @default false
     */
    @Prop({default: false, type: Boolean})
    public pageview: boolean;

    /**
     * Waline 的服务端地址, 此处属性与 Waline 的 serverURL 稍有区别，需注意
     *
     * Waline server address url
     */
    @Prop({default: '', type: String})
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
    @Prop({default: ['nick', 'mail', 'link'], type: Array})
    public meta?: WalineMeta[];

    /**
     * 设置**必填项**，默认昵称为匿名
     *
     * Set required fields, default anonymous with nickname
     *
     * @default []
     */
    @Prop({default: [], type: Array})
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
    @Prop({default: 0, type: Number})
    public wordLimit?: number | [number, number];

    /**
     * 评论列表分页，每页条数
     *
     * number of pages per page
     *
     * @default 10
     */
    @Prop({default: 10, type: Number})
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
    @Prop({default: 'zh-CN', type: String})
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
    @Prop({default: {}, type: Object})
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
    @Prop({default: 'auto', type: String})
    public dark?: string;

    /**
     * 设置表情包
     *
     * Set Emojis
     *
     * @default ['//unpkg.com/@waline/emojis@1.1.0/weibo']
     */
    @Prop({default: ['//unpkg.com/@waline/emojis@1.1.0/weibo'], type: Array})
    public emoji?: (string | WalineEmojiInfo)[] | false;

    /**
     * 设置搜索功能
     *
     * Customize Search feature
     */
    @Prop({default: false, type: Object})
    public search?: WalineSearchOptions | false;

    /**
     * 代码高亮
     *
     * Code highlighting
     */
    @Prop({default: false, type: Object})
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

    @Prop({default: false, type: Function})
    public imageUploader?: WalineImageUploader | false;

    /**
     * 自定义数学公式处理方法，用于预览。
     *
     * Custom math formula parse callback for preview.
     */
    @Prop({default: false, type: Function})
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
    @Prop({default: 'enable', type: String})
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
    @Prop({default: true, type: Boolean})
    public copyright?: boolean;

    /**
     * recaptcha v3 client key
     */
    @Prop({default: '', type: String})
    public recaptchaV3Key?: string;

    /**
     * reaction
     */
    @Prop({default: [], type: Array})
    public reaction?: string[] | boolean;
}
```

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
