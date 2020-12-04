<template>
  <div id="news">
    <!-- 轮播图 -->
    <Banner :banner="banner_list"></Banner>

    <!-- 主体 -->
    <div class="main">
      <div class="container">
        <!-- 一级标题 -->
        <SectionTitle :text="{ pri: '新闻中心', sec: 'News Center' }"></SectionTitle>

        <!-- 新闻列表 -->
        <ul class="news_list">
          <li v-for="(item, index) in news_list" :key="index" @click="toDetails(item.caseID)">
            <div class="news_imgs">
              <img :src="item.mainMediaUrl" alt />
            </div>
            <div class="news_content">
              <PassageTitle :text="item.title"></PassageTitle>
              <div class="airtcle_wrap" v-html="item.content.substring(0,1500)"></div>
            </div>
          </li>
        </ul>

        <!-- 分页插件 -->
        <el-pagination
          class="page"
          :hide-on-single-page="true"
          background
          layout="prev, pager, next"
          :total="totalDataNum || 0"
          :page-size="get_form.pageSize"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from "@/components/section_title";
import PassageTitle from "@/components/passage_title";
import Banner from "@/components/banner";

import { getList } from "@/utils/api/api";
import { spliceUrl, removeImg } from "@/utils/utils";
export default {
  mounted() {
    // 请求轮播列表
    getList("media", this.banner_form).then(res => {
      //console.log(res);
      if(res.resultObject.data.length < 1) return;
      this.banner_list = spliceUrl(res.resultObject.data, "mediaUrl");
    });

    // 请求案例列表
    this.getDataList();
  },
  components: {
    SectionTitle,
    PassageTitle,
    Banner
  },
  data() {
    return {
      totalDataNum: 0,

      // 轮播图
      banner_list: [{}],

      // 新闻列表
      news_list: [],

      // 轮播表单的对象
      banner_form: {
        currPage: 1,
        pageSize: 3,
        orderByFileds: "createTime desc",
        data: {
          scene: "0",
          isEnable: 1,
        }
      },

      // 案例表单的对象
      get_form: {
        currPage: 1,
        pageSize: 3,
        orderByFileds: "createTime desc",

        data: {
          caseScene: "0",
          isEnable: 1,
        }
      }
    };
  },

  methods: {
    // 跳转到详情页
    toDetails(caseID) {
      this.$router.push({
        path: "news_details",
        query: { caseID }
      });
    },

    // 当前页码改变
    currentChange(val) {
      this.get_form.currPage = val;
      this.get_form.orderByFileds = "createTime desc";
      this.getDataList(); // 重新加载列表
    },

    // 请求数据列表
    getDataList() {
      getList("case", this.get_form).then(res => {
        //console.log(res);
        if(res.resultObject.data.length < 1) return;
        this.news_list = spliceUrl(res.resultObject.data, "mainMediaUrl");
        this.news_list.content = removeImg(this.news_list);
        this.totalDataNum = res.totalDataNum;
      });
    }
  }
};
</script>

<style lang="scss">
#news {
  // 新闻列表
  .main {
    .container {
      text-align: right;
      // 列表
      .news_list {
        li {
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          // 图片
          .news_imgs {
            width: 600px;
            margin-right: 72px;
            border-radius: 10px;
            @media screen and (max-width: 750px) {
              margin: 0 auto;
            }
            img {
              width: 100%;
              border-radius: 10px;
            }
          }
          // 正文
          .news_content {
            @media screen and (max-width: 750px) {
              display: none;
            }
            h3 {
              font-size: 30px;
              font-weight: bold;
              @media screen and (max-width: 1500px) and (min-width: 750px) {
                font-size: 2vw;
              }
            }
            .airtcle_wrap {
              max-width: 910px;
              max-height: 240px;
              font-size: 14px;
              color: #000000ff;
              line-height: 30px;
              text-align: left;

              p {
                overflow: hidden;
                -webkit-line-clamp: 5;
                display: -webkit-box;
                -webkit-box-orient: vertical;
              }

              @media screen and (max-width: 1500px) and (min-width: 750px) {
                font-size: 1vw;
                line-height: 2vw;
              }
            }
          }
        }
      }
      // 分页
      .page {
        margin-right: 5%;
      }
    }
  }
}
</style>
