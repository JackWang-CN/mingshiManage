<!-- 金币模型配置 -->
<template>
  <div id="activity" class="shadow_container">
    <div class="pageTitle">金币模型配置</div>

    <!-- 列表 -->
    <el-table :data="data_list" border>
      <el-table-column
        prop="cityCode"
        label="城市编号"
        width="100"
      ></el-table-column>

      <el-table-column
        prop="cityName"
        label="城市名称"
        width="180"
      ></el-table-column>

      <el-table-column label="左上坐标" width="180">
        <template slot-scope="scope">
          <div>经度：{{ scope.row.luLongitude }}</div>
          <div>纬度：{{ scope.row.luLatitude }}</div>
        </template>
      </el-table-column>

      <el-table-column label="右下坐标" width="180">
        <template slot-scope="scope">
          <div>经度：{{ scope.row.rdLongitude }}</div>
          <div>纬度：{{ scope.row.rdLatitude }}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="showDetails(1, scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog
      title="配置详情"
      :visible.sync="show_details"
      width="25%"
      @closed="clear"
    >
      <el-form label-width="80px" class="details_form">
        <el-form-item label="城市名称">
          <el-input v-model="data_info.cityName"></el-input>
        </el-form-item>

        <el-form-item label="城市编号">
          <el-input v-model="data_info.cityCode"></el-input>
        </el-form-item>

        <el-form-item label="左上经度">
          <el-input v-model="data_info.luLongitude"></el-input>
        </el-form-item>

        <el-form-item label="左上纬度">
          <el-input v-model="data_info.luLatitude"></el-input>
        </el-form-item>

        <el-form-item label="右下经度">
          <el-input v-model="data_info.rdLongitude"></el-input>
        </el-form-item>

        <el-form-item label="右下纬度">
          <el-input v-model="data_info.rdLatitude"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button size="small" type="primary" @click="sendSubmit"
            >提交</el-button
          >
          <el-button size="small" type="info" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

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
import { getDataList, addData, updateData, delData } from "@/utils/api/apis";
import { createGet, hintMessage } from "@/utils/common";

export default {
  components: {
    Pagination,
  },
  mounted() {
    var map = new AMap.Map("container");

    this.find_form = createGet();
    getDataList(this.model, this.control, 1, this.find_form, this, "data_list");
  },

  data() {
    return {
      find_form: {},
      data_list: [],
      data_info: {},

      show_details: false,
      model: "ARGame",
      control: "cityScopeConfig",
    };
  },

  methods: {
    // 展示详情
    showDetails(type, row) {
      this.operate = type;
      this.show_details = true;
      if (type) {
        this.data_info = { ...row };
      }
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
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },

    // 清空内容
    clear() {
      this.data_info = {};
    },

    // 发送提交
    async sendSubmit() {
      var data = { ...this.data_info };
      this.show_details = false;
      var res = await updateData(this.model, this.control, 1, data);

      hintMessage(this, res);
      var form = { ...this.find_form };
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },

    // 取消
    cancel() {
      this.show_details = false;
    },
  },
};
</script>

<style lang='scss'>
</style>