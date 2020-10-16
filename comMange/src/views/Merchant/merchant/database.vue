<!-- 商户数据库 -->
<template>
  <div id="merchant_database" class="shadow_container">
    <div class="pageTitle">
      商户数据库
      <el-button type="success" @click="showDetails(0)">添加数据库</el-button>
    </div>

    <!-- 列表 -->
    <el-table :data="data_list" border>
      <el-table-column
        prop="database"
        label="数据库名称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="dbUserId"
        label="数据库账号"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="dbPassword"
        label="数据库密码"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="serverConfigID"
        label="服务器配置ID"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="merchantID"
        label="商户名称（暂无）"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180"
      ></el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog
      title="数据库详情"
      :visible.sync="show_details"
      width="30%"
      @closed="clear"
    >
      <el-form label-width="100px" class="details_form">
        <el-form-item label="绑定商户">
          <el-button type="success" size="small" @click="showStore"
            >选择商户</el-button
          >
          <el-tag v-show="data_info.merchantID" style="margin-left: 10px">
            {{ data_info.merchantName }}
          </el-tag>
        </el-form-item>

        <el-form-item label="服务器域名">
          <el-select v-model="data_info.serverConfigID">
            <el-option
              v-for="server in server_list"
              :key="server.serverConfigID"
              :label="server.serverConfigID"
              :value="server.serverConfigID"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="数据库名称">
          <el-input v-model="data_info.database"></el-input>
        </el-form-item>

        <el-form-item label="数据库账号">
          <el-input v-model="data_info.dbUserId"></el-input>
        </el-form-item>

        <el-form-item label="数据库密码">
          <el-input v-model="data_info.dbPassword" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sendSubmit">提交</el-button>
          <el-button type="info" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>

      <el-dialog
        title="选择商户"
        :visible.sync="show_store"
        append-to-body
        width="30%"
      >
        <el-table :data="store_list">
          <el-table-column
            prop="merchantName"
            label="商户名称"
            width="180"
          ></el-table-column>

          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="selectStore(scope.row)"
                size="small"
                >选择</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-dialog>

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
import { getDataList, addData, updateData } from "@/utils/api/apis";
import { createGet, hintMessage } from "@/utils/common";
export default {
  components: {
    Pagination,
  },

  mounted() {
    // this.find_form = createGet();
    // delete this.find_form.totalDataNum;
    this.find_form = { currPage: 1, pageSize: 10 };
    getDataList(this.model, this.control, 1, this.find_form, this);
  },

  data() {
    return {
      find_form: {},
      store_form: {}, // 商户列表
      data_list: [], // 数据库列表
      store_list: [], // 商户列表
      server_list: [], // 服务器列表
      data_info: {},

      operate: 0,
      show_details: false,
      show_store: false,
      model: "merchant",
      control: "merDBRelation",
    };
  },

  methods: {
    // 展示详情页
    showDetails(type, row) {
      if (this.server_list.length == 0) {
        // 请求服务器列表
        getDataList(
          "config",
          "dbServerConfig",
          1,
          createGet(1, 999),
          this,
          "server_list"
        );
      }

      if (type == 1) {
        this.data_info = row;
      }

      this.operate = type;
      this.show_details = true;
    },

    // 展示商户列表
    showStore() {
      this.show_store = true;
      this.store_form = createGet();
      getDataList(
        "merchant",
        "merchantInfo",
        1,
        this.store_form,
        this,
        "store_list",
        "merchantNotDbList"
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
    async sendSubmit() {
      var form = { ...this.data_info };
      this.show_details = false;

      switch (this.operate) {
        case 0:
          var res = await addData("merchant", "merDBRelation", 1, form);
          break;
      }
      hintMessage(this, res);
      getDataList(this.model, this.control, 1, this.find_form, this);
    },

    // 取消
    cancel() {
      this.show_details = false;
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