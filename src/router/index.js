import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/graph",
    name: "Graph",
    component: () => import("../views/Graph.vue")
  },
  {
    path: "/gender",
    name: "Gender",
    component: () => import("../views/Gender.vue")
  },
  {
    path: "/discharge",
    name: "Discharge",
    component: () => import("../views/Discharge.vue")
  },
  {
    path: "/dead",
    name: "Dead",
    component: () => import("../views/Dead.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  store.commit("setIsLoading", true);
  next();
});

router.afterEach(() => {
  store.commit("setIsLoading", false);
});


export default router;
