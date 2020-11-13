import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },

    // 登录页
    { path: "/login", component: Login, meta: { notNeed: true } },

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

        // 商家活动-我需要援助
        {
          path: "publish",
          component: () => import("../views/home/activity/publish.vue"),
          meta: ["商家活动", "我需要援助"],
        },
        // 商家活动-进行中活动
        {
          path: "underway",
          component: () => import("../views/home/activity/underway.vue"),
          meta: ["商家活动", "进行中活动"],
        },
        // 商家活动-历史活动
        {
          path: "history",
          component: () => import("../views/home/activity/history.vue"),
          meta: ["商家活动", "历史活动"],
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

        // 我的收益
        {
          path: "earnings",
          component: () => import("../views/home/earnings/earnings.vue"),
          meta: ["我的收益"],
        },

        // 提现管理
        {
          path: "earning_details",
          component: () => import("../views/home/earnings/details.vue"),
          meta: ["我的收益", "提现管理"],
        },

        // 客户管理-消息中心
        {
          path: "message_center",
          component: () => import("../views/home/customer/message_center.vue"),
          meta: ["客户管理", "消息中心"],
        },
        // 客户管理-消息群发
        {
          path: "message_group",
          component: () => import("../views/home/customer/message_group.vue"),
          meta: ["客户管理", "消息群发"],
        },
        // 客户管理-好友列表
        {
          path: "friend_list",
          component: () => import("../views/home/customer/friend_list.vue"),
          meta: ["客户管理", "好友列表"],
        },

        // 店铺管理-角色管理
        {
          path: "role_list",
          component: () => import("../views/home/store/role/list.vue"),
          meta: ["店铺管理", "角色管理"],
        },

        // 店铺管理-账号管理
        {
          path: "user_list",
          component: () => import("../views/home/store/user/list.vue"),
          meta: ["店铺管理", "账号管理"],
        },

        // 店铺管理-店铺信息
        {
          path: "merchant_info",
          component: () => import("../views/home/store/shop/info.vue"),
          meta: ["店铺管理", "店铺信息"],
        },

        // 个人中心
        {
          path: "personal_center",
          component: () =>
            import("../views/home/store/user/personal_center.vue"),
          meta: ["个人中心"],
        },
      ],
    },
  ],
});
