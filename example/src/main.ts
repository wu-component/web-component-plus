// @ts-ignore
import { createApp } from 'vue'
// @ts-ignore
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 測試發佈的包
import "@canyuegongzi/web-ui";
// 开发环境中实时预览
// import "../../packages/web-ui/src/packages/index"
import App from './App.vue'
import router from "./router";

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
