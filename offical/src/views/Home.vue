<template>
  <div id="home">
    <!-- 顶部 -->
    <div id="top" :style="{ backgroundImage: `url(${banner_img})` }">
      <!-- 导航条 -->
      <nav id="nav_bar">
        <div class="container">
          <img src="../assets/images/logo3.png" width="110" class="logo" alt />
          <div class="link">
            <router-link
              v-for="(item, index) in nav_list"
              :key="item.text"
              :to="item.url"
              :class="item.isActive ? 'active' : ''"
              @click.native="switchActive(index)"
              >{{ item.text }}</router-link
            >
          </div>
          <!-- 下拉框 -->
          <div class="dropdown">
            <el-dropdown
              placement="top"
              @command="jumpTo"
              :hide-on-click="false"
            >
              <span class="el-dropdown-link">
                <i class="icon-gengduo iconfont"></i>
              </span>
              <el-dropdown-menu
                slot="dropdown"
                style="width: 100px; text-align: center"
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

      <!-- 轮播容器 -->
      <div id="banner" class="container">
        <!-- 首页 -->
        <div v-if="isIndex" class="banner_index">
          <div class="left">
            <h1>AR探索 无限可能</h1>
            <p>为你打造奇幻AR世界</p>
            <p>海量商家优惠活动任你探索，边玩边赚钱</p>

            <!-- 下载按钮 -->
            <div class="download">
              <span
                ><img src="../assets/images/index/logo_android.png" alt="" />
                <span>Andorid下载</span>
              </span>
              <span
                ><img src="../assets/images/index/second_code.png" alt="" />
                <div id="download_code">
                  <img src="../assets/images/index/download_code.png" alt="" />
                </div>
              </span>
            </div>
          </div>

          <!-- 手机模型 -->
          <div class="right">
            <div class="wrap wrap1">
              <el-carousel
                width="220px"
                height="450px"
                indicator-position="none"
                arrow="never"
              >
                <el-carousel-item v-for="item in phone_img" :key="item">
                  <img class="screen" :src="item" alt="" />
                </el-carousel-item>
              </el-carousel>
            </div>

            <div class="wrap wrap2">
              <img src="../assets/images/index/phone6.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

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

      <img id="line" src="../assets/images/line.png" alt="" />

      <!-- 备案号 -->
      <div class="copyright">备案号：蜀ICP备20020373号</div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    var index = this.$route.meta.index || 0;
    this.switchActive(index);

    this.download_code = require("../assets/images/index/second_code.png");
  },

  data() {
    return {
      download_code: "",

      // 导航条
      nav_list: [
        {
          text: "首页",
          url: "/index",
          isActive: true,
          banner: require("../assets/images/index/banner.png"),
        },
        {
          text: "新闻中心",
          url: "/news",
          isActive: false,
          banner: require("../assets/images/news/banner.png"),
        },
        {
          text: "产品案例",
          url: "/product",
          isActive: false,
          banner: require("../assets/images/product/banner.png"),
        },
        {
          text: "关于名视",
          url: "/about_us",
          isActive: false,
          banner: require("../assets/images/about/banner.png"),
        },
        {
          text: "人才招聘",
          url: "/join_us",
          isActive: false,
          banner: require("../assets/images/recruit/banner.png"),
        },
        {
          text: "联系我们",
          url: "/contact_us",
          isActive: false,
          banner: require("../assets/images/contact/banner.png"),
        },
      ],
      active_index: 0, // 激活选项索引

      banner_img: require("../assets/images/index/banner.png"),
      isIndex: true,

      phone_img: [
        require("../assets/images/index/phone3.png"),
        require("../assets/images/index/phone4.png"),
        require("../assets/images/index/phone5.png"),
      ],

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
        ],
      },
    };
  },

  methods: {
    // 切换激活
    switchActive(index) {
      this.isIndex = !index;

      this.active_index = index;
      this.banner_img = this.nav_list[index].banner;
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
  #top {
    height: 640px;
    background-size: 100%;
    background-repeat: no-repeat;
    @media screen and (min-width: 2200px) {
      background-position: 0 80%;
    }
    // 导航条
    #nav_bar {
      background-color: rgba(255, 255, 255, 0.1);
      .container {
        height: 88px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        align-items: stretch;
        margin: 0 auto;
        .logo {
          height: 50px;
          width: auto;
          margin: 15px 0;
        }

        .link {
          @media screen and(max-width:800px) {
            display: none;
          }
          flex: 1 0 auto;
          display: flex;
          justify-content: space-around;
          align-items: center;
          max-width: 1500px;
          margin-left: 50px;
          a {
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            color: rgb(255, 255, 255);
            height: 100%;
            line-height: 78px;
            box-sizing: border-box;
            &:hover,
            &.active {
              color: #fff;
              font-weight: 400;
              border-bottom: 2px solid #fff;
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
      }
    }

    // banner
    #banner {
      color: #fff;
      .banner_index {
        display: flex;
        .left {
          flex: 0 1 auto;
          letter-spacing: 2px;
          h1 {
            margin-top: 120px;
            margin-bottom: 30px;
            font-size: 40px;
          }
          p {
            font-size: 24px;
            line-height: 40px;
            font-weight: 300;
          }
          .download {
            margin-top: 110px;
            color: rgb(51, 51, 51);
            font-weight: bold;
            > span {
              border-radius: 10px;
              display: inline-block;
              background-color: #fff;
              padding: 12px;
              margin-right: 18px;
              cursor: pointer;

              img {
                height: 35px;
                vertical-align: middle;
              }
              span {
                margin-left: 10px;
              }

              &:first-child:hover {
                background-color: rgb(219, 215, 215);
              }

              &:last-child {
                position: relative;

                &:hover > #download_code {
                  display: block;
                }

                #download_code {
                  display: none;
                  padding: 12px;
                  border-radius: 10px;
                  position: absolute;
                  background-color: #fff;
                  top: -105px;
                  left: 80px;
                  transition: width 2s;

                  img {
                    width: 140px;
                    height: 140px;
                  }
                }
              }
            }
          }
        }

        .right {
          margin-left: 200px;
          width: 350px;
          position: relative;

          .wrap {
            background: url("../assets/images/index/phone1.png") no-repeat;

            &.wrap1 {
              background-size: 100%;

              padding: 10px;
              width: 202px;
              height: 426px;
              position: absolute;
              z-index: 10;
              top: 60px;
              border-radius: 20px;

              // 轮播
              .el-carousel {
                width: 202px;
                overflow: hidden;
                border-radius: 20px;
                height: 100%;

                .el-carousel__item {
                  overflow: hidden;
                  .screen {
                    width: 100%;
                    height: 426px;
                    border-radius: 20px;
                  }
                }
              }
            }

            &.wrap2 {
              background-image: url("../assets/images/index/phone2.png");
              background-size: 100% 100%;
              padding: 10px 12px;
              width: 168px;
              height: 366px;
              position: absolute;
              top: 48px;
              left: 146px;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }

  // 页脚
  #footer {
    background-color: #171717;
    padding-top: 46px;
    padding-bottom: 18px;

    .container {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
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
          color: #999;
          margin-right: 100px;
          &:hover {
            color: #fff;
          }
          .title {
            flex: 0 0 auto;
          }
        }
      }
    }

    .copyright {
      width: 80%;
      color: #999;
      margin: 0 auto;
      text-align: center;
      padding-top: 18px;
      &:hover {
        color: #fff;
      }
    }

    #line {
      width: 100%;
      height: 2px;
    }
  }
}
</style>
