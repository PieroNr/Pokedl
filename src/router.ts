import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/Pokedl",
        alias: "/Pokedl",
        name: "Pokedl",
        component: () => import("./components/getPokemon.vue"),
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;