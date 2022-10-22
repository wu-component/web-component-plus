## Build 打包

如何打包组件。

### 构建

该命令用于打包 webComponent， 该命令会构建出 umd、es、cjs 三种格式的产物，umd 格式可以直接在浏览器中预览效果。

```bin
npm run build:package
```

### 自定义

目前模板开发环境采用 webpack5 实现热更新、生产构建采用 rollup， 开发者可根据自己需求酌情修改。
