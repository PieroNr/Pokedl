import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        alias: "/Pokedl",
        name: "test",
        component: () => import("./components/getPokemon.vue"),
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;