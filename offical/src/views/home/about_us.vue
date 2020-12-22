<template>
  <div id="about_us">
    <!-- 主体 -->
    <div class="main container">
      <!-- 公司简介 -->
      <div class="introduction">
        <SectionTitle
          :text="{ pri: '公司简介', sec: 'COMPANY PROFILE' }"
        ></SectionTitle>

        <div class="content">
          <img src="../../assets/images/about/main.png" alt="" />
          <div class="wrap">
            <p>
              四川名视人工智能科技有限公司（简称名视）是一家专注于VR/AR创新型高新
              技术企业，创立于2020年2月，致力于打造增强现实（AR）的全新生活体验。
            </p>
            <p>
              公司拥有计算机视觉、深度学习、智能交互等人工智能核心技术，深耕垂直行
              业、开放平台能力，让AR/VR更深入广泛的赋能行业、服务生活。
            </p>
            <p>
              我们秉承精诚至上，精致服务的理念致力于让每一位消费者感受到人工智能技
              术带来的全新生活体验，不仅能提升产品的销售额，提高企业运作效率，同时也为
              每一个用户降低运营成本及人工成本。
            </p>
            <p>名视，值得您依赖的合作伙伴！</p>
          </div>
        </div>
      </div>

      <!-- 团队风采 -->
      <div class="team_style">
        <SectionTitle
          :text="{ pri: '团队风采', sec: 'TEAM STYLE' }"
        ></SectionTitle>

        <ul class="tabs">
          <li
            v-for="(item, index) in tabs_list"
            :key="index"
            :class="item.isActive ? 'active' : ''"
            @click="switchTab(index)"
          >
            {{ item.name }}
          </li>
        </ul>

        <div class="photo article_shadow">
          <div class="wrap">
            <div class="pages last" @click="pageChange(0)"></div>
            <div class="pages next" @click="pageChange(1)"></div>
            <el-carousel
              ref="photo_wall"
              height="585px"
              indicator-position="outside"
              arrow="never"
            >
              <el-carousel-item v-for="item in photo_wall" :key="item.mediaUrl">
                <img :src="item.mediaUrl" alt="" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from "@/components/section_title";
import { getList } from "@/utils/api/api";
import { spliceUrl, creatGet } from "@/utils/utils";
export default {
  mounted() {
    this.active_index = 0;

    this.get_form = creatGet(1, 1, 1);

    var photo_form = creatGet(1, 12, 2);
    getList("media", photo_form).then((res) => {
      if (res.resultObject.data.length < 1) return;
      this.team_list = spliceUrl(res.resultObject.data, "mediaUrl");
    });

    this.photo_wall = this.office_list;
  },
  components: {
    SectionTitle,
  },
  data() {
    return {
      get_form: {},

      // 照片墙
      photo_wall: [{ mediaUrl: require("@/assets/images/案例图1.png") }],

      // 办公环境
      office_list: [
        { mediaUrl: require("@/assets/images/about/office/01.png") },
        { mediaUrl: require("@/assets/images/about/office/02.jpg") },
        { mediaUrl: require("@/assets/images/about/office/03.jpg") },
        { mediaUrl: require("@/assets/images/about/office/04.jpg") },
      ],

      // 周边设施
      around_list: [
        { mediaUrl: require("@/assets/images/about/around/01.jpg") },
        { mediaUrl: require("@/assets/images/about/around/02.jpg") },
      ],

      // 团队风采
      team_list: [],

      tabs_list: [
        {
          name: "办公环境",
          isActive: false,
        },
        {
          name: "周边设施",
          isActive: false,
        },
        {
          name: "团队风采",
          isActive: false,
        },
      ],
      active_index: "",
    };
  },

  methods: {
    switchTab(index) {
      if (this.active_index == index) return;
      this.tabs_list[this.active_index].isActive = false;
      this.active_index = index;
      switch (index) {
        case 0:
          var list = this.office_list;
          break;
        case 1:
          var list = this.around_list;
          break;
        case 2:
          var list = this.team_list;
          break;
      }

      this.photo_wall = list;
    },

    // 照片翻页
    pageChange(type) {
      if (!type) {
        this.$refs.photo_wall.prev();
      } else {
        this.$refs.photo_wall.next();
      }
    },
  },

  watch: {
    active_index() {
      this.tabs_list[this.active_index].isActive = true;
    },
  },
};
</script>

<style lang="scss">
#about_us {
  // 轮播
  .banner {
    img {
      width: 100%;
    }
  }

  // 主体
  .main {
    padding-bottom: 0;

    // 公司简介
    .introduction {
      .content {
        display: flex;
        img {
          width: 650px;
          margin-right: 46px;
        }
        .wrap {
          p {
            letter-spacing: 1px;
            font-size: 18px;
            line-height: 30px;
            color: #666;
            text-indent: 2em;
            margin-bottom: 30px;
            &:last-child {
              font-size: 24px;
            }
          }
        }
      }
    }

    // 照片墙
    .team_style {
      margin-top: 130px;
      margin-bottom: 50px;

      .tabs {
        display: flex;
        justify-content: center;
        li {
          cursor: pointer;
          padding: 15px 40px;
          border: 1px solid #d2d2d2;
          color: #838383;
          &:nth-child(2) {
            margin: 0 18px;
          }
          &.active {
            color: #fff;
            background-color: #008bff;
            border-color: #008bff;
          }
        }
      }

      .photo {
        margin-top: 20px;
        padding: 50px 160px;
        .wrap {
          position: relative;
          .pages {
            cursor: pointer;
            width: 60px;
            height: 60px;
            border-radius: 60px;
            background-size: cover;
            position: absolute;
            top: 40%;
            z-index: 99;
            &.last {
              background-image: url("../../assets/images/about/last.png");
              left: -112px;
            }
            &.next {
              right: -112px;
              background-image: url("../../assets/images/about/next.png");
            }
          }

          .el-carousel {
            border-radius: 10px;

            img {
              width: 100%;
              border-radius: 10px;
            }

            // 指示器
            .el-carousel__indicators {
              border-radius: 10px;
              margin-top: 28px;
              .el-carousel__indicator--horizontal {
                &.is-active {
                  button {
                    opacity: 0.64;
                    background-color: #008bff;
                  }
                }
              }

              .el-carousel__button {
                opacity: 1;
                margin: 0 10px;
                height: 10px;
                width: 10px;
                border-radius: 10px;
                background-color: #a0a0a0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
