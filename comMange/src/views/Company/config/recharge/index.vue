<template>
  <div id="recharge" class="shadow_container">
    <!-- 充值配置 -->
    <div class="pageTitle">
      充值配置
      <el-button type="success" @click="toDetails">添加模版</el-button>
    </div>
    <el-table :data="data_list" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="describe"
        label="充值说明"
        width="120"
      ></el-table-column>
      <el-table-column prop="isEnable" label="启用状态" width="120">
        <template slot-scope="scope">
          {{ scope.row.isEnable ? "启用" : "禁用" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="scale"
        label="充值比例"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="modelMoney"
        label="默认金额"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.isEnable ? 'warning' : 'success'"
            size="small"
            @click="switchStatus(scope.row)"
            >{{ scope.row.isEnable ? "禁用" : "启用" }}</el-button
          >
          <el-button type="danger" size="small" @click="delRow(scope.row.payID)"
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
import { getDataList, delData, updateData } from "@/utils/api/apis";
import { createGet, hintMessage } from "@/utils/common";
export default {
  components: {
    Pagination,
  },

  data() {
    return {
      find_form: {},
      data_list: [],

      model: "config",
      control: "payConfig",
    };
  },

  mounted() {
    this.find_form = createGet();
    getDataList(this.model, this.control, 1, this.find_form, this);
  },

  methods: {
    // 跳转到详情页
    toDetails() {
      this.$router.push("recharge_details");
    },

    // 切换启用状态
    switchStatus(row) {
      var { isEnable, payID } = row;
      var operate = isEnable ? "disable" : "enable";
      updateData(this.model, this.control, 1, { payID }, operate).then(
        (res) => {
          hintMessage(this, res);
          // 重新加载
          getDataList(this.model, this.control, 1, this.find_form, this);
        }
      );
    },

    // 删除当前行
    delRow(payID) {
      delData(this.model, this.control, 1, { payID }).then((res) => {
        hintMessage(this, res);
        // 重新加载
        getDataList(this.model, this.control, 1, this.find_form, this);
      });
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
      delete form.totalDataNum;
      getDataList(this.model, this.control, 1, this.find_form, this);
    },
  },
};
</script>

<style>
</style>