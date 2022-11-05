import { Router } from "@wu-component/wu-core-router";
import { RouterOptions } from "@wu-component/wu-core-router/dist/router/common";
const options: RouterOptions = {
    type: 'hash',
    after: () => {
        return true
    },
    before: () => {
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
        }
    ]
};
export default new Router(options);