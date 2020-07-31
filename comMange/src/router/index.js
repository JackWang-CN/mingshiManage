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

        // 资源管理-资源分类
        {
          path: "resource_type",
          component: () => import("../views/home/resource_type.vue"),
          meta: ["资源管理", "资源分类"],
        },
        // 资源管理-资源列表
        {
          path: "resource_list",
          component: () => import("../views/home/resource_list.vue"),
          meta: ["资源管理", "资源列表"],
        },

        // 商户管理-商户列表
        {
          path: "store_list",
          component: () => import("../views/home/store_list.vue"),
          meta: ["商户管理", "商户列表"],
        },
        // 商户管理-商户审核
        {
          path: "store_check",
          component: () => import("../views/home/store_check.vue"),
          meta: ["商户管理", "商户审核"],
        },

        // 客户管理
        {
          path: "client",
          component: () => import("../views/home/client.vue"),
          meta: ["客户管理"],
        },

        // 经营类别
        {
          path: "configure_business",
          component: () => import("../views/home/configure_business.vue"),
          meta: ["配置管理","经营类别"],
        },

        // 数据库关联
        {
          path: "configure_dbRelation",
          component: () => import("../views/home/configure_dbRelation.vue"),
          meta: ["配置管理","数据库关联"],
        },

        // 商家信息附件
        {
          path: "configure_merInfoAttach",
          component: () => import("../views/home/configure_merInfoAttach.vue"),
          meta: ["配置管理","商家信息附件"],
        },

        // 公告记录
        {
          path: "configure_noticerecord",
          component: () => import("../views/home/configure_noticerecord.vue"),
          meta: ["配置管理","公告记录"],
        },

        // 道具途径
        {
          path: "configure_propsApproach",
          component: () => import("../views/home/configure_propsApproach.vue"),
          meta: ["配置管理","道具途径"],
        },

        // 推送信息
        {
          path: "configure_pushmegs",
          component: () => import("../views/home/configure_pushmegs.vue"),
          meta: ["配置管理","推送信息"],
        },

        // 推送模板
        {
          path: "configure_pushTemplate",
          component: () => import("../views/home/configure_pushTemplate.vue"),
          meta: ["配置管理","推送模板"],
        },

        // 角色权限
        {
          path: "configure_roleGrauth",
          component: () => import("../views/home/configure_roleGrauth.vue"),
          meta: ["配置管理","角色权限"],
        },

        // 版本控制
        {
          path: "configure_verControl",
          component: () => import("../views/home/configure_verControl.vue"),
          meta: ["配置管理","版本控制"],
        },

        // 帐户流水
        {
          path: "userdata_accFlow",
          component: () => import("../views/UserData/userdata_accFlow.vue"),
          meta: ["用户管理","帐户流水"],
        },

        // 道具资产
        {
          path: "userdata_assets",
          component: () => import("../views/UserData/userdata_assets.vue"),
          meta: ["用户管理","道具资产"],
        },

        // 拍卖行数据
        {
          path: "userdata_auctionData",
          component: () => import("../views/UserData/userdata_auctionData.vue"),
          meta: ["用户管理","拍卖行数据"],
        },

        // 拍卖交易记录
        {
          path: "userdata_aucTradeRec",
          component: () => import("../views/UserData/userdata_aucTradeRec.vue"),
          meta: ["用户管理","拍卖交易记录"],
        },

        // 聊天记录
        {
          path: "userdata_chatRecord",
          component: () => import("../views/UserData/userdata_chatRecord.vue"),
          meta: ["用户管理","聊天记录"],
        },

        // 好友列表
        {
          path: "userdata_friendList",
          component: () => import("../views/UserData/userdata_friendList.vue"),
          meta: ["用户管理","好友列表"],
        },

        // 资金帐户
        {
          path: "userdata_fundAcc",
          component: () => import("../views/UserData/userdata_fundAcc.vue"),
          meta: ["用户管理","资金帐户"],
        },

        // 群组管理
        {
          path: "userdata_groupBase",
          component: () => import("../views/UserData/userdata_groupBase.vue"),
          meta: ["用户管理","群组管理"],
        },

        // 群成员管理
        {
          path: "userdata_groupMembers",
          component: () => import("../views/UserData/userdata_groupMembers.vue"),
          meta: ["用户管理","群成员管理"],
        },

        // 地产数据管理
        {
          path: "userdata_spaceData",
          component: () => import("../views/UserData/userdata_spaceData.vue"),
          meta: ["用户管理","空间数据管理"],
        },

        // 地产数据管理
        {
          path: "userdata_spaEstLicense",
          component: () => import("../views/UserData/userdata_spaEstLicense.vue"),
          meta: ["用户管理","地产数据管理"],
        },

        // 道具数据管理
        {
          path: "userdata_spaHouIndoor",
          component: () => import("../views/UserData/userdata_spaHouIndoor.vue"),
          meta: ["用户管理","道具数据管理"],
        },

        // 房产数据管理
        {
          path: "userdata_spaHousePro",
          component: () => import("../views/UserData/userdata_spaHousePro.vue"),
          meta: ["用户管理","房产数据管理"],
        },

        // 用户个人信息管理
        {
          path: "userdata_userInfo",
          component: () => import("../views/UserData/userdata_userInfo.vue"),
          meta: ["用户管理","用户个人信息管理"],
        },

        // 业务请求跟踪管理
        {
          path: "merchant_busReqTrace",
          component: () => import("../views/Merchant/merchant_busReqTrace.vue"),
          meta: ["商家管理","业务请求跟踪管理"],
        },

        // 优惠券量产管理
        {
          path: "merchant_couponProduc",
          component: () => import("../views/Merchant/merchant_couponProduc.vue"),
          meta: ["商家管理","优惠券量产管理"],
        },

        // 委托请求数据管理
        {
          path: "merchant_entrustReqData",
          component: () => import("../views/Merchant/merchant_entrustReqData.vue"),
          meta: ["商家管理","委托请求数据管理"],
        },

        // 商户广告数据管理
        {
          path: "merchant_merAdData",
          component: () => import("../views/Merchant/merchant_merAdData.vue"),
          meta: ["商家管理","商户广告数据管理"],
        },

        // 订单管理
        {
          path: "merchant_order",
          component: () => import("../views/Merchant/merchant_order.vue"),
          meta: ["商家管理","订单管理"],
        },

        // 订单支付详情管理
        {
          path: "merchant_orderPayDetail",
          component: () => import("../views/Merchant/merchant_orderPayDetail.vue"),
          meta: ["商家管理","订单支付详情管理"],
        },

        // 枚举配置管理
        {
          path: "merchant_personalConf",
          component: () => import("../views/Merchant/merchant_personalConf.vue"),
          meta: ["商家管理","枚举配置管理"],
        },

        // 商品券类绑定管理
        {
          path: "merchant_productCoupBind",
          component: () => import("../views/Merchant/merchant_productCoupBind.vue"),
          meta: ["商家管理","商品券类绑定管理"],
        },

        // 商品信息管理
        {
          path: "merchant_productInfo",
          component: () => import("../views/Merchant/merchant_productInfo.vue"),
          meta: ["商家管理","商品信息管理"],
        },

        // 角色组权限管理
        {
          path: "merchant_roleGrAuth",
          component: () => import("../views/Merchant/merchant_roleGrAuth.vue"),
          meta: ["商家管理","角色组权限管理"],
        },

        // 角色组权限管理
        {
          path: "merchant_roleGroup",
          component: () => import("../views/Merchant/merchant_roleGroup.vue"),
          meta: ["商家管理","角色组管理"],
        },

        // 用户信息主表
        {
          path: "merchant_userInfo",
          component: () => import("../views/Merchant/merchant_userInfo.vue"),
          meta: ["商家管理","用户信息主表"],
        },

        // 资源映射表
        {
          path: "fileresources_ResourceMapping",
          component: () => import("../views/FileResources/fileresources_ResourceMapping.vue"),
          meta: ["商家管理","资源映射表"],
        },













      ],
    },
  ],
});
