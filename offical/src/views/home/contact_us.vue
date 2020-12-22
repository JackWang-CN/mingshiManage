<template>
  <div id="contact_us">
    <!-- 主体 -->
    <div class="main">
      <!-- 联系方式 -->
      <SectionTitle
        :text="{ pri: '联系我们', sec: 'CONTACT US' }"
      ></SectionTitle>

      <ul class="info">
        <li v-for="item in componay_info" :key="item.title">
          <img :src="item.ico" alt="" />
          <h2>{{ item.title }}</h2>
          <p>{{ item.text }}</p>
        </li>
      </ul>

      <!-- 地图 -->
      <div id="container"></div>
    </div>
  </div>
</template>

<script>
import SectionTitle from "@/components/section_title";
import { getList } from "@/utils/api/api";
import { spliceUrl, creatGet } from "@/utils/utils";
export default {
  components: {
    SectionTitle,
  },

  mounted() {
    this.banner_form = creatGet(1, 1, 4);
    getList("media", this.banner_form).then((res) => {
      if (res.resultObject.data.length < 1) return;
      this.banner_img = spliceUrl(
        res.resultObject.data,
        "mediaUrl"
      )[0].mediaUrl;
    });

    // 初始化地图
    var map = new AMap.Map("container", {
      center: [104.06517, 30.568871],
      zoom: 16,
    });
    // 创建标记点
    var maker = new AMap.Marker({
      position: [104.06517, 30.568871],
      title: "新世纪环球中心E2区",
    });
    // 应用标记点
    maker.setMap(map);
  },
  data() {
    return {
      // 轮播图
      banner_img: "",

      // 公司信息
      componay_info: [
        {
          ico: require("@/assets/images/contact/number.png"),
          title: "联系电话",
          text: "028-65733816",
        },
        {
          ico: require("@/assets/images/contact/email.png"),
          title: "企业邮箱",
          text: "mingshirgzn@163.com",
        },
        {
          ico: require("@/assets/images/contact/address.png"),
          title: "公司地址",
          text:
            "中国(四川)自由贸易试验区成都高新区天府大道北段1700号1栋3单元7层705",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
#contact_us {
  .article_shadow {
    margin: 0 auto;
    width: 600px;
    ul {
      li {
        display: flex;
        align-items: center;
        margin-bottom: 50px;
        color: #010101ff;
        font-size: 26px;
        line-height: 48px;
        &:last-child {
          margin-bottom: 0;
        }
        .icons {
          width: 36px;
          margin-right: 20px;
        }
      }
    }
  }

  // 主体
  .main {
    padding-bottom: 0;
    background-image: none;
    @media screen and (max-width: 1789px) {
      padding-top: 30%;
    }
    @media screen and (max-width: 1300px) {
      padding-top: 40%;
    }
    @media screen and (max-width: 900px) {
      padding-top: 15%;
    }
  }

  .info {
    margin-top: 120px;
    display: flex;
    justify-content: center;
    color: #1a1a1a;
    li {
      position: relative;
      width: 350px;
      height: 300px;
      box-sizing: border-box;
      box-shadow: 0 0 20px #e2e2e2;
      text-align: center;
      padding: 108px 30px 0 30px;
      &:nth-child(2) {
        margin: 0 60px;
      }
      &:nth-child(3) {
        p {
          letter-spacing: 1px;
          text-align: left;
        }
      }
      img {
        width: 140px;
        position: absolute;
        top: -70px;
        left: 105px;
      }
      h2 {
        font-size: 30px;
      }
      p {
        font-size: 20px;
        margin-top: 30px;
        width: 278px;
        line-height: 30px;
      }
    }
  }

  // 地图
  #container {
    margin-top: 106px;
    height: 600px;
  }
}
</style>
