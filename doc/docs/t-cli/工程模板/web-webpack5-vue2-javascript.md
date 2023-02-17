# web-webpack5-vue2-javascript

该模板是基于 webpack5 和 vue2 搭建，内部已经集成 eslint、router、vue-store、axios、各类样式预处理（less、sass、stylus）、模板引擎（pug）以及 webpack 打包分析配置。模板内部未集成任何第三方样式库，需要开发者自己扩展。

## 目录说明


```
├── build                                // webpack 配置目录
|——|—— webpack_build.config.js           // 生产环境配置
|——|—— webpack_common.config.js
|——|—— webpack_dev.config.js             // 开发环境配置 
|——|—— webpack_analyzer.config.js        // 打包分析配置
├── public                               // 公共文件目录
├──|—— index.html                        // html 模板
├── src                                  // 公共模块
├──|—— components                        // 公共组件目录
├──|—— router                            // 路由逻辑目录
├──|—— service                           // 网络请求逻辑目录
├──|—— store                             // vuex目录
├──|——|——module                          // vuex 各个子模块
├──|——|——index.js                        // vuex 根文件
├──|—— style                             // 样式
├──|—— utils                             // 工具目录
├──|—— views                             // 页面级组件目录
|——|—— main.js                           // 系统入口文件
|—— .eslintignore                        // eslint 忽略文件
|—— .eslintrc.js                         // eslint配置
|—— postcss.config                       // autoprefixer 配置

```
## npm 脚本说明

### npm run webpack:dev

采用 webpack 方式启动工程工程。

### npm run webpack:build

采用 webpack 方式打包工程。

### npm run webpack:analyzer

该脚本用于 webpack 打包速度分析，控制台会打印出 各个模块的构建速度，也可以通过浏览器可视化分析各模块的体积占比。

## webpack5 升级问题汇总

### 1、使用 optimize-css-assets-webpack-plugin时会有如下警告，但不影响打包

**问题**
````bash

[DEP_WEBPACK_COMPILATION_OPTIMIZE_CHUNK_ASSETS] DeprecationWarning: optimizeChunkAssets is deprecated (use Compilation.hook.processAssets instead and use one of Compilation.PROCESS_ASSETS_STAGE_* as stage option)(Use node --trace-deprecation ... to show where the warning was created)

````
**方案**

官方回答：

[issues](https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/134)

解决方案
替换插件为 [css-minimizer-webpack-plugin](https://github.com/webpack-contrib/css-minimizer-webpack-plugin)

### 2、使用 hash 是出现弃用警告，不影响打包

**问题**

````bash

[[DEP_WEBPACK_TEMPLATE_PATH_PLUGIN_REPLACE_PATH_VARIABLES_HASH] DeprecationWarning: [hash] is now [fullhash] (also consider using [chunkhash] or [contenthash], see documentation for details)

````
**方案**

按提示替换 ```hash``` 为 ```chunkhash | contenthash```。

````javascript
output: {
            publicPath: './',
            path: path.resolve(__dirname, '../', "dist"),
            filename: '[name].[chunkhash:8].js',
            clean: true,
}
````

### 3、使用 copy-webpack-plugin 报错

**问题**

```bash
ValidationError: Invalid options object. Copy Plugin has been initialized using an options object that does not match the API schema.
```

**方案**

[copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin)
```js
 module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: 'public' }
      ]
    })
  ]
}
```



## 优化配置

### 1、图片、字体 loader

在 webpack 5 中，可以使用内置的 [Asset Modules](https://webpack.docschina.org/guides/asset-modules/)

```javascript
    {
        test: /\.png|jpg|gif|jpeg|svg/,
        type: 'asset/resource',
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024,
            },
        },
        generator: {
            filename: 'images/[base]',
        },
    },
    {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        type: 'asset/resource',
        generator: {
            filename: 'fonts/[base]',
        },
    },
```
