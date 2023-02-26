## CodeEditor 代码编辑

Monaco Editor 是一个浏览器端的代码编辑器库，同时它也是 VS Code 所使用的编辑器。Monaco Editor 可以看作是一个编辑器控件，只提供了基础的编辑器与语言相关的接口，可以被用于任何基于 Web 技术构建的项目中，而 VS Code 包含了文件管理、版本控制、插件等功能，是一款桌面软件。Monaco Editor 的 GitHub 仓库中不包含任何实际功能代码，因为其源代码与 VS Code 在同一个仓库，只是在版本发布时会构建出独立的编辑器代码。

该组件基于 Monaco Editor 做了进一步的抽象封装，样式隔离，开发者可以如同使用普通 HTML 标签版直接使用。

<a-alert message="编辑器可以通过 editor 属性调用 Monaco Editor 的 API， 如 document.querySelector('#editor').editor.setThem('hc-light')" type="info" show-icon />

### 基础用法

::: demo
```html
<template>
    <div class="button-container" style="display: flex; flex-wrap: wrap; align-items: center;justify-content: space-around;padding: 16px">
        <div style="width: 100%; height: 300px">
            <wu-code-monaco-editor theme="vs-dark" initial-value="console.log('test code')"  style="width: 100%;height: 100%"></wu-code-monaco-editor>
        </div>
    </div>
</template>
<script>
</script>
<style>
</style>
```
:::

### Attributes

| 参数            | 说明 | 类型      | 可选值       | 默认值   |
|---------------|--|---------- |-------------  |-------- |
| initial-value | 初始显示的代码 |string|--  |-- |
| theme | 主题色 |string| 'vs-dark', 'hc-black', 'hc-light' |'vs-dark' |

### Methods

<a-alert message="组件本身未做方法代理，可以通过 editor 属性调用 Monaco Editor 的 API" type="info" show-icon />
