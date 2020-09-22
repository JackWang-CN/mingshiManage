<template>
  <div id="coupon_create" class="shadow_container">
    <!-- 创建优惠券 -->
    <div class="pageTitle">编辑优惠券</div>

    <!-- 表单 -->
    <el-form class="create_form" label-width="100px">
      <el-form-item label="活动绑定">
        <el-select v-model="data_info.activityID" clearable>
          <el-option label="活动1" value="1">活动1</el-option>
          <el-option label="活动2" value="2">活动2</el-option>
          <el-option label="活动3" value="3">活动3</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="优惠券名称">
        <el-input v-model="data_info.name" clearable></el-input>
      </el-form-item>

      <el-form-item label="券类型">
        <el-select v-model="data_info.couponTypeID" clearable>
          <el-option label="类型1" value="1">类型1</el-option>
          <el-option label="类型2" value="2">类型2</el-option>
          <el-option label="类型3" value="3">类型3</el-option>
        </el-select>
      </el-form-item>

      <!-- 券图片 -->
      <el-form-item label="券图片">
        <el-upload class="upload-demo" ref="upload" action="#" :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success">上传到服务器</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="计算规则">
        <el-select v-model="data_info.calcRuleID" clearable>
          <el-option label="规则1" value="1">规则1</el-option>
          <el-option label="规则2" value="2">规则2</el-option>
          <el-option label="规则3" value="3">规则3</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="叠加规则">
        <el-select v-model="data_info.plexRuleID" clearable>
          <el-option label="规则1" value="1">规则1</el-option>
          <el-option label="规则2" value="2">规则2</el-option>
          <el-option label="规则3" value="3">规则3</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="启用状态">
        <el-select v-model="data_info.isEnable" clearable>
          <el-option label="启用" value="1">启用</el-option>
          <el-option label="禁用" value="2">禁用</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="总数量">
        <el-input-number
          v-model="data_info.totalCount"
          @change="countChange"
          :min="1"
          :max="1000"
          label="描述文字"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="有效期限">
        <el-date-picker
          @change="dateChange"
          v-model="select_date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <!-- AR资源上传 -->
      <el-form-item label="AR资源">
        <el-upload class="upload-demo" ref="upload" action="#" :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success">上传到服务器</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="sendLogin">提交</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { switchDateList } from "@/utils/common";
export default {
  data() {
    return {
      data_info: { totalCount: 1 },
      select_date: [],

      model: "",
      control: "",
    };
  },

  methods: {
    // 监听数量改变
    countChange(v) {
      console.log(v);
    },

    // 提交
    sendLogin() {
      console.log(this.data_info);
    },

    // 时间选择器值改变
    dateChange() {
      if (!this.select_date) {
        return;
      }
      var date = switchDateList(this.select_date);
      this.data_info.startTime = date.startTime;
      this.data_info.endTime = date.endTime;
      console.log(this.data_info);
    },

    // 返回上一页
    cancel() {
      this.$router.push("coupon_list");
    },
  },
};
</script>

<style lang='scss'>
#coupon_create {
  form {
    .el-form-item {
      width: 400px;
      .el-input {
        width: 300px;
      }
      .el-input-number {
        width: 300px;
      }
    }
  }
}
</style>