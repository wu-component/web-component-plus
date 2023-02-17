# web-webpack4-typescript

该模板是基于 webpack4 和 typescript4 的 web 端样例工程，其中未集成任何的生产依赖，开发者可以自己扩展。
 
## 目录说明


```
├── build                                // webpack 配置目录
|——|—— webpack_build.config.js           // 生产环境配置
|——|—— webpack_common.config.js
|——|—— webpack_dev.config.js             // 开发环境配置 
├── public                               // 公共文件目录
├──|—— index.html                        // html 模板
├── src                                  // 公共模块
|——|—— main.ts                           // 系统入口文件
|—— .eslintignore                        // eslint 忽略文件
|—— .eslintrc.js                         // eslint配置
|—— package.json                         // 开发配置
|—— tsconfig.json                        // ts 构建配置

```
## npm 脚本说明

### npm run webpack:dev

采用 webpack 方式启动工程工程。

### npm run webpack:build

采用 webpack 方式打包工程。

