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
          meta: [{ name: "首页", path: "index" }],
        },

        // 道具商城-商城道具
        {
          path: "props_store",
          component: () => import("../views/Company/propsCenter/store.vue"),
          meta: [
            { name: "道具商城", path: "" },
            { name: "商城道具", path: "props_store" },
          ],
        },

        // 道具商城-交易记录
        {
          path: "props_records",
          component: () => import("../views/Company/propsCenter/records.vue"),
          meta: [
            { name: "道具商城", path: "" },
            { name: "交易记录", path: "props_records" },
          ],
        },

        // 道具管理-道具列表
        {
          path: "props_list",
          name: "道具列表",
          component: () => import("../views/Company/propsCenter/list.vue"),
          meta: [
            { name: "道具管理", path: "" },
            { name: "道具列表", path: "props_list" },
          ],
        },
        // 道具管理-详情
        {
          path: "props_details",
          component: () => import("../views/Company/propsCenter/details.vue"),
          meta: [
            { name: "道具管理", path: "" },
            { name: "道具列表", path: "props_list" },
            { name: "道具详情", path: "props_details" },
          ],
        },
        // 道具管理-类型
        {
          path: "props_type",
          component: () => import("../views/Company/propsCenter/type.vue"),
          meta: [
            { name: "道具管理", path: "" },
            { name: "道具类型", path: "props_type" },
          ],
        },
        // 道具管理-道具碎片
        {
          path: "props_fragmentList",
          component: () =>
            import("../views/Company/propsCenter/fragment/list.vue"),
          meta: [
            { name: "道具管理", path: "" },
            { name: "道具碎片", path: "props_fragmentList" },
          ],
        },
        // 道具管理-道具碎片-碎片详情
        {
          path: "props_fragmentDetails",
          component: () =>
            import("../views/Company/propsCenter/fragment/details.vue"),
          meta: [
            { name: "道具管理", path: "" },
            { name: "道具碎片", path: "props_fragmentList" },
            { name: "碎片详情", path: "props_fragmentDetails" },
          ],
        },
        // 道具管理-合成方案
        {
          path: "props_synthesizeList",
          component: () =>
            import("../views/Company/propsCenter/fragment/synthesize_list.vue"),
          meta: [
            { name: "道具管理", path: "" },
            { name: "合成方案", path: "props_synthesizeList" },
          ],
        },
        // 道具管理-合成方案-
        {
          path: "props_synthesizeDetails",
          component: () =>
            import(
              "../views/Company/propsCenter/fragment/synthesize_details.vue"
            ),
          meta: [
            { name: "道具管理", path: "" },
            { name: "合成方案", path: "props_synthesizeDetails" },
          ],
        },
        // 道具管理-房屋风格
        {
          path: "house_style",
          component: () =>
            import("../views/Company/propsCenter/house_style.vue"),
          meta: [
            { name: "道具管理", path: "" },
            { name: "房屋风格", path: "house_style" },
          ],
        },

        // 资源管理-普通资源
        {
          path: "normal_list",
          component: () => import("../views/Resource/Normal/list.vue"),
          meta: [
            { name: "资源管理", path: "" },
            { name: "普通资源", path: "normal_list" },
          ],
        },
        // 资源管理-AR资源
        {
          path: "ar_list",
          component: () => import("../views/Resource/U3D/list.vue"),
          meta: [
            { name: "资源管理", path: "" },
            { name: "AR资源", path: "ar_list" },
          ],
        },
        // 资源管理-AR资源类型
        {
          path: "ar_type",
          component: () => import("../views/Resource/U3D/type.vue"),
          meta: [
            { name: "资源管理", path: "" },
            { name: "AR资源类型", path: "ar_type" },
          ],
        },
        // 资源管理-AR资源-AR资源上传
        {
          path: "ar_upload",
          component: () => import("../views/Resource/U3D/upload.vue"),
          meta: [
            { name: "资源管理", path: "" },
            { name: "AR资源", path: "ar_list" },
            { name: "AR资源上传", path: "ar_upload" },
          ],
        },

        // 配置管理-角色管理
        {
          path: "role_list",
          component: () =>
            import("../views/Company/config/account/role/list.vue"),
          meta: [
            { name: "配置管理", path: "" },
            { name: "角色权限", path: "role_list" },
          ],
        },
        // 配置管理-角色新增
        {
          path: "role_details",
          component: () =>
            import("../views/Company/config/account/role/details.vue"),
          meta: [
            { name: "配置管理", path: "" },
            { name: "角色管理", path: "role_list" },
            { name: "角色编辑", path: "role_details" },
          ],
        },
        // 配置管理-账号管理
        {
          path: "user_list",
          component: () =>
            import("../views/Company/config/account/user/list.vue"),
          meta: [
            { name: "配置管理", path: "" },
            { name: "账号管理", path: "user_list" },
          ],
        },
        // 配置管理-充值配置
        {
          path: "recharge_list",
          component: () => import("../views/Company/config/recharge/index.vue"),
          meta: [
            { name: "配置管理", path: "" },
            { name: "充值配置", path: "recharge_list" },
          ],
        },
        // 配置管理-充值配置-模板编辑
        {
          path: "recharge_details",
          component: () =>
            import("../views/Company/config/recharge/details.vue"),
          meta: [
            { name: "配置管理", path: "" },
            { name: "充值配置", path: "recharge_list" },
            { name: "模板编辑", path: "recharge_details" },
          ],
        },
        // 配置管理-版本控制
        {
          path: "version_list",
          component: () => import("../views/Company/config/version/list.vue"),
          meta: [
            { name: "配置管理", path: "" },
            { name: "版本控制", path: "version_list" },
          ],
        },
        // 配置管理-版本控制-版本详情
        {
          path: "version_details",
          component: () =>
            import("../views/Company/config/version/details.vue"),
          meta: [
            { name: "配置管理", path: "" },
            { name: "版本控制", path: "version_list" },
            { name: "版本详情", path: "version_details" },
          ],
        },
        // 配置管理-个人中心
        {
          path: "personal_center",
          component: () =>
            import("../views/Company/config/account/user/personal.vue"),
          meta: [{ name: "个人中心", path: "personal_center" }],
        },

        // 公告管理-公告记录
        {
          path: "notice_list",
          component: () => import("../views/Company/notice/notice/list.vue"),
          meta: [
            { name: "公告管理", path: "" },
            { name: "公告记录", path: "notice_list" },
          ],
        },

        // 公告管理-公告记录-公告详情
        {
          path: "notice_details",
          component: () => import("../views/Company/notice/notice/details.vue"),
          meta: [
            { name: "公告管理", path: "" },
            { name: "公告记录", path: "notice_list" },
            { name: "公告详情", path: "notice_details" },
          ],
        },

        // 公告管理-推送记录
        {
          path: "push_list",
          component: () => import("../views/Company/notice/push/list.vue"),
          meta: [
            { name: "公告管理", path: "" },
            { name: "推送记录", path: "push_list" },
          ],
        },
        // 公告管理-推送记录-推送详情
        {
          path: "push_details",
          component: () => import("../views/Company/notice/push/details.vue"),
          meta: [
            { name: "公告管理", path: "" },
            { name: "推送记录", path: "push_list" },
            { name: "推送详情", path: "push_details" },
          ],
        },

        // 拍卖行-拍卖列表
        {
          path: "auction_list",
          component: () => import("../views/UserData/auction/list.vue"),
          meta: [
            { name: "拍卖行", path: "" },
            { name: "拍卖列表", path: "auction_list" },
          ],
        },

        // 拍卖行-交易记录
        {
          path: "auction_records",
          component: () => import("../views/UserData/auction/records.vue"),
          meta: [
            { name: "拍卖行", path: "" },
            { name: "交易记录", path: "auction_records" },
          ],
        },

        // 用户管理-用户列表
        {
          path: "customer_list",
          component: () => import("../views/UserData/userInfo/list.vue"),
          meta: [
            { name: "用户管理", path: "" },
            { name: "用户列表", path: "customer_list" },
          ],
        },

        // 用户管理-用户详情
        {
          path: "user_details",
          component: () => import("../views/UserData/userInfo/details.vue"),
          meta: [
            { name: "用户管理", path: "" },
            { name: "用户详情", path: "user_details" },
          ],
        },

        // 用户管理-群组管理
        {
          path: "user_group",
          component: () => import("../views/UserData/userInfo/user/group.vue"),
          meta: [
            { name: "用户管理", path: "" },
            { name: "群组管理", path: "user_group" },
          ],
        },

        // 用户管理-房产列表
        // {
        //   path: "userdata_houseList",
        //   component: () => import("../views/UserData/userHouse/list.vue"),
        //   meta: [
        //     { name: "用户管理", path: "" },
        //     { name: "房产列表", path: "userdata_houseList" },
        //   ],
        // },
        // 用户管理-房产详情
        // {
        //   path: "userdata_houseDetails",
        //   component: () => import("../views/UserData/userHouse/details.vue"),
        //   meta: [
        //     { name: "用户管理", path: "" },
        //     { name: "房产详情", path: "userdata_houseDetails" },
        //   ],
        // },

        // 用户管理-个人流水
        {
          path: "account_flow",
          component: () => import("../views/UserData/userInfo/user/flow.vue"),
          meta: [
            { name: "用户管理", path: "" },
            { name: "用户详情", path: "user_details" },
            { name: "个人流水", path: "account_flow" },
          ],
        },
        // 用户管理-获奖记录
        {
          path: "account_prize",
          component: () => import("../views/UserData/userInfo/user/prize.vue"),
          meta: [
            { name: "用户管理", path: "" },
            { name: "用户详情", path: "user_details" },
            { name: "获奖记录", path: "account_prize" },
          ],
        },
        // 用户管理-个人资产
        {
          path: "user_assets",
          component: () => import("../views/UserData/userInfo/user/assets.vue"),
          meta: [
            { name: "用户管理", path: "" },
            { name: "个人资产", path: "user_assets" },
          ],
        },

        // 用户管理-用户优惠券
        {
          path: "cusCoupon_list",
          component: () => import("../views/UserData/userInfo/user/coupon.vue"),
          meta: [
            { name: "用户管理", path: "" },
            { name: "用户优惠券", path: "cusCoupon_list" },
          ],
        },

        // 用户管理-用户反馈
        {
          path: "feedback_list",
          component: () => import("../views/UserData/feedback/list.vue"),
          meta: [
            { name: "用户管理", path: "" },
            { name: "用户反馈", path: "feedback_list" },
          ],
        },

        // 商户管理-商户列表
        {
          path: "merchant_list",
          component: () => import("../views/Merchant/store/list.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "商户列表", path: "merchant_list" },
          ],
        },

        // 商户管理-商户列表-商户详情
        {
          path: "merchant_details",
          component: () => import("../views/Merchant/store/details.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "商户列表", path: "merchant_list" },
            { name: "商户详情", path: "merchant_details" },
          ],
        },

        // 商户管理-商户审核
        {
          path: "merchant_check",
          component: () => import("../views/Merchant/store/check.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "商户审核", path: "merchant_check" },
          ],
        },

        // 商户管理-商户委托
        {
          path: "entrust_list",
          name: "商户委托",
          component: () => import("../views/Merchant/entrust/list.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "商户委托", path: "entrust_list" },
          ],
        },
        // 商户管理-商户委托-委托详情
        {
          path: "entrust_details",
          component: () => import("../views/Merchant/entrust/details.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "商户委托", path: "entrust_list" },
            { name: "委托详情", path: "entrust_details" },
          ],
        },

        // 商户管理-经营类别
        {
          path: "merchant_type",
          component: () => import("../views/Merchant/store/type.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "商户委托", path: "merchant_type" },
          ],
        },

        // 商户管理-商户活动列表
        {
          path: "activity_list",
          name: "活动列表",
          component: () => import("../views/Merchant/activity/list.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "活动列表", path: "activity_list" },
          ],
        },
        // 商户管理-商户活动创建
        {
          path: "activity_details",
          component: () => import("../views/Merchant/activity/details.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "活动列表", path: "activity_list" },
            { name: "编辑活动", path: "activity_details" },
          ],
        },
        // 商户管理-商户活动类型
        {
          path: "activity_type",
          component: () => import("../views/Merchant/activity/type.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "活动类型", path: "activity_type" },
          ],
        },
        // 商户管理-商户活动规则
        {
          path: "activity_rule",
          component: () => import("../views/Merchant/activity/rule.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "活动规则", path: "activity_rule" },
          ],
        },
        // 商户广告数据管理
        {
          path: "merchant_advert",
          component: () => import("../views/Merchant/store/advert.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "商户广告", path: "merchant_advert" },
          ],
        },

        // 商户管理-商户数据库
        {
          path: "merchant_database",
          component: () => import("../views/Merchant/merchant/database.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "商户数据库", path: "merchant_database" },
          ],
        },

        // 商户管理-提现管理
        {
          path: "merchant_drawing",
          component: () => import("../views/Merchant/store/drawing.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "提现管理", path: "merchant_drawing" },
          ],
        },

        // 活动管理-优惠券列表
        {
          path: "coupon_list",
          component: () => import("../views/Merchant/coupon/list.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "优惠券列表", path: "coupon_list" },
          ],
        },
        // 活动管理-优惠券创建
        {
          path: "coupon_details",
          component: () => import("../views/Merchant/coupon/details.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "优惠券列表", path: "coupon_list" },
            { name: "创建优惠券", path: "coupon_details" },
          ],
        },
        // 活动管理-优惠券类型
        {
          path: "coupon_type",
          component: () => import("../views/Merchant/coupon/type.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "优惠券类型", path: "coupon_type" },
          ],
        },

        // 订单管理
        {
          path: "merchant_order",
          component: () => import("../views/Merchant/merchant_order.vue"),
          meta: [
            { name: "商户管理", path: "" },
            { name: "订单管理", path: "merchant_order" },
          ],
        },

        // AR游戏配置-武器列表
        {
          path: "weapon_list",
          component: () => import("../views/ArGame/weapon/list.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "武器列表", path: "weapon_list" },
          ],
        },
        // AR游戏配置-武器详情
        {
          path: "weapon_details",
          component: () => import("../views/ArGame/weapon/details.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "武器列表", path: "weapon_list" },
            { name: "武器详情", path: "weapon_details" },
          ],
        },

        // AR游戏配置-奖池列表
        {
          path: "prizePool_list",
          component: () => import("../views/ArGame/prizePool/list.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "奖池列表", path: "prizePool_list" },
          ],
        },
        // AR游戏配置-奖池详情
        {
          path: "prizePool_details",
          component: () => import("../views/ArGame/prizePool/details.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "奖池列表", path: "prizePool_list" },
            { name: "奖池详情", path: "prizePool_details" },
          ],
        },

        // AR游戏配置-盲盒列表
        {
          path: "blind_list",
          component: () => import("../views/ArGame/blindBox/list.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "盲盒列表", path: "blind_list" },
          ],
        },
        // AR游戏配置-盲盒详情
        {
          path: "blind_details",
          component: () => import("../views/ArGame/blindBox/details.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "盲盒列表", path: "blind_list" },
            { name: "盲盒详情", path: "blind_details" },
          ],
        },

        // AR游戏配置-内容池列表
        {
          path: "contentPool_list",
          component: () => import("../views/ArGame/contentPool/list.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "内容池列表", path: "content_list" },
          ],
        },
        // AR游戏配置-内容池详情
        {
          path: "contentPool_details",
          component: () => import("../views/ArGame/contentPool/details.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "内容池列表", path: "contentPool_list" },
            { name: "内容池详情", path: "contentPool_details" },
          ],
        },

        // AR游戏配置-游戏对象列表
        {
          path: "gameObj_list",
          name: "游戏对象列表",
          component: () => import("../views/ArGame/gameObj/list.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "游戏对象列表", path: "gameObj_list" },
          ],
        },
        // AR游戏配置-游戏对象详情
        {
          path: "gameObj_details",
          component: () => import("../views/ArGame/gameObj/details_game.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "游戏对象列表", path: "gameObj_list" },
            { name: "游戏对象详情", path: "gameObj_details" },
          ],
        },
        // AR游戏配置-生物对象详情
        {
          path: "biologyObj_details",
          component: () =>
            import("../views/ArGame/gameObj/details_biology.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "游戏对象列表", path: "gameObj_list" },
            { name: "生物对象详情", path: "biologyObj_details" },
          ],
        },
        // AR游戏配置-游戏对象类型
        {
          path: "gameObj_type",
          component: () => import("../views/ArGame/gameObj/type.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "游戏对象类型", path: "gameObj_type" },
          ],
        },

        // AR游戏配置-实体对象列表
        {
          path: "gameEnity_list",
          name: "实体对象列表",
          component: () => import("../views/ArGame/gameEnity/list.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "实体对象列表", path: "gameEnity_list" },
          ],
        },

        // AR游戏配置-生物实体对象详情
        {
          path: "gameEnity_biologyDetails",
          component: () =>
            import("../views/ArGame/gameEnity/biology_details.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "实体对象列表", path: "gameEnity_list" },
            { name: "实体阶段奖励", path: "gameEnity_biologyDetails" },
          ],
        },

        // AR游戏配置-事件元素
        {
          path: "event_list",
          name: "事件元素",
          component: () => import("../views/ArGame/event/list.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "事件元素", path: "event_list" },
          ],
        },
        // AR游戏配置-事件列表-事件元素
        {
          path: "event_details",
          component: () => import("../views/ArGame/event/details.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "事件列表", path: "event_list" },
            { name: "事件元素", path: "event_details" },
          ],
        },

        // AR游戏配置-事件类型
        {
          path: "eventType_list",
          component: () => import("../views/ArGame/eventType/list.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "事件类型", path: "eventType_list" },
          ],
        },

        // AR游戏配置-历史事件
        {
          path: "eventHistory_list",
          component: () => import("../views/ArGame/eventHistory/list.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "历史事件", path: "eventHistory_list" },
          ],
        },

        // AR游戏配置-活动配置
        {
          path: "config_activity",
          component: () => import("../views/ArGame/config/activity.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "活动配置", path: "config_activity" },
          ],
        },

        // AR游戏配置-城市范围配置
        {
          path: "config_scope",
          component: () => import("../views/ArGame/config/scope.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "城市范围配置", path: "config_scope" },
          ],
        },

        // AR游戏配置-服务器配置
        {
          path: "config_server",
          component: () => import("../views/ArGame/config/server.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "服务器配置", path: "config_server" },
          ],
        },

        // AR游戏配置-游戏公告列表
        {
          path: "gameNotice_list",
          component: () => import("../views/ArGame/notice/list.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "游戏公告列表", path: "gameNotice_list" },
          ],
        },
        // AR游戏配置-游戏公告详情
        {
          path: "gameNotice_details",
          component: () => import("../views/ArGame/notice/details.vue"),
          meta: [
            { name: "AR游戏配置", path: "" },
            { name: "游戏公告列表", path: "gameNotice_list" },
            { name: "游戏公告详情", path: "gameNotice_details" },
          ],
        },
      ],
    },
  ],
});
