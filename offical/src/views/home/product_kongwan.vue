<!-- 空玩APP项目介绍   -->
<template>
  <div id="product_details">
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

      <!-- 简介 -->
      <div class="introduce">
        <img
          width="940px"
          src="../../assets/images/product/kongwan/activity.png"
          alt=""
        />
        <div class="paragraph">
          <h3>空玩APP介绍</h3>
          <p>
            空玩APP为企业和商家市场提供AR互动 +
            SAAS平台搭建，一站式整体解决方案。我们致力
            于解决商家创新难，运营难，推广难等烦心问题，
            让产品更具有人性思维帮您更好的管理数据、扩
            大客流。我们本着为用户谋福利、想尝试、爱娱
            乐等问题，让产品更具有亲和力，能够在您纠结、
            徘徊的时候，能给您一个好的选择。
          </p>
          <p>
            以技术领先，模式创新为向导，致力于打造
            行业领军品牌。智慧商业，智慧生活。
          </p>
        </div>
      </div>

      <!-- 功能展示 -->
      <div class="function">
        <div class="title">
          <h2>功能展示</h2>
          <span></span>
        </div>

        <ul>
          <li>
            <img src="../../assets/images/product/kongwan/im.png" alt="" />
            <div>
              <h4>及时社交</h4>
              <p>及时聊天，好友关系更近一步</p>
              <p>在线邀请好友赠送道具和优惠券</p>
              <p>丈母娘又在打怪？赶紧送点金币！</p>
            </div>
          </li>
          <li>
            <div>
              <h4>拍卖行</h4>
              <p>通过拍卖行，用户自由买卖</p>
              <p>大量道具和优惠券任你购买</p>
              <p>随时随地查看个人拍卖信息</p>
            </div>
            <img src="../../assets/images/product/kongwan/auction.png" alt="" />
          </li>
          <li>
            <img src="../../assets/images/product/kongwan/game.png" alt="" />
            <div>
              <h4>AR生活</h4>
              <p>AR交互，智享您的生活</p>
              <p>邀请好友共同闯关，组队打怪更能得好礼</p>
              <p>优惠福利一手把握，节日惊喜连连</p>
              <p>随时随地获得金币，您的私房钱未必是钱，也可以是金币</p>
              <p>实时资讯让您第一时间了解，什么？他们店又打五折？</p>
            </div>
          </li>
        </ul>
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
    this.photo_wall = [require("../../assets/images/product/case1.png")];
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
        // {
        //   name: "视频",
        //   isActive: false,
        // },
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
      this.$router.push("product");
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
#product_details {
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

    // 简介
    .introduce {
      margin-bottom: 108px;
      display: flex;
      align-items: center;
      img {
        margin-right: 68px;
      }
    }

    // 功能
    .function {
      .title {
        font-size: 40px;
        color: #333;
        text-align: center;
        margin-bottom: 62px;
        span {
          display: inline-block;
          width: 40px;
          height: 4px;
          background: linear-gradient(91deg, #0014ff, #008eff);
        }
      }

      ul {
        li {
          display: flex;
          height: 720px;
          align-items: center;
          img {
            height: 100%;
          }
          &:nth-child(2) {
            margin-left: 200px;
          }
          > :first-child {
            margin-right: 178px;
          }

          h4 {
            color: #333333;
            font-size: 40px;
            margin-bottom: 40px;
          }
          p {
            font-size: 20px;
            line-height: 45px;
            color: #666666;
          }
        }
      }
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
      h3 {
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
