# web-webpack4-react-typescript

该模板是基于 webpack4 和 react 以及 typescript 搭建，内部已经集成 eslint、react-router、axios、各类样式预处理（less、sass、stylus）、以及 webpack 打包分析配置。关于状态管理，react 生态中的解决方案挺多，开发者可以自己选择；模板内部未集成任何第三方样式库，也需要开发者自己扩展。

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

## 说明

该模板内部路由配置文件详见 ```src/router/config.js```。


