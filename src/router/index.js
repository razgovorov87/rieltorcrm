import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Авторизация",
    meta: { layout: "auth" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Регистрация",
    meta: { layout: "auth" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
  {
    path: "/getinfo",
    name: "Получение информации",
    meta: { layout: "auth" },
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/GetInfo.vue"),
  },
  {
    path: "/verify",
    name: "Подтверждение аккаунта",
    meta: { layout: "auth" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/VerifyAccount.vue"),
  },
  {
    path: "/",
    name: "Клиенты",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Clients.vue"),
  },
  {
    path: "/object",
    name: "Объекты",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Object.vue"),
  },
  {
    path: "/admin/clients",
    name: "Панель администратора, клиенты",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin.vue"),
  },
  {
    path: "/admin/archive",
    name: "Архив клиентов",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ClientsArchive.vue"),
  },
  {
    path: "/admin/team",
    name: "Панель администратора, команда",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AdminTeam.vue"),
  },
  {
    path: "/reverses",
    name: "Просмотры",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Reverses.vue"),
  },
  {
    path: "*",
    redirect: "/login",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.auth);
  let currentUser = false;

  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  if (accessToken && refreshToken) {
    currentUser = true;
  }

  if (requireAuth && !currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
