<template>
  <div id="earnings" class="card_container">
    <!-- 我的收益 -->
    <div class="pageTitle">我的收益</div>

    <!-- 上方盒子 -->
    <div class="top">
      <h2>总金币：{{ gold_total }}</h2>
      <div class="btns">
        <el-button type="success" size="medium" @click="toDetails"
          >提现</el-button
        >
      </div>
      <div class="income">
        <span>当日收入：{{ income_day.incomeAmount }}</span>
        <span>总计收入：{{ income_day.glodAmount }}</span>
      </div>
      <div class="income">
        <span>当月收入：{{ income_month.incomeAmount }}</span>
        <span>总计收入：{{ income_month.glodAmount }}</span>
      </div>
    </div>

    <!-- 下方盒子 -->
    <div class="bottom">
      <h3>
        支付流水单：
        <el-button type="primary" size="medium">更多</el-button>
      </h3>

      <!-- 表格 -->
      <el-table :data="flow_list" border>
        <el-table-column
          prop="accountFlowID"
          label="订单号"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="traderName"
          label="客户名称"
          width="180"
        ></el-table-column>
        <el-table-column prop="goldAmount" label="金币数量">
          <template slot-scope="scope"
            >{{ scope.row.incomeExpensesType == 0 ? "+" : "-"
            }}{{ scope.row.goldAmount }}</template
          >
        </el-table-column>
        <el-table-column prop="incomeExpensesType" label="收支类型">
          <template slot-scope="scope">{{
            scope.row.incomeExpensesType == 0 ? "收入" : "支出"
          }}</template>
        </el-table-column>
        <el-table-column prop="payMethod" label="支付方式"></el-table-column>
        <el-table-column prop="describe" label="备注"></el-table-column>
        <el-table-column prop="tradeTime" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning" size="small" @click="addMark(scope.row)"
              >备注</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 提示 -->
      <p class="tips">
        提现规则：金币按照自然月结算，下一个提现日是2020-09-01。
      </p>
    </div>

    <!-- 备注-弹出框 -->
    <el-dialog title="备注" :visible.sync="showMark" width="30%">
      <el-input
        type="textarea"
        placeholder="输入备注"
        :rows="4"
        v-model="remark"
      ></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showMark = false">确 定</el-button>
        <el-button @click="showMark = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getData, getDataList } from "@/utils/api/apis";
import { createGet } from "@/utils/common";
export default {
  mounted() {
    var form = createGet();
    // 请求总金币数量
    getData(this.model, this.control, 1, {}, "Total").then((res) => {
      this.gold_total = res.resultObject;
    });

    // 请求当日收支
    getData(this.model, this.control, 1, {}, "dayIncomeExpenses").then(
      (res) => {
        this.income_day = res.resultObject;
      }
    );

    // 请求当月收支
    getData(this.model, this.control, 1, {}, "MonthIncomeExpenses").then(
      (res) => {
        this.income_month = res.resultObject;
      }
    );

    // 请求金币流水账单
    getDataList(
      this.model,
      this.control,
      1,
      form,
      this,
      "flow_list",
      "flowList"
    );
  },

  data() {
    return {
      showMark: false,
      gold_total: 0,
      income_day: {},
      income_month: {},
      remark: "", // 备注

      flow_list: [
        {
          orderId: "000001",
          customer: "嘉伟",
          goldCoin: "1200",
          type: 0,
          mark: "",
          creationTime: "2020-08-19 12:00",
        },
      ],

      model: "merProfit",
      control: "glod",
    };
  },

  methods: {
    addMark(row) {
      this.showMark = true;
    },

    // 到详情页
    toDetails() {
      this.$router.push("earning_details");
    },
  },
};
</script>

<style lang='scss'>
#earnings {
  // 上方盒子
  .top {
    display: flex;
    align-items: center;
    padding: 40px 10px;
    border-bottom: 2px solid #000;
    h2 {
      font-size: 40px;
      margin: 20px 40px;
    }
    .btns {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .el-button {
        margin: 5px 50px;
      }
    }
    .income {
      margin-left: 200px;
      display: flex;
      flex-direction: column;
      span {
        margin: 10px 0;
      }
    }
  }

  // 下方盒子
  .bottom {
    padding: 20px;
    h3 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .tips {
      margin-top: 150px;
      font-size: 12px;
      color: #84888f;
    }
  }
}
</style>