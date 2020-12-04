<template>
  <div id="index">
    <!-- 轮播图 -->
    <Banner :banner="banner_list"></Banner>

    <!-- 主体 -->
    <div class="main">
      <div class="container">
        <!-- 产品案例 -->
        <div class="proudcte">
          <SectionTitle :text="{ pri: '产品案例', sec: 'Product Case' }"></SectionTitle>
          <div class="cases">
            <div
              class="wrap"
              v-for="(item, index) in case_list"
              :key="index"
              @click="toDetails(item.caseID)"
            >
              <img :src="item.mainMediaUrl" alt />
              <div class="mask">
                <div class="border_box">
                  <!-- 二级标题组件 -->
                  <PassageTitle :text="item.title"></PassageTitle>
                  <div v-html="item.content.substring(0, 200)"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 关于名视 -->
        <div class="about_us">
          <SectionTitle :text="{ pri: '关于名视', sec: 'About Mingshi' }"></SectionTitle>
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
import Banner from "@/components/banner";

import { getList } from "@/utils/api/api";
import { spliceUrl } from "@/utils/utils";
export default {
  mounted() {
    var media_form = { ...this.get_form };
    var case_form = { ...this.get_form };
    case_form.data = {};
    case_form.data = { caseScene: "1" };

    // 请求轮播列表
    getList("media", media_form).then(res => {
      //console.log(res);
      if(res.resultObject.data.length < 1) return;
      this.banner_list = spliceUrl(res.resultObject.data, "mediaUrl");
    });

    // 请求产品案例
    getList("case", case_form).then(res => {
      //console.log(res);
      if(res.resultObject.data.length < 1) return;
      this.case_list = spliceUrl(res.resultObject.data, "mainMediaUrl");
    });
  },
  components: {
    SectionTitle,
    PassageTitle,
    Banner
  },
  data() {
    return {
      // 轮播图
      banner_list: [{}],

      // 案例
      case_list: [],

      // 关于我们
      about_us: {
        title: "深度发展核心技术，用技术服务社会",
        content:
          "四川名视人工智能科技有限公司是2020年2月成立于成都市高新区的高新技术企业，是一家专注于人工智能核心技术及产品研发的创新型科技企业。我们是一家年轻、有底蕴的团队。公司团队专注于人工智能核心技术的研发，将AI技术，包括人脸识别、图像识别、视频分析、AR/VR等应用于用户消费、移动互联网以及商户安全等多个领域，致力于让全球每位消费者都能感受到人工智能技术为您带来的高效工作模式及全新生活体验。"
      },

      // 请求表单的对象
      get_form: {
        currPage: 1,
        pageSize: 3,
        orderByFileds: "createTime desc",
        data: {
          scene: "0",
          isEnable: 1,
        }
      },

      // 跳转到详情页
      toDetails(caseID) {
        this.$router.push({
          path: "product_details",
          query: { caseID }
        });
      }
    };
  },
  methods: {}
};
</script>

<style lang="scss">
#index {
  // 主体
  .main {
    .container {
      justify-content: space-around;
      display: block;
      // 案例
      .proudcte {
        .cases {
          display: flex;
          justify-content: space-around;
          margin-bottom: 50px;
          @media screen and(max-width:750px) {
            flex-direction: column;
            align-items: center;
          }
          .wrap {
            cursor: pointer;
            width: 480px;
            height: 400px;
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
              padding: 14px;
              background: rgba($color: #000000, $alpha: 0.4);
              .border_box {
                box-sizing: border-box;
                border: 1px solid #fff;
                height: 100%;
                color: #fff;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 15%;
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
      }

      // 关于
      .about_us {
        .article_shadow {
          margin: 0 auto;
          width: 85%;
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
            color: #545454;
            line-height: 30px;
            text-align: left;
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
