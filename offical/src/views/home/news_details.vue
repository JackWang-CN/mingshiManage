<!-- 新闻详情   -->
<template>
  <div id="news_details">
    <!-- 主体 -->
    <div class="main">
      <div class="article_shadow container">
        <h3>{{ airtcle.title }}</h3>
        <!-- 发布信息 -->
        <div class="publish">
          <!-- <span>作者：{{ airtcle.issuerName }}</span> -->
          <span>发布时间：{{ new Date(airtcle.createTime).toJSON() }}</span>
          <span>访问量：{{ airtcle.clickNum || 0 }}</span>
        </div>
        <!-- 媒体资源 -->
        <div class="resource">
          <img :src="airtcle.mainMediaUrl" alt />
          <!-- <video
            :src="airtcle.resource.url"
            v-if="airtcle.resource.type === 'video'"
          ></video>-->
        </div>
        <!-- 正文 -->
        <div class="content">
          <h4>{{ airtcle.title }}</h4>
          <div v-html="airtcle.content"></div>
        </div>
        <!-- 翻页 -->
        <div class="page">
          <button @click="backList">返回</button>
          <!-- <button>下一篇</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetails } from "@/utils/api/api";
import { spliceUrl } from "@/utils/utils";
export default {
  mounted() {
    // 接收参数
    var caseID = this.$route.query;

    getDetails("case", caseID).then((res) => {
      //console.log(res)
      this.airtcle = spliceUrl([res.resultObject], "mainMediaUrl")[0];
    });
  },
  data() {
    return {
      airtcle: {},
    };
  },

  methods: {
    backList() {
      this.$router.push("news");
    },
  },
};
</script>

<style lang="scss">
#news_details {
  .main {
    padding-bottom: 80px;
    .article_shadow {
      padding-bottom: 20px;
      h3 {
        font-size: 36px;
        color: #000000ff;
        padding-bottom: 28px;
        border-bottom: 1px solid #e5e5e5ff;
        margin-bottom: 18px;
      }
      div {
        text-align: left;
        // 文章发布信息
        &.publish {
          margin-bottom: 30px;
          span {
            font-size: 20px;
            color: #767676ff;
            margin-right: 60px;
          }
        }

        // 媒体资源
        &.resource {
          margin-bottom: 25px;
          img {
            width: 50%;
          }
          video {
            height: 400px;
            width: 895px;
          }
        }

        // 正文
        &.content {
          margin-bottom: 100px;
          h4 {
            margin-bottom: 22px;
            font-size: 24px;
            color: #2e2e2eff;
            text-align: left;
          }
          div {
            font-size: 16px;
            color: #525151ff;
            line-height: 50px;
            text-align: left;
            span,
            p {
              text-indent: 2rem;
            }
            img {
              width: 100%;
              height: auto;
              margin: 10px 0;
            }
          }
        }

        // 翻页
        &.page {
          display: flex;
          justify-content: space-between;
          button {
            border: none;
            outline: none;
            background: none;
            font-size: 20px;
            color: #767676ff;
            cursor: pointer;
            &:hover {
              color: #6de0f8ff;
            }
          }
        }
      }
    }
  }
}
</style>
