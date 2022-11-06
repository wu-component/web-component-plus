import { Router } from "@wu-component/wu-core-router";
import { RouterOptions } from "@wu-component/wu-core-router/dist/router/common";
import nprogress from "@/plugin/basic/nprogress";
const options: RouterOptions = {
    type: 'hash',
    after: () => {
        console.log("结束");
        nprogress.done();
        return true
    },
    before: () => {
        console.log("开始");
        nprogress.start();
        return true;
    },
    routers: [
        {
            path: '/home',
            element: `<home-view></home-view>`
        },
        {
            path: '/about',
            element: `<about-view></about-view>`
        },
        {
            path: '/my',
            element: `<my-view></my-view>`
        },
        {
            path: '/message',
            element: `<message-view></message-view>`
        },
        {
            path: "/codeEditorView",
            element: `<code-editor-page-view></code-editor-page-view>`
        },
        {
            path: "/lottieView",
            element: `<lottie-page-view></lottie-page-view>`
        },
        {
            path: "/button",
            element: `<button-page-view></button-page-view>`
        },
        {
            path: "/icon",
            element: `<icon-page-view></icon-page-view>`
        },
    ]
};
export default new Router(options);
