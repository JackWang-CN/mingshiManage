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
      this.banner_list = spliceUrl(res.resultObject.data, "mediaUrl");
    });

    // 请求产品案例
    getList("case", case_form).then(res => {
      //console.log(res);
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
        title: "四川名视人工智能科技有限公司——人工智能领域的先行者",
        content:
          "四川名视人工智能科技有限公司主要从事：人工智能应用软件开发；技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；大气污染治理；住宅室内装饰装修；电影摄制服务；专业设计服务；广告设计、代理；广告制作；广告发布（非广播电台、电视台、报刊出版单位）；企业形象策划；市场营销策划；组织文化艺术交流活动；会议及展览服务；礼仪服务；摄影扩印服务；信息咨询服务（不含许可类信息咨询服务）；企业管理；文化娱乐经纪人服务；互联网销售（除销售需要许可的商品）；日用品零售；通讯设备销售；化妆品零售；五金产品零售；工艺美术品及收藏品零售（象牙及其制品除外）；体育用品及器材零售；电子产品销售；办公用品销售；服装服饰零售；鞋帽零售；家具销售；计算机软硬件及辅助设备零售；机械设备销售；建筑装饰材料销售；建筑材料销售"
      },

      // 请求表单的对象
      get_form: {
        currPage: 1,
        pageSize: 3,
        orderByFileds: "createTime desc",
        data: {
          scene: "0"
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
