<!-- 活动配置 -->
<template>
  <div id="activity" class="shadow_container">
    <div class="pageTitle">
      活动配置
      <el-button type="success" @click="showDetails(0)">新增配置</el-button>
    </div>

    <!-- 列表 -->
    <el-table :data="data_list" border>
      <el-table-column
        prop="name"
        label="类型名称"
        width="180"
      ></el-table-column>

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

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="showDetails(1, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="delRow(scope.row.typeID)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog
      title="配置详情"
      :visible.sync="show_details"
      width="30%"
      @closed="clear"
    >
      <el-form label-width="80px" class="details_form">
        <el-form-item label="类型名称">
          <el-input v-model="data_info.typeName"></el-input>
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
    this.find_form = createGet();
    getDataList(
      this.model,
      this.control,
      1,
      this.find_form,
      this,
      "data_list",
      "activityTypeList"
    );
  },

  data() {
    return {
      find_form: {},
      data_list: [],
      data_info: {},

      operate: 0,
      show_details: false,
      model: "activity",
      control: "activityType",
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

    // 删除当前行
    async delRow(typeID) {
      console.log(typeID);
      var res = await delData(
        this.model,
        this.control,
        1,
        { typeID },
        "activityTypeDel"
      );
      hintMessage(this, res);
      var form = { ...this.find_form };
      getDataList(
        this.model,
        this.control,
        1,
        form,
        this,
        "data_list",
        "activityTypeList"
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
      switch (this.operate) {
        case 0:
          var res = await addData(
            this.model,
            this.control,
            1,
            data,
            "activityTypeCreate"
          );
          break;
        case 1:
          var res = await updateData(
            this.model,
            this.control,
            1,
            data,
            "activityTypeEdit"
          );
          break;
      }
      hintMessage(this, res);
      var form = { ...this.find_form };
      getDataList(
        this.model,
        this.control,
        1,
        form,
        this,
        "data_list",
        "activityTypeList"
      );
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