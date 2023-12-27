import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/Pokedl",
        redirect: "/Pokedl/Home",
        component: () => import("./components/Home.vue"),
        children: [
            {
                path: "/Pokedl/Home",
                alias: "/Pokedl/Home",
                name: "Pokedl",
                component: () => import("./components/Home.vue"),
            },
            {
                path: "/Pokedl/Motus",
                name: "Motus",
                component: () => import("./components/Motus.vue"),
            },
        ],
    },
    {
        path: "/Pokedl/Home",
        alias: "/Pokedl/Home",
        name: "Pokedl",
        component: () => import("./components/Home.vue"),
    },
    {
        path: "/Pokedl/Motus",
        name: "Motus",
        component: () => import("./components/Motus.vue"),
    },




];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;