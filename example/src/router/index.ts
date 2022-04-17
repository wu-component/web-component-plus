import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import ButtonView from "../views/button/ButtonView.vue";
import IconView from "../views/icon/IconView.vue";
import InputView from "../views/input/InputView.vue";
import RadioView from "../views/radio/RadioView.vue";

const routes = [
    {
        path: "/components/ButtonView",
        name: "登录",
        component: ButtonView,
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/components/IconView",
        name: "登录",
        component: IconView,
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/components/InputView",
        name: "登录",
        component: InputView,
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/components/RadioView",
        name: "登录",
        component: RadioView,
        meta: {
            requireAuth: false,
        },
    },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
