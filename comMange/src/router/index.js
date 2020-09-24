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

        // 道具商城-商城道具
        {
          path: "props_store",
          component: () => import("../views/Company/propsCenter/store.vue"),
          meta: ["道具商城", "商城道具"],
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

        // 配置管理-角色管理
        {
          path: "role_list",
          component: () =>
            import("../views/Company/configManage/account/role/list.vue"),
          meta: ["配置管理", "角色权限"],
        },
        // 配置管理-角色新增
        {
          path: "role_details",
          component: () =>
            import("../views/Company/configManage/account/role/details.vue"),
          meta: ["配置管理", "角色权限", "角色编辑"],
        },
        // 配置管理-账号管理
        {
          path: "user_list",
          component: () =>
            import("../views/Company/configManage/account/user/list.vue"),
          meta: ["配置管理", "账号管理"],
        },
        // 配置管理-充值配置
        {
          path: "recharge_list",
          component: () =>
            import("../views/Company/configManage/recharge/index.vue"),
          meta: ["配置管理", "充值配置"],
        },
        // 配置管理-充值配置-模板编辑
        {
          path: "recharge_details",
          component: () =>
            import("../views/Company/configManage/recharge/details.vue"),
          meta: ["配置管理", "充值配置", "模板编辑"],
        },
        // 配置管理-版本控制
        {
          path: "version_list",
          component: () =>
            import("../views/Company/configManage/version/list.vue"),
          meta: ["配置管理", "版本控制"],
        },
        // 配置管理-版本控制-版本详情
        {
          path: "version_details",
          component: () =>
            import("../views/Company/configManage/version/details.vue"),
          meta: ["配置管理", "版本控制", "版本详情"],
        },

        // 公告管理-公告记录
        {
          path: "notice_list",
          component: () => import("../views/Company/notice/notice/list.vue"),
          meta: ["公告管理", "公告记录"],
        },

        // 公告管理-公告记录-公告详情
        {
          path: "notice_details",
          component: () => import("../views/Company/notice/notice/details.vue"),
          meta: ["公告管理", "公告记录", "公告详情"],
        },

        // 公告管理-推送记录
        {
          path: "push_list",
          component: () => import("../views/Company/notice/push/list.vue"),
          meta: ["公告管理", "推送记录"],
        },
        // 公告管理-推送记录-推送详情
        {
          path: "push_details",
          component: () => import("../views/Company/notice/push/details.vue"),
          meta: ["公告管理", "推送记录", "推送详情"],
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
          path: "customer_list",
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
          component: () => import("../views/Merchant/store/list.vue"),
          meta: ["商户管理", "商户列表"],
        },

        // 商户管理-商户列表-商户详情
        {
          path: "merchant_details",
          component: () => import("../views/Merchant/store/details.vue"),
          meta: ["商户管理", "商户列表", "商户详情"],
        },

        // 商户管理-商户审核
        {
          path: "merchant_check",
          component: () => import("../views/Merchant/store/check.vue"),
          meta: ["商户管理", "商户审核"],
        },

        // 商户管理-商户委托
        {
          path: "entrust_list",
          component: () => import("../views/Merchant/entrust/list.vue"),
          meta: ["商户管理", "商户委托"],
        },
        // 商户管理-商户委托-委托详情
        {
          path: "entrust_details",
          component: () => import("../views/Merchant/entrust/details.vue"),
          meta: ["商户管理", "商户委托", "委托详情"],
        },

        // 商户管理-经营类别
        {
          path: "merchant_type",
          component: () => import("../views/Merchant/store/type.vue"),
          meta: ["商户管理", "商户委托"],
        },

        // 商户管理-商户活动列表
        {
          path: "activity_list",
          component: () => import("../views/Merchant/activity/list.vue"),
          meta: ["商户管理", "商户活动"],
        },
        // 商户管理-商户活动创建
        {
          path: "activity_details",
          component: () => import("../views/Merchant/activity/details.vue"),
          meta: ["商户管理", "商户活动"],
        },
        // 商户管理-商户活动类型
        {
          path: "activity_type",
          component: () => import("../views/Merchant/activity/type.vue"),
          meta: ["商户管理", "活动类型"],
        },

        // 活动管理-优惠券列表
        {
          path: "coupon_list",
          component: () => import("../views/Merchant/coupon/list.vue"),
          meta: ["商户管理", "优惠券列表"],
        },
        // 活动管理-优惠券创建
        {
          path: "coupon_details",
          component: () => import("../views/Merchant/coupon/details.vue"),
          meta: ["商户管理", "优惠券列表", "创建优惠券"],
        },
        // 活动管理-优惠券类型
        {
          path: "coupon_type",
          component: () => import("../views/Merchant/coupon/type.vue"),
          meta: ["商户管理", "优惠券类型"],
        },

        // 商户广告数据管理
        {
          path: "merchant_merAdData",
          component: () => import("../views/Merchant/merchant_merAdData.vue"),
          meta: ["商户管理", "商户广告数据管理"],
        },

        // 商户管理-商户数据库
        {
          path: "merchant_database",
          component: () => import("../views/Merchant/merchant/database.vue"),
          meta: ["配置管理", "商户数据库"],
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
