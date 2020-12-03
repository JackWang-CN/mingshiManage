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
        prop="cityName"
        label="城市"
        width="200"
      ></el-table-column>

      <el-table-column
        prop="activityName"
        label="活动名称"
        width="200"
      ></el-table-column>

      <el-table-column
        prop="serverName"
        label="服务器名称"
        width="200"
      ></el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="showDetails(1, scope.row)"
            >编辑</el-button
          >
          <el-button size="small" type="danger" @click="delRow(scope.row.id)"
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
      <el-form label-width="100px" class="details_form">
        <el-form-item label="选择活动">
          <el-select v-model="data_info.eventID">
            <el-option
              v-for="server in event_list"
              :key="server.activityID"
              :label="server.activityName"
              :value="server.activityID"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="服务器">
          <el-select v-model="data_info.serverName">
            <el-option
              v-for="server in server_list"
              :key="server.serverID"
              :label="server.serverName"
              :value="server.serverName"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sendSubmit">提交</el-button>
          <el-button type="info" @click="cancel">取消</el-button>
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
    getDataList(this.model, this.control, 1, this.find_form, this, "data_list");
  },

  data() {
    return {
      find_form: {},
      data_list: [],
      data_info: {},
      event_list: [],
      server_list: [],

      operate: 0,
      show_details: false,
      model: "ARGame",
      control: "EventServerConfig",
    };
  },

  methods: {
    // 展示详情
    showDetails(type, row) {
      // 请求活动事件列表
      if (this.event_list.length == 0) {
        getDataList(
          this.model,
          this.control,
          1,
          {},
          this,
          "event_list",
          "getARActivity"
        );
      }

      // 请求服务器列表
      if (this.server_list.length == 0) {
        getDataList(
          this.model,
          this.control,
          1,
          {},
          this,
          "server_list",
          "getServerName"
        );
      }

      this.operate = type;
      this.show_details = true;
      if (type) {
        this.data_info = { ...row };
      }
    },

    // 删除当前行
    async delRow(id) {
      var res = await delData(this.model, this.control, 1, { id });
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
          var res = await addData(this.model, this.control, 1, data);
          break;
        case 1:
          var res = await updateData(this.model, this.control, 1, data);
          break;
      }
      hintMessage(this, res);
      var form = { ...this.find_form };
      getDataList(this.model, this.control, 1, form, this);
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