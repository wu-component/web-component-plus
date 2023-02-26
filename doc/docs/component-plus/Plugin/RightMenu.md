## RightMenu 右键菜单

WuRightMenu 是一个基于 WebComponent 的右键菜单插件，可以通过 HTML 标签以及 new 两种方式调用。

```bash
npm install "@wu-component/wu-right-menu"
// OR
yarn add "@wu-component/wu-right-menu"
```

### HTML 方式

```ts
import "@wu-component/wu-right-menu";
```

::: demo
```html
<template>
    <div class="button-container" style="display: flex; flex-wrap: wrap; align-items: center;justify-content: space-around;padding: 16px">
        <div style="width: 300px; height: 100px">
            <wu-right-menu @menuclick="menuclick" id="rateTest7" list='[{"name":"保存"},{"name":"设置","menu":[{"name":"首选项"},{"name":"快捷键"}]}]'>
                <span style="width: 120px;height: 48px;">右键该区域</span>
            </wu-right-menu>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            menuclick(event) {
                webUIPlus.Message.setOption({
                    message: `点击了${event.detail.name}`,
                    type: "success",
                    duration: 2000
                })
            }
        }
    }
</script>
<style>
</style>
```
:::

### Attributes

| 参数      | 说明              | 类型     | 可选值 | 默认值 |
|---------- |-----------------|--------|-----|-----|
| list | 菜单配置(需要序列化成字符串) | Menu[] | --  | []  |

### Event

| 方法名  | 说明     | 方法     | 
|--------|--------|---------- |
| menuclick | 单个菜单点击 | () => boolean |

### new 方式

```ts
import { RightMenuCore } from  "@wu-component/wu-right-menu";
import "@wu-component/wu-right-menu/dist/index.css";
```
new 的方式需要手动引入 css 文件。

::: demo
```html
<template>
    <div class="button-container" style="display: flex; flex-wrap: wrap; align-items: center;justify-content: space-around;padding: 16px">
        <div style="width: 300px; height: 100px" id="menu_content">
            <span style="width: 120px;height: 48px;" id="PluginTestRightMenu">右键该区域</span>
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {
            const menu = new window.RightMenuCore({
                el: document.querySelector("#PluginTestRightMenu"),
                menu: [{"name":"保存"},{"name":"设置","menu":[{"name":"首选项"},{"name":"快捷键"}]}],
                clickCallback: (event) => {
                    console.log(event);
                    webUIPlus.Message.setOption({
                        message: `点击了${event.name}`,
                        type: "success",
                        duration: 2000
                    })
                }
            })
        }
    }
</script>
<style>
    #menu_content .menu {
        display: none;
        position: fixed;
        padding: 0;
        margin: 0;
        color: #444;
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 2px;
        list-style: none;
        font-size: 12px;
        cursor: default;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
    }

    #menu_content .menu li {
        position: relative;
        padding: 10px;
        min-width: 80px;
        list-style-type: none;
    }

    #menu_content .menu li:hover {
        background-color: #efefef;
    }

    #menu_content .menu li>ul {
        display: none;
        position: absolute;
        width: max-content;
        top: 0;
        left: 100%;
        list-style-type: none;
    }

    #menu_content .menu li:hover>ul {
        display: inline-block;
        list-style-type: none;
    }

    #menu_content .menu img {
        position: absolute;
        right: 10px;
        top: 9px;
        width: 20px;
        height: 20px;
    }

</style>
```
:::

### Options

| 参数      | 说明       | 类型          | 可选值 | 默认值  |
|---------- |----------|-------------|-----|------|
| menu | 菜单配置     | Menu[]      | --  | []   |
| el | 点击触发的Dom | HTMLElement | --  | null |
| clickCallback | 点击回调     | Function    | --  | null |

