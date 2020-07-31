<template>
  <div id="contact_us">
    <!-- 公司名片盒子 -->
    <div class="article_shadow">
      <ul>
        <li v-for="(item, index) in componay_info" :key="index">
          <div class="icons">
            <img :src="item.icon" alt />
          </div>
          <div class="info">{{ item.text }}</div>
        </li>
      </ul>
    </div>

    <!-- 轮播 -->
    <div class="banner">
      <img :src="banner_img" alt />
    </div>

    <!-- 主体 -->
    <div class="main">
      <!-- 公司概述 -->
      <div class="desc container">
        <h3>{{ componay_desc.title }}</h3>
        <p>{{ componay_desc.content }}</p>
      </div>

      <!-- 地图 -->
      <div id="container"></div>
    </div>
  </div>
</template>

<script>
import { getList } from "@/utils/api/api";
import { spliceUrl, creatGet } from "@/utils/utils";
export default {
  mounted() {
    this.banner_form = creatGet(1, 1, 4);
    getList("media", this.banner_form).then(res => {
      this.banner_img = spliceUrl(res.data, "mediaUrl")[0].mediaUrl;
    });

    // 初始化地图
    var map = new AMap.Map("container", {
      center: [104.06517, 30.568871],
      zoom: 16
    });
    // 创建标记点
    var maker = new AMap.Marker({
      position: [104.06517, 30.568871],
      title: "新世纪环球中心E2区"
    });
    // 应用标记点
    maker.setMap(map);
  },
  data() {
    return {
      // 轮播图
      banner_img: require("@/assets/images/banner6.png"),

      // 公司信息
      componay_info: [
        {
          icon: require("@/assets/images/电话.png"),
          text: "028-65733816"
        },
        {
          icon: require("@/assets/images/邮箱.png"),
          text: "mingshirgzn@163.com"
        },
        {
          icon: require("@/assets/images/地址.png"),
          text:
            "中国(四川)自由贸易试验区成都高新区天府大道北段1700号1栋3单元7层705"
        }
      ],

      // 公司概述
      componay_desc: {
        title: "四川名视人工智能科技有限公司——人工智能领域的先行者",
        content:
          "四川名视人工智能科技有限公司主要从事：人工智能应用软件开发；技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；大气污染治理；住宅室内装饰装修；电影摄制服务；专业设计服务；广告设计、代理；广告制作；广告发布（非广播电台、电视台、报刊出版单位）；企业形象策划；市场营销策划；组织文化艺术交流活动；会议及展览服务；礼仪服务；摄影扩印服务；信息咨询服务（不含许可类信息咨询服务）；企业管理；文化娱乐经纪人服务；互联网销售（除销售需要许可的商品）；日用品零售；通讯设备销售；化妆品零售；五金产品零售；工艺美术品及收藏品零售（象牙及其制品除外）；体育用品及器材零售；电子产品销售；办公用品销售；服装服饰零售；鞋帽零售；家具销售；计算机软硬件及辅助设备零售；机械设备销售；建筑装饰材料销售；建筑材料销售"
      }
    };
  }
};
</script>

<style lang="scss">
#contact_us {
  position: relative;
  .article_shadow {
    padding: 80px;
    width: 40%;
    position: absolute;
    left: 0;
    right: 0;
    top: 20%;
    margin: auto;
    @media screen and (max-width: 1789px) {
      padding: 5vw;
    }
    @media screen and (max-width: 900px) {
      top: 10%;
    }
    ul {
      li {
        display: flex;
        align-items: center;
        margin-bottom: 92px;
        color: #010101ff;
        font-size: 30px;
        line-height: 48px;
        @media screen and (max-width: 1600px) {
          font-size: 1.8vw;
          margin-bottom: 2.5vw;
          line-height: 2vw;
        }
        &:last-child {
          margin-bottom: 0;
        }
        img {
          margin-right: 55px;
          @media screen and (max-width: 1600px) {
            margin-right: 1.5vw;
            width: 2vw;
          }
        }
      }
    }
  }

  // 轮播
  .banner {
    img {
      width: 100%;
    }
  }

  // 主体
  .main {
    padding-top: 25%;
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
    // 公司概述
    .desc {
      width: 70%;
      margin-bottom: 106px;
      h3 {
        text-align: center;
        font-size: 30px;
        margin-bottom: 58px;
        color: #000000ff;
        @media screen and (max-width: 1600px) {
          font-size: 2vw;
          margin-bottom: 2vw;
        }
      }
      p {
        font-size: 18px;
        color: #545454ff;
        line-height: 30px;
        text-align: left;
        @media screen and (max-width: 1600px) {
          font-size: 1.4vw;
        }
      }
    }
  }

  // 地图
  #container {
    height: 600px;
  }
}
</style>
