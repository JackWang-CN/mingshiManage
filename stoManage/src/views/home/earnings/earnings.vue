<template>
  <div id="earnings" class="shadow_container">
    <!-- 我的收益 -->
    <div class="pageTitle">我的收益</div>

    <!-- 上方盒子 -->
    <div class="top">
      <h2>总金币：5435</h2>
      <div class="btns">
        <el-button size="medium" type="primary">充值</el-button>
        <el-button size="medium">提现</el-button>
      </div>
      <div class="income">
        <span>当月收入：3450</span>
        <span>当月支出：1500</span>
      </div>
    </div>

    <!-- 下方盒子 -->
    <div class="bottom">
      <h3>
        支付流水单：
        <el-button type="primary" size="medium">更多</el-button>
      </h3>

      <!-- 表格 -->
      <el-table :data="data_list" border>
        <el-table-column prop="orderId" label="订单号" width="200"></el-table-column>
        <el-table-column prop="customer" label="客户名称" width="180"></el-table-column>
        <el-table-column prop="goldCoin" label="金币数量">
          <template slot-scope="scope">+{{scope.row.goldCoin}}</template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型">
          <template slot-scope="scope">{{scope.row.type?'支出':'收入'}}</template>
        </el-table-column>
        <el-table-column prop="mark" label="备注"></el-table-column>
        <el-table-column prop="creationTime" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning" size="small" @click="addMark(scope.row)">备注</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 提示 -->
      <p class="tips">提现规则：金币按照自然月结算，下一个提现日是2020-09-01。</p>
    </div>

    <!-- 备注-弹出框 -->
    <el-dialog title="备注" :visible.sync="showMark" width="30%">
      <el-input type="textarea" placeholder="输入备注" :rows="4" v-model="remark"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showMark = false">确 定</el-button>
        <el-button @click="showMark = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMark: false,
      remark: "", // 备注

      data_list: [
        {
          orderId: "000001",
          customer: "嘉伟",
          goldCoin: "1200",
          type: 0,
          mark: "",
          creationTime: "2020-08-19 12:00",
        },
      ],
    };
  },

  methods: {
    addMark(row) {
      console.log(row);
      this.showMark = true;
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