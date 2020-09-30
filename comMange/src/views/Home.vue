<!-- 管理系统主页 -->
<template>
  <el-container id="home">
    <!-- 左侧栏 -->
    <el-aside width="200px" class="left_wrap">
      <div class="logo">
        <img src="../assets/images/icon/logo1.png" alt />
      </div>
      <el-menu
        :default-active="$route.path.substring(6)"
        class="el-menu-vertical-demo"
        :router="true"
        :unique-opened="true"
      >
        <!-- 首页 -->
        <el-menu-item index="index">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <!-- 道具商城 -->
        <el-submenu index="props">
          <template slot="title">
            <i class="el-icon-shopping-cart-2"></i>
            <span>道具商城</span>
          </template>
          <el-menu-item index="props_store">商城道具</el-menu-item>
          <el-menu-item index="props_records">交易记录</el-menu-item>
        </el-submenu>

        <!-- 道具管理 -->
        <el-submenu index="props_manage">
          <template slot="title">
            <i class="el-icon-shopping-cart-2"></i>
            <span>道具管理</span>
          </template>
          <el-menu-item index="props_list">道具列表</el-menu-item>
          <el-menu-item index="props_type">道具类型</el-menu-item>
          <el-menu-item index="house_style">房屋风格</el-menu-item>
        </el-submenu>

        <!-- 拍卖行 -->
        <el-submenu index="auction">
          <template slot="title">
            <i class="el-icon-office-building"></i>
            <span>拍卖行</span>
          </template>
          <el-menu-item index="auction_list">拍卖列表</el-menu-item>
          <el-menu-item index="auction_records">交易记录</el-menu-item>
        </el-submenu>

        <!-- 资源管理 -->
        <el-submenu index="resource">
          <template slot="title">
            <i class="el-icon-s-grid"></i>
            <span>资源管理</span>
          </template>
          <el-menu-item index="normal_list">普通资源管理</el-menu-item>
          <el-menu-item index="ar_list">AR资源管理</el-menu-item>
        </el-submenu>

        <!-- 活动管理 -->
        <el-submenu index="activity">
          <template slot="title">
            <i class="el-icon-s-management"></i>
            <span>活动管理</span>
          </template>
          <el-menu-item index="activity_list">商户活动</el-menu-item>
          <el-menu-item index="activity_type">活动类型</el-menu-item>
          <el-menu-item index="coupon_list">优惠券</el-menu-item>
          <el-menu-item index="coupon_type">优惠券类型</el-menu-item>
          <!-- <el-menu-item index="user_accFlow">帐户流水</el-menu-item>
          <el-menu-item index="userdata_spaceData">空间数据管理</el-menu-item>
          <el-menu-item index="userdata_spaEstLicense">地产数据管理</el-menu-item>
          <el-menu-item index="userdata_houseList">房产数据管理</el-menu-item>-->
        </el-submenu>

        <!-- 商户管理 -->
        <el-submenu index="merchant">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            <span>商户管理</span>
          </template>
          <el-menu-item index="merchant_list">商户列表</el-menu-item>
          <el-menu-item index="merchant_check">商户审核</el-menu-item>
          <el-menu-item index="entrust_list">商户委托</el-menu-item>
          <el-menu-item index="merchant_type">经营类别</el-menu-item>

          <el-menu-item index="merchant_merAdData">商户广告</el-menu-item>

          <el-menu-item index="merchant_database">商户数据库</el-menu-item>
          <!-- <el-menu-item index="merchant_order">订单管理</el-menu-item> -->
          <!-- <el-menu-item index="merchant_productCoupBind">商品券类绑定管理</el-menu-item> -->
          <!-- <el-menu-item index="merchant_productInfo">商品信息管理</el-menu-item> -->
          <!-- <el-menu-item index="merchant_userInfo">用户信息主表</el-menu-item> -->
        </el-submenu>

        <!-- 用户管理 -->
        <el-submenu index="userdata">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="customer_list">用户列表</el-menu-item>
          <el-menu-item index="user_group">群组管理</el-menu-item>
          <!-- <el-menu-item index="user_accFlow">帐户流水</el-menu-item>
          <el-menu-item index="userdata_spaceData">空间数据管理</el-menu-item>
          <el-menu-item index="userdata_spaEstLicense">地产数据管理</el-menu-item>
          <el-menu-item index="userdata_houseList">房产数据管理</el-menu-item>-->
        </el-submenu>

        <!-- 公告管理 -->
        <el-submenu index="notice">
          <template slot="title">
            <i class="el-icon-message-solid"></i>
            <span>公告管理</span>
          </template>
          <el-menu-item index="notice_list">公告记录</el-menu-item>
          <el-menu-item index="push_list">推送记录</el-menu-item>
        </el-submenu>

        <!-- 配置管理 -->
        <el-submenu index="configure">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>配置管理</span>
          </template>
          <el-menu-item index="recharge_list">金币充值配置</el-menu-item>
          <el-menu-item index="version_list">APP版本控制</el-menu-item>
          <el-menu-item index="role_list">角色管理</el-menu-item>
          <el-menu-item index="user_list">账号管理</el-menu-item>
        </el-submenu>

        <!-- 
          【无下拉菜单】
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
          
          【带下拉菜单】
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-submenu>
        -->
      </el-menu>
    </el-aside>

    <!-- 右栏 -->
    <el-container class="right_wrap">
      <!-- 头部 -->
      <el-header>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          <el-breadcrumb-item>
            <div
              style="
                margin-right: 10px;
                font-weight: bold;
                font-size: 15px;
                display: inline-block;
              "
            >
              当前位置:
            </div>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-for="(v, i) in this.$route.meta" :key="i">
            {{ v }}
          </el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 下拉 -->
        <div class="dropdown">
          <span>尊敬的{{ UserName }}，欢迎您！</span>
          <el-dropdown placement="top" trigger="hover" :hide-on-click="true">
            <el-avatar :size="50" :src="circleUrl"></el-avatar>
            <el-dropdown-menu slot="dropdown" class="dropdown_menu">
              <el-dropdown-item @click.native="toPersonalCenter"
                >个人中心</el-dropdown-item
              >
              <el-dropdown-item @click.native="changePassword"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item @click.native="logout"
                >注销登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <!-- 弹出框 -->
        <el-dialog
          title="修改密码"
          :visible.sync="dialogFormVisible"
          id="change_password"
          width="30%"
        >
          <el-form :model="changePwd">
            <el-form-item label="原密码" label-width="100px">
              <el-input
                v-model="changePwd.old_password"
                autocomplete="off"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" label-width="100px">
              <el-input
                v-model="changePwd.new_password"
                autocomplete="off"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" label-width="100px">
              <el-input
                v-model="changePwd.check_password"
                autocomplete="off"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </el-header>

      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    var token = sessionStorage.getItem("token");
    if (!token) {
      this.$router.replace("/login");
      this.$message.error("账号已注销，请重新登录！");
    }
    this.UserName = sessionStorage.getItem("userName");
    this.circleUrl =
      "https://api.resources.scmsar.com/file/download/source/v1?Mark=" +
      sessionStorage.getItem("headImg");
  },

  data() {
    return {
      circleUrl: "",
      dialogFormVisible: false,
      UserName: "未登录",
      changePwd: {
        old_password: "",
        new_password: "",
        check_password: "",
      },
    };
  },

  methods: {
    // 个人中心
    toPersonalCenter() {
      this.$router.push("personal_center");
    },
    // 修改密码
    changePassword() {
      this.dialogFormVisible = true;
    },
    // 注销
    logout() {
      sessionStorage.clear();
      this.$router.replace("/login");
    },
  },
};
</script>

<style lang="scss">
#home {
  height: 100%;
  // 左侧栏
  .left_wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    &::-webkit-scrollbar {
      display: none;
    }
    .logo {
      border-right: 1px solid #e6e6e6;
      padding: 0.5rem 0;
      text-align: center;
    }
    ul {
      flex: 1 0 auto;
    }
  }
  // 右栏
  .right_wrap {
    // 头部
    .el-header {
      padding: 0 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // 面包屑
      .breadcrumb {
        display: inline-block;
      }
      .dropdown {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #606266;
      }
      // 修改密码
      .el-dropdown {
        display: flex;
        align-items: center;
      }
    }
    // 主体
    .el-main {
      background-color: #f2f2f2;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
