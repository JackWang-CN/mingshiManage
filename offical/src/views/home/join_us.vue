<template>
  <div id="join_us">
    <!-- 轮播 -->
    <div class="banner">
      <img :src="banner_img" alt />
    </div>

    <!-- 主体 -->
    <div class="main">
      <!-- 一级标题 -->
      <SectionTitle :text="{ pri: '加入我们', sec: 'Join Us' }"></SectionTitle>

      <!-- 招聘列表 -->
      <ul class="recruit_list container">
        <li v-for="(item, index) in recruit_list" :key="index" class="article_shadow">
          <h3>
            {{ item.title }}
            <p>发布于 {{ new Date(item.createTime).toJSON() }}</p>
          </h3>
          <div class="city">
            <p>全职</p>
            <p>工作经验{{ item.term }}</p>
            <p>{{ item.address }}</p>
          </div>

          <div class="title">
            <h4>岗位职责：</h4>
            <p v-for="(v, i) in item.duties" :key="i">{{ v }}</p>
          </div>
          <div class="title">
            <h4>岗位能力：</h4>
            <!-- <p v-for="(v, i) in item.power" :key="i">{{ v }}</p> -->
            <p v-for="(v, i) in item.power" :key="i">{{ v }}</p>
          </div>

          <div class="title">
            <h4>招聘人数：</h4>
            <p>{{ item.regmen }}人</p>
          </div>
          <div class="title">
            <h4>联系我们：028-65733816</h4>
          </div>
          <div class="title">
            <h4>企业邮箱：mingshirgzn@163.com</h4>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SectionTitle from "@/components/section_title";
import { toWrap } from "@/utils/utils";
import { getList } from "@/utils/api/api";
import { spliceUrl, creatGet } from "@/utils/utils";
export default {
  mounted() {
    getList("recruit", this.get_form).then(res => {
      if(res.resultObject.data.length < 1) return;
      this.recruit_list = res.resultObject.data;
      // 重新编译排句;
      this.recruit_list.forEach(item => {
        item.power = toWrap(item.power);
      });
      this.recruit_list.forEach(item => {
        item.duties = toWrap(item.duties);
      });
    });

    this.banner_form = creatGet(1, 1, 3);
    getList("media", this.banner_form).then(res => {
      if(res.resultObject.data.length < 1) return;
      this.banner_img = spliceUrl(res.resultObject.data, "mediaUrl")[0].mediaUrl;
    });
  },
  components: { SectionTitle },

  data() {
    return {
      list: [],
      // 轮播图
      banner_img: require("@/assets/images/banner5.png"),

      // 招聘列表
      recruit_list: [],

      // 请求表单的对象
      get_form: {
        currPage: 1,
        pageSize: 10,
        orderByFileds: "createTime desc",
        data: {
          scene: "3",
          isEnable: 1,
        }
      }
    };
  }
};
</script>

<style lang="scss">
#join_us {
  // 轮播
  .banner {
    img {
      width: 100%;
    }
  }

  // 主体
  .main {
    .recruit_list {
      width: 50%;
      text-align: left;
      li {
        padding-left: 10%;
        padding-right: 10%;
        box-shadow: 0 0 20px -10px #1a1b1b7e;
        margin-bottom: 30px;
        p {
          font-size: 18px;
          color: rgb(95, 95, 95);
          line-height: 30px;
          @media screen and (max-width: 1549px) {
            font-size: 1.4vw;
            line-height: 3vw;
          }
        }
        // 职位名称
        h3 {
          font-size: 30px;
          font-weight: bold;
          color: #000000ff;
          display: flex;
          justify-content: space-between;
          margin-bottom: 34px;
          @media screen and (max-width: 1549px) {
            font-size: 2vw;
            margin-bottom: 3vw;
          }
          p {
            font-weight: normal;
          }
        }

        // 工作地点
        .city {
          display: flex;
          margin-bottom: 34px;
          padding-bottom: 1%;
          border-bottom: 1px solid #e6e6e6ff;
          @media screen and (max-width: 1549px) {
            margin-bottom: 3vw;
          }
          p {
            margin-right: 70px;
          }
        }

        // 职位描述
        .title {
          margin-bottom: 30px;
          @media screen and (max-width: 1549px) {
            margin-bottom: 3vw;
          }
          h4 {
            font-size: 24px;
            color: #000000ff;
            @media screen and (max-width: 1549px) {
              font-size: 1.6vw;
            }
          }
          p {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
