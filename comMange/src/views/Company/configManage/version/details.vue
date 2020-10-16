<template>
  <div id="version_details" class="shadow_container">
    <!-- 版本详情 -->
    <div class="pageTitle">版本详情</div>

    <!-- 表单 -->
    <el-form label-width="80px">
      <el-form-item label="版本号">
        <el-input v-model="data_info.versionNum"></el-input>
      </el-form-item>
      <el-form-item label="更新设备">
        <el-select v-model="data_info.device">
          <el-option label="Android" value="0"></el-option>
          <el-option label="IOS" value="1"></el-option>
          <el-option label="全部" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="更新标题">
        <el-input v-model="data_info.title"></el-input>
      </el-form-item>
      <el-form-item label="更新内容">
        <el-input
          v-model="data_info.content"
          type="textarea"
          :rows="3"
        ></el-input>
      </el-form-item>
      <el-form-item label="受众类型">
        <el-select v-model="data_info.audience">
          <el-option label="全部" :value="0"></el-option>
          <el-option label="全部用户" :value="-1"></el-option>
          <el-option label="白嫖用户" :value="2"></el-option>
          <el-option label="付费用户" :value="3"></el-option>
          <el-option label="全部商户" :value="100"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="强制更新">
        <el-select v-model="data_info.isForce">
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendSubmit">发布</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getDataDetails, addDataList, updateDetails } from "@/utils/api/apis";
export default {
  mounted() {
    var { id } = this.$route.query;
    if (id) {
      this.operate = 1;
      this.data_info.versionID = id;
      getDataDetails(this.model, this.control, 1, { versionID: id }, this);
    }
  },

  data() {
    return {
      data_info: {},

      operate: 0, // 0-新增 1-修改

      model: "config",
      control: "versionConfig",
    };
  },

  methods: {
    // 提交修改
    sendSubmit() {
      var form = { ...this.data_info };
      if (this.operate) {
        updateDetails(this.model, this.control, 1, form, this, "version_list");
      } else {
        addDataList(this.model, this.control, 1, form, this, "version_list");
      }
    },

    // 返回上一页
    cancel() {
      this.$router.push("version_list");
    },
  },
};
</script>

<style lang='scss'>
#version_details {
  form {
    .el-input,
    .el-textarea {
      width: 300px;
    }
  }
}
</style>