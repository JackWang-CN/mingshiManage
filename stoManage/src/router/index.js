import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },

    // 登录页
    { path: "/login", component: Login },

    // 管理系统页
    {
      path: "/home",
      component: () => import("../views/Home.vue"),
      children: [
        { path: "/", redirect: "index" },

        // 首页
        {
          path: "index",
          component: () => import("../views/home/index/index.vue"),
          meta: ["首页"],
        },

        // 广告管理-我的广告
        {
          path: "advertising",
          component: () => import("../views/home/advertising/advertising.vue"),
          meta: ["广告管理", "我的广告"],
        },
        // 广告管理-修改&新增广告
        {
          path: "adv_details",
          component: () => import("../views/home/advertising/adv_details.vue"),
          meta: ["广告管理", "修改"],
        },
        // 广告管理-我的委托
        {
          path: "entrust",
          component: () => import("../views/home/advertising/entrust.vue"),
          meta: ["广告管理", "我的委托"],
        },
        // 广告管理-修改&新增委托
        {
          path: "entrust_details",
          component: () =>
            import("../views/home/advertising/entrust_details.vue"),
          meta: ["广告管理", "我的委托"],
        },

        // 权限管理-角色管理
        {
          path: "role_list",
          component: () => import("../views/home/role/role_list.vue"),
          meta: ["权限管理", "角色管理"],
        },
        // 权限管理-角色新增
        {
          path: "role_details",
          component: () => import("../views/home/role/role_details.vue"),
          meta: ["权限管理", "新增角色"],
        },
        // 权限管理-用户管理
        {
          path: "user_list",
          component: () => import("../views/home/role/user_list.vue"),
          meta: ["权限管理", "用户管理"],
        },
        // 权限管理-用户详情
        {
          path: "user_details",
          component: () => import("../views/home/role/user_details.vue"),
          meta: ["权限管理", "用户管理"],
        },

        // 商品管理-商品分类
        {
          path: "goods_type",
          component: () => import("../views/home/goods/goods_type.vue"),
          meta: ["商品管理", "商品分类"],
        },
        // 商品管理-商品列表
        {
          path: "goods_list",
          component: () => import("../views/home/goods/goods_list.vue"),
          meta: ["商品管理", "商品列表"],
        },
        // 商品管理-商品列表
        {
          path: "goods_details",
          component: () => import("../views/home/goods/goods_details.vue"),
          meta: ["商品管理", "商品详情"],
        },
        // 商品管理-优惠券列表
        {
          path: "coupon_list",
          component: () => import("../views/home/goods/coupon_list.vue"),
          meta: ["商品管理", "优惠券列表"],
        },
        // 商品管理-优惠券详情
        {
          path: "coupon_details",
          component: () => import("../views/home/goods/coupon_details.vue"),
          meta: ["商品管理", "优惠券详情"],
        },

        // 订单管理-订单列表
        {
          path: "order_list",
          component: () => import("../views/home/order/order_list.vue"),
          meta: ["订单管理", "订单列表"],
        },
        // 订单管理-订单详情
        {
          path: "order_details",
          component: () => import("../views/home/order/order_details.vue"),
          meta: ["订单管理", "订单审核"],
        },
        // 订单管理-订单审核
        {
          path: "order_check",
          component: () => import("../views/home/order/order_check.vue"),
          meta: ["订单管理", "订单审核"],
        },

        // 客户管理
        {
          path: "customer",
          component: () => import("../views/home/customer/customer.vue"),
          meta: ["客户管理"],
        },
      ],
    },
  ],
});
