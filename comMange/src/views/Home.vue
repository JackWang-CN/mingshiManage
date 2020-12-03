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
        <div v-for="(dom, index) in dom_list" :key="dom.authNodeID">
          <!-- 无子节点 -->
          <el-menu-item v-if="!dom.childNodeList" :index="dom.path">
            <i :class="dom.ico"></i>
            <span slot="title">{{ dom.name }}</span>
          </el-menu-item>

          <!-- 有子节点 -->
          <el-submenu v-else :index="index.toString()">
            <template slot="title">
              <i :class="dom.ico"></i>
              <span>{{ dom.name }}</span>
            </template>
            <el-menu-item
              v-for="child in dom.childNodeList"
              :key="child.authNodeID"
              :index="child.path"
              >{{ child.name }}</el-menu-item
            >
          </el-submenu>
        </div>
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
          <el-breadcrumb-item
            v-for="item in this.$route.meta"
            :key="item.path"
            :to="item.path || '#'"
          >
            <router-link :to="item.path">{{ item.name }}</router-link>
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
          :visible.sync="show_password"
          id="change_password"
          width="30%"
        >
          <el-input v-model="newPassword" clearable></el-input>

          <div style="margin-top: 20px">
            <el-button type="primary" @click="changePwd">确 定</el-button>
            <el-button @click="show_password = false">取 消</el-button>
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
const fileUrl = window.baseUrl.normal_file;
import { getData, updateData } from "@/utils/api/apis";
import { hintMessage } from "@/utils/common";
export default {
  created() {
    var token = sessionStorage.getItem("token");
    if (!token) {
      this.$router.replace("/login");
      this.$message.error("账号已注销，请重新登录！");
    }
    this.UserName = sessionStorage.getItem("userName");
    this.circleUrl = fileUrl + sessionStorage.getItem("headImg");

    // 获取允许的节点ID
    var permitList = JSON.parse(sessionStorage.getItem("nodeList"));

    // 获取所有的节点信息
    var allNodes = sessionStorage.getItem("nodes");

    if (allNodes) {
      this.dom_list = JSON.parse(allNodes);
      return;
    }

    // 请求所有的节点列表
    getData("comUser", "comAuthInfoConfig", 1, {}, "allNode").then((res) => {
      var list = res.resultObject;

      sessionStorage.setItem("nodes", JSON.stringify(list));
      var newList = [];
      list.forEach((item) => {
        // 判断父节点是否被允许
        var flag = permitList.includes(item.authNodeID);
        if (!flag) return;

        // 被允许，判断有无子节点
        var childrenList = item.childNodeList;

        if (childrenList) {
          var newChildren = [];
          childrenList.forEach((child) => {
            // 判断子节点是否被允许
            var isChild = permitList.includes(child.authNodeID);
            if (!isChild) return;

            // 被允许，添加到列表里
            newChildren.push(child);
          });
          item.childNodeList = [...newChildren];
        }
        newList.push(item);
      });

      this.dom_list = newList;
    });
  },

  data() {
    return {
      circleUrl: "",
      show_password: false,
      UserName: "未登录",
      newPassword: "",

      dom_list: [],
    };
  },

  methods: {
    // 个人中心
    toPersonalCenter() {
      this.$router.push("personal_center");
    },
    // 修改密码
    changePassword() {
      this.show_password = true;
    },
    // 注销
    logout() {
      sessionStorage.clear();
      this.$router.replace("/login");
    },

    // 确认修改密码
    changePwd() {
      this.show_password = false;
      updateData("comUser", "comUserInfo", 1, {
        password: this.newPassword,
      }).then((res) => {
        hintMessage(this, res, "密码修改成功！");
      });
    },
  },
};
</script>

<style lang="scss">
#home {
  height: 100%;
  // 左侧栏
  .left_wrap {
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/

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
