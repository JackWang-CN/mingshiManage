<template>
  <div id="recharge_details" class="shadow_container">
    <div class="pageTitle">模版编辑</div>

    <!-- 充值模版编辑页 -->
    <el-form label-width="100px">
      <el-form-item label="终端平台">
        <el-select v-model="data_info.platform">
          <el-option label="苹果" value="ios"></el-option>
          <el-option label="安卓" value="android"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-select v-model="data_info.isEnable">
          <el-option label="禁用" :value="0"></el-option>
          <el-option label="启用" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="充值比例">
        <el-input v-model="data_info.scale"></el-input>
      </el-form-item>
      <el-form-item label="默认金额">
        <el-input
          v-model="data_info.modelMoney"
          placeholder="如：50,100,200,500"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendSumit">提交</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addDataList } from "@/utils/api/apis";
export default {
  data() {
    return {
      data_info: {},
      model: "config",
      control: "payConfig",
    };
  },

  methods: {
    // 提交修改
    sendSumit() {
      // 拼接describe
      var type = this.data_info.type ? "微信" : "支付宝";
      var platform = this.data_info.platform ? "安卓" : "IOS";
      this.data_info.describe = platform + "-" + type;

      addDataList(
        this.model,
        this.control,
        1,
        this.data_info,
        this,
        "recharge_list"
      );
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