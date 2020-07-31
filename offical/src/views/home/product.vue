<template>
  <div id="product">
    <!-- 轮播 -->
    <Banner :banner="banner_list"></Banner>

    <!-- 主体 -->
    <div class="main">
      <div class="container">
        <!-- 一级标题 -->
        <SectionTitle
          :text="{ pri: '产品案例', sec: 'Product Case' }"
        ></SectionTitle>

        <!-- 产品列表 -->
        <ul class="product_list">
          <li
            v-for="(item, index) in product_list"
            :key="index"
            @click="toDetails(item.caseId)"
          >
            <div class="resource">
              <img :src="item.mainMediaUrl" alt class="proudct_img" />
              <div class="mask" v-if="true">
                <img :src="icons.play" alt />
              </div>
            </div>
            <div class="title">
              <span class="pri">{{ item.title }}</span>
              {{ item.title.sec }}
            </div>
          </li>
        </ul>

        <!-- 分页插件 -->
        <el-pagination
          class="page"
          background
          :hide-on-single-page="true"
          layout="prev, pager, next"
          :total="totalDataNum"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/banner";
import SectionTitle from "@/components/section_title";

import { getList } from "@/utils/api/api";
import { spliceUrl } from "@/utils/utils";
export default {
  mounted() {
    // 请求轮播列表
    getList("media", this.banner_form).then((res) => {
      this.banner_list = spliceUrl(res.data, "mediaUrl");
    });

    // 请求案例列表
    this.getDataList();
  },
  components: {
    Banner,
    SectionTitle,
  },
  data() {
    return {
      totalDataNum: 0,

      // 轮播图
      banner_list: [{}],

      // 产品案例
      product_list: [],

      // icons
      icons: {
        play: require("@/assets/images/播放.png"),
      },

      // 轮播表单的对象
      banner_form: {
        currPage: 1,
        pageSize: 3,
        data: {
          scene: "0",
        },
      },

      // 案例表单的对象
      get_form: {
        currPage: 1,
        pageSize: 3,
        data: {
          caseScene: "1",
        },
      },
    };
  },

  methods: {
    // 当前页码改变
    currentChange(val) {
      this.get_form.currPage = val;
      this.getDataList(); // 重新加载列表
    },

    // 请求数据列表
    getDataList() {
      getList("case", this.get_form).then((res) => {
        this.product_list = spliceUrl(res.data, "mainMediaUrl");
        this.totalDataNum = res.totalDataNum;
      });
    },

    // 跳转到详情页
    toDetails(caseId) {
      this.$router.push({
        path: "news_details",
        query: { caseId },
      });
    },
  },
};
</script>

<style lang="scss">
#product {
  .main {
    .container {
      text-align: right;
      display: flex;
      flex-direction: column;
      align-items: center;
      .product_list {
        width: 1600px;
        @media screen and (max-width: 1789px) {
          width: 90%;
        }
        @media screen and (max-width: 750px) {
          width: 650px;
        }
        li {
          cursor: pointer;
          box-shadow: 0 0 12px -6px #1a1b1b7e;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 24px;
          // 图片&视频
          .resource {
            width: 100%;
            height: 556px;
            overflow: hidden;
            position: relative;
            @media screen and (max-width: 1789px) {
              height: 390px;
            }
            @media screen and (max-width: 750px) {
              height: 300px;
            }
            .proudct_img {
              width: 100%;
              position: absolute;
              top: -30%;
              left: 0;
              @media screen and (max-width: 950px) {
                top: -10%;
              }
              @media screen and (max-width: 750px) {
                top: -20%;
              }
            }
            .mask {
              height: 100%;
              position: relative;
              background-color: rgba($color: #000, $alpha: 0.4);
              img {
                width: 138px;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top: -69px;
                margin-left: -69px;
                cursor: pointer;
              }
            }
          }
          // 标题
          .title {
            text-align: left;
            padding: 18px 0;
            .pri {
              display: inline-block;
              margin-left: 38px;
              margin-right: 30px;
              font-size: 30px;
              color: #000000ff;
              vertical-align: middle;
            }
          }
          // 内容
        }
      }
      .page {
        align-self: flex-end;
      }
    }
  }
}
</style>
