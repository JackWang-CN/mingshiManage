<!-- 轮播图 -->
<template>
  <div class="banner">
    <el-carousel trigger="click" :height="bannerHeight + 'px'">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <a :href="item.jumpUrl">
          <img ref="bannerHeight" :src="item.mediaUrl" @load="imgLoad" alt />
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: ["banner"],

  data() {
    return {
      bannerHeight: "",
    };
  },

  methods: {
    imgLoad() {
      this.$nextTick(() => {
        this.bannerHeight = this.$refs.bannerHeight[0].height;
      });
    },
  },

  mounted() {
    // 第一次获得图片高度
    this.imgLoad();
    window.addEventListener(
      "resize",
      () => {
        if (this.$refs.bannerHeight[0]) {
          this.bannerHeight = this.$refs.bannerHeight[0].height;
          this.imgLoad();
        }
      },
      false
    );
  },
};
</script>

<style lang="scss">
// 轮播图
.banner {
  .el-carousel__container {
    // min-height: 234px;
    .el-carousel__item img {
      width: 100%;
      height: auto;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
}
</style>
