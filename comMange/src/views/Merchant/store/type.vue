<!-- 商户经营类别 -->
<template>
  <div id="store_type" class="shadow_container">
    <div class="pageTitle">
      商户经营类别
      <el-button type="success" @click="showDetails(0)">添加类型</el-button>
    </div>

    <!-- 列表 -->
    <el-table :data="data_list" border>
      <el-table-column prop="merchantName" label="商户名称" width="180"></el-table-column>
      <el-table-column prop="merchantName" label="商户名称" width="180"></el-table-column>
      <el-table-column prop="merchantName" label="商户名称" width="180"></el-table-column>
      <el-table-column prop="merchantName" label="商户名称" width="180"></el-table-column>
      <el-table-column prop="merchantName" label="商户名称" width="180"></el-table-column>
      <el-table-column prop="merchantName" label="商户名称" width="180"></el-table-column>
      <el-table-column prop="merchantName" label="商户名称" width="180"></el-table-column>
      <el-table-column prop="merchantName" label="商户名称" width="180"></el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog title="类型详情" :visible.sync="show_details" width="30%" :closed="clear">
      <el-form label-width="100px" class="details_form">
        <el-form-item label="所属分支">
          <el-select v-model="data_info.typeID">
            <el-option label="新增类型" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="类型名称">
          <el-input v-model="data_info.name"></el-input>
        </el-form-item>

        <el-form-item label="是否启用">
          <el-select v-model="data_info.isEnable">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="经验范围">
          <el-input v-model="data_info.range" type="textarea" :rows="3"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sendSubmit">提交</el-button>
          <el-button type="info" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getDataList } from "@/utils/api/apis";
import { createGet } from "@/utils/common";
export default {
  mounted() {
    this.find_form = createGet();
    getDataList(this.model, this.control, 1, this.find_form, this);
  },

  data() {
    return {
      find_form: {},
      data_list: [],
      data_info: {},

      operate: 0,
      show_details: false,
      model: "merchant",
      control: "merManageType",
    };
  },

  methods: {
    showDetails(type) {
      this.operate = type;
      this.show_details = true;
    },

    // 清空内容
    clear() {
      this.data_info = {};
    },

    // 发送提交
    sendSubmit() {},

    // 取消
    cancel() {
      this.show_details = false;
    },
  },
};
</script>

<style lang='scss'>
#store_type {
  .details_form {
    .el-input,
    .el-textarea {
      width: 500px;
    }
  }
}
</style>