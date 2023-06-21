import Vue from "vue";
import Router from "vue-router";

Vue.use(Router)
const home = () => import("@/pages/Home/index.vue");
const login = () => import("@/pages/Login/index.vue");
const signup =() => import("@/pages/Signup/index.vue");

let routes =[
    {
        path: "/home",
        name: "Home-Page",
        components: { default: home },
        meta: { forAuth: false, title: "Inicio" }
    },
    {
        path: "/",
        name: "Login-Page",
        components: { default: login },
        meta: { forAuth: false, title: "Inicio" }
    },
    {
        path: "/signup",
        name: "Signup-Page",
        components: { default: signup },
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