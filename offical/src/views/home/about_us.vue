<template>
  <div id="about_us">
    <!-- 轮播 -->
    <div class="banner">
      <img :src="banner_img" alt />
    </div>

    <!-- 主体 -->
    <div class="main">
      <!-- 一级标题 -->
      <SectionTitle :text="{ pri: '团队风采', sec: 'Team Style' }"></SectionTitle>

      <!-- 照片墙 -->
      <div class="photo_wall">
        <img :src="item.mediaUrl" alt v-for="(item, index) in photo_wall" :key="index" />
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/banner";
import SectionTitle from "@/components/section_title";
import { getList } from "@/utils/api/api";
import { spliceUrl, creatGet } from "@/utils/utils";
export default {
  mounted() {
    this.get_form = creatGet(1, 1, 1);
    getList("media", this.get_form).then(res => {
      //console.log(res);
      this.banner_img = spliceUrl(res.resultObject.data, "mediaUrl")[0].mediaUrl;
    });

    var photo_form = creatGet(1, 12, 2);
    getList("media", photo_form).then(res => {
      //console.log(res);
      this.photo_wall = spliceUrl(res.resultObject.data, "mediaUrl");
    });
  },
  components: {
    Banner,
    SectionTitle
  },
  data() {
    return {
      get_form: {},

      // 轮播
      banner_img: require("@/assets/images/banner4.png"),

      // 照片墙
      photo_wall: [
        { mediaUrl: require("@/assets/images/案例图1.png") },
        { mediaUrl: require("@/assets/images/案例图2.png") },
        { mediaUrl: require("@/assets/images/案例图3.png") },
        { mediaUrl: require("@/assets/images/案例图1.png") },
        { mediaUrl: require("@/assets/images/案例图2.png") },
        { mediaUrl: require("@/assets/images/案例图3.png") },
        { mediaUrl: require("@/assets/images/案例图1.png") },
        { mediaUrl: require("@/assets/images/案例图2.png") },
        { mediaUrl: require("@/assets/images/案例图3.png") },
        { mediaUrl: require("@/assets/images/案例图1.png") },
        { mediaUrl: require("@/assets/images/案例图2.png") },
        { mediaUrl: require("@/assets/images/案例图3.png") }
      ]
    };
  }
};
</script>

<style lang="scss">
#about_us {
  // 轮播
  .banner {
    img {
      width: 100%;
    }
  }

  // 主体
  .main {
    padding-bottom: 0;
    // 照片墙
    .photo_wall {
      display: flex;
      flex-wrap: wrap;
      img {
        height: 270px;
        transition: all 0.2s ease-in-out;
        border-radius: 5px;
        &:hover {
          transform: scale(1.3);
          box-shadow: 0 0 10px -1px #070f0fa6;
        }
      }
    }
  }
}
</style>
