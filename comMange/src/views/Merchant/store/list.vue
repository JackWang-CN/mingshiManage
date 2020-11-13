<template>
  <div id="merchant_list" class="shadow_container">
    <!-- 商户列表 -->
    <div class="pageTitle">
      商户列表
      <el-button type="success" @click="toDetails()">新增商户</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="data_list" border>
      <el-table-column
        prop="merchantName"
        label="商户名称"
        width="180"
      ></el-table-column>

      <el-table-column
        prop="shopName"
        label="商铺名称"
        width="180"
      ></el-table-column>

      <el-table-column prop="headImage" label="商户头像" width="150">
        <template slot-scope="scope">
          <el-avatar
            :size="80"
            :src="scope.row.imgUrl"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>

      <el-table-column
        prop="manageTypeName"
        label="经营类别"
        width="150"
      ></el-table-column>
      <el-table-column prop="accountType" label="账号类型" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.accountType == 0">商户</span>
          <span v-else>商圈</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="tel"
        label="联系电话"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="inteThrCode"
        label="统一社会信用代码"
        width="200"
      ></el-table-column>
      <el-table-column prop="isEnable" label="启用状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.isEnable">启用</span>
          <span v-else>禁用</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="officeManagerName"
        label="业务经理"
        width="100"
      ></el-table-column>
      <el-table-column prop="checkStatus" label="审核状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.checkStatus == 0">未通过</span>
          <span v-else-if="scope.row.checkStatus == 1">已通过</span>
          <span v-else-if="scope.row.checkStatus == 2">申请中</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="checkeRemark"
        label="审核备注"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="checkerName"
        label="审核人员"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="checkTime"
        label="审核时间"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" width="260">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="toDetails(scope.row.merchantID)"
            size="small"
            >修改</el-button
          >
          <el-button
            :type="scope.row.isEnable ? 'danger' : 'success'"
            v-if="scope.row.checkStatus == 1"
            @click="switchState(scope.row)"
            size="small"
            >{{ scope.row.isEnable ? "禁用" : "启用" }}</el-button
          >

          <el-button
            type="success"
            v-if="scope.row.checkStatus == 0"
            @click="submitCheck(scope.row.merchantID)"
            size="small"
            >申请审核</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <Pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getDataList, delData, updateData } from "@/utils/api/apis";
import { createGet, hintMessage, spliceImg } from "@/utils/common";
export default {
  components: {
    Pagination,
  },

  mounted() {
    // 首次加载
    this.find_form = createGet();
    getDataList(this.model, this.control, 1, this.find_form, this, "data_list");
  },

  data() {
    return {
      find_form: {},
      data_list: [],

      model: "merchant",
      control: "merchantInfo",
    };
  },

  methods: {
    // 展示详情
    showDetails() {},

    // 跳转到详情页
    toDetails(id) {
      this.$router.push({
        path: "merchant_details",
        query: { id },
      });
    },

    // 点击提交审核
    submitCheck(value) {
      console.log(value);
      updateData(this.model, this.control, 1, { value }, "check/apply").then(
        (res) => {
          hintMessage(this, res, "提交审核成功！");
          var form = { ...this.find_form };
          getDataList(this.model, this.control, 1, form, this, "data_list");
        }
      );
    },

    // 切换禁用启用
    switchState(row) {
      var { merchantID, isEnable } = row;
      var operate = isEnable ? "disable" : "enable";

      updateData(this.model, this.control, 1, { merchantID }, operate).then(
        (res) => {
          hintMessage(this, res);
          var form = { ...this.find_form };
          getDataList(this.model, this.control, 1, form, this);
        }
      );
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
      getDataList(this.model, this.control, 1, form, this);
    },
  },

  watch: {
    // 拼接图片url
    data_list() {
      this.data_list = spliceImg(this.data_list, "headImage");
    },
  },
};
</script>

<style>
</style>