<!-- AR资源类型 -->
<template>
  <div id="AR_type" class="shadow_container">
    <div class="pageTitle">
      AR资源类型
      <el-button type="success" @click="showDetails(0)">添加类型</el-button>
    </div>

    <!-- 列表 -->
    <el-table :data="data_list" border>
      <el-table-column
        prop="name"
        label="类型名称"
        width="180"
      ></el-table-column>

      <el-table-column
        prop="describe"
        label="类型描述"
        width="300"
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
      title="类型详情"
      :visible.sync="show_details"
      width="30%"
      @closed="clear"
    >
      <el-form label-width="100px" class="details_form">
        <el-form-item label="类型名称">
          <el-input v-model="data_info.name"></el-input>
        </el-form-item>

        <el-form-item label="类型描述">
          <el-input
            v-model="data_info.describe"
            type="textarea"
            :rows="3"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button size="small" type="primary" @click="sendSubmit"
            >提交</el-button
          >
          <el-button size="small" type="info" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDataList,
  addData,
  updateData,
  delData,
  getFileList,
  changeFileInfo,
} from "@/utils/api/apis";
import { createGet, hintMessage } from "@/utils/common";
export default {
  mounted() {
    this.find_form = createGet();
    getFileList("u3dTypeList", 1, this.find_form, this, "data_list");
  },

  data() {
    return {
      find_form: {},
      data_list: [],
      data_info: {},

      operate: 0,
      show_details: false,
      model: "file",
      control: "info",
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
      var res = await changeFileInfo("u3dTypeDel", 2, 1, { typeID });
      hintMessage(this, res);
      getFileList("u3dTypeList", 1, this.find_form, this, "data_list");
    },

    // 清空内容
    clear() {
      this.data_info = {};
    },

    // 发送提交
    async sendSubmit() {
      var data = { ...this.data_info };
      this.show_details = false;
      var res = await changeFileInfo(
        this.operate ? "u3dTypeEdit" : "u3dTypeAdd",
        this.operate,
        1,
        data
      );
      console.log(res);
      hintMessage(this, res);
      getFileList("u3dTypeList", 1, this.find_form, this, "data_list");
    },

    // 取消
    cancel() {
      this.show_details = false;
    },
  },
};
</script>

<style lang='scss'>
#AR_type {
  .details_form {
    .el-input,
    .el-textarea {
      width: 500px;
    }
  }
}
</style>