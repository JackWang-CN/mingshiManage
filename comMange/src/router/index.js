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
          component: () => import("../views/home/index.vue"),
          meta: ["首页"],
        },

        // 公告
        {
          path: "notice",
          component: () => import("../views/home/notice.vue"),
          meta: ["公告"],
        },

        // 权限管理-角色管理
        {
          path: "author_roleList",
          component: () => import("../views/home/author_roleList.vue"),
          meta: ["权限管理", "角色管理"],
        },
        // 权限管理-角色新增
        {
          path: "author_roleAdd",
          component: () => import("../views/home/author_roleAdd.vue"),
          meta: ["权限管理", "新增角色"],
        },
        // 权限管理-用户管理
        {
          path: "author_user",
          component: () => import("../views/home/author_user.vue"),
          meta: ["权限管理", "用户管理"],
        },

        // 道具商城-列表
        {
          path: "props_list",
          component: () => import("../views/Company/propsCenter/list.vue"),
          meta: ["道具商城", "道具列表"],
        },
        // 道具商城-详情
        {
          path: "props_details",
          component: () => import("../views/Company/propsCenter/details.vue"),
          meta: ["道具商城", "道具列表", "道具详情"],
        },
        // 道具商城-类型
        {
          path: "props_type",
          component: () => import("../views/Company/propsCenter/type.vue"),
          meta: ["道具商城", "道具类型"],
        },
        // 道具商城-记录
        {
          path: "props_records",
          component: () => import("../views/Company/propsCenter/records.vue"),
          meta: ["道具商城", "交易记录"],
        },

        // 资源管理-普通资源
        {
          path: "normal_list",
          component: () => import("../views/Resource/Normal/list.vue"),
          meta: ["资源管理", "普通资源"],
        },
        // 资源管理-AR资源
        {
          path: "ar_list",
          component: () => import("../views/Resource/U3D/list.vue"),
          meta: ["资源管理", "AR资源"],
        },
        // 资源管理-AR资源-AR资源上传
        {
          path: "ar_upload",
          component: () => import("../views/Resource/U3D/upload.vue"),
          meta: ["资源管理", "AR资源", "AR资源上传"],
        },

        // 公告记录
        {
          path: "configure_noticerecord",
          component: () => import("../views/home/configure_noticerecord.vue"),
          meta: ["配置管理", "公告记录"],
        },

        // 角色权限
        {
          path: "configure_roleGrauth",
          component: () => import("../views/home/configure_roleGrauth.vue"),
          meta: ["配置管理", "角色权限"],
        },

        // 版本控制
        {
          path: "configure_verControl",
          component: () => import("../views/home/configure_verControl.vue"),
          meta: ["配置管理", "版本控制"],
        },

        // 拍卖行-拍卖列表
        {
          path: "auction_list",
          component: () => import("../views/UserData/auction/list.vue"),
          meta: ["拍卖行", "拍卖列表"],
        },

        // 拍卖行-交易记录
        {
          path: "auction_records",
          component: () => import("../views/UserData/auction/records.vue"),
          meta: ["拍卖行", "交易记录"],
        },

        // 用户管理-用户列表
        {
          path: "user_list",
          component: () => import("../views/UserData/userInfo/list.vue"),
          meta: ["用户管理", "用户列表"],
        },

        // 用户管理-用户详情
        {
          path: "user_details",
          component: () => import("../views/UserData/userInfo/details.vue"),
          meta: ["用户管理", "用户管理"],
        },

        // 用户管理-帐户流水
        {
          path: "user_accFlow",
          component: () =>
            import("../views/UserData/userInfo/account_flow.vue"),
          meta: ["用户管理", "帐户流水"],
        },

        // 用户管理-群组管理
        {
          path: "user_group",
          component: () => import("../views/UserData/userInfo/group.vue"),
          meta: ["用户管理", "群组管理"],
        },

        // 用户管理-地产数据管理
        {
          path: "userdata_spaceData",
          component: () => import("../views/UserData/userdata_spaceData.vue"),
          meta: ["用户管理", "空间数据管理"],
        },

        // 用户管理-地产数据管理
        {
          path: "userdata_spaEstLicense",
          component: () =>
            import("../views/UserData/userdata_spaEstLicense.vue"),
          meta: ["用户管理", "地产数据管理"],
        },

        // 用户管理-房产列表
        {
          path: "userdata_houseList",
          component: () => import("../views/UserData/userHouse/list.vue"),
          meta: ["用户管理", "房产数据管理"],
        },
        // 用户管理-房产详情
        {
          path: "userdata_houseDetails",
          component: () => import("../views/UserData/userHouse/details.vue"),
          meta: ["用户管理", "房产数据管理"],
        },

        // 用户管理-个人流水
        {
          path: "account_flow",
          component: () =>
            import("../views/UserData/userInfo/account_flow.vue"),
          meta: ["用户管理", "个人流水"],
        },
        // 用户管理-个人资产
        {
          path: "assets",
          component: () => import("../views/UserData/userInfo/assets.vue"),
          meta: ["用户管理", "道具资产"],
        },
        // 用户管理-拍卖行
        {
          path: "auction",
          component: () => import("../views/UserData/userInfo/auction.vue"),
          meta: ["用户管理", "拍卖行"],
        },

        // 商户管理-商户列表
        {
          path: "merchant_list",
          component: () => import("../views/Merchant/merchant_list.vue"),
          meta: ["商户管理", "商户列表"],
        },

        // 商户管理-业务请求跟踪管理
        {
          path: "merchant_busReqTrace",
          component: () => import("../views/Merchant/merchant_busReqTrace.vue"),
          meta: ["商户管理", "业务请求跟踪管理"],
        },

        // 优惠券量产管理
        {
          path: "merchant_couponProduc",
          component: () =>
            import("../views/Merchant/merchant_couponProduc.vue"),
          meta: ["商户管理", "优惠券量产管理"],
        },

        // 委托请求数据管理
        {
          path: "merchant_entrustReqData",
          component: () =>
            import("../views/Merchant/merchant_entrustReqData.vue"),
          meta: ["商户管理", "委托请求数据管理"],
        },

        // 商户广告数据管理
        {
          path: "merchant_merAdData",
          component: () => import("../views/Merchant/merchant_merAdData.vue"),
          meta: ["商户管理", "商户广告数据管理"],
        },

        // 订单管理
        {
          path: "merchant_order",
          component: () => import("../views/Merchant/merchant_order.vue"),
          meta: ["商户管理", "订单管理"],
        },

        // 商品券类绑定管理
        {
          path: "merchant_productCoupBind",
          component: () =>
            import("../views/Merchant/merchant_productCoupBind.vue"),
          meta: ["商户管理", "商品券类绑定管理"],
        },

        // 商品信息管理
        {
          path: "merchant_productInfo",
          component: () => import("../views/Merchant/merchant_productInfo.vue"),
          meta: ["商户管理", "商品信息管理"],
        },

        // 用户信息主表
        {
          path: "merchant_userInfo",
          component: () => import("../views/Merchant/merchant_userInfo.vue"),
          meta: ["商户管理", "用户信息主表"],
        },
      ],
    },
  ],
});
