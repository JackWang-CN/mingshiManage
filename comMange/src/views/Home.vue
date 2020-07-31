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
        <!-- 公告 -->
        <el-menu-item index="notice">
          <i class="el-icon-message-solid"></i>
          <span slot="title">公告</span>
        </el-menu-item>
        <!-- 权限管理 -->
        <el-submenu index="authorization">
          <template slot="title">
            <i class="el-icon-s-check"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item index="author_roleList">角色管理</el-menu-item>
          <el-menu-item index="author_user">用户管理</el-menu-item>
        </el-submenu>
        <!-- 资源管理 -->

        <el-submenu index="resource">
          <template slot="title">
            <i class="el-icon-s-grid"></i>
            <span>资源管理</span>
          </template>
          <el-menu-item index="resource_type">资源分类</el-menu-item>
          <el-menu-item index="resource_list">资源列表</el-menu-item>
        </el-submenu>
        <!-- 商户管理 -->
        <el-submenu index="store">
          <template slot="title">
            <i class="el-icon-s-shop"></i>
            <span>商户管理</span>
          </template>
          <el-menu-item index="store_list">商户列表</el-menu-item>
          <el-menu-item index="store_check">商户审核</el-menu-item>
        </el-submenu>
        <!-- 客户管理 -->
        <el-menu-item index="client">
          <i class="el-icon-s-custom"></i>
          <span slot="title">客户管理</span>
        </el-menu-item>

        <el-submenu index="configure">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>配置管理</span>
          </template>
          <el-menu-item index="configure_business">经营类别</el-menu-item>
          <el-menu-item index="configure_dbRelation">数据库关联</el-menu-item>
          <el-menu-item index="configure_merInfoAttach">商家信息附件</el-menu-item>
          <el-menu-item index="configure_noticerecord">公告记录</el-menu-item>
          <el-menu-item index="configure_propsApproach">道具途径</el-menu-item>
          <el-menu-item index="configure_pushmegs">推送信息</el-menu-item>
          <el-menu-item index="configure_pushTemplate">推送模板</el-menu-item>
          <el-menu-item index="configure_roleGrauth">角色权限</el-menu-item>
          <el-menu-item index="configure_verControl">版本控制</el-menu-item>
        </el-submenu>

        <el-submenu index="userdata">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="userdata_accFlow">帐户流水</el-menu-item>
          <el-menu-item index="userdata_assets">道具资产</el-menu-item>
          <el-menu-item index="userdata_auctionData">拍卖行数据</el-menu-item>
          <el-menu-item index="userdata_aucTradeRec">拍卖交易记录</el-menu-item>
          <el-menu-item index="userdata_chatRecord">聊天记录</el-menu-item>
          <el-menu-item index="userdata_friendList">好友列表</el-menu-item>
          <el-menu-item index="userdata_fundAcc">资金帐户</el-menu-item>
          <el-menu-item index="userdata_groupBase">群组管理</el-menu-item>
          <el-menu-item index="userdata_groupMembers">群成员管理</el-menu-item>
          <el-menu-item index="userdata_spaceData">空间数据管理</el-menu-item>
          <el-menu-item index="userdata_spaEstLicense">地产数据管理</el-menu-item>
          <el-menu-item index="userdata_spaHouIndoor">道具数据管理</el-menu-item>
          <el-menu-item index="userdata_spaHousePro">房产数据管理</el-menu-item>
          <el-menu-item index="userdata_userInfo">用户个人信息管理</el-menu-item>
        </el-submenu>

        <el-submenu index="merchant">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            <span>商家管理</span>
          </template>
          <el-menu-item index="merchant_busReqTrace">业务请求跟踪</el-menu-item>
          <el-menu-item index="merchant_couponProduc">优惠券量产管理</el-menu-item>
          <el-menu-item index="merchant_entrustReqData">委托请求数据管理</el-menu-item>
          <el-menu-item index="merchant_merAdData">商户广告数据管理</el-menu-item>
          <el-menu-item index="merchant_order">订单管理</el-menu-item>
          <el-menu-item index="merchant_orderPayDetail">订单支付详情管理</el-menu-item>
          <el-menu-item index="merchant_personalConf">枚举配置管理</el-menu-item>
          <el-menu-item index="merchant_productCoupBind">商品券类绑定管理</el-menu-item>
          <el-menu-item index="merchant_productInfo">商品信息管理</el-menu-item>
          <el-menu-item index="merchant_roleGrAuth">角色组权限管理</el-menu-item>
          <el-menu-item index="merchant_roleGroup">角色组管理</el-menu-item>
          <el-menu-item index="merchant_userInfo">用户信息主表</el-menu-item>
          </el-submenu>

          
          <el-menu-item index="fileresources_ResourceMapping">
            <i class="el-icon-folder"></i>
            <span slot="title">资源映射表</span>
          </el-menu-item>

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
              style="margin-right:10px;font-weight:bold;font-size:15px;display:inline-block"
            >当前位置:</div>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-for="(v,i) in this.$route.meta" :key="i">{{v}}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 下拉 -->
        <el-dropdown placement="top" trigger="hover" :hide-on-click="true">
          <span>尊敬的{{UserName}}，欢迎您！</span>
          <span class="el-dropdown-link">
            <el-avatar :size="40" :src="circleUrl" ></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown" class="dropdown_menu">
            <el-dropdown-item @click.native="toPersonalCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="changePassword">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 弹出框 -->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" id="change_password" width="30%">
          <el-form :model="changePwd">
            <el-form-item label="原密码" label-width="100px">
              <el-input v-model="changePwd.old_password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" label-width="100px">
              <el-input v-model="changePwd.new_password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" label-width="100px">
              <el-input v-model="changePwd.check_password" autocomplete="off" show-password></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
  data() {
    return {
      circleUrl:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      dialogFormVisible: false,
      UserName:"未登录",
      changePwd: {
        old_password: "",
        new_password: "",
        check_password: ""
      }
    };
  },
  mounted(){
    this.UserName = sessionStorage.getItem("userName");
    this.circleUrl = sessionStorage.getItem("headImg");
  },
  methods: {
    // 个人中心
    toPersonalCenter() {
      this.$router.push("personal_center");
    },
    // 修改密码
    changePassword() {
      console.log("修改密码");
      this.dialogFormVisible = true;
    },
    // 注销
    logout() {
      this.$router.replace("/login");
    }
  }
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
      // 修改密码
      .el-dropdown {
        display: flex;
        align-items: center;
      }
    }
    // 主体
    .el-main {
      background-color: #f2f2f2;
    }
  }
}
</style>
