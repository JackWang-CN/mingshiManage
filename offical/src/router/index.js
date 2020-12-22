import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "/",
          redirect: "index",
        },

        // 首页
        {
          path: "index",
          component: () => import("../views/home/index.vue"),
          meta: { index: 0, title: "-首页" },
        },
        // 新闻中心
        {
          path: "news",
          component: () => import("../views/home/news.vue"),
          meta: { index: 1, title: "-新闻中心" },
        },
        // 新闻中心-新闻详情
        {
          path: "news_details",
          component: () => import("../views/home/news_details.vue"),
          meta: { index: 1, title: "-新闻详情" },
        },

        // 产品案例
        {
          path: "product",
          component: () => import("../views/home/product.vue"),
          meta: { index: 2, title: "-产品案例" },
        },
        // 产品案例-案例详情
        {
          path: "product_details",
          component: () => import("../views/home/product_details.vue"),
          meta: { index: 2, title: "-案例详情" },
        },
        // 产品案例-案例详情
        {
          path: "product_kongwan",
          component: () => import("../views/home/product_kongwan.vue"),
          meta: { index: 6, title: "-案例详情" },
        },

        // 关于名视
        {
          path: "about_us",
          component: () => import("../views/home/about_us.vue"),
          meta: { index: 3, title: "-关于名视" },
        },
        // 人才招聘
        {
          path: "join_us",
          component: () => import("../views/home/join_us.vue"),
          meta: { index: 4, title: "-人才招聘" },
        },
        // 联系我们
        {
          path: "contact_us",
          component: () => import("../views/home/contact_us.vue"),
          meta: { index: 5, title: "-联系我们" },
        },
      ],
    },
  ],
});
