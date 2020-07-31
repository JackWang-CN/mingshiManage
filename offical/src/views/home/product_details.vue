<!-- 新闻详情   -->
<template>
  <div id="product_details">
    <!-- 主体 -->
    <div class="main">
      <div class="article_shadow container">
        <h3>{{ airtcle.title }}</h3>
        <!-- 发布信息 -->
        <div class="publish">
          <span>作者：{{ airtcle.issuerName }}</span>
          <span>发布时间：{{ new Date(airtcle.creationTime).toJSON() }}</span>
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
          <button>上一篇</button>
          <button>下一篇</button>
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
    var caseId = this.$route.query;

    getDetails("case", caseId).then((res) => {
      this.airtcle = spliceUrl([res], "mainMediaUrl")[0];
    });
  },
  data() {
    return {
      isPlay: false,
      showPlay: true,
      airtcle: {},
    };
  },

  methods: {
    playVideo() {
      if (this.isPlay) {
        this.$refs.video.pause();
      } else {
        this.$refs.video.play();
      }
      this.isPlay = !this.isPlay;
    },
  },

  watch: {
    isPlay() {
      this.showPlay = !this.showPlay;
    },
  },
};
</script>

<style lang="scss">
#product_details {
  .main {
    padding-bottom: 80px;
    .article_shadow {
      max-width: 900px;
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
          // 图片
          img {
            width: 895px;
            height: 403px;
          }
          // 视频
          .video {
            height: 540px;
            width: 960px;
            position: relative;
            cursor: pointer;
            video {
              height: 540px;
              width: 960x;
            }
            // 蒙层
            .mask {
              height: 540px;
              width: 960px;
              position: absolute;
              top: 0;

              div {
                position: absolute;
                width: 90px;
                height: 90px;
                top: 50%;
                left: 50%;
                margin-top: -45px;
                margin-left: -45px;
                background: url("../../assets/images/播放.png");
                background-size: cover;
              }
            }
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
