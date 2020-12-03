<template>
  <div id="notice_details" class="shadow_container">
    <div class="pageTitle">游戏公告详情</div>
    <el-form label-width="100px">
      <el-form-item label="公告标题">
        <el-input v-model="data_info.title"></el-input>
      </el-form-item>

      <el-form-item label="选择城市">
        <el-select v-model="data_info.cityID" @change="cityChange">
          <el-option label="全部" :value="0"></el-option>
          <el-option
            v-for="city in city_list"
            :key="city.cityName"
            :label="city.cityName"
            :value="city.cityCode"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择活动" v-show="data_info.cityID">
        <el-select v-model="data_info.activityID">
          <el-option
            v-for="activity in activity_list"
            :key="activity.activityID"
            :label="activity.activityName"
            :value="activity.activityID"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="公告内容">
        <el-input
          type="textarea"
          :rows="5"
          v-model="data_info.content"
        ></el-input>
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
  getDataList,
  getDataDetails,
  addDataList,
  updateDetails,
} from "@/utils/api/apis";
import { createGet, filteObj } from "@/utils/common";
export default {
  mounted() {
    // 请求城市列表
    getDataList(
      this.model,
      "cityScopeConfig",
      1,
      {},
      this,
      "city_list",
      "getCityNameList"
    );

    // 若为修改操作则请求当前详情
    var { id } = this.$route.query;
    if (id) {
      this.operate = 1;
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
      data_info: {},
      city_list: [], // 城市列表
      activity_list: [], // 活动列表

      operate: 0, // 0-新增 1-修改
      model: "ARGame",
      control: "aRNotice",
    };
  },

  methods: {
    // 点击提交按钮
    sendSubmit() {
      switch (this.operate) {
        // 新增
        case 0:
          addDataList(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "gameNotice_list"
          );
          break;
        // 修改
        case 1:
          updateDetails(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "gameNotice_list"
          );
          break;
      }
    },

    // 城市改变
    cityChange(cityCode) {
      // 请求活动列表
      getDataList(
        this.model,
        "ARActivityEvent",
        1,
        { cityCode },
        this,
        "activity_list",
        "getARActivityNameList"
      );
    },

    // 取消回到列表页
    cancel() {
      this.$router.push("gameNotice_list");
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