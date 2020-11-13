<template>
  <div id="earning_details" class="card_container">
    <div class="pageTitle">提现管理</div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="申请提现" name="drawings">
        <el-form>
          <el-form-item>
            <el-input
              v-model="goldNum"
              :placeholder="`可用金币：${totalNum}`"
            ></el-input>
            <el-button type="text" @click="goldNum = totalNum">全部</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="withdraw">申请提现</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="提现记录" name="record">
        <el-table :data="data_list" border>
          <el-table-column prop="drawMoneyTime" label="提现日期" width="180">
          </el-table-column>
          <el-table-column prop="takeGold" label="提现金额" width="120">
          </el-table-column>
          <el-table-column prop="cashSatus" label="提现状态" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.cashSatus == -1">提现失败</span>
              <span v-else-if="scope.row.cashSatus == 0">待处理</span>
              <span v-else-if="scope.row.cashSatus == 1">提现成功</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="actualMoney"
            label="实际到账金额"
            width="120"
          ></el-table-column>
        </el-table>

        <!-- 分页插件 -->
        <Pagination
          :find="find_form"
          @sizeChange="pageChange('size', $event)"
          @currChange="pageChange('curr', $event)"
        ></Pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getData, getDataList } from "@/utils/api/apis";
import { createGet } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      activeName: "",
      totalNum: 0,
      goldNum: "", // 提现金额
      data_list: [],

      model: "personalCenter",
      control: "personalCenter",
    };
  },

  mounted() {
    this.activeName = "drawings";

    // 请求总金额
    getData("merProfit", "glod", 1, {}, "total").then((res) => {
      this.totalNum = res.resultObject;
    });
  },

  methods: {
    // 申请提现
    withdraw() {
      console.log(1);
      getData(
        this.model,
        this.control,
        1,
        { goldNum: this.goldNum },
        "merWithdrawalApply"
      ).then((res) => {
        console.log(res);
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
      getDataList(
        this.model,
        this.control,
        1,
        this.find_form,
        this,
        "data_list",
        "merMonthTakePageLog"
      );
    },
  },

  watch: {
    activeName(v) {
      if (v == "record" && this.data_list.length == 0) {
        // 请求提现记录表
        this.find_form = createGet(1, 10, "drawMoneyTime");
        getDataList(
          this.model,
          this.control,
          1,
          this.find_form,
          this,
          "data_list",
          "merMonthTakePageLog"
        );
      }
    },
  },
};
</script>

<style lang='scss'>
.el-form {
  .el-form-item__content {
    display: flex;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>