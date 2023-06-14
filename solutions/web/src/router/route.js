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
        meta: { forAuth: true, title: "Inicio" }
    },
]

let router = new Router({routes})


export default router