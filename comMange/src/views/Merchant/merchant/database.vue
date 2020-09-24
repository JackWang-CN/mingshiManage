<!-- 商户数据库 -->
<template>
  <div id="merchant_database" class="shadow_container">
    <div class="pageTitle">
      商户数据库
      <el-button type="success" @click="showDetails(0)">添加数据库</el-button>
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
    <el-dialog title="数据库详情" :visible.sync="show_details" width="30%" :closed="clear">
      <el-form label-width="100px" class="details_form">
        <el-form-item label="数据库名称">
          <el-input v-model="data_info.name"></el-input>
        </el-form-item>

        <el-form-item label="绑定商户">
          <el-button type="success" size="small" @click="showStore">选择商户</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sendSubmit">提交</el-button>
          <el-button type="info" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="选择商户" :visible.sync="show_store" append-to-body width="30%">
        <el-table :data="store_list">
          <el-table-column prop="merchantName" label="商户名称" width="180"></el-table-column>
          <el-table-column prop="manageTypeName" label="经营类型" width="180"></el-table-column>
          <el-table-column prop="isEnable" label="启用状态" width="180"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="primary" @click="selectStore(scope.row)" size="small">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { getDataList } from "@/utils/api/apis";
import { createGet } from "@/utils/common";
export default {
  mounted() {
    this.find_form = createGet();
    // getDataList(this.model, this.control, 1, this.find_form, this);
  },

  data() {
    return {
      find_form: {},
      store_form: {},
      data_list: [],
      store_list: [],
      data_info: {},

      operate: 0,
      show_details: false,
      show_store: false,
      model: "merchant",
      control: "",
    };
  },

  methods: {
    showDetails(type) {
      this.operate = type;
      this.show_details = true;
    },

    // 展示商户列表
    showStore() {
      this.show_store = true;
      this.store_form = createGet();
      getDataList(
        this.model,
        "merchantInfo",
        1,
        this.store_form,
        this,
        "store_list"
      );
    },

    // 选择商户
    selectStore(row) {
      this.show_store = false;
      var { merchantName, merchantID } = row;
      this.data_info.merchantName = merchantName;
      this.data_info.merchantID = merchantID;
    },

    // 清空内容
    clear() {
      this.data_info = {};
    },

    // 发送提交
    sendSubmit() {
      console.log(this.data_info);
    },

    // 取消
    cancel() {
      this.show_details = false;
    },
  },
};
</script>

<style lang='scss'>
#merchant_database {
  .details_form {
    .el-input,
    .el-textarea {
      width: 500px;
    }
  }
}
</style>