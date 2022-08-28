## 组件说明

这是一个基于 WebComponent 的组件，内部已经集成 web-core-plus。

### 环境搭建

#### 开发

该命令用于本地启动一个热更新的服务，用于本地开发。

```bash

npm run dev:package

```

#### 构建

该命令用于打包 webComponent， 该命令会构建出 umd、es、cjs 三种格式的产物，umd 格式可以直接在浏览器中预览效果。

```bash

npm run build:package

```

#### 预览

该命令用于预览效果，浏览器默认打开根目录 index.html 文件， index.html 按需要修改，

```bash

npm run example:package

```
