<template>
  <div id="product">
    <!-- 主体 -->
    <div class="main">
      <div class="container">
        <!-- 一级标题 -->
        <SectionTitle
          :text="{ pri: '产品案例', sec: 'PRODUCT CASE' }"
        ></SectionTitle>

        <!-- 产品列表 -->
        <ul class="product_list">
          <li @click="toApp">
            <img :src="kongwan.img" alt="" />
            <div class="title">
              <span class="pri">{{ kongwan.title }}</span>
            </div>
          </li>

          <li
            v-for="(item, index) in product_list"
            :key="index"
            @click="toDetails(item.caseID)"
          >
            <img :src="item.mainMediaUrl" alt class="proudct_img" />
            <div class="title">
              <span class="pri">{{ item.title }}</span>
            </div>
          </li>
        </ul>

        <!-- 分页插件 -->
        <el-pagination
          class="page"
          background
          :hide-on-single-page="true"
          layout="prev, pager, next"
          :total="totalDataNum"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from "@/components/section_title";

import { getList } from "@/utils/api/api";
import { spliceUrl } from "@/utils/utils";
export default {
  mounted() {
    // 请求轮播列表
    getList("media", this.banner_form).then((res) => {
      if (res.resultObject.data.length < 1) return;
      this.banner_list = spliceUrl(res.resultObject.data, "mediaUrl");
    });

    // 请求案例列表
    this.getDataList();
  },
  components: {
    SectionTitle,
  },
  data() {
    return {
      totalDataNum: 0,

      // 轮播图
      banner_list: [{}],

      // 产品案例
      product_list: [],

      // 案例-空玩
      kongwan: {
        img: require("../../assets/images/product/kongwan/app.png"),
        title: "空玩APP",
      },

      // 轮播表单的对象
      banner_form: {
        currPage: 1,
        pageSize: 3,
        orderByFileds: "createTime desc",
        data: {
          scene: "0",
          isEnable: 1,
        },
      },

      // 案例表单的对象
      get_form: {
        currPage: 1,
        pageSize: 3,
        orderByFileds: "createTime desc",
        data: {
          caseScene: "1",
          isEnable: 1,
        },
      },
    };
  },

  methods: {
    // 当前页码改变
    currentChange(val) {
      this.get_form.currPage = val;
      this.get_form.orderByFileds = "createTime desc";
      this.getDataList(); // 重新加载列表
    },

    // 请求数据列表
    getDataList() {
      getList("case", this.get_form).then((res) => {
        if (res.resultObject.data.length < 1) return;
        this.product_list = spliceUrl(res.resultObject.data, "mainMediaUrl");
        this.totalDataNum = res.totalDataNum;
      });
    },

    // 跳转到详情页
    toDetails(caseID) {
      this.$router.push({
        path: "product_details",
        query: { caseID },
      });
    },

    // 跳转到空玩APP
    toApp() {
      this.$router.push("product_kongwan");
    },
  },
};
</script>

<style lang="scss">
#product {
  .main {
    .container {
      text-align: right;
      display: flex;
      flex-direction: column;
      align-items: center;
      .product_list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          box-shadow: 0 0 20px #dddddd;
          width: 442px;
          cursor: pointer;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 80px;
          img {
            width: 100%;
          }

          // 标题
          .title {
            text-align: left;
            padding: 18px 0;
            .pri {
              display: inline-block;
              margin-left: 38px;
              margin-right: 30px;
              font-size: 30px;
              color: #000000ff;
              vertical-align: middle;
            }
          }
          // 内容
        }
      }
      .page {
        align-self: flex-end;
      }
    }
  }
}
</style>
