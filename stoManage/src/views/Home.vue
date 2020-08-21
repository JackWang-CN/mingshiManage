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
        <!-- 商家活动 -->
        <el-submenu index="activity">
          <template slot="title">
            <i class="el-icon-message-solid"></i>
            <span>商家活动</span>
          </template>
          <el-menu-item index="publish">我需要援助</el-menu-item>
          <el-menu-item index="underway">进行中活动</el-menu-item>
          <el-menu-item index="history">历史活动</el-menu-item>
        </el-submenu>

        <!-- 广告管理 -->
        <el-submenu index="advertising">
          <template slot="title">
            <i class="el-icon-s-management"></i>
            <span>广告管理</span>
          </template>
          <el-menu-item index="advertising">广告管理</el-menu-item>
        </el-submenu>

        <!-- 商品管理 -->
        <el-submenu index="goods">
          <template slot="title">
            <i class="el-icon-s-grid"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="goods_type">商品分类</el-menu-item>
          <el-menu-item index="goods_list">商品列表</el-menu-item>
        </el-submenu>

        <!-- 订单管理 -->
        <el-menu-item index="order_list">
          <i class="el-icon-s-claim"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>

        <!-- 我的收益 -->
        <el-menu-item index="earnings">
          <i class="el-icon-s-finance"></i>
          <span slot="title">我的收益</span>
        </el-menu-item>

        <!-- 客户管理 -->
        <el-submenu index="customer">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>客户管理</span>
          </template>
          <el-menu-item index="message_center">消息中心</el-menu-item>
          <el-menu-item index="message_group">消息群发</el-menu-item>
          <el-menu-item index="friend_list">好友列表</el-menu-item>
        </el-submenu>

        <!-- 店铺管理 -->
        <el-submenu index="store">
          <template slot="title">
            <i class="el-icon-s-shop"></i>
            <span>店铺管理</span>
          </template>
          <el-menu-item index="info">基础信息</el-menu-item>
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
              style="margin-right:10px;font-weight:bold;font-size:15px;display:inline-block"
            >当前位置:</div>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-for="(v, i) in this.$route.meta" :key="i">
            {{
            v
            }}
          </el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 下拉 -->
        <div class="dropdown">
          <span>尊敬的{{ userName }}，欢迎您！</span>
          <el-dropdown placement="top" trigger="hover" :hide-on-click="true">
            <span class="el-dropdown-link">
              <el-avatar :size="50" :src="circleUrl" shape="square"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown" class="dropdown_menu">
              <el-dropdown-item @click.native="toPersonalCenter">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="changePassword">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logout">注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

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
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
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
import { ws, sendIm } from "@/utils/api/imApi";
export default {
  created() {
    var token = sessionStorage.getItem("token");
    var merchantname = sessionStorage.getItem("merchantname");

    ws.onopen = () => {
      // 1.创建IM报文
      var imObj = {
        Authorization: token,
        Type: "6",
        MerchantsId: merchantname,
      };
      // 2.发送
      sendIm(imObj);
    };

    if (!token) {
      this.$router.replace("/login");
      this.$message.error("账号已注销，请重新登录！");
    }
    this.circleUrl = sessionStorage.getItem("headImg"); //获取头像
    this.userName = sessionStorage.getItem("userName"); //获取用户名
  },

  data() {
    return {
      circleUrl: "",
      userName: "",
      dialogFormVisible: false,
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
      sessionStorage.clear(); // 清空用户缓存
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
    }
  }
}
</style>
