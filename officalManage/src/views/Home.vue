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
        <!-- <el-menu-item index="index">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>-->

        <!-- 轮播 -->
        <el-menu-item index="banner">
          <i class="el-icon-s-home"></i>
          <span slot="title">轮播列表</span>
        </el-menu-item>

        <!-- 新闻中心 -->
        <el-submenu index="news">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>新闻中心</span>
          </template>
          <el-menu-item index="news_list">新闻列表</el-menu-item>
        </el-submenu>

        <!-- 产品案例 -->
        <el-submenu index="case">
          <template slot="title">
            <i class="el-icon-s-check"></i>
            <span>产品案例</span>
          </template>
          <el-menu-item index="case_list">案例列表</el-menu-item>
        </el-submenu>

        <!-- 关于名视 -->
        <el-submenu index="about_us">
          <template slot="title">
            <i class="el-icon-s-grid"></i>
            <span>关于名视</span>
          </template>
          <el-menu-item index="about_photowall">照片墙</el-menu-item>
        </el-submenu>

        <!-- 招聘信息 -->
        <el-submenu index="recruit">
          <template slot="title">
            <i class="el-icon-s-grid"></i>
            <span>招聘信息</span>
          </template>
          <el-menu-item index="recruit_list">职位列表</el-menu-item>
          <el-menu-item index="recruit_publish">职位发布</el-menu-item>
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
          <el-breadcrumb-item v-for="(v, i) in this.$route.meta.bread" :key="i">{{ v }}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 下拉 -->
        <div class="dropdown">
          <span>{{ username || "用户" }}老大，欢迎回来~</span>
          <el-dropdown placement="top" trigger="hover" :hide-on-click="true" @command="jumpTo">
            <el-avatar :size="40" :src="circleUrl"></el-avatar>
            <el-dropdown-menu slot="dropdown" class="dropdown_menu">
              <el-dropdown-item command="personal">个人中心</el-dropdown-item>
              <el-dropdown-item command="loginout">注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import reObj from "@/utils/api/api";
export default {
  mounted() {
    this.username = sessionStorage.getItem("username");
    var token = sessionStorage.getItem("token");
    if (!token) {
      this.$router.replace("/login");
      this.$message.error("账号已注销，请重新登录！");
    }
  },
  name: "Home",
  components: {},
  data() {
    return {
      circleUrl:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594287414646&di=e6d8d7f0f220a8b059937e1350136b62&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201309%2F26%2F20130926095128_SiPMh.jpeg",
      username: "用户"
    };
  },
  methods: {
    jumpTo(command) {
      switch (command) {
        case "personal":
          this.$router.push("personal");
          break;
        case "changepwd":
          break;
        case "loginout":
          sessionStorage.clear();
          this.$router.replace("/login");
      }
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
      .dropdown {
        font-size: 14px;
        color: #606266;
        display: flex;
        align-items: center;
        .el-dropdown {
          margin-left: 15px;
        }
      }
    }
    // 主体
    .el-main {
      background-color: #f2f2f2;
    }
  }
}
</style>
