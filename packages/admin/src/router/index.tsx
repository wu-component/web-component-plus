import { Router } from "@canyuegongzi/wu-core-router";
import { RouterOptions } from "@canyuegongzi/wu-core-router/dist/router/common";
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
        }
    ]
};
export default new Router(options);
