<template>
  <div id="recharge_details" class="shadow_container">
    <div class="pageTitle">模版编辑</div>

    <!-- 充值模版编辑页 -->
    <el-form label-width="100px">
      <el-form-item label="充值方式">
        <el-select v-model="data_info.type">
          <el-option label="支付宝" value="0"></el-option>
          <el-option label="微信" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-select v-model="data_info.isEnable">
          <el-option label="启用" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="充值比例">
        <el-input v-model="data_info.scale"></el-input>
      </el-form-item>
      <el-form-item label="默认金额">
        <el-input v-model="data_info.money"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendSumit">提交</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data_info: {},
    };
  },

  methods: {
    // 提交修改
    sendSumit() {
      console.log(this.data_info);
    },

    // 返回上一页
    cancel() {
      this.$router.push("recharge_list");
    },
  },
};
</script>

<style lang='scss'>
#recharge_details {
  form {
    .el-input {
      width: 300px;
    }
  }
}
</style>