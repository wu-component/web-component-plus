
## NavMenu 导航菜单

为中后台系统提供导航功能的菜单。

### 垂直

垂直导航菜单。

::: demo
```html
<template>
    <div style="display: flex;justify-content: center">
        <div style="width: 240px">
            <wu-plus-menu>
                <wu-plus-menu-item index="1">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">处理中心</span>
                    </div>
                </wu-plus-menu-item>
                <wu-plus-sub-menu index="2">
                    <div slot="title" style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span style="padding-left: 8px">
                            导航组
                        </span>
                    </div>
                    <wu-plus-menu-item index="5">系统配置</wu-plus-menu-item>
                    <wu-plus-menu-item index="6">用户中心</wu-plus-menu-item>
                </wu-plus-sub-menu>
                <wu-plus-menu-item index="12">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">用戶中心</span>
                    </div>
                </wu-plus-menu-item>
                <wu-plus-menu-item index="13">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">系統設置</span>
                    </div>
                </wu-plus-menu-item>
            </wu-plus-menu>
        </div>
        <div style="width: 240px; margin-left: 32px">
            <wu-plus-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" id="menuId1">
                <wu-plus-menu-item index="1">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">处理中心</span>
                    </div>
                </wu-plus-menu-item>
                <wu-plus-sub-menu index="2" disabled="false">
                    <div slot="title" style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span style="padding-left: 8px">
                            导航组
                        </span>
                    </div>
                    <wu-plus-menu-item index="5">系统配置</wu-plus-menu-item>
                    <wu-plus-menu-item index="6">用户中心</wu-plus-menu-item>
                </wu-plus-sub-menu>
                <wu-plus-menu-item index="12">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">用戶中心</span>
                    </div>
                </wu-plus-menu-item>
                <wu-plus-menu-item index="13" >
                <div style="display: flex;align-items: center">
                    <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                    <span slot="title" style="padding-left: 8px">系統設置</span>
                </div>
            </wu-plus-menu-item>
            </wu-plus-menu>
        </div>
        </div>
</template>
<script>
</script>
```
:::

### 水平

水平菜单导航

::: demo
```html
<template>
    <div style="display: flex;justify-content: center">
        <div style="width: 100%">
            <wu-plus-menu mode="horizontal">
                <wu-plus-menu-item index="1">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">处理中心</span>
                    </div>
                </wu-plus-menu-item>
                <wu-plus-sub-menu index="2" disabled="false">
                    <div slot="title" style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span style="padding-left: 8px">
                            导航组
                        </span>
                    </div>
                    <wu-plus-menu-item index="5">系统配置</wu-plus-menu-item>
                    <wu-plus-menu-item index="6">用户中心</wu-plus-menu-item>
                </wu-plus-sub-menu>
                <wu-plus-menu-item index="12">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">用戶中心</span>
                    </div>
                </wu-plus-menu-item>
                <wu-plus-menu-item index="13">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">系統設置</span>
                    </div>
                </wu-plus-menu-item>
            </wu-plus-menu>
        </div>
    </div>
</template>
<script>
</script>
```
:::


### 禁用

wu-plus-menu-item 和 wu-plus-sub-menu 可以通过 disabled 属性禁用菜单。

::: demo
```html
<template>
    <div style="display: flex;justify-content: center">
        <div style="width: 100%">
            <wu-plus-menu mode="horizontal">
                <wu-plus-menu-item index="1" disabled="true">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">处理中心</span>
                    </div>
                </wu-plus-menu-item>
                <wu-plus-sub-menu index="2" disabled="true">
                    <div slot="title" style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span style="padding-left: 8px">
                            导航组
                        </span>
                    </div>
                    <wu-plus-menu-item index="5">系统配置</wu-plus-menu-item>
                    <wu-plus-menu-item index="6">用户中心</wu-plus-menu-item>
                </wu-plus-sub-menu>
                <wu-plus-menu-item index="12">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">用戶中心</span>
                    </div>
                </wu-plus-menu-item>
                <wu-plus-menu-item index="13">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">系統設置</span>
                    </div>
                </wu-plus-menu-item>
            </wu-plus-menu>
        </div>
    </div>
</template>
<script>
</script>
```
:::


### 默认选中、默认展开


::: demo
```html
<template>
    <div style="display: flex;justify-content: center">
        <div style="width: 240px">
            <wu-plus-menu background-color="#545c64" text-color="#fff" default-active="1" default-openeds="['2']" active-text-color="#ffd04b" id="menuId1">
                <wu-plus-menu-item index="1">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">处理中心</span>
                    </div>
                </wu-plus-menu-item>
                <wu-plus-sub-menu index="2" disabled="false">
                    <div slot="title" style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span style="padding-left: 8px">
                        导航组
                    </span>
                    </div>
                    <wu-plus-menu-item index="5">系统配置</wu-plus-menu-item>
                    <wu-plus-menu-item index="6">用户中心</wu-plus-menu-item>
                </wu-plus-sub-menu>
                <wu-plus-menu-item index="12">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">用戶中心</span>
                    </div>
                </wu-plus-menu-item>
                <wu-plus-menu-item index="13" disabled="true">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">系統設置</span>
                    </div>
                </wu-plus-menu-item>
            </wu-plus-menu>
        </div>
    </div>
</template>
<script>
</script>
```
:::


### Attributes

| 参数                | 说明                         | 类型       | 可选值                 | 默认值      |
|-------------------|----------------------------|----------|---------------------|----------|
| mode              | 模式                         | String   | horizontal、vertical | vertical |
| background-color  | 菜单的背景色（仅支持 hex 格式）         | String   | --                  | #ffffff  |
| text-color        | 菜单的文字颜色（仅支持 hex 格式）        | String   | --                  | #303133  |
| active-text-color | 当前激活菜单的文字颜色（仅支持 hex 格式）    | String   | --                  | #409EFF  |
| default-active    | 当前激活菜单的 index              | String   | --                  | --       |
| default-openeds   | 当前打开的 sub-menu 的 index 的数组 | String[] | --                  | []       |

### Event

| 事件名    | 说明                                                                                       | 参数     | 
|--------|------------------------------------------------------------------------------------------|---------- |
| select | 菜单激活回调 </br> (index: 选中菜单项的 index, indexPath: 选中菜单项的 index path)                         | (event: CustomEvent) => void |
| open   | sub-menu 展开的回调 </br> (index: 打开的 sub-menu 的 index， indexPath: 打开的 sub-menu 的 index path) | (event: CustomEvent) => void |
| close  | sub-menu 收起的回调  </br>(index: 收起的 sub-menu 的 index， indexPath: 收起的 sub-menu 的 index path)               | (event: CustomEvent) => void |


### Slot

| 参数    | 说明 |
|-------|--|
| --    | 导航item内容 |
| title | 导航item名称 |
