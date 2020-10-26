<!-- 商户管理-优惠券列表 -->
<template>
  <div id="coupon_list" class="shadow_container">
    <div class="pageTitle">
      优惠券列表
      <el-button type="success" @click="toDetails()">创建优惠券</el-button>
    </div>
    <!-- 查询条件 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <el-form-item label="券类型" label-width="100px">
        <el-select v-model="find_form.data.isBind" placeholder="请选择券类型">
          <el-option
            v-for="type in type_list"
            :key="type.typeID"
            :label="type.name"
            :value="type.typeID"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" label-width="100px">
        <el-select v-model="find_form.data.isEnable" placeholder="请选择状态">
          <el-option label="禁用" :value="0"></el-option>
          <el-option label="启用" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="创建时间" label-width="100px">
        <el-date-picker
          v-model="find_form.data.creationTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>

    <!-- 优惠券列表 -->
    <el-table :data="data_list" border style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="name"
        label="优惠券名称"
        width="180"
      ></el-table-column>
      <el-table-column prop="couponTypeName" label="券类型" width="180">
      </el-table-column>
      <el-table-column prop="imgUrl" label="缩略图" width="120">
        <template slot-scope="scope">
          <el-avatar
            :size="80"
            :src="scope.row.imgUrl"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="receiveCount"
        label="领取数量"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="useCount"
        label="已使用数量"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="describe"
        label="优惠券描述"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="endTime"
        label="过期时间"
        width="180"
      ></el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template slot-scope="scope">{{
          scope.row.status == "0" ? "未领取" : "已领取"
        }}</template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="修改时间"
        width="180"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            @click="toDetails(scope.row.couponID)"
            type="primary"
            size="small"
            >编辑</el-button
          >
          <el-button
            @click="delRow(scope.row.couponID)"
            type="danger"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <Pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { createGet, spliceImg, hintMessage } from "@/utils/common";
import { getDataList, delData } from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },
  mounted() {
    // 请求优惠券列表
    this.find_form = createGet();
    getDataList(this.model, this.control, 1, this.find_form, this);

    // 请求优惠券类型
    getDataList(
      this.model,
      "couponType",
      1,
      createGet(1, 999),
      this,
      "type_list"
    );
  },

  data() {
    return {
      // 查找条件
      find_form: {
        data: {},
      },
      select_list: [], //已选表单
      data_list: [],
      type_list: [],

      model: "coupon",
      control: "coupon",
    };
  },

  methods: {
    // 跳转到详情页
    toDetails(id) {
      this.$router.push({
        path: "coupon_details",
        query: { id },
      });
    },

    // 删除当前行
    async delRow(couponID) {
      var res = await delData(this.model, this.control, 1, { couponID });
      hintMessage(this, res);
      var form = { ...this.find_form };
      getDataList(this.model, this.control, 1, form, this);
    },

    // 分页属性改变
    pageChange(type, page) {
      switch (type) {
        case "size":
          this.find_form.pageSize = page;
          break;
        case "curr":
          this.find_form.currPage = page;
          break;
      }
      var form = { ...this.find_form };
      getDataList(this.model, this.control, 1, this.find_form, this);
    },
  },

  watch: {
    // 拼接图片url
    data_list() {
      this.data_list = spliceImg(this.data_list, "imageID");
    },
  },
};
</script>

<style lang="scss">
#coupon_list {
  form {
    .el-form-item {
      display: inline-block;
    }
    .date_btn {
      div {
        vertical-align: middle;
      }
    }
  }
}
</style>
