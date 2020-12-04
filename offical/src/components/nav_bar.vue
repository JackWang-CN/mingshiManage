<template>
  <nav id="nav_bar">
    <div class="container">
      <img src="../assets/images/logo3.png" width="110" class="logo" alt />
      <div class="link">
        <a
          v-for="(item, index) in nav_list"
          :key="item.text"
          :to="item.url"
          :class="item.isActive ? 'active' : ''"
          @click="switchActive(index)"
          >{{ item.text }}
        </a>
      </div>
      <div class="search">
        <input type="text" placeholder="查找" />
        <img
          src="../assets/images/搜索.png"
          width="20"
          alt=""
          @click="sendSearch"
        />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      nav_list: [
        { text: "首页", url: "", isActive: false },
        { text: "新闻中心", url: "", isActive: false },
        { text: "产品案例", url: "", isActive: false },
        { text: "关于名视", url: "", isActive: false },
        { text: "人才招聘", url: "", isActive: false },
        { text: "联系我们", url: "", isActive: false },
      ],
      active_index: 0, // 激活选项索引
    };
  },
  methods: {
    // 搜索
    sendSearch() {
      //console.log("点击了搜索");
    },
    // 切换激活
    switchActive(index) {
      //console.log(index);
      this.active_index = index;
      this.nav_list.forEach((item) => {
        item.isActive = false;
      });
      this.nav_list[this.active_index].isActive = true;
    },
  },
};
</script>

<style lang="scss">
// 导航条
nav#nav_bar {
  background: url("../assets/images/顶部导航背景.png");
  padding: 15px 0;
  .container {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .logo {
      margin: 0 100px 0 150px;
    }
    .link {
      height: 100%;
      a {
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        color: #d2dfff;
        height: 100%;
        margin: 0 50px;
        padding-bottom: 5px;
        &:hover,
        &.active {
          color: #fff;
          font-weight: 400;
          box-shadow: 0 2px 0 #fff;
        }
      }
    }
    // 搜索框
    .search {
      display: flex;
      align-items: center;
      margin-left: 150px;
      padding: 12px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      // 输入框
      input {
        width: 160px;
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
</style>
