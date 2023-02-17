# node-nest

该模板基于 nest7 的工程模板，内部已经集成了数据库连接、error 处理、动态配置、数据返回包装、生产环境最小化打包（ 避免生产环境中 npm install 后占用大量空间 ）、eslint等。通过 t-cli 快速搭建 nest 开发环境,可以避免原生 nest-cli创建工程后繁琐的  配置流程。

## 目录说明


```
├── common                                  // 公共模块
|   ├── error                               // 错误封装
|   |   |—— exceptions                      // Exception 定义 
|   |   |—— filters                         // 错误过滤器 包括 http ws Rpc
|   |   |—— pipe                            // 管道目录
|   |—— result                              // 返回数据包装 
|   |—— shared
|   |   |—— decorators                      // 注解目录                    
|   |   |—— guards                          // 部分权限目录(按需实现)            
|   |   |—— interceptors                    // 拦截器目录
|   |   |—— middleware                      // 中间建目录
|   |   |—— strategies                      // Strategy 封装
├── config                                  // 系统配置
|   ├── ApiErrorCodeEnum.ts                 // 系统错误码定义 
|   ├── application.yaml                    // 系统配置文件
|   ├── CommonConfigInterface.ts            // 系统配置字段定义  
|   ├── constant.ts                         // 系统常量定义
├── controller                              // API 定义目录
|   ├── HelloWorldController.ts
├── service                                 // Service 定义
|   ├── HelloWorldService.ts
├── model
|   ├── DTO                                 // 请求参数类型校验类定义目录
|   ├── entity                              // 数据库实体定义                            
├── module                                  // 哥模块定义目录
|   ├── HelloWorldModule.ts
├── utils                                   // 工具定义目录
|   ├── RedisCacheService.ts                // redis 工具封装
|   ├── .....
├── AppModule.ts                            // 系统模块入口
├── MainModule.ts                           // 主模块定义，typeorm、reid、kakfa、各个子模块定义
├── main.ts                                 // 系统入口文件


```
## npm 脚本说明

### npm run start:dev

该脚本用于在开发环境以 nodemon 方式启动系统。

### npm run dev

该脚本用于在开发环境中以 nest 原生的方式启动工程，但有可能有错误，需要手动将 application.yaml 复制到 dist/config 目录下。

```
系统中采用 application.yaml 配置项目，nest 在启动时会先生成 dist 目录，application.yaml 配置文件并为复制到 dist 目录。 
```
### npm run build

该脚本是用 nest 原生方式打包工程。

### npm run build:min

该脚本是用最小化打包 nest 工程，该脚本会将整个工程打包成单文件，这种打包方式对 docker 部署方式来说是及其友好的。

### npm run start:debug

该脚本用于断点调试系统。

#### 

个人推荐开发环境采用 ```` npm run start:dev + pm run start:debug ```` 方式开发，打包时尽量采用 ```npm run build:min ``` 最小化打包。

## 说明

该工程模板后续会继续完善，包括 http 模板、消息队列（kafka、rabbitMqQ）等模块。出现问题也会继续跟进完善。
