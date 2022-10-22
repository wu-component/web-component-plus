## 安装

### npm 安装

现代前端工程化的开发模式下，推荐使用 npm 的方式安装，方便通过 ES Module 方式引入组件。

```bash
npm install @wu-component/ui-plus
```

### CDN

<a-alert message="非 npm 方式下 可以直接在 html 文件中引入对应组件的静态产物，为尽可能较小包的大小，UI 组件库中未包含底层依赖库，通过 link 引入库时得提前加载底层依赖。" type="info" show-icon />

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!--引入底层库-->
    <script src="https://unpkg.com/@wu-component/web-core-plus"></script>
    <!--引入组件库->
    <script src="https://unpkg.com/@wu-component/ui-plus"></script>
</head>
<body>
<div id="app">
    <!--使用组件，支持的组件-->
    <wu-plus-button type="primary" size="mini">mini</wu-plus-button>
</div>

</body>
</html>

```
