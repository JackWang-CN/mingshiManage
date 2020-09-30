<template>
  <div id="coupon_create" class="shadow_container">
    <!-- 创建优惠券 -->
    <div class="pageTitle">编辑优惠券</div>

    <!-- 表单 -->
    <el-form class="create_form" label-width="100px">
      <el-form-item label="活动绑定">
        <el-select v-model="data_info.activityID" clearable>
          <el-option
            v-for="item in activity_list"
            :key="item.activityID"
            :value="item.activityID"
            :label="item.activityName"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="优惠券名称">
        <el-input v-model="data_info.name" clearable></el-input>
      </el-form-item>

      <el-form-item label="券类型">
        <el-select v-model="data_info.couponTypeID" clearable>
          <el-option
            v-for="item in type_list"
            :key="item.typeID"
            :label="item.name"
            :value="item.typeID"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 券图片 -->
      <el-form-item label="券图片">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="#"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
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
          v-model="select_date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <!-- AR资源上传 -->
      <el-form-item label="AR资源">
        <el-button size="small" type="primary">选择模型</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="sendSubmit">提交</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { switchDateList, createGet, hintMessage } from "@/utils/common";
import { getDataList, updateDataDetails, updateData } from "@/utils/api/apis";
export default {
  mounted() {
    // 请求活动列表
    var form = createGet(1, 999);
    getDataList(
      this.model,
      this.control,
      1,
      form,
      this,
      "activity_list",
      "getActivityList"
    );
    // 请求券类型
    getDataList(this.model, this.control + "Type", 1, form, this, "type_list");
  },
  data() {
    return {
      data_info: { totalCount: 1 },
      select_date: [],
      activity_list: [], // 活动列表
      type_list: [], // 类型列表
      model: "coupon",
      control: "coupon",
    };
  },

  methods: {
    // 监听数量改变
    countChange(v) {
      console.log(v);
    },

    // 提交
    sendSubmit() {
      console.log(this.data_info);
      updateData(
        "activity",
        "activityManage",
        1,
        this.data_info,
        "createActivityCoupon"
      ).then((res) => {
        hintMessage(this, res);
        this.$router.push("coupon_list");
      });
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