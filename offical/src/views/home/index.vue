<template>
  <div id="index">
    <!-- 轮播图 -->

    <!-- 主体 -->
    <div class="main">
      <div class="container">
        <!-- 产品案例 -->
        <div class="proudct">
          <SectionTitle
            :text="{ pri: '产品案例', sec: 'PRODUCT CASE' }"
          ></SectionTitle>
          <div class="cases">
            <div class="wrap" @click="toApp">
              <img :src="kongwan.img" alt="" />
              <div class="mask">
                <h2>{{ kongwan.title }}</h2>
                <div v-html="kongwan.content.substring(0, 60)"></div>
              </div>
            </div>

            <div
              class="wrap"
              v-for="(item, index) in case_list"
              :key="index"
              @click="toDetails(item.caseID)"
            >
              <img :src="item.mainMediaUrl" alt />
              <div class="mask">
                <!-- 二级标题组件 -->
                <h2>{{ item.title }}</h2>
                <div v-html="item.content.substring(0, 60)"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 关于名视 -->
        <div class="about_us container">
          <SectionTitle
            :text="{ pri: '关于名视', sec: 'ABOUT MINGSHI' }"
          ></SectionTitle>
          <div class="article_shadow">
            <h3>{{ about_us.title }}</h3>
            <p>{{ about_us.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from "@/components/section_title";
import PassageTitle from "@/components/passage_title";
import { getList } from "@/utils/api/api";
import { spliceUrl } from "@/utils/utils";
export default {
  mounted() {
    var media_form = { ...this.get_form };
    var case_form = { ...this.get_form };
    case_form.data = {};
    case_form.data = { caseScene: "1" };

    // 请求轮播列表
    getList("media", media_form).then((res) => {
      if (res.resultObject.data.length < 1) return;
      this.banner_list = spliceUrl(res.resultObject.data, "mediaUrl");
    });

    // 请求产品案例
    getList("case", case_form).then((res) => {
      if (res.resultObject.data.length < 1) return;
      this.case_list = spliceUrl(res.resultObject.data, "mainMediaUrl");
    });
  },
  components: {
    SectionTitle,
    PassageTitle,
  },
  data() {
    return {
      // 轮播图
      banner_list: [{}],

      // 案例
      case_list: [],

      // 案例-空玩
      kongwan: {
        img: require("../../assets/images/product/kongwan/app.png"),
        title: "空玩APP",
        content:
          "空玩APP为企业和商家市场提供AR互动 + SAAS平台搭建，一站式整体解决方案。我们致力 于解决商家创新难，运营难，推广难等烦心问题， 让产品更具有人性思维帮您更好的管理数据、扩 大客流。我们本着为用户谋福利、想尝试、爱娱 乐等问题，让产品更具有亲和力，能够在您纠结、 徘徊的时候，能给您一个好的选择。",
      },

      // 关于我们
      about_us: {
        title: "深度发展核心技术，用技术服务社会",
        content:
          "四川名视人工智能科技有限公司是2020年2月成立于成都市高新区的高新技术企业，是一家专注于人工智能核心技术及产品研发的创新型科技企业。我们是一家年轻、有底蕴的团队。公司团队专注于人工智能核心技术的研发，将AI技术，包括人脸识别、图像识别、视频分析、AR/VR等应用于用户消费、移动互联网以及商户安全等多个领域，致力于让全球每位消费者都能感受到人工智能技术为您带来的高效工作模式及全新生活体验。",
      },

      // 请求表单的对象
      get_form: {
        currPage: 1,
        pageSize: 2,
        orderByFileds: "createTime desc",
        data: {
          scene: "0",
          isEnable: 1,
        },
      },
    };
  },
  methods: {
    // 跳转到详情页
    toDetails(caseID) {
      this.$router.push({
        path: "product_details",
        query: { caseID },
      });
    },

    // 跳转到空玩APP
    toApp() {
      this.$router.push("product_kongwan");
    },
  },
};
</script>

<style lang="scss">
#index {
  // 主体
  .main {
    .container {
      display: block;
      // 案例
      .proudct {
        .cases {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          @media screen and(max-width:750px) {
            flex-direction: column;
            align-items: center;
          }
          .wrap {
            cursor: pointer;
            width: 442px;
            height: 368px;
            position: relative;
            border-radius: 10px;
            overflow: hidden;
            @media screen and(max-width:1450px) {
              width: 100%;
              height: auto;
              margin: 0 10px;
            }
            @media screen and(max-width:750px) {
              width: 600px;
              height: 300px;
              margin: 10px 0;
            }

            &:hover {
              .mask {
                display: block;
              }
            }
            img {
              width: 100%;
              height: 100%;
            }
            // 蒙层盒子
            .mask {
              display: none;
              box-sizing: border-box;
              border-radius: 8px;
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              background: rgba($color: #000000, $alpha: 0.4);
              color: #fff;
              padding: 90px 100px 130px 100px;
              h2 {
                font-size: 24px;
                text-align: center;
                padding-bottom: 19px;
                border-bottom: 2px solid #fff;
                margin-bottom: 28px;
              }
              div {
                line-height: 30px;
                letter-spacing: 2px;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                strong {
                  line-height: 30px;
                  letter-spacing: 2px;
                }
              }

              @media screen and(max-width:751px) {
                padding: 10%;
              }
              h3 {
                @media screen and(max-width:1450px) and (min-width: 751px) {
                  font-size: 2vw;
                }
                .icon {
                  @media screen and(max-width:1450px) and (min-width: 751px) {
                    width: 1.8vw;
                    height: 1.8vw;
                  }
                }
              }
              h4 {
                font-size: 24px;
                margin-bottom: 18px;
                @media screen and(max-width:1450px) and (min-width: 751px) {
                  font-size: 1.5vw;
                  margin-bottom: 1vw;
                }
              }
              div {
                font-size: 16px;
                line-height: 24px;

                overflow: hidden;
                -webkit-line-clamp: 7;
                display: -webkit-box;
                -webkit-box-orient: vertical;

                @media screen and(max-width:1450px) and (min-width: 751px) {
                  font-size: 1vw;
                  line-height: 1.5vw;
                }

                @media screen and(max-width:751px) {
                  -webkit-line-clamp: 4;
                }
              }
            }
          }
        }
      }

      // 关于
      .about_us {
        margin-top: 100px;

        .article_shadow {
          margin: 0 auto;
          h3 {
            font-size: 30px;
            color: #000000;
            text-align: center;
            margin-bottom: 58px;
            @media screen and (max-width: 930px) {
              font-size: 3vw;
            }
          }
          p {
            font-size: 18px;
            color: #555;
            line-height: 38px;
            text-align: left;
            letter-spacing: 1px;
            text-indent: 36px;
            @media screen and (max-width: 930px) {
              font-size: 2vw;
            }
          }
        }
      }
    }
  }
}
</style>
