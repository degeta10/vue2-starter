import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

import Login from "../views/Login";
import Signup from "../views/Signup";
import Profile from "../views/Profile";
import Home from "../views/Home";

Vue.use(VueRouter);

const isGuest = (to, from, next) => {
  if (
    !store.getters["auth/isAuthenticated"] &&
    store.getters["auth/refreshToken"] === ""
  ) {
    next();
    return;
  }
  next("/home");
};

const isAuthenticated = (to, from, next) => {
  if (
    store.getters["auth/isAuthenticated"] ||
    store.getters["auth/refreshToken"] !== ""
  ) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  {
    path: "/login",
    component: Login,
    name: "login",
    beforeEnter: isGuest,
  },
  {
    path: "/signup",
    component: Signup,
    name: "signup",
    beforeEnter: isGuest,
  },
  {
    path: "/profile",
    component: Profile,
    name: "profile",
    beforeEnter: isAuthenticated,
  },
  {
    path: "/home",
    component: Home,
    name: "home",
    beforeEnter: isAuthenticated,
  },
  { path: "*", redirect: "/home" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
