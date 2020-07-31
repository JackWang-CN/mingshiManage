import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { title: "" },
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("../views/Home.vue"),
      children: [
        {
          path: "/home",
          redirect: "index",
        },

        // 首页
        {
          path: "index",
          component: () => import("../views/home/index/index.vue"),
          meta: { title: "-首页", bread: ["首页"] },
        },

        // 轮播
        {
          path: "banner",
          component: () => import("../views/home/banner/index.vue"),
          meta: { title: "-轮播管理", bread: ["轮播管理"] },
        },

        // 新闻中心
        {
          path: "news_list",
          component: () => import("../views/home/news/list.vue"),
          meta: { title: "-新闻列表", bread: ["新闻中心", "新闻列表"] },
        },
        {
          path: "news_publish",
          component: () => import("../views/home/news/publish.vue"),
          meta: { title: "-新闻发布", bread: ["新闻中心", "新闻发布"] },
        },
        {
          path: "news_change",
          component: () => import("../views/home/news/change.vue"),
          meta: { title: "-新闻修改", bread: ["新闻中心", "新闻修改"] },
        },

        // 产品案例
        {
          path: "case_list",
          component: () => import("../views/home/case/list.vue"),
          meta: { title: "-案例列表", bread: ["产品案例", "案例列表"] },
        },
        {
          path: "case_publish",
          component: () => import("../views/home/case/publish.vue"),
          meta: { title: "-案例发布", bread: ["产品案例", "案例发布"] },
        },
        {
          path: "case_change",
          component: () => import("../views/home/case/change.vue"),
          meta: { title: "-案例修改", bread: ["产品案例", "案例修改"] },
        },

        // 关于我们
        {
          path: "about_photowall",
          component: () => import("../views/home/about_us/photo_wall.vue"),
          meta: { title: "-关于我们", bread: ["关于我们"] },
        },

        // 招聘信息
        {
          path: "recruit_list",
          component: () => import("../views/home/recruit/list.vue"),
          meta: { title: "-职位列表", bread: ["招聘信息", "职位列表"] },
        },

        {
          path: "recruit_publish",
          component: () => import("../views/home/recruit/publish.vue"),
          meta: { title: "-职位发布", bread: ["招聘信息", "职位发布"] },
        },
        {
          path: "recruit_change",
          component: () => import("../views/home/recruit/change.vue"),
          meta: { title: "-职位修改", bread: ["招聘信息", "职位修改"] },
        },

        // 个人中心
        {
          path: "personal",
          component: () => import("../views/home/personal/personal.vue"),
          meta: { title: "-个人中心", bread: ["个人中心"] },
        },
      ],
    },
  ],
});
