<!-- 产品详情   -->
<template>
  <div id="news_details">
    <!-- 主体 -->
    <div class="main container">
      <!-- tab菜单 -->
      <ul class="tabs">
        <li
          v-for="(item, index) in tabs_list"
          :key="item.name"
          @click="switchTab(index)"
          :class="item.isActive ? 'active' : ''"
        >
          {{ item.name }}
        </li>
      </ul>

      <!-- 媒体 -->
      <div class="media">
        <div class="left wrap">
          <div class="pages last" @click="pageChange(0)"></div>
          <div class="pages next" @click="pageChange(1)"></div>
          <el-carousel
            ref="photo_wall"
            indicator-position="outside"
            height="460px"
            arrow="never"
          >
            <el-carousel-item v-for="(item, index) in photo_wall" :key="index">
              <img :src="item" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="right paragraph">
          <h2>VR描述</h2>
          <p>
            VR又叫虚拟现实（Virtual Reality，简称
            VR）。其最大的特点是利用电脑模拟产生一个
            三维空间的虚拟世界，提供使用者关于视觉、
            听觉、触觉等感官的模拟，让使用者如同身临 其境一般,
            可以及时、没有限制地观察三度空间
            内的事物,在这个虚拟空间内，使用者形成交互 的是虚拟世界的东西。
          </p>
        </div>
      </div>

      <!-- 正文 -->
      <div class="content paragraph">
        <h2>VR描述</h2>
        <p>
          VR又叫虚拟现实（Virtual Reality，简称
          VR）。其最大的特点是利用电脑模拟产生一个
          三维空间的虚拟世界，提供使用者关于视觉、
          听觉、触觉等感官的模拟，让使用者如同身临 其境一般,
          可以及时、没有限制地观察三度空间
          内的事物,在这个虚拟空间内，使用者形成交互 的是虚拟世界的东西。
        </p>
      </div>

      <!-- 按钮 -->
      <div class="text_btn" @click="backList">返回</div>
    </div>
  </div>
</template>

<script>
import { getDetails } from "@/utils/api/api";
import { spliceUrl } from "@/utils/utils";
export default {
  mounted() {
    this.active_index = 0;

    // 接收参数
    // var caseID = this.$route.query;
    // getDetails("case", caseID).then((res) => {
    //   this.airtcle = spliceUrl([res.resultObject], "mainMediaUrl")[0];
    // });
    this.photo_wall = [require("../../assets/images/news/case1.png")];
  },
  data() {
    return {
      isPlay: false,
      showPlay: true,
      airtcle: {},
      photo_wall: [],

      tabs_list: [
        {
          name: "照片",
          isActive: false,
        },
        {
          name: "视频",
          isActive: false,
        },
      ],
      active_index: "",
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

    backList() {
      this.$router.push("news");
    },

    // 切换激活tab
    switchTab(index) {
      if (this.active_index == index) return;
      this.tabs_list[this.active_index].isActive = false;
      this.active_index = index;
    },

    // 照片翻页
    pageChange(type) {
      if (!type) {
        this.$refs.photo_wall.prev();
      } else {
        this.$refs.photo_wall.next();
      }
    },
  },

  watch: {
    active_index() {
      this.tabs_list[this.active_index].isActive = true;
    },
  },
};
</script>

<style lang="scss">
#news_details {
  .main {
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: 0;
    margin-bottom: 50px;
    // tab菜单
    .tabs {
      display: flex;
      margin-bottom: 20px;
      li {
        background-image: url("../../assets/images/ico_resource.png");
        background-repeat: no-repeat;
        background-size: 30px;
        background-position-x: 26px;
        cursor: pointer;
        color: #666;
        padding: 16px 32px;
        padding-left: 72px;
        font-size: 24px;
        border: 1px solid #d2d2d2;
        margin-right: 15px;
        &.active {
          border-color: #008bff;
          background-color: #008bff;
          color: #fff;
        }
        &:nth-child(1) {
          background-position-y: 16px;
          &.active {
            background-position-y: -39px;
          }
        }
        &:nth-child(2) {
          background-position-y: -104px;
          &.active {
            background-position-y: -161px;
          }
        }
      }
    }

    // 媒体
    .media {
      display: flex;
      align-items: center;

      .left {
        position: relative;
        flex: 0 0 940px;
        background-color: #e5e5e5;
        padding: 40px 120px;
        box-sizing: border-box;
        .pages {
          cursor: pointer;
          width: 82px;
          height: 82px;
          border-radius: 82px;
          background-size: cover;
          position: absolute;
          top: 35%;
          z-index: 99;
          &.last {
            background-image: url("../../assets/images/about/last.png");
            left: 20px;
          }
          &.next {
            right: 20px;
            background-image: url("../../assets/images/about/next.png");
          }
        }

        .el-carousel {
          img {
            width: 100%;
          }

          // 指示器
          .el-carousel__indicators {
            border-radius: 10px;
            margin-top: 28px;
            .el-carousel__indicator--horizontal {
              &.is-active {
                button {
                  opacity: 0.64;
                  background-color: #008bff;
                }
              }
            }

            .el-carousel__button {
              opacity: 1;
              margin: 0 10px;
              height: 10px;
              width: 10px;
              border-radius: 10px;
              background-color: #a0a0a0;
            }
          }
        }
      }

      .right {
        flex: 0 1 auto;
        margin-left: 66px;
      }
    }

    // 正文
    .content {
      margin-top: 60px;
      width: 940px;
    }

    // 按钮
    .text_btn {
      cursor: pointer;
      margin-top: 60px;
      margin-bottom: 28px;
      color: #008bff;
      font-size: 30px;
      &:hover {
        color: #56adf5;
      }
    }

    // 段落
    .paragraph {
      color: #666;
      h2 {
        font-size: 30px;
        line-height: 26px;
        margin-bottom: 34px;
      }
      p {
        text-indent: 2em;
        font-size: 16px;
        line-height: 36px;
      }
    }
  }
}
</style>
