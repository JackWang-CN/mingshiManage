<template>
  <!-- 订单详情 -->
  <div id="order_details" class="shadow_container">
    <div class="pageTitle">订单详情</div>

    <!-- 表单 -->
    <el-form :model="data_info" label-width="100px">
      <el-form-item label="订单编号">{{ data_info.orderId }}</el-form-item>
      <el-form-item label="订单状态">{{ data_info.orderStatus }}</el-form-item>
      <el-form-item label="订单说明">{{ data_info.details }}</el-form-item>
      <el-form-item label="订单金额">{{ data_info.amount }}</el-form-item>
      <el-form-item label="下单日期">{{ data_info.orderTime }}</el-form-item>
      <el-form-item label="付款日期">{{ data_info.payTime }}</el-form-item>
      <el-form-item label="实付金额">{{ data_info.paidAmount }}</el-form-item>
      <el-form-item label="商品名称">{{ data_info.productName }}</el-form-item>
      <el-form-item label="商品图片">{{ data_info.productIco }}</el-form-item>
      <el-form-item label="商品数量">{{ data_info.number }}</el-form-item>
      <el-form-item label="客户昵称">{{ data_info.userId }}</el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toList">返回</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单 -->
  </div>
</template>

<script>
import { getDataDetail } from "@/utils/api/apis";
export default {
  created() {
    // 获取orderId
    var id = this.$route.query.id;
    if (id) {
      var get_form = { orderId: id };
      getDataDetail(
        this.$vision.merchant,
        "Order",
        get_form,
        "data_info",
        this,
        "productIco"
      );
    }
  },

  data() {
    return {
      data_info: {},
    };
  },

  methods: {
    // 跳转到列表页
    toList() {
      this.$router.push("order_list");
    },
  },
};
</script>

<style lang='scss'>
#order_details {
  .el-form-item__label {
    margin-right: 20px;
  }
}
</style>