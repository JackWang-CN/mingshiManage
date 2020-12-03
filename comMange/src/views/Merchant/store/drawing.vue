<template>
  <div id="drawing" class="shadow_container">
    <div class="pageTitle">提现管理</div>

    <!-- tab分页 -->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="提现申请" name="apply">
        <!-- 表格 -->
        <el-table :data="data_list" border style="width: 100%">
          <el-table-column
            prop="accUser"
            label="到账户名"
            width="120"
          ></el-table-column>
          <el-table-column prop="targetType" label="提现对象" width="120">
            <template slot-scope="scope">
              {{ scope.row.targetType ? "商家" : "用户" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="takeGold"
            label="提现金币数"
            width="120"
          ></el-table-column>
          <el-table-column prop="money" label="提现金额" width="120">
            <template slot-scope="scope"> ￥{{ scope.row.money }} </template>
          </el-table-column>
          <el-table-column
            prop="currTotalGold"
            label="当前总金币"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="accNo"
            label="到账卡号"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="accTargetName"
            label="开卡行"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="accAreaName"
            label="开户行地区"
            width="150"
          ></el-table-column>

          <el-table-column prop="cashSatus" label="提现状态" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.cashSatus == -1">提现失败</span>
              <span v-else-if="scope.row.cashSatus == 0">待处理</span>
              <span v-else-if="scope.row.cashSatus == 1">提现成功</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="cashRemarks"
            label="提现备注"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="drawMoneyTime"
            label="申请时间"
            width="200"
          ></el-table-column>

          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                v-show="activeName == 'apply'"
                @click="consentApply(scope.row)"
                >通过</el-button
              >
              <el-button
                type="danger"
                size="small"
                v-show="activeName == 'apply'"
                @click="showDetails(scope.row)"
                >拒绝</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="历史记录" name="history">
        <!-- 表格 -->
        <el-table :data="history_list" border style="width: 100%">
          <el-table-column
            prop="accUser"
            label="到账户名"
            width="120"
          ></el-table-column>
          <el-table-column prop="targetType" label="提现对象" width="120">
            <template slot-scope="scope">
              {{ scope.row.targetType ? "商家" : "用户" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="takeGold"
            label="提现金币数"
            width="120"
          ></el-table-column>
          <el-table-column prop="money" label="提现金额" width="120">
            <template slot-scope="scope"> ￥{{ scope.row.money }} </template>
          </el-table-column>
          <el-table-column
            prop="currTotalGold"
            label="当前总金币"
            width="120"
          ></el-table-column>

          <el-table-column
            prop="accNo"
            label="到账卡号"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="accTargetName"
            label="开卡行"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="accAreaName"
            label="开户行地区"
            width="150"
          ></el-table-column>

          <el-table-column prop="cashSatus" label="提现状态" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.cashSatus == -1">提现失败</span>
              <span v-else-if="scope.row.cashSatus == 0">待处理</span>
              <span v-else-if="scope.row.cashSatus == 1">提现成功</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="cashRemarks"
            label="提现备注"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="drawMoneyTime"
            label="申请时间"
            width="200"
          ></el-table-column>

          <el-table-column
            prop="checkRemarks"
            label="审核备注"
            width="200"
          ></el-table-column>

          <el-table-column
            prop="name"
            label="审核人员"
            width="120"
          ></el-table-column>

          <el-table-column
            prop="updateTime"
            label="审核时间"
            width="200"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 分页插件 -->
    <Pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></Pagination>

    <!-- 弹出框 -->
    <el-dialog
      title="拒绝理由"
      :visible.sync="show_details"
      width="30%"
      @closed="clear"
    >
      <el-input
        v-model="data_info.checkRemarks"
        type="textarea"
        :rows="3"
      ></el-input>

      <div style="margin-top: 20px">
        <el-button type="primary" @click="disposeApply">提交</el-button>
        <el-button type="info" @click="show_details = false">取消</el-button>
      </div>
    </el-dialog>
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

  data() {
    return {
      activeName: "",
      show_details: false,
      find_form: {},
      data_info: {},
      data_list: [],
      history_list: [],

      model: "merchant",
      control: "merTakeGoldLog",
    };
  },

  mounted() {
    this.activeName = "apply";

    // 首次加载
    this.find_form = createGet();
  },

  methods: {
    // 同意申请
    consentApply(row) {
      var { logID, takeGold } = row;
      this.data_info = {
        logId: logID,
        confirm: 1,
        checkRemarks: "通过",
        actualMoney: takeGold / 1000,
      };

      this.disposeApply();
    },

    // 处理申请
    disposeApply() {
      this.show_details = false;

      updateData(
        this.model,
        this.control,
        1,
        this.data_info,
        "confirmMerWithdrawal"
      ).then((res) => {
        hintMessage(this, res);
        var form = { ...this.find_form };
        getDataList(
          this.model,
          this.control,
          1,
          form,
          this,
          "data_list",
          "withdrawalRequestList"
        );
      });
    },

    // 打开详情框
    showDetails(row) {
      this.show_details = true;
      console.log(row);
      var { logID } = row;
      this.data_info.logId = logID;
      this.data_info.confirm = 2;
      this.data_info.actualMoney = 0;
    },

    // 清空
    clear() {
      this.data_info = {};
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
      if (this.activeName == "apply") {
        var list = "data_list",
          operate = "withdrawalRequestList";
      } else {
        var list = "history_list",
          operate = "withdrawalLogList";
      }
      getDataList(this.model, this.control, 1, form, this, list, operate);
    },
  },

  watch: {
    activeName(v) {
      if (v == "apply" && this.data_list.length == 0) {
        var list = "data_list",
          operate = "withdrawalRequestList";
        getDataList(
          this.model,
          this.control,
          1,
          this.find_form,
          this,
          list,
          operate
        );
      } else if (v == "history" && this.history_list.length == 0) {
        var list = "history_list",
          operate = "withdrawalLogList";
        getDataList(
          this.model,
          this.control,
          1,
          this.find_form,
          this,
          list,
          operate
        );
      }
    },
  },
};
</script>

<style>
</style>