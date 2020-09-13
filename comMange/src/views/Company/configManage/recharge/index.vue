<template>
  <div id="recharge" class="shadow_container">
    <!-- 充值配置 -->
    <div class="pageTitle">
      充值配置
      <el-button type="success" @click="toDetails">添加模版</el-button>
    </div>
    <el-table :data="data_list" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="type" label="充值方式" width="120"></el-table-column>
      <el-table-column prop="isEnable" label="是否启用" width="120"></el-table-column>
      <el-table-column prop="scale" label="充值比例" width="120"></el-table-column>
      <el-table-column prop="money" label="默认金额" width="120"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data_list: [],
    };
  },

  methods: {
    // 跳转到详情页
    toDetails() {
      this.$router.push("recharge_details");
    },
  },
};
</script>

<style>
</style>