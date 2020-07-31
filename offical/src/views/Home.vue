<template>
  <div id="home">
    <!-- 导航条 -->
    <nav id="nav_bar">
      <div class="container">
        <img src="../assets/images/logo3.png" width="110" class="logo" alt />
        <div class="link container">
          <router-link
            v-for="(item, index) in nav_list"
            :key="item.text"
            :to="item.url"
            :class="item.isActive ? 'active' : ''"
            @click.native="switchActive(index)"
            >{{ item.text }}</router-link
          >
        </div>

        <!-- 搜索框 -->
        <div class="search">
          <input type="text" placeholder="查找" />
          <img
            src="../assets/images/搜索.png"
            width="20"
            alt
            @click="sendSearch"
          />
        </div>

        <!-- 下拉框 -->
        <div class="dropdown">
          <el-dropdown placement="top" @command="jumpTo" :hide-on-click="false">
            <span class="el-dropdown-link">
              <i class="icon-gengduo iconfont"></i>
            </span>
            <el-dropdown-menu
              slot="dropdown"
              style="width:100px;text-align:center"
            >
              <el-dropdown-item :command="{ path: 'index' }"
                >首页</el-dropdown-item
              >
              <el-dropdown-item :command="{ path: 'news' }"
                >新闻中心</el-dropdown-item
              >
              <el-dropdown-item :command="{ path: 'product' }"
                >产品案例</el-dropdown-item
              >
              <el-dropdown-item :command="{ path: 'about_us' }"
                >关于名视</el-dropdown-item
              >
              <el-dropdown-item :command="{ path: 'join_us' }"
                >人才招聘</el-dropdown-item
              >
              <el-dropdown-item :command="{ path: 'contact_us' }"
                >联系我们</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </nav>

    <!-- 路由容器 -->
    <router-view></router-view>

    <!-- 页脚 -->
    <div id="footer">
      <div class="container">
        <img :src="footer_info.logo" width="147" alt />
        <ul class="desc">
          <li v-for="item in footer_info.info" :key="item.title">
            <div class="title">{{ item.title }}：</div>
            <div class="content">{{ item.text }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    var index = this.$route.meta.index || 0;
    this.switchActive(index);
  },
  data() {
    return {
      // 导航条
      nav_list: [
        { text: "首页", url: "/index", isActive: true },
        { text: "新闻中心", url: "/news", isActive: false },
        { text: "产品案例", url: "/product", isActive: false },
        { text: "关于名视", url: "/about_us", isActive: false },
        { text: "人才招聘", url: "/join_us", isActive: false },
        { text: "联系我们", url: "/contact_us", isActive: false },
      ],
      active_index: 0, // 激活选项索引

      // 页脚信息
      footer_info: {
        logo: require("@/assets/images/logo2.png"),
        info: [
          {
            title: "公司地址",
            text:
              "中国(四川)自由贸易试验区成都高新区天府大道北段1700号1栋3单元7层705",
          },
          {
            title: "信用代码",
            text: "91510100MA68NDJH6X",
          },
          {
            title: "联系电话",
            text: "028-65733816",
          },
          {
            title: "企业邮箱",
            text: "mingshirgzn@163.com",
          },
          {
            title: "登记机关",
            text: "成都高新区市场监督管理局",
          },
          {
            title: "备案号",
            text: "蜀ICP备20020373号",
          },
        ],
      },
    };
  },

  methods: {
    // 搜索
    sendSearch() {},
    // 切换激活
    switchActive(index) {
      this.active_index = index;
      this.nav_list.forEach((item) => {
        item.isActive = false;
      });
      this.nav_list[this.active_index].isActive = true;
      return false;
    },

    // 点击下拉菜单触发
    jumpTo(command) {
      this.$router.push(command);
    },
  },
};
</script>

<style lang="scss">
#home {
  // 导航条
  nav#nav_bar {
    background: url("../assets/images/顶部导航背景.png");
    padding: 15px 0;
    width: 100%;
    .container {
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 auto;

      .link {
        @media screen and(max-width:800px) {
          display: none;
        }
        flex: 1 0 auto;
        display: flex;
        justify-content: space-around;
        height: 100%;
        max-width: 1500px;
        a {
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          color: #d2dfff;
          height: 100%;
          padding-bottom: 5px;
          &:hover,
          &.active {
            color: #fff;
            font-weight: 400;
            box-shadow: 0 2px 0 #fff;
          }
        }
      }

      .dropdown {
        display: none;
        margin-right: 10px;
        @media screen and(max-width:800px) {
          display: block;
        }
      }
      // 搜索框
      .search {
        display: flex;
        align-items: center;
        // margin-left: 150px;
        padding: 12px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        // 输入框
        input {
          width: 100%;
          border: none;
          outline: none;
          background-color: transparent;
          margin-right: 5px;
          font-size: 14px;
          color: #fff;
          &::placeholder {
            color: #dedede;
          }
        }
        // 搜索按钮
        img {
          cursor: pointer;
        }
      }
    }
  }

  // 页脚
  #footer {
    background-color: #171717;
    padding: 56px 0 76px 0;
    .container {
      max-width: 1400px;
      display: flex;
      align-items: center;
      margin: 0 auto;
      justify-content: space-between;
      @media screen and (max-width: 750px) {
        width: 80%;
      }
      .desc {
        width: 700px;
        height: 68px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin-left: 9vw;
        @media screen and (max-width: 900px) {
          height: 160px;
          margin-left: 10%;
        }
        li {
          max-width: 350px;
          line-height: 22px;
          display: flex;
          color: #5d5d5dff;
          margin-right: 40px;
          &:hover {
            color: #fff;
          }
          .title {
            flex: 0 0 auto;
          }
        }
      }
    }
  }
}
</style>
