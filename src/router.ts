import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/Pokedl",
        redirect: "/Pokedl/Home",
        component: () => import("./pages/Home.vue"),
        children: [
            {
                path: "/Pokedl/Home",
                alias: "/Pokedl/Home",
                name: "Pokedl",
                component: () => import("./pages/Home.vue"),
            },
            {
                path: "/Pokedl/Motus",
                name: "Motus",
                component: () => import("./pages/Motus.vue"),
            },
            {
                path: "/Pokedl/Description",
                name: "Description",
                component: () => import("./pages/Description.vue"),
            },

        ],
    },
    {
        path: "/Pokedl/Home",
        alias: "/Pokedl/Home",
        name: "Pokedl",
        component: () => import("./pages/Home.vue"),
    },
    {
        path: "/Pokedl/Motus",
        name: "Motus",
        component: () => import("./pages/Motus.vue"),
    },
    {
        path: "/Pokedl/Description",
        name: "Description",
        component: () => import("./pages/Description.vue"),
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/Pokedl/Home",
        children: [
            ]
    },




];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;