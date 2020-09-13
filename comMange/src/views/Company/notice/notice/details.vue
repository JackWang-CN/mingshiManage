<template>
  <div id="notice_details" class="shadow_container">
    <div class="pageTitle">公告详情页</div>
    <el-form label-width="100px">
      <el-form-item label="公告标题">
        <el-input v-model="data_info.title"></el-input>
      </el-form-item>

      <el-form-item label="受众类型">
        <el-select v-model="data_info.audience">
          <el-option label="全体用户" :value="0"></el-option>
          <el-option label="普通用户" :value="1"></el-option>
          <el-option label="商户" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否公布">
        <el-select v-model="data_info.isPublish">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公告内容">
        <el-input type="textarea" :rows="5" v-model="data_info.content"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="sendSubmit">提交</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getDataDetails,
  addDataList,
  updateDataDetails,
} from "@/utils/api/apis";
import { createGet } from "@/utils/common";
export default {
  mounted() {
    var { id } = this.$route.query;
    if (id) {
      this.operate = "1";
      getDataDetails(
        this.model,
        this.control,
        1,
        { noticeID: id },
        this,
        "data_info"
      );
    }
  },

  data() {
    return {
      data_info: { type: 0 },

      operate: "0", // 0-新增 1-修改
      model: "notify",
      control: "notice",
    };
  },

  methods: {
    // 点击提交按钮
    sendSubmit() {
      console.log(this.data_info);
      switch (this.operate) {
        // 新增
        case "0":
          addDataList(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "notice_list"
          );
          break;
        // 修改
        case "1":
          updateDataDetails(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "notice_list"
          );
          break;
      }
    },

    // 取消回到列表页
    cancel() {
      this.$router.push("notice_list");
    },
  },
};
</script>

<style lang='scss'>
#notice_details {
  form {
    .el-input,
    .el-textarea {
      width: 400px;
    }
  }
}
</style>