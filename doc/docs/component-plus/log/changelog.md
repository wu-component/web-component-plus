## 更新日志

### 2.0.4

**2023-12-11**

版本迭代
* fix: 颜色选择器无法展开；
* fix: 级联选择器无法选择；

### 2.0.0

**2023-02-18**

版本迭代
* feature: 升级底层依赖；
* refactor: wu-code-sandbox 重构；

### 1.11.4

**2022-02-14**

版本迭代
* feature: 升级底层依赖；
* feature: 组件构建流程优化；
* fix: 若干 bug 修复；

### 1.0.0

**2022-10-03**

版本迭代
* feature: 升级底层依赖；
* fix: 若干 bug 修复；

### 0.0.8

**2022-08-26**

版本迭代
* feature: wu-plus-upload 组件；
    <div style="width: 200px">
        <wu-plus-upload show-file-list="false" id="upload2" auto-upload="true" list-type="text" file-list='[{"name":"food.jpeg","url":"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"},{"name":"food2.jpeg","url":"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"}]' headers='{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTY2MjkxMDM5MiwiZXhwIjoxNjYyOTEzOTkyfQ.65rWS2yBQHI1cP_PBqmk8jr2_h5_ENIRckZarmvffzU"}' action="" data='{"category":4,"userName":"root","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTY2MjkxMDM5MiwiZXhwIjoxNjYyOTEzOTkyfQ.65rWS2yBQHI1cP_PBqmk8jr2_h5_ENIRckZarmvffzU"}' >
            <wu-plus-button>选取文件</wu-plus-button>
            <div slot="tip" class="wu-upload_tip" style="font-size: 12px;color: #606266;">只能上传jpg/png文件，且不超过500kb</div>
        </wu-plus-upload>
    </div>
  
* fix: 若干 bug 修复；


### 0.0.6

**2022-06-26**

版本迭代
* feature: wu-plus-tree-v2 组件（实现了标准的 ElementUI API）；
    <div style="width: 200px">
        <wu-plus-tree-v2 draggable="false" show-checkbox="false" data='[{"label":"一级 1","value":"1","children":[{"label":"二级 1-1","value":"1.1","children":[{"label":"三级 1-1-1","value":"1.1.1"}]}]},{"label":"一级 2","value":"2","children":[{"label":"二级 2-1","value":"2.1","children":[{"label":"三级 2-1-1","value":"2.1.1"}]},{"label":"二级 2-2","value":"2.2","children":[{"label":"三级 2-2-1","value":"2.2.1"}]}]},{"label":"一级 3","value":"3","children":[{"label":"二级 3-1","value":"3.1","children":[{"label":"三级 3-1-1","value":"3.1.1"}]},{"label":"二级 3-2","value":"3.2","children":[{"label":"三级 3-2-1","value":"3.2.1"}]}]}]'></wu-plus-tree-v2>
    </div>

* fix: 若干 bug 修复；

### 0.0.4

**2022-08-28**

版本迭代
* *feature: 迁移到 monorepo 优化整个开发体验 ；
* feature: 优化整个组件库编译打包流程，收口同一个构建流程中；
* feature: 账号体系迁移到组织账号下（wu-component）

### 0.0.2

**2022-06-26**

版本迭代
* feature: wu-plus-color-picker 组件；
    <div style="width: 200px">
        <wu-plus-color-picker defaultvalue="#409EFF" size="medium"></wu-plus-color-picker>
    </div>

* fix: wu-plus-popover 点击浮层内容会关闭问题；
* fix: wu-plus-popconfirm 确认、取消事件无法触发问题；

### 0.0.1

**2021-11-01**

基础版本发布
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

