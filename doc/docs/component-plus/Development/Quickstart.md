## 快速上手

### npm 安装

#### 按需引入

```ts
// 可以通过 install 安装组件
// 复选框组件
import '@wu-component/wu-checkbox';
// 输入框
import '@wu-component/wu-input';
```
#### 全量引入

```ts
import '@wu-component/ui-plus';
```

### CDN 引入

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

## 组件列表

* wu-plus-button
* wu-plus-icon
* wu-plus-radio
* wu-plus-input
* wu-plus-checkbox
* wu-plus-checkbox-group
* wu-plus-checkbox-button
* wu-plus-switch
* wu-plus-tree
* wu-plus-link
* wu-plus-table
* wu-plus-tag
* wu-plus-progress
* wu-plus-breadcrumb
* wu-plus-breadcrumb-item
* wu-plus-page-header
* wu-plus-rate
* wu-plus-time-line
* wu-plus-time-line-item
* wu-plus-select
* wu-plus-select-option
* wu-plus-avatar
* wu-plus-badge
* wu-plus-empty
* wu-plus-card
* wu-plus-popconfirm
* wu-plus-pagination
* wu-plus-cascader
* wu-plus-image
* wu-plus-collapse
* wu-plus-collapse-item
* wu-plus-popover
* wu-plus-message/MessagePopupManager
* wu-plus-alert
* wu-plus-tooltip
* wu-plus-dialog
* wu-plus-row
* wu-plus-col
* wu-plus-aside
* wu-plus-container
* wu-plus-main
* wu-plus-header
* wu-plus-footer
* wu-plus-transition
* wu-plus-date-picker
* wu-plus-color-picker
* wu-plus-tree-v2
* wu-plus-upload
