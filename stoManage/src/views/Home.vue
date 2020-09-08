<!-- 管理系统主页 -->
<template>
  <el-container id="home">
    <!-- 左侧栏 -->
    <el-aside width="200px" class="left_wrap">
      <div class="title">名视商户营销平台</div>
      <ul id="navigation">
        <li v-for="(item,index) in nav_list" :key="item.name">
          <!-- 有下拉 -->
          <div class="nav_item" v-if="item.haveChildren">
            <div @click="showChildren(index,$event)">
              {{item.name}}
              <i class="triangle close"></i>
            </div>
            <span
              v-for="(child,childIndex) in  item.children"
              v-show="item.showChildren"
              :class="child.isActive?'active':''"
              :key="child.name"
              @click="toPage(index,childIndex)"
            >{{child.name}}</span>
          </div>
          <!-- 无下拉 -->
          <div class="nav_item" v-else-if="!item.haveChildren" @click="toPage(index)">
            <div :class="item.isActive?'active':''">{{item.name}}</div>
          </div>
        </li>
      </ul>
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
          <el-breadcrumb-item v-for="(v, i) in this.$route.meta" :key="i">{{v}}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 下拉 -->
        <div class="dropdown">
          <el-dropdown placement="top" trigger="hover" :hide-on-click="true">
            <span class="el-dropdown-link">
              <el-avatar :size="45" :src="circleUrl"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown" class="dropdown_menu">
              <el-dropdown-item @click.native="toPersonalCenter">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="changePassword">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logout">注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>尊敬的{{ userName }}，欢迎您！</span>
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

  mounted() {
    this.nav_list[this.activeIndex].isActive = true;
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

      // 导航列表
      nav_list: [
        { name: "首页", haveChildren: false, url: "index", isActive: false },
        {
          name: "商家活动",
          haveChildren: true,
          showChildren: false,
          children: [
            { name: "我需要援助", url: "publish", isActive: false },
            { name: "进行中活动", url: "underway", isActive: false },
            { name: "历史活动", url: "history", isActive: false },
          ],
        },
        {
          name: "商品管理",
          haveChildren: true,
          showChildren: false,
          children: [
            { name: "商品分类", url: "goods_type", isActive: false },
            { name: "商品列表", url: "goods_list", isActive: false },
          ],
        },
        {
          name: "订单管理",
          haveChildren: false,
          url: "order_list",
          isActive: false,
        },
        {
          name: "我的收益",
          haveChildren: false,
          url: "earnings",
          isActive: false,
        },
        {
          name: "客户管理",
          haveChildren: true,
          showChildren: false,
          children: [
            { name: "消息中心", url: "message_center", isActive: false },
            { name: "消息群发", url: "message_group", isActive: false },
            { name: "好友列表", url: "friend_list", isActive: false },
          ],
        },
        {
          name: "店铺管理",
          haveChildren: true,
          showChildren: false,
          children: [
            { name: "基础信息", url: "info", isActive: false },
            { name: "角色管理", url: "role_list", isActive: false },
            { name: "账号管理", url: "user_list", isActive: false },
          ],
        },
      ],
      // 激活导航的路径
      activeIndex: 0,
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

    // 显示子节点
    showChildren(index, e) {
      this.nav_list[index].showChildren = !this.nav_list[index].showChildren;
      var flag = this.nav_list[index].showChildren;
      console.dir(e.target.children[0]);
      if (flag) {
        e.target.children[0].className = "triangle open";
      } else {
        e.target.children[0].className = "triangle close";
      }
    },

    // 跳转对应页面
    toPage(index, childIndex) {
      // 1.取消激活
      this.switchActive(this.activeIndex, false);

      // 2.新激活的菜单数据
      if (childIndex == undefined) {
        this.activeIndex = index;
      } else {
        this.activeIndex = { parentIndex: index, childIndex };
      }
    },

    // 切换激活 model：数据模型   isActive：布尔值，true表示激活，false表示取消激活
    switchActive(model, isActive) {
      var type = typeof model;
      switch (type) {
        case "object":
          var { parentIndex, childIndex } = model;
          this.nav_list[parentIndex].children[childIndex].isActive = isActive;
          if (isActive) {
            var { url } = this.nav_list[parentIndex].children[childIndex];
            this.$router.push(url);
          }
          break;
        case "number":
          this.nav_list[model].isActive = isActive;
          if (isActive) {
            var { url } = this.nav_list[model];
            this.$router.push(url);
          }
          break;
      }
    },
  },

  watch: {
    // 监听激活目标切换
    activeIndex() {
      this.switchActive(this.activeIndex, true);
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
    background-image: linear-gradient(#0195eb, #00e7d6);
    color: #fff;
    &::-webkit-scrollbar {
      display: none;
    }
    .title {
      padding: 25px 0;
      text-align: center;
      font-size: 19px;
      font-weight: 600;
      letter-spacing: 1px;
    }
    // 导航
    ul {
      li {
        .nav_item {
          display: flex;
          flex-direction: column;
          font-size: 16px;
          text-align: left;
          :first-child {
            position: relative;
            padding: 12px 20px 12px 40px;
            cursor: pointer;
            &.active {
              background-color: rgba($color: #fff, $alpha: 0.3);
            }
            &:hover {
              background-color: rgba($color: #fff, $alpha: 0.5);
            }
            &::after {
              display: block;
              content: "";
              border: 5px solid #fff;
              width: 0;
              border-radius: 5px;
              position: absolute;
              top: 50%;
              left: 20px;
              margin-top: -5px;
            }
            .triangle {
              display: inline-block;
              border: 5px solid transparent;
              padding: 0;
              height: 0;
              position: absolute;
              left: 150px;
              &::after {
                display: none;
              }
              &:hover {
                background-color: rgba($color: #fff, $alpha: 0);
              }
              &.close {
                border-top-color: #fff;
                top: 50%;
              }
              &.open {
                border-bottom-color: #fff;
                bottom: 50%;
                margin-bottom: -5px;
              }
            }
          }
          span {
            display: block;
            padding: 12px 0 12px 50px;
            cursor: pointer;
            &.active {
              background-color: rgba($color: #fff, $alpha: 0.3);
            }
            &:hover {
              background-color: rgba($color: #fff, $alpha: 0.5);
            }
          }
        }
      }
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
        min-width: 800px;
      }
      .dropdown {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #606266;
        .el-dropdown {
          margin-right: 5px;
        }
      }
      // 修改密码
      // .el-dropdown {
      //   display: flex;
      //   align-items: center;
      // }
    }
    // 主体
    .el-main {
      background-color: #f8f8f8;
      padding: 30px;
    }
  }
}
</style>
