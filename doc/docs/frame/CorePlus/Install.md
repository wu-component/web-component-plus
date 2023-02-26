## 安装

### 快速创建

需要提前全局安装 wu-cli 脚手架，详见 [wu-cli工具](https://www.npmjs.com/package/@wu-component/wu-cli)

```bin
wu init-web-component test-web-core-component
```

### 开发

该命令用于本地启动一个热更新的服务，用于本地开发。

```bin
npm run dev:package
```

### 构建

该命令用于打包 webComponent， 该命令会构建出 umd、es、cjs 三种格式的产物，umd 格式可以直接在浏览器中预览效果。

```bin
npm run build:package
```

### 预览

该命令用于预览效果，浏览器默认打开根目录 index.html 文件， index.html 按需要修改，

```bin
npm run example:package
```

## 手动依赖

开发者可以根据需要手动安装依赖，相关 Api 请参考下一章节 Decorators。

```bin
npm install @wu-component/web-core-plus@next --save
```

### 说明
