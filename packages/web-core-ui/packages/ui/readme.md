## 快速上手

### npm 使用

#### 按需引入

```js
// 可以通过 install 安装组件
// 复选框组件
import '@wu-component/wu-checkbox';
// 输入框
import '@wu-component/wu-input';
```

#### 全量引入

```js
import '@wu-component/-ui-plus';
```

### link 引入

非 npm 方式下 可以直接在 html 文件中引入对应组件的静态产物。

#### 按需引入

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!--引入对应的组件产物,  子组件中已包含底层依赖，不用单独引入-->
    <script src="https://unpkg.com/@wu-component/wu-button"></script>
</head>
<body>
<div id="app">
    <!--使用组件-->
    <wu-plus-button type="primary" size="mini">mini</wu-plus-button>
</div>

</body>
</html>

```

#### 全量引入

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!--引入底层库-->
    <script src="https://unpkg.com/@wu-component/web-core-plus"></script>
    <!--引入对应的组件产物-->
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

