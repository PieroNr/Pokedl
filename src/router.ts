import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";
import Home from "./components/Home.vue";
import Motus from "./components/Motus.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/Pokedl",
        redirect: "/Pokedl/Home",
        component: () => Home,
        children: [
            {
                path: "/Pokedl/Home",
                alias: "/Pokedl/Home",
                name: "Pokedl",
                component: () => Home,
            },
            {
                path: "/Pokedl/Motus",
                name: "Motus",
                component: () => Motus,
            },
        ],
    },

    {
        path: "/Pokedl/Home",
        alias: "/Pokedl/Home",
        name: "Pokedl",
        component: () => Home,
    },
    {
        path: "/Pokedl/Motus",
        name: "Motus",
        component: () => Motus,
    },





];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;