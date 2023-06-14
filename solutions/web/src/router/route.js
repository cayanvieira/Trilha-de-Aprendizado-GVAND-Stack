import Vue from "vue";
import Router from "vue-router";

Vue.use(Router)
const home= () => import("@/pages/Home/index.vue");
const login= () => import("@/pages/Login/index.vue");

let routes =[
    {
        path: "/",
        name: "home",
        components: { default: home },
        meta: { forAuth: false, title: "Inicio" }
    },
    {
        path: "/login",
        name: "login",
        components: { default: login },
        meta: { forAuth: false, title: "Inicio" }
    },
]

let router = new Router({
    mode: "history",
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 };
    }
});



export default router